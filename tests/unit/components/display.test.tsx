import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Price } from "@/components/ui/Price";

describe("componentes de display", () => {
  it("renderiza card como região nomeada", () => {
    render(
      <Card title="Resumo">
        <p>Conteúdo</p>
      </Card>
    );

    expect(screen.getByRole("region", { name: "Resumo" })).toBeInTheDocument();
  });

  it("renderiza badge com texto curto", () => {
    render(<Badge>Pronta entrega</Badge>);

    expect(screen.getByText("Pronta entrega")).toBeInTheDocument();
  });

  it("formata preço em reais", () => {
    render(<Price amountInCents={15990} />);

    expect(screen.getByText("R$ 159,90")).toBeInTheDocument();
  });
});
