import { type Product, type ProductVariant } from "@/domain/product/types";

export function isProductActive(product: Product): boolean {
  return product.status === "active";
}

export function isProductAvailableForSale(product: Product): boolean {
  return isProductActive(product) && product.availability !== "unavailable";
}

export function resolveVariantPrice(product: Product, variant: ProductVariant): number {
  return variant.priceOverride ?? product.basePrice;
}

export function assertVariantMatchesProduct(
  product: Product,
  variant: ProductVariant
): void {
  if (variant.productId !== product.id) {
    throw new Error("Variação inválida para o produto");
  }

  if (variant.status !== "active" || variant.availability !== "available") {
    throw new Error("Variação inválida para o produto");
  }
}

export function assertProductAvailable(product: Product): void {
  if (!isProductAvailableForSale(product)) {
    throw new Error("Produto indisponível para venda");
  }
}
