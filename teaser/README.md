# WealthVision — web teaser

A static marketing page that lets people **play with the real app in their browser** (embedded via
iframes), then converts them to a download or the founding-price waitlist. It reuses the actual
`Prototype-Prod-Ready` screens — no duplicated logic.

## Deploy to Vercel

1. In Vercel, **New Project → import this repo**.
2. Set **Root Directory** to `Prototype-Prod-Ready`.
3. Framework preset: **Other** (it's a static site — no build step).
4. Deploy.

The included `../vercel.json` redirects `/` → `/teaser/`, so your marketing page is the front door
while the full app stays reachable (e.g. `/dashboard.html`, `/screen5.html`). The teaser embeds those
screens with `../screen5.html`-style paths, which is why the whole folder is deployed together.

> Prefer a dedicated repo? Copy `Prototype-Prod-Ready/` as-is (teaser + all screens + `proto-shell.*`)
> and deploy that. If you ever deploy the `teaser/` folder **alone**, host the app screens elsewhere
> and set `CONFIG.APP_BASE` (below) to their URL.

## Edit everything in one place: `teaser.js` → `CONFIG`

| Key | What it does |
|---|---|
| `LAUNCH_STATE` | `"prelaunch"` shows the founding-price **waitlist form**; `"live"` shows **store buttons**. |
| `PRICE_FOUNDING` / `PRICE_REG` | The one-time prices shown everywhere (default `$9.99` / `$19.99`). |
| `APP_STORE_URL` / `PLAY_URL` | Store links (used when `LAUNCH_STATE = "live"`). |
| `TESTFLIGHT_URL` | If set during pre-launch, shows a "Try the iOS beta" button. |
| `WAITLIST_ENDPOINT` | Your email form POST URL. Empty = demo mode (no real submit). |
| `APP_BASE` | Where the app screens live relative to the teaser. Leave as `".."`. |
| `CTA_TEXT` | Primary button label. |

## Collect real emails

Set `CONFIG.WAITLIST_ENDPOINT` to a form endpoint that accepts a POST with an `email` field. Any of
these work with zero backend and are privacy-friendly:

- **Formspree** (`https://formspree.io/f/XXXX`)
- **Formspark**, **Basin**, or **Buttondown**'s embed endpoint

The form already sends the `email` field and handles success/errors. To stay on-brand, pick a
provider that doesn't set tracking cookies.

## Before you go live — checklist

- [ ] Set `LAUNCH_STATE`, prices, and (when live) store links in `CONFIG`.
- [x] `WAITLIST_ENDPOINT` wired to Formspree (`/f/mgogvond`) and tested (returns `ok:true`). Click the
      one-time activation email Formspree sent you so submissions start landing in your inbox.
- [x] `teaser/og-cover.png` (1200×630, 1.91:1) is generated for link previews. To re-generate,
      edit `og-cover.html` and re-screenshot it at a 1200×630 clip. The `<meta og:image>` tags point at it.
- [ ] After deploy, set `<meta og:image>` to the **absolute** URL (`https://your-domain/teaser/og-cover.png`)
      — Facebook's scraper is happiest with an absolute URL. Then validate with the Facebook Sharing
      Debugger and X Card Validator.
- [ ] (Optional) Enable cookieless analytics: uncomment the Plausible/Umami snippet in `index.html`
      and set your domain. Practising the "no tracking" promise on the landing page itself is a
      talking point — keep it cookieless.
- [ ] Open the deployed URL on a phone and confirm the embedded tools scroll and respond.

## Compliance note

Any visible projection keeps the "illustrative / historical average / not a guarantee" framing (the
Growth Simulator caption and the footer already do). Don't add return figures without it — the
screenshots travel without the caption.

## How it works (for future edits)

- `index.html` — all copy + structure. Sections: hero, **Try it live** (tabbed iframes), three
  wedges, privacy proof, pricing, get/waitlist, FAQ, footer.
- `styles.css` — the "Longview" dark design tokens (matches the app).
- `teaser.js` — `CONFIG`, the `TOOLS` tab map (which screen each tab embeds), lazy-loading, phone
  scaling, launch-state toggle, and the waitlist form.
