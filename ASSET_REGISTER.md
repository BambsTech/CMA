# Asset source & licensing register

| Asset (in repo) | Origin | Type | Licence / rights status | Use | Client approval |
|---|---|---|---|---|---|
| `assets-src/architecture/HERO_A_Cinematic_Colonnade_AI.png` (+ `_MOBILE_CROP.webp`) | CMA asset library (Drive, folder 02) | **AI-generated concept image** | Supplied for the project; "working website visual, subject to review" (library licence register) | Homepage hero, OG image | Yes. Never caption as a real building |
| `assets-src/architecture/HERO_B_Golden_Pavilion_AI.png` (+ mobile) | Same | AI-generated concept | Same | Brasília section, article image | Yes |
| `assets-src/architecture/HERO_C_Shadow_Corridor_AI.png` (+ mobile) | Same | AI-generated concept | Same | Escritório hero, article image | Yes |
| `public/assets/architecture/colonnade*.webp`, `pavilion*.webp`, `corridor*.webp` | Derived from HERO A/B/C (`npm run assets`) | WebP masters | As source | Site imagery | As source |
| `public/assets/architecture/detail-*.webp` (8 files) | **Original art-directed crops** of HERO A/B/C | Derived | As source | Practice areas, intro, articles, strip | As source |
| `assets-src/brand-extracted/*.svg`, `public/assets/brand/*.svg` | **Vector paths extracted 1:1** from `CMA_Manual_Identidade_Visual.pdf`, pp. 12–20 (Estúdio Sarau, 2025) | Official logo artwork | Client's own brand identity | Header, footer, menu, icons | Confirm against the agency's original files |
| `assets-src/brand-extracted/cma-palavra-*.svg` (CAROLINA, MEIRELLES, & ADVOGADOS) | Vector glyphs split 1:1 from the manual's signatures (pp. 16, 18) for the agency's spread web treatment (pp. 37–38) | Official logo artwork | Client's own brand identity | Homepage opening band, /sistema | Confirm with agency |
| `src/components/brand/logo-data.ts` | Generated from the SVGs above | Code | Same | `<Logo>` component | No |
| `src/app/icon.svg`, `apple-icon.png`, `public/assets/icons/*` | Composed from the official reduced logo (stone on espresso, an approved pairing) | Derived | Same | Favicon / PWA | Yes (below minimum size; see approvals) |
| `public/assets/og/cma-og-default.jpg` | Rendered by `scripts/build-og.cjs` (HERO A + official logo + Encode Sans / Roboto Slab) | Original composition | Same as components | Social sharing | Yes |
| Portrait placeholder (`PortraitPlaceholder.tsx`) | Original SVG linework | Original illustration | Ours | Founder sections | Replace with an authentic portrait |
| Encode Sans (`@fontsource-variable/encode-sans`) | Fontsource / Google Fonts | Web font | SIL Open Font License 1.1 | Headings | No |
| Karla (`@fontsource-variable/karla`) | Fontsource / Google Fonts | Web font | SIL Open Font License 1.1 | Body | No |
| Roboto Slab (`@fontsource-variable/roboto-slab`) | Fontsource / Google Fonts | Web font | Apache License 2.0 | Captions, labels | No |
| Neue Latein | Brand manual | Logotype font | **Not used or distributed.** It exists only as outlines in the official logo | — | Confirm licence if ever needed |
| Interface icons (arrows), dividers, diamond markers | Hand-written inline SVG/CSS | Original | Ours | UI | No |
| Reference screenshots (Oura & Co., legal site, manual pp. 29–38) | Asset library folder 03 | Reference only | **Not included in the repository**; art direction only | — | — |

## Real-photo replacements (not downloaded)

From the asset library's `PHOTO_SOURCE_SHORTLIST.md`. Each needs an individual rights check (people, artworks and identifiable buildings) before use, and author credit should be kept.

1. Brasília / white modernist structure, Rafael Leão: https://unsplash.com/photos/man-in-black-jacket-walking-on-white-concrete-building-hpOrvWRNJLo (a person appears)
2. Brasília / walkway, Georges Toiansky: https://unsplash.com/photos/a-building-with-a-walkway-9o6FhbWDTOk
3. Brasília / concrete and light, Luis Felipe Lins: https://unsplash.com/photos/cJv8Gh0znIQ
4. Brasília / architecture, Luis Felipe Lins: https://unsplash.com/photos/brown-and-white-concrete-building-under-blue-sky-during-daytime-I9PxPj-c3RY
5. Brasília / façade, Gustavo Leighton: https://unsplash.com/photos/white-concrete-building-under-blue-sky-during-daytime-7Fx8BoNsaxs
6. Brasília / corridor, João Pedro Sconetto: https://unsplash.com/photos/an-underpass-with-a-curving-path-UOoIbsMU_Lw
7. Interior, dark wood and concrete: https://unsplash.com/photos/a-room-with-wooden-doors-7QnoQs7olyw
8. Warm interior light, Alex Kalinin (Pexels): https://www.pexels.com/photo/modern-architectural-interior-with-sunlight-patterns-31735038/
9. Office corridor, Kayo Akahori (Pexels): https://www.pexels.com/photo/modern-office-hallway-with-sunlight-and-shadows-35571122/
10. Warm interior, Shojol Islam (Pexels): https://www.pexels.com/photo/modern-architectural-interior-with-light-and-shadow-40788444/

Licences: Unsplash https://unsplash.com/license · Pexels https://www.pexels.com/legal-pages/license/

A dedicated photo shoot of real Brasília architecture and the firm's workspace would be the strongest option.

## Image generation

No new images were AI-generated during this build. The eight detail images are crops of the three supplied concept images.
