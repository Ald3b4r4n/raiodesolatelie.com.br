import { readOptionalEnv, validateOptionalUrl } from "@/lib/env/schema";

export type StoreConfigInput = Record<string, string | undefined>;

export type SocialLink = {
  label: "Instagram" | "TikTok";
  href?: string;
  placeholder: string;
};

export type StoreConfig = {
  brandName: "Raio de Sol Ateliê";
  whatsappPhone: string;
  whatsappUrl?: string;
  socialLinks: SocialLink[];
};

export const DEFAULT_STORE_WHATSAPP_PHONE = "61996632269";
export const DEFAULT_INSTAGRAM_URL =
  "https://www.instagram.com/atelieraiode.sol?igsh=cDFrbGdzaHg0eDN0";
export const DEFAULT_TIKTOK_URL =
  "https://www.tiktok.com/@atelieraiode.sol?is_from_webapp=1&sender_device=pc";

const WHATSAPP_MESSAGE =
  "Olá, gostaria de saber mais sobre os produtos do Raio de Sol Ateliê.";

export function normalizeWhatsAppPhone(phone: string | undefined): string | undefined {
  const normalizedPhone = phone?.replace(/\D/g, "");

  if (!normalizedPhone) {
    return undefined;
  }

  if (normalizedPhone.startsWith("55")) {
    return normalizedPhone;
  }

  if (normalizedPhone.length === 10 || normalizedPhone.length === 11) {
    return `55${normalizedPhone}`;
  }

  return normalizedPhone;
}

export function buildWhatsAppUrl(phone: string | undefined): string | undefined {
  const normalizedPhone = normalizeWhatsAppPhone(phone);

  if (!normalizedPhone) {
    return undefined;
  }

  return `https://wa.me/${normalizedPhone}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
}

export function buildStoreConfig(input: StoreConfigInput = process.env): StoreConfig {
  const whatsappPhone =
    readOptionalEnv(input, "STORE_WHATSAPP_PHONE") ?? DEFAULT_STORE_WHATSAPP_PHONE;
  const instagramUrl =
    readOptionalEnv(input, "NEXT_PUBLIC_INSTAGRAM_URL") ?? DEFAULT_INSTAGRAM_URL;
  const tiktokUrl =
    readOptionalEnv(input, "NEXT_PUBLIC_TIKTOK_URL") ?? DEFAULT_TIKTOK_URL;

  validateOptionalUrl(instagramUrl, "NEXT_PUBLIC_INSTAGRAM_URL");
  validateOptionalUrl(tiktokUrl, "NEXT_PUBLIC_TIKTOK_URL");

  return {
    brandName: "Raio de Sol Ateliê",
    whatsappPhone,
    whatsappUrl: buildWhatsAppUrl(whatsappPhone),
    socialLinks: [
      {
        label: "Instagram",
        href: instagramUrl,
        placeholder: "Instagram oficial"
      },
      {
        label: "TikTok",
        href: tiktokUrl,
        placeholder: "TikTok oficial"
      }
    ]
  };
}
