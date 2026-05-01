import { type Coupon } from "@/domain/coupon/types";

export function normalizeCouponCode(code: string): string {
  return code.trim().toUpperCase();
}

export function isCouponActive(coupon: Coupon, referenceDate: string): boolean {
  if (coupon.status !== "active") {
    return false;
  }

  const ref = parseDate(referenceDate);
  const validFrom = parseDate(coupon.validFrom);
  const validUntil = parseDate(coupon.validUntil);

  if (!ref || !validFrom || !validUntil) {
    return false;
  }

  return ref >= validFrom && ref <= validUntil;
}

export function calculateCouponDiscount(coupon: Coupon, subtotal: number): number {
  if (!Number.isFinite(subtotal) || subtotal <= 0) {
    return 0;
  }

  if (!Number.isFinite(coupon.discountValue) || coupon.discountValue <= 0) {
    return 0;
  }

  if (coupon.discountType === "percentage") {
    return Math.min(Math.round((subtotal * coupon.discountValue) / 100), subtotal);
  }

  return Math.min(coupon.discountValue, subtotal);
}

function parseDate(value: string): Date | null {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date;
}
