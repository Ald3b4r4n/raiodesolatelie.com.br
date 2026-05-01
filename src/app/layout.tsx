import type { Metadata } from "next";
import { AppShell } from "@/components/layout/AppShell";
import { buildHomeMetadata } from "@/lib/seo/metadata";
import "./globals.css";

export const metadata: Metadata = buildHomeMetadata();

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="pt-BR">
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
