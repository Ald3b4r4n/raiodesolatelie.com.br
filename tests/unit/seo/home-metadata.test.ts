import { describe, expect, it } from "vitest";

import { metadata } from "@/app/layout";
import robots from "@/app/robots";
import sitemap from "@/app/sitemap";
import { buildHomeMetadata } from "@/lib/seo/metadata";

describe("SEO base da home", () => {
  it("configura metadata e Open Graph da marca", () => {
    const homeMetadata = buildHomeMetadata();

    expect(homeMetadata.title).toBe("Raio de Sol Ateliê | Produtos artesanais");
    expect(homeMetadata.description).toMatch(/e-commerce simples/i);
    expect(homeMetadata.openGraph?.title).toBe(
      "Raio de Sol Ateliê | Produtos artesanais"
    );
    expect(homeMetadata.openGraph?.images).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ url: "/brand/logo-identidade.jpeg" })
      ])
    );
    expect(metadata).toMatchObject(homeMetadata);
  });

  it("configura robots para indexação pública segura", () => {
    expect(robots()).toMatchObject({
      rules: {
        userAgent: "*",
        allow: "/"
      },
      sitemap: "https://raiodesolatelie.com.br/sitemap.xml"
    });
  });

  it("inclui home no sitemap", () => {
    expect(sitemap()).toEqual([
      expect.objectContaining({
        url: "https://raiodesolatelie.com.br",
        changeFrequency: "weekly",
        priority: 1
      })
    ]);
  });
});
