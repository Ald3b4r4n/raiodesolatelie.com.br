import { describe, expect, it } from "vitest";

import { metadata, viewport } from "@/app/layout";
import robots from "@/app/robots";
import sitemap from "@/app/sitemap";
import { buildHomeMetadata } from "@/lib/seo/metadata";

describe("SEO base da home", () => {
  it("configura metadata e Open Graph da marca", () => {
    const homeMetadata = buildHomeMetadata();

    expect(homeMetadata.title).toBe("Ateliê Raios de Sol | Produtos artesanais");
    expect(homeMetadata.description).toMatch(/e-commerce simples/i);
    expect(homeMetadata.openGraph?.title).toBe(
      "Ateliê Raios de Sol | Produtos artesanais"
    );
    expect(homeMetadata.openGraph?.images).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          url: "/brand/logo-identidade.png",
          alt: "Logo do Ateliê Raios de Sol"
        })
      ])
    );
    expect(JSON.stringify(homeMetadata)).not.toContain(
      ["logo-identidade", "jpeg"].join(".")
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

  it("define viewport mobile real para telas pequenas", () => {
    expect(viewport).toMatchObject({
      width: "device-width",
      initialScale: 1,
      viewportFit: "cover"
    });
  });

  it("inclui home no sitemap", () => {
    expect(sitemap()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          url: "https://raiodesolatelie.com.br",
          changeFrequency: "weekly",
          priority: 1
        })
      ])
    );
  });
});
