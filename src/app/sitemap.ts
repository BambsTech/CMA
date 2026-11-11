import type { MetadataRoute } from "next";
import { SITE_URL } from "@/content/site";
import { practices } from "@/content/practices";

export default function sitemap(): MetadataRoute.Sitemap {
  const page = (path: string, priority: number): MetadataRoute.Sitemap[number] => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: "monthly",
    priority,
  });
  return [
    page("/", 1),
    page("/carolina-meirelles", 0.7),
    page("/areas-de-atuacao", 0.9),
    ...practices.map((p) => page(`/areas-de-atuacao/${p.slug}`, 0.85)),
    page("/contato", 0.6),
    page("/privacidade", 0.2),
  ];
}
