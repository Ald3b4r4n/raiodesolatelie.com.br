import { expect, test } from "@playwright/test";

test("home responde no navegador", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: "Ateliê Raios de Sol" })).toBeVisible();
});
