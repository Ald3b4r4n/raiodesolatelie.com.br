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
  await expect(
    page.getByRole("button", { name: /adicionar ao carrinho/i })
  ).toBeEnabled();
  await page.getByRole("button", { name: /adicionar ao carrinho/i }).click();

  await expect(page.getByRole("status")).toContainText(/seleção confirmada/i);
  await expect(
    page.getByRole("link", { name: /comprar pelo whatsapp/i })
  ).toHaveAttribute("href", /wa\.me\/5561996632269/i);
});

test("galeria do vestido dune alterna entre duas fotos sem quebrar", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });

  await page.goto("/products/vestido-dune-croche");

  const first = page.getByRole("img", { name: /vestido dune.*foto 1/i });
  await expect(first).toBeVisible();

  await page.getByRole("button", { name: /próxima foto/i }).click();

  const second = page.getByRole("img", { name: /vestido dune.*foto 2/i });
  await expect(second).toBeVisible();

  await page.getByRole("button", { name: /ver foto 1/i }).click();
  await expect(first).toBeVisible();
});
