import { describe, expect, it } from "vitest";

import {
  calculateCouponDiscount,
  isCouponActive,
  normalizeCouponCode
} from "@/domain/coupon/rules";
import { type Coupon } from "@/domain/coupon/types";

describe("dominio de cupom", () => {
  const coupon: Coupon = {
    id: "coupon-1",
    code: "BEMVINDA",
    discountType: "percentage",
    discountValue: 10,
    status: "active",
    validFrom: "2026-04-01",
    validUntil: "2026-05-01",
    createdAt: "2026-04-01T10:00:00.000Z",
    updatedAt: "2026-04-01T10:00:00.000Z"
  };

  it("normaliza codigo de cupom", () => {
    expect(normalizeCouponCode("  bemvinda ")).toBe("BEMVINDA");
  });

  it("reconhece cupom ativo", () => {
    expect(isCouponActive(coupon, "2026-04-15")).toBe(true);
    expect(isCouponActive({ ...coupon, status: "inactive" }, "2026-04-15")).toBe(false);
  });

  it("calcula desconto percentual", () => {
    const discount = calculateCouponDiscount(coupon, 20000);

    expect(discount).toBe(2000);
  });

  it("limita desconto ao subtotal", () => {
    const fixedCoupon: Coupon = {
      ...coupon,
      discountType: "fixed_amount",
      discountValue: 50000
    };

    expect(calculateCouponDiscount(fixedCoupon, 20000)).toBe(20000);
  });
});
