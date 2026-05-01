import type { ProductVariant } from "@/domain/product/types";
import { mockCatalogProductDetails } from "@/services/firebase/catalog-mock-data";
import type { ProductDetailViewData } from "@/features/product/types";

export function createProductDetailFixture(
  input: Partial<ProductDetailViewData> = {}
): ProductDetailViewData {
  const base = structuredClone(mockCatalogProductDetails["conjunto-praia-croche"]);
  const hasWhatsappPhone = Object.prototype.hasOwnProperty.call(input, "whatsappPhone");

  return {
    product: input.product ?? base.product,
    category: input.category ?? base.category,
    variants: input.variants ?? (base.variants as ProductVariant[]),
    whatsappPhone: hasWhatsappPhone ? input.whatsappPhone : "61996632269",
    errorMessage: input.errorMessage,
    notFound: input.notFound ?? false
  };
}
