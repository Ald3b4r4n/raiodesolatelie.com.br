import { type EnvironmentInput, readOptionalEnv, readRequiredEnv } from "./schema";

export const serverEnvKeys = [
  "FIREBASE_PROJECT_ID",
  "FIREBASE_CLIENT_EMAIL",
  "FIREBASE_PRIVATE_KEY",
  "STORE_WHATSAPP_PHONE",
  "PAYMENT_PROVIDER",
  "SHIPPING_PROVIDER"
] as const;

export type ServerEnv = {
  FIREBASE_PROJECT_ID: string;
  FIREBASE_CLIENT_EMAIL: string;
  FIREBASE_PRIVATE_KEY: string;
  STORE_WHATSAPP_PHONE?: string;
  PAYMENT_PROVIDER: "mock";
  SHIPPING_PROVIDER: "mock";
};

export function parseServerEnv(input: EnvironmentInput): ServerEnv {
  return {
    FIREBASE_PROJECT_ID: readRequiredEnv(input, "FIREBASE_PROJECT_ID"),
    FIREBASE_CLIENT_EMAIL: readRequiredEnv(input, "FIREBASE_CLIENT_EMAIL"),
    FIREBASE_PRIVATE_KEY: readRequiredEnv(input, "FIREBASE_PRIVATE_KEY"),
    STORE_WHATSAPP_PHONE: readOptionalEnv(input, "STORE_WHATSAPP_PHONE"),
    PAYMENT_PROVIDER: parseMockProvider(input, "PAYMENT_PROVIDER"),
    SHIPPING_PROVIDER: parseMockProvider(input, "SHIPPING_PROVIDER")
  };
}

export function getServerEnv(): ServerEnv {
  return parseServerEnv(process.env);
}

function parseMockProvider(input: EnvironmentInput, key: string): "mock" {
  const value = readOptionalEnv(input, key) ?? "mock";

  if (value !== "mock") {
    throw new Error(`${key} must be "mock" until a real provider is approved`);
  }

  return "mock";
}
