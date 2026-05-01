import { expect, test } from "@playwright/test";

test("produto mobile permite selecionar variação válida e aciona WhatsApp real", async ({
  page
}) => {
  await page.setViewportSize({ width: 390, height: 844 });

  await page.goto("/products/conjunto-praia-croche");

  await expect(
    page.getByRole("heading", { name: /conjunto praia em crochê/i })
  ).toBeVisible();
  await expect(page.getByLabel(/tamanho/i)).toBeVisible();
  await expect(page.getByLabel(/cor/i)).toBeVisible();

  await page.getByLabel(/tamanho/i).selectOption("M");
  await page.getByLabel(/cor/i).selectOption("Amarelo sol");
  await page.getByRole("button", { name: /adicionar ao carrinho/i }).click();

  await expect(page.getByRole("status")).toContainText(/próxima fase/i);
  await expect(
    page.getByRole("link", { name: /comprar pelo whatsapp/i })
  ).toHaveAttribute("href", /wa\.me\/5561996632269/i);
});
