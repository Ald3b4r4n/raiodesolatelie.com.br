import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("página de produto não tem violações críticas de acessibilidade", async ({
  page
}) => {
  await page.goto("/products/conjunto-praia-croche");

  const results = await new AxeBuilder({ page }).analyze();

  expect(results.violations).toEqual([]);
});
