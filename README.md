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

Content is served from Supabase. With no `SUPABASE_URL` set, `npm run dev` falls
back to the `content/*.json` snapshot in the repo so the site runs on a fresh
clone; `npm run build` does not — in production a missing credential is a
misconfiguration, not something to paper over. Refresh the snapshot from the
live database with `node --env-file=.env.local scripts/pull-content.js`.

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
progress. Photographs run untreated: an earlier Pine→Ink duotone flattened the
one thing a property buyer is actually looking at. Contrast against the pine
comes from the layout and from scrims over text, not from filtering the image.

### Logo

Wordmark only — no icon, monogram or symbol. Newsreader, one weight, one colour
at a time. Pine or Ink on light, Paper on dark.

The one exception is the favicon, which cannot show a wordmark at 16px:
`app/icon.svg` crops the lockup to an italic serif R on pine, rasterised to
`app/favicon.ico` (32px, for the browsers and crawlers that still ask for
`/favicon.ico`) and `app/apple-icon.png` (180px, iOS home screen).

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
- **One vertical rhythm.** Full-width content sections take their top and bottom
  padding from `--section-y` (6rem desktop, 3.5rem mobile) rather than setting
  their own, so the spacing between sections is the same on every page. Split
  panels (hero halves, market bands, the contact columns) still set their own
  padding — they are interior surfaces, not page sections.
- **`aspect-ratio` and `align-self: stretch` do not mix.** Several media boxes
  stretch to their grid row on desktop. When the mobile breakpoint gives them an
  `aspect-ratio`, `align-self` and `min-height` have to be released in the same
  rule — otherwise the box derives its *width* from the stretched row height and
  overflows the viewport.
- **Scroll reveal is gated on `[data-js]`**, stamped on `<html>` by an inline
  script in the layout before first paint. Without the gate, `.reveal`'s
  `opacity: 0` would leave every headline invisible if scripting fails, since
  only the IntersectionObserver ever adds `.up`.

## Media

Every image slot in the CMS also accepts a video or GIF; `components/Media.js`
picks the tag. Video playback lives in `components/AutoVideo.js` (a client
component) so it can pause for `prefers-reduced-motion`, while images stay
server-rendered.

The home hero ships with a Dubai Marina clip (`public/videos/dubai-hero.mp4`,
1920×1080, from Pexels under their free licence) and a poster frame pulled from
the video itself. The poster matters: without one the hero is black until the
file buffers. **The clip is 17 MB and should be compressed to roughly 5 MB
before launch** — or replaced through the CMS with the client's own footage.

Uploads go straight from the browser to Supabase Storage via a signed URL
(`/api/admin/upload`), which keeps large files clear of the serverless body
limit. `MAX_VIDEO_BYTES` in `lib/media.js` allows 100 MB; Supabase clamps that
to the project-wide storage limit, which defaults to 50 MB — see the note in
`supabase/schema.sql`.

## Maps

`components/PropertyMap.js` renders a real Google map from a place name, using
the keyless `output=embed` endpoint so no API key has to be provisioned. Each
project takes a `mapQuery` (or a pasted `mapEmbedUrl` for an exact pin), and the
contact page uses the same component once `map.query` is filled in. A pasted
embed URL is checked against Google's own hosts before it becomes an iframe.

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

- Imagery is Unsplash placeholder and several photos do not match their subject
  — the Contact hero and one project card are Toronto, not Dubai. Art-directed
  assets should replace them.
- The Google reviews on the home page are still the placeholder copy shipped
  with the block ("Replace this with a real review…").
- The hero video is 17 MB. Compress it, or replace it through the CMS, before
  launch — see **Media** above.
- `map.query` is set for the contact page and every project, but the values are
  area-level ("Business Bay, Dubai"). Paste a Google "Embed a map" URL into
  `mapEmbedUrl` for an exact pin per development.
