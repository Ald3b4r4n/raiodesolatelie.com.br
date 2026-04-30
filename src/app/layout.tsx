import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Raio de Sol Ateliê",
  description: "E-commerce simples e mobile-first do Raio de Sol Ateliê."
};

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
