# WealthVision — "Longview" Design Schema

The single source of truth for the Prototype2 redesign. Inspired by **TradingView**:
calm, dark, flat, data-first. Every screen must follow this schema. Behaviour never
changes — only presentation.

> Reference build: `DesignExperiments/longview/`. Real-app reference: TradingView mobile
> (Overview, Analysis hub, Symbol search).

---

## 1. Principles

1. **Dark, flat, quiet.** One near-black background, flat surfaces, 1px hairlines. No
   glassmorphism, no glows, no drop shadows on cards.
2. **Numbers are the hero.** Figures are monospaced and **white**. Colour is reserved for
   meaning (green up / red down), never decoration.
3. **One action per screen gets emphasis.** Everything else is quiet (ghost or text).
4. **Selection ≠ action.** A *selected* state is **white fill**. A *primary action* is
   **green fill**. They must never look the same.
5. **Restraint with colour.** Accent hues (violet/amber/blue) only as small icon tints,
   eyebrows, or category badges — never large fills.

---

## 2. Foundations

### Colour tokens (locked)
| Token | Value | Use |
|---|---|---|
| `--app-bg` | `#0c0c0e` | App background (frame). Body behind = `#000`. |
| `--surface` | `#1b1b1f` | Cards, inputs, default surface |
| `--surface-2` | `#16161a` | Recessed surfaces, inset fields |
| `--surface-h` | `#24242a` | Hover / pressed / secondary-elevated |
| `--hairline` | `rgba(255,255,255,0.07)` | Standard 1px border |
| `--hairline-2` | `rgba(255,255,255,0.14)` | Stronger border / hover |
| `--text-hi` | `#ececed` | Primary text **and all numbers** |
| `--text-mid` | `#8e8e95` | Labels, secondary text |
| `--text-lo` | `#5e5e66` | Disclaimers, tertiary |
| `--green` | `#22ab94` | Primary CTA, gains, progress, growth |
| `--red` | `#f7525f` | Losses, goal/target line, destructive |
| `--blue` | `#2962ff` | Contributions/principal, info badges |
| `--amber` | `#f7a600` | Rewards, milestones, warnings |
| `--violet` | `#9c4dff` | Learn, education |

**Selected fill** = `#ececed` (white) with `#0c0c0e` ink.
**CTA ink on green** = `#06120f`.

### Typography
- **UI / labels / headings:** IBM Plex Sans. Weights 400/500/600/700.
- **All figures (money, %, dates, counts):** IBM Plex Mono, weight 600, `tabular-nums`.
- Screen title: 28–30px / 700 / `letter-spacing:-0.025em`.
- Section header: 17–18px / 700.
- Hero figure: 30–34px mono.
- Body: 14–15px. Label/eyebrow: 11–12.5px / 600 / `0.04em` / uppercase / `--text-mid`.

### Spacing & shape
- Scale: 4 / 8 / 12 / 16 / 20 / 24 (`--sp-1..6`). Screen gutter **18px**.
- Vertical rhythm between sections: **16–20px**. Grid gaps: **10–12px**.
- Radii: cards **15–16px**, inputs/segments **10–12px**, chips/pills **999px**,
  small chips/timeframe **7px**, icon tiles **10–12px**.
- Card padding: **14–16px**.

### Motion
- Ease: `cubic-bezier(0.22,1,0.36,1)`. Press: `scale(0.98)` @120ms.
- Sheets slide up @ 280ms. Reveals (chart) @ 240ms. No bouncy/elastic easing.

---

## 3. Components

### Buttons
| Class | Look | When |
|---|---|---|
| `.lv-cta` | **Green** fill, ink `#06120f`, radius 12, 15px/600, full-width | The one primary action (Continue, Start tracking, Create) |
| `.lv-cta-framed` | Gradient **border** (pink→violet→blue) 1.5px, inner `#141418`, white text + icon | Featured/secondary special action (Simulate, Upgrade) |
| `.lv-cta-ghost` | `--surface` fill, 1px `--hairline`, white text | Secondary action (Edit, Learn more) |
| `.lv-cta-text` | Transparent, `--text-mid`, 700 | Tertiary (Skip, See all) |

Disabled = `opacity:.4`, no pointer. Never put two green CTAs on one screen.

