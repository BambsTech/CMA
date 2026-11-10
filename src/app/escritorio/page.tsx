import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Closing } from "@/components/Closing";
import { Lines } from "@/components/Lines";
import { Parallax } from "@/components/Parallax";
import { PortraitPlaceholder } from "@/components/PortraitPlaceholder";
import { ArrowRight } from "@/components/Icons";
import { founder } from "@/content/site";
import { practices } from "@/content/practices";
import { pageMetadata } from "@/lib/seo";
import { JsonLd, breadcrumbJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = pageMetadata({
  title: "O escritório",
  description:
    "Carolina Meirelles & Advogados: escritório especializado em Direito Imobiliário em Brasília, com atuação objetiva, discreta e atenta aos detalhes.",
  path: "/escritorio",
});

// [PROPOSTA] — copy for client approval. Principles cited in the manual: segurança, agilidade, transparência.
const principles = [
  { title: "Objetividade", text: "Orientação direta, com foco no que é relevante para a decisão e sem excesso de linguagem técnica." },
  { title: "Segurança", text: "Cada recomendação parte da leitura cuidadosa dos documentos e do contexto da operação." },
  { title: "Transparência", text: "Riscos, alternativas, etapas e responsabilidades são expostos com clareza desde o início." },
  { title: "Discrição", text: "Assuntos patrimoniais exigem reserva. O sigilo profissional orienta toda a relação com o cliente." },
];

const process = [
  { title: "Escuta", text: "Entendimento do objetivo, do cronograma e das pessoas envolvidas." },
  { title: "Análise", text: "Levantamento e leitura da documentação do imóvel e das partes." },
  { title: "Estratégia", text: "Definição do caminho jurídico adequado, com os riscos de cada alternativa." },
  { title: "Acompanhamento", text: "Condução das etapas e comunicação objetiva até a conclusão do trabalho." },
];

export default function EscritorioPage() {
  const crumbs = [
    { name: "Início", path: "/" },
    { name: "O escritório", path: "/escritorio" },
  ];
  return (
    <>
      <PageHero
        label="O escritório"
        title={["Clareza na estrutura,", "precisão no detalhe."]}
        intro="Somos um escritório especializado em Direito Imobiliário, oferecendo assessoria jurídica estratégica para clientes que buscam segurança, agilidade e transparência em transações e disputas imobiliárias."
        crumbs={crumbs}
        image={{ src: "/assets/architecture/corridor.webp", alt: "Imagem conceitual: galeria de concreto com sombras suaves ao entardecer.", width: 1672, height: 941 }}
        note="Imagem conceitual. Não retrata as instalações do escritório."
      />

      <section className="section section--stone manifesto" aria-labelledby="manifesto-title">
        <div className="container grid">
          <span className="label label--rule manifesto__label" data-reveal="fade">
            <span className="label__num">01</span>
            Posicionamento
          </span>
          <Lines
            as="h2"
            id="manifesto-title"
            className="t-h1 manifesto__title"
            lines={["Poucos elementos,", "um olhar apurado", "para os detalhes."]}
          />
          <div className="manifesto__text" data-reveal="">
            <p className="t-lead">
              O escritório nasce do trabalho objetivo e eficiente da advogada Carolina Meirelles e se dedica a um campo
              específico: as questões jurídicas que envolvem imóveis.
            </p>
            <p className="t-body">
              Negócios imobiliários reúnem patrimônio, documentos, prazos e expectativas. Nosso papel é organizar esse
              conjunto, identificar o que exige atenção e conduzir cada etapa com método — seja na análise que antecede
              uma compra, na redação de um contrato, na regularização de um imóvel ou na solução de um conflito.
            </p>
          </div>
        </div>
      </section>

      <section className="section section--paper principles" aria-labelledby="principles-title">
        <div className="container">
          <div className="grid principles__head">
            <span className="label label--rule" data-reveal="fade">
              <span className="label__num">02</span>
              Princípios
            </span>
            <Lines as="h2" id="principles-title" className="t-h1 principles__title" lines={["O que orienta", "o trabalho."]} />
          </div>
          <ol role="list" className="principles__list">
            {principles.map((p, i) => (
              <li key={p.title} data-reveal="" style={{ ["--delay" as string]: `${i * 90}ms` }}>
                <span className="num">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="t-h3">{p.title}</h3>
                <p className="t-small">{p.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="strip on-dark" aria-hidden="true">
        <Parallax speed={0.25}>
          <Image src="/assets/architecture/detail-floor-light.webp" alt="" fill sizes="100vw" style={{ objectFit: "cover" }} />
        </Parallax>
      </section>

      <section className="section section--stone process" aria-labelledby="process-title">
        <div className="container grid">
          <div className="process__head">
            <span className="label label--rule" data-reveal="fade">
              <span className="label__num">03</span>
              Método
            </span>
            <Lines as="h2" id="process-title" className="t-h1" lines={["Como", "trabalhamos."]} />
            <p className="t-body" data-reveal="">
              Cada demanda tem seu próprio desenho. Ainda assim, o percurso costuma seguir quatro movimentos.
            </p>
          </div>
          <ol role="list" className="process__list">
            {process.map((s, i) => (
              <li key={s.title} data-reveal="" style={{ ["--delay" as string]: `${i * 90}ms` }}>
                <span className="approach__n">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="t-h3">{s.title}</h3>
                  <p className="t-small">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section section--paper founder-teaser" aria-labelledby="teaser-title">
        <div className="container grid">
          <div className="founder-teaser__portrait" data-reveal="mask">
            {founder.portrait ? (
              <div className="frame frame--portrait">
                <Image src={founder.portrait} alt={`Retrato de ${founder.name}`} fill sizes="30vw" />
              </div>
            ) : (
              <PortraitPlaceholder name={founder.name} />
            )}
          </div>
          <div className="founder-teaser__text">
            <span className="label label--rule" data-reveal="fade">
              <span className="label__num">04</span>
              Quem conduz
            </span>
            <Lines as="h2" id="teaser-title" className="t-display" lines={["Carolina", "Meirelles."]} />
            <p className="t-body" data-reveal="">
              Advogada e sócia fundadora, Carolina Meirelles está à frente da atuação do escritório em Direito Imobiliário.
            </p>
            <Link href="/carolina-meirelles" className="link-line">
              Perfil profissional
              <ArrowRight />
            </Link>
          </div>
          <div className="founder-teaser__areas" data-reveal="">
            <h3 className="label">Áreas de atuação</h3>
            <ul role="list">
              {practices.map((p) => (
                <li key={p.slug}>
                  <Link href={`/areas-de-atuacao/${p.slug}`}>
                    <span className="num">{p.number}</span> {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <Closing />
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
    </>
  );
}
