import type { MetadataRoute } from "next";
import { SITE_URL } from "@/content/site";
import { practices } from "@/content/practices";
import { articles } from "@/content/articles";

export default function sitemap(): MetadataRoute.Sitemap {
  const page = (path: string, priority: number): MetadataRoute.Sitemap[number] => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: "monthly",
    priority,
  });
  return [
    page("/", 1),
    page("/escritorio", 0.8),
    page("/carolina-meirelles", 0.7),
    page("/areas-de-atuacao", 0.9),
    ...practices.map((p) => page(`/areas-de-atuacao/${p.slug}`, 0.85)),
    page("/conteudos", 0.6),
    // Draft articles are excluded until approved after legal review.
    ...articles.filter((a) => a.status !== "draft").map((a) => page(`/conteudos/${a.slug}`, 0.6)),
    page("/contato", 0.6),
    page("/privacidade", 0.2),
  ];
}
