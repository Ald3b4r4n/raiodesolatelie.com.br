import { fireEvent, render, screen } from "@testing-library/react";
import { within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { AppShell } from "@/components/layout/AppShell";

describe("app shell", () => {
  it("renderiza header, logo oficial, conteúdo e footer", () => {
    render(
      <AppShell>
        <section aria-label="Conteúdo técnico">Base visual</section>
      </AppShell>
    );

    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /ateliê raios de sol - início/i })
    ).toBeInTheDocument();
    expect(screen.getByAltText("Logo do Ateliê Raios de Sol")).toHaveAttribute(
      "src",
      expect.stringContaining("logo-identidade.png")
    );
    expect(screen.getByAltText("Marca Ateliê Raios de Sol no rodapé")).toHaveAttribute(
      "src",
      expect.stringContaining("logo-identidade.png")
    );
    expect(screen.getByRole("main")).toHaveTextContent("Base visual");
    expect(screen.getByRole("contentinfo")).toHaveTextContent(/ateliê raios de sol/i);
    expect(
      screen.getByRole("link", { name: /ateliê raios de sol - início/i })
    ).toHaveAttribute("aria-label", "Ateliê Raios de Sol - início");
    expect(screen.queryByText(/6199663/i)).not.toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /atendimento no whatsapp/i })
    ).toHaveAttribute("target", "_blank");
  });

  it("abre navegação mobile por botão acessível", () => {
    render(
      <AppShell>
        <p>Conteúdo</p>
      </AppShell>
    );

    fireEvent.click(screen.getByRole("button", { name: /abrir menu/i }));

    const dialog = screen.getByRole("dialog", { name: /menu da loja/i });

    expect(dialog).toBeInTheDocument();
    expect(within(dialog).getByRole("link", { name: "Início" })).toHaveAttribute(
      "href",
      "/"
    );
  });
});
