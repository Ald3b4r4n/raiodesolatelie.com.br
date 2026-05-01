import {
  cert,
  getApps,
  initializeApp,
  type App,
  type AppOptions
} from "firebase-admin/app";
import { getAuth, type Auth } from "firebase-admin/auth";
import { getFirestore, type Firestore } from "firebase-admin/firestore";

const ADMIN_APP_NAME = "raiodesolatelie-admin";

export type FirebaseAdminEnv = Record<string, string | undefined>;

export function getFirebaseAdminAppName(): string {
  return ADMIN_APP_NAME;
}

export function normalizePrivateKey(value: string): string {
  return value.replace(/\\n/g, "\n");
}

export function hasFirebaseAdminCredentials(env: FirebaseAdminEnv): boolean {
  return Boolean(
    env.FIREBASE_PROJECT_ID?.trim() &&
    env.FIREBASE_CLIENT_EMAIL?.trim() &&
    env.FIREBASE_PRIVATE_KEY?.trim()
  );
}

export function createFirebaseAdminOptions(env: FirebaseAdminEnv): AppOptions {
  if (!hasFirebaseAdminCredentials(env)) {
    throw new Error("Credenciais server-side do Firebase Admin não foram configuradas");
  }

  return {
    projectId: env.FIREBASE_PROJECT_ID,
    credential: cert({
      projectId: env.FIREBASE_PROJECT_ID,
      clientEmail: env.FIREBASE_CLIENT_EMAIL,
      privateKey: normalizePrivateKey(env.FIREBASE_PRIVATE_KEY ?? "")
    })
  };
}

export function getFirebaseAdminApp(options?: AppOptions): App {
  const existingApp = getApps().find((app) => app.name === ADMIN_APP_NAME);

  if (existingApp) {
    return existingApp;
  }

  return initializeApp(
    options ?? createFirebaseAdminOptions(process.env),
    ADMIN_APP_NAME
  );
}

export function getFirebaseAdminAuth(): Auth {
  return getAuth(getFirebaseAdminApp());
}

export function getFirebaseAdminFirestore(): Firestore {
  return getFirestore(getFirebaseAdminApp());
}
