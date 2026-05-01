import { describe, expect, it } from "vitest";

import { parseReviewInput } from "@/validators/review";

describe("schema de review", () => {
  it("aceita review valida", () => {
    const parsed = parseReviewInput({
      id: "review-1",
      productId: "product-1",
      rating: 5,
      status: "pending",
      createdAt: "2026-04-30T10:00:00.000Z",
      updatedAt: "2026-04-30T10:00:00.000Z"
    });

    expect(parsed.rating).toBe(5);
  });

  it("rejeita nota fora do intervalo", () => {
    expect(() =>
      parseReviewInput({
        id: "review-1",
        productId: "product-1",
        rating: 0,
        status: "pending",
        createdAt: "2026-04-30T10:00:00.000Z",
        updatedAt: "2026-04-30T10:00:00.000Z"
      })
    ).toThrow(/nota/i);
  });

  it("rejeita nota fracionada", () => {
    expect(() =>
      parseReviewInput({
        id: "review-1",
        productId: "product-1",
        rating: 4.5,
        status: "pending",
        createdAt: "2026-04-30T10:00:00.000Z",
        updatedAt: "2026-04-30T10:00:00.000Z"
      })
    ).toThrow(/nota/i);
  });

  it("sanitiza comentário público", () => {
    const parsed = parseReviewInput({
      id: "review-1",
      productId: "product-1",
      rating: 5,
      status: "pending",
      comment: "<script>ótimo</script>",
      createdAt: "2026-04-30T10:00:00.000Z",
      updatedAt: "2026-04-30T10:00:00.000Z"
    });

    expect(parsed.comment).toContain("&lt;script&gt;");
  });
});
