import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Closing } from "@/components/Closing";
import { Lines } from "@/components/Lines";
import { ExpandFrame } from "@/components/motion/ExpandFrame";
import { ArrowRight, ArrowUpRight } from "@/components/Icons";
import { articles, getArticle, readingMinutes } from "@/content/articles";
import { getPractice } from "@/content/practices";
import { firm, SITE_URL } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
import { JsonLd, breadcrumbJsonLd } from "@/lib/jsonld";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) return {};
  return pageMetadata({
    title: a.title,
    description: a.metaDescription,
    path: `/conteudos/${a.slug}`,
    type: "article",
    // Drafts stay out of search until legal review is complete.
    noindex: a.status === "draft",
  });
}

export default async function ArticlePage({ params }: Params) {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) notFound();
  const practice = getPractice(a.relatedPractice);
  const others = articles.filter((x) => x.slug !== a.slug).slice(0, 3);
  const crumbs = [
    { name: "Início", path: "/" },
    { name: "Conteúdos", path: "/conteudos" },
    { name: a.title, path: `/conteudos/${a.slug}` },
  ];
  const headings = a.body.filter((b) => b.type === "h2");

  return (
    <>
      <article className="article" aria-labelledby="page-title">
        <header className="article__head">
          <div className="container grid">
            <nav aria-label="Trilha de navegação" className="crumbs article__crumbs">
              <ol role="list">
                <li>
                  <Link href="/">Início</Link>
                </li>
                <li>
                  <Link href="/conteudos">Conteúdos</Link>
                </li>
                <li>
                  <span aria-current="page">{a.category}</span>
                </li>
              </ol>
            </nav>
            <p className="label label--rule article__label" data-reveal="fade">
              {a.category} <span className="label__num">· {readingMinutes(a)} min de leitura</span>
            </p>
            <Lines as="h1" id="page-title" className="t-h1 article__title" lines={[a.title]} />
            <p className="t-lead article__excerpt" data-reveal="">
              {a.excerpt}
            </p>
            {a.status === "draft" && (
              <p className="caption article__status">Texto em revisão jurídica — versão preliminar.</p>
            )}
          </div>
        </header>

        <figure className="container article__figure">
          <ExpandFrame className="frame article__frame" from="inset(0% 18% 0% 18%)" fromCompact="inset(0% 5% 0% 5%)" start="top 90%" end="top 25%">
            <Image src={a.image} alt={a.imageAlt} fill priority sizes="(min-width: 1680px) 1600px, 100vw" />
          </ExpandFrame>
        </figure>

        <div className="container grid article__layout">
          <aside className="article__aside" aria-label="Neste texto">
            {headings.length > 1 && (
              <nav className="article__toc" aria-label="Sumário">
                <p className="label">Neste texto</p>
                <ol role="list">
                  {headings.map((h, i) => (
                    <li key={i}>
                      <a href={`#secao-${i + 1}`}>{h.text}</a>
                    </li>
                  ))}
                </ol>
              </nav>
            )}
            {practice && (
              <Link href={`/areas-de-atuacao/${practice.slug}`} className="article__practice">
                <span className="label">Área relacionada</span>
                <span className="t-h4">{practice.title}</span>
                <ArrowUpRight />
              </Link>
            )}
          </aside>

          <div className="article__body prose">
            {a.body.map((b, i) => {
              if (b.type === "h2") {
                const n = a.body.slice(0, i + 1).filter((x) => x.type === "h2").length;
                return (
                  <h2 key={i} id={`secao-${n}`}>
                    {b.text}
                  </h2>
                );
              }
              if (b.type === "list")
                return (
                  <ul key={i}>
                    {b.items.map((it, j) => (
                      <li key={j}>{it}</li>
                    ))}
                  </ul>
                );
              return <p key={i}>{b.text}</p>;
            })}
            <p className="prose__disclaimer caption">
              Conteúdo de caráter exclusivamente informativo, que não constitui consulta jurídica nem cria relação entre advogado e
              cliente. {firm.name}.
            </p>
          </div>
        </div>
      </article>

      <section className="section section--paper more-reading" aria-labelledby="more-title">
        <div className="container">
          <h2 id="more-title" className="label label--rule">
            Continue lendo
          </h2>
          <ol role="list" className="index-list more-reading__list">
            {others.map((o, i) => (
              <li key={o.slug}>
                <Link href={`/conteudos/${o.slug}`} className="index-list__link">
                  <span className="num index-list__num">{String(i + 1).padStart(2, "0")}</span>
                  <span className="index-list__body">
                    <span className="label">{o.category}</span>
                    <span className="t-h3 index-list__title">{o.title}</span>
                  </span>
                  <ArrowUpRight className="arrow index-list__arrow" />
                </Link>
              </li>
            ))}
          </ol>
          <Link href="/conteudos" className="link-line" style={{ marginTop: "2rem" }}>
            Todos os conteúdos
            <ArrowRight />
          </Link>
        </div>
      </section>

      <Closing />
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: a.title,
          description: a.metaDescription,
          image: `${SITE_URL}${a.image}`,
          inLanguage: "pt-BR",
          publisher: { "@id": `${SITE_URL}/#escritorio`, name: firm.name },
          mainEntityOfPage: `${SITE_URL}/conteudos/${a.slug}`,
        }}
      />
    </>
  );
}
