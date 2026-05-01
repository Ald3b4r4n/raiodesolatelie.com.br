import {
  type Coupon,
  type CouponDiscountType,
  type CouponStatus
} from "@/domain/coupon/types";
import { sanitizePublicText } from "@/lib/security/sanitize";

import { normalizeCouponCode } from "@/domain/coupon/rules";
import {
  readOptionalMoneyCents,
  readOptionalNonNegativeInteger,
  readOptionalString,
  requireEnum,
  requireMoneyCents,
  requirePositiveInteger,
  requireRecord,
  requireString
} from "@/validators/primitives";

export function parseCouponInput(input: unknown): Coupon {
  const data = requireRecord(input, "Cupom inválido");
  const discountType = requireEnum<CouponDiscountType>(data, "discountType", [
    "percentage",
    "fixed_amount"
  ]);
  const discountValue = parseDiscountValue(data, discountType);
  const description = readOptionalString(data, "description");

  return {
    id: requireString(data, "id"),
    code: normalizeCouponCode(requireString(data, "code")),
    discountType,
    discountValue,
    status: requireEnum<CouponStatus>(data, "status", ["active", "inactive"]),
    validFrom: requireString(data, "validFrom"),
    validUntil: requireString(data, "validUntil"),
    createdAt: requireString(data, "createdAt"),
    updatedAt: requireString(data, "updatedAt"),
    maxUses: readOptionalPositiveInteger(data, "maxUses"),
    usedCount: readOptionalNonNegativeInteger(
      data,
      "usedCount",
      "Usos do cupom devem ser um número inteiro não negativo"
    ),
    minimumSubtotal: readOptionalMoneyCents(
      data,
      "minimumSubtotal",
      "Subtotal mínimo deve estar em centavos inteiros"
    ),
    description: description ? sanitizePublicText(description) : undefined
  };
}

function parseDiscountValue(
  data: Record<string, unknown>,
  discountType: CouponDiscountType
): number {
  if (discountType === "percentage") {
    const value = requirePositiveInteger(
      data,
      "discountValue",
      "Percentual de desconto inválido"
    );

    if (value > 100) {
      throw new Error("Percentual de desconto inválido");
    }

    return value;
  }

  return requireMoneyCents(
    data,
    "discountValue",
    "Valor de desconto deve estar em centavos inteiros",
    { allowZero: false }
  );
}

function readOptionalPositiveInteger(
  data: Record<string, unknown>,
  key: string
): number | undefined {
  const value = data[key];

  if (value === undefined) {
    return undefined;
  }

  return requirePositiveInteger(data, key, `Campo inválido: ${key}`);
}
