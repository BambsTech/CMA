import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "@/components/Icons";
import { firm } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
import { JsonLd, breadcrumbJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = pageMetadata({
  title: "Nossa História",
  description: "A CMA Advogados: escritório boutique de advocacia em Brasília/DF, com excelência técnica, atenção individualizada e discrição.",
  path: "/nossa-historia",
});

/**
 * O Escritório / Nossa História — composed after the client's editorial reference: a
 * quotation mark at the left edge and the firm's statement set large; beneath it, a small
 * index label, a right-aligned caption, a small photograph with the text under it, and a
 * link at the bottom left. Brand colours and fonts. The firm's actual history (dates,
 * milestones) is still to be supplied — nothing here is invented.
 */
export default function NossaHistoriaPage() {
  return (
    <>
      <section className="hx" aria-labelledby="hx-title">
        <div className="container hx__grid">
          <span className="hx__mark" aria-hidden="true">
            “
          </span>
          <h1 id="hx-title" className="hx__quote" data-reveal="">
            <span className="sr-only">Nossa História — </span>
            Advocacia estratégica para patrimônio e negócios, conduzida com profundidade técnica, discrição e atenção a cada cliente.
          </h1>

          <p className="hx__index">(Nossa História)</p>

          <p className="hx__caption">
            {firm.shortName}
            <br />
            {firm.city} · {firm.state}
            <br />
            Escritório boutique
          </p>

          <div className="hx__body">
            <div className="hx__photo" data-reveal="mask">
              <Image
                src="/assets/office/planta.webp"
                alt="Planta em vaso diante de parede de tijolos e viga de madeira, no escritório."
                fill
                sizes="(min-width: 1024px) 10vw, 40vw"
              />
            </div>
            <div className="hx__text" data-reveal="">
              <p>
                A CMA Advogados atua em questões que envolvem patrimônio, negócios e imóveis: Direito Imobiliário, Direito
                Fundiário, Direito Sucessório e Patrimonial e Direito Tributário, tratados em conjunto, porque raramente se
                apresentam isolados.
              </p>
              <p>
                Cada assunto é conduzido diretamente pelos advogados responsáveis, com atenção individualizada, discrição e
                visão de longo prazo, para empresários, investidores, incorporadores, proprietários de imóveis e famílias
                empresárias.
              </p>
            </div>
          </div>

          <Link href="/areas-de-atuacao" className="link-line hx__more">
            Conheça os serviços
            <ArrowRight />
          </Link>
        </div>
      </section>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Início", path: "/" },
          { name: "Nossa História", path: "/nossa-historia" },
        ])}
      />
    </>
  );
}
