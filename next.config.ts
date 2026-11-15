import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 82],
    deviceSizes: [480, 768, 1080, 1440, 1920],
    imageSizes: [160, 320, 480, 640],
    // Placeholder stock photographs of Brasília (Unsplash), served from their CDN.
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com", pathname: "/photo-**" }],
  },
  // November 2026: six real-estate sub-areas became the briefing's integrated areas.
  async redirects() {
    const area = (from: string, to: string) => ({ source: `/areas-de-atuacao/${from}`, destination: `/areas-de-atuacao/${to}`, permanent: true });
    return [
      area("consultoria-e-due-diligence-imobiliaria", "direito-imobiliario"),
      area("elaboracao-e-revisao-de-contratos", "direito-imobiliario"),
      area("locacao-e-condominios", "direito-imobiliario"),
      area("litigios-imobiliarios", "direito-imobiliario"),
      area("regularizacao-de-imoveis", "direito-fundiario"),
      area("direito-registral-e-notarial", "direito-fundiario"),
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
