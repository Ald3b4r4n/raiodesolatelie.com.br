import { describe, expect, it } from "vitest";

import { designTokens } from "@/components/ui/tokens";

describe("tokens de design", () => {
  it("define uma paleta simples, leve e com contraste para texto principal", () => {
    expect(designTokens.colors.background).toBe("#fffaf3");
    expect(designTokens.colors.foreground).toBe("#2f2924");
    expect(designTokens.colors.accent).toBe("#9a5a35");
    expect(designTokens.radii.card).toBe("8px");
  });

  it("define tamanhos de toque compatíveis com navegação mobile", () => {
    expect(designTokens.size.touchTarget).toBe("44px");
  });
});
