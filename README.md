# Carolina Meirelles & Advogados: website

Institutional website for **Carolina Meirelles & Advogados (CMA)**, a Direito Imobiliário practice in Brasília/DF.
The art direction is *architectural editorial luxury*: immersive architecture, very large Encode Sans display type, fine rules and warm neutral surfaces. Everything is built on the official CMA identity (Estúdio Sarau, 2025).

> **Status: pre-launch.** Search indexing is switched off and several real-world facts are pending.
> See [`CLIENT_APPROVAL_REQUIRED.md`](./CLIENT_APPROVAL_REQUIRED.md) before publishing.

## Stack

- Next.js 16 (App Router) · React 19 · TypeScript (strict)
- Token-based CSS (`src/styles/*`), with no UI framework.
- Motion: **GSAP 3.15 + ScrollTrigger** for the scroll-linked choreography (GSAP's standard no-charge licence allows commercial use). CSS transitions and a single `IntersectionObserver` handle simple reveals.
- Brand fonts are self-hosted through Fontsource (Encode Sans and Karla under SIL OFL 1.1, Roboto Slab under Apache 2.0). There are no requests to Google Fonts.
- `next/image` handles AVIF/WebP and responsive sizes. Art-directed `<picture>` crops are used for mobile.
- The only runtime dependencies are `next`, `react`, `react-dom`, `gsap` and the three font packages.

## Getting started

```bash
npm install
cp .env.example .env.local   # edit values
npm run dev                  # http://localhost:3000
```

| Script | Purpose |
|---|---|
| `npm run dev` | Development server |
| `npm run build` / `npm start` | Production build / server |
| `npm run lint` | ESLint (Next core-web-vitals + TypeScript) |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run assets` | Rebuilds images, logo files, icons and `logo-data.ts` from `assets-src/` |
| `node scripts/build-og.cjs` | Re-renders the 1200×630 social image (needs Playwright + Chromium) |

### Environment variables

| Variable | Meaning |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Production origin. Used for canonical URLs, the sitemap, Open Graph and JSON-LD. |
| `NEXT_PUBLIC_ALLOW_INDEXING` | `true` enables indexing (robots + meta). **Keep `false` until approvals are complete.** |
| `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` | Contact-form delivery through [Resend](https://resend.com). Without them the form shows an honest "not yet active" message and **never** claims success. |

## Deployment

The site works on any Node host. Vercel is the simplest option:

1. Import the repository and keep the defaults (framework: Next.js).
2. Set the environment variables above for Production.
3. Add the custom domain, then set `NEXT_PUBLIC_SITE_URL` to it.
4. Only after client approval, set `NEXT_PUBLIC_ALLOW_INDEXING=true` and redeploy.

Every page is static except `/api/contato`.

## Project structure

```
src/
  app/                    routes (App Router), sitemap, robots, manifest, icons, API
  components/             Header, Footer, Closing, PracticeIndex, PageHero, ContactForm…
    brand/Logo.tsx        official signatures (inline SVG, currentColor)
    brand/logo-data.ts    GENERATED vector paths extracted from the brand manual
  content/                ALL editable copy and firm facts
    site.ts               firm facts (null = pending), navigation, audiences
    home.ts               homepage copy, marked [MANUAL] or [PROPOSTA]
    practices.ts          the six practice areas (detail-page content)
    articles.ts           draft articles (status: "draft" → noindex)
  lib/                    SEO metadata + JSON-LD helpers
  styles/                 tokens.css · base.css · components.css · sections.css · pages.css
assets-src/               original sources (AI concept PNGs, extracted logo SVGs)
public/assets/            production assets (architecture, brand, icons, og)
scripts/                  asset pipeline, logo extractor, OG renderer
```

### Editing content

- **Firm facts** (OAB, address, e-mail, phone, WhatsApp, portrait, biography) live in `src/content/site.ts`. Fill a `null` and the UI, contact links and structured data update automatically. Placeholders ("a confirmar") disappear once a value is set.
- **Portrait**: put the approved photo in `public/assets/editorial/` and set `founder.portrait`.
- **Articles**: once an article has passed legal review, change `status` to `"published"` in `articles.ts` (and widen the type). It then enters the sitemap and becomes indexable.

## Design system

| Token | Value | Use |
|---|---|---|
| `--cma-stone` | `#CECBC4` | main light surface |
| `--cma-espresso` | `#301206` | text and dark sections |
| `--cma-earth` | `#382C23` | secondary dark, secondary text |
| `--cma-taupe` | `#ACA699` | audience section, muted text on dark |
| `--cma-slate` | `#B4B9BF` | reserved accent (approved logo colourway) |
| `--cma-paper` | `#EBE9E4` | off-white for long reading (the only addition) |

The type roles follow the manual: Encode Sans for headings (display weight 300), Karla for body text, and Roboto Slab for labels and captions. Neue Latein appears **only** inside the official logo artwork.

Reusable primitives: `.container`, `.grid` (12 columns), `.section--{stone|paper|taupe|espresso}`, `.on-dark`, `.t-mega/.t-display/.t-h1…`, `.label`, `.link-line`, `.action`, `.frame`, `.facts`, `.pending`, `data-reveal` (`""`, `fade`, `mask`), `<Lines>` (masked line reveal), `<Parallax>`.

Motion respects `prefers-reduced-motion`, and all content stays visible without JavaScript.

## Motion architecture

The choreography is scroll-linked (scrubbed), never time-locked. Users scroll at their own pace and nothing hijacks the scroll.

| Moment | Where | Desktop (≥1024 px, motion on) | Tablet / mobile | Reduced motion |
|---|---|---|---|---|
| **Hero → statement → practice chapters** | `components/home/HomeSequence.tsx` | One pinned timeline of about 5.4 viewports. The headline crosses a framed photograph and turns stone where the photo sits behind it (a stone copy clipped by the same frame). The frame opens to full bleed and the headline settles small at the lower left. The firm statement arrives over the photo, then the photo contracts into a right-hand column. Six chapters follow: each practice photo slides up inside the frame while the titles swap through line masks. A rail lists all six links throughout. | Un-pinned flow: the frame widens as it scrolls, and chapter images use clip reveals with staggered widths | Static editorial layout |
| **Founder portrait** | `components/home/FounderReveal.tsx` | Short pin: a wide colonnade contracts into an arch, the architecture lifts away to reveal the portrait, and the name crosses the arch edge in two tones | Arch frame with a clip reveal | Static arch |
| **Windows** | `components/motion/ExpandFrame.tsx` | Frames open as they travel up the viewport (Brasília, page heroes, article images, escritório strip, "next area" band) | Same, starting closer to full width | Fully open |

Layouts are designed in CSS. Invisible "target boxes" (`.seq__box--hero`, `.seq__box--split`, `.founder2__box--*`) describe each composition, and GSAP only measures them and interpolates `clip-path`. To change a composition, edit those boxes in `src/styles/home.css`.

The header picks its tone by hit-testing what is beneath it (hit-testing respects `clip-path`), so it switches to stone exactly when a photo passes under it, including mid-transition. Mark dark surfaces with `data-tone="dark"` or `.on-dark`.

Keyboard: focusing a link inside the pinned sequence scrolls to the moment where that link is shown. All practice links are permanent DOM links.

## Logos

`scripts/extract_logos.py` reads the vector paths of each signature directly from the manual's colour-variant pages (pp. 12–20) with PyMuPDF. The logo is not redrawn or typeset. Only the colourways shown in the manual are exported, and the `<Logo>` component documents the minimum digital sizes.
