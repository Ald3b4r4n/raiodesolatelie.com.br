import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Home from "../../../src/app/(store)/page";

describe("página inicial", () => {
  it("renderiza a home comercial com vitrine e catálogo acessível", () => {
    render(<Home />);

    expect(
      screen.getByRole("heading", { name: "Raio de Sol Ateliê" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("region", { name: /novidades da semana/i })
    ).toBeInTheDocument();
  });
});
