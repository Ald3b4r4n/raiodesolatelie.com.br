export type PaymentSessionStatus =
  | "created"
  | "mock_approved"
  | "approved"
  | "failed"
  | "cancelled";

export type PaymentMethod = "pix" | "card";
export type PaymentProvider = "mock";

export type PaymentSession = {
  id: string;
  orderId: string;
  amount: number;
  method: PaymentMethod;
  status: PaymentSessionStatus;
  provider: PaymentProvider;
  createdAt: string;
  updatedAt: string;
  providerReference?: string;
  expiresAt?: string;
  failureReason?: string;
};
