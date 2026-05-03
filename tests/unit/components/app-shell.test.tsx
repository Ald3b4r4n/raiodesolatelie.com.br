import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { AppShell } from "@/components/layout/AppShell";

describe("app shell", () => {
  it("renderiza header, logo oficial, conteudo e footer", () => {
    render(
      <AppShell>
        <section aria-label="Conteudo tecnico">Base visual</section>
      </AppShell>
    );

    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /raios de sol/i })).toBeInTheDocument();
    expect(screen.getByAltText(/logo do .*raios de sol/i)).toHaveAttribute(
      "src",
      expect.stringContaining("logo-identidade.png")
    );
    expect(screen.getByAltText(/marca .*raios de sol/i)).toHaveAttribute(
      "src",
      expect.stringContaining("logo-identidade.png")
    );
    expect(screen.getByRole("main")).toHaveTextContent("Base visual");
    expect(screen.getAllByRole("link", { name: "Novidades" })[0]).toHaveAttribute(
      "href",
      "/novidades"
    );
    expect(screen.getByRole("contentinfo")).toHaveTextContent(/raios de sol/i);
    expect(screen.getByRole("link", { name: /raios de sol/i })).toHaveAttribute(
      "aria-label",
      expect.stringMatching(/raios de sol/i)
    );
    expect(screen.queryByText(/6199663/i)).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: /falar com o ateli/i })).toHaveAttribute(
      "href",
      "/atendimento"
    );
  });

  it("abre navegacao mobile por botao acessivel", () => {
    render(
      <AppShell>
        <p>Conteudo</p>
      </AppShell>
    );

    fireEvent.click(screen.getByRole("button", { name: /abrir menu/i }));

    const dialog = screen.getByRole("dialog", { name: /menu da loja/i });

    expect(dialog).toBeInTheDocument();
    expect(within(dialog).getByRole("link", { name: /in.cio/i })).toHaveAttribute(
      "href",
      "/"
    );
    expect(within(dialog).getByRole("link", { name: "Novidades" })).toHaveAttribute(
      "href",
      "/novidades"
    );
    expect(within(dialog).getAllByRole("link", { name: /cat.logo/i })[0]).toHaveAttribute(
      "href",
      "/catalog"
    );
    expect(within(dialog).getAllByRole("link", { name: "Atendimento" })[0]).toHaveAttribute(
      "href",
      "/atendimento"
    );
    expect(within(dialog).queryByRole("link", { name: "Vestidos" })).not.toBeInTheDocument();
    expect(within(dialog).queryByRole("link", { name: "Conjuntos" })).not.toBeInTheDocument();
    expect(within(dialog).queryByRole("link", { name: "Editorial" })).not.toBeInTheDocument();
  });

  it("mantem a navegacao principal enxuta para a storefront", () => {
    render(
      <AppShell>
        <p>Conteudo</p>
      </AppShell>
    );

    const desktopNav = screen.getByLabelText(/navega/i);

    expect(within(desktopNav).getByRole("link", { name: /in.cio/i })).toHaveAttribute(
      "href",
      "/"
    );
    expect(within(desktopNav).getByRole("link", { name: "Novidades" })).toHaveAttribute(
      "href",
      "/novidades"
    );
    expect(within(desktopNav).getByRole("link", { name: /cat.logo/i })).toHaveAttribute(
      "href",
      "/catalog"
    );
    expect(within(desktopNav).getByRole("link", { name: "Atendimento" })).toHaveAttribute(
      "href",
      "/atendimento"
    );
    expect(within(desktopNav).queryByRole("link", { name: "Vestidos" })).not.toBeInTheDocument();
    expect(within(desktopNav).queryByRole("link", { name: "Conjuntos" })).not.toBeInTheDocument();
    expect(within(desktopNav).queryByRole("link", { name: "Editorial" })).not.toBeInTheDocument();
  });

  it("mostra botao de voltar ao topo apenas apos rolar a pagina", () => {
    Object.defineProperty(window, "scrollY", {
      configurable: true,
      value: 0,
      writable: true
    });

    const scrollToMock = vi.fn();
    window.scrollTo = scrollToMock;

    render(
      <AppShell>
        <div style={{ minHeight: "200vh" }}>Conteudo extenso</div>
      </AppShell>
    );

    const button = screen.getByRole("button", { name: /voltar ao topo/i });

    expect(button).toHaveAttribute("data-visible", "false");
    expect(button).toHaveAttribute("tabindex", "-1");

    Object.defineProperty(window, "scrollY", {
      configurable: true,
      value: 640,
      writable: true
    });

    fireEvent.scroll(window);

    expect(button).toHaveAttribute("data-visible", "true");
    expect(button).toHaveAttribute("tabindex", "0");

    fireEvent.click(button);

    expect(scrollToMock).toHaveBeenCalledWith({ top: 0, behavior: "smooth" });
  });
});
