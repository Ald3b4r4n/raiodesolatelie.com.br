import { describe, expect, it } from "vitest";
import { createSmokeMarker } from "../../src/test/utils/smoke";

describe("infraestrutura de testes", () => {
  it("executa um teste smoke unitário com helper compartilhado", () => {
    expect(createSmokeMarker("fase-2")).toEqual({
      label: "fase-2",
      ready: true
    });
  });
});
