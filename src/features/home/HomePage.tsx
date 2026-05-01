"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Camera,
  HeartHandshake,
  MessageCircleMore,
  PackageCheck,
  Truck
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

import type { StoreConfig } from "@/lib/config/store";
import { EmblaCarousel } from "@/components/carousel/EmblaCarousel";
import { ExternalLink } from "@/components/links/ExternalLink";
import { ProductCard } from "@/components/product/ProductCard";
import { Button } from "@/components/ui/Button";
import {
  mockCatalogProducts,
  storefrontCollections
} from "@/services/firebase/catalog-mock-data";

type HomePageProps = {
  config: StoreConfig;
};

const featuredProducts = mockCatalogProducts
  .filter((product) => product.status === "active")
  .slice(0, 6);

const categoryLinks = [
  { label: "Vestidos e saídas", href: "/catalog?category=vestidos-e-saidas" },
  { label: "Conjuntos e tops", href: "/catalog?category=conjuntos-e-tops" },
  { label: "Bolsas e acessórios", href: "/catalog?category=bolsas-e-acessorios" },
  { label: "Infantil", href: "/catalog?category=infantil" }
] as const;

export function HomePage({ config }: HomePageProps) {
  const reduceMotion = useReducedMotion();
  const heroSlides = [
    <article className="hero-slide" key="hero-1">
      <div className="hero-slide__media">
        <Image
          alt="Vestido em crochê do Raio de Sol Ateliê"
          fill
          priority
          sizes="100vw"
          src="/banners/hero-vestido-dune.jpeg"
        />
      </div>
      <div className="hero-slide__content">
        <p className="hero-slide__eyebrow">Nova coleção</p>
        <h2>Vestidos e crochês com presença leve e acabamento autoral</h2>
        <p>
          Peças feitas à mão para praia, passeio e momentos de sol com elegância simples.
        </p>
        <div className="hero-slide__actions" aria-label="Ações principais">
          <Button asChild size="lg">
            <Link href="/catalog">Ver catálogo</Link>
          </Button>
          <Button asChild size="lg" variant="secondary">
            <ExternalLink href={config.whatsappUrl}>Comprar pelo WhatsApp</ExternalLink>
          </Button>
        </div>
      </div>
    </article>,
    <article className="hero-slide" key="hero-2">
      <div className="hero-slide__media">
        <Image
          alt="Conjunto em crochê do Raio de Sol Ateliê"
          fill
          priority
          sizes="100vw"
          src="/banners/hero-conjunto-praia.jpeg"
        />
      </div>
      <div className="hero-slide__content">
        <p className="hero-slide__eyebrow">Moda praia</p>
        <h2>Conjuntos e saídas com visual de loja e atendimento pessoal</h2>
        <p>
          Combine tamanho, cor e disponibilidade direto com o ateliê em um fluxo comercial
          claro.
        </p>
        <div className="hero-slide__actions" aria-label="Ações principais">
          <Button asChild size="lg">
            <Link href="/catalog">Ver catálogo</Link>
          </Button>
          <Button asChild size="lg" variant="secondary">
            <ExternalLink href={config.whatsappUrl}>Comprar pelo WhatsApp</ExternalLink>
          </Button>
        </div>
      </div>
    </article>
  ];

  const productSlides = featuredProducts.map((product) => (
    <div className="home-product-slide" key={product.id}>
      <ProductCard product={product} />
    </div>
  ));

  return (
    <div className="home-page">
      <section className="home-hero" aria-labelledby="home-title">
        <div className="home-hero__top home-shell">
          <h1 id="home-title">Raio de Sol Ateliê</h1>
          <p className="home-hero__subtitle">
            Moda artesanal feminina em crochê, com atmosfera editorial, vitrine comercial
            e atendimento direto do ateliê.
          </p>
        </div>

        <EmblaCarousel
          className="hero-carousel"
          label="Carrossel principal"
          slides={heroSlides}
          options={{ loop: true, align: "start" }}
        />

        <ul className="hero-highlights home-shell" aria-label="Diferenciais do ateliê">
          {[
            { icon: HeartHandshake, text: "Feito à mão" },
            { icon: PackageCheck, text: "Pronta entrega e encomendas" },
            { icon: MessageCircleMore, text: "Atendimento pelo WhatsApp" },
            { icon: Truck, text: "Retirada ou envio combinado" }
          ].map((item) => (
            <li key={item.text}>
              <item.icon aria-hidden="true" />
              <span>{item.text}</span>
            </li>
          ))}
        </ul>
      </section>

      <motion.section
        className="home-showcase home-shell"
        aria-labelledby="novidades-title"
        id="novidades"
        initial={reduceMotion ? undefined : { opacity: 0, y: 18 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="section-heading">
          <p className="eyebrow">Novidades</p>
          <h2 id="novidades-title">Novidades do ateliê</h2>
          <p>Uma vitrine com peças leves, femininas e prontas para conversa de compra.</p>
        </div>
        <EmblaCarousel
          className="product-carousel"
          label="Carrossel de novidades do ateliê"
          slides={productSlides}
          options={{ align: "start", loop: false }}
        />
      </motion.section>

      <motion.section
        className="home-collections home-shell"
        aria-labelledby="categorias-title"
        initial={reduceMotion ? undefined : { opacity: 0, y: 18 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="section-heading">
          <p className="eyebrow">Coleções</p>
          <h2 id="categorias-title">Explore por categoria</h2>
          <p>Escolha a coleção e encontre a peça ideal para o seu momento.</p>
        </div>

        <div className="collection-grid">
          {storefrontCollections.map((collection) => (
            <Link
              key={collection.title}
              className="collection-card"
              href={collection.href}
            >
              <div className="collection-card__image">
                <Image
                  alt={collection.title}
                  fill
                  sizes="(max-width: 719px) 100vw, 40vw"
                  src={collection.imageUrl}
                />
              </div>
              <div className="collection-card__body">
                <strong>{collection.title}</strong>
                <p>{collection.description}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="category-chip-row" aria-label="Atalhos de categorias">
          {categoryLinks.map((category) => (
            <Link key={category.href} className="category-chip" href={category.href}>
              {category.label}
            </Link>
          ))}
        </div>
      </motion.section>

      <motion.section
        className="home-lookbook"
        aria-labelledby="lookbook-title"
        id="lookbook"
        initial={reduceMotion ? undefined : { opacity: 0, y: 18 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="home-shell home-lookbook__grid">
          <div className="section-heading">
            <p className="eyebrow">Inspiração</p>
            <h2 id="lookbook-title">Textura, delicadeza e acabamento em cada detalhe</h2>
            <p>
              O lookbook reforça o clima artesanal da marca sem sobrecarregar a loja com
              texto técnico.
            </p>
            <Button asChild variant="secondary">
              <Link href="/catalog">Ver peças da coleção</Link>
            </Button>
          </div>
          <div className="home-lookbook__images">
            <div className="home-lookbook__image home-lookbook__image--tall">
              <Image
                alt="Composição artesanal com sousplat em crochê"
                fill
                sizes="(max-width: 719px) 100vw, 28vw"
                src="/lookbook/sousplat-1.jpeg"
              />
            </div>
            <div className="home-lookbook__image">
              <Image
                alt="Detalhe de composição artesanal em mesa posta"
                fill
                sizes="(max-width: 719px) 100vw, 20vw"
                src="/lookbook/sousplat-2.jpeg"
              />
            </div>
            <div className="home-lookbook__image">
              <Image
                alt="Vestido em crochê com composição editorial"
                fill
                sizes="(max-width: 719px) 100vw, 20vw"
                src="/products/vestido-dune.jpeg"
              />
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section
        className="home-social home-shell"
        aria-labelledby="social-title"
        initial={reduceMotion ? undefined : { opacity: 0, y: 18 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="section-heading">
          <p className="eyebrow">Social</p>
          <h2 id="social-title">Acompanhe o ateliê e fale com a loja</h2>
          <p>Bastidores, peças novas e atendimento direto em canais externos.</p>
        </div>

        <div className="home-social__grid">
          <div className="home-social__panel" id="atendimento">
            <ul className="social-list" aria-label="Redes sociais">
              {config.socialLinks.map((link) => (
                <li key={link.label}>
                  <ExternalLink href={link.href}>
                    {link.label === "Instagram" ? (
                      <Camera aria-hidden="true" />
                    ) : (
                      <MessageCircleMore aria-hidden="true" />
                    )}
                    {link.label}
                  </ExternalLink>
                </li>
              ))}
            </ul>
            <Button asChild>
              <ExternalLink href={config.whatsappUrl}>Comprar pelo WhatsApp</ExternalLink>
            </Button>
          </div>
          <div className="home-social__quote">
            <p>
              Do catálogo à conversa final, a experiência foi desenhada para vender como
              loja.
            </p>
            <strong>Escolha a peça, veja os detalhes e finalize com o ateliê.</strong>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
