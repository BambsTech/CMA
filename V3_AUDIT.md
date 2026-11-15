# V3 audit — what was kept, redesigned and removed (November 2026)

Inputs: client feedback (“dar ênfase no CMA e não na Carolina Meirelles Advogados… não fica um escritório tão personificado”;
“o escritório dela fica na TRK… pode usar imagens de lá”), the November 2026 briefing, the brand manual, and the V2 site
as reviewed through three rounds of Vercel Toolbar comments.

## Kept (working foundations)

- Next.js 16 / React 19 / TypeScript stack, token CSS, Fontsource fonts, sharp asset pipeline.
- Official logo outlines extracted 1:1 from the manual (`logo-data.ts`) and the `<Logo>` component.
- GSAP architecture: matchMedia modes (cinematic / fluid / reduced motion), CSS-designed target boxes, `ExpandFrame` windows,
  `RevealObserver`, header tone detection by hit-testing.
- Honest contact form (`/api/contato` → Resend; 503 + clear message when not configured), privacy draft, JSON-LD, sitemap,
  robots, OG image, security headers.
- Standing review rules from the client's toolbar comments: titles near the top-left corner, small justified text in narrow
  columns, generous empty space, no rules or dotted lines, header with pages right after the logo, white text over photographs.

## Redesigned

| Area | V2 | V3 |
|---|---|---|
| Brand hierarchy | “Carolina Meirelles & Advogados” signature dominant; CM&A monogram in header | **CMA** (official outlines) as the institutional identity everywhere; formal name kept in the footer/legal line; `/marca` review board |
| Positioning | Direito Imobiliário only; “Objetividade e inteligência.” | “Excelência jurídica. Visão estratégica.” + “Advocacia estratégica para patrimônio, negócios e questões de alta complexidade.” |
| Practice areas | Six real-estate sub-areas | Five integrated areas (Imobiliário, Fundiário, Sucessório e Patrimonial, Tributário, Tribunais Superiores — the last unpublished), each with services, connections, audiences |
| Homepage | Page-38 opening → three chapters → statement → audiences → founder panel → closing | Institutional opening → introduction (one movement) → connected areas index → boutique approach → audiences → team → knowledge → contact |
| Founder | “A sócia.” panel with her first name set large; provisional portrait from the agency mockup | Team section and profile pages; portrait removed (unverifiable), honest placeholder |
| Navigation | Início · Serviços · Nossa História · Contato | Início · O Escritório · Atuação · Equipe · Conhecimento · Contato |
| Content | TypeScript files edited by developers | JSON in `/content` + Sveltia CMS with draft/published states |

## Removed

- `HomeSequence`, `FounderPanel`, `ServicesPanel`, `Closing`, `PageHero`, `PortraitPlaceholder`, `SpreadWordmark` usage on the
  homepage, `/nossa-historia`, `/carolina-meirelles`, `/sistema` (replaced by `/marca`) — all with redirects.
- `home.css`, `sections.css`, `revisions.css` (three layers of overrides) → one `v3.css`.
- Unsplash stock photographs and the remote image allowance.
- `src/content/practices.ts`, `home.ts`.

## Not done / out of scope this round

- Real office photography: the TRK shoot found in Drive shows a private residence (see approvals I1–I2). Concept images remain.
- English version: architecture ready (content files, `lang`), no translation published.
- Analytics: none installed (no consent-sensitive tracking).
- Ongoing Instagram management: only identity, templates and the 90-day proposal were prepared.
