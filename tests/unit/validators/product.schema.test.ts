import { describe, expect, it } from "vitest";

import { parseProductInput, parseProductVariantInput } from "@/validators/product";

describe("schema de produto", () => {
  it("sanitiza nome e descricao publicos", () => {
    const parsed = parseProductInput({
      id: "product-1",
      slug: "bolsa-tecido",
      name: "<script>alert(1)</script>",
      description: "Descrição <b>teste</b>",
      basePrice: 15990,
      categoryId: "cat-1",
      status: "active",
      availability: "available",
      salesMode: "both",
      createdAt: "2026-04-30T10:00:00.000Z",
      updatedAt: "2026-04-30T10:00:00.000Z"
    });

    expect(parsed.name).toContain("&lt;script&gt;");
    expect(parsed.description).toContain("&lt;b&gt;");
  });

  it("rejeita campos obrigatorios ausentes", () => {
    expect(() => parseProductInput({})).toThrow(/obrigat[óo]rio/i);
  });

  it("rejeita preco base invalido", () => {
    expect(() =>
      parseProductInput({
        id: "product-1",
        slug: "bolsa-tecido",
        name: "Bolsa",
        description: "Descrição",
        basePrice: -10,
        categoryId: "cat-1",
        status: "active",
        availability: "available",
        salesMode: "both",
        createdAt: "2026-04-30T10:00:00.000Z",
        updatedAt: "2026-04-30T10:00:00.000Z"
      })
    ).toThrow(/preço/i);
  });

  it("rejeita preço base que não esteja em centavos inteiros", () => {
    expect(() =>
      parseProductInput({
        id: "product-1",
        slug: "bolsa-tecido",
        name: "Bolsa",
        description: "Descrição",
        basePrice: 159.9,
        categoryId: "cat-1",
        status: "active",
        availability: "available",
        salesMode: "both",
        createdAt: "2026-04-30T10:00:00.000Z",
        updatedAt: "2026-04-30T10:00:00.000Z"
      })
    ).toThrow(/centavos/i);
  });
});

describe("schema de variacao", () => {
  it("aceita variacao valida", () => {
    const parsed = parseProductVariantInput({
      id: "variant-1",
      productId: "product-1",
      size: "M",
      color: "Bege",
      status: "active",
      availability: "available",
      createdAt: "2026-04-30T10:00:00.000Z",
      updatedAt: "2026-04-30T10:00:00.000Z"
    });

    expect(parsed.productId).toBe("product-1");
  });

  it("rejeita variacao sem produto", () => {
    expect(() => parseProductVariantInput({ id: "variant-1" })).toThrow(
      /obrigat[óo]rio/i
    );
  });

  it("sanitiza campos públicos da variação", () => {
    const parsed = parseProductVariantInput({
      id: "variant-1",
      productId: "product-1",
      size: "<script>M</script>",
      color: "Azul <b>claro</b>",
      status: "active",
      availability: "available",
      createdAt: "2026-04-30T10:00:00.000Z",
      updatedAt: "2026-04-30T10:00:00.000Z"
    });

    expect(parsed.size).toContain("&lt;script&gt;");
    expect(parsed.color).toContain("&lt;b&gt;");
  });

  it("rejeita estoque fracionado", () => {
    expect(() =>
      parseProductVariantInput({
        id: "variant-1",
        productId: "product-1",
        size: "M",
        color: "Bege",
        status: "active",
        availability: "available",
        stockQuantity: 1.5,
        createdAt: "2026-04-30T10:00:00.000Z",
        updatedAt: "2026-04-30T10:00:00.000Z"
      })
    ).toThrow(/inteiro/i);
  });
});
