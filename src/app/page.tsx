import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { HomeSequence } from "@/components/home/HomeSequence";
import { Logo } from "@/components/brand/Logo";
import { FounderPanel } from "@/components/home/FounderPanel";
import { Lines } from "@/components/Lines";
import { Closing } from "@/components/Closing";
import { ArrowRight, ArrowUpRight } from "@/components/Icons";
import { practices } from "@/content/practices";
import { articles, readingMinutes } from "@/content/articles";
import { audiences, firm, founder } from "@/content/site";
import { home } from "@/content/home";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...pageMetadata({
    title: `${firm.name} | Advocacia em Direito Imobiliário em Brasília`,
    description:
      "Assessoria jurídica estratégica em Direito Imobiliário em Brasília/DF para empresas, investidores e proprietários: due diligence, contratos e regularização.",
    path: "/",
  }),
  title: { absolute: `${firm.name} | Advocacia em Direito Imobiliário em Brasília` },
};

function SectionLabel({ n, children }: { n: string; children: React.ReactNode }) {
  return (
    <span className="label label--rule" data-reveal="fade">
      <span className="label__num">{n}</span>
      {children}
    </span>
  );
}

export default function HomePage() {
  const [featured, ...moreArticles] = articles;

  return (
    <>
      {/* 01 — Hero → statement → practice chapters (one continuous sequence) */}
      <HomeSequence
        practices={home.sequence.featured
          .map((slug) => practices.find((p) => p.slug === slug))
          .filter((p) => p !== undefined)
          .map(({ slug, title, summary, image, imageAlt }, i) => ({ slug, number: String(i + 1).padStart(2, "0"), title, summary, image, imageAlt }))}
        copy={{
          caption: home.sequence.caption,
          practicesLabel: home.sequence.practicesLabel,
        }}
      />

      {/* 02 — Statement (manual p. 32): the brand phrase, quiet supporting text */}
      <section className="statement on-dark" aria-labelledby="statement-title">
        <div className="container statement__grid">
          <h2 id="statement-title" className="statement__title" data-reveal="">
            {home.hero.line1}
            <br />
            {home.hero.line2}
          </h2>
          <div className="statement__mark" aria-hidden="true">
            <Logo variant="completo-horizontal" title={null} />
          </div>
          <div className="statement__aside">
            <p className="statement__sub" data-reveal="">
              Advocacia especializada em Direito Imobiliário, em Brasília.
            </p>
            <div className="statement__cols" data-reveal="" style={{ ["--delay" as string]: "120ms" }}>
              <p>{home.intro.lead}</p>
              <p>{home.intro.body}</p>
            </div>
            <Link href="/escritorio" className="link-line statement__link">
              Conheça o escritório
              <ArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* 03 — Who we advise: manual "Conceito" page — title top-left, three short entries low right */}
      <section className="whom" aria-labelledby="whom-title">
        <div className="container whom__grid">
          <span className="label whom__label" data-reveal="fade">
            03 · Para quem
          </span>
          <h2 id="whom-title" className="whom__title" data-reveal="">
            Quem assessoramos.
          </h2>
          <ol className="whom__list" role="list">
            {audiences.map((a, i) => (
              <li key={a.key} data-reveal="" style={{ ["--delay" as string]: `${i * 110}ms` }}>
                <span className="whom__n">{a.number}</span>
                <h3 className="whom__name">{a.title}</h3>
                <p className="whom__line">{a.short}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <FounderPanel
        name={founder.name}
        firstName={founder.name.split(" ")[0]}
        role={`Advogada · ${firm.specialty}`}
        bio={founder.biography ?? home.founder.intro}
        oab={founder.oab}
        education={founder.education}
        portrait={founder.portrait}
        label="04 · Quem conduz"
      />

      {/* 05 — Insights */}
      <section className="section section--paper insights" aria-labelledby="insights-title">
        <div className="container">
          <div className="grid insights__head">
            <div className="insights__label">
              <SectionLabel n="05">Conteúdos</SectionLabel>
            </div>
            <Lines as="h2" id="insights-title" className="t-h1 insights__title" lines={home.insights.title} />
            <Link href="/conteudos" className="link-line insights__all">
              Todos os conteúdos
              <ArrowRight />
            </Link>
          </div>

          <div className="grid insights__grid">
            <article className="feature" data-reveal="">
              <Link href={`/conteudos/${featured.slug}`} className="feature__link">
                <div className="frame frame--wide feature__frame">
                  <Image src={featured.image} alt={featured.imageAlt} fill sizes="(min-width: 1024px) 50vw, 100vw" />
                </div>
                <p className="label feature__meta">
                  <span>{featured.category}</span>
                  <span className="label__num">{readingMinutes(featured)} min de leitura</span>
                </p>
                <h3 className="t-h2 feature__title">{featured.title}</h3>
                <p className="t-body">{featured.excerpt}</p>
              </Link>
            </article>

            <ol className="index-list" role="list">
              {moreArticles.map((a, i) => (
                <li key={a.slug} data-reveal="" style={{ ["--delay" as string]: `${i * 90}ms` }}>
                  <Link href={`/conteudos/${a.slug}`} className="index-list__link">
                    <span className="num index-list__num">{String(i + 2).padStart(2, "0")}</span>
                    <span className="index-list__body">
                      <span className="label">{a.category}</span>
                      <span className="t-h4 index-list__title">{a.title}</span>
                    </span>
                    <ArrowUpRight className="arrow index-list__arrow" />
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <Closing />
    </>
  );
}
