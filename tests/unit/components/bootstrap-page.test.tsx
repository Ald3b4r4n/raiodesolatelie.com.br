import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Home from "../../../src/app/(store)/page";

describe("página inicial", () => {
  it("renderiza a home comercial com vitrine e catálogo acessível", () => {
    render(<Home />);

    expect(
      screen.getByRole("heading", { name: "Ateliê Raios de Sol" })
    ).toBeInTheDocument();
    expect(
      screen.getAllByRole("region", { name: /novidades do ateliê/i }).length
    ).toBeGreaterThan(0);
  });
});
