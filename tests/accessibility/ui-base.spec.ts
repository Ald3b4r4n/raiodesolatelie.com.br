import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("UI base mobile-first não tem violações de acessibilidade", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  await page.getByRole("button", { name: /abrir menu/i }).click();

  const results = await new AxeBuilder({ page }).analyze();

  expect(results.violations).toEqual([]);
});
