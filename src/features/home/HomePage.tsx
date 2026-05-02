"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Camera,
  ChevronRight,
  HeartHandshake,
  MessageCircleMore,
  PackageCheck,
  Sparkles,
  Ticket,
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
          alt={`Vestido em crochê do ${config.brandName}`}
          fill
          priority
          sizes="100vw"
          src="/banners/hero-vestido-dune.jpeg"
        />
      </div>
      <div className="hero-slide__content">
        <p className="hero-slide__eyebrow">Nova coleção</p>
        <div className="hero-slide__meta">
          <span>Edição solar</span>
          <span>Feito à mão</span>
        </div>
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
          alt={`Conjunto em crochê do ${config.brandName}`}
          fill
          priority
          sizes="100vw"
          src="/banners/hero-conjunto-praia.jpeg"
        />
      </div>
      <div className="hero-slide__content">
        <p className="hero-slide__eyebrow">Moda praia</p>
        <div className="hero-slide__meta">
          <span>Curadoria da semana</span>
          <span>Atendimento da loja</span>
        </div>
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
          <div className="home-hero__brand-lockup">
            <Image
              alt={`Identidade visual ${config.brandName}`}
              height={168}
              priority
              src="/brand/logo-identidade.png"
              width={168}
            />
            <div>
              <p className="eyebrow">Loja autoral</p>
              <h1 id="home-title">{config.brandName}</h1>
              <p className="home-hero__subtitle">
                Moda artesanal feminina em crochê, com atmosfera editorial, vitrine
                comercial e atendimento direto do ateliê.
              </p>
            </div>
          </div>
          <div className="home-hero__chips" aria-label="Leituras da coleção">
            <span>Coleção solar</span>
            <span>Pronta entrega e encomendas</span>
            <span>Conversa direta com a loja</span>
          </div>
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
          <p>
            Uma curadoria com respiro, foco na imagem e leitura de loja desde a primeira
            peça.
          </p>
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
                <span className="collection-card__tag">Coleção</span>
                <strong>{collection.title}</strong>
                <p>{collection.description}</p>
                <span className="collection-card__cta">
                  Ver seleção
                  <ChevronRight aria-hidden="true" />
                </span>
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
            <p className="eyebrow">Lookbook</p>
            <h2 id="lookbook-title">
              Textura, delicadeza e acabamento com olhar editorial
            </h2>
            <p>
              O lookbook aproxima a coleção do clima da marca e reforça o acabamento
              artesanal com mais presença visual.
            </p>
            <div className="home-lookbook__actions">
              <Button asChild variant="secondary">
                <Link href="/catalog">Ver peças da coleção</Link>
              </Button>
              <Button asChild variant="quiet">
                <ExternalLink href={config.whatsappUrl}>
                  Falar sobre a coleção
                </ExternalLink>
              </Button>
            </div>
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
          <p>
            Bastidores, lançamentos e atendimento direto com apresentação mais comercial.
          </p>
        </div>

        <div className="home-social__grid">
          <div className="home-social__panel" id="atendimento">
            <div className="home-social__intro">
              <p className="eyebrow">Canais oficiais</p>
              <strong>Escolha a peça e siga para o canal que preferir.</strong>
              <p>
                Instagram para inspiração, TikTok para movimento e WhatsApp para fechar a
                compra.
              </p>
            </div>
            <ul className="social-list" aria-label="Redes sociais">
              <li>
                <ExternalLink href={config.socialLinks[0]?.href}>
                  <Camera aria-hidden="true" />
                  Instagram
                </ExternalLink>
              </li>
              <li>
                <ExternalLink href={config.socialLinks[1]?.href}>
                  <Ticket aria-hidden="true" />
                  TikTok
                </ExternalLink>
              </li>
              <li>
                <ExternalLink href={config.whatsappUrl}>
                  <MessageCircleMore aria-hidden="true" />
                  WhatsApp da loja
                </ExternalLink>
              </li>
            </ul>
            <Button asChild>
              <ExternalLink href={config.whatsappUrl}>Comprar pelo WhatsApp</ExternalLink>
            </Button>
          </div>
          <div className="home-social__quote">
            <div className="home-social__quote-card">
              <Sparkles aria-hidden="true" />
              <p>
                Do catálogo à conversa final, a experiência foi desenhada para vender com
                clareza e mais presença de marca.
              </p>
            </div>
            <div className="home-social__quote-card">
              <Camera aria-hidden="true" />
              <strong>Escolha a peça, veja os detalhes e finalize com o ateliê.</strong>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
