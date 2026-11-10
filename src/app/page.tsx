import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { HomeSequence } from "@/components/home/HomeSequence";
import { FounderReveal } from "@/components/home/FounderReveal";
import { ExpandFrame } from "@/components/motion/ExpandFrame";
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
        city={firm.city}
        practices={practices.map(({ slug, number, title, summary, image, imageAlt }) => ({ slug, number, title, summary, image, imageAlt }))}
        copy={{
          kicker: home.hero.kicker,
          line1: home.hero.line1,
          line2: home.hero.line2,
          lede: home.hero.lede,
          statementLabel: home.sequence.statementLabel,
          statement: home.intro.lead,
          values: home.intro.values.map((v) => v.title),
          practicesLabel: home.sequence.practicesLabel,
          practicesIntro: home.sequence.practicesIntro,
        }}
      />

      {/* 02 — Who we advise: a fine-ruled index */}
      <section className="section ledger" aria-labelledby="ledger-title">
        <div className="container">
          <div className="grid ledger__head">
            <SectionLabel n="02">Para quem</SectionLabel>
            <Lines as="h2" id="ledger-title" className="t-h1" lines={home.audiences.title} />
            <p className="t-body" data-reveal="">
              {home.audiences.intro}
            </p>
          </div>

          <div className="ledger__table" role="list">
            <div className="ledger__cols label" aria-hidden="true">
              <span />
              <span>Perfil</span>
              <span>Contexto</span>
              <span>Áreas relacionadas</span>
            </div>
            {audiences.map((a, i) => {
              const related = a.practices.map((slug) => practices.find((p) => p.slug === slug)).filter((p) => p !== undefined);
              return (
                <div key={a.key} className="ledger__row" role="listitem" data-reveal="" style={{ ["--delay" as string]: `${i * 90}ms` }}>
                  <span className="ledger__num" aria-hidden="true">
                    {a.number}
                  </span>
                  <h3 className="t-h3 ledger__title">{a.title}</h3>
                  <p className="t-small ledger__text">{a.text}</p>
                  <ul className="ledger__links" role="list" aria-label={`Áreas relacionadas — ${a.title}`}>
                    {related.map((p) => (
                      <li key={p.slug}>
                        <Link href={`/areas-de-atuacao/${p.slug}`}>{p.shortTitle}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 03 — Founder: architecture resolves into the portrait */}
      <FounderReveal
        name={founder.name}
        role={founder.role}
        bio={founder.biography ?? home.founder.intro}
        oab={founder.oab}
        education={founder.education}
        specialty={firm.specialty}
        portrait={founder.portrait}
      />

      {/* 04 — Brasília: a window that opens onto the horizon */}
      <section className="place2 on-dark" aria-labelledby="place-title">
        <div className="container place2__head">
          <SectionLabel n="04">Lugar</SectionLabel>
          <p className="num place2__coords" data-reveal="fade">
            15°47′ S — 47°52′ O
          </p>
        </div>
        <ExpandFrame className="place2__frame" from="inset(0% 22% 0% 22%)" tone="dark">
          <Image
            src="/assets/architecture/pavilion.webp"
            alt="Imagem conceitual: pavilhão de concreto com fachada de vidro e colunas sob o sol poente."
            fill
            sizes="100vw"
            style={{ objectFit: "cover", objectPosition: "50% 55%" }}
          />
          <div className="place2__shade" />
          <h2 id="place-title" className="place2__title">
            Brasília.
          </h2>
        </ExpandFrame>
        <div className="container grid place2__body">
          <p className="t-lead place2__text" data-reveal="">
            {home.place.text}
          </p>
          <p className="concept-note place2__note">Imagem conceitual. Não retrata um edifício real nem as instalações do escritório.</p>
        </div>
      </section>

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
