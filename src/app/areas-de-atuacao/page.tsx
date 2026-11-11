import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Closing } from "@/components/Closing";
import { ArrowUpRight } from "@/components/Icons";
import { practices } from "@/content/practices";
import { pageMetadata } from "@/lib/seo";
import { JsonLd, breadcrumbJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = pageMetadata({
  title: "Áreas de atuação em Direito Imobiliário",
  description:
    "Due diligence, contratos, regularização de imóveis, locação e condomínios, litígios e direito registral e notarial: as áreas de atuação da CMA em Brasília.",
  path: "/areas-de-atuacao",
});

export default function AreasPage() {
  return (
    <>
      <PageHero
        label="Direito Imobiliário"
        title={["Áreas de", "atuação."]}
        intro="A atuação do escritório cobre o ciclo jurídico de um imóvel: a análise que antecede o negócio, a formalização, a regularização, a gestão do uso e a solução de conflitos."
        image={{ src: "/assets/architecture/colonnade.webp", alt: "Colunata de concreto com luz do entardecer.", width: 1672, height: 941, position: "50% 55%" }}
      />

      <section className="section section--paper areas-overview" aria-label="Lista das áreas de atuação">
        <div className="container">
          <ol role="list" className="area-cards">
            {practices.map((p, i) => (
              <li key={p.slug} className="area-card" data-reveal="" style={{ ["--delay" as string]: `${(i % 2) * 120}ms` }}>
                <Link href={`/areas-de-atuacao/${p.slug}`} className="area-card__link">
                  <div className="frame area-card__frame">
                    <Image src={p.image} alt={p.imageAlt} fill sizes="(min-width: 900px) 22vw, 40vw" />
                  </div>
                  <div className="area-card__body">
                    <span className="num area-card__num">{p.number}</span>
                    <h2 className="t-h4 area-card__title">{p.title}</h2>
                    <p className="t-small">{p.summary}</p>
                    <span className="link-line area-card__more">
                      Saiba mais
                      <ArrowUpRight />
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <Closing heading={["Não sabe por", "onde começar?"]} text="Se a sua situação envolve mais de uma frente — por exemplo, uma compra que depende de regularização prévia —, descreva o contexto. O escritório orienta sobre o encaminhamento mais adequado." />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Início", path: "/" },
          { name: "Áreas de atuação", path: "/areas-de-atuacao" },
        ])}
      />
    </>
  );
}
