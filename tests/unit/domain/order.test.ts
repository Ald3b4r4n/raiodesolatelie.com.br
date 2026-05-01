import { describe, expect, it } from "vitest";

import { transitionOrderStatus, transitionPaymentStatus } from "@/domain/order/rules";
import { type OrderStatus, type PaymentStatus } from "@/domain/order/types";

describe("dominio de pedidos", () => {
  it("permite transicao valida de status", () => {
    const next = transitionOrderStatus("placed", "confirmed");

    expect(next).toBe("confirmed");
  });

  it("bloqueia transicao invalida de status", () => {
    expect(() => transitionOrderStatus("completed", "cancelled")).toThrow(/status/i);
  });

  it("permite transicao valida de pagamento", () => {
    const next = transitionPaymentStatus("pending", "mock_approved");

    expect(next).toBe("mock_approved");
  });

  it("bloqueia transicao invalida de pagamento", () => {
    expect(() => transitionPaymentStatus("failed", "approved")).toThrow(/pagamento/i);
  });

  it("aceita enums conhecidos", () => {
    const order: OrderStatus = "placed";
    const payment: PaymentStatus = "pending";

    expect(order).toBe("placed");
    expect(payment).toBe("pending");
  });
});
