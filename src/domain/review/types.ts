export type ReviewStatus = "pending" | "approved" | "rejected";

export type Review = {
  id: string;
  productId: string;
  rating: number;
  status: ReviewStatus;
  createdAt: string;
  updatedAt: string;
  comment?: string;
  customerId?: string;
};
