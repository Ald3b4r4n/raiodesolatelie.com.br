import {
  assertProductAvailable,
  assertVariantMatchesProduct,
  resolveVariantPrice
} from "@/domain/product/rules";
import { type Product, type ProductVariant } from "@/domain/product/types";

import { type Cart, type CartItem, type CartItemInput } from "./types";

export function addCartItem(cart: Cart, input: CartItemInput): Cart {
  assertProductAvailable(input.product);

  if (input.variant) {
    assertVariantMatchesProduct(input.product, input.variant);
  }

  if (!Number.isFinite(input.quantity) || input.quantity <= 0) {
    throw new Error("Quantidade inválida");
  }

  const unitPrice = resolveVariantPrice(
    input.product,
    input.variant ?? toProductVariant(input.product)
  );
  const variantId = input.variant?.id;
  const existing = cart.items.find(
    (item) => item.productId === input.product.id && item.variantId === variantId
  );

  const nextQuantity = (existing?.quantity ?? 0) + input.quantity;
  const nextItem = buildCartItem(input.product, input.variant, unitPrice, nextQuantity);

  const nextItems = existing
    ? cart.items.map((item) =>
        item.productId === input.product.id && item.variantId === variantId
          ? nextItem
          : item
      )
    : [...cart.items, nextItem];

  return { items: nextItems };
}

export function removeCartItem(cart: Cart, productId: string, variantId?: string): Cart {
  return {
    items: cart.items.filter(
      (item) => item.productId !== productId || item.variantId !== variantId
    )
  };
}

export function updateCartItemQuantity(
  cart: Cart,
  productId: string,
  variantId: string | undefined,
  quantity: number
): Cart {
  if (!Number.isFinite(quantity) || quantity <= 0) {
    throw new Error("Quantidade inválida");
  }

  const found = cart.items.find(
    (item) => item.productId === productId && item.variantId === variantId
  );

  if (!found) {
    throw new Error("Item não encontrado no carrinho");
  }

  const updatedItem: CartItem = {
    ...found,
    quantity,
    lineTotal: found.unitPrice * quantity
  };

  return {
    items: cart.items.map((item) =>
      item.productId === productId && item.variantId === variantId ? updatedItem : item
    )
  };
}

export function calculateCartSubtotal(cart: Cart): number {
  return cart.items.reduce((total, item) => total + item.lineTotal, 0);
}

function buildCartItem(
  product: Product,
  variant: ProductVariant | undefined,
  unitPrice: number,
  quantity: number
): CartItem {
  return {
    productId: product.id,
    variantId: variant?.id,
    productName: product.name,
    variantLabel: buildVariantLabel(variant),
    unitPrice,
    quantity,
    lineTotal: unitPrice * quantity
  };
}

function buildVariantLabel(variant?: ProductVariant): string | undefined {
  if (!variant) {
    return undefined;
  }

  const parts = [variant.size, variant.color].filter(Boolean) as string[];
  return parts.length > 0 ? parts.join(" / ") : undefined;
}

function toProductVariant(product: Product): ProductVariant {
  return {
    id: `${product.id}-default`,
    productId: product.id,
    size: null,
    color: null,
    status: "active",
    availability: "available",
    createdAt: product.createdAt,
    updatedAt: product.updatedAt
  };
}
