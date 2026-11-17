/**
 * Central firm configuration.
 *
 * RULE: every factual value that has NOT been confirmed by the client is `null`.
 * The UI renders `null` values as a discreet "a confirmar" placeholder (see <Pending/>),
 * and structured data omits them entirely. Never replace a `null` with a guess.
 * Track all pending items in CLIENT_APPROVAL_REQUIRED.md.
 */

// Public address used for canonical URLs and link previews (WhatsApp, LinkedIn…). Set
// NEXT_PUBLIC_SITE_URL once the final domain exists; until then Vercel's production domain is used.
const VERCEL_PROD = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL;
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || (VERCEL_PROD ? `https://${VERCEL_PROD}` : "http://localhost:3000")).replace(/\/$/, "");

/** Search engines are blocked until the client approves content and credentials. */
export const ALLOW_INDEXING = process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true";

export const firm = {
  /** Verified: brand manual. Formal name — kept for legal identification (footer, privacy, structured data). */
  name: "Carolina Meirelles & Advogados",
  /** Institutional name to be emphasised (client feedback, Nov 2026). Pending confirmation as the public short name. */
  shortName: "CMA Advogados",
  /** Verified: brand manual + client brief. */
  city: "Brasília",
  state: "DF",
  /** Positioning (November 2026 briefing). */
  specialty: "Advocacia estratégica para patrimônio, negócios e questões de alta complexidade",
  /** Preferred institutional signature (November 2026 briefing). */
  motto: "Excelência jurídica. Visão estratégica.",

  // ——— Pending client confirmation ———
  /** Registro da sociedade de advogados na OAB/DF (required in advertising — Provimento 205/2021). */
  societyRegistration: null as string | null,
  /** Full street address — supplied by the client (Nov 2026). */
  address: "SHIS QI 7, Conjunto 13, Casa 24 – Lago Sul, Brasília - DF, CEP: 71615-330" as string | null,
  email: null as string | null,
  /** Display format, e.g. "+55 61 0000-0000". */
  phone: null as string | null,
  /** International digits only, e.g. "5561900000000" — enables the WhatsApp link. */
  whatsapp: null as string | null,
  officeHours: null as string | null,
  instagram: null as string | null,
  linkedin: null as string | null,
} as const;

export const founder = {
  /** Verified: brand manual names "a advogada Carolina Meirelles". */
  name: "Carolina Meirelles",
  role: "Advogada · Sócia fundadora",
  // ——— Pending client confirmation ———
  oab: null as string | null, // e.g. "OAB/DF 00.000"
  education: null as string[] | null,
  memberships: null as string[] | null,
  /** Approved biography paragraphs. Until supplied, the site shows a neutral introduction. */
  biography: null as string[] | null,
  /**
   * Provisional: cropped from the brand manual's "A sócia." mockup (p. 30), low resolution.
   * Replace with an authentic, client-approved portrait before publication.
   */
  portrait: "/assets/editorial/retrato-ilustrativo.webp" as string | null,
} as const;

export const nav = [
  { href: "/", label: "Início" },
  { href: "/nossa-historia", label: "O Escritório" },
  { href: "/areas-de-atuacao", label: "Serviços" },
  { href: "/equipe", label: "Equipe" },
  { href: "/conhecimento", label: "Conhecimento" },
  { href: "/contato", label: "Contato" },
] as const;

export function whatsappHref(message?: string): string | null {
  if (!firm.whatsapp) return null;
  const text = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${firm.whatsapp}${text}`;
}

export const audiences = [
  {
    key: "empresas",
    number: "I",
    title: "Empresários e Incorporadores",
    short: "Operações, empreendimentos e ativos imobiliários.",
    practices: ["direito-imobiliario", "direito-fundiario", "direito-tributario"],
    text: "Orientação jurídica para operações imobiliárias, incorporações e decisões que envolvem os ativos da empresa.",
  },
  {
    key: "investidores",
    number: "II",
    title: "Investidores e Famílias Empresárias",
    short: "Patrimônio relevante, sucessão e governança.",
    practices: ["sucessorio-patrimonial", "direito-tributario", "direito-imobiliario"],
    text: "Organização do patrimônio, planejamento sucessório, holdings e governança familiar para investidores, famílias empresárias e titulares de patrimônio relevante.",
  },
  {
    key: "proprietarios",
    number: "III",
    title: "Proprietários de Imóveis",
    short: "Compra e venda, regularização e titulação.",
    practices: ["direito-imobiliario", "direito-fundiario"],
    text: "Apoio a quem lida com compra e venda, contratos, regularização, titulação ou locação do seu imóvel.",
  },
] as const;
