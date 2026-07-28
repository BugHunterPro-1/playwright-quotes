import { test, expect } from '@playwright/test';
import { QuotesPage } from './pages/QuotesPage';

test.describe('Browsing quotes', () => {
  test('home page shows 10 quotes, each with author + text', async ({ page }) => {
    const quotes = new QuotesPage(page);
    await quotes.goto();

    await expect(quotes.quotes).toHaveCount(10);
    await expect(quotes.quoteText(0)).not.toBeEmpty();
    await expect(quotes.quoteAuthor(0)).not.toBeEmpty();
  });

  test('the famous Einstein quote is on the front page', async ({ page }) => {
    const quotes = new QuotesPage(page);
    await quotes.goto();

    await expect(quotes.quotes.first()).toContainText('world we have created');
    await expect(quotes.quoteAuthor(0)).toHaveText('Albert Einstein');
  });

  test('pagination loads a fresh set of quotes', async ({ page }) => {
    const quotes = new QuotesPage(page);
    await quotes.goto();

    const firstBefore = await quotes.quoteText(0).innerText();
    await quotes.goToNextPage();
    const firstAfter = await quotes.quoteText(0).innerText();

    expect(firstAfter).not.toBe(firstBefore);
    await expect(page).toHaveURL(/\/page\/2\/?$/);
  });

  test('filtering by the "love" tag returns only tagged quotes', async ({ page }) => {
    const quotes = new QuotesPage(page);
    await quotes.goto();
    await quotes.filterByTag('love');

    await expect(page).toHaveURL(/\/tag\/love/);
    const count = await quotes.quoteCount();
    expect(count).toBeGreaterThan(0);

    // Every visible quote should carry the "love" tag.
    for (let i = 0; i < count; i++) {
      await expect(quotes.quotes.nth(i).locator('.tags')).toContainText('love');
    }
  });
});
