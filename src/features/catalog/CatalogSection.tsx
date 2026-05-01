"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MessageCircleMore } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { ProductCard } from "@/components/product/ProductCard";
import { ExternalLink } from "@/components/links/ExternalLink";
import { buildStoreConfig } from "@/lib/config/store";
import { Button } from "@/components/ui/Button";

import { CatalogFilters } from "./CatalogFilters";
import type { CatalogViewData } from "./types";

type CatalogSectionProps = {
  data: CatalogViewData;
  filtersSlot?: ReactNode;
};

export function CatalogSection({ data, filtersSlot }: CatalogSectionProps) {
  const config = buildStoreConfig();
  const reduceMotion = useReducedMotion();

  return (
    <div className="catalog-page">
      <section className="catalog-hero" aria-labelledby="catalog-title">
        <div className="catalog-hero__copy">
          <p className="eyebrow">Catálogo</p>
          <h1 id="catalog-title">{data.title}</h1>
          <p>{data.description}</p>
          <div className="catalog-hero__chips" aria-label="Leituras da coleção">
            <span>Pronta entrega e encomendas</span>
            <span>Feito à mão com cuidado</span>
            <span>Atendimento pelo WhatsApp</span>
          </div>
          <div className="catalog-hero__actions">
            <Button asChild>
              <ExternalLink href={config.whatsappUrl}>
                <MessageCircleMore aria-hidden="true" />
                Comprar pelo WhatsApp
              </ExternalLink>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/#lookbook">
                Ver inspiração
                <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
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
            <strong>Encontre sua peça favorita</strong>
            <p>Escolha no catálogo e fale direto com o ateliê para confirmar detalhes.</p>
            <div className="catalog-grid__intro-actions" aria-label="Ações do catálogo">
              <Button asChild>
                <ExternalLink href={config.whatsappUrl}>
                  <MessageCircleMore aria-hidden="true" />
                  Comprar pelo WhatsApp
                </ExternalLink>
              </Button>
              <Button asChild variant="ghost">
                <Link href="/#atendimento">Atendimento</Link>
              </Button>
            </div>
          </div>
          {data.products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={reduceMotion ? undefined : { opacity: 0, y: 18 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.28, delay: index * 0.04 }}
            >
              <ProductCard product={product} />
            </motion.div>
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
