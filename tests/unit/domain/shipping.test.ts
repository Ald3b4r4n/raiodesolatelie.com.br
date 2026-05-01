import { describe, expect, it } from "vitest";

import {
  isShippingOptionAvailable,
  selectDefaultShippingOption
} from "@/domain/shipping/rules";
import { type ShippingOption } from "@/domain/shipping/types";

describe("dominio de frete", () => {
  const options: ShippingOption[] = [
    {
      id: "pickup",
      label: "Retirada local",
      price: 0,
      available: true,
      type: "local_pickup",
      provider: "mock"
    },
    {
      id: "delivery",
      label: "Entrega",
      price: 1990,
      available: true,
      type: "shipping",
      provider: "mock"
    }
  ];

  it("reconhece opcao de frete disponivel", () => {
    expect(isShippingOptionAvailable(options[0])).toBe(true);
    expect(isShippingOptionAvailable({ ...options[0], available: false })).toBe(false);
  });

  it("seleciona opcao default por preferencia", () => {
    const selected = selectDefaultShippingOption(options, "local_pickup");

    expect(selected?.id).toBe("pickup");
  });
});
