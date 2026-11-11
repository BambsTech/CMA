import type { Metadata } from "next";
import { AreaRows, ServicesPanel } from "@/components/editorial/ServicesPanel";
import { Closing } from "@/components/Closing";
import { pageMetadata } from "@/lib/seo";
import { JsonLd, breadcrumbJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = pageMetadata({
  title: "Serviços em Direito Imobiliário",
  description:
    "Due diligence, contratos, regularização de imóveis, locação e condomínios, litígios e direito registral e notarial: as áreas de atuação da CMA em Brasília.",
  path: "/areas-de-atuacao",
});

export default function AreasPage() {
  return (
    <>
      <ServicesPanel />
      <AreaRows />
      <Closing heading={["Não sabe por", "onde começar?"]} text="Se a sua situação envolve mais de uma frente — por exemplo, uma compra que depende de regularização prévia —, descreva o contexto. O escritório orienta sobre o encaminhamento mais adequado." />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Início", path: "/" },
          { name: "Serviços", path: "/areas-de-atuacao" },
        ])}
      />
    </>
  );
}
