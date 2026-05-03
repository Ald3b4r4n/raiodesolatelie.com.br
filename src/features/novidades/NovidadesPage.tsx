"use client";

import Link from "next/link";
import { ArrowRight, MessageCircleMore } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

import { EmblaCarousel } from "@/components/carousel/EmblaCarousel";
import { ExternalLink } from "@/components/links/ExternalLink";
import { ProductCard } from "@/components/product/ProductCard";
import { Button } from "@/components/ui/Button";
import type { Product } from "@/domain/product/types";
import type { StoreConfig } from "@/lib/config/store";
import { buildStoreConfig } from "@/lib/config/store";
import { mockCatalogProducts } from "@/services/firebase/catalog-mock-data";

type NovidadesPageProps = {
  config?: StoreConfig;
  products?: Product[];
};

export type NovidadeSlide = {
  imageAlt: string;
  imageUrl: string;
  product: Product;
};

export function selectNovidadesProducts(products: Product[]): Product[] {
  return products
    .filter((product) => product.status === "active" && Boolean(product.slug))
    .sort((left, right) => {
      const leftOrder = left.sortOrder ?? Number.MAX_SAFE_INTEGER;
      const rightOrder = right.sortOrder ?? Number.MAX_SAFE_INTEGER;

      if (leftOrder !== rightOrder) {
        return leftOrder - rightOrder;
      }

      return left.name.localeCompare(right.name, "pt-BR");
    });
}

export function selectNovidadesSlides(products: Product[]): NovidadeSlide[] {
  return selectNovidadesProducts(products).flatMap((product) => {
    const images = product.imageUrls?.length
      ? product.imageUrls
      : ["/brand/logo-identidade.png"];

    return images.map((imageUrl, index) => ({
      imageAlt: `${product.name} - foto ${index + 1}`,
      imageUrl,
      product
    }));
  });
}

export function NovidadesPage({
  config = buildStoreConfig(),
  products = mockCatalogProducts
}: NovidadesPageProps = {}) {
  const reduceMotion = useReducedMotion();
  const novidadesSlides = selectNovidadesSlides(products);
  const productSlides = novidadesSlides.map((slide, index) => (
    <div
      className="novidades-product-slide"
      key={`${slide.product.id}-${slide.imageUrl}-${index}`}
    >
      <ProductCard
        imageAlt={slide.imageAlt}
        imageFit="contain"
        imageLoading={index === 0 ? "eager" : "lazy"}
        imageUrl={slide.imageUrl}
        product={slide.product}
      />
    </div>
  ));

  return (
    <div className="novidades-page">
      <section className="novidades-hero" aria-labelledby="novidades-title">
        <div className="novidades-hero__content">
          <p className="eyebrow">Novidades</p>
          <h1 id="novidades-title">Lançamentos e peças recentes do ateliê</h1>
          <p>Seleção atualizada com peças prontas e encomendas artesanais.</p>
          <div className="novidades-hero__actions">
            <Button asChild>
              <Link href="/catalog">
                Ver catálogo completo
                <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/atendimento">
                <MessageCircleMore aria-hidden="true" />
                Atendimento
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {novidadesSlides.length > 0 ? (
        <motion.section
          className="novidades-showcase"
          aria-label="Carrossel de novidades"
          initial={reduceMotion ? undefined : { opacity: 0, y: 18 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <EmblaCarousel
            className="product-carousel novidades-carousel"
            label="Carrossel de novidades do ateliê"
            slides={productSlides}
            options={{ align: "start", loop: false }}
          />
        </motion.section>
      ) : (
        <section className="novidades-empty" aria-labelledby="novidades-empty-title">
          <p className="eyebrow">Em breve</p>
          <h2 id="novidades-empty-title">
            Ainda estamos preparando as próximas novidades
          </h2>
          <p>
            Enquanto a nova seleção chega ao site, veja o catálogo completo ou fale com
            o ateliê para conferir peças prontas e encomendas disponíveis.
          </p>
          <div className="novidades-empty__actions">
            <Button asChild variant="secondary">
              <Link href="/catalog">
                Ver catálogo
                <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild>
              <ExternalLink href={config.whatsappUrl}>
                <MessageCircleMore aria-hidden="true" />
                Chamar no WhatsApp
              </ExternalLink>
            </Button>
          </div>
        </section>
      )}

      <section className="novidades-cta" aria-label="Ações para falar com o ateliê">
        <div className="novidades-cta__copy">
          <strong>Quer ajuda para escolher a peça ideal?</strong>
          <p>
            Preparamos o atendimento com detalhes da peça, medidas e referência de estilo
            antes de falar no WhatsApp.
          </p>
        </div>
        <Button asChild>
          <ExternalLink href={config.whatsappUrl}>
            <MessageCircleMore aria-hidden="true" />
            Ir para o WhatsApp
          </ExternalLink>
        </Button>
      </section>
    </div>
  );
}