### Switchers (selection)
- **Chips / filters** `.lv-pill`: pill, `--surface`+hairline, `--text-mid`. Selected
  `.on` = **white fill `#ececed`**, ink `#0c0c0e`, 600. Horizontal scroll, edge-bleed.
- **Segmented control** `.lv-seg`: track transparent (or `--surface-2`), each `.lv-seg-btn`
  `--text-mid`. Active `.on` = **white fill**, ink `#0c0c0e`, 600. (Use for return buckets,
  frequency, timeframe.)
- **Tab switcher** `.lv-tabs`: text tabs, active = white text + 2px green underline OR
  filled `--surface-h` pill; inactive = `--text-mid`.

### Inputs
- `.lv-input`: `--surface-2` fill, 1px `--hairline`, radius 12, 15px text white,
  placeholder `--text-lo`. Focus = border `--hairline-2`. Prefix (`$`) in `--text-mid` mono.
- Sliders: track `rgba(255,255,255,0.07)`, filled portion green, thumb green w/ `--app-bg`
  ring. Value readout mono white.

### Cards & rows
- **Card**: `--surface`, 1px `--hairline`, radius 15–16, padding 14–16. No shadow/blur.
- **Metric card** `.lv-mcard`: badge (mono, category colour) + change `.up/.dn` (green/red)
  top row; name (600); **mono white value**; sub `--text-mid`; optional baseline sparkline.
- **Data row** `.lv-data`: `label` (`--text-mid`) left … `value` (**mono white**) +
  optional `unit` (`--text-mid`, smaller) right. Divider = 1px hairline.
- **List row** `.lv-story`: round icon tint + meta (`--text-mid`, `<b>` green) + headline.

### Notices / promos
- **Notice** `.lv-notice`: tinted bg `rgba(accent,0.10)`, 1px `rgba(accent,0.22)`, radius 14,
  small icon + text + chevron `›`. Accent by topic (violet=news/learn, amber=milestone,
  green=on-track).
- **Framed promo** `.lv-promo`: gradient-border card (pink→violet→blue) with `#141418`
  inner; icon tile + title + desc + (chevron | toggle). For featured/celebration moments.

### Charts (use sparingly)
- Only when a **trend or comparison** is the point. Otherwise show numbers.
- Growth/value line = **green**; contributions/principal = **blue**; goal/target line =
  **red dashed** with label. Area = matching colour fade to 0.
- Gridlines `rgba(255,255,255,0.05)`. Axis labels mono `--text-mid`.
- **Collapsible**: heavy/secondary charts are **hidden by default** behind a "Show chart"
  toggle (e.g. Simulator). When shown, include a 1-line legend explaining each series.

### Bottom tab bar `.wv-tabbar`
- Flat, `rgba(12,12,14,0.86)` + blur, 1px top hairline. Active tab = white icon+label
  (`stroke-width 2.1`), inactive = `--text-lo`. **Hidden inside modal sheets.**

### Modal sheet (create / add / full-screen tasks)
- Pattern `.lv-sheet`: full-frame overlay that **slides up from the bottom** on open.
- Top: 36px **drag handle** centred, **× close** (left or right), optional step/`SETUP`
  label. **No bottom tab bar.**
- Body scrolls; primary `.lv-cta` pinned in a `.lv-foot` with a fade-to-bg gradient.
- Use for: goal creation (screen7), add funds, pickers, any "+ / create" entry.

---

## 4. Patterns & rules

- **Money/percent/date/count → always mono + white.** Deltas get green/red, the value stays
  white (e.g. value `$9,418` white, change `+0.58%` green).
- **Eyebrows** label every hero/section (uppercase, `--text-mid`).
- **Category colour** lives in the badge/icon only, not the card fill.
- **+ Add / Create** opens a **modal sheet**, never a full page push with a tab bar.
- **Progress** tracks are `rgba(255,255,255,0.07)`; fills are solid green (red if behind).
- **One emphasis per screen.** If a screen has a green CTA, switchers use white, not green.

### Do / Don't
- ✅ White numbers, green only for meaning. ❌ Coloured figures for decoration.
- ✅ Flat surfaces + hairlines. ❌ Gradients, blur, glow, card shadows.
- ✅ White = selected, green = action. ❌ Green pills/segments for selection.
- ✅ Charts collapsible & legended. ❌ Always-on charts that don't add insight.
- ✅ Create = bottom sheet + close, no menu. ❌ Create as a tabbed full page.
