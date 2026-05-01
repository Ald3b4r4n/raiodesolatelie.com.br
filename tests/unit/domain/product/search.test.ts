import { describe, expect, it } from "vitest";

import {
  buildProductSearchIndex,
  matchesProductQuery,
  normalizeProductQuery
} from "@/domain/product/search";

describe("busca normalizada de produtos", () => {
  it("normaliza consulta removendo espaços extras e acentos", () => {
    expect(normalizeProductQuery("  Laço   Infantil  ")).toBe("laco infantil");
  });

  it("gera índice de busca com nome e descrição normalizados", () => {
    expect(
      buildProductSearchIndex({
        name: "Bolsa de Crochê",
        description: "Feita à mão com alça ajustável"
      })
    ).toBe("bolsa de croche feita a mao com alca ajustavel");
  });

  it("faz busca por nome com tolerância a acento e caixa", () => {
    const searchIndex = buildProductSearchIndex({
      name: "Tiara Flor do Sol",
      description: "Peça leve para uso diário"
    });

    expect(matchesProductQuery(searchIndex, "flor sol")).toBe(true);
    expect(matchesProductQuery(searchIndex, "TIARA")).toBe(true);
    expect(matchesProductQuery(searchIndex, "pulseira")).toBe(false);
  });
});
