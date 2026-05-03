"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MessageCircleMore } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

import type { Product } from "@/domain/product/types";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ExternalLink } from "@/components/links/ExternalLink";
import { Price } from "@/components/ui/Price";
import { buildStoreConfig } from "@/lib/config/store";

type ProductCardProps = {
  imageLoading?: "eager" | "lazy";
  imageAlt?: string;
  imageFit?: "cover" | "contain";
  imageUrl?: string;
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

export function ProductCard({
  imageAlt,
  imageFit = "cover",
  imageLoading = "lazy",
  imageUrl,
  product
}: ProductCardProps) {
  const reduceMotion = useReducedMotion();
  const config = buildStoreConfig();

  return (
    <motion.div
      className="product-card-shell"
      whileHover={reduceMotion ? undefined : { y: -8 }}
      transition={{ duration: 0.24, ease: "easeOut" }}
    >
      <Card className="product-card" variant="editorial">
        <Link className="product-card__image" href={`/products/${product.slug}`}>
          <Image
            alt={imageAlt ?? product.name}
            className="product-card__image-element"
            data-fit={imageFit}
            height={960}
            loading={imageLoading}
            sizes="(max-width: 719px) 85vw, (max-width: 1039px) 46vw, 32vw"
            src={imageUrl ?? product.imageUrls?.[0] ?? "/brand/logo-identidade.png"}
            width={960}
          />
        </Link>
        <div className="product-card__content">
          <div className="product-card__header">
            <Badge>{salesModeLabels[product.salesMode]}</Badge>
            <Badge variant="subtle">{availabilityLabels[product.availability]}</Badge>
          </div>
          <div className="product-card__body">
            <h2>{product.name}</h2>
            <p>{product.description}</p>
          </div>
          <div className="product-card__footer">
            <div className="product-card__pricing">
              <Price amountInCents={product.basePrice} />
              <span>Veja acabamento, medidas e variações na página do produto</span>
            </div>
            <div className="product-card__actions">
              <Button asChild variant="secondary" size="sm">
                <Link href={`/products/${product.slug}`}>
                  Ver produto
                  <ArrowRight aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild variant="ghost" size="sm">
                <ExternalLink href={config.whatsappUrl}>
                  <MessageCircleMore aria-hidden="true" />
                  WhatsApp
                </ExternalLink>
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
