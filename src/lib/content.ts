/**
 * Content layer — reads the JSON files in /content (edited through the CMS at /admin).
 *
 * Server-only (uses the filesystem at build time). Every public accessor filters out
 * unpublished items, so a draft can never appear on the site by accident:
 *   · areas:   `publicado: false`  → no page, no link, not in the sitemap
 *   · equipe:  `publicado: false`  → idem
 *   · artigos: `status !== "publicado"` or no `data` → idem
 */
import fs from "node:fs";
import path from "node:path";
import { marked } from "marked";

const ROOT = path.join(process.cwd(), "content");

function readJson<T>(rel: string): T {
  return JSON.parse(fs.readFileSync(path.join(ROOT, rel), "utf8")) as T;
}

function readDir<T>(dir: string): T[] {
  const abs = path.join(ROOT, dir);
  if (!fs.existsSync(abs)) return [];
  return fs
    .readdirSync(abs)
    .filter((f) => f.endsWith(".json"))
    .map((f) => readJson<T>(path.join(dir, f)));
}

/* ——— Types ——— */

export type Servico = { titulo: string; texto: string };
export type Conexao = { area: string; texto: string };
export type Seo = { titulo?: string | null; descricao?: string | null };

export type Area = {
  slug: string;
  ordem: number;
  publicado: boolean;
  notaInterna?: string;
  titulo: string;
  tituloCurto: string;
  chamada: string;
  introducao: string;
  servicos: Servico[];
  conexoes: Conexao[];
  publicos: string[];
  imagem: string;
  imagemAlt: string;
  seo: Seo;
};

export type Pessoa = {
  slug: string;
  ordem: number;
  publicado: boolean;
  nome: string;
  cargo: string;
  oab: string | null;
  foto: string | null;
  fotoAlt: string;
  resumo: string;
  biografia: string[];
  formacao: string[];
  experiencia: string[];
  idiomas: string[];
  areas: string[];
};

export type Artigo = {
  slug: string;
  status: "rascunho" | "revisao" | "publicado";
  titulo: string;
  categoria: string;
  data: string | null;
  autor: string | null;
  resumo: string;
  corpo: string;
  imagem: string | null;
  seo: Seo;
};

export type Publico = { chave: string; titulo: string; texto: string; areas: string[] };
export type Tema = { titulo: string; texto: string };

export type Escritorio = {
  assinatura: [string, string];
  essencia: string;
  assinaturaAlternativa: string;
  fraseOriginal: string;
  introducao: { titulo: string; paragrafos: string[] };
  abordagem: { titulo: string; texto: string; temas: Tema[] };
  valores: string[];
  publicos: Publico[];
  modeloDeAtendimento: Tema[];
  historia: { publicado: boolean; titulo: string; paragrafos: string[] };
};

export type Contato = {
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

/* ——— Accessors ——— */

export const escritorio = (): Escritorio => readJson<Escritorio>("escritorio.json");
export const contato = (): Contato => readJson<Contato>("contato.json");

/** Every area, published or not — for internal tools only (CMS preview, /marca). */
export const todasAsAreas = (): Area[] => readDir<Area>("areas").sort((a, b) => a.ordem - b.ordem);
/** Published areas only. */
export const areas = (): Area[] => todasAsAreas().filter((a) => a.publicado);
export const area = (slug: string): Area | undefined => areas().find((a) => a.slug === slug);
export const numero = (a: Area, list = areas()) => String(list.findIndex((x) => x.slug === a.slug) + 1).padStart(2, "0");

export const equipe = (): Pessoa[] =>
  readDir<Pessoa>("equipe")
    .filter((p) => p.publicado)
    .sort((a, b) => a.ordem - b.ordem);
export const pessoa = (slug: string) => equipe().find((p) => p.slug === slug);

const isPublished = (a: Artigo) => a.status === "publicado" && !!a.data;
export const todosOsArtigos = (): Artigo[] => readDir<Artigo>("artigos");
export const artigos = (): Artigo[] =>
  todosOsArtigos()
    .filter(isPublished)
    .sort((a, b) => (b.data ?? "").localeCompare(a.data ?? ""));
export const artigo = (slug: string) => artigos().find((a) => a.slug === slug);

/** Editorial lines (categories) — the five subjects named in the briefing. */
export const linhasEditoriais = [
  "Direito Imobiliário",
  "Direito Fundiário",
  "Planejamento Sucessório",
  "Tributação Patrimonial",
  "Decisões dos Tribunais Superiores",
] as const;

export function markdown(md: string): string {
  return marked.parse(md, { async: false, gfm: true }) as string;
}

export function dataPorExtenso(iso: string): string {
  const d = new Date(iso + (iso.length === 10 ? "T12:00:00" : ""));
  return d.toLocaleDateString("pt-BR", { day: "numeric", month: "long", year: "numeric" });
}

/** WhatsApp link only once a number is confirmed. */
export function whatsappHref(c: Contato, message?: string): string | null {
  if (!c.whatsapp) return null;
  return `https://wa.me/${c.whatsapp}${message ? `?text=${encodeURIComponent(message)}` : ""}`;
}
