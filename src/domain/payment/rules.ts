import { type PaymentSessionStatus } from "@/domain/payment/types";

const PAYMENT_SESSION_TRANSITIONS: Record<PaymentSessionStatus, PaymentSessionStatus[]> =
  {
    created: ["mock_approved", "approved", "failed", "cancelled"],
    mock_approved: ["approved", "failed", "cancelled"],
    approved: [],
    failed: [],
    cancelled: []
  };

export function transitionPaymentSessionStatus(
  current: PaymentSessionStatus,
  next: PaymentSessionStatus
): PaymentSessionStatus {
  if (!PAYMENT_SESSION_TRANSITIONS[current].includes(next)) {
    throw new Error("Transição de pagamento inválida");
  }

  return next;
}
