import { describe, expect, it } from "vitest";

import { type Product, type ProductVariant } from "@/domain/product/types";
import {
  assertVariantMatchesProduct,
  isProductActive,
  isProductAvailableForSale,
  resolveVariantPrice
} from "@/domain/product/rules";

describe("dominio de produto", () => {
  const product: Product = {
    id: "product-1",
    slug: "bolsa-tecido",
    name: "Bolsa de tecido",
    description: "Bolsa artesanal",
    basePrice: 15990,
    categoryId: "cat-1",
    status: "active",
    availability: "available",
    salesMode: "both",
    createdAt: "2026-04-30T10:00:00.000Z",
    updatedAt: "2026-04-30T10:00:00.000Z"
  };

  const variant: ProductVariant = {
    id: "variant-1",
    productId: "product-1",
    size: "M",
    color: "Bege",
    status: "active",
    availability: "available",
    createdAt: "2026-04-30T10:00:00.000Z",
    updatedAt: "2026-04-30T10:00:00.000Z"
  };

  it("reconhece produto ativo", () => {
    expect(isProductActive(product)).toBe(true);
    expect(isProductActive({ ...product, status: "inactive" })).toBe(false);
  });

  it("valida disponibilidade para venda", () => {
    expect(isProductAvailableForSale(product)).toBe(true);
    expect(isProductAvailableForSale({ ...product, availability: "unavailable" })).toBe(
      false
    );
  });

  it("usa preco da variacao quando houver override", () => {
    expect(resolveVariantPrice(product, variant)).toBe(15990);
    expect(resolveVariantPrice(product, { ...variant, priceOverride: 18990 })).toBe(
      18990
    );
  });

  it("bloqueia variacao invalida para o produto", () => {
    expect(() =>
      assertVariantMatchesProduct(product, { ...variant, productId: "product-x" })
    ).toThrow(/varia[cç][aã]o/i);

    expect(() =>
      assertVariantMatchesProduct(product, { ...variant, status: "inactive" })
    ).toThrow(/varia[cç][aã]o/i);
  });
});
