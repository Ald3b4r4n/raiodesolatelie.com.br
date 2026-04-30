import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Home from "../../../src/app/page";

describe("página inicial de bootstrap", () => {
  it("renderiza o estado técnico inicial sem conteúdo de e-commerce", () => {
    render(<Home />);

    expect(
      screen.getByRole("heading", { name: /bootstrap técnico/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/sem funcionalidades comerciais implementadas/i)
    ).toBeInTheDocument();
  });
});
