import { type OrderStatus, type PaymentStatus } from "@/domain/order/types";

const ORDER_TRANSITIONS: Record<OrderStatus, OrderStatus[]> = {
  draft: ["placed", "cancelled"],
  placed: ["confirmed", "cancelled"],
  confirmed: ["preparing", "cancelled"],
  preparing: ["ready", "cancelled"],
  ready: ["shipped", "cancelled"],
  shipped: ["completed"],
  completed: [],
  cancelled: []
};

const PAYMENT_TRANSITIONS: Record<PaymentStatus, PaymentStatus[]> = {
  pending: ["mock_approved", "approved", "failed", "cancelled"],
  mock_approved: ["approved", "failed", "cancelled"],
  approved: [],
  failed: [],
  cancelled: []
};

export function transitionOrderStatus(
  current: OrderStatus,
  next: OrderStatus
): OrderStatus {
  if (!ORDER_TRANSITIONS[current].includes(next)) {
    throw new Error("Transição de status inválida");
  }

  return next;
}

export function transitionPaymentStatus(
  current: PaymentStatus,
  next: PaymentStatus
): PaymentStatus {
  if (!PAYMENT_TRANSITIONS[current].includes(next)) {
    throw new Error("Transição de pagamento inválida");
  }

  return next;
}
