import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { CatalogFilters } from "@/features/catalog/CatalogFilters";
import { CatalogSection } from "@/features/catalog/CatalogSection";
import { createCatalogPageData } from "@/test/fixtures/catalog";

describe("UI de catálogo", () => {
  it("renderiza lista comercial de produtos e CTA de WhatsApp", () => {
    const data = createCatalogPageData();

    render(<CatalogSection data={data} />);

    expect(
      screen.getByRole("region", { name: /listagem de produtos/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /comprar pelo whatsapp/i })
    ).toBeInTheDocument();
    expect(screen.getByText("Bolsa Estrela Marina")).toBeInTheDocument();
    expect(screen.getByText(/todas as peças/i)).toBeInTheDocument();
    expect(screen.queryByText(/encontre sua peça ideal/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/^filtros$/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/curadoria da loja/i)).not.toBeInTheDocument();
    expect(screen.getByAltText("Bolsa Estrela Marina")).toHaveAttribute(
      "sizes",
      "(max-width: 719px) 85vw, (max-width: 1039px) 46vw, 32vw"
    );
  });

  it("mostra estado vazio quando não há produtos", () => {
    const data = createCatalogPageData({
      products: []
    });

    render(<CatalogSection data={data} />);

    expect(
      screen.getByRole("heading", { name: /nenhum produto encontrado/i })
    ).toBeInTheDocument();
  });

  it("mostra estado de erro quando o serviço falha", () => {
    render(
      <CatalogSection
        data={createCatalogPageData({
          errorMessage: "Não foi possível carregar o catálogo agora."
        })}
      />
    );

    expect(screen.getByRole("alert")).toHaveTextContent(
      /não foi possível carregar o catálogo agora/i
    );
  });

  it("renderiza loading acessível para o catálogo", () => {
    render(<CatalogFilters categories={[]} currentFilters={{}} isLoading />);

    expect(
      screen.getByRole("status", { name: /carregando catálogo/i })
    ).toBeInTheDocument();
  });
});
