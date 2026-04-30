export type OrderFactoryInput = Partial<{
  id: string;
  orderNumber: string;
  total: number;
  status: "placed" | "confirmed" | "cancelled";
}>;

export function createOrderFixture(input: OrderFactoryInput = {}) {
  return {
    id: input.id ?? "order-1",
    orderNumber: input.orderNumber ?? "RDS-0001",
    total: input.total ?? 12990,
    status: input.status ?? "placed"
  };
}
