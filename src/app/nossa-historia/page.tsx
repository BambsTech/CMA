import Image from "next/image";
import type { Metadata } from "next";
import { Logo } from "@/components/brand/Logo";
import { Pending } from "@/components/Pending";
import { home } from "@/content/home";
import { pageMetadata } from "@/lib/seo";
import { JsonLd, breadcrumbJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = pageMetadata({
  title: "Nossa História",
  description: "A CMA Advogados: escritório boutique de advocacia em Brasília/DF, com excelência técnica, atenção individualizada e discrição.",
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

      {/* Institutional description (November 2026 briefing) — same composition as the manual's statement page.
          The firm's actual history (dates, milestones) is still to be supplied; nothing is invented here. */}
      <section className="story2" aria-labelledby="story2-title">
        <div className="container story2__grid">
          <div>
            <span className="story2__tag">Modelo de atuação</span>
            <h2 id="story2-title" className="story2__lead">
              Profundidade técnica, visão de negócios e relacionamento próximo.
            </h2>
          </div>
          <div className="story2__foot">
            <div className="story2__cols">
              <p>
                A CMA Advogados atua em questões que envolvem patrimônio, negócios e imóveis: Direito Imobiliário, Direito
                Fundiário, Direito Sucessório e Patrimonial e Direito Tributário, tratados em conjunto, porque raramente se
                apresentam isolados.
              </p>
              <p>
                Cada assunto é conduzido diretamente pelos advogados responsáveis, com atenção individualizada, discrição e
                visão de longo prazo, para empresários, investidores, incorporadores, proprietários de imóveis e famílias
                empresárias.
              </p>
            </div>
            <div className="story2__mark story2__mark--cma" aria-hidden="true">
              <Logo variant="monograma" title={null} />
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
