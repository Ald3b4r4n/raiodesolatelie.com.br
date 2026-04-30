export type ProductFactoryInput = Partial<{
  id: string;
  name: string;
  slug: string;
  basePrice: number;
  status: "active" | "inactive" | "draft";
}>;

export function createProductFixture(input: ProductFactoryInput = {}) {
  return {
    id: input.id ?? "product-1",
    name: input.name ?? "Produto de teste",
    slug: input.slug ?? "produto-de-teste",
    basePrice: input.basePrice ?? 12990,
    status: input.status ?? "active"
  };
}
