import Image from "next/image";
import Link from "next/link";

import type { StoreConfig } from "@/lib/config/store";
import {
  mockCatalogProducts,
  storefrontCollections,
  storefrontHighlights
} from "@/services/firebase/catalog-mock-data";

type HomePageProps = {
  config: StoreConfig;
};

const featuredProducts = mockCatalogProducts
  .filter((product) => product.status === "active")
  .slice(0, 4);

const categoryLinks = [
  { label: "Vestidos e saídas", href: "/catalog?category=vestidos-e-saidas" },
  { label: "Conjuntos e tops", href: "/catalog?category=conjuntos-e-tops" },
  { label: "Bolsas e acessórios", href: "/catalog?category=bolsas-e-acessorios" },
  { label: "Infantil", href: "/catalog?category=infantil" }
] as const;

export function HomePage({ config }: HomePageProps) {
  return (
    <div className="home-page">
      <section className="home-hero home-band" aria-labelledby="home-title">
        <div className="home-hero__copy">
          <p className="eyebrow">Moda artesanal com venda direta</p>
          <h1 id="home-title">Raio de Sol Ateliê</h1>
          <p className="home-hero__text">
            Moda artesanal em crochê com presença de vitrine, imagens reais e compra
            prática para quem prefere resolver tudo pelo celular.
          </p>
          <div className="home-actions" aria-label="Ações principais">
            <Link className="ui-button ui-button--primary" href="/catalog">
              Explorar catálogo
            </Link>
            <a className="ui-button ui-button--secondary" href={config.whatsappUrl}>
              Comprar pelo WhatsApp
            </a>
          </div>
          <ul className="hero-highlights" aria-label="Diferenciais da loja">
            {storefrontHighlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="home-hero__media">
          <article className="hero-feature-card">
            <div className="hero-feature-card__image">
              <Image
                alt="Vestido em crochê laranja do Raio de Sol Ateliê"
                fill
                sizes="(max-width: 719px) 100vw, 40vw"
                src="/banners/hero-vestido-dune.jpeg"
              />
            </div>
            <div className="hero-feature-card__content">
              <p className="eyebrow">Coleção Solar</p>
              <h2>Peças leves para praia, passeio e look de verão</h2>
              <p>
                Vitrine com foco nas peças reais já produzidas pelo ateliê e contato
                direto para fechar pedido sem atrito.
              </p>
            </div>
          </article>

          <div className="hero-side-grid" aria-label="Destaques visuais da coleção">
            <div className="hero-side-grid__item">
              <Image
                alt="Conjunto em crochê amarelo"
                fill
                sizes="(max-width: 719px) 50vw, 20vw"
                src="/banners/hero-conjunto-praia.jpeg"
              />
            </div>
            <div className="hero-side-grid__item hero-side-grid__item--text">
              <span>Novidades autorais</span>
              <strong>Vitrine comercial com linguagem de loja feminina</strong>
            </div>
          </div>
        </div>
      </section>

      <section
        className="home-band home-showcase"
        aria-labelledby="novidades-title"
        id="catalogo"
      >
        <div className="section-heading">
          <p className="eyebrow">Novidades</p>
          <h2 id="novidades-title">Novidades da semana</h2>
          <p>
            Seleção com melhor leitura de foto, preço em destaque e entrada rápida para o
            detalhe do produto.
          </p>
        </div>

        <div className="home-product-grid">
          {featuredProducts.map((product) => (
            <Link
              key={product.id}
              className="home-product-card"
              href={`/products/${product.slug}`}
            >
              <div className="home-product-card__image">
                <Image
                  alt={product.name}
                  fill
                  sizes="(max-width: 719px) 100vw, 25vw"
                  src={product.imageUrls?.[0] ?? "/brand/logo-identidade.jpeg"}
                />
              </div>
              <div className="home-product-card__body">
                <span className="home-product-card__badge">
                  {product.availability === "available"
                    ? "Pronta para compra"
                    : "Encomenda aberta"}
                </span>
                <strong>{product.name}</strong>
                <p>{product.description}</p>
                <span className="home-product-card__price">
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL"
                  }).format(product.basePrice / 100)}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="home-band home-collections" aria-labelledby="categorias-title">
        <div className="section-heading">
          <p className="eyebrow">Categorias</p>
          <h2 id="categorias-title">Categorias em destaque</h2>
          <p>
            Organização de loja para facilitar navegação, descoberta e contato comercial
            mais rápido.
          </p>
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

        <div className="category-chip-row">
          {categoryLinks.map((category) => (
            <Link key={category.href} className="category-chip" href={category.href}>
              {category.label}
            </Link>
          ))}
        </div>
      </section>

      <section className="home-band home-social" aria-labelledby="social-title">
        <div className="section-heading">
          <p className="eyebrow">Social</p>
          <h2 id="social-title">Acompanhe no Instagram</h2>
          <p>
            Os canais oficiais já estão ligados para transformar a vitrine em conversa e
            pedido direto.
          </p>
        </div>

        <div className="home-social__grid">
          <div className="home-social__lookbook" aria-label="Inspiração visual do ateliê">
            <div className="home-social__image">
              <Image
                alt="Composição artesanal com sousplat em crochê"
                fill
                sizes="(max-width: 719px) 100vw, 32vw"
                src="/lookbook/sousplat-1.jpeg"
              />
            </div>
            <div className="home-social__image">
              <Image
                alt="Detalhe de composição artesanal em mesa posta"
                fill
                sizes="(max-width: 719px) 100vw, 32vw"
                src="/lookbook/sousplat-2.jpeg"
              />
            </div>
          </div>

          <div className="home-social__panel" id="atendimento">
            <ul className="social-list" aria-label="Redes sociais">
              {config.socialLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} rel="noreferrer" target="_blank">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <a className="ui-button ui-button--primary" href={config.whatsappUrl}>
              Falar no WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
