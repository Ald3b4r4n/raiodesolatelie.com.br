export type UserFactoryInput = Partial<{
  uid: string;
  email: string;
  role: "customer" | "admin";
}>;

export function createUserFixture(input: UserFactoryInput = {}) {
  return {
    uid: input.uid ?? "user-1",
    email: input.email ?? "cliente@example.com",
    role: input.role ?? "customer"
  };
}
