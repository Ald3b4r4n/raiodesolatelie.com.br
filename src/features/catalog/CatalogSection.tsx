import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { ProductCard } from "@/components/product/ProductCard";

import { CatalogFilters } from "./CatalogFilters";
import type { CatalogViewData } from "./types";

type CatalogSectionProps = {
  data: CatalogViewData;
  filtersSlot?: ReactNode;
};

export function CatalogSection({ data, filtersSlot }: CatalogSectionProps) {
  return (
    <div className="catalog-page">
      <section className="catalog-hero" aria-labelledby="catalog-title">
        <div className="catalog-hero__copy">
          <p className="eyebrow">Catálogo</p>
          <h1 id="catalog-title">{data.title}</h1>
          <p>{data.description}</p>
          <div className="catalog-hero__chips" aria-label="Leituras da coleção">
            <span>Novidades artesanais</span>
            <span>Compra fácil pelo celular</span>
            <span>Curadoria feminina</span>
          </div>
        </div>
        <div className="catalog-hero__banner">
          <Image
            alt="Vitrine principal da coleção em crochê"
            fill
            sizes="(max-width: 719px) 100vw, 38vw"
            src="/banners/hero-conjunto-praia.jpeg"
          />
        </div>
      </section>

      {filtersSlot ?? (
        <CatalogFilters
          categories={data.categories}
          currentFilters={data.currentFilters}
        />
      )}

      {data.errorMessage ? <ErrorMessage message={data.errorMessage} /> : null}

      {data.products.length > 0 ? (
        <section className="catalog-grid" aria-label="Listagem de produtos">
          <div className="catalog-grid__intro">
            <strong>Vitrine pensada para compra rápida</strong>
            <p>
              Fotos maiores, leitura imediata de preço e acesso direto ao detalhe de cada
              peça.
            </p>
            <Link className="ui-button ui-button--ghost" href="/#atendimento">
              Tirar dúvida no WhatsApp
            </Link>
          </div>
          {data.products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </section>
      ) : (
        <EmptyState
          title={data.emptyState.title}
          description={data.emptyState.description}
        />
      )}
    </div>
  );
}
