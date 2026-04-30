import { expect, test } from "@playwright/test";

test("bootstrap inicial responde no navegador", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: /bootstrap técnico/i })).toBeVisible();
});
