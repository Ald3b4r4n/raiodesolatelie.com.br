import { sanitizePublicFields, sanitizePublicText } from "@/lib/security/sanitize";
import {
  type Product,
  type ProductAvailability,
  type ProductSalesMode,
  type ProductStatus,
  type ProductVariant,
  type ProductVariantAvailability,
  type ProductVariantStatus
} from "@/domain/product/types";
import {
  readNullableString,
  readOptionalInteger,
  readOptionalMoneyCents,
  readOptionalNonNegativeInteger,
  readOptionalString,
  readStringArray,
  requireEnum,
  requireMoneyCents,
  requireRecord,
  requireString
} from "@/validators/primitives";

export function parseProductInput(input: unknown): Product {
  const data = requireRecord(input, "Produto inválido");

  const baseProduct: Product = {
    id: requireString(data, "id"),
    slug: requireString(data, "slug"),
    name: requireString(data, "name"),
    description: requireString(data, "description"),
    basePrice: requireMoneyCents(
      data,
      "basePrice",
      "Preço base deve estar em centavos inteiros",
      {
        allowZero: false
      }
    ),
    categoryId: requireString(data, "categoryId"),
    status: requireEnum<ProductStatus>(data, "status", ["active", "inactive", "draft"]),
    availability: requireEnum<ProductAvailability>(data, "availability", [
      "available",
      "unavailable",
      "made_to_order"
    ]),
    salesMode: requireEnum<ProductSalesMode>(data, "salesMode", [
      "ready_to_ship",
      "whatsapp_order",
      "both"
    ]),
    createdAt: requireString(data, "createdAt"),
    updatedAt: requireString(data, "updatedAt"),
    imageUrls: readStringArray(data, "imageUrls"),
    featured: readBoolean(data, "featured"),
    seoTitle: readOptionalString(data, "seoTitle"),
    seoDescription: readOptionalString(data, "seoDescription"),
    sortOrder: readOptionalInteger(data, "sortOrder", "Campo inválido: sortOrder")
  };

  const sanitized = sanitizePublicFields(baseProduct, ["name", "description"]);
  sanitized.seoTitle = sanitized.seoTitle
    ? sanitizePublicText(sanitized.seoTitle)
    : undefined;
  sanitized.seoDescription = sanitized.seoDescription
    ? sanitizePublicText(sanitized.seoDescription)
    : undefined;

  return sanitized;
}

export function parseProductVariantInput(input: unknown): ProductVariant {
  const data = requireRecord(input, "Variação inválida");
  const size = readNullableString(data, "size");
  const color = readNullableString(data, "color");
  const sku = readOptionalString(data, "sku");

  return {
    id: requireString(data, "id"),
    productId: requireString(data, "productId"),
    size: size ? sanitizePublicText(size) : null,
    color: color ? sanitizePublicText(color) : null,
    status: requireEnum<ProductVariantStatus>(data, "status", ["active", "inactive"]),
    availability: requireEnum<ProductVariantAvailability>(data, "availability", [
      "available",
      "unavailable"
    ]),
    createdAt: requireString(data, "createdAt"),
    updatedAt: requireString(data, "updatedAt"),
    priceOverride: readOptionalMoneyCents(
      data,
      "priceOverride",
      "Preço da variação deve estar em centavos inteiros",
      { allowZero: false }
    ),
    stockQuantity: readOptionalNonNegativeInteger(
      data,
      "stockQuantity",
      "Estoque deve ser inteiro e não negativo"
    ),
    sku: sku ? sanitizePublicText(sku) : undefined
  };
}

function readBoolean(data: Record<string, unknown>, key: string): boolean | undefined {
  const value = data[key];

  if (value === undefined) {
    return undefined;
  }

  if (typeof value !== "boolean") {
    throw new Error(`Campo inválido: ${key}`);
  }

  return value;
}
