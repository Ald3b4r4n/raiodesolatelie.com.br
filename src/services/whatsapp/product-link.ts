import { normalizeWhatsAppPhone } from "@/lib/config/store";

type ProductInquiryInput = {
  phone?: string;
  productName: string;
  productSlug: string;
  size?: string;
  color?: string;
};

export function buildProductWhatsAppUrl(input: ProductInquiryInput): string | undefined {
  const normalizedPhone = normalizeWhatsAppPhone(input.phone);

  if (!normalizedPhone) {
    return undefined;
  }

  const variationParts = [input.size, input.color].filter(Boolean);
  const variationText =
    variationParts.length > 0 ? ` Variação: ${variationParts.join(" / ")}.` : "";
  const message =
    `Olá, tenho interesse no produto ${input.productName}.` +
    `${variationText} Referência: ${input.productSlug}.`;

  return `https://wa.me/${normalizedPhone}?text=${encodeURIComponent(message)}`;
}
