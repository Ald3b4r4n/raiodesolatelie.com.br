import { describe, expect, it } from "vitest";

import { ProductCatalogService } from "@/services/firebase/product-catalog";

describe("ProductCatalogService", () => {
  it("lista apenas produtos ativos e categorias ativas por padrão", async () => {
    const service = new ProductCatalogService();
    const result = await service.listCatalog();

    expect(result.products.length).toBeGreaterThan(1);
    expect(result.products.every((product) => product.status === "active")).toBe(true);
    expect(result.categories.every((category) => category.status === "active")).toBe(
      true
    );
  });

  it("filtra por nome, categoria, faixa de preço e disponibilidade", async () => {
    const service = new ProductCatalogService();
    const result = await service.listCatalog({
      q: "bolsa",
      category: "bolsas-e-acessorios",
      minPrice: "10000",
      maxPrice: "20000",
      availability: "available"
    });

    expect(result.products).toHaveLength(1);
    expect(result.products[0]?.slug).toBe("bolsa-estrela-marina");
    expect(result.appliedFilters.hasActiveFilters).toBe(true);
  });

  it("retorna estado vazio quando nenhum item atende aos filtros", async () => {
    const service = new ProductCatalogService();
    const result = await service.listCatalog({
      q: "inexistente"
    });

    expect(result.products).toHaveLength(0);
    expect(result.emptyState.title).toMatch(/nenhum produto/i);
  });

  it("rejeita faixa de preço inválida", async () => {
    const service = new ProductCatalogService();

    await expect(
      service.listCatalog({
        minPrice: "30000",
        maxPrice: "10000"
      })
    ).rejects.toThrow(/faixa de preço/i);
  });
});
