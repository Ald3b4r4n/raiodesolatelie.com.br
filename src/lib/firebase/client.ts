import { getApp, getApps, initializeApp, type FirebaseOptions } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getStorage, type FirebaseStorage } from "firebase/storage";

import { parsePublicEnv, type PublicEnv } from "@/lib/env/public";

const CLIENT_APP_NAME = "raiodesolatelie-client";

export type FirebaseClientConfigInput = Pick<
  PublicEnv,
  | "NEXT_PUBLIC_FIREBASE_API_KEY"
  | "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN"
  | "NEXT_PUBLIC_FIREBASE_PROJECT_ID"
  | "NEXT_PUBLIC_FIREBASE_APP_ID"
> &
  Partial<Pick<PublicEnv, "NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET">>;

export function getFirebaseClientAppName(): string {
  return CLIENT_APP_NAME;
}

export function createFirebaseClientConfig(
  input: FirebaseClientConfigInput
): FirebaseOptions {
  const config: FirebaseOptions = {
    apiKey: input.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: input.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: input.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    appId: input.NEXT_PUBLIC_FIREBASE_APP_ID
  };

  if (input.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET) {
    config.storageBucket = input.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;
  }

  return config;
}

export function hasFirebaseStorageBucket(config: FirebaseOptions): boolean {
  return Boolean(config.storageBucket);
}

export function getFirebaseClientApp(config?: FirebaseOptions) {
  const existingApp = getApps().find((app) => app.name === CLIENT_APP_NAME);

  if (existingApp) {
    return existingApp;
  }

  return initializeApp(
    config ?? createFirebaseClientConfig(parsePublicEnv(process.env)),
    CLIENT_APP_NAME
  );
}

export function getFirebaseClientAuth(): Auth {
  return getAuth(getFirebaseClientApp());
}

export function getFirebaseClientFirestore(): Firestore {
  return getFirestore(getFirebaseClientApp());
}

export function getFirebaseClientStorage(): FirebaseStorage {
  return getStorage(getFirebaseClientApp());
}

export function getDefaultFirebaseApp() {
  return getApp(CLIENT_APP_NAME);
}
