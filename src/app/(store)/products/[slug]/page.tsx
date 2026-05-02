import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProductDetailSection } from "@/features/product";
import { buildProductMetadata } from "@/lib/seo/product";
import { ProductDetailService } from "@/services/firebase/product-detail";

type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const detail = await new ProductDetailService().getBySlug(slug);

  if (!detail) {
    return {
      title: "Produto não encontrado | Raio de Sol Ateliê",
      description: "Produto indisponível no momento."
    };
  }

  return buildProductMetadata(detail.product);
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const detail = await new ProductDetailService().getBySlug(slug);

  if (!detail) {
    notFound();
  }

  return <ProductDetailSection data={detail} />;
}
