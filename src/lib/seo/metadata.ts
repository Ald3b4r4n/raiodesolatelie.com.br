import type { Metadata } from "next";

import { PUBLIC_BRAND_NAME } from "@/lib/config/store";

export const siteUrl = "https://raiodesolatelie.com.br";

export function buildHomeMetadata(): Metadata {
  const title = `${PUBLIC_BRAND_NAME} | Produtos artesanais`;
  const description = `E-commerce simples e mobile-first do ${PUBLIC_BRAND_NAME} para produtos artesanais próprios, com atendimento direto e compra prática.`;

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    openGraph: {
      title,
      description,
      url: siteUrl,
      siteName: PUBLIC_BRAND_NAME,
      locale: "pt_BR",
      type: "website",
      images: [
        {
          url: "/brand/logo-identidade.png",
          width: 512,
          height: 512,
          alt: `Logo do ${PUBLIC_BRAND_NAME}`
        }
      ]
    }
  };
}
