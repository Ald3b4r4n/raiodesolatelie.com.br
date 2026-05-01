const spacingPattern = /\s+/g;

export function normalizeProductQuery(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(spacingPattern, " ");
}

export function buildProductSearchIndex(input: {
  name: string;
  description: string;
}): string {
  return normalizeProductQuery(`${input.name} ${input.description}`);
}

export function matchesProductQuery(
  searchIndex: string | undefined,
  query: string | undefined
): boolean {
  const normalizedQuery = normalizeProductQuery(query ?? "");

  if (!normalizedQuery) {
    return true;
  }

  const normalizedIndex = normalizeProductQuery(searchIndex ?? "");
  return normalizedQuery
    .split(" ")
    .every((term) => term.length > 0 && normalizedIndex.includes(term));
}
