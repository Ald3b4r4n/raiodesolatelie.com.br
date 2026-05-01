import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { HomePage } from "@/features/home/HomePage";
import { buildStoreConfig } from "@/lib/config/store";

describe("home", () => {
  it("renderiza hero comercial com CTA real de WhatsApp e navegação para catálogo", () => {
    render(
      <HomePage
        config={buildStoreConfig({
          STORE_WHATSAPP_PHONE: "61996632269",
          NEXT_PUBLIC_INSTAGRAM_URL:
            "https://www.instagram.com/atelieraiode.sol?igsh=cDFrbGdzaHg0eDN0",
          NEXT_PUBLIC_TIKTOK_URL:
            "https://www.tiktok.com/@atelieraiode.sol?is_from_webapp=1&sender_device=pc"
        })}
      />
    );

    expect(
      screen.getByRole("heading", { name: "Raio de Sol Ateliê" })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/moda artesanal em crochê com presença de vitrine/i)
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /explorar catálogo/i })).toHaveAttribute(
      "href",
      "/catalog"
    );
    expect(
      screen.getAllByRole("link", { name: /comprar pelo whatsapp/i })[0]
    ).toHaveAttribute("href", expect.stringContaining("wa.me/5561996632269"));
    expect(screen.getAllByText(/coleção solar/i).length).toBeGreaterThan(0);
  });

  it("renderiza seções de vitrine, coleções e prova social da marca", () => {
    render(
      <HomePage
        config={buildStoreConfig({
          STORE_WHATSAPP_PHONE: "61996632269",
          NEXT_PUBLIC_INSTAGRAM_URL:
            "https://www.instagram.com/atelieraiode.sol?igsh=cDFrbGdzaHg0eDN0",
          NEXT_PUBLIC_TIKTOK_URL:
            "https://www.tiktok.com/@atelieraiode.sol?is_from_webapp=1&sender_device=pc"
        })}
      />
    );

    expect(
      screen.getByRole("region", { name: /novidades da semana/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("region", { name: /categorias em destaque/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("region", { name: /acompanhe no instagram/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /instagram/i })).toHaveAttribute(
      "href",
      "https://www.instagram.com/atelieraiode.sol?igsh=cDFrbGdzaHg0eDN0"
    );
    expect(screen.getByRole("link", { name: /tiktok/i })).toBeInTheDocument();
  });
});
