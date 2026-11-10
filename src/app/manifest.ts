import type { MetadataRoute } from "next";
import { firm } from "@/content/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: firm.name,
    short_name: firm.shortName,
    lang: "pt-BR",
    start_url: "/",
    display: "standalone",
    background_color: "#CECBC4",
    theme_color: "#301206",
    icons: [
      { src: "/assets/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/assets/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
