import { describe, expect, it } from "vitest";

import { parseCouponInput } from "@/validators/coupon";

describe("schema de cupom", () => {
  it("aceita cupom valido", () => {
    const parsed = parseCouponInput({
      id: "coupon-1",
      code: "BEMVINDA",
      discountType: "percentage",
      discountValue: 10,
      status: "active",
      validFrom: "2026-04-01",
      validUntil: "2026-05-01",
      createdAt: "2026-04-01T10:00:00.000Z",
      updatedAt: "2026-04-01T10:00:00.000Z"
    });

    expect(parsed.code).toBe("BEMVINDA");
  });

  it("rejeita desconto invalido", () => {
    expect(() =>
      parseCouponInput({
        id: "coupon-1",
        code: "BEMVINDA",
        discountType: "percentage",
        discountValue: 0,
        status: "active",
        validFrom: "2026-04-01",
        validUntil: "2026-05-01",
        createdAt: "2026-04-01T10:00:00.000Z",
        updatedAt: "2026-04-01T10:00:00.000Z"
      })
    ).toThrow(/desconto/i);
  });

  it("rejeita percentual acima de 100", () => {
    expect(() =>
      parseCouponInput({
        id: "coupon-1",
        code: "BEMVINDA",
        discountType: "percentage",
        discountValue: 150,
        status: "active",
        validFrom: "2026-04-01",
        validUntil: "2026-05-01",
        createdAt: "2026-04-01T10:00:00.000Z",
        updatedAt: "2026-04-01T10:00:00.000Z"
      })
    ).toThrow(/percentual/i);
  });

  it("rejeita valor fixo fracionado", () => {
    expect(() =>
      parseCouponInput({
        id: "coupon-1",
        code: "BEMVINDA",
        discountType: "fixed_amount",
        discountValue: 10.5,
        status: "active",
        validFrom: "2026-04-01",
        validUntil: "2026-05-01",
        createdAt: "2026-04-01T10:00:00.000Z",
        updatedAt: "2026-04-01T10:00:00.000Z"
      })
    ).toThrow(/centavos/i);
  });
});
