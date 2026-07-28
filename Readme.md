# 🎭 Playwright Quotes

A small, fun end-to-end test suite showcasing **Playwright + TypeScript**, testing the public practice site [quotes.toscrape.com](https://quotes.toscrape.com).

## What it demonstrates

- **Page Object Model** (`tests/pages/QuotesPage.ts`) for clean, reusable selectors
- **User-facing locators** (`getByRole`, `getByLabel`) over brittle CSS
- **Web-first assertions** with auto-waiting (`expect(locator).toBeVisible()`)
- **Pagination & tag filtering** flows
- **Login/logout** state transitions
- **API request testing** (`request.get`) without a browser
- Parallel execution, HTML reports, trace-on-retry, screenshot-on-failure

## Run it

```bash
npm install
npm run install:browsers   # downloads Chromium

npm test                   # headless
npm run test:headed        # watch it click around
npm run test:ui            # interactive UI mode
npm run report             # open the last HTML report
```

## Structure

```
tests/
  pages/QuotesPage.ts   # Page Object
  quotes.spec.ts        # browsing, pagination, tag filtering
  login.spec.ts         # login/logout + API check
playwright.config.ts
```

Kept intentionally small — the point is clean, idiomatic Playwright, not volume.
