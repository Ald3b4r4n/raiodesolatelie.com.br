export type CouponStatus = "active" | "inactive";
export type CouponDiscountType = "percentage" | "fixed_amount";

export type Coupon = {
  id: string;
  code: string;
  discountType: CouponDiscountType;
  discountValue: number;
  status: CouponStatus;
  validFrom: string;
  validUntil: string;
  createdAt: string;
  updatedAt: string;
  maxUses?: number;
  usedCount?: number;
  minimumSubtotal?: number;
  description?: string;
};
