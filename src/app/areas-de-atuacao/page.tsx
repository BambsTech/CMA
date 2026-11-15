import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "@/components/Icons";
import { PageHead } from "@/components/v3/PageHead";
import { ContactClose } from "@/components/v3/Sections";
import { areas, numero } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { JsonLd, breadcrumbJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = pageMetadata({
  title: "Áreas de atuação",
  description: "Direito Imobiliário, Direito Fundiário, Direito Sucessório e Patrimonial e Direito Tributário — áreas conectadas, tratadas em conjunto.",
  path: "/areas-de-atuacao",
});

export default function AreasPage() {
  const list = areas();
  return (
    <>
      <PageHead
        label="Atuação"
        title="Áreas de atuação."
        lead="A CMA concentra sua atuação em questões que envolvem imóveis, patrimônio e negócios. As áreas se conectam: cada matéria é examinada também à luz das demais."
      />

      <section className="aix" aria-label="Áreas">
        <div className="container">
          <ol className="aix__list" role="list">
            {list.map((a) => (
              <li key={a.slug} className="aix__item" data-reveal="">
                <Link href={`/areas-de-atuacao/${a.slug}`} className="aix__link">
                  <span className="aix__n num">{numero(a, list)}</span>
                  <span className="aix__name">{a.titulo}</span>
                  <span className="aix__frame">
                    <Image src={a.imagem} alt="" fill sizes="(min-width: 1024px) 18vw, 40vw" />
                  </span>
                  <span className="aix__chamada">{a.chamada}</span>
                  <span className="aix__servicos">{a.servicos.map((s) => s.titulo).join(" · ")}</span>
                  <span className="aix__go">
                    Conhecer a área
                    <ArrowRight />
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="links" aria-labelledby="links-title">
        <div className="container links__grid">
          <h2 id="links-title" className="links__title" data-reveal="">
            Como as áreas se conectam.
          </h2>
          <ul className="links__list" role="list">
            {list.flatMap((a) =>
              a.conexoes
                .filter((c) => list.some((x) => x.slug === c.area))
                .slice(0, 1)
                .map((c) => {
                  const to = list.find((x) => x.slug === c.area)!;
                  return (
                    <li key={a.slug + c.area} data-reveal="">
                      <p className="links__pair">
                        <Link href={`/areas-de-atuacao/${a.slug}`}>{a.tituloCurto}</Link>
                        <span aria-hidden="true"> — </span>
                        <span className="sr-only"> e </span>
                        <Link href={`/areas-de-atuacao/${to.slug}`}>{to.tituloCurto}</Link>
                      </p>
                      <p>{c.texto}</p>
                    </li>
                  );
                }),
            )}
          </ul>
        </div>
      </section>

      <ContactClose />
      <JsonLd data={breadcrumbJsonLd([{ name: "Início", path: "/" }, { name: "Áreas de atuação", path: "/areas-de-atuacao" }])} />
    </>
  );
}
