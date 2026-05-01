import { readOptionalEnv, validateOptionalUrl } from "@/lib/env/schema";

export type StoreConfigInput = Record<string, string | undefined>;

export type SocialLink = {
  label: "Instagram" | "TikTok";
  href?: string;
  placeholder: string;
};

export type StoreConfig = {
  brandName: "Raio de Sol Ateliê";
  whatsappUrl?: string;
  socialLinks: SocialLink[];
};

const WHATSAPP_MESSAGE =
  "Olá, gostaria de saber mais sobre os produtos do Raio de Sol Ateliê.";

export function buildWhatsAppUrl(phone: string | undefined): string | undefined {
  const normalizedPhone = phone?.replace(/\D/g, "");

  if (!normalizedPhone) {
    return undefined;
  }

  return `https://wa.me/${normalizedPhone}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
}

export function buildStoreConfig(input: StoreConfigInput = process.env): StoreConfig {
  const instagramUrl = readOptionalEnv(input, "NEXT_PUBLIC_INSTAGRAM_URL");
  const tiktokUrl = readOptionalEnv(input, "NEXT_PUBLIC_TIKTOK_URL");

  validateOptionalUrl(instagramUrl, "NEXT_PUBLIC_INSTAGRAM_URL");
  validateOptionalUrl(tiktokUrl, "NEXT_PUBLIC_TIKTOK_URL");

  return {
    brandName: "Raio de Sol Ateliê",
    whatsappUrl: buildWhatsAppUrl(readOptionalEnv(input, "STORE_WHATSAPP_PHONE")),
    socialLinks: [
      {
        label: "Instagram",
        href: instagramUrl,
        placeholder: "Instagram será informado em breve."
      },
      {
        label: "TikTok",
        href: tiktokUrl,
        placeholder: "TikTok será informado em breve."
      }
    ]
  };
}
