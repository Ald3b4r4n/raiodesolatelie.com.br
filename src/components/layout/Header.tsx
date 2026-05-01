"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { Drawer } from "@/components/ui/Drawer";

import { MobileNav } from "./MobileNav";
import { primaryNavigation } from "./navigation";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="site-header">
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

      <nav className="desktop-nav" aria-label="Navegação principal">
        {primaryNavigation.map((item) => (
          <Link key={item.href} href={item.href}>
            {item.label}
          </Link>
        ))}
      </nav>

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

      <Drawer isOpen={isMenuOpen} title="Menu" onClose={() => setIsMenuOpen(false)}>
        <MobileNav onNavigate={() => setIsMenuOpen(false)} />
      </Drawer>
    </header>
  );
}
