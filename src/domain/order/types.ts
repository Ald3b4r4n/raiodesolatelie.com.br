export type OrderStatus =
  | "draft"
  | "placed"
  | "confirmed"
  | "preparing"
  | "ready"
  | "shipped"
  | "completed"
  | "cancelled";

export type PaymentStatus =
  | "pending"
  | "mock_approved"
  | "approved"
  | "failed"
  | "cancelled";

export type DeliveryMethod = "local_pickup" | "shipping";
export type OrderPaymentMethod = "pix" | "card";

export type OrderCustomerSnapshot = {
  name: string;
  email?: string;
  phone?: string;
};

export type OrderItemSnapshot = {
  productId: string;
  productName: string;
  productSlug: string;
  variantId?: string;
  size?: string | null;
  color?: string | null;
  unitPrice: number;
  quantity: number;
  lineTotal: number;
};

export type ShippingAddress = {
  recipientName: string;
  postalCode: string;
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  state: string;
  complement?: string;
};

export type OrderShippingOptionSnapshot = {
  id: string;
  type: DeliveryMethod;
  label: string;
  price: number;
  provider?: string;
};

export type OrderCouponSnapshot = {
  code: string;
  discountType: "percentage" | "fixed_amount";
  discountValue: number;
  discountTotal: number;
};

export type Order = {
  id: string;
  orderNumber: string;
  customerId: string | null;
  customerSnapshot: OrderCustomerSnapshot;
  items: OrderItemSnapshot[];
  subtotal: number;
  discountTotal: number;
  shippingTotal: number;
  total: number;
  deliveryMethod: DeliveryMethod;
  paymentMethod: OrderPaymentMethod;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  createdAt: string;
  updatedAt: string;
  shippingAddress?: ShippingAddress;
  shippingOptionSnapshot?: OrderShippingOptionSnapshot;
  couponSnapshot?: OrderCouponSnapshot;
  notes?: string;
  paymentSessionId?: string;
};
