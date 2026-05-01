import Link from "next/link";
import {
  ArrowRight,
  Camera,
  MessageCircleMore,
  ShoppingBag,
  Sparkles
} from "lucide-react";

import { buildStoreConfig } from "@/lib/config/store";
import { ExternalLink } from "@/components/links/ExternalLink";
import { Button } from "@/components/ui/Button";

import { primaryNavigation } from "./navigation";

type MobileNavProps = {
  onNavigate?: () => void;
};

export function MobileNav({ onNavigate }: MobileNavProps) {
  const config = buildStoreConfig();

  return (
    <div className="mobile-nav">
      <nav aria-label="Navegação mobile">
        {primaryNavigation.map((item) => (
          <Link key={item.href} href={item.href} onClick={onNavigate}>
            <span>{item.label}</span>
            <ArrowRight aria-hidden="true" />
          </Link>
        ))}
      </nav>

      <div className="mobile-nav__panel">
        <div className="mobile-nav__highlight">
          <Sparkles aria-hidden="true" />
          <div>
            <strong>Peças autorais em crochê</strong>
            <p>Escolha no catálogo e finalize com atendimento direto do ateliê.</p>
          </div>
        </div>

        <Button asChild width="full">
          <ExternalLink href={config.whatsappUrl}>
            <MessageCircleMore aria-hidden="true" />
            Atendimento pelo WhatsApp
          </ExternalLink>
        </Button>

        <div className="mobile-nav__socials">
          <ExternalLink href={config.socialLinks[0]?.href}>
            <Camera aria-hidden="true" />
            Instagram
          </ExternalLink>
          <Link href="/catalog" onClick={onNavigate}>
            <ShoppingBag aria-hidden="true" />
            Ver catálogo
          </Link>
        </div>
      </div>
    </div>
  );
}
