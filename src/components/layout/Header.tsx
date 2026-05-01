"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import {
  Camera,
  Menu,
  MessageCircleMore,
  Search,
  ShoppingBag,
  Sparkles,
  Ticket
} from "lucide-react";

import { buildStoreConfig } from "@/lib/config/store";
import { ExternalLink } from "@/components/links/ExternalLink";
import { Button } from "@/components/ui/Button";
import { Drawer } from "@/components/ui/Drawer";

import { MobileNav } from "./MobileNav";
import { primaryNavigation } from "./navigation";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const config = buildStoreConfig();

  return (
    <header className="site-header">
      <div className="site-header__topline">
        <div className="site-header__promise">
          <Sparkles aria-hidden="true" />
          <span>Moda artesanal feminina feita à mão</span>
        </div>
        <div className="site-header__topline-links">
          <ExternalLink
            href={config.socialLinks[0]?.href}
            aria-label="Instagram do ateliê"
          >
            <Camera aria-hidden="true" />
            Instagram
          </ExternalLink>
          <ExternalLink href={config.socialLinks[1]?.href} aria-label="TikTok do ateliê">
            <Ticket aria-hidden="true" />
            TikTok
          </ExternalLink>
        </div>
      </div>

      <div className="site-header__main">
        <Link className="brand-link" href="/" aria-label="Raio de Sol Ateliê - início">
          <Image
            className="brand-link__logo"
            src="/brand/logo-identidade.jpeg"
            alt=""
            width="56"
            height="56"
          />
          <span className="brand-link__text">Raio de Sol Ateliê</span>
        </Link>

        <form className="header-search" action="/catalog" role="search">
          <label className="sr-only" htmlFor="header-search-input">
            Buscar no catálogo
          </label>
          <input
            id="header-search-input"
            className="header-search__input"
            name="q"
            placeholder="Buscar vestidos, conjuntos e crochê"
            type="search"
          />
          <button
            className="header-search__button"
            type="submit"
            aria-label="Buscar no catálogo"
          >
            <Search aria-hidden="true" />
          </button>
        </form>

        <NavigationMenu.Root className="desktop-nav">
          <NavigationMenu.List aria-label="Navegação principal">
            {primaryNavigation.map((item) => (
              <NavigationMenu.Item key={item.href}>
                <NavigationMenu.Link asChild>
                  <Link href={item.href}>{item.label}</Link>
                </NavigationMenu.Link>
              </NavigationMenu.Item>
            ))}
          </NavigationMenu.List>
        </NavigationMenu.Root>

        <div className="header-actions">
          <Link className="header-link-chip" href="/catalog">
            <ShoppingBag aria-hidden="true" />
            Catálogo
          </Link>
          <Button asChild size="sm">
            <ExternalLink href={config.whatsappUrl}>
              <MessageCircleMore aria-hidden="true" />
              Atendimento pelo WhatsApp
            </ExternalLink>
          </Button>
        </div>

        <button
          className="menu-button"
          type="button"
          aria-label="Abrir menu"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen(true)}
        >
          <Menu aria-hidden="true" />
        </button>
      </div>

      <Drawer
        description="Navegue pelo catálogo e fale com o ateliê."
        isOpen={isMenuOpen}
        title="Menu da loja"
        onClose={() => setIsMenuOpen(false)}
      >
        <MobileNav onNavigate={() => setIsMenuOpen(false)} />
      </Drawer>
    </header>
  );
}
