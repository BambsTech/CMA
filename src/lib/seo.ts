import type { Metadata } from "next";
import { ALLOW_INDEXING, SITE_URL, firm } from "@/content/site";

export const DEFAULT_OG = "/assets/og/cma-og-default.jpg";

type Input = {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
  type?: "website" | "article";
  /** Force noindex (e.g. draft content), regardless of the global switch. */
  noindex?: boolean;
};

export function pageMetadata({ title, description, path, image = DEFAULT_OG, imageAlt, type = "website", noindex }: Input): Metadata {
  const index = ALLOW_INDEXING && !noindex;
  return {
    title,
    description,
    alternates: { canonical: path },
    robots: { index, follow: index },
    openGraph: {
      type,
      locale: "pt_BR",
      siteName: firm.name,
      url: path,
      title,
      description,
      images: [{ url: image, width: 1200, height: 630, alt: imageAlt ?? firm.name }],
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

export function absoluteUrl(path: string) {
  return `${SITE_URL}${path}`;
}
