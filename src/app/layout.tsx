import type { Metadata, Viewport } from "next";
import "@fontsource-variable/encode-sans/wght.css";
import "@fontsource-variable/karla/wght.css";
import "@fontsource-variable/roboto-slab/wght.css";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RevealObserver } from "@/components/RevealObserver";
import { RouteScroll } from "@/components/RouteScroll";
import { ALLOW_INDEXING, SITE_URL, firm } from "@/content/site";
import { DEFAULT_OG } from "@/lib/seo";
import { JsonLd, organizationJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${firm.shortName} | Advocacia estratégica para patrimônio e negócios`,
    template: `%s | ${firm.shortName}`,
  },
  description:
    "CMA Advogados, Brasília/DF: advocacia estratégica para patrimônio, negócios e questões de alta complexidade.",
  applicationName: firm.shortName,
  robots: { index: ALLOW_INDEXING, follow: ALLOW_INDEXING },
  openGraph: { locale: "pt_BR", siteName: firm.shortName, type: "website", images: [{ url: DEFAULT_OG, width: 1200, height: 630 }] },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: "#301206",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        {/* Enables progressive-enhancement motion styles before first paint. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <a href="#conteudo" className="skip-link">
          Pular para o conteúdo
        </a>
        <Header />
        <main id="conteudo" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        <RevealObserver />
        <RouteScroll />
        <JsonLd data={organizationJsonLd()} />
      </body>
    </html>
  );
}
