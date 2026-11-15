import type { Metadata } from "next";
import { PageHead } from "@/components/v3/PageHead";
import { Approach, Audiences, ContactClose } from "@/components/v3/Sections";
import { areas, escritorio } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { JsonLd, breadcrumbJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = pageMetadata({
  title: "O Escritório",
  description: "A CMA é um escritório boutique de advocacia em Brasília: profundidade técnica, visão de negócios e atendimento próximo, com discrição.",
  path: "/escritorio",
});

export default function EscritorioPage() {
  const e = escritorio();
  return (
    <>
      <PageHead label="O Escritório" title="Um escritório boutique de advocacia." lead={e.essencia} image={{ src: "/assets/architecture/pavilion.webp", alt: "Imagem conceitual: pavilhão de concreto com luz do entardecer." }}>
        <div className="ph__cols" data-reveal="" style={{ ["--delay" as string]: "250ms" }}>
          {e.introducao.paragrafos.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </PageHead>

      <Approach data={e.abordagem} />

      {/* Service model */}
      <section className="steps" aria-labelledby="steps-title">
        <div className="container steps__grid">
          <div className="steps__head">
            <p className="label" data-reveal="fade">
              Atendimento
            </p>
            <h2 id="steps-title" className="steps__title" data-reveal="">
              Como o trabalho é conduzido.
            </h2>
          </div>
          <ol className="steps__list" role="list">
            {e.modeloDeAtendimento.map((s, i) => (
              <li key={s.titulo} data-reveal="" style={{ ["--delay" as string]: `${i * 100}ms` }}>
                <span className="steps__n">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="steps__name">{s.titulo}</h3>
                <p>{s.texto}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Values */}
      <section className="vals on-dark" aria-labelledby="vals-title" data-tone="dark">
        <div className="container vals__grid">
          <p className="label" id="vals-title">
            Valores
          </p>
          <ul className="vals__list" role="list">
            {e.valores.map((v, i) => (
              <li key={v} data-reveal="" style={{ ["--delay" as string]: `${i * 70}ms` }}>
                {v}
              </li>
            ))}
          </ul>
          <p className="vals__phrase">{e.fraseOriginal}</p>
        </div>
      </section>

      {e.historia.publicado && (
        <section className="hist" aria-labelledby="hist-title">
          <div className="container hist__grid">
            <h2 id="hist-title" className="hist__title">
              {e.historia.titulo}
            </h2>
            <div className="hist__cols">
              {e.historia.paragrafos.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </section>
      )}

      <Audiences items={e.publicos} areas={areas()} />
      <ContactClose />
      <JsonLd data={breadcrumbJsonLd([{ name: "Início", path: "/" }, { name: "O Escritório", path: "/escritorio" }])} />
    </>
  );
}
