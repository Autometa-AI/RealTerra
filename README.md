# RealTerra Global Properties

Marketing site for RealTerra — an analytical brokerage for ultra-high-net-worth
property investors in the UAE.

Next.js 15 (App Router), React 19, plain CSS with design tokens. No CSS framework.

## Running locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm run start
```

## Brand

The site implements `realterra_brand_kit-2.html` (Brand Identity Guidelines v2.0),
which is kept in the repo as the source of truth. The essentials:

### Colour — five surface tokens, two data-only accents

| Token         | Hex       | Role                                             |
| ------------- | --------- | ------------------------------------------------ |
| `--pine`      | `#0F3D33` | Primary brand — wordmark, headers, primary CTAs  |
| `--pine-deep` | `#0A2921` | Dark backgrounds, nav, drawer                    |
| `--ink`       | `#14201C` | Body text on paper — never pure black            |
| `--paper`     | `#FAF9F6` | Primary background — warm off-white              |
| `--paper-alt` | `#F1EFE9` | Card fills, section breaks                       |
| `--steel`     | `#6B7573` | Captions, hairlines, secondary labels            |
| `--signal`    | `#2BA890` | **Data only** — growth / positive delta          |
| `--rust`      | `#B5502E` | **Data only** — caution / negative delta         |

Signal Teal and Rust appear only inside stats, metrics and indicators — never as
decoration and never in the wordmark. Legacy aliases (`--navy`, `--accent`,
`--text-1`…) are mapped onto these tokens in `app/globals.css` so component CSS
reads the semantic name.

### Typography — three faces, three jobs

- **Display** — Newsreader (serif). Headings and the wordmark. Italic on a single
  word, never a full sentence.
- **Body & UI** — Inter. All copy, labels, buttons, navigation.
- **Data** — IBM Plex Mono. Numerals only: prices, percentages, dates, chart values.

The governing rule: **if it's a number, it's mono; if it's a word, it's Inter or
Newsreader.** Numeric classes are wired to `--mono` in one place at the top of
`app/globals.css`.

Fonts are self-hosted through `next/font/google` and exposed as
`--font-serif` / `--font-sans` / `--font-mono` in `app/layout.js`.

### Imagery

Architecture, not lifestyle — facades, skylines, structural detail, off-plan
progress. Every image gets the Pine→Ink duotone plus a diagonal hairline overlay.

The duotone is `grayscale(1) sepia(1) hue-rotate(…)`, not `hue-rotate` alone:
sepia collapses any source photo to a single hue first, so the rotation lands on
pine regardless of the original colours. Rotating hue directly turned blue
facades magenta.

### Logo

Wordmark only — no icon, monogram or symbol. Newsreader, one weight, one colour
at a time. Pine or Ink on light, Paper on dark.

## Layout notes

- **Sticky footer** — `body` is a flex column with `min-height: 100svh`, so the
  footer settles at the bottom of the viewport on short pages instead of floating
  mid-screen.
- **Mobile action dock** — below 900px the nav CTA is unavailable, so a pinned
  bottom bar (`components/Dock.js`) carries the primary action. It appears after
  the hero scrolls past. `--dock-h` reserves space so it never covers content.
- **Mobile navigation** — `components/Nav.js` renders a drawer with scrim, Escape
  handling, scroll lock, and auto-close on route change or breakpoint growth.
- **Responsive CSS lives with its page.** Page stylesheets are imported *after*
  `globals.css`, so a base rule in `home.css` would beat a mobile media query in
  `globals.css` no matter the viewport. Each page's breakpoints are therefore
  defined at the bottom of its own stylesheet.

## Structure

```
app/
  layout.js          fonts, metadata, chrome
  globals.css        tokens, typography, nav, footer, dock, shared components
  page.js            home            + home.css
  about|markets|projects|insights|contact/
                     route           + scoped stylesheet
components/
  Nav.js             desktop nav + mobile drawer
  Footer.js
  Dock.js            sticky mobile action bar
  Effects.js         scroll reveal, parallax, counters, progress bar
```

## Known gaps

- Contact details (`hello@blackridgere.com`, `+971 50 000 0000`) are carried over
  from the previous brand and still need replacing.
- The contact and newsletter forms are presentational — no submit handler or
  backend is wired up.
- Imagery is Unsplash placeholder. Photo IDs have rotated before and returned
  unrelated subjects; art-directed assets should replace them.
