import { describe, expect, it } from "vitest";

import { parseShippingOptionInput } from "@/validators/shipping";

describe("schema de opção de entrega", () => {
  it("aceita retirada local disponível", () => {
    const parsed = parseShippingOptionInput({
      id: "pickup",
      type: "local_pickup",
      label: "Retirada local",
      price: 0,
      available: true,
      provider: "mock"
    });

    expect(parsed.available).toBe(true);
  });

  it("sanitiza rótulo e motivo de indisponibilidade", () => {
    const parsed = parseShippingOptionInput({
      id: "shipping",
      type: "shipping",
      label: "<b>Entrega</b>",
      price: 1990,
      available: false,
      provider: "mock",
      reasonUnavailable: "<script>indisponível</script>"
    });

    expect(parsed.label).toContain("&lt;b&gt;");
    expect(parsed.reasonUnavailable).toContain("&lt;script&gt;");
  });

  it("rejeita preço negativo", () => {
    expect(() =>
      parseShippingOptionInput({
        id: "shipping",
        type: "shipping",
        label: "Entrega",
        price: -1,
        available: true
      })
    ).toThrow(/preço/i);
  });
});
