import Image from "next/image";
import Link from "next/link";

import type { Product } from "@/domain/product/types";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Price } from "@/components/ui/Price";

type ProductCardProps = {
  product: Product;
};

const availabilityLabels: Record<Product["availability"], string> = {
  available: "Disponível",
  unavailable: "Indisponível",
  made_to_order: "Sob encomenda"
};

const salesModeLabels: Record<Product["salesMode"], string> = {
  ready_to_ship: "Pronta entrega",
  whatsapp_order: "Encomenda via WhatsApp",
  both: "Venda direta e encomenda"
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="product-card">
      <Link className="product-card__image" href={`/products/${product.slug}`}>
        <Image
          alt={product.name}
          className="product-card__image-element"
          height={960}
          src={product.imageUrls?.[0] ?? "/brand/logo-identidade.jpeg"}
          width={960}
        />
      </Link>
      <div className="product-card__content">
        <div className="product-card__header">
          <Badge>{salesModeLabels[product.salesMode]}</Badge>
          <Badge>{availabilityLabels[product.availability]}</Badge>
        </div>
        <div className="product-card__body">
          <h2>{product.name}</h2>
          <p>{product.description}</p>
        </div>
        <div className="product-card__footer">
          <div className="product-card__pricing">
            <Price amountInCents={product.basePrice} />
            <span>Valor de vitrine temporário</span>
          </div>
          <Link
            className="ui-button ui-button--secondary"
            href={`/products/${product.slug}`}
          >
            Ver detalhes
          </Link>
        </div>
      </div>
    </Card>
  );
}
