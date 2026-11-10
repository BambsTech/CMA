import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { Closing } from "@/components/Closing";
import { Lines } from "@/components/Lines";
import { ArrowRight, ArrowUpRight } from "@/components/Icons";
import { getPractice, practices } from "@/content/practices";
import { articles } from "@/content/articles";
import { audiences, firm } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
import { JsonLd, breadcrumbJsonLd } from "@/lib/jsonld";
import { SITE_URL } from "@/content/site";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return practices.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const p = getPractice(slug);
  if (!p) return {};
  return {
    ...pageMetadata({ title: p.title, description: p.metaDescription, path: `/areas-de-atuacao/${p.slug}` }),
    keywords: p.keywords,
  };
}

export default async function PracticePage({ params }: Params) {
  const { slug } = await params;
  const p = getPractice(slug);
  if (!p) notFound();

  const index = practices.findIndex((x) => x.slug === p.slug);
  const next = practices[(index + 1) % practices.length];
  const related = p.related.map((s) => getPractice(s)).filter((x) => x !== undefined);
  const forWhom = audiences.filter((a) => p.audiences.includes(a.key));
  const reading = articles.filter((a) => a.relatedPractice === p.slug);
  const crumbs = [
    { name: "Início", path: "/" },
    { name: "Áreas de atuação", path: "/areas-de-atuacao" },
    { name: p.shortTitle, path: `/areas-de-atuacao/${p.slug}` },
  ];

  return (
    <>
      <PageHero
        label={`Área ${p.number} / 0${practices.length}`}
        title={splitTitle(p.title)}
        intro={p.summary}
        crumbs={crumbs}
        image={{ src: p.image, alt: p.imageAlt, width: 900, height: 1200 }}
        note="Imagem conceitual."
      />

      {/* Lead */}
      <section className="section section--stone practice-lead" aria-label="Apresentação">
        <div className="container grid">
          <p className="t-h3 practice-lead__text" data-reveal="">
            {p.lead}
          </p>
          <aside className="practice-lead__aside" data-reveal="" style={{ ["--delay" as string]: "150ms" }}>
            <h2 className="label">Para quem</h2>
            <ul role="list">
              {forWhom.map((a) => (
                <li key={a.key}>
                  <span className="num">{a.number}</span> {a.title}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      {/* Scope */}
      <section className="section section--paper scope" aria-labelledby="scope-title">
        <div className="container grid">
          <div className="scope__head">
            <span className="label label--rule" data-reveal="fade">
              <span className="label__num">A</span>
              Escopo
            </span>
            <Lines as="h2" id="scope-title" className="t-h1" lines={["O que", "envolve."]} />
          </div>
          <ol role="list" className="scope__list">
            {p.scope.map((s, i) => (
              <li key={s.title} data-reveal="" style={{ ["--delay" as string]: `${(i % 2) * 90}ms` }}>
                <span className="num">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="t-h4">{s.title}</h3>
                <p className="t-small">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Situations */}
      <section className="section section--espresso on-dark situations" aria-labelledby="sit-title">
        <div className="container grid">
          <div className="situations__head">
            <span className="label label--rule" data-reveal="fade">
              <span className="label__num">B</span>
              Situações
            </span>
            <Lines as="h2" id="sit-title" className="t-h1" lines={["Quando buscar", "orientação."]} />
          </div>
          <ul role="list" className="situations__list">
            {p.situations.map((s, i) => (
              <li key={i} data-reveal="" style={{ ["--delay" as string]: `${i * 60}ms` }}>
                <span className="situations__mark" aria-hidden="true" />
                <p className="t-lead">{s}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Approach */}
      <section className="section section--stone approach" aria-labelledby="appr-title">
        <div className="container">
          <div className="grid approach__head">
            <span className="label label--rule" data-reveal="fade">
              <span className="label__num">C</span>
              Método
            </span>
            <Lines as="h2" id="appr-title" className="t-h1 approach__title" lines={["Como", "atuamos."]} />
          </div>
          <ol role="list" className="approach__steps">
            {p.approach.map((s, i) => (
              <li key={s.title} data-reveal="" style={{ ["--delay" as string]: `${i * 110}ms` }}>
                <span className="approach__n">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="t-h4">{s.title}</h3>
                <p className="t-small">{s.text}</p>
              </li>
            ))}
          </ol>

          <div className="grid basis">
            <h2 className="label basis__label">Referências normativas</h2>
            <ul role="list" className="basis__list">
              {p.legalBasis.map((b) => (
                <li key={b} className="caption">
                  {b}
                </li>
              ))}
            </ul>
            <p className="caption basis__note">
              Referências indicativas. A aplicação de cada norma depende da análise do caso concreto.
            </p>
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="section section--paper related" aria-labelledby="rel-title">
        <div className="container">
          <div className="related__head">
            <h2 id="rel-title" className="label label--rule">
              Áreas relacionadas
            </h2>
            {reading.length > 0 && (
              <p className="t-small">
                Leitura sugerida:{" "}
                {reading.map((a, i) => (
                  <span key={a.slug}>
                    {i > 0 && " · "}
                    <Link className="inline-link" href={`/conteudos/${a.slug}`}>
                      {a.title}
                    </Link>
                  </span>
                ))}
              </p>
            )}
          </div>
          <ul role="list" className="related__list">
            {related.map((r) => (
              <li key={r.slug}>
                <Link href={`/areas-de-atuacao/${r.slug}`} className="related__link">
                  <div className="frame related__frame">
                    <Image src={r.image} alt="" fill sizes="(min-width: 900px) 12vw, 30vw" />
                  </div>
                  <span className="num">{r.number}</span>
                  <span className="t-h3 related__title">{r.title}</span>
                  <ArrowUpRight className="arrow related__arrow" />
                </Link>
              </li>
            ))}
          </ul>
          <Link href={`/areas-de-atuacao/${next.slug}`} className="next-area" aria-label={`Próxima área: ${next.title}`}>
            <span className="label">Próxima área · {next.number}</span>
            <span className="t-h2">{next.title}</span>
            <ArrowRight />
          </Link>
        </div>
      </section>

      <Closing heading={["Vamos", "conversar."]} />
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: p.title,
          serviceType: "Direito Imobiliário",
          description: p.metaDescription,
          areaServed: { "@type": "City", name: "Brasília" },
          provider: { "@id": `${SITE_URL}/#escritorio`, name: firm.name },
          url: `${SITE_URL}/areas-de-atuacao/${p.slug}`,
        }}
      />
    </>
  );
}

/** Breaks long practice titles into two balanced display lines. */
function splitTitle(title: string): string[] {
  const words = title.split(" ");
  if (words.length < 3) return [title];
  let best = 1;
  let bestDiff = Infinity;
  for (let i = 1; i < words.length; i++) {
    const a = words.slice(0, i).join(" ").length;
    const b = words.slice(i).join(" ").length;
    const diff = Math.abs(a - b);
    // avoid ending a line on a short connective
    if (["e", "de", "em", "para", "do", "da"].includes(words[i - 1].toLowerCase())) continue;
    if (diff < bestDiff) {
      bestDiff = diff;
      best = i;
    }
  }
  return [words.slice(0, best).join(" "), words.slice(best).join(" ")];
}
