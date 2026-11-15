import type { Metadata } from "next";
import { PageHead } from "@/components/v3/PageHead";
import { ContactClose, Team } from "@/components/v3/Sections";
import { equipe } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { JsonLd, breadcrumbJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = pageMetadata({
  title: "Equipe",
  description: "Os profissionais da CMA Advogados: formação, experiência e áreas de atuação, com dados verificáveis.",
  path: "/equipe",
});

export default function EquipePage() {
  return (
    <>
      <PageHead
        label="Equipe"
        title="As pessoas por trás da estratégia."
        lead="Cada assunto é conduzido diretamente pelos advogados responsáveis. Os perfis trazem formação, experiência e áreas de atuação, sempre com informações verificáveis."
      />
      <Team people={equipe()} heading="Profissionais." link={false} />
      <ContactClose />
      <JsonLd data={breadcrumbJsonLd([{ name: "Início", path: "/" }, { name: "Equipe", path: "/equipe" }])} />
    </>
  );
}
