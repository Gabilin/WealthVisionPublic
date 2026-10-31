# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: site.spec.mjs >> mobile navigation opens, follows links, and closes with Escape
- Location: tests/site.spec.mjs:73:1

# Error details

```
Error: expect(locator).toHaveAttribute(expected) failed

Locator: getByRole('button', { name: 'Open navigation' })
Expected: "true"
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toHaveAttribute" getByRole('button', { name: 'Open navigation' }) with timeout 5000ms
  - waiting for getByRole('button', { name: 'Open navigation' })

```

```yaml
- link "Skip to content":
  - /url: "#main"
- banner:
  - link "WealthVision home":
    - /url: index.html
    - text: WealthVision
  - navigation "Main navigation":
    - link "The app":
      - /url: "#features"
    - link "For families":
      - /url: "#family"
    - link "Pricing":
      - /url: pricing.html
    - link "Privacy":
      - /url: privacy-policy.html
  - button "Close navigation" [expanded]
- main:
  - region "WealthVision":
    - 'img "Real WealthVision app screens: a savings goal, monthly progress, compound growth, and Kid Mode."'
    - heading "WealthVision" [level=1]
    - paragraph: Watch your future unfold.
    - paragraph: A little clarity for your next money move. Plan payday, build a goal, and learn by doing. All on your device.
    - link "Download WealthVision on the App Store":
      - /url: https://apps.apple.com/app/id6786717388
      - img "Download on the App Store"
    - link "Get WealthVision on Google Play":
      - /url: https://play.google.com/store/apps/details?id=com.tgdev.wealthvision
      - img "Get it on Google Play"
    - paragraph: Free to start. No account. No bank link.
  - paragraph: Start with one thing you want to make easier.
  - link "Find your next step":
    - /url: "#features"
  - region "Your numbers. A clearer next step.":
    - heading "Your numbers. A clearer next step." [level=2]
    - paragraph: Not another account to connect. Practical tools for the money decisions already on your mind.
    - tablist "Money decisions":
      - tab "Build a goal" [selected]
      - tab "Plan payday"
      - tab "Check a purchase"
      - tab "Explore growth"
      - tab "Learn by doing"
      - tab "Start with allowance"
    - tabpanel "Build a goal":
      - figure "Actual app screen. Example numbers.":
        - 'img "Goal Builder review for Trip to Japan: target $6,000, $375 a month, an illustrative 5% return assumption."'
        - text: Actual app screen. Example numbers.
      - heading "Make the someday plan a monthly plan." [level=3]
      - paragraph: A trip, a home deposit, a little breathing room. Put a name and a number on it, include what you have already saved, and find a monthly contribution that works for you.
      - paragraph: Leave with a saved goal, a contribution, and an estimated timeline you can revisit.
      - paragraph: You choose the assumptions. Estimated completion is a projection, not a guarantee.
      - status
  - region "Less money jargon. More lightbulb moments.":
    - heading "Less money jargon. More lightbulb moments." [level=2]
    - paragraph: Short visual lessons bring the math and the psychology together. Learn why a habit helps, then try it with your own numbers.
    - link "Learn at your own pace":
      - /url: "#get"
    - img "A visual lesson in the WealthVision app."
    - img "Home shows the next lesson alongside saved-goal progress."
  - region "Your money. Your device. Full stop.":
    - heading "Your money. Your device. Full stop." [level=2]
    - paragraph: You do not need to hand over your bank login to understand your money. WealthVision keeps the plan on your device.
    - link "Read the privacy promise":
      - /url: privacy-policy.html
    - term: No account to create.
    - definition: No sign-up, email, or password to start using the app.
    - term: No bank connection.
    - definition: You enter the numbers you choose. We never access or move your money.
    - term: No ads or tracking.
    - definition: No ad networks or analytics watching what you do in the app.
    - term: Planning works offline.
    - definition: Tools and lessons run on device. Store downloads and purchases need a connection.
  - region "Their first money lesson can start with allowance.":
    - heading "Their first money lesson can start with allowance." [level=2]
    - paragraph: Save a little. Spend a little. Talk about the choice. Kid Mode gives families a simple place to make those first decisions together.
    - paragraph: Ages 5–12. One child included free; multiple children with Pro. Local progress, no public profiles, no ads.
    - link "Bring the conversation home":
      - /url: "#get"
    - figure "Actual app screen. Example allowance.":
      - img "Kid Mode in the app, with an allowance balance and a savings goal."
      - text: Actual app screen. Example allowance.
  - region "A money coach. Not another monthly bill.":
    - heading "A money coach. Not another monthly bill." [level=2]
    - paragraph: Start with useful tools for free. Unlock more planning options with one optional Pro purchase. No subscription, renewal, or trial countdown.
    - link "Compare Free and Pro":
      - /url: pricing.html
    - term: Free
    - definition: Learn, plan payday, explore growth, and start a goal.
    - term: Pro
    - definition:
      - text: More goals, comparisons, and room for the family.
      - strong: One-time unlock.
  - region "A few things worth knowing.":
    - heading "A few things worth knowing." [level=2]
    - group: Does WealthVision connect to my bank?
    - group: Does it work without internet?
    - group: Can I start without paying?
    - group: Are the investment results guaranteed?
    - group: How do I get Pro?
  - region "Make your next move a little clearer.":
    - heading "Make your next move a little clearer." [level=2]
    - paragraph: WealthVision for iOS and Android. Start for free.
    - link "Download WealthVision on the App Store":
      - /url: https://apps.apple.com/app/id6786717388
      - img "Download on the App Store"
    - link "Get WealthVision on Google Play":
      - /url: https://play.google.com/store/apps/details?id=com.tgdev.wealthvision
      - img "Get it on Google Play"
    - paragraph: No account. No bank link. No subscription.
- contentinfo:
  - link "WealthVision":
    - /url: index.html
  - navigation "Footer navigation":
    - link "Pricing":
      - /url: pricing.html
    - link "Privacy policy":
      - /url: privacy-policy.html
    - link "Contact":
      - /url: mailto:tised.gabilin@gmail.com
  - paragraph: © 2026 WealthVision
  - paragraph: Educational and planning tools, not financial advice. Figures are illustrative. Past performance does not guarantee future results.
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | import AxeBuilder from '@axe-core/playwright';
  3   | 
  4   | const routes = ['/', '/pricing.html', '/privacy-policy.html'];
  5   | for (const route of routes) {
  6   |   test(`${route} download destinations and retired promotion`, async ({ page }) => {
  7   |     await page.goto(route);
  8   |     await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
  9   |     const apple = page.locator('a[href="https://apps.apple.com/app/id6786717388"]');
  10  |     const google = page.locator('a[href="https://play.google.com/store/apps/details?id=com.tgdev.wealthvision"]');
  11  |     expect(await apple.count()).toBeGreaterThan(0);
  12  |     expect(await google.count()).toBeGreaterThan(0);
  13  |     await expect(apple.first()).toBeVisible();
  14  |     await expect(google.first()).toBeVisible();
  15  |     await expect(page.locator('a[href*="producthunt"], form[action*="formspree"]')).toHaveCount(0);
  16  |     await expect(page.getByText(/waitlist|founding price/i)).toHaveCount(0);
  17  |   });
  18  | 
  19  |   test(`${route} loads local assets and has no runtime errors`, async ({ page }) => {
  20  |     const errors = [];
  21  |     page.on('pageerror', error => errors.push(error.message));
  22  |     page.on('response', response => { if (response.url().startsWith('http://127.0.0.1:4173') && response.status() >= 400) errors.push(`${response.status()} ${response.url()}`); });
  23  |     await page.goto(route);
  24  |     await page.evaluate(async () => {
  25  |       await document.fonts.ready;
  26  |       await Promise.all([...document.images].map(image => image.decode().catch(() => {})));
  27  |     });
  28  |     expect(errors).toEqual([]);
  29  |     expect(await page.locator('img').evaluateAll(images => images.every(image => image.complete && image.naturalWidth > 0))).toBe(true);
  30  |   });
  31  | 
  32  |   test(`${route} accessibility`, async ({ page }) => {
  33  |     await page.goto(route);
  34  |     const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
  35  |     expect(results.violations).toEqual([]);
  36  |   });
  37  | 
  38  |   test(`${route} responsive without horizontal overflow`, async ({ page }) => {
  39  |     for (const width of [320, 390, 768, 1024, 1440, 1920]) {
  40  |       await page.setViewportSize({ width, height: 900 });
  41  |       await page.goto(route);
  42  |       expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `overflow at ${width}px`).toBe(true);
  43  |     }
  44  |   });
  45  | }
  46  | 
  47  | test('all money decisions expose an actual screenshot', async ({ page }) => {
  48  |   await page.goto('/');
  49  |   const tabs = page.getByRole('tab');
  50  |   await expect(tabs).toHaveCount(6);
  51  |   for (const tab of await tabs.all()) {
  52  |     await tab.click();
  53  |     await expect(tab).toHaveAttribute('aria-selected', 'true');
  54  |     await expect(page.getByRole('tabpanel')).toBeVisible();
  55  |     await expect(page.locator('#decision-screen')).toHaveAttribute('src', /images\/screens\/.+\.webp/);
  56  |     expect(await page.locator('#decision-screen').evaluate(image => image.complete && image.naturalWidth > 0)).toBe(true);
  57  |   }
  58  | });
  59  | 
  60  | test('screenshot tabs support keyboard navigation', async ({ page }) => {
  61  |   await page.goto('/');
  62  |   const tabs = page.getByRole('tab');
  63  |   await tabs.first().focus();
  64  |   await page.keyboard.press('ArrowRight');
  65  |   await expect(tabs.nth(1)).toBeFocused();
  66  |   await expect(tabs.nth(1)).toHaveAttribute('aria-selected', 'true');
  67  |   await page.keyboard.press('End');
  68  |   await expect(tabs.last()).toBeFocused();
  69  |   await page.keyboard.press('Home');
  70  |   await expect(tabs.first()).toBeFocused();
  71  | });
  72  | 
  73  | test('mobile navigation opens, follows links, and closes with Escape', async ({ page }) => {
  74  |   await page.setViewportSize({ width: 390, height: 844 });
  75  |   await page.goto('/');
  76  |   const menu = page.getByRole('button', { name: 'Open navigation' });
  77  |   await menu.click();
> 78  |   await expect(menu).toHaveAttribute('aria-expanded', 'true');
      |                      ^ Error: expect(locator).toHaveAttribute(expected) failed
  79  |   await page.keyboard.press('Escape');
  80  |   await expect(menu).toHaveAttribute('aria-expanded', 'false');
  81  |   await menu.click();
  82  |   await page.locator('#navigation').getByRole('link', { name: 'The app', exact: true }).click();
  83  |   await expect(menu).toHaveAttribute('aria-expanded', 'false');
  84  |   await expect(page).toHaveURL(/#features$/);
  85  | });
  86  | 
  87  | test('FAQ opens and closes from the keyboard', async ({ page }) => {
  88  |   await page.goto('/');
  89  |   const question = page.getByText('Does WealthVision connect to my bank?', { exact: true });
  90  |   await question.focus();
  91  |   await page.keyboard.press('Enter');
  92  |   await expect(page.getByText('No. You enter the numbers you want to work with.', { exact: false })).toBeVisible();
  93  |   await page.keyboard.press('Enter');
  94  |   await expect(page.getByText('No. You enter the numbers you want to work with.', { exact: false })).not.toBeVisible();
  95  | });
  96  | 
  97  | test('reduced motion and JavaScript-free content remain usable', async ({ browser }) => {
  98  |   const context = await browser.newContext({ javaScriptEnabled: false, reducedMotion: 'reduce' });
  99  |   const page = await context.newPage();
  100 |   await page.goto('http://127.0.0.1:4173/');
  101 |   await expect(page.getByRole('heading', { name: 'WealthVision' })).toBeVisible();
  102 |   await expect(page.locator('#decision-screen')).toBeVisible();
  103 |   await expect(page.getByRole('link', { name: 'Pricing', exact: true }).first()).toBeVisible();
  104 |   await context.close();
  105 | });
  106 | 
  107 | test('local links resolve and section anchors exist', async ({ page, request }) => {
  108 |   for (const route of routes) {
  109 |     await page.goto(route);
  110 |     const links = await page.locator('a[href]').evaluateAll(anchors => anchors.map(anchor => anchor.getAttribute('href')));
  111 |     for (const href of new Set(links)) {
  112 |       if (/^(https?:|mailto:)/.test(href)) continue;
  113 |       const url = new URL(href, page.url());
  114 |       expect((await request.get(url.pathname)).status(), href).toBe(200);
  115 |       if (url.hash) {
  116 |         await page.goto(url.href);
  117 |         await expect(page.locator(url.hash)).toHaveCount(1);
  118 |       }
  119 |     }
  120 |   }
  121 | });
```