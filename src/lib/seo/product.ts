import type { Metadata } from "next";

import type { Product } from "@/domain/product/types";
import { siteUrl } from "@/lib/seo/metadata";

export function buildProductMetadata(product: Product): Metadata {
  const title = product.seoTitle ?? product.name;
  const description = product.seoDescription ?? product.description;
  const canonicalPath = `/products/${product.slug}`;
  const imageUrl = product.imageUrls?.[0] ?? "/brand/logo-identidade.jpeg";

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    alternates: {
      canonical: canonicalPath
    },
    openGraph: {
      title,
      description,
      url: canonicalPath,
      siteName: "Raio de Sol Ateliê",
      locale: "pt_BR",
      type: "website",
      images: [
        {
          url: imageUrl,
          alt: `Imagem de ${product.name}`
        }
      ]
    }
  };
}
