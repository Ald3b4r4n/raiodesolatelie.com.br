import type { ReactNode } from "react";

import { BackToTopButton } from "./BackToTopButton";
import { Footer } from "./Footer";
import { Header } from "./Header";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="app-shell">
      <Header />
      <main className="app-main">{children}</main>
      <Footer />
      <BackToTopButton />
    </div>
  );
}
