import { type Category, type CategoryStatus } from "@/domain/product/types";
import { sanitizePublicText } from "@/lib/security/sanitize";
import {
  requireEnum,
  requireInteger,
  requireRecord,
  requireString
} from "@/validators/primitives";

export function parseCategoryInput(input: unknown): Category {
  const data = requireRecord(input, "Categoria inválida");

  return {
    id: requireString(data, "id"),
    slug: requireString(data, "slug"),
    name: sanitizePublicText(requireString(data, "name")),
    status: requireEnum<CategoryStatus>(data, "status", ["active", "inactive"]),
    sortOrder: requireInteger(
      data,
      "sortOrder",
      "Ordem da categoria deve ser um número inteiro"
    )
  };
}
