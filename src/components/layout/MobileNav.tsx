import Link from "next/link";

import { primaryNavigation } from "./navigation";

type MobileNavProps = {
  onNavigate?: () => void;
};

export function MobileNav({ onNavigate }: MobileNavProps) {
  return (
    <nav className="mobile-nav" aria-label="Navegação mobile">
      {primaryNavigation.map((item) => (
        <Link key={item.href} href={item.href} onClick={onNavigate}>
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
