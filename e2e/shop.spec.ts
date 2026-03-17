import { test, expect } from '@playwright/test';

test.describe('Shop', () => {
  test('should display product cards from the API', async ({ page }) => {
    await page.goto('/shop');
    const cards = page.locator('app-product-card');
    await expect(cards.first()).toBeVisible({ timeout: 10_000 });
    expect(await cards.count()).toBeGreaterThan(0);
    await expect(cards.first()).not.toBeEmpty();
    await expect(cards.first()).toContainText('/');
  });

  test('should add a product to the basket and navigate to it', async ({ page }) => {
    await page.goto('/shop');
    const firstCard = page.locator('app-product-card').first();
    await expect(firstCard).toBeVisible({ timeout: 10_000 });

    const productName = await firstCard.locator('[data-testid="product-name"]').textContent();
    await firstCard.locator('.add-btn').click();

    // Basket badge should appear in nav
    const basketTab = page.locator('a[routerLink="/basket"]');
    await expect(basketTab).toContainText('(1)');

    // Navigate to basket
    await basketTab.click();
    await expect(page).toHaveURL(/\/basket/);

    // Product should be in basket
    await expect(page.locator('app-product-card').first()).toContainText(
      (productName ?? '').trim(),
    );
  });

  test('should remove an item from the basket', async ({ page }) => {
    await page.goto('/shop');
    const firstCard = page.locator('app-product-card').first();
    await expect(firstCard).toBeVisible({ timeout: 10_000 });
    await firstCard.locator('.add-btn').click();

    await page.locator('a[routerLink="/basket"]').click();
    await expect(page).toHaveURL(/\/basket/);
    await expect(page.locator('.remove-btn')).toBeVisible();

    await page.locator('.remove-btn').first().click();
    await expect(page.getByText(/prázdný|empty|prázdny/i)).toBeVisible();
  });

  test('should switch currency and update prices', async ({ page }) => {
    await page.goto('/shop');
    const firstCard = page.locator('app-product-card').first();
    await expect(firstCard).toBeVisible({ timeout: 10_000 });

    await expect(firstCard).toContainText('Kč');

    // Switch to EUR
    const currencySelect = page.locator('.header-selectors mat-form-field').last();
    await currencySelect.click();
    await page.locator('mat-option').filter({ hasText: 'EUR' }).click();

    await expect(firstCard).toContainText('€');
  });

  test('should switch language and update UI text', async ({ page }) => {
    await page.goto('/shop');
    await expect(page.locator('app-product-card').first()).toBeVisible({ timeout: 10_000 });

    // Default is Czech
    const basketTab = page.locator('a[routerLink="/basket"]');
    await expect(basketTab).toContainText('Košík');

    // Switch to English
    const langSelect = page.locator('.header-selectors mat-form-field').first();
    await langSelect.click();
    await page.locator('mat-option').filter({ hasText: 'English' }).click();

    await expect(basketTab).toContainText('Basket');
  });
});
