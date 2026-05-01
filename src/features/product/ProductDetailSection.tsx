"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { Price } from "@/components/ui/Price";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
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
  const [statusMessage, setStatusMessage] = useState("");
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
        <div className="product-gallery" aria-label="Fotos do produto">
          <div className="product-gallery__featured">
            {product.imageUrls?.[0] ? (
              <Image
                alt={`${product.name} - foto principal`}
                className="product-gallery__image"
                height={1200}
                src={product.imageUrls[0]}
                width={1200}
              />
            ) : (
              <div className="product-gallery__fallback">Foto temporária pendente</div>
            )}
          </div>

          <div className="product-gallery__thumbs">
            {(product.imageUrls?.length ? product.imageUrls : [undefined]).map(
              (imageUrl, index) => (
                <div
                  className="product-gallery__item"
                  key={`${imageUrl ?? "fallback"}-${index}`}
                >
                  {imageUrl ? (
                    <Image
                      alt={`${product.name} - foto ${index + 1}`}
                      className="product-gallery__image"
                      height={960}
                      src={imageUrl}
                      width={960}
                    />
                  ) : (
                    <div className="product-gallery__fallback">
                      Foto temporária pendente
                    </div>
                  )}
                </div>
              )
            )}
          </div>
        </div>

        <div className="product-detail-panel">
          <p className="eyebrow">Produto</p>
          <h1 id="product-detail-title">{product.name}</h1>
          <div className="product-detail-badges">
            <span className="ui-badge">{salesModeLabels[product.salesMode]}</span>
            <span className="ui-badge">{availabilityLabels[product.availability]}</span>
          </div>
          <p>{product.description}</p>

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
            <span>Valor de vitrine temporário</span>
          </div>

          {data.errorMessage ? <ErrorMessage message={data.errorMessage} /> : null}

          {(requiresSize || requiresColor) && (
            <div className="product-variation-grid">
              {requiresSize ? (
                <Select
                  label="Tamanho"
                  name="size"
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
          )}

          <div className="product-cta-group">
            <Button
              disabled={!canPrepareCart}
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
                setStatusMessage(
                  "Estrutura do carrinho preparada. A conexão completa será finalizada na próxima fase."
                );
              }}
            >
              Adicionar ao carrinho
            </Button>

            {whatsappUrl ? (
              <a className="ui-button ui-button--secondary" href={whatsappUrl}>
                Comprar pelo WhatsApp
              </a>
            ) : (
              <button className="ui-button ui-button--secondary" type="button" disabled>
                WhatsApp em breve
              </button>
            )}
          </div>

          <ul className="product-benefit-list" aria-label="Diferenciais da compra">
            <li>Mensagem pronta com referência do produto.</li>
            <li>Seleção de variação antes de seguir para o carrinho.</li>
            <li>Atendimento direto para confirmar detalhes da peça.</li>
          </ul>

          {statusMessage ? (
            <p className="product-detail-status" role="status">
              {statusMessage}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
