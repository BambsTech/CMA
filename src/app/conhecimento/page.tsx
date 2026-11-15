import type { Metadata } from "next";
import { PageHead } from "@/components/v3/PageHead";
import { ContactClose, Knowledge } from "@/components/v3/Sections";
import { artigos } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { JsonLd, breadcrumbJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = pageMetadata({
  title: "Conhecimento",
  description: "Artigos, análises de decisões, notas e atualizações da CMA Advogados sobre temas imobiliários, fundiários, sucessórios, tributários e patrimoniais.",
  path: "/conhecimento",
});

export default function ConhecimentoPage() {
  return (
    <>
      <PageHead
        label="Conhecimento"
        title="Conhecimento."
        lead="Artigos, análises de decisões, notas e atualizações. Cada texto é escrito e revisado pelos advogados do escritório antes da publicação."
      />
      <Knowledge articles={artigos()} />
      <ContactClose />
      <JsonLd data={breadcrumbJsonLd([{ name: "Início", path: "/" }, { name: "Conhecimento", path: "/conhecimento" }])} />
    </>
  );
}
