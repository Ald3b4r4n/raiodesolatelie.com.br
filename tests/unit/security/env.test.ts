import { describe, expect, it } from "vitest";
import { parsePublicEnv, validatePublicEnvNames } from "../../../src/lib/env/public";
import { parseServerEnv, serverEnvKeys } from "../../../src/lib/env/server";

describe("environment schema", () => {
  it("rejects public environment names that look sensitive", () => {
    expect(() =>
      validatePublicEnvNames(["NEXT_PUBLIC_FIREBASE_API_KEY", "NEXT_PUBLIC_PRIVATE_KEY"])
    ).toThrow(/sensitive/i);
  });

  it("parses public environment values without leaking server-only keys", () => {
    const publicEnv = parsePublicEnv({
      NEXT_PUBLIC_FIREBASE_API_KEY: "public-api-key",
      NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: "example.firebaseapp.com",
      NEXT_PUBLIC_FIREBASE_PROJECT_ID: "raio-de-sol",
      NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: "",
      NEXT_PUBLIC_FIREBASE_APP_ID: "app-id",
      FIREBASE_PRIVATE_KEY: "server-secret"
    });

    expect(publicEnv).toEqual({
      NEXT_PUBLIC_FIREBASE_API_KEY: "public-api-key",
      NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: "example.firebaseapp.com",
      NEXT_PUBLIC_FIREBASE_PROJECT_ID: "raio-de-sol",
      NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: undefined,
      NEXT_PUBLIC_FIREBASE_APP_ID: "app-id"
    });
    expect("FIREBASE_PRIVATE_KEY" in publicEnv).toBe(false);
  });

  it("keeps required server-only keys outside the public key list", () => {
    expect(serverEnvKeys).toEqual(
      expect.arrayContaining([
        "FIREBASE_PROJECT_ID",
        "FIREBASE_CLIENT_EMAIL",
        "FIREBASE_PRIVATE_KEY"
      ])
    );
    expect(serverEnvKeys.some((key) => key.startsWith("NEXT_PUBLIC_"))).toBe(false);
  });

  it("parses server environment values without accepting missing secrets", () => {
    expect(() =>
      parseServerEnv({
        FIREBASE_PROJECT_ID: "raio-de-sol",
        FIREBASE_CLIENT_EMAIL: "admin@example.com",
        FIREBASE_PRIVATE_KEY: ""
      })
    ).toThrow(/FIREBASE_PRIVATE_KEY/);
  });
});
