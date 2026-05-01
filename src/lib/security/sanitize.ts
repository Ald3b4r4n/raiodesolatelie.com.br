const HTML_ESCAPE_MAP: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
};

const HTML_ESCAPE_REGEX = /[&<>"']/g;

export function sanitizePublicText(input: string): string {
  return input.trim().replace(HTML_ESCAPE_REGEX, (char) => HTML_ESCAPE_MAP[char] ?? char);
}

export function sanitizePublicFields<T extends Record<string, unknown>>(
  input: T,
  fields: (keyof T)[]
): T {
  const sanitized: T = { ...input };

  for (const field of fields) {
    const value = sanitized[field];

    if (typeof value === "string") {
      sanitized[field] = sanitizePublicText(value) as T[keyof T];
    }
  }

  return sanitized;
}
