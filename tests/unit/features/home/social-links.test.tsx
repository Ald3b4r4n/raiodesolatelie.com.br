import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { HomePage } from "@/features/home/HomePage";
import { buildStoreConfig, buildWhatsAppUrl } from "@/lib/config/store";

describe("links sociais e WhatsApp", () => {
  it("não expõe links falsos quando dados oficiais não existem", () => {
    render(<HomePage config={buildStoreConfig({})} />);

    expect(screen.getByText("Instagram será informado em breve.")).toBeInTheDocument();
    expect(screen.getByText("TikTok será informado em breve.")).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /instagram/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /tiktok/i })).not.toBeInTheDocument();
  });

  it("habilita links quando URLs oficiais são configuradas", () => {
    render(
      <HomePage
        config={buildStoreConfig({
          NEXT_PUBLIC_INSTAGRAM_URL: "https://instagram.com/raiodesolatelie",
          NEXT_PUBLIC_TIKTOK_URL: "https://www.tiktok.com/@raiodesolatelie",
          STORE_WHATSAPP_PHONE: "5511999999999"
        })}
      />
    );

    expect(screen.getByRole("link", { name: /instagram/i })).toHaveAttribute(
      "href",
      "https://instagram.com/raiodesolatelie"
    );
    expect(screen.getByRole("link", { name: /tiktok/i })).toHaveAttribute(
      "href",
      "https://www.tiktok.com/@raiodesolatelie"
    );
    expect(screen.getByRole("link", { name: /chamar no whatsapp/i })).toHaveAttribute(
      "href",
      expect.stringContaining("wa.me/5511999999999")
    );
  });

  it("gera mensagem de WhatsApp sem inventar número", () => {
    expect(buildWhatsAppUrl(undefined)).toBeUndefined();
    expect(buildWhatsAppUrl("5511999999999")).toContain(
      "Ol%C3%A1%2C%20gostaria%20de%20saber%20mais%20sobre%20os%20produtos%20do%20Raio%20de%20Sol%20Ateli%C3%AA."
    );
  });
});
