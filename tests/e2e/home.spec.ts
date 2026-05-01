import { expect, test } from "@playwright/test";

test("home mobile apresenta hero comercial, vitrine e contato real", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  await expect(page.getByRole("heading", { name: "Raio de Sol Ateliê" })).toBeVisible();
  await expect(page.getByRole("link", { name: /explorar catálogo/i })).toBeVisible();
  await expect(
    page
      .getByLabel("Ações principais")
      .getByRole("link", { name: /comprar pelo whatsapp/i })
  ).toBeVisible();
  await expect(page.getByRole("region", { name: /novidades da semana/i })).toBeVisible();
  await expect(
    page.getByLabel("Redes sociais").getByRole("link", { name: /instagram/i })
  ).toBeVisible();
});
