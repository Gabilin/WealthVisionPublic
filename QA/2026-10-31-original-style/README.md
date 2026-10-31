# Independent QA: Restored Original Website

Tested 31 October 2026 at http://127.0.0.1:4173 for Oleksii's explicit request: "get back to previous version, update content and links". Scope: the restored [homepage](../../index.html), [pricing](../../pricing.html), and [privacy policy](../../privacy-policy.html). This is independent testing, not a redesign or polish review.

**Historical evidence:** [QA/2026-10-31](../2026-10-31/README.md) describes the rejected bright redesign. Its findings, screenshots, and test totals are historical rejected-version evidence, not findings about this restored site. That directory was not edited; all 119 historical evidence files retain their original hashes.

## Outcome

**Pass within the requested scope. No new material product defects found.** The required suite passes all 80 tests and all five real journeys succeed. Original accessibility limitations remain; this is not a zero-violations or full-WCAG-compliance claim. Two failed independent probes remain recorded as failures, separate from product findings.

| Required suite project | Passed | Failed | Skipped |
| --- | ---: | ---: | ---: |
| Chromium | 20 | 0 | 0 |
| Firefox | 20 | 0 | 0 |
| WebKit | 20 | 0 | 0 |
| Mobile Safari / iPhone 13 emulation | 20 | 0 | 0 |
| **Total** | **80** | **0** | **0** |

Executed once: `npm --prefix /Users/oleksii/Code/WealthVisionPublic test`. Duration: **35.0 seconds**; zero retries, zero flaky results. [Raw output](suite-output.txt), [copied HTML report](suite-playwright-report/index.html), and [unpacked original result metadata](suite-unpacked/report.json) preserve the run.

The independent grouped run is **19 attempts: 17 passed, 2 failed**. Its passing subset comprises five journeys and twelve page/engine/viewport checks. [Original independent results](independent-run.json) retain all steps, failed assertions, and errors. Subsequent diagnostic observations are not added to the pass count and do not relabel either failure.

## Five Real Journeys

| Journey | Observed result | Evidence |
| --- | --- | --- |
| Desktop app discovery -> store | Read app heading/current Home capture; follow Features; click App Store; reach the live WealthVision listing | [Discovery](journey-1-app-discovery.png), [App Store](live-apple-store.png) |
| Mobile Get the app -> store | Tap sticky Get the app at 390 x 844; reach visible badges at `#get`; click Google Play; reach the live listing | [Downloads](journey-2-mobile-downloads.png), [Google Play](live-google-store.png) |
| Parent family -> pricing | Follow footer Kid Mode; inspect actual allowance capture and one-child Free statement; follow See full pricing; distinguish multi-child Pro | [Family](journey-3-family.png), [Family pricing](journey-3-family-pricing.png) |
| Pricing Free/Pro + restore FAQ | Compare first saved goal/one-child Free against advanced Pro; keyboard-open/close Free and Restore FAQs; read same-store account, connection, and no cross-store transfer limits; both plan CTAs reach `#get` | [Restore FAQ](journey-4-restore-faq.png), [steps](independent-run.json) |
| Privacy purchase links/contact | Follow Privacy Policy; inspect both purchase links, transient-simulation statement, website-provider disclosure, and visible contact mailto | [Privacy/contact](journey-5-privacy-contact.png), [steps](independent-run.json) |

Actual read-only store navigation returned HTTP 200 and product-identifying titles:

- Apple: `https://apps.apple.com/us/app/wealthvision/id6786717388`, title "WealthVision App - App Store". The clicked source URL was `https://apps.apple.com/app/id6786717388`.
- Google: `https://play.google.com/store/apps/details?id=com.tgdev.wealthvision`, title "WealthVision: Money Coach - Apps on Google Play".

No Install/Get control on a store, transaction, restore operation, or email send was activated. Privacy links use the same two verified store IDs. Store response chains and clicked URLs are in [independent results](independent-run.json).

## Original Identity And Content

