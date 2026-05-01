import { describe, expect, it } from "vitest";

import { parsePaymentSessionInput } from "@/validators/payment";

describe("schema de sessão de pagamento", () => {
  it("aceita sessão abstrata mockada sem dados sensíveis", () => {
    const parsed = parsePaymentSessionInput({
      id: "payment-1",
      orderId: "order-1",
      method: "pix",
      amount: 15990,
      status: "created",
      provider: "mock",
      createdAt: "2026-04-30T10:00:00.000Z",
      updatedAt: "2026-04-30T10:00:00.000Z"
    });

    expect(parsed.provider).toBe("mock");
  });

  it("rejeita dados de cartão no payload", () => {
    expect(() =>
      parsePaymentSessionInput({
        id: "payment-1",
        orderId: "order-1",
        method: "card",
        amount: 15990,
        status: "created",
        provider: "mock",
        cardNumber: "4111111111111111",
        cvv: "123",
        createdAt: "2026-04-30T10:00:00.000Z",
        updatedAt: "2026-04-30T10:00:00.000Z"
      })
    ).toThrow(/cartão/i);
  });

  it("rejeita valor que não esteja em centavos inteiros", () => {
    expect(() =>
      parsePaymentSessionInput({
        id: "payment-1",
        orderId: "order-1",
        method: "pix",
        amount: 159.9,
        status: "created",
        provider: "mock",
        createdAt: "2026-04-30T10:00:00.000Z",
        updatedAt: "2026-04-30T10:00:00.000Z"
      })
    ).toThrow(/centavos/i);
  });
});
