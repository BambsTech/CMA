import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContactClose } from "@/components/v3/Sections";
import { artigo, artigos, dataPorExtenso, markdown, pessoa } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { JsonLd, breadcrumbJsonLd } from "@/lib/jsonld";
import { SITE_URL, firm } from "@/content/site";

type Params = { params: Promise<{ slug: string }> };

/** Only published, dated articles get a page. Drafts stay in the CMS. */
export function generateStaticParams() {
  const list = artigos().map((a) => ({ slug: a.slug }));
  // Next requires at least one param for a static dynamic route; this one renders a 404.
  return list.length ? list : [{ slug: "sem-publicacoes" }];
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const a = artigo(slug);
  if (!a) return { robots: { index: false } };
  return pageMetadata({ title: a.seo.titulo || a.titulo, description: a.seo.descricao || a.resumo, path: `/conhecimento/${a.slug}`, type: "article", image: a.imagem ?? undefined });
}

export default async function ArtigoPage({ params }: Params) {
  const { slug } = await params;
  const a = artigo(slug);
  if (!a || !a.data) notFound();
  const autor = a.autor ? pessoa(a.autor) : undefined;

  return (
    <>
      <article className="art" aria-labelledby="page-title">
        <header className="container art__head">
          <p className="label">
            <Link href="/conhecimento">Conhecimento</Link> · {a.categoria}
          </p>
          <h1 id="page-title" className="art__title">
            {a.titulo}
          </h1>
          <p className="art__meta">
            <time dateTime={a.data}>{dataPorExtenso(a.data)}</time>
            {autor && (
              <>
                {" · "}
                <Link href={`/equipe/${autor.slug}`}>{autor.nome}</Link>
              </>
            )}
          </p>
        </header>
        {a.imagem && (
          <div className="container">
            <div className="art__image">
              <Image src={a.imagem} alt="" fill sizes="(min-width: 1024px) 70vw, 100vw" />
            </div>
          </div>
        )}
        <div className="container art__body">
          <p className="art__lead">{a.resumo}</p>
          <div className="prose art__text" dangerouslySetInnerHTML={{ __html: markdown(a.corpo) }} />
          <p className="art__note">Conteúdo informativo. Não constitui parecer jurídico nem substitui a análise do caso concreto.</p>
        </div>
      </article>
      <ContactClose />
      <JsonLd data={breadcrumbJsonLd([{ name: "Início", path: "/" }, { name: "Conhecimento", path: "/conhecimento" }, { name: a.titulo, path: `/conhecimento/${a.slug}` }])} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: a.titulo,
          datePublished: a.data,
          description: a.resumo,
          publisher: { "@id": `${SITE_URL}/#escritorio`, name: firm.shortName },
          ...(autor ? { author: { "@type": "Person", name: autor.nome } } : {}),
          mainEntityOfPage: `${SITE_URL}/conhecimento/${a.slug}`,
        }}
      />
    </>
  );
}
