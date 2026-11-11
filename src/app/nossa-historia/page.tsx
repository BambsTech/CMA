import Image from "next/image";
import type { Metadata } from "next";
import { Logo } from "@/components/brand/Logo";
import { Pending } from "@/components/Pending";
import { home } from "@/content/home";
import { pageMetadata } from "@/lib/seo";
import { JsonLd, breadcrumbJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = pageMetadata({
  title: "Nossa História",
  description: "A história do escritório Carolina Meirelles & Advogados, dedicado ao Direito Imobiliário em Brasília/DF.",
  path: "/nossa-historia",
});

/**
 * Nossa História (manual p. 31): espresso field with the title low on the left, a
 * photograph on the right carrying a glass panel. The page ends with the contact call.
 */
export default function NossaHistoriaPage() {
  return (
    <>
      <section className="story on-dark" aria-labelledby="story-title">
        <div className="story__field">
          <h1 id="story-title" className="story__title" data-reveal="">
            {home.story.title[0]}
            <br />
            {home.story.title[1]}
          </h1>
        </div>
        <div className="story__media" data-tone="dark">
          <Image
            src="/assets/architecture/pavilion.webp"
            alt=""
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            style={{ objectFit: "cover", objectPosition: "50% 55%" }}
          />
          <div className="story__glass" data-reveal="">
            <span className="story__tag">{home.story.label}</span>
            <h2 className="story__heading">
              {home.story.heading[0]}
              <br />
              {home.story.heading[1]}
            </h2>
            <div className="story__text">
              {home.story.text.length > 0 ? home.story.text.map((t, i) => <p key={i}>{t}</p>) : <Pending>História do escritório a confirmar</Pending>}
            </div>
          </div>
        </div>
      </section>

      {/* Placeholder story — same composition as the manual's statement page. Replace with the firm's real history. */}
      <section className="story2" aria-labelledby="story2-title">
        <div className="container story2__grid">
          <div>
            <span className="story2__tag">Placeholder · texto provisório</span>
            <h2 id="story2-title" className="story2__lead">
              Uma trajetória construída com objetividade, discrição e atenção aos detalhes.
            </h2>
          </div>
          <div className="story2__foot">
            <div className="story2__cols">
              <p>
                Placeholder. Neste espaço entra a história do escritório: como a advogada Carolina Meirelles iniciou a
                atuação, os motivos da dedicação ao Direito Imobiliário e o que define a forma de trabalhar da equipe.
              </p>
              <p>
                Placeholder. Um segundo parágrafo pode tratar da atuação em Brasília e dos valores que orientam o
                atendimento. O texto definitivo deve ser fornecido e aprovado pelo escritório.
              </p>
            </div>
            <div className="story2__mark" aria-hidden="true">
              <Logo variant="completo-horizontal" title={null} />
            </div>
          </div>
        </div>
      </section>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Início", path: "/" },
          { name: "Nossa História", path: "/nossa-historia" },
        ])}
      />
    </>
  );
}
