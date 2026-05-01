import { type Cart, type CartItem } from "@/domain/cart/types";
import { sanitizePublicText } from "@/lib/security/sanitize";
import {
  readOptionalString,
  requireMoneyCents,
  requirePositiveInteger,
  requireRecord,
  requireString
} from "@/validators/primitives";

export function parseCartInput(input: unknown): Cart {
  const data = requireRecord(input, "Carrinho inválido");
  const items = data.items;

  if (!Array.isArray(items)) {
    throw new Error("Itens do carrinho são obrigatórios");
  }

  return {
    items: items.map(parseCartItemInput)
  };
}

function parseCartItemInput(input: unknown): CartItem {
  const data = requireRecord(input, "Item do carrinho inválido");
  const variantLabel = readOptionalString(data, "variantLabel");
  const unitPrice = requireMoneyCents(
    data,
    "unitPrice",
    "Preço do item deve estar em centavos inteiros",
    { allowZero: false }
  );
  const quantity = requirePositiveInteger(
    data,
    "quantity",
    "Quantidade deve ser um número inteiro positivo"
  );
  const lineTotal = requireMoneyCents(
    data,
    "lineTotal",
    "Total da linha deve estar em centavos inteiros",
    { allowZero: false }
  );

  if (lineTotal !== unitPrice * quantity) {
    throw new Error("Total da linha do carrinho inválido");
  }

  return {
    productId: requireString(data, "productId"),
    variantId: readOptionalString(data, "variantId"),
    productName: sanitizePublicText(requireString(data, "productName")),
    variantLabel: variantLabel ? sanitizePublicText(variantLabel) : undefined,
    unitPrice,
    quantity,
    lineTotal
  };
}
