import { describe, expect, it } from "vitest";

import {
  getUserRole,
  isAdminToken,
  isCustomerToken,
  requireAdmin
} from "@/lib/security/roles";

describe("contrato de roles", () => {
  it("reconhece admin apenas por claim explícita", () => {
    expect(isAdminToken({ uid: "admin-1", admin: true })).toBe(true);
    expect(isAdminToken({ uid: "user-1", admin: false })).toBe(false);
    expect(isAdminToken({ uid: "user-1" })).toBe(false);
  });

  it("classifica cliente autenticado sem claim admin", () => {
    expect(isCustomerToken({ uid: "customer-1" })).toBe(true);
    expect(getUserRole({ uid: "customer-1" })).toBe("customer");
    expect(getUserRole({ uid: "admin-1", admin: true })).toBe("admin");
  });

  it("bloqueia operações admin quando a claim não existe", () => {
    expect(() => requireAdmin({ uid: "customer-1" })).toThrow(
      "Permissão de admin necessária"
    );
  });
});
