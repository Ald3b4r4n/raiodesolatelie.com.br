import type { Category, Product, ProductAvailability } from "@/domain/product/types";

export type CatalogFiltersValue = Partial<{
  q: string;
  category: string;
  minPrice: string;
  maxPrice: string;
  availability: ProductAvailability;
}>;

export type CatalogViewData = {
  title: string;
  description: string;
  products: Product[];
  categories: Category[];
  currentFilters: CatalogFiltersValue;
  emptyState: {
    title: string;
    description: string;
  };
  errorMessage?: string;
};
