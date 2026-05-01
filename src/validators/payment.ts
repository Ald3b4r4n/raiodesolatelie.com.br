import {
  type PaymentMethod,
  type PaymentProvider,
  type PaymentSession,
  type PaymentSessionStatus
} from "@/domain/payment/types";
import { sanitizePublicText } from "@/lib/security/sanitize";
import {
  readOptionalString,
  requireEnum,
  requireMoneyCents,
  requireRecord,
  requireString
} from "@/validators/primitives";

const SENSITIVE_PAYMENT_KEYS = [
  "cardNumber",
  "cardholderName",
  "cvv",
  "cvc",
  "expiration",
  "expiryMonth",
  "expiryYear"
];

export function parsePaymentSessionInput(input: unknown): PaymentSession {
  const data = requireRecord(input, "Sessão de pagamento inválida");
  assertNoCardData(data);
  const failureReason = readOptionalString(data, "failureReason");

  return {
    id: requireString(data, "id"),
    orderId: requireString(data, "orderId"),
    method: requireEnum<PaymentMethod>(data, "method", ["pix", "card"]),
    amount: requireMoneyCents(
      data,
      "amount",
      "Valor da sessão deve estar em centavos inteiros",
      { allowZero: false }
    ),
    status: requireEnum<PaymentSessionStatus>(data, "status", [
      "created",
      "mock_approved",
      "approved",
      "failed",
      "cancelled"
    ]),
    provider: requireEnum<PaymentProvider>(data, "provider", ["mock"]),
    createdAt: requireString(data, "createdAt"),
    updatedAt: requireString(data, "updatedAt"),
    providerReference: readOptionalString(data, "providerReference"),
    expiresAt: readOptionalString(data, "expiresAt"),
    failureReason: failureReason ? sanitizePublicText(failureReason) : undefined
  };
}

function assertNoCardData(data: Record<string, unknown>): void {
  const hasSensitiveKey = SENSITIVE_PAYMENT_KEYS.some((key) => data[key] !== undefined);

  if (hasSensitiveKey) {
    throw new Error("Dados sensíveis de cartão não podem ser armazenados");
  }
}
