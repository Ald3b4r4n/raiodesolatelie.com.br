import { matchesProductQuery } from "@/domain/product/search";
import { isCategoryActive, sortCategories } from "@/domain/product/category";
import { isProductActive } from "@/domain/product/rules";
import type { Category, Product, ProductAvailability } from "@/domain/product/types";

import { mockCatalogCategories, mockCatalogProducts } from "./catalog-mock-data";

export type CatalogQueryInput = Partial<{
  q: string;
  category: string;
  minPrice: string;
  maxPrice: string;
  availability: ProductAvailability;
}>;

export type CatalogAppliedFilters = {
  q?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  availability?: ProductAvailability;
  hasActiveFilters: boolean;
};

export type CatalogPageData = {
  title: string;
  description: string;
  products: Product[];
  categories: Category[];
  appliedFilters: CatalogAppliedFilters;
  emptyState: {
    title: string;
    description: string;
  };
  errorMessage?: string;
};

type ProductCatalogServiceDependencies = {
  readProducts?: () => Promise<Array<Partial<Product> | undefined>>;
  readCategories?: () => Promise<Array<Partial<Category> | undefined>>;
};

export class ProductCatalogService {
  private readonly readProducts: () => Promise<Array<Partial<Product> | undefined>>;
  private readonly readCategories: () => Promise<Array<Partial<Category> | undefined>>;

  constructor(dependencies: ProductCatalogServiceDependencies = {}) {
    this.readProducts =
      dependencies.readProducts ?? (async () => structuredClone(mockCatalogProducts));
    this.readCategories =
      dependencies.readCategories ?? (async () => structuredClone(mockCatalogCategories));
  }

  async listCatalog(input: CatalogQueryInput = {}): Promise<CatalogPageData> {
    const filters = parseCatalogFilters(input);
    const [products, categories] = await Promise.all([
      this.readProducts(),
      this.readCategories()
    ]);

    const normalizedProducts = products
      .map(normalizeProductRecord)
      .filter((product): product is Product => product !== undefined)
      .filter(isProductActive)
      .filter((product) => matchesFilters(product, filters));

    const normalizedCategories = sortCategories(
      categories
        .map(normalizeCategoryRecord)
        .filter((category): category is Category => category !== undefined)
        .filter(isCategoryActive)
    );

    return {
      title: "Coleção em destaque",
      description:
        "Seleção do ateliê com peças artesanais em crochê para praia, passeio e looks leves.",
      products: normalizedProducts.sort((left, right) => {
        return (
          (left.sortOrder ?? Number.MAX_SAFE_INTEGER) -
          (right.sortOrder ?? Number.MAX_SAFE_INTEGER)
        );
      }),
      categories: normalizedCategories,
      appliedFilters: filters,
      emptyState: {
        title: "Nenhum produto encontrado",
        description: "Tente buscar por outro termo ou escolha outra categoria."
      }
    };
  }
}

function parseCatalogFilters(input: CatalogQueryInput): CatalogAppliedFilters {
  const q = readOptionalString(input.q);
  const category = readOptionalString(input.category);
  const availability = readAvailability(input.availability);
  const minPrice = readOptionalPrice(input.minPrice, "minPrice");
  const maxPrice = readOptionalPrice(input.maxPrice, "maxPrice");

  if (minPrice !== undefined && maxPrice !== undefined && minPrice > maxPrice) {
    throw new Error("Faixa de preço inválida");
  }

  return {
    q,
    category,
    minPrice,
    maxPrice,
    availability,
    hasActiveFilters: Boolean(
      q || category || availability || minPrice !== undefined || maxPrice !== undefined
    )
  };
}

function readOptionalString(value: string | undefined): string | undefined {
  const normalized = value?.trim();
  return normalized ? normalized : undefined;
}

function readOptionalPrice(value: string | undefined, key: string): number | undefined {
  if (!value?.trim()) {
    return undefined;
  }

  const parsed = Number.parseInt(value, 10);

  if (!Number.isInteger(parsed) || parsed < 0) {
    throw new Error(`Campo inválido: ${key}`);
  }

  return parsed;
}

function readAvailability(
  value: ProductAvailability | undefined
): ProductAvailability | undefined {
  if (!value) {
    return undefined;
  }

  if (!["available", "unavailable", "made_to_order"].includes(value)) {
    throw new Error("Disponibilidade inválida");
  }

  return value;
}

function matchesFilters(product: Product, filters: CatalogAppliedFilters): boolean {
  if (filters.category && product.categoryId !== filters.category) {
    return false;
  }

  if (filters.availability && product.availability !== filters.availability) {
    return false;
  }

  if (filters.minPrice !== undefined && product.basePrice < filters.minPrice) {
    return false;
  }

  if (filters.maxPrice !== undefined && product.basePrice > filters.maxPrice) {
    return false;
  }

  return matchesProductQuery(product.searchIndex, filters.q);
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
    searchIndex:
      record.searchIndex ?? `${record.name} ${record.description}`.toLowerCase(),
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
