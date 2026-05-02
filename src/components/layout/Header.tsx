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
  const instagramLink = config.socialLinks.find((link) => link.label === "Instagram");
  const tiktokLink = config.socialLinks.find((link) => link.label === "TikTok");

  return (
    <header className="site-header">
      <div className="site-header__topline">
        <div className="site-header__promise">
          <Sparkles aria-hidden="true" />
          <span>Campanha de verão com peças autorais e atendimento da loja</span>
        </div>
        <div className="site-header__topline-links">
          <ExternalLink
            className="site-header__social-link"
            href={instagramLink?.href}
            aria-label="Instagram do ateliê"
          >
            <Camera aria-hidden="true" />
            Instagram
          </ExternalLink>
          <ExternalLink
            className="site-header__social-link"
            href={tiktokLink?.href}
            aria-label="TikTok do ateliê"
          >
            <Ticket aria-hidden="true" />
            TikTok
          </ExternalLink>
        </div>
      </div>

      <div className="site-header__main">
        <div className="site-header__brand-group">
          <Link
            className="brand-link"
            href="/"
            aria-label={`${config.brandName} - início`}
          >
            <Image
              className="brand-link__logo"
              src="/brand/logo-identidade.png"
              alt={`Logo do ${config.brandName}`}
              width="128"
              height="128"
            />
            <span className="brand-link__copy">
              <span className="brand-link__kicker">Loja autoral</span>
              <span className="brand-link__text">{config.brandName}</span>
            </span>
          </Link>
        </div>

        <form className="header-search" action="/catalog" role="search">
          <label className="sr-only" htmlFor="header-search-input">
            Buscar no catálogo
          </label>
          <span className="header-search__icon" aria-hidden="true">
            <Search />
          </span>
          <input
            id="header-search-input"
            className="header-search__input"
            name="q"
            placeholder="Buscar vestidos, saídas e peças em crochê"
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
          <Button asChild className="header-actions__whatsapp" size="sm">
            <ExternalLink href={config.whatsappUrl}>
              <MessageCircleMore aria-hidden="true" />
              Atendimento no WhatsApp
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
