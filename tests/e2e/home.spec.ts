import { expect, test } from "@playwright/test";

test("home mobile apresenta hero comercial, vitrine e contato real", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  expect(await page.evaluate(() => window.innerWidth)).toBe(390);

  await expect(page.getByRole("heading", { name: "Ateliê Raios de Sol" })).toBeVisible();
  await expect(
    page.getByAltText("Modelo usando vestido laranja em crochê do Ateliê Raios de Sol")
  ).toBeVisible();
  await expect(page.getByRole("link", { name: /ver catálogo/i }).first()).toBeVisible();
  await expect(
    page
      .getByLabel("Ações principais")
      .getByRole("link", { name: /comprar pelo whatsapp/i })
      .first()
  ).toBeVisible();
  await expect(page.locator("#novidades")).toBeVisible();
  await expect(
    page.getByLabel("Redes sociais").getByRole("link", { name: /instagram/i })
  ).toBeVisible();
});

test("home mobile nao deixa hero nem secoes passarem da largura do viewport", async ({
  page
}) => {
  await page.setViewportSize({ width: 430, height: 932 });
  await page.goto("/");

  const widths = await page.evaluate(() => {
    const pick = (selector: string) =>
      document.querySelector(selector)?.getBoundingClientRect().width ?? null;

    return {
      viewport: window.innerWidth,
      heroShell: pick(".home-hero .home-shell"),
      hero: pick(".hero-editorial"),
      showcase: pick(".home-showcase"),
      lookbook: pick(".home-lookbook")
    };
  });

  expect(widths.heroShell).not.toBeNull();
  expect(widths.hero).not.toBeNull();
  expect(widths.showcase).not.toBeNull();
  expect(widths.lookbook).not.toBeNull();
  expect(widths.heroShell!).toBeLessThanOrEqual(widths.viewport);
  expect(widths.hero!).toBeLessThanOrEqual(widths.viewport);
  expect(widths.showcase!).toBeLessThanOrEqual(widths.viewport);
  expect(widths.lookbook!).toBeLessThanOrEqual(widths.viewport);
});

test("home mostra botao de voltar ao topo ao rolar e retorna ao inicio", async ({
  page
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  const backToTopButton = page.getByRole("button", { name: /voltar ao topo/i });

  await expect(backToTopButton).toHaveAttribute("data-visible", "false");

  await page.evaluate(() => window.scrollTo({ top: 1400, behavior: "auto" }));
  await page.waitForFunction(() => window.scrollY > 900);

  await expect(backToTopButton).toHaveAttribute("data-visible", "true");

  await backToTopButton.click();
  await page.waitForFunction(() => window.scrollY < 20);
});
