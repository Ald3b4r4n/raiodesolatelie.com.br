import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";

describe("controles de formulário", () => {
  it("renderiza botão com estado de carregamento acessível", () => {
    render(<Button isLoading>Salvar</Button>);

    expect(screen.getByRole("button", { name: /salvando/i })).toBeDisabled();
  });

  it("renderiza input com label, ajuda e erro em português", () => {
    render(
      <Input
        label="Nome"
        name="name"
        helperText="Informe como a cliente deve ser chamada."
        error="Nome é obrigatório."
      />
    );

    expect(screen.getByLabelText("Nome")).toHaveAccessibleDescription(
      /informe como a cliente/i
    );
    expect(screen.getByText("Nome é obrigatório.")).toHaveAttribute("role", "alert");
  });

  it("renderiza select com label e opções", () => {
    const onChange = vi.fn();
    render(
      <Select
        label="Categoria"
        name="category"
        options={[
          { label: "Pronta entrega", value: "pronta-entrega" },
          { label: "Encomenda via WhatsApp", value: "encomenda" }
        ]}
        onChange={onChange}
      />
    );

    fireEvent.change(screen.getByLabelText("Categoria"), {
      target: { value: "encomenda" }
    });

    expect(onChange).toHaveBeenCalled();
  });
});
