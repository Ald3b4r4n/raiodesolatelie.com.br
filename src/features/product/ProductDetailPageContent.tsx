import Image from "next/image";

import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { Price } from "@/components/ui/Price";
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

          <form className="product-variation-grid" method="get">
            {options.sizes.length > 0 ? (
              <label className="field">
                <span className="field__label">Tamanho</span>
                <select
                  className="field__control"
                  defaultValue={selection?.size ?? ""}
                  name="size"
                >
                  <option value="">Selecione um tamanho</option>
                  {options.sizes.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.available ? option.label : `${option.label} - indisponível`}
                    </option>
                  ))}
                </select>
              </label>
            ) : null}

            {options.colors.length > 0 ? (
              <label className="field">
                <span className="field__label">Cor</span>
                <select
                  className="field__control"
                  defaultValue={selection?.color ?? ""}
                  name="color"
                >
                  <option value="">Selecione uma cor</option>
                  {options.colors.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.available ? option.label : `${option.label} - esgotada`}
                    </option>
                  ))}
                </select>
              </label>
            ) : null}

            <div className="product-cta-group product-cta-group--full">
              <button className="ui-button ui-button--primary" name="intent" value="cart">
                Adicionar ao carrinho
              </button>

              {whatsappUrl ? (
                <a className="ui-button ui-button--secondary" href={whatsappUrl}>
                  Comprar pelo WhatsApp
                </a>
              ) : (
                <button className="ui-button ui-button--secondary" disabled type="button">
                  WhatsApp em breve
                </button>
              )}
            </div>
          </form>

          <ul className="product-benefit-list" aria-label="Diferenciais da compra">
            <li>Mensagem pronta com referência do produto.</li>
            <li>Seleção de variação antes de seguir para o carrinho.</li>
            <li>Atendimento direto para confirmar detalhes da peça.</li>
          </ul>

          {showPreparedStatus && selectedVariant ? (
            <p className="product-detail-status" role="status">
              Estrutura do carrinho preparada. A conexão completa será finalizada na
              próxima fase.
            </p>
          ) : null}

          {hasSelectionError ? (
            <ErrorMessage message="Selecione uma combinação válida de tamanho e cor antes de continuar." />
          ) : null}
        </div>
      </div>
    </section>
  );
}
