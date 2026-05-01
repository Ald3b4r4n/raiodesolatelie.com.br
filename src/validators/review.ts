import { sanitizePublicText } from "@/lib/security/sanitize";
import { type Review, type ReviewStatus } from "@/domain/review/types";
import { validateReviewRating } from "@/domain/review/rules";
import {
  readOptionalString,
  requireEnum,
  requireInteger,
  requireRecord,
  requireString
} from "@/validators/primitives";

export function parseReviewInput(input: unknown): Review {
  const data = requireRecord(input, "Review inválida");
  const rating = requireInteger(data, "rating", "Nota de avaliação inválida");
  const comment = readOptionalString(data, "comment");

  return {
    id: requireString(data, "id"),
    productId: requireString(data, "productId"),
    rating: validateReviewRating(rating),
    status: requireEnum<ReviewStatus>(data, "status", [
      "pending",
      "approved",
      "rejected"
    ]),
    createdAt: requireString(data, "createdAt"),
    updatedAt: requireString(data, "updatedAt"),
    comment: comment ? sanitizePublicText(comment) : undefined,
    customerId: readOptionalString(data, "customerId")
  };
}
