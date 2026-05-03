import Image from "next/image";
import Link from "next/link";
import { Camera, MapPin, MessageCircleMore, Ticket, Truck } from "lucide-react";

import { buildStoreConfig } from "@/lib/config/store";
import { ExternalLink } from "@/components/links/ExternalLink";
import { Button } from "@/components/ui/Button";

export function Footer() {
  const config = buildStoreConfig();

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__brand">
          <div className="site-footer__brand-mark">
            <Image
              alt={`Marca ${config.brandName} no rodapé`}
              height={96}
              src="/brand/logo-identidade.png"
              width={96}
            />
            <p className="site-footer__eyebrow">{config.brandName}</p>
          </div>
          <h2>Peças autorais em crochê com acabamento artesanal.</h2>
          <p>Catálogo completo, fotos reais e atendimento preparado antes do WhatsApp.</p>
          <Button asChild>
            <Link href="/atendimento">
              <MessageCircleMore aria-hidden="true" />
              Falar com o ateliê
            </Link>
          </Button>
        </div>

        <div className="site-footer__columns">
          <div>
            <strong>Loja</strong>
            <Link href="/catalog">Catálogo</Link>
            <Link href="/novidades">Novidades</Link>
            <Link href="/atendimento">Atendimento</Link>
          </div>
          <div>
            <strong>Ateliê</strong>
            <span>Peças feitas à mão</span>
            <span>Pronta entrega e encomendas</span>
            <span>Fotos reais com textura visível</span>
          </div>
          <div>
            <strong>Atendimento</strong>
            <span>
              <Truck aria-hidden="true" />
              Envio e retirada combinados
            </span>
            <span>
              <MapPin aria-hidden="true" />
              Atendimento direto pelo WhatsApp
            </span>
          </div>
          <div>
            <strong>Redes sociais</strong>
            <ExternalLink href={config.socialLinks[0]?.href}>
              <Camera aria-hidden="true" />
              Instagram
            </ExternalLink>
            <ExternalLink href={config.socialLinks[1]?.href}>
              <Ticket aria-hidden="true" />
              TikTok
            </ExternalLink>
          </div>
        </div>
      </div>
    </footer>
  );
}
