/**
 * Site-wide constants. Factual firm data lives in /content/contato.json (editable in the
 * CMS); it is imported here so client components can use it too.
 *
 * RULE: every factual value not confirmed by the client is `null` and renders as a
 * discreet "a confirmar" placeholder. Never replace a `null` with a guess.
 */
import contato from "../../content/contato.json";

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");

/** Search engines are blocked until the client approves content and credentials. */
export const ALLOW_INDEXING = process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true";

type C = {
  nomeInstitucional: string;
  nomeFormal: string;
  registroOAB: string | null;
  cidade: string;
  uf: string;
  endereco: string | null;
  email: string | null;
  telefone: string | null;
  whatsapp: string | null;
  horario: string | null;
  instagram: string | null;
  linkedin: string | null;
};
const c = contato as unknown as C;

export const firm = {
  /** Institutional identity (client feedback, Nov 2026: emphasise CMA). */
  shortName: c.nomeInstitucional,
  /** Formal name (brand manual) — kept for legal identification. */
  name: c.nomeFormal,
  city: c.cidade,
  state: c.uf,
  societyRegistration: c.registroOAB,
  address: c.endereco,
  email: c.email,
  phone: c.telefone,
  whatsapp: c.whatsapp,
  officeHours: c.horario,
  instagram: c.instagram,
  linkedin: c.linkedin,
};

export const nav = [
  { href: "/", label: "Início" },
  { href: "/escritorio", label: "O Escritório" },
  { href: "/areas-de-atuacao", label: "Atuação" },
  { href: "/equipe", label: "Equipe" },
  { href: "/conhecimento", label: "Conhecimento" },
  { href: "/contato", label: "Contato" },
] as const;

export function whatsappHref(message?: string): string | null {
  if (!firm.whatsapp) return null;
  return `https://wa.me/${firm.whatsapp}${message ? `?text=${encodeURIComponent(message)}` : ""}`;
}
