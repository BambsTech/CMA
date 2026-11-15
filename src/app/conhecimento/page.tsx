import type { Metadata } from "next";
import { ServicesPanel } from "@/components/editorial/ServicesPanel";
import { Closing } from "@/components/Closing";
import { pageMetadata } from "@/lib/seo";
import { JsonLd, breadcrumbJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = pageMetadata({
  title: "Conhecimento",
  description: "Artigos, análises e atualizações da CMA Advogados sobre temas imobiliários, fundiários, sucessórios, tributários e patrimoniais.",
  path: "/conhecimento",
});

/**
 * Conhecimento — the Serviços panel's composition with a single line: no article exists yet,
 * so the page does not list topics as if they were sections. Articles appear here once
 * written and reviewed by the firm's lawyers.
 */
export default function ConhecimentoPage() {
  return (
    <>
      <ServicesPanel title="Conhecimento" numbered={false} items={[{ key: "em-preparacao", label: "Publicações em preparação" }]} />
      <Closing />
      <JsonLd data={breadcrumbJsonLd([{ name: "Início", path: "/" }, { name: "Conhecimento", path: "/conhecimento" }])} />
    </>
  );
}
