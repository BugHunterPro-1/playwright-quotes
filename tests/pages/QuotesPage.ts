import { type Page, type Locator, expect } from '@playwright/test';

/**
 * Page Object for quotes.toscrape.com — keeps selectors in one place
 * so tests stay readable and refactor-friendly.
 */
export class QuotesPage {
  readonly page: Page;
  readonly quotes: Locator;
  readonly loginLink: Locator;
  readonly nextButton: Locator;
  readonly tags: Locator;

  constructor(page: Page) {
    this.page = page;
    this.quotes = page.locator('.quote');
    this.loginLink = page.getByRole('link', { name: 'Login' });
    this.nextButton = page.locator('li.next a');
    this.tags = page.locator('.tag-item .tag');
  }

  async goto(path = '/'): Promise<void> {
    await this.page.goto(path);
  }

  /** Text of the quote at a given index. */
  quoteText(index: number): Locator {
    return this.quotes.nth(index).locator('.text');
  }

  /** Author of the quote at a given index. */
  quoteAuthor(index: number): Locator {
    return this.quotes.nth(index).locator('.author');
  }

  async quoteCount(): Promise<number> {
    return this.quotes.count();
  }

  async goToNextPage(): Promise<void> {
    await this.nextButton.click();
    await expect(this.quotes.first()).toBeVisible();
  }

  async filterByTag(tag: string): Promise<void> {
    await this.page.getByRole('link', { name: tag, exact: true }).first().click();
  }

  /** Collect every author name currently shown on the page. */
  async authors(): Promise<string[]> {
    return this.quotes.locator('.author').allInnerTexts();
  }
}
