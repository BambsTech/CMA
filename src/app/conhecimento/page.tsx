import type { Metadata } from "next";
import { Closing } from "@/components/Closing";
import { pageMetadata } from "@/lib/seo";
import { JsonLd, breadcrumbJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = pageMetadata({
  title: "Conhecimento",
  description: "Artigos, análises e atualizações da CMA Advogados sobre temas imobiliários, fundiários, sucessórios, tributários e patrimoniais.",
  path: "/conhecimento",
});

/**
 * The first publications suggested by the November 2026 briefing (section 11). They are
 * shown as forthcoming titles only — no text, date or author is invented. When an article
 * is written and reviewed, its entry becomes a link with its real date.
 */
const forthcoming = [
  { cat: "Planejamento sucessório", title: "Planejamento sucessório: quando começar e quais decisões considerar." },
  { cat: "Direito imobiliário", title: "Due diligence imobiliária: o que verificar antes de adquirir um imóvel de alto valor." },
  { cat: "Direito fundiário", title: "Regularização fundiária: desafios documentais e registrais mais comuns." },
  { cat: "Tributação patrimonial", title: "Holding patrimonial: objetivos, limites e cuidados tributários." },
  { cat: "Tribunais superiores", title: "O impacto de decisões recentes dos tribunais superiores em operações patrimoniais." },
];

/** Same taupe panel as Serviços: entries on the right, the title pale and low. */
export default function ConhecimentoPage() {
  return (
    <>
      <section className="svc" aria-labelledby="svc-title">
        <div className="container svc__inner">
          <ol className="svc__list svc__entries" role="list">
            {forthcoming.map((f) => (
              <li key={f.title} className="svc__entry">
                <p className="svc__entry-meta">
                  <span>{f.cat}</span>
                  <span className="svc__entry-status">Em preparação</span>
                </p>
                <h2 className="svc__entry-title">{f.title}</h2>
              </li>
            ))}
          </ol>
          <div className="svc__foot">
            <h1 id="svc-title" className="svc__title">
              Conhecimento
            </h1>
          </div>
        </div>
      </section>
      <Closing />
      <JsonLd data={breadcrumbJsonLd([{ name: "Início", path: "/" }, { name: "Conhecimento", path: "/conhecimento" }])} />
    </>
  );
}
