"use client";

import { Button } from "@/components/ui/Button";
import { ErrorMessage } from "@/components/ui/ErrorMessage";

export default function CatalogError({ reset }: { error: Error; reset: () => void }) {
  return (
    <section className="state" aria-labelledby="catalog-error-title">
      <h1 id="catalog-error-title">Catálogo indisponível</h1>
      <ErrorMessage message="Não foi possível carregar o catálogo agora." />
      <Button variant="secondary" onClick={() => reset()}>
        Tentar novamente
      </Button>
    </section>
  );
}
