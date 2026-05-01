export type ProductStatus = "active" | "inactive" | "draft";
export type ProductAvailability = "available" | "unavailable" | "made_to_order";
export type ProductSalesMode = "ready_to_ship" | "whatsapp_order" | "both";

export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  basePrice: number;
  categoryId: string;
  status: ProductStatus;
  availability: ProductAvailability;
  salesMode: ProductSalesMode;
  createdAt: string;
  updatedAt: string;
  imageUrls?: string[];
  featured?: boolean;
  seoTitle?: string;
  seoDescription?: string;
  sortOrder?: number;
};

export type ProductVariantStatus = "active" | "inactive";
export type ProductVariantAvailability = "available" | "unavailable";

export type ProductVariant = {
  id: string;
  productId: string;
  size: string | null;
  color: string | null;
  status: ProductVariantStatus;
  availability: ProductVariantAvailability;
  createdAt: string;
  updatedAt: string;
  priceOverride?: number;
  stockQuantity?: number;
  sku?: string;
};

export type CategoryStatus = "active" | "inactive";

export type Category = {
  id: string;
  slug: string;
  name: string;
  status: CategoryStatus;
  sortOrder: number;
};
