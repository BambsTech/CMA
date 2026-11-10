import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArtImage } from "@/components/ArtImage";
import { Parallax } from "@/components/Parallax";
import { Lines } from "@/components/Lines";
import { PracticeIndex } from "@/components/PracticeIndex";
import { PortraitPlaceholder } from "@/components/PortraitPlaceholder";
import { Pending } from "@/components/Pending";
import { Closing } from "@/components/Closing";
import { ArrowDown, ArrowRight, ArrowUpRight } from "@/components/Icons";
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
      {/* 01 — Hero ------------------------------------------------------------ */}
      <section className="hero on-dark" aria-labelledby="hero-title">
        <div className="hero__media">
          <Parallax speed={0.22} zoom>
            <ArtImage
              className="hero__picture"
              desktop={{ src: "/assets/architecture/colonnade.webp", width: 1672, height: 941 }}
              mobile={{ src: "/assets/architecture/colonnade-mobile.webp", width: 900, height: 1600 }}
              alt=""
              priority
              position="58% 50%"
            />
          </Parallax>
          <div className="hero__shade" />
        </div>

        <div className="container hero__inner">
          <h1 id="hero-title" className="hero__title">
            <span className="hero__kicker label" data-reveal="fade" style={{ ["--delay" as string]: "200ms" }}>
              {home.hero.kicker}
            </span>
            <span className="lines t-mega" data-reveal="" style={{ ["--delay" as string]: "300ms" }}>
              <span className="line">
                <span style={{ ["--i" as string]: 0 }}>{home.hero.line1}</span>
              </span>
              <span className="line hero__line-2">
                <span style={{ ["--i" as string]: 1 }}>{home.hero.line2}</span>
              </span>
            </span>
          </h1>

          <div className="hero__aside" data-reveal="" style={{ ["--delay" as string]: "750ms" }}>
            <p className="hero__lede">{home.hero.lede}</p>
            <div className="hero__links">
              <Link href="/escritorio" className="link-line">
                Conheça o escritório
                <ArrowRight />
              </Link>
              <a href="#areas" className="link-line link-line--down">
                Áreas de atuação
                <ArrowDown />
              </a>
            </div>
          </div>

          <div className="hero__foot" data-reveal="fade" style={{ ["--delay" as string]: "1000ms" }}>
            <a href="#escritorio" className="hero__scroll" aria-label="Rolar para a próxima seção">
              <span className="hero__scroll-line" aria-hidden="true" />
              <span className="caption">Rolar</span>
            </a>
            <span className="caption hero__coords">
              {firm.city} · {firm.state}
            </span>
          </div>
        </div>
      </section>

      {/* 02 — Introduction / philosophy -------------------------------------- */}
      <section className="section section--stone intro" id="escritorio" aria-labelledby="intro-title">
        <div className="container">
          <div className="intro__top">
            <SectionLabel n="02">O escritório</SectionLabel>
            <Lines as="h2" id="intro-title" className="t-display intro__statement" lines={home.intro.statement} />
          </div>

          <div className="grid intro__body">
            <figure className="intro__figure">
              <div className="frame frame--tall" data-reveal="mask">
                <Parallax speed={0.1}>
                  <Image
                    src="/assets/architecture/detail-leaf-shadow.webp"
                    alt="Imagem conceitual: parede de concreto com sombras de folhagem sob luz do fim de tarde."
                    width={560}
                    height={840}
                    sizes="(min-width: 1024px) 28vw, 80vw"
                  />
                </Parallax>
              </div>
              <figcaption className="concept-note">Fig. 01 — Luz e sombra. Imagem conceitual.</figcaption>
            </figure>

            <div className="intro__text" data-reveal="">
              <p className="t-lead">{home.intro.lead}</p>
              <p className="t-body">{home.intro.body}</p>
              <Link href="/escritorio" className="link-line">
                Conheça o escritório
                <ArrowRight />
              </Link>
            </div>

            <ol className="intro__values" role="list">
              {home.intro.values.map((v, i) => (
                <li key={v.title} data-reveal="" style={{ ["--delay" as string]: `${i * 90}ms` }}>
                  <span className="num">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="t-h4">{v.title}</h3>
                  <p className="t-small">{v.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* 03 — Practice areas ------------------------------------------------- */}
      <section className="section section--paper practices" id="areas" aria-labelledby="areas-title">
        <div className="container">
          <PracticeIndex practices={practices}>
            <SectionLabel n="03">Áreas de atuação</SectionLabel>
            <Lines as="h2" id="areas-title" className="t-h1 practices__title" lines={["Áreas de", "atuação."]} />
            <p className="t-body practices__intro" data-reveal="">
              {home.practices.intro}
            </p>
            <Link href="/areas-de-atuacao" className="link-line practices__all">
              Visão geral das áreas
              <ArrowRight />
            </Link>
          </PracticeIndex>
        </div>
      </section>

      {/* 04 — Who we advise -------------------------------------------------- */}
      <section className="section section--taupe audiences" aria-labelledby="aud-title">
        <div className="container">
          <div className="grid audiences__head">
            <div className="audiences__label">
              <SectionLabel n="04">Para quem</SectionLabel>
            </div>
            <Lines as="h2" id="aud-title" className="t-h1 audiences__title" lines={home.audiences.title} />
            <p className="t-body audiences__intro" data-reveal="">
              {home.audiences.intro}
            </p>
          </div>

          <ol className="audiences__cols" role="list">
            {audiences.map((a, i) => {
              const related = a.practices.map((slug) => practices.find((p) => p.slug === slug)).filter((p) => p !== undefined);
              return (
                <li key={a.key} className="audience" data-reveal="" style={{ ["--delay" as string]: `${i * 120}ms` }}>
                  <span className="audience__num" aria-hidden="true">
                    {a.number}
                  </span>
                  <h3 className="t-h3 audience__title">{a.title}</h3>
                  <p className="t-small audience__text">{a.text}</p>
                  <ul className="audience__links" role="list" aria-label={`Áreas relacionadas — ${a.title}`}>
                    {related.map((p) => (
                      <li key={p.slug}>
                        <Link href={`/areas-de-atuacao/${p.slug}`}>
                          <span>{p.shortTitle}</span>
                          <ArrowUpRight />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* 05 — Carolina Meirelles --------------------------------------------- */}
      <section className="section section--stone founder" aria-labelledby="founder-title">
        <div className="container grid founder__grid">
          <div className="founder__portrait" data-reveal="mask">
            {founder.portrait ? (
              <div className="frame frame--portrait">
                <Image src={founder.portrait} alt={`Retrato de ${founder.name}`} fill sizes="(min-width: 1024px) 40vw, 100vw" />
              </div>
            ) : (
              <PortraitPlaceholder name={founder.name} />
            )}
          </div>

          <div className="founder__content">
            <SectionLabel n="05">A sócia</SectionLabel>
            <Lines as="h2" id="founder-title" className="t-display founder__name" lines={["Carolina", "Meirelles."]} />
            <p className="caption founder__role" data-reveal="fade">
              {founder.role}
            </p>
            <div className="founder__bio" data-reveal="">
              {(founder.biography ?? home.founder.intro).map((p, i) => (
                <p key={i} className={i === 0 ? "t-lead" : "t-body"}>
                  {p}
                </p>
              ))}
            </div>
            <dl className="facts" data-reveal="">
              <div>
                <dt className="label">Inscrição</dt>
                <dd>{founder.oab ?? <Pending>OAB/DF a confirmar</Pending>}</dd>
              </div>
              <div>
                <dt className="label">Formação</dt>
                <dd>{founder.education ? founder.education.join(" · ") : <Pending />}</dd>
              </div>
              <div>
                <dt className="label">Atuação</dt>
                <dd>{firm.specialty}</dd>
              </div>
            </dl>
            <Link href="/carolina-meirelles" className="link-line">
              Perfil completo
              <ArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* 06 — Brasília -------------------------------------------------------- */}
      <section className="place on-dark" aria-labelledby="place-title">
        <div className="place__media">
          <Parallax speed={0.18}>
            <ArtImage
              desktop={{ src: "/assets/architecture/pavilion.webp", width: 1672, height: 941 }}
              mobile={{ src: "/assets/architecture/pavilion-mobile.webp", width: 900, height: 1600 }}
              alt="Imagem conceitual: pavilhão de concreto com fachada de vidro e colunas sob o sol poente."
              sizes="100vw"
              position="50% 55%"
            />
          </Parallax>
          <div className="place__shade" />
        </div>
        <div className="container place__inner">
          <SectionLabel n="06">Lugar</SectionLabel>
          <div className="place__body">
            <Lines as="h2" id="place-title" className="t-mega place__title" lines={["Brasília."]} />
            <p className="num place__coords" data-reveal="fade">
              15°47′ S — 47°52′ O
            </p>
            <p className="t-lead place__text" data-reveal="">
              {home.place.text}
            </p>
          </div>
          <p className="concept-note place__note">Imagem conceitual. Não retrata um edifício real nem as instalações do escritório.</p>
        </div>
      </section>

      {/* 07 — Insights -------------------------------------------------------- */}
      <section className="section section--paper insights" aria-labelledby="insights-title">
        <div className="container">
          <div className="grid insights__head">
            <div className="insights__label">
              <SectionLabel n="07">Conteúdos</SectionLabel>
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

      {/* 08 — Contact / closing ---------------------------------------------- */}
      <Closing />
    </>
  );
}
