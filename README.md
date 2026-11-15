# CMA Advogados — website

Institutional website for **CMA Advogados** (formal name: *Carolina Meirelles & Advogados*), Brasília/DF.
V3 (November 2026) repositions the site around the institution — CMA, not the founder — following the client's
feedback and the November 2026 strategic briefing: *“Advocacia estratégica para patrimônio, negócios e questões de alta
complexidade.”* Art direction: **institutional architectural editorial**, on the official brand identity (Estúdio Sarau, 2025).

> **Status: pre-launch.** Search indexing is off and several facts are pending.
> Read [`CLIENT_APPROVAL_REQUIRED.md`](./CLIENT_APPROVAL_REQUIRED.md) before publishing.

Other documents: [`V3_AUDIT.md`](./V3_AUDIT.md) (what was kept, redesigned, removed) · [`GUIA_CMS.md`](./GUIA_CMS.md)
(guia do painel, em português) · [`DESIGN_SYSTEM.md`](./DESIGN_SYSTEM.md) · [`ASSET_REGISTER.md`](./ASSET_REGISTER.md) ·
[`docs/instagram/`](./docs/instagram) (identidade, templates e calendário de 90 dias).

## Stack

- Next.js 16 (App Router) · React 19 · TypeScript (strict) · token CSS (`src/styles/`), no UI framework.
- Motion: GSAP 3.15 + ScrollTrigger for the three signature interactions; CSS + one `IntersectionObserver` for simple reveals.
- Fonts self-hosted via Fontsource (Encode Sans, Karla — OFL; Roboto Slab — Apache 2.0).
- Content: JSON files in `/content`, edited through **Sveltia CMS** at `/admin` (git-based, free, self-hosted bundle).
- `marked` renders article Markdown.

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```

| Script | Purpose |
|---|---|
| `npm run dev` / `npm run build` / `npm start` | Development / production |
| `npm run lint` · `npm run typecheck` | ESLint · `tsc --noEmit` |
| `npm run assets` | Rebuilds images, logo files and `logo-data.ts` from `assets-src/` |
| `python3 scripts/derive_cma.py` | Regenerates the CMA wordmark (`cma-data.ts`) from the official outlines |
| `python3 scripts/build_instagram_templates.py && node scripts/render-instagram.cjs` | Re-renders the Instagram reference templates |

### Environment variables

| Variable | Meaning |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Production origin (canonical URLs, sitemap, Open Graph, JSON-LD) |
| `NEXT_PUBLIC_ALLOW_INDEXING` | `true` enables indexing. **Keep `false` until approvals are complete** |
| `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` | Contact-form delivery (Resend). Without them the form says honestly that sending is not active |

## Content and CMS

```
content/
  escritorio.json     signature, introduction, approach, values, audiences, service model, history (unpublished)
  contato.json        names, OAB registration, address, e-mail, phone, WhatsApp, social — null = "a confirmar"
  areas/*.json        five practice areas (Tribunais Superiores: publicado=false)
  equipe/*.json       team profiles (verified data only)
  artigos/*.json      articles (status rascunho | revisao | publicado; needs a real date to appear)
```

`src/lib/content.ts` is the only reader. It filters out every unpublished item, so drafts never reach a page, a link,
the sitemap or structured data. The CMS (`public/admin/config.yml`) writes these same files through GitHub commits;
Vercel redeploys automatically. Login: GitHub fine-grained token (Contents: read/write on this repository) or an OAuth
authenticator — see `GUIA_CMS.md`. Set `backend.branch` to the production branch.

## Routes

`/` · `/escritorio` · `/areas-de-atuacao` · `/areas-de-atuacao/[slug]` · `/equipe` · `/equipe/[slug]` · `/conhecimento` ·
`/conhecimento/[slug]` · `/contato` · `/privacidade` · `/marca` (brand review board, noindex) · `/admin` (CMS, noindex).
V2 URLs redirect permanently (`next.config.ts`): the six old area slugs → the new areas, `/nossa-historia` → `/escritorio`,
`/carolina-meirelles` → `/equipe/carolina-meirelles`.

## Signature interactions

| | Component | Desktop (≥1024 px, motion on) | Tablet / mobile / reduced motion |
|---|---|---|---|
| **A · Institutional opening** | `components/home/Hero.tsx` | Pinned ~1.5 viewports. The photograph contracts into a window on the right; CMA, drawn twice (stone inside the photo, espresso on the page), shrinks to the top-left — the letters change colour exactly at the moving frame's edge; the introduction rises | Photo, then the introduction, in flow |
| **B · Connected areas** | `components/home/AreasIndex.tsx` | Pinned index (~0.68 viewport per area). The active area opens its summary; its photograph rises over the previous one through a mask | Vertical sequence, inline photos |
| **C · Boutique approach** | `components/v3/Sections.tsx › Approach` | An espresso panel opens out of the white page, a tall photograph opens inside it, the three themes settle beside it | Same windows, starting nearly open; static with reduced motion |

Compositions are designed in CSS with invisible target boxes (`.hero__box--win`, `.hero__mbox--start/end`); GSAP only measures
and interpolates. The header hit-tests what lies beneath it to choose its tone and drops its band over the opening photograph.

## Brand

- **CMA wordmark (proposal, pending approval):** C, M and A of the manual's reduced logo, re-spaced without the “&”, plus
  ADVOGADOS from the official signature (`scripts/derive_cma.py`). No glyph is redrawn.
- The formal signature *Carolina Meirelles & Advogados* remains in the footer and in the legal identification.
- `/marca` compares header Options A/B and colour Directions A (official palette, in use) / B (graphite, from the briefing).
