import { describe, expect, it } from "vitest";

import {
  createFirebaseClientConfig,
  getFirebaseClientAppName,
  hasFirebaseStorageBucket
} from "@/lib/firebase/client";
import {
  getFirebaseAdminAppName,
  hasFirebaseAdminCredentials
} from "@/lib/firebase/admin";
import {
  getFirebaseEmulatorHosts,
  isFirebaseEmulatorEnabled
} from "@/lib/firebase/emulator";

describe("Firebase adapters", () => {
  it("cria configuração client-side apenas com variáveis públicas", () => {
    const config = createFirebaseClientConfig({
      NEXT_PUBLIC_FIREBASE_API_KEY: "public-api-key",
      NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: "demo.firebaseapp.com",
      NEXT_PUBLIC_FIREBASE_PROJECT_ID: "demo-raiodesolatelie",
      NEXT_PUBLIC_FIREBASE_APP_ID: "app-id"
    });

    expect(config).toEqual({
      apiKey: "public-api-key",
      authDomain: "demo.firebaseapp.com",
      projectId: "demo-raiodesolatelie",
      appId: "app-id"
    });
    expect(hasFirebaseStorageBucket(config)).toBe(false);
  });

  it("não exige bucket de Storage enquanto a decisão do MVP for condicional", () => {
    const config = createFirebaseClientConfig({
      NEXT_PUBLIC_FIREBASE_API_KEY: "public-api-key",
      NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: "demo.firebaseapp.com",
      NEXT_PUBLIC_FIREBASE_PROJECT_ID: "demo-raiodesolatelie",
      NEXT_PUBLIC_FIREBASE_APP_ID: "app-id",
      NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: "demo.appspot.com"
    });

    expect(hasFirebaseStorageBucket(config)).toBe(true);
  });

  it("mantém nomes de apps estáveis para evitar inicializações duplicadas", () => {
    expect(getFirebaseClientAppName()).toBe("raiodesolatelie-client");
    expect(getFirebaseAdminAppName()).toBe("raiodesolatelie-admin");
  });

  it("detecta credenciais admin sem expor segredo no frontend", () => {
    expect(
      hasFirebaseAdminCredentials({
        FIREBASE_PROJECT_ID: "demo-raiodesolatelie",
        FIREBASE_CLIENT_EMAIL: "admin@example.com",
        FIREBASE_PRIVATE_KEY:
          "-----BEGIN PRIVATE KEY-----\\nkey\\n-----END PRIVATE KEY-----"
      })
    ).toBe(true);
  });

  it("detecta emuladores por variáveis de ambiente server-side", () => {
    const env = {
      FIRESTORE_EMULATOR_HOST: "127.0.0.1:8080",
      FIREBASE_AUTH_EMULATOR_HOST: "127.0.0.1:9099",
      FIREBASE_STORAGE_EMULATOR_HOST: "127.0.0.1:9199"
    };

    expect(isFirebaseEmulatorEnabled(env)).toBe(true);
    expect(getFirebaseEmulatorHosts(env)).toEqual(env);
  });
});
