import {
  mockCatalogCategories,
  mockCatalogProducts
} from "../../src/services/firebase/catalog-mock-data";

export const emulatorCatalogSeed = {
  categories: mockCatalogCategories,
  products: mockCatalogProducts.map((product) => ({
    ...product,
    seedOnly: true
  }))
};
