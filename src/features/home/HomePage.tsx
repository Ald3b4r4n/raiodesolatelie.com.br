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

const lookbookImages = [
  { src: "/lookbook/1.jpeg", alt: "Peça em crochê com acabamento visível." },
  { src: "/lookbook/2.jpeg", alt: "Caimento real de peça artesanal." },
  { src: "/lookbook/3.jpeg", alt: "Detalhe de textura do crochê." },
  { src: "/lookbook/4.jpeg", alt: "Composição de look em crochê." },
  { src: "/lookbook/5.jpeg", alt: "Trama manual com pontos aparentes." },
  { src: "/lookbook/6.png", alt: "Close da trama em crochê." },
  { src: "/lookbook/7.png", alt: "Detalhe de modelagem artesanal." },
  { src: "/lookbook/8.png", alt: "Acabamento e textura em foco." },
  { src: "/lookbook/9.png", alt: "Vista frontal da peça em crochê." },
  { src: "/lookbook/10.png", alt: "Vista lateral da peça em crochê." },
  { src: "/lookbook/sousplat-1.jpeg", alt: "Peça artesanal em ambiente real." },
  { src: "/lookbook/sousplat-2.jpeg", alt: "Detalhe de acabamento artesanal." }
];

export function HomePage({ config }: HomePageProps) {
  const reduceMotion = useReducedMotion();
  const productSlides = featuredProducts.map((product, index) => (
    <div className="home-product-slide" key={product.id}>
      <ProductCard imageLoading={index === 0 ? "eager" : "lazy"} product={product} />
    </div>
  ));

  return (
    <div className="home-page">
      <section className="home-hero" aria-labelledby="home-title">
        <div className="home-shell hero-editorial">
          <div className="hero-editorial__media">
            <Image
              alt="Modelo usando vestido laranja em crochê do Ateliê Raios de Sol"
              fill
              fetchPriority="high"
              loading="eager"
              priority
              sizes="100vw"
              src="/editorial/vestido-laranja-modelo.jpeg"
            />
          </div>
          <div className="hero-editorial__copy">
            <p className="eyebrow">Nova coleção</p>
            <h1 id="home-title">{config.brandName}</h1>
            <p>
              Coleção solar em crochê, com peças autorais para praia, passeio e
              atendimento direto pelo WhatsApp.
            </p>
            <div className="hero-slide__actions" aria-label="Ações principais">
              <Button asChild size="lg">
                <Link href="/catalog">Ver catálogo</Link>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <ExternalLink href={config.whatsappUrl}>
                  Comprar pelo WhatsApp
                </ExternalLink>
              </Button>
            </div>
          </div>
          <ul className="hero-editorial__highlights" aria-label="Diferenciais do ateliê">
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
        </div>
      </section>

      <section
        className="home-lookbook home-shell"
        aria-labelledby="lookbook-title"
        id="lookbook"
      >
        <div className="section-heading">
          <p className="eyebrow">Editorial da coleção</p>
          <h2 id="lookbook-title">Textura e caimento das peças</h2>
          <p>
            Veja os detalhes, o caimento e as combinações das peças em fotos reais. Escolha sua favorita e fale com o ateliê para combinar tamanho, cor e disponibilidade.
          </p>
        </div>
        <div className="lookbook-grid" role="list">
          {lookbookImages.map((image) => (
            <div key={image.src} className="lookbook-card" role="listitem">
              <Image
                alt={image.alt}
                fill
                sizes="(max-width: 719px) 100vw, 32vw"
                src={image.src}
              />
            </div>
          ))}
        </div>
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
            Veja o caimento, a textura e os detalhes das peças para escolher o modelo que combina com você.
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
        className="home-editorial"
        aria-labelledby="editorial-title"
        id="editorial"
        initial={reduceMotion ? undefined : { opacity: 0, y: 18 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="home-shell home-editorial__grid">
          <div className="section-heading">
            <p className="eyebrow">Editorial</p>
            <h2 id="editorial-title">Inspirações reais com acabamento em destaque</h2>
            <p>
              Fotos reais aproximam textura, caimento e cor antes da conversa com o
              ateliê.
            </p>
            <div className="home-editorial__actions">
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
          <div className="home-editorial__images">
            <div className="home-editorial__image home-editorial__image--tall">
              <Image
                alt="Modelo usando vestido lilás e bolsa azul em crochê"
                fill
                loading="eager"
                sizes="(max-width: 719px) 100vw, 28vw"
                src="/editorial/vestido-lilas-bolsa-modelo.jpeg"
              />
            </div>
            <div className="home-editorial__image">
              <Image
                alt="Modelo usando cropped listrado em crochê"
                fill
                sizes="(max-width: 719px) 100vw, 20vw"
                src="/editorial/cropped-listrado-frente-modelo.jpeg"
              />
            </div>
            <div className="home-editorial__image">
              <Image
                alt="Modelo usando conjunto amarelo em crochê"
                fill
                sizes="(max-width: 719px) 100vw, 20vw"
                src="/editorial/conjunto-amarelo-modelo.jpeg"
              />
            </div>
            <div className="home-editorial__image">
              <Image
                alt="Modelo usando cropped listrado visto por trás em crochê"
                fill
                sizes="(max-width: 719px) 100vw, 20vw"
                src="/editorial/cropped-listrado-costas-modelo.jpeg"
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
