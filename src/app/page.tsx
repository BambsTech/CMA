import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { AreasIndex } from "@/components/home/AreasIndex";
import { Approach, Audiences, ContactClose, Knowledge, Team } from "@/components/v3/Sections";
import { areas, artigos, equipe, escritorio, numero } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

const TITLE = "CMA Advogados | Advocacia estratégica para patrimônio e negócios";

export const metadata: Metadata = {
  ...pageMetadata({
    title: TITLE,
    description:
      "CMA Advogados, Brasília/DF: advocacia estratégica para patrimônio, negócios e questões de alta complexidade — Direito Imobiliário, Fundiário, Sucessório e Patrimonial e Tributário.",
    path: "/",
  }),
  title: { absolute: TITLE },
};

export default function HomePage() {
  const e = escritorio();
  const list = areas();

  return (
    <>
      {/* 01–02 — Institutional opening → introduction (one continuous movement) */}
      <Hero
        image={{
          desktop: { src: "/assets/architecture/colonnade.webp", width: 1672, height: 941 },
          mobile: { src: "/assets/architecture/colonnade-mobile.webp", width: 900, height: 1600 },
          alt: "Imagem conceitual: colunata de concreto com luz do entardecer.",
          position: "58% 55%",
        }}
        signature={e.assinatura}
        essence={e.essencia}
        intro={{ title: e.introducao.titulo, paragraphs: e.introducao.paragrafos }}
      />

      {/* 03 — Practice areas (signature interaction B) */}
      <AreasIndex
        items={list.map((a) => ({
          slug: a.slug,
          numero: numero(a, list),
          titulo: a.titulo,
          chamada: a.chamada,
          servicos: a.servicos.slice(0, 4).map((s) => s.titulo),
          imagem: a.imagem,
          imagemAlt: a.imagemAlt,
        }))}
        note="Uma aquisição envolve título, estrutura e tributos; uma sucessão envolve imóveis e empresas. As áreas são tratadas em conjunto."
      />

      {/* 04 — The boutique approach (signature interaction C) */}
      <Approach data={e.abordagem} />

      {/* 05 — Who CMA advises */}
      <Audiences items={e.publicos} areas={list} />

      {/* 06 — The firm's people */}
      <Team people={equipe()} />

      {/* 07 — Knowledge */}
      <Knowledge articles={artigos()} compact />

      {/* 08 — Contact */}
      <ContactClose />
    </>
  );
}
