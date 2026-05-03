import { expect, test } from "@playwright/test";

test("catálogo mobile permite busca e filtros em até 3,5 segundos", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });

  await page.goto("/catalog");

  await expect(page.getByRole("heading", { name: /todas as peças/i })).toBeVisible();
  await expect(page.getByText("Bolsa Estrela Marina")).toBeVisible();

  await page.getByLabel(/buscar por nome/i).fill("infantil");
  await page.getByRole("button", { name: /infantil/i }).click();

  const startedAt = Date.now();
  await page.getByRole("button", { name: /aplicar filtros/i }).click();

  await expect(page.getByText("Saidinha infantil Pérola do Oceano")).toBeVisible();
  await expect(page.getByText("Bolsa Estrela Marina")).not.toBeVisible();
  expect(Date.now() - startedAt).toBeLessThan(3500);
});
