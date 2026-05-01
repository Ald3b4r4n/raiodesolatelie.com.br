import { type AdminUser } from "@/domain/admin/types";
import { assertAdminUser, assertCustomerProfile } from "@/domain/customer/rules";
import { type CustomerProfile } from "@/domain/customer/types";
import { sanitizePublicText } from "@/lib/security/sanitize";
import {
  readOptionalEnum,
  readOptionalString,
  requireEnum,
  requireRecord,
  requireString
} from "@/validators/primitives";

export function parseCustomerProfileInput(input: unknown): CustomerProfile {
  const data = requireRecord(input, "Perfil da cliente inválido");
  const displayName = readOptionalString(data, "displayName");

  const profile: CustomerProfile = {
    uid: requireString(data, "uid"),
    createdAt: requireString(data, "createdAt"),
    updatedAt: requireString(data, "updatedAt"),
    displayName: displayName ? sanitizePublicText(displayName) : undefined,
    email: readOptionalString(data, "email"),
    phone: readOptionalString(data, "phone"),
    defaultPickupPreference: readOptionalEnum(
      data,
      "defaultPickupPreference",
      ["local_pickup", "shipping"],
      "Preferência de entrega inválida"
    )
  };

  assertCustomerProfile(profile);

  return profile;
}

export function parseAdminUserInput(input: unknown): AdminUser {
  const data = requireRecord(input, "Admin inválido");
  const admin: AdminUser = {
    uid: requireString(data, "uid"),
    email: requireString(data, "email"),
    role: requireEnum(data, "role", ["admin"], "Permissão de admin necessária")
  };

  assertAdminUser(admin);

  return admin;
}
