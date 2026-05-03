import type { Metadata, Viewport } from "next";
import { Outfit, Playfair_Display } from "next/font/google";
import { AppShell } from "@/components/layout/AppShell";
import { SiteAudioPlayer } from "@/components/layout/SiteAudioPlayer";
import { buildHomeMetadata } from "@/lib/seo/metadata";
import "./globals.css";

export const metadata: Metadata = buildHomeMetadata();
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover"
};

const fontSans = Outfit({
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
        <SiteAudioPlayer />
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
