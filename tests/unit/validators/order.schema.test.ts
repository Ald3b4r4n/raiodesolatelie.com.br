import { describe, expect, it } from "vitest";

import { parseOrderInput } from "@/validators/order";

const validOrderInput = {
  id: "order-1",
  orderNumber: "RS-0001",
  customerId: "customer-1",
  customerSnapshot: {
    name: "Cliente <b>Teste</b>",
    email: "cliente@example.com",
    phone: "+5511999999999"
  },
  items: [
    {
      productId: "product-1",
      productName: "Bolsa",
      productSlug: "bolsa",
      variantId: "variant-1",
      size: "M",
      color: "Azul",
      unitPrice: 15990,
      quantity: 1,
      lineTotal: 15990
    }
  ],
  subtotal: 15990,
  discountTotal: 0,
  shippingTotal: 0,
  total: 15990,
  deliveryMethod: "local_pickup",
  paymentMethod: "pix",
  paymentStatus: "pending",
  orderStatus: "placed",
  createdAt: "2026-04-30T10:00:00.000Z",
  updatedAt: "2026-04-30T10:00:00.000Z"
};

describe("schema de pedido", () => {
  it("aceita pedido válido, sanitiza dados públicos e não preserva CPF", () => {
    const parsed = parseOrderInput({
      ...validOrderInput,
      customerSnapshot: {
        ...validOrderInput.customerSnapshot,
        cpf: "000.000.000-00"
      }
    });

    expect(parsed.customerSnapshot.name).toContain("&lt;b&gt;");
    expect(parsed.customerSnapshot).not.toHaveProperty("cpf");
  });

  it("exige endereço somente quando o método de entrega for frete", () => {
    expect(() =>
      parseOrderInput({
        ...validOrderInput,
        deliveryMethod: "shipping",
        shippingAddress: undefined
      })
    ).toThrow(/endereço/i);
  });

  it("rejeita total inconsistente com subtotal, desconto e frete", () => {
    expect(() =>
      parseOrderInput({
        ...validOrderInput,
        total: 1
      })
    ).toThrow(/total/i);
  });
});
