# WealthVision Website

Static landing, pricing, and privacy pages for https://www.wealthvision.space/.
Cloned from Gabilin/WealthVisionPublic beside the WealthVision Flutter repository.

## Design Boundary

Preserve the original dark design, IBM Plex typography, page layouts, and browser
demonstrations. The owner rejected the replacement visual direction on
2026-10-31 and requested updated content and links only.

The public pages now use current Home and Kid Mode app screenshots, active Apple
and Google store links, and current Free/Pro descriptions. Product Hunt, email
collection, pre-launch promotion, and founding-price countdowns were removed.
Browser demos are illustrative examples, not the current production app.

## Preview And Tests

```sh
npm ci
npx playwright install chromium firefox webkit
npm run dev
```

Preview: http://127.0.0.1:4173. The server binds to localhost. Set `PORT` to use
another port. Public deployment remains static; Node is only for local tooling.

```sh
npm test
npm run test:smoke
npm run test:report
```

The suite covers Chromium, Firefox, WebKit, and mobile Safari: download links,
screenshots, four original demo tabs, local resources, anchors, privacy truth,
keyboard FAQs, mobile downloads, and responsive layouts. Accessibility checks
compare against the original checked-in HTML, and attach both original and
current findings; a pass is not a zero-violations claim.

Latest independent verification: [original-style QA](QA/2026-10-31-original-style/README.md),
80 tests passed, zero failed/skipped, and five user journeys passed. Existing
accessibility limitations, physical-device coverage, transactions, and deployment
limits are documented. [Earlier QA](QA/2026-10-31/README.md) is retained evidence
for the rejected design, not the current site's release assessment.

## App Images

```sh
node tools/prepare-assets.mjs
```

Uses the neighboring app's real English iPhone captures from 2026-10-22, resized
to WebP without changing app content. [Provenance](images/provenance.json) records
the sources. The original app icons and social-preview image remain unchanged.

## Store Destinations

- Apple: https://apps.apple.com/app/id6786717388
- Google: https://play.google.com/store/apps/details?id=com.tgdev.wealthvision

Both public listings were verified on 2026-10-31. Local changes are not published
until the repository's deployment process is run by the owner.