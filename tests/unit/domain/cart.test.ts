import { describe, expect, it } from "vitest";

import {
  addCartItem,
  calculateCartSubtotal,
  removeCartItem,
  updateCartItemQuantity
} from "@/domain/cart/rules";
import { type Cart } from "@/domain/cart/types";
import { type Product, type ProductVariant } from "@/domain/product/types";

describe("dominio de carrinho", () => {
  const product: Product = {
    id: "product-1",
    slug: "bolsa-tecido",
    name: "Bolsa de tecido",
    description: "Bolsa artesanal",
    basePrice: 15990,
    categoryId: "cat-1",
    status: "active",
    availability: "available",
    salesMode: "both",
    createdAt: "2026-04-30T10:00:00.000Z",
    updatedAt: "2026-04-30T10:00:00.000Z"
  };

  const variant: ProductVariant = {
    id: "variant-1",
    productId: "product-1",
    size: "M",
    color: "Bege",
    status: "active",
    availability: "available",
    createdAt: "2026-04-30T10:00:00.000Z",
    updatedAt: "2026-04-30T10:00:00.000Z"
  };

  it("adiciona item e recalcula subtotal", () => {
    const cart: Cart = { items: [] };
    const updated = addCartItem(cart, { product, variant, quantity: 2 });

    expect(updated.items).toHaveLength(1);
    expect(calculateCartSubtotal(updated)).toBe(31980);
  });

  it("remove item do carrinho", () => {
    const cart = addCartItem({ items: [] }, { product, variant, quantity: 1 });
    const updated = removeCartItem(cart, "product-1", "variant-1");

    expect(updated.items).toHaveLength(0);
  });

  it("atualiza quantidade do item", () => {
    const cart = addCartItem({ items: [] }, { product, variant, quantity: 1 });
    const updated = updateCartItemQuantity(cart, "product-1", "variant-1", 3);

    expect(updated.items[0]?.quantity).toBe(3);
  });

  it("rejeita variacao invalida", () => {
    expect(() =>
      addCartItem(
        { items: [] },
        {
          product,
          variant: { ...variant, productId: "other-product" },
          quantity: 1
        }
      )
    ).toThrow(/varia[cç][aã]o/i);
  });
});
