import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { ProductDetailSection } from "@/features/product/ProductDetailSection";
import { createProductDetailFixture } from "@/test/fixtures/product-detail";

describe("página de produto", () => {
  it("renderiza fotos, preço, categoria, disponibilidade, variações e CTAs", () => {
    const data = createProductDetailFixture();

    render(<ProductDetailSection data={data} />);

    expect(screen.getByRole("heading", { name: data.product!.name })).toBeInTheDocument();
    expect(screen.getByText(/categoria/i)).toBeInTheDocument();
    expect(screen.getByText(/compra direta e encomenda/i)).toBeInTheDocument();
    expect(screen.getAllByText(/disponível/i).length).toBeGreaterThan(0);
    expect(screen.getByLabelText(/tamanho/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/cor/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /adicionar ao carrinho/i })).toBeDisabled();
    expect(screen.getByRole("link", { name: /comprar pelo whatsapp/i })).toBeVisible();
    expect(screen.getByLabelText(/fotos do produto/i)).toBeInTheDocument();
    expect(screen.getByAltText(`${data.product!.name} - foto 1`)).toHaveAttribute(
      "sizes",
      "(max-width: 719px) calc(100vw - 4.3rem), (max-width: 1039px) calc(100vw - 5.8rem), 670px"
    );
  });

  it("habilita a preparação de carrinho quando a variação é válida", () => {
    const onAddToCart = vi.fn();
    const data = createProductDetailFixture();

    render(<ProductDetailSection data={data} onAddToCart={onAddToCart} />);

    fireEvent.change(screen.getByLabelText(/tamanho/i), { target: { value: "M" } });
    fireEvent.change(screen.getByLabelText(/cor/i), {
      target: { value: "Amarelo sol" }
    });
    fireEvent.click(screen.getByRole("button", { name: /adicionar ao carrinho/i }));

    expect(onAddToCart).toHaveBeenCalledWith(
      expect.objectContaining({
        productId: data.product!.id,
        variantId: "variant-5"
      })
    );
    expect(screen.getByRole("status")).toHaveTextContent(/seleção confirmada/i);
  });

  it("renderiza CTA real do WhatsApp com referência do produto", () => {
    const data = createProductDetailFixture();
    render(<ProductDetailSection data={data} />);

    expect(screen.getByRole("link", { name: /comprar pelo whatsapp/i })).toHaveAttribute(
      "href",
      expect.stringContaining("wa.me/5561996632269")
    );
  });

  it("renderiza tabs com detalhes comerciais do produto", () => {
    const data = createProductDetailFixture();
    render(<ProductDetailSection data={data} />);

    const tabs = screen.getByRole("tablist", { name: /detalhes do produto/i });
    expect(within(tabs).getByRole("tab", { name: /detalhes/i })).toBeInTheDocument();
    expect(within(tabs).getByRole("tab", { name: /entrega/i })).toBeInTheDocument();
    expect(within(tabs).getByRole("tab", { name: /cuidados/i })).toBeInTheDocument();
  });

  it("renderiza estado de produto não encontrado", () => {
    render(
      <ProductDetailSection
        data={createProductDetailFixture({
          product: undefined,
          notFound: true
        })}
      />
    );

    expect(
      screen.getByRole("heading", { name: /produto não encontrado/i })
    ).toBeInTheDocument();
  });

  it("renderiza estado de erro acessível", () => {
    render(
      <ProductDetailSection
        data={createProductDetailFixture({
          errorMessage: "Não foi possível carregar este produto agora."
        })}
      />
    );

    expect(screen.getByRole("alert")).toHaveTextContent(/não foi possível carregar/i);
  });
});
