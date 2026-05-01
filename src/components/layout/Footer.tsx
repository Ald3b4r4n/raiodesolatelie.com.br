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
          <p className="site-footer__eyebrow">Raio de Sol Ateliê</p>
          <h2>Loja de crochê artesanal com curadoria feminina e atendimento direto.</h2>
          <p>Peças feitas à mão, pronta entrega e encomendas combinadas com o ateliê.</p>
          <Button asChild>
            <ExternalLink href={config.whatsappUrl}>
              <MessageCircleMore aria-hidden="true" />
              Falar com o ateliê
            </ExternalLink>
          </Button>
        </div>

        <div className="site-footer__columns">
          <div>
            <strong>Loja</strong>
            <Link href="/catalog">Catálogo</Link>
            <Link href="/#novidades">Novidades</Link>
            <Link href="/#lookbook">Lookbook</Link>
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
