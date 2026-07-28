import { test, expect } from '@playwright/test';

test.describe('Login flow (accepts any credentials — great for practice)', () => {
  test('logging in swaps the Login link for a Logout link', async ({ page }) => {
    await page.goto('/login');

    await page.getByLabel('Username').fill('tester');
    await page.getByLabel('Password').fill('hunter2');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.getByRole('link', { name: 'Logout' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Login' })).toHaveCount(0);
  });

  test('logout returns you to the anonymous view', async ({ page }) => {
    await page.goto('/login');
    await page.getByLabel('Username').fill('tester');
    await page.getByLabel('Password').fill('hunter2');
    await page.getByRole('button', { name: 'Login' }).click();

    await page.getByRole('link', { name: 'Logout' }).click();
    await expect(page.getByRole('link', { name: 'Login' })).toBeVisible();
  });
});

test.describe('API-level check (no browser rendering needed)', () => {
  test('the site responds with 200 and HTML', async ({ request }) => {
    const res = await request.get('https://quotes.toscrape.com/');
    expect(res.status()).toBe(200);
    expect(res.headers()['content-type']).toContain('text/html');
    expect(await res.text()).toContain('Quotes to Scrape');
  });
});
