import {
  type DeliveryMethod,
  type Order,
  type OrderCouponSnapshot,
  type OrderCustomerSnapshot,
  type OrderItemSnapshot,
  type OrderPaymentMethod,
  type OrderShippingOptionSnapshot,
  type OrderStatus,
  type PaymentStatus,
  type ShippingAddress
} from "@/domain/order/types";
import { sanitizePublicText } from "@/lib/security/sanitize";
import {
  readNullableString,
  readOptionalString,
  requireEnum,
  requireMoneyCents,
  requirePositiveInteger,
  requireRecord,
  requireString
} from "@/validators/primitives";

export function parseOrderInput(input: unknown): Order {
  const data = requireRecord(input, "Pedido inválido");
  const items = parseOrderItems(data.items);
  const subtotal = requireMoneyCents(data, "subtotal", "Subtotal inválido");
  const discountTotal = requireMoneyCents(
    data,
    "discountTotal",
    "Desconto total inválido"
  );
  const shippingTotal = requireMoneyCents(data, "shippingTotal", "Frete inválido");
  const total = requireMoneyCents(data, "total", "Total inválido");
  const deliveryMethod = requireEnum<DeliveryMethod>(data, "deliveryMethod", [
    "local_pickup",
    "shipping"
  ]);

  validateTotals(items, subtotal, discountTotal, shippingTotal, total);

  return {
    id: requireString(data, "id"),
    orderNumber: requireString(data, "orderNumber"),
    customerId: readNullableString(data, "customerId"),
    customerSnapshot: parseCustomerSnapshot(data.customerSnapshot),
    items,
    subtotal,
    discountTotal,
    shippingTotal,
    total,
    deliveryMethod,
    paymentMethod: requireEnum<OrderPaymentMethod>(data, "paymentMethod", [
      "pix",
      "card"
    ]),
    paymentStatus: requireEnum<PaymentStatus>(data, "paymentStatus", [
      "pending",
      "mock_approved",
      "approved",
      "failed",
      "cancelled"
    ]),
    orderStatus: requireEnum<OrderStatus>(data, "orderStatus", [
      "draft",
      "placed",
      "confirmed",
      "preparing",
      "ready",
      "shipped",
      "completed",
      "cancelled"
    ]),
    createdAt: requireString(data, "createdAt"),
    updatedAt: requireString(data, "updatedAt"),
    shippingAddress: parseShippingAddressForDelivery(data, deliveryMethod),
    shippingOptionSnapshot: parseShippingOptionSnapshot(data.shippingOptionSnapshot),
    couponSnapshot: parseCouponSnapshot(data.couponSnapshot),
    notes: sanitizeOptionalText(data, "notes"),
    paymentSessionId: readOptionalString(data, "paymentSessionId")
  };
}

function parseOrderItems(input: unknown): OrderItemSnapshot[] {
  if (!Array.isArray(input) || input.length === 0) {
    throw new Error("Pedido deve conter ao menos um item");
  }

  return input.map(parseOrderItem);
}

function parseOrderItem(input: unknown): OrderItemSnapshot {
  const data = requireRecord(input, "Item do pedido inválido");
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
    throw new Error("Total da linha do pedido inválido");
  }

  return {
    productId: requireString(data, "productId"),
    productName: sanitizePublicText(requireString(data, "productName")),
    productSlug: requireString(data, "productSlug"),
    variantId: readOptionalString(data, "variantId"),
    size: sanitizeNullableText(data, "size"),
    color: sanitizeNullableText(data, "color"),
    unitPrice,
    quantity,
    lineTotal
  };
}

function parseCustomerSnapshot(input: unknown): OrderCustomerSnapshot {
  const data = requireRecord(input, "Dados da cliente inválidos");
  const email = readOptionalString(data, "email");
  const phone = readOptionalString(data, "phone");

  if (!email && !phone) {
    throw new Error("Pedido exige e-mail ou telefone da cliente");
  }

  return {
    name: sanitizePublicText(requireString(data, "name")),
    email,
    phone
  };
}

function parseShippingAddressForDelivery(
  data: Record<string, unknown>,
  deliveryMethod: DeliveryMethod
): ShippingAddress | undefined {
  if (deliveryMethod === "local_pickup") {
    return undefined;
  }

  if (data.shippingAddress === undefined) {
    throw new Error("Endereço é obrigatório para frete");
  }

  return parseShippingAddress(data.shippingAddress);
}

function parseShippingAddress(input: unknown): ShippingAddress {
  const data = requireRecord(input, "Endereço inválido");
  const complement = readOptionalString(data, "complement");

  return {
    recipientName: sanitizePublicText(requireString(data, "recipientName")),
    postalCode: requireString(data, "postalCode"),
    street: sanitizePublicText(requireString(data, "street")),
    number: sanitizePublicText(requireString(data, "number")),
    neighborhood: sanitizePublicText(requireString(data, "neighborhood")),
    city: sanitizePublicText(requireString(data, "city")),
    state: requireString(data, "state"),
    complement: complement ? sanitizePublicText(complement) : undefined
  };
}

function parseShippingOptionSnapshot(
  input: unknown
): OrderShippingOptionSnapshot | undefined {
  if (input === undefined) {
    return undefined;
  }

  const data = requireRecord(input, "Opção de entrega inválida");

  return {
    id: requireString(data, "id"),
    type: requireEnum<DeliveryMethod>(data, "type", ["local_pickup", "shipping"]),
    label: sanitizePublicText(requireString(data, "label")),
    price: requireMoneyCents(
      data,
      "price",
      "Preço da entrega deve estar em centavos inteiros"
    ),
    provider: readOptionalString(data, "provider")
  };
}

function parseCouponSnapshot(input: unknown): OrderCouponSnapshot | undefined {
  if (input === undefined) {
    return undefined;
  }

  const data = requireRecord(input, "Cupom do pedido inválido");

  return {
    code: requireString(data, "code"),
    discountType: requireEnum(data, "discountType", ["percentage", "fixed_amount"]),
    discountValue: requirePositiveInteger(
      data,
      "discountValue",
      "Valor do cupom inválido"
    ),
    discountTotal: requireMoneyCents(
      data,
      "discountTotal",
      "Desconto do pedido deve estar em centavos inteiros"
    )
  };
}

function validateTotals(
  items: OrderItemSnapshot[],
  subtotal: number,
  discountTotal: number,
  shippingTotal: number,
  total: number
): void {
  const itemsSubtotal = items.reduce((sum, item) => sum + item.lineTotal, 0);

  if (subtotal !== itemsSubtotal) {
    throw new Error("Subtotal do pedido inválido");
  }

  if (discountTotal > subtotal) {
    throw new Error("Desconto total inválido");
  }

  if (total !== subtotal - discountTotal + shippingTotal) {
    throw new Error("Total do pedido inválido");
  }
}

function sanitizeNullableText(data: Record<string, unknown>, key: string): string | null {
  const value = readNullableString(data, key);

  return value ? sanitizePublicText(value) : null;
}

function sanitizeOptionalText(
  data: Record<string, unknown>,
  key: string
): string | undefined {
  const value = readOptionalString(data, key);

  return value ? sanitizePublicText(value) : undefined;
}
