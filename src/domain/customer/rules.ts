import { type AdminUser } from "@/domain/admin/types";
import { type CustomerProfile } from "@/domain/customer/types";

type AdminLike = {
  uid?: string;
  email?: string;
  role?: string;
};

export function assertCustomerProfile(profile: CustomerProfile): void {
  if (!profile.uid?.trim()) {
    throw new Error("UID obrigatório para perfil da cliente");
  }

  if (!profile.createdAt || !profile.updatedAt) {
    throw new Error("Datas obrigatórias para perfil da cliente");
  }
}

export function assertAdminUser(user: AdminUser | AdminLike): void {
  if (!user.uid?.trim()) {
    throw new Error("UID obrigatório para admin");
  }

  if (user.role !== "admin") {
    throw new Error("Permissão de admin necessária");
  }
}
