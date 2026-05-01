import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { Drawer } from "@/components/ui/Drawer";

describe("drawer mobile", () => {
  it("renderiza diálogo acessível quando aberto", () => {
    render(
      <Drawer isOpen title="Menu" onClose={() => undefined}>
        <button type="button">Início</button>
      </Drawer>
    );

    expect(screen.getByRole("dialog", { name: "Menu" })).toBeInTheDocument();
  });

  it("fecha com Escape", () => {
    const onClose = vi.fn();
    render(
      <Drawer isOpen title="Menu" onClose={onClose}>
        <button type="button">Início</button>
      </Drawer>
    );

    fireEvent.keyDown(document, { key: "Escape" });

    expect(onClose).toHaveBeenCalled();
  });
});
