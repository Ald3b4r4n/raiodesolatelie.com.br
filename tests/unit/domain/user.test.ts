import { describe, expect, it } from "vitest";

import { assertAdminUser, assertCustomerProfile } from "@/domain/customer/rules";
import { type AdminUser } from "@/domain/admin/types";

describe("dominio de usuarios", () => {
  it("aceita perfil minimo da cliente", () => {
    expect(() =>
      assertCustomerProfile({
        uid: "user-1",
        createdAt: "2026-04-30T10:00:00.000Z",
        updatedAt: "2026-04-30T10:00:00.000Z"
      })
    ).not.toThrow();
  });

  it("rejeita perfil sem uid", () => {
    expect(() =>
      assertCustomerProfile({
        uid: "",
        createdAt: "2026-04-30T10:00:00.000Z",
        updatedAt: "2026-04-30T10:00:00.000Z"
      })
    ).toThrow(/uid/i);
  });

  it("valida admin com role correta", () => {
    const admin: AdminUser = {
      uid: "admin-1",
      email: "admin@example.com",
      role: "admin"
    };

    expect(() => assertAdminUser(admin)).not.toThrow();
  });

  it("bloqueia usuario nao admin", () => {
    expect(() =>
      assertAdminUser({
        uid: "user-1",
        email: "user@example.com",
        role: "customer"
      })
    ).toThrow(/admin/i);
  });
});
