import { describe, expect, it } from "vitest";

import { parseAdminUserInput, parseCustomerProfileInput } from "@/validators/user";

describe("schema de perfil da cliente", () => {
  it("aceita perfil mínimo e sanitiza nome público", () => {
    const parsed = parseCustomerProfileInput({
      uid: "customer-1",
      displayName: "<script>Maria</script>",
      email: "maria@example.com",
      phone: "+5511999999999",
      cpf: "000.000.000-00",
      createdAt: "2026-04-30T10:00:00.000Z",
      updatedAt: "2026-04-30T10:00:00.000Z"
    });

    expect(parsed.displayName).toContain("&lt;script&gt;");
    expect(parsed).not.toHaveProperty("cpf");
  });

  it("rejeita preferência de retirada inválida", () => {
    expect(() =>
      parseCustomerProfileInput({
        uid: "customer-1",
        defaultPickupPreference: "address_book",
        createdAt: "2026-04-30T10:00:00.000Z",
        updatedAt: "2026-04-30T10:00:00.000Z"
      })
    ).toThrow(/preferência/i);
  });
});

describe("schema de admin", () => {
  it("exige role admin explícita", () => {
    const parsed = parseAdminUserInput({
      uid: "admin-1",
      email: "admin@example.com",
      role: "admin"
    });

    expect(parsed.role).toBe("admin");
  });

  it("rejeita usuário sem permissão admin", () => {
    expect(() =>
      parseAdminUserInput({
        uid: "user-1",
        email: "user@example.com",
        role: "customer"
      })
    ).toThrow(/admin/i);
  });
});
