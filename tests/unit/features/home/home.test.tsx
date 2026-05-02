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
    expect(screen.getByText(/moda artesanal feminina em crochê/i)).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: /ver catálogo/i })[0]).toHaveAttribute(
      "href",
      "/catalog"
    );
    expect(
      screen.getAllByRole("link", { name: /comprar pelo whatsapp/i })[0]
    ).toHaveAttribute("href", expect.stringContaining("wa.me/5561996632269"));
    expect(screen.getAllByText(/coleção solar/i).length).toBeGreaterThan(0);
    expect(
      screen.getByRole("region", { name: /carrossel principal/i })
    ).toBeInTheDocument();
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
      screen.getAllByRole("region", { name: /novidades do ateliê/i }).length
    ).toBeGreaterThan(0);
    expect(
      screen.getByRole("region", { name: /explore por categoria/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("region", { name: /acompanhe o ateliê e fale com a loja/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("region", {
        name: /textura, delicadeza e acabamento com olhar editorial/i
      })
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /instagram/i })).toHaveAttribute(
      "href",
      "https://www.instagram.com/atelieraiode.sol?igsh=cDFrbGdzaHg0eDN0"
    );
    expect(screen.getByRole("link", { name: /tiktok/i })).toBeInTheDocument();
  });
});
