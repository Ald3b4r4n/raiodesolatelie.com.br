"use client";

import { useState } from "react";
import { Search, SlidersHorizontal, Sparkles } from "lucide-react";

import type { Category } from "@/domain/product/types";
import { Badge } from "@/components/ui/Badge";
import { Drawer } from "@/components/ui/Drawer";
import { LoadingState } from "@/components/ui/LoadingState";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";

import type { CatalogFiltersValue } from "./types";

type CatalogFiltersProps = {
  categories: Category[];
  currentFilters: CatalogFiltersValue;
  isLoading?: boolean;
};

export function CatalogFilters({
  categories,
  currentFilters,
  isLoading = false
}: CatalogFiltersProps) {
  const [filters, setFilters] = useState<CatalogFiltersValue>(currentFilters);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  if (isLoading) {
    return <LoadingState label="Carregando catálogo" />;
  }

  function handleFieldChange(key: keyof CatalogFiltersValue, value: string) {
    setFilters((currentFilters) => {
      return {
        ...currentFilters,
        [key]: value || undefined
      };
    });
  }

  function renderFormContent() {
    return (
      <>
        <div className="catalog-filters__header">
          <div>
            <p className="eyebrow">Catálogo</p>
            <h2>Refinar resultados</h2>
          </div>
          <Badge variant="outline">Categoria e preço</Badge>
        </div>
        <p className="catalog-filters__copy">
          Use categoria, preço e disponibilidade para encontrar mais rápido.
        </p>

        <label className="field" htmlFor="catalog-search">
          <span className="field__label">Buscar por nome</span>
          <div className="field__with-icon">
            <Search aria-hidden="true" />
            <input
              id="catalog-search"
              className="field__control"
              type="search"
              name="q"
              value={filters.q ?? ""}
              placeholder="Ex.: vestido, saída, bolsa"
              onChange={(event) => handleFieldChange("q", event.target.value)}
            />
          </div>
        </label>

        <input type="hidden" name="category" value={filters.category ?? ""} />

        <div className="catalog-filters__group" aria-label="Categorias">
          {categories.map((category) => {
            const isActive = filters.category === category.id;

            return (
              <button
                key={category.id}
                className={`filter-chip ${isActive ? "is-active" : ""}`}
                type="button"
                aria-pressed={isActive}
                onClick={() => handleFieldChange("category", isActive ? "" : category.id)}
              >
                {category.name}
              </button>
            );
          })}
        </div>

        <div className="catalog-filters__grid">
          <label className="field" htmlFor="catalog-min-price">
            <span className="field__label">Preço mínimo</span>
            <input
              id="catalog-min-price"
              className="field__control"
              inputMode="numeric"
              name="minPrice"
              value={filters.minPrice ?? ""}
              placeholder="0"
              onChange={(event) => handleFieldChange("minPrice", event.target.value)}
            />
          </label>

          <label className="field" htmlFor="catalog-max-price">
            <span className="field__label">Preço máximo</span>
            <input
              id="catalog-max-price"
              className="field__control"
              inputMode="numeric"
              name="maxPrice"
              value={filters.maxPrice ?? ""}
              placeholder="35000"
              onChange={(event) => handleFieldChange("maxPrice", event.target.value)}
            />
          </label>
        </div>

        <Select
          label="Disponibilidade"
          name="availability"
          value={filters.availability ?? ""}
          onChange={(event) => handleFieldChange("availability", event.target.value)}
          options={[
            { label: "Todas", value: "" },
            { label: "Disponível", value: "available" },
            { label: "Sob encomenda", value: "made_to_order" },
            { label: "Indisponível", value: "unavailable" }
          ]}
        />

        <div className="catalog-filters__actions">
          <Button type="submit">Aplicar filtros</Button>
          <Button asChild variant="ghost">
            <a href="/catalog">Limpar filtros</a>
          </Button>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="catalog-filters-toolbar">
        <div>
          <p className="eyebrow">Catálogo</p>
          <h2>Busca, categorias e disponibilidade</h2>
        </div>
        <span className="catalog-filters-toolbar__badge">
          <Sparkles aria-hidden="true" />
          Loja editada
        </span>
        <Button
          className="catalog-filters-toolbar__button"
          type="button"
          variant="secondary"
          onClick={() => setIsMobileFiltersOpen(true)}
        >
          <SlidersHorizontal aria-hidden="true" />
          Filtrar
        </Button>
      </div>

      <form
        className="catalog-filters catalog-filters--desktop"
        aria-label="Refinar catálogo"
        action="/catalog"
      >
        {renderFormContent()}
      </form>

      <Drawer
        description="Use os filtros para refinar a vitrine no mobile."
        isOpen={isMobileFiltersOpen}
        title="Refinar catálogo"
        onClose={() => setIsMobileFiltersOpen(false)}
      >
        <form className="catalog-filters catalog-filters--drawer" action="/catalog">
          {renderFormContent()}
        </form>
      </Drawer>
    </>
  );
}
