# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: site.spec.mjs >> local links resolve and section anchors exist
- Location: tests/site.spec.mjs:107:1

# Error details

```
Error: expect(locator).toHaveCount(expected) failed

Locator:  locator('#collection')
Expected: 1
Received: 0
Timeout:  5000ms

Call log:
  - Expect "toHaveCount" locator('#collection') with timeout 5000ms
  - waiting for locator('#collection')
    14 × locator resolved to 0 elements
       - unexpected value "0"

```

# Page snapshot

```yaml
- generic [active] [ref=f4e1]:
  - link "Skip to content" [ref=f4e2]:
    - /url: "#main"
  - banner [ref=f4e3]:
    - generic [ref=f4e4]:
      - link "WealthVision home" [ref=f4e5]:
        - /url: index.html
        - text: WealthVision
      - button "Open navigation" [ref=f4e6] [cursor=pointer]
  - main [ref=f4e7]:
    - region [ref=f4e8]:
      - 'img "Real WealthVision app screens: a savings goal, monthly progress, compound growth, and Kid Mode." [ref=f4e10]'
      - generic [ref=f4e11]:
        - heading "WealthVision" [level=1] [ref=f4e12]
        - paragraph [ref=f4e13]: Watch your future unfold.
        - paragraph [ref=f4e14]: A little clarity for your next money move.Plan payday, build a goal, and learn by doing.All on your device.
        - generic "Download WealthVision" [ref=f4e15]:
          - link "Download WealthVision on the App Store" [ref=f4e16]:
            - /url: https://apps.apple.com/app/id6786717388
            - img "Download on the App Store" [ref=f4e17]
          - link "Get WealthVision on Google Play" [ref=f4e18]:
            - /url: https://play.google.com/store/apps/details?id=com.tgdev.wealthvision
            - img "Get it on Google Play" [ref=f4e19]
        - paragraph [ref=f4e20]: Free to start. No account. No bank link.
    - generic [ref=f4e22]:
      - paragraph [ref=f4e23]: Start with one thing you want to make easier.
      - link "Find your next step" [ref=f4e24]:
        - /url: "#features"
    - region [ref=f4e25]:
      - generic [ref=f4e26]:
        - generic [ref=f4e27]:
          - heading "Your numbers. A clearer next step." [level=2] [ref=f4e28]: Your numbers.A clearer next step.
          - paragraph [ref=f4e29]: Not another account to connect. Practical tools for the money decisions already on your mind.
        - generic [ref=f4e30]:
          - tablist "Money decisions" [ref=f4e31]:
            - tab "Build a goal" [selected] [ref=f4e32] [cursor=pointer]
            - tab "Plan payday" [ref=f4e33] [cursor=pointer]
            - tab "Check a purchase" [ref=f4e34] [cursor=pointer]
            - tab "Explore growth" [ref=f4e35] [cursor=pointer]
            - tab "Learn by doing" [ref=f4e36] [cursor=pointer]
            - tab "Start with allowance" [ref=f4e37] [cursor=pointer]
          - tabpanel "Build a goal" [ref=f4e38]:
            - figure "Actual app screen. Example numbers." [ref=f4e39]:
              - 'img "Goal Builder review for Trip to Japan: target $6,000, $375 a month, an illustrative 5% return assumption." [ref=f4e40]'
            - generic [ref=f4e42]:
              - heading "Make the someday plan a monthly plan." [level=3] [ref=f4e43]
              - paragraph [ref=f4e44]: A trip, a home deposit, a little breathing room. Put a name and a number on it, include what you have already saved, and find a monthly contribution that works for you.
              - paragraph [ref=f4e45]: Leave with a saved goal, a contribution, and an estimated timeline you can revisit.
              - paragraph [ref=f4e46]: You choose the assumptions. Estimated completion is a projection, not a guarantee.
              - status
    - region [ref=f4e47]:
      - generic [ref=f4e48]:
        - generic [ref=f4e49]:
          - heading "Less money jargon. More lightbulb moments." [level=2] [ref=f4e50]: Less money jargon.More lightbulb moments.
          - paragraph [ref=f4e51]: Short visual lessons bring the math and the psychology together. Learn why a habit helps, then try it with your own numbers.
          - link "Learn at your own pace" [ref=f4e52]:
            - /url: "#get"
        - generic [ref=f4e53]:
          - img "A visual lesson in the WealthVision app." [ref=f4e54]
          - img "Home shows the next lesson alongside saved-goal progress." [ref=f4e55]
    - region [ref=f4e56]:
      - generic [ref=f4e57]:
        - generic [ref=f4e58]:
          - heading "Your money. Your device. Full stop." [level=2] [ref=f4e59]: Your money.Your device.Full stop.
          - paragraph [ref=f4e60]: You do not need to hand over your bank login to understand your money. WealthVision keeps the plan on your device.
          - link "Read the privacy promise" [ref=f4e61]:
            - /url: privacy-policy.html
        - generic [ref=f4e62]:
          - generic [ref=f4e63]:
            - term [ref=f4e64]: No account to create.
            - definition [ref=f4e65]: No sign-up, email, or password to start using the app.
          - generic [ref=f4e66]:
            - term [ref=f4e67]: No bank connection.
            - definition [ref=f4e68]: You enter the numbers you choose. We never access or move your money.
          - generic [ref=f4e69]:
            - term [ref=f4e70]: No ads or tracking.
            - definition [ref=f4e71]: No ad networks or analytics watching what you do in the app.
          - generic [ref=f4e72]:
            - term [ref=f4e73]: Planning works offline.
            - definition [ref=f4e74]: Tools and lessons run on device. Store downloads and purchases need a connection.
    - region [ref=f4e75]:
      - generic [ref=f4e76]:
        - generic [ref=f4e77]:
          - heading "Their first money lesson can start with allowance." [level=2] [ref=f4e78]
          - paragraph [ref=f4e79]: Save a little. Spend a little. Talk about the choice. Kid Mode gives families a simple place to make those first decisions together.
          - paragraph [ref=f4e80]: Ages 5–12. One child included free; multiple children with Pro. Local progress, no public profiles, no ads.
          - link "Bring the conversation home" [ref=f4e81]:
            - /url: "#get"
        - figure "Actual app screen. Example allowance." [ref=f4e82]:
          - img "Kid Mode in the app, with an allowance balance and a savings goal." [ref=f4e83]
    - region [ref=f4e85]:
      - generic [ref=f4e86]:
        - generic [ref=f4e87]:
          - heading "A money coach. Not another monthly bill." [level=2] [ref=f4e88]: A money coach.Not another monthly bill.
          - paragraph [ref=f4e89]: Start with useful tools for free. Unlock more planning options with one optional Pro purchase. No subscription, renewal, or trial countdown.
          - link "Compare Free and Pro" [ref=f4e90]:
            - /url: pricing.html
        - generic [ref=f4e91]:
          - generic [ref=f4e92]:
            - term [ref=f4e93]: Free
            - definition [ref=f4e94]: Learn, plan payday, explore growth, and start a goal.
          - generic [ref=f4e95]:
            - term [ref=f4e96]: Pro
            - definition [ref=f4e97]:
              - text: More goals, comparisons, and room for the family.
              - strong [ref=f4e98]: One-time unlock.
    - region [ref=f4e99]:
      - generic [ref=f4e100]:
        - heading "A few things worth knowing." [level=2] [ref=f4e101]: A few thingsworth knowing.
        - generic [ref=f4e102]:
          - group [ref=f4e103]:
            - generic "Does WealthVision connect to my bank?" [ref=f4e104] [cursor=pointer]
          - group [ref=f4e105]:
            - generic "Does it work without internet?" [ref=f4e106] [cursor=pointer]
          - group [ref=f4e107]:
            - generic "Can I start without paying?" [ref=f4e108] [cursor=pointer]
          - group [ref=f4e109]:
            - generic "Are the investment results guaranteed?" [ref=f4e110] [cursor=pointer]
          - group [ref=f4e111]:
            - generic "How do I get Pro?" [ref=f4e112] [cursor=pointer]
    - region [ref=f4e113]:
      - generic [ref=f4e114]:
        - generic [ref=f4e115]:
          - heading "Make your next move a little clearer." [level=2] [ref=f4e116]: Make your next movea little clearer.
          - paragraph [ref=f4e117]: WealthVision for iOS and Android. Start for free.
        - generic [ref=f4e118]:
          - generic [ref=f4e119]:
            - link "Download WealthVision on the App Store" [ref=f4e120]:
              - /url: https://apps.apple.com/app/id6786717388
              - img "Download on the App Store" [ref=f4e121]
            - link "Get WealthVision on Google Play" [ref=f4e122]:
              - /url: https://play.google.com/store/apps/details?id=com.tgdev.wealthvision
              - img "Get it on Google Play" [ref=f4e123]
          - paragraph [ref=f4e124]: No account. No bank link. No subscription.
  - contentinfo [ref=f4e125]:
    - generic [ref=f4e126]:
      - generic [ref=f4e127]:
        - link "WealthVision" [ref=f4e128]:
          - /url: index.html
        - navigation "Footer navigation" [ref=f4e129]:
          - link "Pricing" [ref=f4e130]:
            - /url: pricing.html
          - link "Privacy policy" [ref=f4e131]:
            - /url: privacy-policy.html
          - link "Contact" [ref=f4e132]:
            - /url: mailto:tised.gabilin@gmail.com
      - generic [ref=f4e133]:
        - paragraph [ref=f4e134]: © 2026 WealthVision
        - paragraph [ref=f4e135]: Educational and planning tools, not financial advice. Figures are illustrative. Past performance does not guarantee future results.
```

# Test source

```ts
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
  78  |   await expect(menu).toHaveAttribute('aria-expanded', 'true');
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
> 117 |         await expect(page.locator(url.hash)).toHaveCount(1);
      |                                              ^ Error: expect(locator).toHaveCount(expected) failed
  118 |       }
  119 |     }
  120 |   }
  121 | });
```