import { DEFAULT_STORE_WHATSAPP_PHONE } from "@/lib/config/store";
import { isCategoryActive } from "@/domain/product/category";
import { isProductActive } from "@/domain/product/rules";
import type { Category, Product, ProductVariant } from "@/domain/product/types";

import { mockCatalogCategories, mockCatalogProductDetails } from "./catalog-mock-data";

export type ProductDetail = {
  product: Product;
  category: Category;
  variants: ProductVariant[];
  whatsappPhone?: string;
};

type ProductDetailDependencies = {
  readProductBySlug?: (slug: string) => Promise<Partial<Product> | undefined>;
  readCategoryById?: (categoryId: string) => Promise<Partial<Category> | undefined>;
  readVariantsByProductId?: (
    productId: string
  ) => Promise<Array<Partial<ProductVariant> | undefined>>;
  env?: Record<string, string | undefined>;
};

export class ProductDetailService {
  private readonly readProductBySlug: (
    slug: string
  ) => Promise<Partial<Product> | undefined>;
  private readonly readCategoryById: (
    categoryId: string
  ) => Promise<Partial<Category> | undefined>;
  private readonly readVariantsByProductId: (
    productId: string
  ) => Promise<Array<Partial<ProductVariant> | undefined>>;
  private readonly env: Record<string, string | undefined>;

  constructor(dependencies: ProductDetailDependencies = {}) {
    this.readProductBySlug =
      dependencies.readProductBySlug ??
      (async (slug) => structuredClone(mockCatalogProductDetails[slug]?.product));
    this.readCategoryById =
      dependencies.readCategoryById ??
      (async (categoryId) =>
        structuredClone(
          mockCatalogCategories.find((category) => category.id === categoryId)
        ));
    this.readVariantsByProductId =
      dependencies.readVariantsByProductId ??
      (async (productId) =>
        structuredClone(
          Object.values(mockCatalogProductDetails).find(
            (detail) => detail.product.id === productId
          )?.variants ?? []
        ));
    this.env = dependencies.env ?? process.env;
  }

  async getBySlug(slug: string): Promise<ProductDetail | undefined> {
    const product = normalizeProductRecord(await this.readProductBySlug(slug));

    if (!product || !isProductActive(product)) {
      return undefined;
    }

    const [categoryRecord, variantRecords] = await Promise.all([
      this.readCategoryById(product.categoryId),
      this.readVariantsByProductId(product.id)
    ]);

    const category = normalizeCategoryRecord(categoryRecord);

    if (!category || !isCategoryActive(category)) {
      return undefined;
    }

    const variants = variantRecords
      .map(normalizeVariantRecord)
      .filter((variant): variant is ProductVariant => variant !== undefined)
      .filter((variant) => variant.productId === product.id);

    return {
      product,
      category,
      variants,
      whatsappPhone: this.env.STORE_WHATSAPP_PHONE ?? DEFAULT_STORE_WHATSAPP_PHONE
    };
  }
}

function normalizeProductRecord(
  record: Partial<Product> | undefined
): Product | undefined {
  if (!record?.id || !record.slug || !record.name || !record.description) {
    return undefined;
  }

  if (
    !record.categoryId ||
    typeof record.basePrice !== "number" ||
    !record.status ||
    !record.availability ||
    !record.salesMode ||
    !record.createdAt ||
    !record.updatedAt
  ) {
    return undefined;
  }

  return {
    id: record.id,
    slug: record.slug,
    name: record.name,
    description: record.description,
    searchIndex: record.searchIndex,
    basePrice: record.basePrice,
    categoryId: record.categoryId,
    status: record.status,
    availability: record.availability,
    salesMode: record.salesMode,
    createdAt: record.createdAt,
    updatedAt: record.updatedAt,
    imageUrls: record.imageUrls,
    featured: record.featured,
    seoTitle: record.seoTitle,
    seoDescription: record.seoDescription,
    sortOrder: record.sortOrder
  };
}

function normalizeCategoryRecord(
  record: Partial<Category> | undefined
): Category | undefined {
  if (!record?.id || !record.slug || !record.name || !record.status) {
    return undefined;
  }

  return {
    id: record.id,
    slug: record.slug,
    name: record.name,
    status: record.status,
    sortOrder: record.sortOrder ?? 0
  };
}

function normalizeVariantRecord(
  record: Partial<ProductVariant> | undefined
): ProductVariant | undefined {
  if (!record?.id || !record.productId || !record.status || !record.availability) {
    return undefined;
  }

  if (!record.createdAt || !record.updatedAt) {
    return undefined;
  }

  return {
    id: record.id,
    productId: record.productId,
    size: record.size ?? null,
    color: record.color ?? null,
    status: record.status,
    availability: record.availability,
    createdAt: record.createdAt,
    updatedAt: record.updatedAt,
    priceOverride: record.priceOverride,
    stockQuantity: record.stockQuantity,
    sku: record.sku
  };
}
