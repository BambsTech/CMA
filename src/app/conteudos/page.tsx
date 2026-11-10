import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Closing } from "@/components/Closing";
import { ArrowUpRight } from "@/components/Icons";
import { articles, readingMinutes } from "@/content/articles";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Conteúdos sobre Direito Imobiliário",
  description:
    "Textos informativos sobre Direito Imobiliário: due diligence, regularização de imóveis, contratos e riscos jurídicos em transações imobiliárias.",
  path: "/conteudos",
});

export default function ConteudosPage() {
  const [first, ...rest] = articles;
  return (
    <>
      <PageHero
        label="Conteúdos"
        title={["Leituras para", "decisões informadas."]}
        intro="Textos de caráter informativo sobre temas recorrentes do Direito Imobiliário. Não substituem a análise de um caso concreto."
        crumbs={[
          { name: "Início", path: "/" },
          { name: "Conteúdos", path: "/conteudos" },
        ]}
      />

      <section className="section section--paper journal" aria-label="Lista de conteúdos">
        <div className="container">
          <article className="journal-lead" data-reveal="">
            <Link href={`/conteudos/${first.slug}`} className="journal-lead__link">
              <div className="frame journal-lead__frame">
                <Image src={first.image} alt={first.imageAlt} fill sizes="(min-width: 1024px) 58vw, 100vw" />
              </div>
              <div className="journal-lead__text">
                <p className="label">
                  <span className="label__num">01</span> {first.category} · {readingMinutes(first)} min
                </p>
                <h2 className="t-h1">{first.title}</h2>
                <p className="t-body">{first.excerpt}</p>
                <span className="link-line">
                  Ler o texto
                  <ArrowUpRight />
                </span>
              </div>
            </Link>
          </article>

          <ol role="list" className="journal-grid">
            {rest.map((a, i) => (
              <li key={a.slug} data-reveal="" style={{ ["--delay" as string]: `${i * 100}ms` }}>
                <article>
                  <Link href={`/conteudos/${a.slug}`} className="journal-card">
                    <div className="frame journal-card__frame">
                      <Image src={a.image} alt={a.imageAlt} fill sizes="(min-width: 1024px) 30vw, 100vw" />
                    </div>
                    <p className="label">
                      <span className="label__num">{String(i + 2).padStart(2, "0")}</span> {a.category} · {readingMinutes(a)} min
                    </p>
                    <h2 className="t-h3">{a.title}</h2>
                    <p className="t-small">{a.excerpt}</p>
                  </Link>
                </article>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <Closing />
    </>
  );
}
