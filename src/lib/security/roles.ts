export type UserRole = "public" | "customer" | "admin";

export type AuthTokenLike = {
  uid?: string;
  admin?: unknown;
  role?: unknown;
};

export function isAdminToken(token: AuthTokenLike | null | undefined): boolean {
  return token?.admin === true || token?.role === "admin";
}

export function isCustomerToken(token: AuthTokenLike | null | undefined): boolean {
  return Boolean(token?.uid) && !isAdminToken(token);
}

export function getUserRole(token: AuthTokenLike | null | undefined): UserRole {
  if (!token?.uid) {
    return "public";
  }

  return isAdminToken(token) ? "admin" : "customer";
}

export function requireAdmin(token: AuthTokenLike | null | undefined): void {
  if (!isAdminToken(token)) {
    throw new Error("Permissão de admin necessária");
  }
}
