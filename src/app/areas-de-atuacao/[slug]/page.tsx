import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight } from "@/components/Icons";
import { ExpandFrame } from "@/components/motion/ExpandFrame";
import { ContactClose, Portrait } from "@/components/v3/Sections";
import { area, areas, equipe, escritorio, numero } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { JsonLd, breadcrumbJsonLd } from "@/lib/jsonld";
import { SITE_URL, firm } from "@/content/site";

type Params = { params: Promise<{ slug: string }> };

/** Only published areas get a page (Tribunais Superiores stays unpublished until confirmed). */
export function generateStaticParams() {
  return areas().map((a) => ({ slug: a.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const a = area(slug);
  if (!a) return {};
  return pageMetadata({ title: a.seo.titulo || a.titulo, description: a.seo.descricao || a.chamada, path: `/areas-de-atuacao/${a.slug}`, imageAlt: a.imagemAlt });
}

export default async function AreaPage({ params }: Params) {
  const { slug } = await params;
  const a = area(slug);
  if (!a) notFound();

  const list = areas();
  const i = list.findIndex((x) => x.slug === a.slug);
  const next = list[(i + 1) % list.length];
  const connected = a.conexoes.map((c) => ({ ...c, to: list.find((x) => x.slug === c.area) })).filter((c) => c.to);
  const publicos = escritorio().publicos.filter((p) => a.publicos.includes(p.chave));
  const people = equipe().filter((p) => p.areas.includes(a.slug));
  const crumbs = [
    { name: "Início", path: "/" },
    { name: "Áreas de atuação", path: "/areas-de-atuacao" },
    { name: a.titulo, path: `/areas-de-atuacao/${a.slug}` },
  ];

  return (
    <>
      {/* Opening: number and title in the top-left corner, the photograph on the right. */}
      <section className="ah on-dark" aria-labelledby="page-title" data-tone="dark">
        <div className="container ah__grid">
          <div className="ah__text">
            <p className="label" data-reveal="fade">
              <Link href="/areas-de-atuacao">Atuação</Link> · {numero(a, list)}
            </p>
            <h1 id="page-title" className="ah__title" data-reveal="">
              {a.titulo}
            </h1>
            <p className="ah__lead" data-reveal="" style={{ ["--delay" as string]: "150ms" }}>
              {a.chamada}
            </p>
          </div>
          <div className="ah__media">
            <ExpandFrame className="ah__frame" from="inset(0% 0% 0% 55%)" fromCompact="inset(0% 0% 0% 25%)" zoom={1.08} start="top 100%" end="bottom 45%">
              <Image src={a.imagem} alt={a.imagemAlt} fill priority sizes="(min-width: 1024px) 40vw, 100vw" />
            </ExpandFrame>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="ai" aria-label="Apresentação">
        <div className="container ai__grid">
          <p className="ai__text" data-reveal="">
            {a.introducao}
          </p>
          {publicos.length > 0 && (
            <div className="ai__aside" data-reveal="">
              <p className="label">Para quem</p>
              <ul role="list">
                {publicos.map((p) => (
                  <li key={p.chave}>{p.titulo}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      {/* Services */}
      <section className="as" aria-labelledby="as-title">
        <div className="container as__grid">
          <h2 id="as-title" className="as__title" data-reveal="">
            O que envolve.
          </h2>
          <ol className="as__list" role="list">
            {a.servicos.map((s, j) => (
              <li key={s.titulo} data-reveal="" style={{ ["--delay" as string]: `${(j % 3) * 80}ms` }}>
                <span className="as__n">{String(j + 1).padStart(2, "0")}</span>
                <h3 className="as__name">{s.titulo}</h3>
                <p>{s.texto}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Connections */}
      {connected.length > 0 && (
        <section className="acx on-dark" aria-labelledby="acx-title" data-tone="dark">
          <div className="container acx__grid">
            <div className="acx__head">
              <p className="label" data-reveal="fade">
                Integração
              </p>
              <h2 id="acx-title" className="acx__title" data-reveal="">
                Conexões com outras áreas.
              </h2>
            </div>
            <ul className="acx__list" role="list">
              {connected.map((c) => (
                <li key={c.area} data-reveal="">
                  <Link href={`/areas-de-atuacao/${c.to!.slug}`} className="acx__link">
                    <span className="acx__name">{c.to!.titulo}</span>
                    <ArrowRight />
                  </Link>
                  <p>{c.texto}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* People */}
      {people.length > 0 && (
        <section className="apeople" aria-labelledby="ap-title">
          <div className="container apeople__grid">
            <h2 id="ap-title" className="label">
              Profissionais
            </h2>
            <ul className="apeople__list" role="list">
              {people.map((p) => (
                <li key={p.slug}>
                  <Link href={`/equipe/${p.slug}`} className="apeople__link">
                    <Portrait p={p} sizes="10rem" />
                    <span className="apeople__name">{p.nome}</span>
                    <span className="apeople__role">{p.cargo}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Next area */}
      {list.length > 1 && (
        <section className="anext" aria-label="Próxima área">
          <div className="container">
            <Link href={`/areas-de-atuacao/${next.slug}`} className="anext__link">
              <span className="label">Próxima área · {numero(next, list)}</span>
              <span className="anext__name">{next.titulo}</span>
              <ArrowRight />
            </Link>
          </div>
        </section>
      )}

      <ContactClose />
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: a.titulo,
          description: a.introducao,
          areaServed: { "@type": "City", name: "Brasília" },
          provider: { "@id": `${SITE_URL}/#escritorio`, name: firm.shortName },
          url: `${SITE_URL}/areas-de-atuacao/${a.slug}`,
        }}
      />
    </>
  );
}
