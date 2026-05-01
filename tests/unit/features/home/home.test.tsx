import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { HomePage } from "@/features/home/HomePage";
import { buildStoreConfig } from "@/lib/config/store";

describe("home", () => {
  it("renderiza marca, proposta simples e CTAs preparados", () => {
    render(<HomePage config={buildStoreConfig({})} />);

    expect(
      screen.getByRole("heading", { name: "Raio de Sol Ateliê" })
    ).toBeInTheDocument();
    expect(screen.getByText(/produtos artesanais/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /ver catálogo/i })).toHaveAttribute(
      "href",
      "#catalogo"
    );
    expect(screen.getByRole("button", { name: /whatsapp em breve/i })).toBeDisabled();
  });

  it("mantém seções sem depender de dados reais de produtos", () => {
    render(<HomePage config={buildStoreConfig({})} />);

    expect(screen.getByRole("region", { name: /destaques/i })).toBeInTheDocument();
    expect(screen.getByText(/produtos reais serão adicionados/i)).toBeInTheDocument();
    expect(
      screen.getByRole("region", { name: /contato e redes sociais/i })
    ).toBeInTheDocument();
  });
});
