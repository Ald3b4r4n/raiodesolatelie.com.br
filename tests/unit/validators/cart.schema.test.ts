import { describe, expect, it } from "vitest";

import { parseCartInput } from "@/validators/cart";

describe("schema de carrinho", () => {
  it("aceita carrinho válido e sanitiza textos públicos persistidos", () => {
    const parsed = parseCartInput({
      items: [
        {
          productId: "product-1",
          variantId: "variant-1",
          productName: "<script>Bolsa</script>",
          variantLabel: "M / <b>Azul</b>",
          unitPrice: 15990,
          quantity: 2,
          lineTotal: 31980
        }
      ]
    });

    expect(parsed.items[0]?.productName).toContain("&lt;script&gt;");
    expect(parsed.items[0]?.variantLabel).toContain("&lt;b&gt;");
  });

  it("rejeita quantidade fracionada", () => {
    expect(() =>
      parseCartInput({
        items: [
          {
            productId: "product-1",
            productName: "Bolsa",
            unitPrice: 15990,
            quantity: 1.5,
            lineTotal: 23985
          }
        ]
      })
    ).toThrow(/quantidade/i);
  });

  it("rejeita total de linha diferente do preço pela quantidade", () => {
    expect(() =>
      parseCartInput({
        items: [
          {
            productId: "product-1",
            productName: "Bolsa",
            unitPrice: 15990,
            quantity: 2,
            lineTotal: 10
          }
        ]
      })
    ).toThrow(/total/i);
  });
});
