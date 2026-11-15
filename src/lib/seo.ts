import type { Metadata } from "next";
import { ALLOW_INDEXING, SITE_URL, firm } from "@/content/site";

/** Link-preview image: the official CM&A logo in stone on espresso, square (WhatsApp shows it as a tile). */
export const DEFAULT_OG = "/assets/og/cma-share.png";

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
      siteName: firm.shortName,
      url: path,
      title,
      description,
      images: [{ url: image, width: 600, height: 600, alt: imageAlt ?? firm.shortName }],
    },
    twitter: { card: "summary", title, description, images: [image] },
  };
}

export function absoluteUrl(path: string) {
  return `${SITE_URL}${path}`;
}
