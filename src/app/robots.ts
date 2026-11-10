import type { MetadataRoute } from "next";
import { ALLOW_INDEXING, SITE_URL } from "@/content/site";

export default function robots(): MetadataRoute.Robots {
  if (!ALLOW_INDEXING) {
    // Pre-launch: keep the site out of search engines until content and credentials are approved.
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/"] }],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
