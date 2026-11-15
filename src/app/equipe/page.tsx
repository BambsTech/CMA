import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { FounderPanel } from "@/components/home/FounderPanel";
import { Logo } from "@/components/brand/Logo";
import { Closing } from "@/components/Closing";
import { firm, founder } from "@/content/site";
import { home } from "@/content/home";
import { pageMetadata } from "@/lib/seo";
import { JsonLd, breadcrumbJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = pageMetadata({
  title: "Equipe",
  description: "Os profissionais da CMA Advogados, em Brasília/DF. Perfis com informações verificáveis.",
  path: "/equipe",
});

/** Team — same page head as Contato and the homepage's team panel. Only verified professionals are listed. */
export default function EquipePage() {
  return (
    <>
      <PageHero
        label=""
        dark
        title={["As pessoas por trás da estratégia."]}
        intro="Na CMA Advogados, cada assunto é conduzido diretamente pelos advogados responsáveis. Os perfis trazem apenas informações verificáveis."
      />
      <FounderPanel
        name={founder.name}
        firstName={founder.name.split(" ")[0]}
        role={`Advogada · ${firm.shortName}`}
        bio={founder.biography ?? home.founder.intro}
        oab={founder.oab}
        education={founder.education}
        portrait={founder.portrait}
        label=""
        nameMark={<Logo variant="nome-horizontal" title={null} />}
      />
      <Closing />
      <JsonLd data={breadcrumbJsonLd([{ name: "Início", path: "/" }, { name: "Equipe", path: "/equipe" }])} />
    </>
  );
}
