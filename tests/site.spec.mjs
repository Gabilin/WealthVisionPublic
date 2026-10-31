import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));

const routes = ['/', '/pricing.html', '/privacy-policy.html'];
for (const route of routes) {
  test(`${route} download destinations and retired promotion`, async ({ page }) => {
    await page.goto(route);
    await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
    const apple = page.locator('a[href="https://apps.apple.com/app/id6786717388"]');
    const google = page.locator('a[href="https://play.google.com/store/apps/details?id=com.tgdev.wealthvision"]');
    expect(await apple.count()).toBeGreaterThan(0);
    expect(await google.count()).toBeGreaterThan(0);
    await expect(apple.first()).toBeVisible();
    await expect(google.first()).toBeVisible();
    await expect(page.locator('a[href*="producthunt"], form[action*="formspree"]')).toHaveCount(0);
    await expect(page.getByText(/waitlist|founding price/i)).toHaveCount(0);
  });

  test(`${route} loads local assets and has no runtime errors`, async ({ page }) => {
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('response', response => { if (response.url().startsWith('http://127.0.0.1:4173') && response.status() >= 400) errors.push(`${response.status()} ${response.url()}`); });
    await page.goto(route);
    for (const image of await page.locator('img:visible').all()) {
      await image.scrollIntoViewIfNeeded();
      await expect(image).toHaveJSProperty('complete', true);
      expect(await image.evaluate(element => element.naturalWidth)).toBeGreaterThan(0);
    }
    await page.evaluate(async () => {
      await document.fonts.ready;
    });
    expect(errors).toEqual([]);
    expect(await page.locator('img').evaluateAll(images => images.every(image => image.complete && image.naturalWidth > 0))).toBe(true);
  });

  test(`${route} accessibility has no regressions from the original design`, async ({ page }, testInfo) => {
    await page.goto(route);
    const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
    const filename = route === '/' ? 'index.html' : route.slice(1);
    const original = execFileSync('git', ['show', `HEAD:${filename}`], { cwd: root, encoding: 'utf8' });
    const baseline = await page.context().newPage();
    const url = new URL(route, page.url()).href;
    await baseline.route(url, request => request.fulfill({ contentType: 'text/html', body: original }));
    await baseline.goto(url);
    const originalResults = await new AxeBuilder({ page: baseline }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
    const counts = violations => Object.fromEntries(violations.map(violation => [violation.id, violation.nodes.length]));
    const originalCounts = counts(originalResults.violations);
    for (const violation of results.violations) {
      expect(violation.nodes.length, violation.id).toBeLessThanOrEqual(originalCounts[violation.id] || 0);
    }
    await testInfo.attach('accessibility-current-and-original', { body: Buffer.from(JSON.stringify({ current: results.violations, original: originalResults.violations }, null, 2)), contentType: 'application/json' });
    await baseline.close();
  });

  test(`${route} responsive without horizontal overflow`, async ({ page }) => {
    for (const width of [320, 390, 768, 1024, 1440, 1920]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(route);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `overflow at ${width}px`).toBe(true);
    }
  });
}

test('November promotion has a consistent USD price and deadline', async ({ page }) => {
  for (const route of ['/', '/pricing.html']) {
    await page.goto(route);
    await expect(page.locator('[data-pro-price]')).toHaveText('US$1');
    const promotions = page.locator('[data-promotion]');
    expect(await promotions.count()).toBeGreaterThanOrEqual(2);
    for (const promotion of await promotions.all()) {
      await promotion.scrollIntoViewIfNeeded();
      await expect(promotion).toBeVisible();
      await expect(promotion).toContainText('US$1');
      await expect(promotion).toContainText(/one-time|No recurring charge/);
      await expect(promotion.locator('time')).toHaveAttribute('datetime', '2026-11-30');
      await expect(promotion.locator('time')).toHaveText('November 30, 2026');
    }
    await expect(page.getByRole('heading', { name: 'Free', exact: true }).locator('..')).toContainText('$0');
  }
});

