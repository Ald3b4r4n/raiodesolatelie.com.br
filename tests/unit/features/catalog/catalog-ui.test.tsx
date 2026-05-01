import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { CatalogFilters } from "@/features/catalog/CatalogFilters";
import { CatalogSection } from "@/features/catalog/CatalogSection";
import { createCatalogPageData } from "@/test/fixtures/catalog";

describe("UI de catálogo", () => {
  it("renderiza card de produto, filtros e categorias", () => {
    const data = createCatalogPageData();

    render(<CatalogSection data={data} />);

    expect(
      screen.getByRole("heading", { name: /coleção em destaque/i })
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/buscar por nome/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /vestidos e saídas/i })
    ).toBeInTheDocument();
    expect(screen.getByText("Bolsa Estrela Marina")).toBeInTheDocument();
    expect(
      screen.getAllByText(/vitrine pensada para compra rápida/i).length
    ).toBeGreaterThan(0);
    expect(screen.getByText(/novidades artesanais/i)).toBeInTheDocument();
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
