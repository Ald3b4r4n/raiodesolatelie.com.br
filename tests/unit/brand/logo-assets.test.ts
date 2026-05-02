import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

const repoRoot = process.cwd();

function listTextFiles(directory: string): string[] {
  return readdirSync(directory).flatMap((entry) => {
    const path = join(directory, entry);
    const stats = statSync(path);

    if (stats.isDirectory()) {
      return listTextFiles(path);
    }

    return /\.(css|md|ts|tsx)$/.test(path) ? [path] : [];
  });
}

describe("assets públicos de marca", () => {
  it("mantém a logo PNG como fonte pública principal sem referência à logo antiga", () => {
    const oldLogoPath = ["/brand/logo-identidade", "jpeg"].join(".");
    const currentLogoPath = ["/brand/logo-identidade", "png"].join(".");

    expect(existsSync(join(repoRoot, "public/brand/logo-identidade.png"))).toBe(true);
    expect(
      existsSync(join(repoRoot, "public/brand", ["logo-identidade", "jpeg"].join(".")))
    ).toBe(false);

    const publicText = listTextFiles(join(repoRoot, "src"))
      .concat(listTextFiles(join(repoRoot, "tests")))
      .map((file) => readFileSync(file, "utf8"))
      .join("\n");

    expect(publicText).not.toContain(oldLogoPath);
    expect(publicText).toContain(currentLogoPath);
  });
});
