import { describe, expect, it } from "vitest";

import { parseCategoryInput } from "@/validators/category";

describe("schema de categoria", () => {
  it("aceita categoria valida", () => {
    const parsed = parseCategoryInput({
      id: "cat-1",
      slug: "pronta-entrega",
      name: "<b>Pronta entrega</b>",
      status: "active",
      sortOrder: 1
    });

    expect(parsed.slug).toBe("pronta-entrega");
    expect(parsed.name).toContain("&lt;b&gt;");
  });

  it("rejeita slug vazio", () => {
    expect(() =>
      parseCategoryInput({
        id: "cat-1",
        slug: "",
        name: "Categoria",
        status: "active",
        sortOrder: 1
      })
    ).toThrow(/slug/i);
  });

  it("rejeita ordem de categoria fracionada", () => {
    expect(() =>
      parseCategoryInput({
        id: "cat-1",
        slug: "pronta-entrega",
        name: "Categoria",
        status: "active",
        sortOrder: 1.5
      })
    ).toThrow(/inteiro/i);
  });
});
