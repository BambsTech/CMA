# CMA digital design system

This system is derived from the official brand manual (Estúdio Sarau, 2025). That covers its identity pages (pp. 04–21) and, above all, the agency's own web and presentation applications (pp. 29–38). It is implemented in code (`src/styles/tokens.css` and its components) and can be viewed at **`/sistema`**, a style guide that is excluded from search and navigation.

> The manual's character is **restraint**: small, light type; a lot of empty stone; one strong element per screen. When in doubt, make it smaller and leave more space.

## 1. Measured from the manual

The pages are 1024 × 768 pt. Sizes were read from the PDF text layer and scaled to the viewport (1 pt ≈ 0.098 vw).

| Manual use | Font / weight | Size on page | Web token | ≈ at 1440 px |
|---|---|---|---|---|
| Chapter opener ("Índice", "Logos") | Encode Sans Light | 72 pt · 7 vw | `--fs-display` (rare) | 72–92 px |
| Section title ("Conceito", "Logotipo reduzido") | Encode Sans Light | 36–42 pt · 3.5–4.1 vw | `--fs-h1` | ~52 px |
| Sub-title / specimen | Encode Sans Light | 28 pt · 2.7 vw | `--fs-h2` | ~37 px |
| Small title | Encode Sans Light | 18 pt | `--fs-h3` | ~24 px |
| Lead | Karla Regular | 14 pt | `--fs-lead` | ~19 px |
| **Body** | **Karla Light** | **12 pt · 1.17 vw** | `--fs-body` (weight 300) | ~16–17 px |
| Folios, codes, captions | Roboto Slab Regular | 12–14 pt | `--fs-caption` + tracking | 11 px caps |

Tracking is neutral on titles (the manual never compresses them) and wide on small capitals (≈ 0.16 em).

## 2. Composition rules (pp. 04–09, 29–38)

1. **One strong element per screen.** That might be a photograph, a short title or the spread signature. Everything else is small.
2. **Anchor to corners.** Titles sit top-left or bottom-left. Supporting text sits low on the right in **narrow twin columns**, with small marks in the corners (signature, page name, number).
3. **Leave screens under-filled.** Large fields of stone or espresso are intentional. Not every section needs to fill the viewport, and most should not.
4. **Small numbered lists** for services (p. 32 "Serviços": six light lines, numbers 1–6).
5. **Photography is calm.** Interiors and architecture in warm light, often inset with margins, with type set lightly over them in small tracked capitals (p. 38).
6. **The spread signature** (pp. 37–38): CAROLINA at one edge, MEIRELLES at the other, and "& ADVOGADOS" small between. This is the agency's own web treatment. All glyphs are the official vectors.
7. **Glass panels** (pp. 30, 32): a translucent rounded panel carries text over a photograph. Use sparingly.
8. **Folio rule** (pp. 04–21): a thin full-width rule with the section name at the left and the number at the right, in small caps.

## 3. Colour

| Token | Hex | Role (from manual usage) |
|---|---|---|
| `--cma-stone` | #CECBC4 | Dominant page colour |
| `--cma-espresso` | #301206 | Text; occasional full panels (statement, contact) |
| `--cma-earth` | #382C23 | Secondary dark |
| `--cma-taupe` | #ACA699 | Muted text on dark; quiet panels ("Serviços") |
| `--cma-slate` | #B4B9BF | Rare accent |
| `--cma-white` | #FFFFFF | The signature band (p. 38); logo pages |

Approximate share per page: stone 70 %, espresso 15 %, photography 10 %, taupe and white 5 %.

## 4. Space

- Page margin: `--gutter` = 4.9 vw (the manual's margin of ≈ 50 pt on 1024 pt).
- Section rhythm: `--space-l` (3–6 rem) and `--space-xl` (5–11 rem). Prefer more space between elements, not bigger elements.
- Text measure: 32 rem max. Twin columns use about 15 rem each.

## 5. Components (code)

| Component | Where |
|---|---|
| `Logo` (5 signatures), `SpreadWordmark` | `components/brand` |
| `.label` (Roboto Slab caps), `.label--rule` | `styles/components.css` |
| `.link-line` (underlined text link), `.action` (outlined box) | idem |
| `.rule`, folio | idem |
| Numbered index (`.seq__rail`) | `styles/home.css` |
| Statement panel (`.statement`) | idem |
| Ledger table (`.ledger`) | idem |
| Arch portrait (`.portrait-ph`, `.founder2__frame`) | `styles/sections.css`, `home.css` |
| `ExpandFrame`, `HomeSequence`, `FounderReveal` | `components/motion`, `components/home` |

## 6. Motion

Motion is quiet and serves composition. It uses masks, slow eases (expo / power3) and scroll-linked frames, and there is no bounce. The full motion architecture is described in `README.md`.

## 7. Do / don't

- **Do** set titles in Encode Sans Light at the manual's sizes. Body copy is Karla **Light**.
- **Do** keep supporting text small and in narrow columns.
- **Don't** use display sizes above `--fs-display`, and never with tight negative tracking.
- **Don't** fill every screen. Don't put more than one large element on a screen.
- **Don't** alter the signatures' letterforms or colours (manual p. 21). Spacing between whole words is allowed only in the agency's spread treatment.
