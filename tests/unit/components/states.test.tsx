import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { LoadingState } from "@/components/ui/LoadingState";

describe("estados de UI", () => {
  it("renderiza loading com status acessível", () => {
    render(<LoadingState label="Carregando produtos" />);

    expect(screen.getByRole("status", { name: /carregando produtos/i })).toBeVisible();
  });

  it("renderiza estado vazio em português", () => {
    render(
      <EmptyState
        title="Nada por aqui ainda"
        description="Os conteúdos serão adicionados nas próximas fases."
      />
    );

    expect(screen.getByText("Nada por aqui ainda")).toBeInTheDocument();
  });

  it("renderiza erro como alerta", () => {
    render(<ErrorMessage message="Não foi possível carregar este conteúdo." />);

    expect(screen.getByRole("alert")).toHaveTextContent(
      "Não foi possível carregar este conteúdo."
    );
  });
});
