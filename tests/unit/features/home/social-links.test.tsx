import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { HomePage } from "@/features/home/HomePage";
import { buildStoreConfig, buildWhatsAppUrl } from "@/lib/config/store";

describe("links sociais e WhatsApp", () => {
  it("habilita links quando URLs oficiais são configuradas", () => {
    render(
      <HomePage
        config={buildStoreConfig({
          NEXT_PUBLIC_INSTAGRAM_URL:
            "https://www.instagram.com/atelieraiode.sol?igsh=cDFrbGdzaHg0eDN0",
          NEXT_PUBLIC_TIKTOK_URL:
            "https://www.tiktok.com/@atelieraiode.sol?is_from_webapp=1&sender_device=pc",
          STORE_WHATSAPP_PHONE: "61996632269"
        })}
      />
    );

    expect(screen.getByRole("link", { name: /instagram/i })).toHaveAttribute(
      "href",
      "https://www.instagram.com/atelieraiode.sol?igsh=cDFrbGdzaHg0eDN0"
    );
    expect(screen.getByRole("link", { name: /tiktok/i })).toHaveAttribute(
      "href",
      "https://www.tiktok.com/@atelieraiode.sol?is_from_webapp=1&sender_device=pc"
    );
    expect(
      screen.getAllByRole("link", { name: /comprar pelo whatsapp/i })[0]
    ).toHaveAttribute("href", expect.stringContaining("wa.me/5561996632269"));
  });

  it("gera mensagem real de WhatsApp com número configurado", () => {
    expect(buildWhatsAppUrl("61996632269")).toContain("wa.me/5561996632269");
    expect(buildWhatsAppUrl("61996632269")).toContain(
      "Ol%C3%A1%2C%20gostaria%20de%20saber%20mais%20sobre%20os%20produtos%20do%20Raio%20de%20Sol%20Ateli%C3%AA."
    );
  });
});
