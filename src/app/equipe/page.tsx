import type { Metadata } from "next";
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

/** Team — opens straight onto the homepage's team panel (full-height photograph, glass panel). Only verified professionals are listed. */
export default function EquipePage() {
  return (
    <>
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
        heading="As pessoas por trás da estratégia."
      />
      <Closing />
      <JsonLd data={breadcrumbJsonLd([{ name: "Início", path: "/" }, { name: "Equipe", path: "/equipe" }])} />
    </>
  );
}
