import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Pending } from "@/components/Pending";
import { ContactClose, Portrait } from "@/components/v3/Sections";
import { areas, equipe, pessoa } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { JsonLd, breadcrumbJsonLd } from "@/lib/jsonld";
import { SITE_URL } from "@/content/site";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return equipe().map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const p = pessoa(slug);
  if (!p) return {};
  return pageMetadata({ title: p.nome, description: `${p.nome} — ${p.cargo}, CMA Advogados. ${p.resumo}`, path: `/equipe/${p.slug}` });
}

export default async function PessoaPage({ params }: Params) {
  const { slug } = await params;
  const p = pessoa(slug);
  if (!p) notFound();
  const list = areas().filter((a) => p.areas.includes(a.slug));
  const facts: { k: string; v: React.ReactNode }[] = [
    { k: "Inscrição", v: p.oab ?? <Pending>OAB a confirmar</Pending> },
    { k: "Formação", v: p.formacao.length ? p.formacao.join(" · ") : <Pending /> },
    { k: "Experiência", v: p.experiencia.length ? p.experiencia.join(" · ") : <Pending /> },
    { k: "Idiomas", v: p.idiomas.length ? p.idiomas.join(" · ") : <Pending /> },
  ];

  return (
    <>
      <section className="pf" aria-labelledby="page-title">
        <div className="container pf__grid">
          <div className="pf__photo" data-reveal="mask">
            <Portrait p={p} sizes="(min-width: 1024px) 26vw, 80vw" />
          </div>
          <div className="pf__text">
            <p className="label" data-reveal="fade">
              <Link href="/equipe">Equipe</Link>
            </p>
            <h1 id="page-title" className="pf__name" data-reveal="">
              {p.nome}
            </h1>
            <p className="pf__role" data-reveal="">
              {p.cargo}
            </p>
            <div className="pf__bio" data-reveal="">
              {p.biografia.map((b, i) => (
                <p key={i}>{b}</p>
              ))}
            </div>
            <dl className="pf__facts" data-reveal="">
              {facts.map((f) => (
                <div key={f.k}>
                  <dt>{f.k}</dt>
                  <dd>{f.v}</dd>
                </div>
              ))}
              {list.length > 0 && (
                <div>
                  <dt>Atuação</dt>
                  <dd>
                    {list.map((a, i) => (
                      <span key={a.slug}>
                        <Link href={`/areas-de-atuacao/${a.slug}`}>{a.tituloCurto}</Link>
                        {i < list.length - 1 ? " · " : ""}
                      </span>
                    ))}
                  </dd>
                </div>
              )}
            </dl>
          </div>
        </div>
      </section>
      <ContactClose />
      <JsonLd data={breadcrumbJsonLd([{ name: "Início", path: "/" }, { name: "Equipe", path: "/equipe" }, { name: p.nome, path: `/equipe/${p.slug}` }])} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Person",
          name: p.nome,
          jobTitle: p.cargo,
          worksFor: { "@id": `${SITE_URL}/#escritorio` },
          url: `${SITE_URL}/equipe/${p.slug}`,
        }}
      />
    </>
  );
}
