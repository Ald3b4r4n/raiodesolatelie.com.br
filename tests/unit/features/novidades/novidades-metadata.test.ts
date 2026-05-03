import { describe, expect, it } from "vitest";

import sitemap from "@/app/sitemap";
import { buildNovidadesMetadata } from "@/lib/seo/metadata";

describe("metadata de novidades", () => {
  it("define title, description e Open Graph proprios da rota", () => {
    const metadata = buildNovidadesMetadata();

    expect(metadata.title).toBe("Novidades | Ateliê Raios de Sol");
    expect(metadata.description).toContain("Lançamentos");
    expect(metadata.openGraph).toMatchObject({
      title: "Novidades | Ateliê Raios de Sol",
      url: "https://raiodesolatelie.com.br/novidades",
      locale: "pt_BR",
      type: "website"
    });
  });

  it("inclui a rota de novidades no sitemap publico", () => {
    expect(sitemap()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          url: "https://raiodesolatelie.com.br/novidades",
          changeFrequency: "weekly",
          priority: 0.8
        })
      ])
    );
  });
});
