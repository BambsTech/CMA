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
 * Conhecimento — the editorial lines from the November 2026 briefing, in the Serviços panel's
 * composition. No article is published until written and reviewed by the firm's lawyers.
 */
const lines = [
  "Direito Imobiliário",
  "Direito Fundiário",
  "Planejamento Sucessório",
  "Tributação Patrimonial",
  "Decisões dos Tribunais Superiores",
];

export default function ConhecimentoPage() {
  return (
    <>
      <ServicesPanel title="Conhecimento" items={lines.map((l) => ({ key: l, label: l }))} />
      <Closing
        heading={["Publicações em preparação."]}
        text="Artigos, análises de decisões e notas técnicas serão publicados aqui após revisão pelos advogados do escritório."
      />
      <JsonLd data={breadcrumbJsonLd([{ name: "Início", path: "/" }, { name: "Conhecimento", path: "/conhecimento" }])} />
    </>
  );
}
