/**
 * Central firm configuration.
 *
 * RULE: every factual value that has NOT been confirmed by the client is `null`.
 * The UI renders `null` values as a discreet "a confirmar" placeholder (see <Pending/>),
 * and structured data omits them entirely. Never replace a `null` with a guess.
 * Track all pending items in CLIENT_APPROVAL_REQUIRED.md.
 */

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");

/** Search engines are blocked until the client approves content and credentials. */
export const ALLOW_INDEXING = process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true";

export const firm = {
  /** Verified: brand manual. */
  name: "Carolina Meirelles & Advogados",
  shortName: "CMA",
  /** Verified: brand manual + client brief. */
  city: "Brasília",
  state: "DF",
  /** Verified: brand manual ("Advocacia especializada em Direito Imobiliário"). */
  specialty: "Direito Imobiliário",
  /** Brand phrase used in the manual's own applications. */
  motto: "Objetividade e inteligência.",

  // ——— Pending client confirmation ———
  /** Registro da sociedade de advogados na OAB/DF (required in advertising — Provimento 205/2021). */
  societyRegistration: null as string | null,
  /** Full street address. Not shown until confirmed. */
  address: null as string | null,
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
  portrait: "/assets/editorial/portrait-manual.webp" as string | null,
} as const;

export const nav = [
  { href: "/", label: "Início" },
  { href: "/areas-de-atuacao", label: "Áreas de Atuação" },
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
    title: "Empresas e Empreendimentos",
    short: "Operações e ativos imobiliários da empresa.",
    practices: ["consultoria-e-due-diligence-imobiliaria", "elaboracao-e-revisao-de-contratos", "locacao-e-condominios", "litigios-imobiliarios"],
    text: "Orientação jurídica para operações imobiliárias empresariais, empreendimentos e decisões que envolvem ativos imobiliários da empresa.",
  },
  {
    key: "investidores",
    number: "II",
    title: "Investidores e Patrimônio",
    short: "Aquisições, riscos e gestão patrimonial.",
    practices: ["consultoria-e-due-diligence-imobiliaria", "elaboracao-e-revisao-de-contratos", "direito-registral-e-notarial", "regularizacao-de-imoveis"],
    text: "Análise de riscos, estruturação de aquisições e acompanhamento de transações ligadas a investimentos e à gestão patrimonial.",
  },
  {
    key: "proprietarios",
    number: "III",
    title: "Proprietários de Imóveis",
    short: "Compra e venda, regularização, locação e conflitos.",
    practices: ["regularizacao-de-imoveis", "locacao-e-condominios", "litigios-imobiliarios", "direito-registral-e-notarial"],
    text: "Apoio a pessoas que lidam com compra e venda, contratos, regularização documental, locação ou conflitos envolvendo seu imóvel.",
  },
] as const;
