# Independent Public Website QA

Requested explicitly by Oleksii. Tested on 31 October 2026 against the already-running http://127.0.0.1:4173 preview. Scope: [homepage](../../index.html), [pricing](../../pricing.html), and [privacy policy](../../privacy-policy.html). Website implementation and existing tests were not edited. No installs, transactions, email sends, credentials, commits, pushes, external writes, or subagents were used.

## Outcome

**Not clear for release:** one P1 readability defect and two P2 behavior/content defects. The existing suite also needs repairs: its 11 failures are test defects, not 11 product defects. None of those failures has been relabeled as a pass.

The implementation is product-specific: the seven screenshots exactly match conversions of real Flutter captures, both public store pages resolve to WealthVision, and Free/Pro boundaries align with the app reference. This is a technical QA report, not a duplicate design-polish review.

| Run | Passed | Failed | Classification |
| --- | ---: | ---: | --- |
| Required `npm --prefix /Users/oleksii/Code/WealthVisionPublic test` | 61 | 11 | Test defects; 72 tests, 49.0 seconds, no retries |
| Independent browser journeys, all four projects | 32 | 4 | Four reproductions of mobile-menu forward-focus defect |
| Viewport/resilience/assets/source/store matrix | 131 | 4 | Four file-URL harness failures: navigation clicked while closed |
| First file-URL follow-up | 0 | 4 | Routes succeeded; harness then scrolled hidden decorative icons |
| Final visible-image file-URL follow-up | 4 | 0 | Navigation, screenshot switching, and images pass; font limitations separate |
| **Counted independent probes** | **167** | **12** | **179 probes: four product-behavior failures, eight harness failures** |

Three additional local-asset inventories passed: 17 homepage URLs, 12 pricing URLs, and 9 privacy URLs. These are not added to the 179-probe total. The P1 visual defect and P2 privacy mismatch were established by screenshot/pixel evidence and source comparison, respectively, not by changing the meaning of a passing overflow check.

## Material Product Findings

### P1: Screenshot panorama obscures hero text at compact widths

