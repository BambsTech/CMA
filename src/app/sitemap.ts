import type { MetadataRoute } from "next";
import { SITE_URL } from "@/content/site";
import { areas, artigos, equipe } from "@/lib/content";

/** Published content only — drafts and unpublished areas never reach the sitemap. */
export default function sitemap(): MetadataRoute.Sitemap {
  const page = (path: string, priority: number, lastModified?: string): MetadataRoute.Sitemap[number] => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: "monthly",
    priority,
    ...(lastModified ? { lastModified } : {}),
  });
  return [
    page("/", 1),
    page("/escritorio", 0.8),
    page("/areas-de-atuacao", 0.9),
    ...areas().map((a) => page(`/areas-de-atuacao/${a.slug}`, 0.85)),
    page("/equipe", 0.7),
    ...equipe().map((p) => page(`/equipe/${p.slug}`, 0.6)),
    page("/conhecimento", 0.6),
    ...artigos().map((a) => page(`/conhecimento/${a.slug}`, 0.6, a.data ?? undefined)),
    page("/contato", 0.6),
    page("/privacidade", 0.2),
  ];
}
