import type { Category, Product } from "@/domain/product/types";
import {
  mockCatalogCategories,
  mockCatalogProducts
} from "@/services/firebase/catalog-mock-data";

import { createProductFixture } from "../factories/product-factory";

export const catalogFixture = [createProductFixture()];

export function createCatalogPageData(
  input: Partial<{
    title: string;
    description: string;
    products: Product[];
    categories: Category[];
    errorMessage?: string;
  }> = {}
) {
  return {
    title: input.title ?? "Coleção em destaque",
    description:
      input.description ??
      "Vitrine pensada para compra rápida, com peças do ateliê, leitura comercial clara e seleção pronta para atendimento.",
    products: input.products ?? createCatalogProductsFixture(),
    categories: input.categories ?? createCatalogCategoriesFixture(),
    currentFilters: {},
    emptyState: {
      title: "Nenhum produto encontrado",
      description: "Ajuste a busca ou os filtros para encontrar outra peça desta vitrine."
    },
    errorMessage: input.errorMessage
  };
}

export function createCatalogProductsFixture(): Product[] {
  return structuredClone(
    mockCatalogProducts.filter((product) => product.status === "active")
  );
}

export function createCatalogCategoriesFixture(): Category[] {
  return structuredClone(mockCatalogCategories);
}