[Parsed CSS/structure evidence](diagnostic-evidence.json) confirms identical original structural classes for navigation, main sections, and pricing/privacy containers. Pricing and privacy have no added or removed CSS rules. Homepage has **zero added rules and nine removed rules**, all belonging to retired Product Hunt/waitlist styling. All three pages retain `rgb(12, 12, 14)` backgrounds and loaded IBM Plex Sans; no replacement visual world was introduced.

Compare the [HEAD original desktop capture](head-original-style-desktop-1440.png) with the [restored current desktop capture](current-original-style-desktop-1440.png). Updated store badges, current app images, factual copy, and removed promotions explain the visible differences. Existing dark styling/layout is not classified as a defect.

- Product Hunt links, waitlist/forms, founding-price copy, and retired launch language are absent from the tested public surfaces.
- Pro uses honest one-time/local-store-price copy, without a hardcoded Pro price or cross-store entitlement promise. Free/Pro plan actions lead to downloads, not a website checkout.
- Privacy distinguishes saved plans from transient Growth Simulator/Scenario Compare calculations, consistent with the [app Tools overview](../../../WealthVision/Requirements/ToolsOverview/README.md#L137). It also discloses store connectivity, operating-system backups, local child details, and Google Fonts/CDN website requests.
- The original [og-cover](../../images/og-cover.png) is byte-identical to HEAD: SHA-256 `234e61babbff57694718dba0c032bd66f6b143c3f94c2b3a93c8a03c21ddc096`.

## Screenshot Provenance

Both public screenshots match an in-memory `sharp` conversion of the actual neighboring app captures, using the checked-in [asset preparation](../../tools/prepare-assets.mjs) resize/quality settings. **2/2 byte-identical conversions**, each 660 x 1434. No app capture or website image was rewritten.

| Public screenshot | Actual source capture | Capture date in provenance |
| --- | --- | --- |
| [Home](../../images/screens/home.webp) | [home2.png](../../../WealthVision/Requirements/store_screenshots/appstore/raw/iphone/home2.png) | 2026-10-22 |
| [Kid Mode](../../images/screens/kids.webp) | [kid-main.png](../../../WealthVision/Requirements/store_screenshots/appstore/raw/iphone/kid-main.png) | 2026-10-22 |

[Declared provenance](../../images/provenance.json) and [source/conversion hashes](diagnostic-evidence.json) are retained. Exact conversion establishes source authenticity; the capture date comes from supplied provenance, not a new native capture or independently certified timestamp.

## Four Original Browser Demos

All four tab `src`/selection/caption checks pass in each suite project. The original local files remain exposed and the section explicitly calls them interactive examples, not the current production app.

Actual iframe document loading was additionally observed for [Growth Simulator](demo-1.png), [Path to Goal](demo-2.png), [Can I Buy It?](remaining-iframe-buy-observed.png), and [Kid Mode](remaining-iframe-kid-observed.png). Files are respectively [screen5](../../demo/screen5.html), [accelerate](../../demo/accelerate.html), [screen10a](../../demo/screen10a.html), and [kidmode](../../demo/kidmode.html). The first two have document URL/title/body/HTTP evidence in the independent results; the remaining two were observed after matching `framenavigated` and `load` events. This is document-load verification, not a fresh audit of the historical demos' financial engines or every control.

## Responsive And Readability

The suite checks all three pages at **320, 390, 768, 1024, 1440, and 1920 CSS pixels** in all four projects: **72 width/page/project iterations**, with no horizontal overflow. Suite asset, local-link/anchor, keyboard FAQ, mobile download, no-JavaScript hero, and runtime-error checks also pass.

Additional Chromium and WebKit/iPhone-emulation checks at **320 x 900** and **844 x 390** cover all three pages: **12 passed**, including visible-text bounds. Captures cover navigation, hero, demos, family, pricing/download copy, pricing cards/expanded FAQs, and privacy. Visual inspection found no new content collision or screenshot occlusion. Content naturally continues below the viewport; that is not overlap.

Selected evidence: [320px text/FAQ contact sheet](320-review-contact-sheet.png), [settled 320px download copy](settled-320-home-get.png), [settled 320px Pro copy](settled-320-home-pricing.png), [844 x 390 Home](settled-844x390-home-hero.png), [landscape Pricing](webkit-844x390-pricing-hero.png), and [landscape Privacy](webkit-844x390-privacy-policy-wrap.png). WebKit screenshots use the emulated device's 3x pixel scale; dimensions in this section are CSS pixels. Early reveal-animation captures were preserved, not mistaken for permanently missing content.

## Accessibility Baseline

The unchanged suite compares each current violation rule's node count against HEAD's original HTML on the same origin/browser, with the same assets and axe tags (`wcag2a`, `wcag2aa`, `wcag21aa`). All twelve comparisons pass. Target inspection also found the same existing affected elements, rather than a new content issue hidden by equal totals.

| Project | Home original/current nodes | Pricing original/current nodes | Privacy original/current nodes |
| --- | --- | --- | --- |
| Chromium | 7 / 7 | 2 / 2 | 2 / 2 |
| Firefox | 3 / 3 | 2 / 2 | 2 / 2 |
| WebKit | 3 / 3 | 2 / 2 | 2 / 2 |
| Mobile Safari | 3 / 2 | 2 / 2 | 2 / 2 |

Residual baseline limitations: low-contrast existing fine print/footer text; four unlabeled default simulator iframe sliders detected by Chromium; and the existing privacy contact link's in-paragraph distinction. These are not new restoration/content defects. The lower mobile count is an observed count, not a claim that existing contrast was fixed. This gate does not establish complete assistive-technology, keyboard, or WCAG compliance.

Full original/current violations, including targets and failure summaries, are attached unchanged: Chromium [Home](accessibility-1.json), [Pricing](accessibility-2.json), [Privacy](accessibility-3.json); Firefox [Home](accessibility-4.json), [Pricing](accessibility-5.json), [Privacy](accessibility-6.json); WebKit [Home](accessibility-7.json), [Pricing](accessibility-8.json), [Privacy](accessibility-9.json); Mobile Safari [Home](accessibility-10.json), [Pricing](accessibility-11.json), [Privacy](accessibility-12.json). [Exact rule/node matrix](accessibility-matrix.json).

## Retained Failures And Caveats

1. **Failed `four-iframe-files-load` probe:** after clicking the third tab, the immediate document read returned the previous `accelerate.html`, even though the `src` changed. Waiting only for `readyState=complete` can sample the previous complete document during navigation. The original assertion and [failure screenshot](four-iframe-files-load-failure.png) remain. Later event-based observations cover the two otherwise-unverified documents; the failed grouped probe remains failed.
2. **Failed `original-style-and-provenance` probe:** strict byte equality of the entire homepage style block returned false because obsolete Product Hunt/waitlist rules were removed as requested. That assertion and [failure screenshot](original-style-and-provenance-failure.png) remain. A parsed-rule/source-image diagnostic supplies the missing scoped evidence without changing the failed result.

Ancillary command failures are disclosed separately and are not product or suite test outcomes: unavailable `rg`; an absent guessed HTML-report `data/` directory; a zip decoder initially reading a template's empty `textContent`; a capture helper assuming Pricing has a `main`; and a contact-sheet compositor assuming WebKit screenshots were 1x instead of 3x. No source/tests were edited, no test retries were configured, and the two independent failures were not relabeled.

Not verified: production deployment/cache/CSP, every store region or current regional Pro price, real installs/purchases/restores/refunds, inbox delivery, physical devices/assistive technology, native app behavior, real mobile-network performance, offline website rendering or CDN failure behavior. The original site still depends on external fonts/CDN styling; the app's offline promise is distinct and the privacy policy now explains this. No translation/localization issues were reported. No secrets, real transactions, delegation, commits, or pushes were used.

## Source Integrity

[Before hashes](source-hashes-before.json) and [after hashes](source-hashes-after.json) match for **320 files: 59 website source/assets/config/test files, 142 app source/assets/test/config files, and 119 historical rejected-version QA files**. No added, removed, or changed file in that inventory; website HEAD remains `0dae4f4cf89beb84dce7736c1cacf1e1eed61e7a`. Native/platform/credential files outside this inventory were not accessed for mutation; the inventory is not a whole-disk attestation.

Only generated test reports/evidence and this new README were written. The pre-existing dirty worktree and already-running preview server were left intact. No app or website implementation/test edits were made.