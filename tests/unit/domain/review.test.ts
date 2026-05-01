import { describe, expect, it } from "vitest";

import { isReviewPublic, validateReviewRating } from "@/domain/review/rules";
import { type Review } from "@/domain/review/types";

describe("dominio de review", () => {
  const review: Review = {
    id: "review-1",
    productId: "product-1",
    rating: 5,
    status: "approved",
    createdAt: "2026-04-30T10:00:00.000Z",
    updatedAt: "2026-04-30T10:00:00.000Z"
  };

  it("considera review publica quando aprovada", () => {
    expect(isReviewPublic(review)).toBe(true);
    expect(isReviewPublic({ ...review, status: "pending" })).toBe(false);
  });

  it("valida nota entre 1 e 5", () => {
    expect(() => validateReviewRating(0)).toThrow(/nota/i);
    expect(() => validateReviewRating(6)).toThrow(/nota/i);
    expect(validateReviewRating(4)).toBe(4);
  });
});
