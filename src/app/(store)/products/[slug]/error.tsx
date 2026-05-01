"use client";

import { ProductDetailSection } from "@/features/product/ProductDetailSection";

export default function ProductErrorPage() {
  return (
    <ProductDetailSection
      data={{
        notFound: false,
        errorMessage: "Não foi possível carregar este produto agora."
      }}
    />
  );
}
