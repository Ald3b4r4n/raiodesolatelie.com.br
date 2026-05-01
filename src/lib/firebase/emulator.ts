export type FirebaseEmulatorHosts = {
  FIRESTORE_EMULATOR_HOST?: string;
  FIREBASE_AUTH_EMULATOR_HOST?: string;
  FIREBASE_STORAGE_EMULATOR_HOST?: string;
};

export function getFirebaseEmulatorHosts(
  env: NodeJS.ProcessEnv | FirebaseEmulatorHosts = process.env
): FirebaseEmulatorHosts {
  return {
    FIRESTORE_EMULATOR_HOST: env.FIRESTORE_EMULATOR_HOST,
    FIREBASE_AUTH_EMULATOR_HOST: env.FIREBASE_AUTH_EMULATOR_HOST,
    FIREBASE_STORAGE_EMULATOR_HOST: env.FIREBASE_STORAGE_EMULATOR_HOST
  };
}

export function isFirebaseEmulatorEnabled(
  env: NodeJS.ProcessEnv | FirebaseEmulatorHosts = process.env
): boolean {
  const hosts = getFirebaseEmulatorHosts(env);

  return Boolean(
    hosts.FIRESTORE_EMULATOR_HOST ||
    hosts.FIREBASE_AUTH_EMULATOR_HOST ||
    hosts.FIREBASE_STORAGE_EMULATOR_HOST
  );
}
