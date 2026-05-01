import { type Review } from "@/domain/review/types";

export function isReviewPublic(review: Review): boolean {
  return review.status === "approved";
}

export function validateReviewRating(rating: number): number {
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    throw new Error("Nota de avaliação inválida");
  }

  return rating;
}
