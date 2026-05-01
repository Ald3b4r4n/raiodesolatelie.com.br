import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProductDetailPageContent } from "@/features/product/ProductDetailPageContent";
import { buildProductMetadata } from "@/lib/seo/product";
import { ProductDetailService } from "@/services/firebase/product-detail";

type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
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

export default async function ProductPage({ params, searchParams }: ProductPageProps) {
  const { slug } = await params;
  const query = await searchParams;
  const detail = await new ProductDetailService().getBySlug(slug);

  if (!detail) {
    notFound();
  }

  return (
    <ProductDetailPageContent
      data={detail}
      selection={{
        size: readSingleParam(query?.size),
        color: readSingleParam(query?.color)
      }}
      showPreparedStatus={readSingleParam(query?.intent) === "cart"}
    />
  );
}

function readSingleParam(value: string | string[] | undefined): string | undefined {
  if (Array.isArray(value)) {
    return value[0];
  }

  return value;
}
