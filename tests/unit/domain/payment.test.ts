import { describe, expect, it } from "vitest";

import { transitionPaymentSessionStatus } from "@/domain/payment/rules";
import { type PaymentSessionStatus } from "@/domain/payment/types";

describe("dominio de pagamento", () => {
  it("permite transicao valida", () => {
    const next = transitionPaymentSessionStatus("created", "mock_approved");

    expect(next).toBe("mock_approved");
  });

  it("bloqueia transicao invalida", () => {
    expect(() => transitionPaymentSessionStatus("failed", "approved")).toThrow(
      /pagamento/i
    );
  });

  it("aceita status conhecidos", () => {
    const status: PaymentSessionStatus = "created";

    expect(status).toBe("created");
  });
});
