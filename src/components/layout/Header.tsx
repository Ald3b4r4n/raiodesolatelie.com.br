"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { buildStoreConfig } from "@/lib/config/store";
import { Drawer } from "@/components/ui/Drawer";

import { MobileNav } from "./MobileNav";
import { primaryNavigation } from "./navigation";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const config = buildStoreConfig();

  return (
    <header className="site-header">
      <div className="site-header__topline">
        <span>Moda artesanal feminina</span>
        <a href={config.whatsappUrl}>WhatsApp: {config.whatsappPhone}</a>
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
            placeholder="Buscar peças, crochê e conjuntos"
            type="search"
          />
        </form>

        <nav className="desktop-nav" aria-label="Navegação principal">
          {primaryNavigation.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <a className="header-social-link" href={config.socialLinks[0]?.href}>
            Instagram
          </a>
          <a className="header-social-link" href={config.socialLinks[1]?.href}>
            TikTok
          </a>
        </div>

        <button
          className="menu-button"
          type="button"
          aria-label="Abrir menu"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen(true)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <Drawer isOpen={isMenuOpen} title="Menu" onClose={() => setIsMenuOpen(false)}>
        <MobileNav onNavigate={() => setIsMenuOpen(false)} />
      </Drawer>
    </header>
  );
}
