import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { AppShell } from "@/components/layout/AppShell";
import { buildHomeMetadata } from "@/lib/seo/metadata";
import "./globals.css";

export const metadata: Metadata = buildHomeMetadata();

const fontSans = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans"
});

const fontDisplay = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display"
});

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="pt-BR">
      <body className={`${fontSans.variable} ${fontDisplay.variable}`}>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
