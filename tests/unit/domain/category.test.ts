import { describe, expect, it } from "vitest";

import { isCategoryActive, sortCategories } from "@/domain/product/category";
import { type Category } from "@/domain/product/types";

describe("dominio de categoria", () => {
  const categories: Category[] = [
    {
      id: "cat-2",
      slug: "encomenda",
      name: "Encomenda",
      status: "active",
      sortOrder: 2
    },
    {
      id: "cat-1",
      slug: "pronta-entrega",
      name: "Pronta entrega",
      status: "active",
      sortOrder: 1
    }
  ];

  it("reconhece categoria ativa", () => {
    expect(isCategoryActive(categories[0])).toBe(true);
    expect(isCategoryActive({ ...categories[0], status: "inactive" })).toBe(false);
  });

  it("ordena categorias por sortOrder", () => {
    const sorted = sortCategories(categories);

    expect(sorted[0]?.id).toBe("cat-1");
  });
});
