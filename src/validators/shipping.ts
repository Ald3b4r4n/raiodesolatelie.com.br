import {
  type ShippingOption,
  type ShippingOptionType,
  type ShippingProvider
} from "@/domain/shipping/types";
import { sanitizePublicText } from "@/lib/security/sanitize";
import {
  readOptionalEnum,
  readOptionalNonNegativeInteger,
  readOptionalString,
  requireBoolean,
  requireEnum,
  requireMoneyCents,
  requireRecord,
  requireString
} from "@/validators/primitives";

export function parseShippingOptionInput(input: unknown): ShippingOption {
  const data = requireRecord(input, "Opção de entrega inválida");
  const reasonUnavailable = readOptionalString(data, "reasonUnavailable");

  return {
    id: requireString(data, "id"),
    type: requireEnum<ShippingOptionType>(data, "type", ["local_pickup", "shipping"]),
    label: sanitizePublicText(requireString(data, "label")),
    price: requireMoneyCents(
      data,
      "price",
      "Preço da opção de entrega deve estar em centavos inteiros"
    ),
    available: requireBoolean(data, "available"),
    estimatedDays: readOptionalNonNegativeInteger(
      data,
      "estimatedDays",
      "Prazo estimado deve ser inteiro e não negativo"
    ),
    postalCode: readOptionalString(data, "postalCode"),
    provider: readOptionalEnum<ShippingProvider>(data, "provider", [
      "mock",
      "correios_future"
    ]),
    reasonUnavailable: reasonUnavailable
      ? sanitizePublicText(reasonUnavailable)
      : undefined
  };
}
