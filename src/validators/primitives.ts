export type UnknownRecord = Record<string, unknown>;

export function requireRecord(input: unknown, message: string): UnknownRecord {
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    throw new Error(message);
  }

  return input as UnknownRecord;
}

export function requireString(
  data: UnknownRecord,
  key: string,
  message = `Campo obrigatório: ${key}`
): string {
  const value = data[key];

  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(message);
  }

  return value.trim();
}

export function readOptionalString(data: UnknownRecord, key: string): string | undefined {
  const value = data[key];

  if (typeof value === "string" && value.trim().length > 0) {
    return value.trim();
  }

  return undefined;
}

export function readNullableString(data: UnknownRecord, key: string): string | null {
  const value = data[key];

  if (value === null || value === undefined) {
    return null;
  }

  if (typeof value === "string") {
    return value.trim();
  }

  throw new Error(`Campo inválido: ${key}`);
}

export function requireBoolean(data: UnknownRecord, key: string): boolean {
  const value = data[key];

  if (typeof value !== "boolean") {
    throw new Error(`Campo inválido: ${key}`);
  }

  return value;
}

export function requireEnum<T extends string>(
  data: UnknownRecord,
  key: string,
  allowed: readonly T[],
  message = `Campo inválido: ${key}`
): T {
  const value = data[key];

  if (typeof value !== "string" || !allowed.includes(value as T)) {
    throw new Error(message);
  }

  return value as T;
}

export function readOptionalEnum<T extends string>(
  data: UnknownRecord,
  key: string,
  allowed: readonly T[],
  message = `Campo inválido: ${key}`
): T | undefined {
  if (data[key] === undefined) {
    return undefined;
  }

  return requireEnum(data, key, allowed, message);
}

export function requireInteger(
  data: UnknownRecord,
  key: string,
  message = `Campo inválido: ${key}`
): number {
  const value = data[key];

  if (!Number.isInteger(value)) {
    throw new Error(message);
  }

  return value as number;
}

export function requirePositiveInteger(
  data: UnknownRecord,
  key: string,
  message = `Campo inválido: ${key}`
): number {
  const value = requireInteger(data, key, message);

  if (value <= 0) {
    throw new Error(message);
  }

  return value;
}

export function readOptionalInteger(
  data: UnknownRecord,
  key: string,
  message = `Campo inválido: ${key}`
): number | undefined {
  if (data[key] === undefined) {
    return undefined;
  }

  return requireInteger(data, key, message);
}

export function readOptionalNonNegativeInteger(
  data: UnknownRecord,
  key: string,
  message = `Campo inválido: ${key}`
): number | undefined {
  const value = readOptionalInteger(data, key, message);

  if (value !== undefined && value < 0) {
    throw new Error(message);
  }

  return value;
}

export function requireMoneyCents(
  data: UnknownRecord,
  key: string,
  message = `Campo inválido: ${key}`,
  options: { allowZero?: boolean } = {}
): number {
  const value = requireInteger(data, key, message);
  const allowZero = options.allowZero ?? true;

  if (value < 0 || (!allowZero && value === 0)) {
    throw new Error(message);
  }

  return value;
}

export function readOptionalMoneyCents(
  data: UnknownRecord,
  key: string,
  message = `Campo inválido: ${key}`,
  options: { allowZero?: boolean } = {}
): number | undefined {
  if (data[key] === undefined) {
    return undefined;
  }

  return requireMoneyCents(data, key, message, options);
}

export function readStringArray(data: UnknownRecord, key: string): string[] | undefined {
  const value = data[key];

  if (value === undefined) {
    return undefined;
  }

  if (!Array.isArray(value) || value.some((item) => typeof item !== "string")) {
    throw new Error(`Campo inválido: ${key}`);
  }

  return value.map((item) => item.trim());
}
