export type EnvironmentInput = Record<string, string | undefined>;

const SENSITIVE_PUBLIC_NAME_PATTERN =
  /(SECRET|PRIVATE|PRIVATE_KEY|TOKEN|PASSWORD|CLIENT_EMAIL|SERVICE_ACCOUNT)/i;

export function validatePublicEnvNames(keys: readonly string[]): void {
  const unsafeKey = keys.find((key) => SENSITIVE_PUBLIC_NAME_PATTERN.test(key));

  if (unsafeKey) {
    throw new Error(`Public environment variable looks sensitive: ${unsafeKey}`);
  }
}

export function readRequiredEnv(input: EnvironmentInput, key: string): string {
  const value = input[key]?.trim();

  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }

  return value;
}

export function readOptionalEnv(
  input: EnvironmentInput,
  key: string
): string | undefined {
  const value = input[key]?.trim();
  return value ? value : undefined;
}

export function validateOptionalUrl(value: string | undefined, key: string): void {
  if (!value) {
    return;
  }

  try {
    const url = new URL(value);

    if (url.protocol !== "https:") {
      throw new Error("URL must use HTTPS");
    }
  } catch {
    throw new Error(`Invalid URL for environment variable: ${key}`);
  }
}
