import { expect, test } from "@playwright/test";

test("novidades mobile apresenta vitrine, catalogo e WhatsApp", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/novidades");

  expect(await page.evaluate(() => window.innerWidth)).toBe(390);

  await expect(
    page.getByRole("heading", { name: /lan.amentos e pe.as recentes do ateli./i })
  ).toBeVisible();
  await expect(page.getByRole("link", { name: /ver cat.logo completo/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /ir para o whatsapp/i })).toBeVisible();
  await expect(page.getByLabel(/carrossel de novidades do ateli./i)).toBeVisible();
  await expect(page.getByRole("heading", { name: /vestido dune em croch./i }).first()).toBeVisible();
});

test("novidades mobile nao deixa hero nem vitrine passarem da largura do viewport", async ({
  page
}) => {
  await page.setViewportSize({ width: 430, height: 932 });
  await page.goto("/novidades");

  const widths = await page.evaluate(() => {
    const pick = (selector: string) =>
      document.querySelector(selector)?.getBoundingClientRect().width ?? null;

    return {
      viewport: window.innerWidth,
      page: pick(".novidades-page"),
      hero: pick(".novidades-hero"),
      content: pick(".novidades-hero__content"),
      showcase: pick(".novidades-showcase")
    };
  });

  expect(widths.page).not.toBeNull();
  expect(widths.hero).not.toBeNull();
  expect(widths.content).not.toBeNull();
  expect(widths.showcase).not.toBeNull();
  expect(widths.page!).toBeLessThanOrEqual(widths.viewport);
  expect(widths.hero!).toBeLessThanOrEqual(widths.viewport);
  expect(widths.content!).toBeLessThanOrEqual(widths.viewport);
  expect(widths.showcase!).toBeLessThanOrEqual(widths.viewport);
});

test("novidades exibe todas as fotos sem corte na vitrine", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/novidades");

  const slideCount = await page.locator(".novidades-product-slide").count();
  const objectFit = await page
    .locator(".novidades-product-slide .product-card__image-element")
    .first()
    .evaluate((element) => window.getComputedStyle(element).objectFit);

  expect(slideCount).toBe(20);
  expect(objectFit).toBe("contain");
});

test("novidades desktop mantÃ©m cards compactos e legÃ­veis", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/novidades");

  const showcase = page.locator(".novidades-showcase");
  const card = page.locator(".novidades-product-slide .product-card").first();
  const image = page.locator(".novidades-product-slide .product-card__image").first();

  await expect(showcase).toBeVisible();
  await expect(card).toBeVisible();

  const showcaseBox = await showcase.boundingBox();
  const cardBox = await card.boundingBox();
  const imageBox = await image.boundingBox();

  expect(showcaseBox?.width).toBeLessThanOrEqual(800);
  expect(cardBox?.height).toBeLessThanOrEqual(500);
  expect(imageBox?.height).toBeLessThanOrEqual(260);
});
