import { expect, test } from "@playwright/test";

test("home mobile apresenta marca, CTA e placeholders seguros", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  await expect(page.getByRole("heading", { name: "Raio de Sol Ateliê" })).toBeVisible();
  await expect(page.getByRole("link", { name: /ver catálogo/i })).toBeVisible();
  await expect(page.getByRole("button", { name: /whatsapp em breve/i })).toBeDisabled();
  await expect(page.getByText(/produtos reais serão adicionados/i)).toBeVisible();
});
