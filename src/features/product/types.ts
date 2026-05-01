import type { ProductDetail } from "@/services/firebase/product-detail";

export type PreparedCartItem = {
  productId: string;
  variantId?: string;
  quantity: number;
};

export type ProductDetailViewData = Partial<ProductDetail> & {
  errorMessage?: string;
  notFound?: boolean;
};
