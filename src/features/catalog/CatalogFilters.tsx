"use client";

import { useState } from "react";

import type { Category } from "@/domain/product/types";
import { LoadingState } from "@/components/ui/LoadingState";
import { Button } from "@/components/ui/Button";

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

  return (
    <form className="catalog-filters" aria-label="Filtros do catálogo" action="/catalog">
      <label className="field" htmlFor="catalog-search">
        <span className="field__label">Buscar por nome</span>
        <input
          id="catalog-search"
          className="field__control"
          type="search"
          name="q"
          value={filters.q ?? ""}
          placeholder="Ex.: vestido, saída, bolsa"
          onChange={(event) => handleFieldChange("q", event.target.value)}
        />
      </label>

      <input type="hidden" name="category" value={filters.category ?? ""} />

      <div className="catalog-filters__group" aria-label="Categorias">
        {categories.map((category) => {
          const isActive = filters.category === category.id;

          return (
            <button
              key={category.id}
              className={`ui-button ${isActive ? "ui-button--primary" : "ui-button--secondary"}`}
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
            placeholder="20000"
            onChange={(event) => handleFieldChange("maxPrice", event.target.value)}
          />
        </label>
      </div>

      <label className="field" htmlFor="catalog-availability">
        <span className="field__label">Disponibilidade</span>
        <select
          id="catalog-availability"
          className="field__control"
          name="availability"
          value={filters.availability ?? ""}
          onChange={(event) => handleFieldChange("availability", event.target.value)}
        >
          <option value="">Todas</option>
          <option value="available">Disponível</option>
          <option value="made_to_order">Sob encomenda</option>
          <option value="unavailable">Indisponível</option>
        </select>
      </label>

      <div className="catalog-filters__actions">
        <Button type="submit">Aplicar filtros</Button>
        <a className="ui-button ui-button--ghost" href="/catalog">
          Limpar filtros
        </a>
      </div>
    </form>
  );
}
