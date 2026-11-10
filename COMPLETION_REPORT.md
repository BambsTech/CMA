# Completion report

## Implemented

**Pages (all working, no dead links):** `/`, `/escritorio`, `/carolina-meirelles`, `/areas-de-atuacao`, six `/areas-de-atuacao/[slug]` pages, `/conteudos`, four `/conteudos/[slug]` drafts, `/contato`, `/privacidade`, and a branded 404.

**Homepage, 8 sections**
1. Full-viewport hero (colonnade concept image, a separate mobile crop, subtle parallax and zoom). "Objetividade / e inteligência." is set as an offset magazine-cover headline, with a fine-ruled supporting column, two restrained text actions and an animated scroll cue.
2. Editorial introduction: an indented display statement, a masked-reveal portrait image, the manual's institutional paragraph, and the three manual values (segurança, agilidade, transparência).
3. Áreas de atuação: numbered editorial rows. On desktop the active row reveals its own image in a sticky frame. Touch devices get plain, fully legible links.
4. Quem assessoramos: three columns divided by hairlines, with roman numerals and distinct internal links per audience.
5. Carolina Meirelles: a founder spread with an honest portrait placeholder and credential fields marked "a confirmar".
6. Brasília: a cinematic dark section with a large typographic title, the city's coordinates and a concept-image disclaimer.
7. Conteúdos: one featured article plus an indexed list.
8. "Vamos conversar." espresso closing, flowing into a footer built around the full-width official name logotype.

**Design system in code:** tokens (official palette, fluid type scale, spacing, motion), a 12-column grid, section surfaces, typographic primitives, labels, link/action styles, frames, fact lists, form controls, pending-data markers, `<Logo>`, `<Lines>`, `<Parallax>`, `<ArtImage>`, `<PageHero>` (image / split / plain), and a reveal observer.

**Brand assets:** five official signatures extracted as exact vectors from the manual, in approved colourways. Also a favicon, Apple and PWA icons, and an Open Graph image.

**SEO:** unique PT-BR titles and descriptions, canonical URLs, Open Graph and Twitter cards, a sitemap (drafts excluded), robots, a manifest, and JSON-LD (`LegalService`, `Service`, `Person`, `Article`, `BreadcrumbList`) built only from verified facts. Pending facts are added automatically once filled in. Indexing stays **off** until `NEXT_PUBLIC_ALLOW_INDEXING=true`.

**Contact:** client and server validation, a honeypot, rate limiting, an LGPD consent checkbox, and Resend delivery through `fetch`. Without credentials the form shows an honest "not yet active" message. Contact links (mailto, tel, WhatsApp) switch on when their values are confirmed.

**Ethics:** written to OAB Provimento 205/2021. There are no promises, statistics, clients, testimonials or prices, and every article carries an informational disclaimer. The TRK mockup is not used.

## Tested

- `npm run lint`: passes. `npm run typecheck`: passes. `npm run build`: passes, with 25 static routes plus the API.
- Browser checks (Playwright/Chromium screenshots that I reviewed) at **1440 px, 768 px and 390 px** for the homepage, plus 1440 px full pages for the escritório, áreas, área detail, conteúdos, article, contato and Carolina pages, and 390 px for the área detail hero. There was no horizontal overflow and no console errors.
- Mobile menu: opens, focuses "Fechar", traps focus, closes on Escape with focus restored, and closes on navigation.
- Contact form: required-field errors appear and focus moves to the first invalid field. Without credentials it shows the honest "not active" state, and the API returns 422 on invalid input.
- Every page has exactly one `h1`, all images have `alt`, `prefers-reduced-motion` disables motion, and all content is visible with JavaScript disabled.

Issues found and fixed during review: Brasília text over a bright sky, small crops being upscaled in heroes (now a split layout), fully clipped mask reveals never firing, the checkbox inheriting text-field styles, a clipped "g" descender in masked headlines, and identical link sets across the audience columns.

## Outstanding (see `CLIENT_APPROVAL_REQUIRED.md`)

OAB numbers, the society registration, credentials and biography, an authentic portrait, contact details and domain, contact-form credentials, privacy-policy details, legal review of the practice and article copy, original logo files from the agency, and ideally authentic architectural photography to replace the AI concept images.

**The site should not be published or indexed until these are resolved.**
