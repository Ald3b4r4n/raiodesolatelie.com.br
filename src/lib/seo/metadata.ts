import type { Metadata } from "next";

export const siteUrl = "https://raiodesolatelie.com.br";

export function buildHomeMetadata(): Metadata {
  const title = "Raio de Sol Ateliê | Produtos artesanais";
  const description =
    "E-commerce simples e mobile-first do Raio de Sol Ateliê para produtos artesanais próprios, com atendimento direto e compra prática.";

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    openGraph: {
      title,
      description,
      url: siteUrl,
      siteName: "Raio de Sol Ateliê",
      locale: "pt_BR",
      type: "website",
      images: [
        {
          url: "/brand/logo-identidade.jpeg",
          width: 512,
          height: 512,
          alt: "Logo do Raio de Sol Ateliê"
        }
      ]
    }
  };
}
