import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("pagina de novidades nao tem violacoes de acessibilidade", async ({ page }) => {
  await page.goto("/novidades");

  const results = await new AxeBuilder({ page }).analyze();

  expect(results.violations).toEqual([]);
});
