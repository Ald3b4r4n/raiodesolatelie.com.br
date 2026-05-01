import { describe, expect, it } from "vitest";

import { sanitizePublicFields, sanitizePublicText } from "@/lib/security/sanitize";

describe("sanitizacao de campos publicos", () => {
  it("escapa HTML potencialmente perigoso", () => {
    const output = sanitizePublicText("<script>alert(1)</script>");

    expect(output).toBe("&lt;script&gt;alert(1)&lt;/script&gt;");
  });

  it("sanitiza campos selecionados sem alterar outros", () => {
    const result = sanitizePublicFields(
      {
        name: "<b>Nome</b>",
        description: "Descricao <img src=x />",
        internalNote: "nao alterar"
      },
      ["name", "description"]
    );

    expect(result.name).toBe("&lt;b&gt;Nome&lt;/b&gt;");
    expect(result.description).toContain("&lt;img");
    expect(result.internalNote).toBe("nao alterar");
  });
});
