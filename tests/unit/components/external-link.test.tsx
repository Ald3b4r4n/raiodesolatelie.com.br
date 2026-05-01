import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ExternalLink } from "@/components/links/ExternalLink";

describe("ExternalLink", () => {
  it("abre links externos em nova aba com rel seguro", () => {
    render(<ExternalLink href="https://example.com">Instagram</ExternalLink>);

    const link = screen.getByRole("link", { name: "Instagram" });
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("não renderiza quando href é undefined", () => {
    const { container } = render(<ExternalLink href={undefined}>WhatsApp</ExternalLink>);
    expect(container).toBeEmptyDOMElement();
  });
});