- **Location:** [site.css, line 39](../../site.css#L39), [line 41](../../site.css#L41), and [line 52](../../site.css#L52); [homepage hero, line 38](../../index.html#L38).
- **Steps:** Open the homepage at 1024 x 900. Read the complete WealthVision heading and the sentence below the store badges. Repeat at 768 x 900 and 844 x 390 landscape.
- **Expected:** The brand, privacy/free-start copy, and screenshot proof remain independently readable at every supported width.
- **Actual:** The final heading letters cross the dark Home screenshot. "Free to start. No account. No bank link." crosses the dark Goal screenshot. At 768px, "All on your device." also crosses it. In landscape, several descriptive lines cross screenshot content. This is contrast/occlusion, not horizontal overflow.
- **Evidence:** [1024px confirmation](evidence/compact-hero-1024-confirmation.png), [768px capture](evidence/home-768x900.png), [landscape capture](evidence/home-844x390.png). At 1024px the fine-print text bounds are x=32..265.8, y=474.9..490.9. A nearby background pixel is RGB 10/10/12; CSS text is RGB 18/60/53. Contrast against the screenshot's approximately RGB 11/11/11 field is about **1.62:1**, below WCAG 1.4.3's 4.5:1 requirement for this text.
- **Recommendation:** Reserve a screenshot-free area behind hero copy at compact/landscape breakpoints, or reposition the panorama so no dark screen sits beneath text. Keep the real assets and do not rely on an overflow assertion to validate readability.
- **Retest:** Compare these three captures after the fix; ensure all hero lines remain legible and both badge targets still work. The existing responsive checks currently pass despite this defect.

### P2: Forward Tab bypasses the opened mobile navigation

- **Location:** [menu handler, line 13](../../site.js#L13); [homepage navigation, line 30](../../index.html#L30). The same shared script and ordering apply to pricing and privacy.
- **Steps:** At 390 x 844 in Chromium, focus the menu button, press Enter, then Tab.
- **Expected:** A forward keyboard path enters the newly opened navigation so the visitor can choose The app, For families, Pricing, or Privacy.
- **Actual:** Menu remains expanded, but focus jumps to "Download WealthVision on the App Store" in the hero. The navigation occurs before the trigger in DOM order and opening it does not move focus. Shift+Tab from the trigger reaches Privacy, providing a non-obvious workaround. The analogous forward-path assertion fails in all four projects; desktop WebKit's link-tab preferences change the exact skipped-to element.
- **Evidence:** [Chromium forward-Tab capture](evidence/chromium-menu-forward-tab.png), [Firefox](evidence/firefox-menu-forward-tab.png), [WebKit](evidence/webkit-menu-forward-tab.png), [mobile Safari](evidence/mobile-safari-menu-forward-tab.png). Chromium focused href is `https://apps.apple.com/app/id6786717388`, `inNavigation=false`, `aria-expanded=true`.
- **Recommendation:** Align DOM/focus ordering with the disclosure interaction, or move focus to the first navigation link when opened. Preserve the working Escape close-and-restore behavior. This is a verified keyboard usability defect; axe's zero violations are not proof of a correct disclosure workflow.
- **Retest:** Enter/Space opens; forward Tab reaches navigation; links follow; Escape closes and restores focus; forward navigation remains possible without trapping focus.

### P2: Privacy policy promises persistence for transient simulation inputs

- **Location:** [privacy policy, line 30](../../privacy-policy.html#L30).
- **Steps:** Open Privacy, choose Local storage, and read "Goals, contributions, payday splits, simulation inputs ... are kept in local device storage so the app can remember your plans."
- **Expected:** Persistent plans and transient calculations are distinguished accurately.
- **Actual:** The website groups simulation inputs with remembered plans. The [app Tools overview](../../../WealthVision/Requirements/ToolsOverview/README.md) explicitly says Growth Simulator inputs/projections are ephemeral, reopening starts from defaults or an explicit prefill, and Scenario Compare inputs/results are transient.
- **Recommendation:** Remove "simulation inputs" from the remembered-data list, or explicitly say simulations run locally but are not saved. This is a factual app-behavior mismatch, not a translation issue or evidence of data collection.
- **Retest:** Compare the revised policy with the Growth Simulator and Scenario Compare persistence sections. No native installation or app-state mutation was performed during this website audit.

## Existing Suite Failures: Test Defects

| Failure | Projects | Why it fails | Actionable repair |
| --- | --- | --- | --- |
| Mobile navigation, [test line 76](../../tests/site.spec.mjs#L76) | Chromium, Firefox, WebKit, mobile Safari | Locator is bound to accessible name "Open navigation". The click legitimately changes that name to "Close navigation", so the subsequent locator lookup finds nothing. | Use the stable `.menu-toggle` element or `aria-controls` selector and separately assert the changing name/state. Actual toggle-close, Escape/focus restore, family-link following, and Pricing navigation all pass independent probes. |
| Local anchors, [test line 114](../../tests/site.spec.mjs#L114) | All four | `new URL(href, page.url())` uses a mutable base. On the privacy iteration, an earlier Home link navigates to the homepage; later `#collection` is therefore tested on the wrong document. | Capture the source page URL before iterating its links. Independently resolving all 28 distinct source-page/link pairs with a fixed base passes in every project. `#collection` really exists. |
| Homepage local assets, [test line 24](../../tests/site.spec.mjs#L24) | Firefox, WebKit, mobile Safari | Decode is requested for offscreen lazy images without first triggering their loads; errors are swallowed. Firefox reaches the natural-width assertion with unloaded images, while WebKit projects hang awaiting decode. | Activate visible lazy images by scrolling, then await loaded dimensions. Keep resource-status and page-error assertions. All 29 homepage image elements load after scrolling in all four projects, with zero local HTTP failures or page errors. |

The original 61 passing and 11 failing test outcomes remain unchanged. Baseline screenshots, error contexts, and traces are retained in [suite-test-results](evidence/suite-test-results/); the copied [HTML report](evidence/suite-playwright-report/index.html) and [raw suite output](evidence/suite-output.txt) preserve the run. Serve the HTML report through the existing HTTP preview if its browser does not support direct file opening.

## Verified Coverage

- Chromium, Firefox, WebKit, and Playwright iPhone 13/mobile Safari. Browser emulation, not a physical-device certification.
- All three pages at 320, 390, 768, 1024, 1440, and 1920px, plus 900 x 600 compact desktop, 1024 x 400, and 844 x 390 landscape: **108 viewport/page/project checks passed for overflow and control bounds**. Readability remains subject to P1 above.
- Adult goal/payday/growth journeys: choose The app, select the relevant proof, confirm image/copy pairing, reach `#get`, and inspect both download targets. Purchase, lesson, and allowance tabs also switch successfully in every project. Screenshots: [goal](evidence/decision-goal.png), [payday](evidence/decision-payday.png), [growth](evidence/decision-growth.png), [purchase](evidence/decision-buy.png), [lesson](evidence/decision-lesson.png), [Kid Mode](evidence/decision-kids.png).
- Parent journey: family anchor, real allowance screenshot, one-child Free/multiple-child Pro statement, comparison page, keyboard-opened restore FAQ. [Family evidence](evidence/mobile-family.png).
- Every homepage/pricing FAQ opens and closes with Enter in each project. Skip link and screenshot arrow keys, wrapping, Home, and End work. Mobile menu click open/close, Escape, same-page links, and cross-page Pricing navigation work.
- Existing axe WCAG A/AA checks pass on all three routes in all four projects; additional open-mobile-menu axe checks also pass. They did not detect the rendered-image contrast or forward-focus defects above.
- JS-enabled reduced-motion checks pass in all projects: auto scroll, zero active screenshot animations, and zero badge transition duration. All 12 no-JS page/project probes retain visible navigation, store links, and native FAQs. No-JS shows the default goal proof plus fallback text, not functioning screenshot tabs. [No-JS capture](evidence/no-JS-mobile.png).
- Privacy's seven contents links resolve; contact is `mailto:tised.gabilin@gmail.com`. No email was sent.
- No Product Hunt, waitlist, founding-price, remote form, or historical-demo entry appears in the tested public navigation. The retained `demo/` directory is historical and outside public navigation; it was not audited.
- Public-site requests stay on the local origin before following store links; fonts/images/scripts are self-hosted. All enumerated local assets, links, and anchors resolve. This does not certify a production hosting configuration.

## Store And App Truth

| Store | Actual read-only result | Evidence |
| --- | --- | --- |
| App Store | HTTP 200; ID 6786717388; canonical US page title identifies WealthVision and its money-coach/goal-planner app; developer Oleksii Vashchenko | [Store capture](evidence/live-apple-store.png) |
| Google Play | HTTP 200; package `com.tgdev.wealthvision`; title "WealthVision: Money Coach - Apps on Google Play"; T&G Studio | [Store capture](evidence/live-google-store.png) |

The homepage/pricing/privacy badges use those same destinations. The live store pages were opened for identity checks only; Install/Get/purchase controls were not activated.

Against the nearby [Tools overview](../../../WealthVision/Requirements/ToolsOverview/README.md), pricing correctly lists Free Growth Simulator, Payday Routine, Can I Buy It?, one active goal, and one child; Pro additional goals, Scenario Compare, Peer Comparison, and multiple children. Free/basic versus Pro/advanced accelerator wording aligns with the store-facing feature descriptions read. The [actual purchase service](../../../WealthVision/lib/services/purchase_service.dart#L111) calls `buyNonConsumable`; its restore flow delegates to the store. No hardcoded Pro price, subscription, guaranteed return, automatic money movement, or cross-store transfer is promised by the website. Successful payment, restore, refund, and current regional price remain untested.

[Asset preparation](../../tools/prepare-assets.mjs) maps each of seven WebPs to a real English Flutter capture dated 22 October 2026. Re-running the declared in-memory `sharp` resize/quality conversion produced byte-identical buffers for **all seven** assets. No source assets were regenerated or written. This proves source authenticity, not that a new native build was captured on the audit date.

## File-URL Evidence And Failed Attempts

1. Initial attempt, all four projects: screenshot selection succeeded, but the probe clicked a hidden Pricing link at a mobile width without opening the menu. `locator.click: Timeout 7000ms exceeded`, "element is not visible". These four failures remain in [matrix output](evidence/browser-run-2-output.txt).
2. Follow-up, all four projects: opening the menu fixed navigation and both page transitions succeeded. The image loop then attempted to scroll a hidden decorative header icon. `locator.scrollIntoViewIfNeeded: Timeout ... exceeded`, "element is not visible". Four additional harness failures are retained here; they were not reclassified as passes.
3. Final attempt: scroll only visible images and await image dimensions. Four navigation/screenshot/image probes pass. [Chromium](evidence/file-URL-chromium-privacy.png), [Firefox](evidence/file-URL-firefox-privacy.png), [WebKit](evidence/file-URL-webkit-privacy.png), [mobile Safari](evidence/file-URL-mobile-safari-privacy.png).

**Separate file-URL limitation:** Chromium logs font-preload CORS warnings but the custom font still loads. Firefox has no console errors and loads the font. Both WebKit projects log origin-null font CORS errors and report the custom font unloaded. Navigation, screenshots, and reading still work, but file-URL rendering is not fully equivalent to HTTP. Use the existing HTTP preview for branded visual verification; this is not evidence of a hosted-site font failure.

Ancillary command/tool failures were not hidden: `rg` was unavailable; fallback `find` found no site-local instruction files. Two guessed store-metadata TXT paths were absent, so the nearby actual purchase service and live store pages supplied the relevant evidence. Two log-summary parsing attempts failed on terminal-wrapped output (`SyntaxError`, then delimiter-not-found); original totals were read directly instead. No tests or site code were changed to make any check pass.

## Bounded Technical Assessment

| Dimension | Score / 4 | Basis |
| --- | ---: | --- |
| Accessibility | 2 | Axe passes, but actual hero contrast fails and menu forward focus bypasses navigation |
| Performance | 3 | Local WebP screenshots, lazy loading, self-hosted font; no field/CWV or real mobile-network measurement |
| Theming | 3 | Shared tokens and deliberate light theme; no dark-theme contract assumed |
| Responsive | 2 | Required widths fit, but compact hero readability fails |
| Implementation integrity | 3 | Real screenshots and correct destinations; isolated privacy persistence mismatch |
| **Total** | **13 / 20** | **Acceptable technical foundation; verified release issues remain** |

Bundled design context/detector execution was omitted under the audit's write restrictions. Existing product context, Playwright, axe, source comparisons, and pixel evidence were used instead. No style-only or translation/localization findings were added.

## Reproducibility And Limits

[Run-one raw output](evidence/browser-run-1-output.txt) preserves 36 grouped journey outcomes, including four focus failures. [Run-two raw output](evidence/browser-run-2-output.txt) preserves 135 matrix outcomes, including four initial file-URL failures and the live store/source-image results. Screenshots and the copied suite traces are under [evidence](evidence/). The tests have no configured retry, and the original failures were not overwritten by rerunning the suite.

Source hashes below matched before and after testing; the pre-existing dirty redesign worktree was preserved. Revalidate after the main agent's fixes rather than treating this snapshot as verification of later edits.

| File | SHA-256 |
| --- | --- |
| [Homepage](../../index.html) | 60311ed7a686385bde193153158295fd4e6c531cacc2d16b10c43fee6e372208 |
| [Pricing](../../pricing.html) | 0b802bb78f1a0df8a41a4fe1052b8e8ae8d7cc45e9fe9ce3a307903bbb419763 |
| [Privacy](../../privacy-policy.html) | b46ecb1584a387b000a6b35e738e63c84feecd48a81b7a3dcf9832265ec0eea8 |
| [JavaScript](../../site.js) | 108257eae4b811365576398fdd110e418813c902ff158ea54d0290c7771bd993 |
| [Styles](../../site.css) | 8309826bd1a5d9e70cb61b96ef16ae5446dd5d5537c0d87377bf72df4abe31bf |
| [Existing tests](../../tests/site.spec.mjs) | a45ee075a92ac35f580961f0d1153863198bef0ca2caf74e8a03119d8799959a |

Not verified: real installs/payments/restores/refunds, inbox delivery, physical devices or assistive-technology operation, Android-native behavior, production domain deployment/cache/CSP/SEO-crawler behavior, real mobile-network performance, or a new native screenshot capture dated today. External store availability was checked from this environment, not every country. No translation/localization issues were tested or reported.