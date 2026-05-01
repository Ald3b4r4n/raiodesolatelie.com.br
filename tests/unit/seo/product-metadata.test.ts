import { describe, expect, it } from "vitest";

import { buildProductMetadata } from "@/lib/seo/product";
import { createProductDetailFixture } from "@/test/fixtures/product-detail";

describe("metadata de produto", () => {
  it("gera metadata com dados do produto e open graph", () => {
    const data = createProductDetailFixture();
    const metadata = buildProductMetadata(data.product!);
    const images = Array.isArray(metadata.openGraph?.images)
      ? metadata.openGraph.images
      : metadata.openGraph?.images
        ? [metadata.openGraph.images]
        : [];

    expect(metadata.title).toBe(data.product!.seoTitle ?? data.product!.name);
    expect(metadata.description).toBe(
      data.product!.seoDescription ?? data.product!.description
    );
    expect(metadata.openGraph?.url).toBe(`/products/${data.product!.slug}`);
    expect(images[0]).toEqual(
      expect.objectContaining({
        url: data.product!.imageUrls?.[0]
      })
    );
  });
});
