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
  resolveSelectedVariant,
  type VariantSelectionInput
} from "@/domain/product/variant-selection";
import { buildProductWhatsAppUrl } from "@/services/whatsapp/product-link";
import type { ProductDetailViewData } from "@/features/product/types";

type ProductDetailPageContentProps = {
  data: ProductDetailViewData;
  selection?: VariantSelectionInput;
  showPreparedStatus?: boolean;
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

export function ProductDetailPageContent({
  data,
  selection,
  showPreparedStatus = false
}: ProductDetailPageContentProps) {
  if (data.notFound || !data.product || !data.category) {
    return (
      <div className="product-detail-page">
        <EmptyState
          title="Produto não encontrado"
          description="Esse item não está disponível agora. Volte ao catálogo para ver outras opções."
        />
      </div>
    );
  }

  const product = data.product;
  const category = data.category;
  const variants = data.variants ?? [];
  const options = buildVariantOptions(variants);
  const selectedVariant = resolveSelectedVariant(variants, selection ?? {});
  const whatsappUrl = buildProductWhatsAppUrl({
    phone: data.whatsappPhone,
    productName: product.name,
    productSlug: product.slug,
    size: selection?.size,
    color: selection?.color
  });
  const hasSelectionError = showPreparedStatus && variants.length > 0 && !selectedVariant;

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

          <div className="product-selection-panel">
            <div className="product-selection-panel__header">
              <p className="eyebrow">Escolha sua variação</p>
              <strong>Selecione tamanho e cor para preparar a compra.</strong>
            </div>
            <form className="product-variation-grid" method="get">
              {options.sizes.length > 0 ? (
                <Select
                  label="Tamanho"
                  name="size"
                  placeholder="Selecione um tamanho"
                  defaultValue={selection?.size ?? ""}
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

              {options.colors.length > 0 ? (
                <Select
                  label="Cor"
                  name="color"
                  placeholder="Selecione uma cor"
                  defaultValue={selection?.color ?? ""}
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

              <div className="product-cta-group product-cta-group--full">
                <Button name="intent" size="lg" type="submit" value="cart">
                  Adicionar ao carrinho
                </Button>

                <Button asChild size="lg" variant="secondary">
                  <ExternalLink href={whatsappUrl}>
                    <MessageCircleMore aria-hidden="true" />
                    Comprar pelo WhatsApp
                  </ExternalLink>
                </Button>
              </div>
            </form>
          </div>

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

          {showPreparedStatus && selectedVariant ? (
            <p className="product-detail-status" role="status">
              Seleção confirmada. Você pode seguir pelo WhatsApp para finalizar o pedido.
            </p>
          ) : null}

          {hasSelectionError ? (
            <ErrorMessage message="Selecione uma combinação válida de tamanho e cor antes de continuar." />
          ) : null}

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
