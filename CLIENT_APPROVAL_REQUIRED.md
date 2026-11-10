# Client approval required before publication

The site is complete in structure and design, but it is **not publication-ready** until the items below are resolved.
Search indexing is disabled (`NEXT_PUBLIC_ALLOW_INDEXING=false`) until then.

Pending values are `null` in `src/content/site.ts` and appear on the site as a discreet "◇ a confirmar" marker.

## 1. Professional identity and OAB compliance (blocking)

| Item | Where it appears | Notes |
|---|---|---|
| Carolina Meirelles's OAB/DF registration number | Footer, homepage founder section, profile page | **Required in advertising** under Provimento 205/2021 (CFOAB). |
| Registration of the *sociedade de advogados* with OAB/DF | Footer | Confirm that "Carolina Meirelles & Advogados" is a registered society and supply its number. If it is not, the firm name may need adjusting. |
| Academic background, post-graduate studies, memberships | Profile page, homepage | Nothing has been invented. Fields show "a confirmar". |
| Approved biography | Profile page, homepage | A neutral two-paragraph introduction is used for now (`home.ts → founder.intro`). |
| Role wording "Advogada · Sócia fundadora" | Founder section, profile | Inferred from the manual ("a advogada Carolina Meirelles", "A sócia"). Please confirm. |
| Review against current OAB advertising rules | Whole site | Written to Provimento 205/2021: informative tone, no promises of results, no clients, no prices, no comparisons. A search in Nov 2026 found discussion about revising the provimento (e.g. OAB-SP, July 2025) and a change to art. 6º, but no replacement text. Please confirm the version in force at publication. |

## 2. Contact details (blocking)

| Item | Notes |
|---|---|
| E-mail | The business-card mockup in the manual shows "contato@cma.com", which looks like an agency placeholder (cma.com is unlikely to belong to the firm). **Not used.** |
| Telephone / WhatsApp | The manual mockup shows "+55 61 98413 1010". This is **not used** until the firm confirms it is real and current. |
| Address | The manual mockup shows "Lago Sul, Brasília". **Not used.** The site says only "Brasília, DF". Confirm whether an address should be published. |
| Office hours | Optional. |
| Instagram / LinkedIn | Optional. Added to `sameAs` in structured data when filled in. |
| Official domain | Set `NEXT_PUBLIC_SITE_URL`. |

## 3. Contact form (blocking for the form only)

- Create a [Resend](https://resend.com) account (or tell us which provider the firm prefers), verify the sending domain, and set `RESEND_API_KEY`, `CONTACT_TO_EMAIL` and `CONTACT_FROM_EMAIL`.
- Until then the form validates input but states plainly that sending is **not yet active**. It never shows a false success message.
- The website stores no messages. Delivery goes straight to the firm's inbox.

## 4. Privacy policy (LGPD)

`/privacidade` is a **preliminary draft** based on the site's actual processing (one contact form, no analytics, no advertising cookies). Still needed:
- CNPJ and address of the controller
- DPO (*encarregado*) name and contact channel
- Names of the providers (hosting, e-mail delivery)
- Retention period for messages that do not lead to an engagement
- Date of last update
- Legal review of the chosen legal bases (art. 7º, I and V)

If analytics are added later, a consent mechanism must be implemented first.

## 5. Copy approval

| Content | Status | File |
|---|---|---|
| "Objetividade e inteligência." | Taken from the brand manual's own applications | `src/content/home.ts` |
| "Somos um escritório especializado em Direito Imobiliário, oferecendo assessoria jurídica estratégica… segurança, agilidade e transparência…" | Taken from the manual (p. 32 mockup) | `home.ts`, `/escritorio` |
| Hero subtitle, section headings, audience texts, Brasília text, principles, method | **Proposed copy** (marked `[PROPOSTA]`) | `home.ts`, `site.ts`, `escritorio/page.tsx` |
| Six practice areas: titles | From the brand manual mockups. Confirm these are the firm's actual services. | `practices.ts` |
| Six practice areas: full page content | **Draft, needs legal review** (scope, situations, method, legal references) | `practices.ts` |
| Four articles | **Drafts, need legal review.** `status: "draft"` keeps them out of the sitemap and adds `noindex`. No authors or dates are shown. | `articles.ts` |

Notes for the legal reviewer:
- Art. 216-A of Lei 6.015/1973 (*usucapião extrajudicial*) was introduced by the CPC/2015. Art. 216-B (*adjudicação compulsória extrajudicial*) was introduced by Lei 14.382/2022. The texts cite them on that basis.
- Statutes beyond the core list: Lei 13.097/2015 (*concentração na matrícula*), Lei 13.140/2015 (*mediação*), Lei 9.307/1996 (*arbitragem*), CDC (Lei 8.078/1990).
- Statements about guarantees in *locação* and the *renovatória* are given in general terms, without article numbers.

## 6. Images and brand assets

| Item | Notes |
|---|---|
| **Founder portrait** | Missing. An abstract architectural placeholder clearly reads "Retrato oficial — a ser fornecido pelo escritório". A stock photo will never be used in its place. |
| Architectural imagery | All photographs are **AI-generated concept images** from the asset library (HERO A/B/C and crops derived from them). They are captioned "Imagem conceitual" where they could be mistaken for a real place. Replacing them with an authentic Brasília / office photo shoot is recommended. Licensed alternatives are listed in `ASSET_REGISTER.md`. |
| Logos | Extracted as exact vectors from the manual PDF (not redrawn). Please request the **original SVG/EPS files** from Estúdio Sarau and confirm they match. |
| Favicon | Uses the official reduced signature (CM&A), stone on espresso. At 16–32 px it is below the manual's 55 px digital minimum, which is unavoidable for a favicon. Please confirm, or ask the agency for a dedicated favicon mark. |
| Neue Latein | Not used as a web font. It appears only inside the official logo artwork. No font files were extracted or redistributed. |
| TRK Imobiliária | The manual's case-study mockup is **not** used anywhere. |

## 7. Not included, by design

No testimonials, case studies, client logos, success rates, years of experience, rankings or awards. None should be added without verification and an ethics review.
