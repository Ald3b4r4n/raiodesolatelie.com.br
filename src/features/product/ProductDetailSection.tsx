"use client";

import { useMemo, useState } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import { Check, MessageCircleMore, Palette, Ruler, ShieldCheck } from "lucide-react";

import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { Price } from "@/components/ui/Price";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ProductGalleryCarousel } from "@/components/carousel/ProductGalleryCarousel";
import { ExternalLink } from "@/components/links/ExternalLink";
import {
  buildVariantOptions,
  resolveSelectedVariant
} from "@/domain/product/variant-selection";
import { buildProductWhatsAppUrl } from "@/services/whatsapp/product-link";
import type { ProductDetailViewData, PreparedCartItem } from "@/features/product/types";

type ProductDetailSectionProps = {
  data: ProductDetailViewData;
  onAddToCart?: (item: PreparedCartItem) => void;
};

const availabilityLabels = {
  available: "Disponível",
  unavailable: "Indisponível",
  made_to_order: "Sob encomenda"
} as const;

const salesModeLabels = {
  ready_to_ship: "Pronta entrega",
  whatsapp_order: "Encomenda pelo WhatsApp",
  both: "Compra direta e encomenda"
} as const;

export function ProductDetailSection({ data, onAddToCart }: ProductDetailSectionProps) {
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [prepared, setPrepared] = useState(false);
  const product = data.product;
  const category = data.category;
  const variants = data.variants ?? [];

  const options = buildVariantOptions(variants);
  const selectedVariant = resolveSelectedVariant(variants, {
    size: size || undefined,
    color: color || undefined
  });

  const whatsappUrl = useMemo(() => {
    if (!product) {
      return undefined;
    }

    return buildProductWhatsAppUrl({
      phone: data.whatsappPhone,
      productName: product.name,
      productSlug: product.slug,
      size: size || undefined,
      color: color || undefined
    });
  }, [color, data.whatsappPhone, product, size]);

  if (data.notFound || !product || !category) {
    return (
      <div className="product-detail-page">
        <EmptyState
          title="Produto não encontrado"
          description="Esse item não está disponível agora. Volte ao catálogo para ver outras opções."
        />
      </div>
    );
  }

  const requiresSize = options.sizes.length > 0;
  const requiresColor = options.colors.length > 0;
  const canPrepareCart =
    product.availability !== "unavailable" &&
    (!requiresSize || Boolean(size)) &&
    (!requiresColor || Boolean(color)) &&
    (!variants.length || Boolean(selectedVariant));

  return (
    <section className="product-detail-page" aria-labelledby="product-detail-title">
      <div className="product-detail-grid">
        <div className="product-gallery">
          <ProductGalleryCarousel
            productName={product.name}
            imageUrls={product.imageUrls ?? []}
          />
        </div>

        <div className="product-detail-panel">
          <p className="eyebrow">Produto</p>
          <h1 id="product-detail-title">{product.name}</h1>
          <div className="product-detail-badges">
            <Badge>{salesModeLabels[product.salesMode]}</Badge>
            <Badge variant="subtle">{availabilityLabels[product.availability]}</Badge>
          </div>
          <p className="product-detail-lead">{product.description}</p>

          <div className="product-detail-meta">
            <div>
              <span className="product-detail-meta__label">Categoria</span>
              <strong>{category.name}</strong>
            </div>
            <div>
              <span className="product-detail-meta__label">Disponibilidade</span>
              <strong>{availabilityLabels[product.availability]}</strong>
            </div>
          </div>

          <div className="product-price-panel">
            <Price amountInCents={selectedVariant?.priceOverride ?? product.basePrice} />
            <span>
              Atendimento direto para confirmar disponibilidade, acabamento e ajuste da
              peça.
            </span>
          </div>

          {data.errorMessage ? <ErrorMessage message={data.errorMessage} /> : null}

          {(requiresSize || requiresColor) && (
            <div className="product-selection-panel">
              <div className="product-selection-panel__header">
                <p className="eyebrow">Escolha sua variação</p>
                <strong>Selecione tamanho e cor para preparar a compra.</strong>
              </div>
              <div className="product-variation-grid">
                {requiresSize ? (
                  <Select
                    label="Tamanho"
                    name="size"
                    placeholder="Selecione um tamanho"
                    value={size}
                    onChange={(event) => setSize(event.target.value)}
                    options={[
                      { label: "Selecione um tamanho", value: "" },
                      ...options.sizes.map((option) => ({
                        label: option.available
                          ? option.label
                          : `${option.label} - indisponível`,
                        value: option.value
                      }))
                    ]}
                  />
                ) : null}
                {requiresColor ? (
                  <Select
                    label="Cor"
                    name="color"
                    placeholder="Selecione uma cor"
                    value={color}
                    onChange={(event) => setColor(event.target.value)}
                    options={[
                      { label: "Selecione uma cor", value: "" },
                      ...options.colors.map((option) => ({
                        label: option.available
                          ? option.label
                          : `${option.label} - esgotada`,
                        value: option.value
                      }))
                    ]}
                  />
                ) : null}
              </div>
            </div>
          )}

          <div className="product-cta-group">
            <Button
              disabled={!canPrepareCart}
              size="lg"
              onClick={() => {
                if (!canPrepareCart) {
                  return;
                }

                const item = {
                  productId: product.id,
                  variantId: selectedVariant?.id,
                  quantity: 1
                };

                onAddToCart?.(item);
                setPrepared(true);
              }}
            >
              Adicionar ao carrinho
            </Button>

            <Button asChild size="lg" variant="secondary">
              <ExternalLink href={whatsappUrl}>
                <MessageCircleMore aria-hidden="true" />
                Comprar pelo WhatsApp
              </ExternalLink>
            </Button>
          </div>

          {prepared ? (
            <p className="product-detail-status" role="status">
              Seleção confirmada. Use o WhatsApp para combinar detalhes e finalizar o
              pedido.
            </p>
          ) : null}

          <div className="product-benefit-strip" aria-label="Diferenciais da compra">
            <div>
              <ShieldCheck aria-hidden="true" />
              <span>Acabamento artesanal</span>
            </div>
            <div>
              <Ruler aria-hidden="true" />
              <span>Escolha tamanho com apoio</span>
            </div>
            <div>
              <Palette aria-hidden="true" />
              <span>Cor, caimento e detalhes combinados</span>
            </div>
          </div>

          <Tabs.Root className="product-tabs" defaultValue="details">
            <Tabs.List aria-label="Detalhes do produto" className="product-tabs__list">
              <Tabs.Trigger className="product-tabs__trigger" value="details">
                Detalhes
              </Tabs.Trigger>
              <Tabs.Trigger className="product-tabs__trigger" value="delivery">
                Entrega
              </Tabs.Trigger>
              <Tabs.Trigger className="product-tabs__trigger" value="care">
                Cuidados
              </Tabs.Trigger>
            </Tabs.List>

            <Tabs.Content className="product-tabs__content" value="details">
              <ul className="product-benefit-list">
                <li>
                  <Check aria-hidden="true" />
                  Atendimento direto para escolher tamanho e cor.
                </li>
                <li>
                  <Check aria-hidden="true" />
                  Peça pensada para compor looks leves e femininos.
                </li>
              </ul>
            </Tabs.Content>
            <Tabs.Content className="product-tabs__content" value="delivery">
              <ul className="product-benefit-list">
                <li>
                  <Check aria-hidden="true" />
                  Pronta entrega e encomendas disponíveis conforme o modelo.
                </li>
                <li>
                  <Check aria-hidden="true" />
                  Retirada ou envio combinado com o ateliê.
                </li>
              </ul>
            </Tabs.Content>
            <Tabs.Content className="product-tabs__content" value="care">
              <ul className="product-benefit-list">
                <li>
                  <Check aria-hidden="true" />
                  Guarde a peça em local arejado e evite atrito excessivo.
                </li>
                <li>
                  <Check aria-hidden="true" />
                  Tire dúvidas de cuidado diretamente pelo WhatsApp.
                </li>
              </ul>
            </Tabs.Content>
          </Tabs.Root>
        </div>
      </div>
    </section>
  );
}