test('store buttons match in size, style, and visible badge height', async ({ page }) => {
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    const badges = await page.locator('a.store').evaluateAll(async links => {
      return Promise.all(links.map(async link => {
        const image = link.querySelector('img');
        await image.decode();
        const canvas = document.createElement('canvas');
        canvas.width = image.naturalWidth;
        canvas.height = image.naturalHeight;
        const context = canvas.getContext('2d');
        context.drawImage(image, 0, 0);
        const { data } = context.getImageData(0, 0, canvas.width, canvas.height);
        let top = canvas.height;
        let bottom = -1;
        for (let row = 0; row < canvas.height; row++) {
          for (let column = 0; column < canvas.width; column++) {
            if (data[(row * canvas.width + column) * 4 + 3] > 16) {
              top = Math.min(top, row);
              bottom = Math.max(bottom, row);
            }
          }
        }
        const rectangle = link.getBoundingClientRect();
        const imageRectangle = image.getBoundingClientRect();
        const style = getComputedStyle(link);
        const scale = Math.min(imageRectangle.width / canvas.width, imageRectangle.height / canvas.height);
        return {
          width: rectangle.width,
          height: rectangle.height,
          background: style.backgroundColor,
          border: style.border,
          radius: style.borderRadius,
          visibleHeight: (bottom - top + 1) * scale,
        };
      }));
    });
    expect(badges).toHaveLength(4);
    for (const [apple, google] of [[badges[0], badges[1]], [badges[2], badges[3]]]) {
      expect(google.width).toBe(apple.width);
      expect(google.height).toBe(apple.height);
      expect(google.background).toBe(apple.background);
      expect(google.border).toBe(apple.border);
      expect(google.radius).toBe(apple.radius);
      expect(google.visibleHeight).toBeCloseTo(apple.visibleHeight, 0);
      expect(google.visibleHeight).toBeCloseTo(40, 0);
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
});

test('original browser demonstrations still switch tools', async ({ page }) => {
  await page.goto('/');
  const tabs = page.getByRole('tab');
  await expect(tabs).toHaveCount(4);
  const tools = ['demo/screen5.html', 'demo/accelerate.html', 'demo/screen10a.html', 'demo/kidmode.html'];
  for (const [index, tab] of (await tabs.all()).entries()) {
    await tab.click();
    await expect(tab).toHaveAttribute('aria-selected', 'true');
    await expect(page.locator('#playFrame')).toHaveAttribute('src', tools[index]);
    await expect(page.locator('[data-cap-title]')).not.toBeEmpty();
  }
});

test('current app screenshots replace the old presentation', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.phone-screen img')).toHaveAttribute('src', 'images/screens/home.webp');
  await expect(page.locator('#family img')).toHaveAttribute('src', 'images/screens/kids.webp');
  await expect(page.locator('img[src="images/dashboard.png"]')).toHaveCount(0);
});

test('mobile Get the app reaches working download links', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.locator('nav').first().getByRole('link', { name: 'Get the app', exact: true }).click();
  await expect(page).toHaveURL(/#get$/);
  await expect(page.locator('#get a[href*="apps.apple.com"]')).toBeVisible();
  await expect(page.locator('#get a[href*="play.google.com"]')).toBeVisible();
  await expect(page.locator('#get')).toHaveClass(/reveal|relative/);
});

test('FAQ opens and closes from the keyboard', async ({ page }) => {
  await page.goto('/');
  const question = page.locator('details summary').filter({ hasText: 'Do you link my bank account?' });
  await question.focus();
  await page.keyboard.press('Enter');
  await expect(page.getByText('Never. WealthVision does not connect to banks', { exact: false })).toBeVisible();
  await page.keyboard.press('Enter');
  await expect(page.getByText('Never. WealthVision does not connect to banks', { exact: false })).not.toBeVisible();
});

test('hero downloads work without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, reducedMotion: 'reduce' });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:4173/');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await expect(page.locator('.phone-screen img')).toBeVisible();
  await expect(page.getByRole('link', { name: 'Download WealthVision on the App Store' }).first()).toBeVisible();
  await expect(page.getByRole('link', { name: 'Get WealthVision on Google Play' }).first()).toBeVisible();
  await context.close();
});

test('original dark visual identity is retained', async ({ page }) => {
  await page.goto('/');
  expect(await page.locator('body').evaluate(body => getComputedStyle(body).backgroundColor)).toBe('rgb(12, 12, 14)');
  expect(await page.locator('body').evaluate(body => getComputedStyle(body).fontFamily)).toContain('IBM Plex Sans');
  await expect(page.locator('link[href="site.css"], script[src="site.js"], img[src*="hero-desktop"]')).toHaveCount(0);
});

test('privacy distinguishes saved plans from transient calculations', async ({ page }) => {
  await page.goto('/privacy-policy.html');
  await expect(page.getByText('and scenario comparisons run locally, but their inputs and results are not saved between sessions.', { exact: false })).toHaveCount(1);
});

test('local links resolve and section anchors exist', async ({ page, request }) => {
  for (const route of routes) {
    await page.goto(route);
    const sourceURL = page.url();
    const links = await page.locator('a[href]').evaluateAll(anchors => anchors.map(anchor => anchor.getAttribute('href')));
    for (const href of new Set(links)) {
      if (/^(https?:|mailto:)/.test(href)) continue;
      const url = new URL(href, sourceURL);
      expect((await request.get(url.pathname)).status(), href).toBe(200);
      if (url.hash) {
        await page.goto(url.href);
        await expect(page.locator(url.hash)).toHaveCount(1);
      }
    }
  }
});