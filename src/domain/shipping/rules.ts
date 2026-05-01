import { type ShippingOption } from "@/domain/shipping/types";

export function isShippingOptionAvailable(option: ShippingOption): boolean {
  return option.available;
}

export function selectDefaultShippingOption(
  options: ShippingOption[],
  preferredType?: ShippingOption["type"]
): ShippingOption | undefined {
  const available = options.filter(isShippingOptionAvailable);

  if (preferredType) {
    const preferred = available.find((option) => option.type === preferredType);
    if (preferred) {
      return preferred;
    }
  }

  return available.sort((left, right) => left.price - right.price)[0];
}
