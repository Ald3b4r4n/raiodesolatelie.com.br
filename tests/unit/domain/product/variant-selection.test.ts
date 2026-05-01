import { describe, expect, it } from "vitest";

import {
  buildVariantOptions,
  resolveSelectedVariant,
  type VariantSelectionInput
} from "@/domain/product/variant-selection";
import type { ProductVariant } from "@/domain/product/types";

const variants: ProductVariant[] = [
  {
    id: "variant-1",
    productId: "product-1",
    size: "P",
    color: "Rosa",
    status: "active",
    availability: "available",
    createdAt: "2026-05-01T10:00:00.000Z",
    updatedAt: "2026-05-01T10:00:00.000Z"
  },
  {
    id: "variant-2",
    productId: "product-1",
    size: "M",
    color: "Rosa",
    status: "active",
    availability: "available",
    createdAt: "2026-05-01T10:00:00.000Z",
    updatedAt: "2026-05-01T10:00:00.000Z"
  },
  {
    id: "variant-3",
    productId: "product-1",
    size: "M",
    color: "Azul",
    status: "active",
    availability: "unavailable",
    createdAt: "2026-05-01T10:00:00.000Z",
    updatedAt: "2026-05-01T10:00:00.000Z"
  }
];

describe("seleção de variação", () => {
  it("resolve a variação quando tamanho e cor formam uma combinação válida", () => {
    const selection: VariantSelectionInput = {
      size: "M",
      color: "Rosa"
    };

    expect(resolveSelectedVariant(variants, selection)?.id).toBe("variant-2");
  });

  it("retorna indefinido quando a combinação não existe", () => {
    expect(
      resolveSelectedVariant(variants, {
        size: "G",
        color: "Rosa"
      })
    ).toBeUndefined();
  });

  it("expõe opções de tamanho e cor com estado de disponibilidade", () => {
    const options = buildVariantOptions(variants);

    expect(options.sizes).toEqual([
      { label: "P", value: "P", available: true },
      { label: "M", value: "M", available: true }
    ]);
    expect(options.colors).toEqual([
      { label: "Rosa", value: "Rosa", available: true },
      { label: "Azul", value: "Azul", available: false }
    ]);
  });
});
