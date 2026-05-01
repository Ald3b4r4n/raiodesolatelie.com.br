import { type Category } from "@/domain/product/types";

export function isCategoryActive(category: Category): boolean {
  return category.status === "active";
}

export function sortCategories(categories: Category[]): Category[] {
  return [...categories].sort((left, right) => left.sortOrder - right.sortOrder);
}
