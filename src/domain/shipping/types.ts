export type ShippingOptionType = "local_pickup" | "shipping";
export type ShippingProvider = "mock" | "correios_future";

export type ShippingOption = {
  id: string;
  type: ShippingOptionType;
  label: string;
  price: number;
  available: boolean;
  estimatedDays?: number;
  postalCode?: string;
  provider?: ShippingProvider;
  reasonUnavailable?: string;
};
