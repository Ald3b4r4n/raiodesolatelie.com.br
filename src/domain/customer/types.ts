export type CustomerProfile = {
  uid: string;
  createdAt: string;
  updatedAt: string;
  displayName?: string;
  email?: string;
  phone?: string;
  defaultPickupPreference?: "local_pickup" | "shipping";
};
