import {
  type EnvironmentInput,
  readOptionalEnv,
  readRequiredEnv,
  validatePublicEnvNames as validateNames
} from "./schema";

export const publicEnvKeys = [
  "NEXT_PUBLIC_FIREBASE_API_KEY",
  "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN",
  "NEXT_PUBLIC_FIREBASE_PROJECT_ID",
  "NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET",
  "NEXT_PUBLIC_FIREBASE_APP_ID",
  "NEXT_PUBLIC_INSTAGRAM_URL",
  "NEXT_PUBLIC_TIKTOK_URL"
] as const;

export type PublicEnv = {
  NEXT_PUBLIC_FIREBASE_API_KEY: string;
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: string;
  NEXT_PUBLIC_FIREBASE_PROJECT_ID: string;
  NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET?: string;
  NEXT_PUBLIC_FIREBASE_APP_ID: string;
  NEXT_PUBLIC_INSTAGRAM_URL?: string;
  NEXT_PUBLIC_TIKTOK_URL?: string;
};

export function validatePublicEnvNames(keys: readonly string[] = publicEnvKeys): void {
  validateNames(keys);
}

export function parsePublicEnv(input: EnvironmentInput): PublicEnv {
  validatePublicEnvNames(publicEnvKeys);

  return {
    NEXT_PUBLIC_FIREBASE_API_KEY: readRequiredEnv(input, "NEXT_PUBLIC_FIREBASE_API_KEY"),
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: readRequiredEnv(
      input,
      "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN"
    ),
    NEXT_PUBLIC_FIREBASE_PROJECT_ID: readRequiredEnv(
      input,
      "NEXT_PUBLIC_FIREBASE_PROJECT_ID"
    ),
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: readOptionalEnv(
      input,
      "NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET"
    ),
    NEXT_PUBLIC_FIREBASE_APP_ID: readRequiredEnv(input, "NEXT_PUBLIC_FIREBASE_APP_ID"),
    NEXT_PUBLIC_INSTAGRAM_URL: readOptionalEnv(input, "NEXT_PUBLIC_INSTAGRAM_URL"),
    NEXT_PUBLIC_TIKTOK_URL: readOptionalEnv(input, "NEXT_PUBLIC_TIKTOK_URL")
  };
}

export function getPublicEnv(): PublicEnv {
  return parsePublicEnv(process.env);
}
