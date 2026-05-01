export type ProductFactoryInput = Partial<{
  id: string;
  name: string;
  slug: string;
  description: string;
  basePrice: number;
  categoryId: string;
  availability: "available" | "unavailable" | "made_to_order";
  salesMode: "ready_to_ship" | "whatsapp_order" | "both";
  status: "active" | "inactive" | "draft";
}>;

export function createProductFixture(input: ProductFactoryInput = {}) {
  return {
    id: input.id ?? "product-1",
    name: input.name ?? "Produto de teste",
    slug: input.slug ?? "produto-de-teste",
    description: input.description ?? "Mock temporário para desenvolvimento.",
    basePrice: input.basePrice ?? 12990,
    categoryId: input.categoryId ?? "pronta-entrega",
    availability: input.availability ?? "available",
    salesMode: input.salesMode ?? "both",
    status: input.status ?? "active",
    createdAt: "2026-05-01T10:00:00.000Z",
    updatedAt: "2026-05-01T10:00:00.000Z"
  };
}
