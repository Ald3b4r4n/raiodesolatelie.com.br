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
  const instagramLink = config.socialLinks.find((link) => link.label === "Instagram");
  const tiktokLink = config.socialLinks.find((link) => link.label === "TikTok");

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
            <strong>Moda artesanal com atendimento direto</strong>
            <p>Escolha sua peça, veja os detalhes e combine tudo direto com o ateliê.</p>
          </div>
        </div>

        <Button asChild width="full">
          <Link href="/atendimento" onClick={onNavigate}>
            <MessageCircleMore aria-hidden="true" />
            Atendimento
          </Link>
        </Button>

        <div className="mobile-nav__socials">
          <ExternalLink href={instagramLink?.href}>
            <Camera aria-hidden="true" />
            Instagram
          </ExternalLink>
          <ExternalLink href={tiktokLink?.href}>
            <Sparkles aria-hidden="true" />
            TikTok
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
