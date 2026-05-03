"use client";

import { MessageCircleMore } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

import { ExternalLink } from "@/components/links/ExternalLink";

import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { ProductCard } from "@/components/product/ProductCard";
import { buildStoreConfig } from "@/lib/config/store";
import { Button } from "@/components/ui/Button";

import type { CatalogViewData } from "./types";

type CatalogSectionProps = {
  data: CatalogViewData;
};

export function CatalogSection({ data }: CatalogSectionProps) {
  const config = buildStoreConfig();
  const reduceMotion = useReducedMotion();

  return (
    <div className="catalog-page">
      {data.errorMessage ? <ErrorMessage message={data.errorMessage} /> : null}

      {data.products.length > 0 ? (
        <section className="catalog-grid" aria-label="Listagem de produtos">
          <div className="catalog-grid__intro">
            <strong>Todas as peças</strong>
            <p>Escolha sua peça favorita e fale direto com o ateliê.</p>
            <div className="catalog-grid__intro-actions" aria-label="Ações do catálogo">
              <Button asChild>
                <ExternalLink href={config.whatsappUrl}>
                  <MessageCircleMore aria-hidden="true" />
                  Comprar pelo WhatsApp
                </ExternalLink>
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
