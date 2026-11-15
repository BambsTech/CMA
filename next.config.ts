import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 82],
    deviceSizes: [480, 768, 1080, 1440, 1920],
    imageSizes: [160, 320, 480, 640],
  },
  // V2 → V3 (Nov 2026): the six real-estate sub-areas became five integrated areas;
  // the founder's page and "Nossa História" moved under Equipe and O Escritório.
  async redirects() {
    const area = (from: string, to: string) => ({ source: `/areas-de-atuacao/${from}`, destination: `/areas-de-atuacao/${to}`, permanent: true });
    return [
      area("consultoria-e-due-diligence-imobiliaria", "direito-imobiliario"),
      area("elaboracao-e-revisao-de-contratos", "direito-imobiliario"),
      area("locacao-e-condominios", "direito-imobiliario"),
      area("litigios-imobiliarios", "direito-imobiliario"),
      area("regularizacao-de-imoveis", "direito-fundiario"),
      area("direito-registral-e-notarial", "direito-fundiario"),
      { source: "/nossa-historia", destination: "/escritorio", permanent: true },
      { source: "/carolina-meirelles", destination: "/equipe/carolina-meirelles", permanent: true },
      { source: "/sistema", destination: "/marca", permanent: false },
      { source: "/admin", destination: "/admin/index.html", permanent: false },
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
