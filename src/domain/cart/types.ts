import { type Product, type ProductVariant } from "@/domain/product/types";

export type CartItem = {
  productId: string;
  variantId?: string;
  productName: string;
  variantLabel?: string;
  unitPrice: number;
  quantity: number;
  lineTotal: number;
};

export type Cart = {
  items: CartItem[];
};

export type CartItemInput = {
  product: Product;
  variant?: ProductVariant;
  quantity: number;
};
