import type { ProductVariant } from "@/domain/product/types";

export type VariantSelectionInput = {
  size?: string;
  color?: string;
};

export type VariantOption = {
  label: string;
  value: string;
  available: boolean;
};

export function resolveSelectedVariant(
  variants: ProductVariant[],
  selection: VariantSelectionInput
): ProductVariant | undefined {
  return variants.find((variant) => {
    return (
      variant.size === (selection.size ?? null) &&
      variant.color === (selection.color ?? null) &&
      variant.status === "active" &&
      variant.availability === "available"
    );
  });
}

export function buildVariantOptions(variants: ProductVariant[]): {
  sizes: VariantOption[];
  colors: VariantOption[];
} {
  return {
    sizes: buildOptions(variants, "size"),
    colors: buildOptions(variants, "color")
  };
}

function buildOptions(
  variants: ProductVariant[],
  key: "size" | "color"
): VariantOption[] {
  const optionMap = new Map<string, VariantOption>();

  for (const variant of variants) {
    const value = variant[key];

    if (!value) {
      continue;
    }

    const current = optionMap.get(value);
    const available = variant.status === "active" && variant.availability === "available";

    if (!current) {
      optionMap.set(value, {
        label: value,
        value,
        available
      });
      continue;
    }

    current.available = current.available || available;
  }

  return [...optionMap.values()];
}
