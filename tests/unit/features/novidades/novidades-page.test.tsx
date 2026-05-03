import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import type { Product } from "@/domain/product/types";
import { NovidadesPage, selectNovidadesSlides } from "@/features/novidades/NovidadesPage";
import { buildStoreConfig } from "@/lib/config/store";
import { mockCatalogProducts } from "@/services/firebase/catalog-mock-data";

const activeProduct = mockCatalogProducts.find(
  (product) => product.status === "active"
) as Product;

function makeProduct(overrides: Partial<Product>): Product {
  return {
    ...activeProduct,
    id: overrides.id ?? activeProduct.id,
    slug: overrides.slug ?? activeProduct.slug,
    name: overrides.name ?? activeProduct.name,
    status: overrides.status ?? activeProduct.status,
    sortOrder: overrides.sortOrder ?? activeProduct.sortOrder,
    imageUrls: overrides.imageUrls ?? activeProduct.imageUrls
  };
}

describe("NovidadesPage", () => {
  it("renderiza a vitrine com textos em portugues, catalogo e WhatsApp", () => {
    render(
      <NovidadesPage
        config={buildStoreConfig({ STORE_WHATSAPP_PHONE: "61996632269" })}
        products={[activeProduct]}
      />
    );

    expect(
      screen.getByRole("heading", {
        name: /lan.amentos e pe.as recentes do ateli./i
      })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/sele..o atualizada com pe.as prontas e encomendas artesanais/i)
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /ver cat.logo completo/i })).toHaveAttribute(
      "href",
      "/catalog"
    );
    expect(screen.getByRole("link", { name: /ir para o whatsapp/i })).toHaveAttribute(
      "href",
      expect.stringContaining("wa.me/5561996632269")
    );
    expect(
      screen.getByRole("region", { name: /carrossel de novidades do ateli./i })
    ).toBeInTheDocument();
    expect(document.querySelector(".novidades-carousel")).toBeInTheDocument();
    expect(document.querySelectorAll(".novidades-product-slide")).toHaveLength(
      activeProduct.imageUrls?.length ?? 1
    );
  });

  it("exibe estado vazio com alternativas quando nao ha produtos ativos", () => {
    render(
      <NovidadesPage
        config={buildStoreConfig({ STORE_WHATSAPP_PHONE: "61996632269" })}
        products={[]}
      />
    );

    expect(
      screen.getByRole("heading", { name: /ainda estamos preparando as pr.ximas novidades/i })
    ).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: /ver cat.logo/i })[1]).toHaveAttribute(
      "href",
      "/catalog"
    );
    expect(screen.getByRole("link", { name: /chamar no whatsapp/i })).toHaveAttribute(
      "href",
      expect.stringContaining("wa.me/5561996632269")
    );
  });

  it("seleciona todas as fotos de produtos ativos e preserva a ordem da curadoria", () => {
    const products = [
      makeProduct({
        id: "inactive",
        slug: "inactive",
        status: "inactive",
        sortOrder: 1,
        imageUrls: ["/inactive-1.jpg"]
      }),
      makeProduct({
        id: "third",
        slug: "third",
        status: "active",
        sortOrder: 3,
        imageUrls: ["/third-1.jpg"]
      }),
      makeProduct({
        id: "first",
        slug: "first",
        status: "active",
        sortOrder: 1,
        imageUrls: ["/first-1.jpg", "/first-2.jpg"]
      }),
      makeProduct({
        id: "second",
        slug: "second",
        status: "active",
        sortOrder: 2,
        imageUrls: ["/second-1.jpg"]
      })
    ];

    expect(selectNovidadesSlides(products).map((slide) => slide.imageUrl)).toEqual([
      "/first-1.jpg",
      "/first-2.jpg",
      "/second-1.jpg",
      "/third-1.jpg"
    ]);
  });
});
