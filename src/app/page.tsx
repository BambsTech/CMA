import Image from "next/image";
import type { Metadata } from "next";
import { HomeSequence } from "@/components/home/HomeSequence";
import { Logo } from "@/components/brand/Logo";
import { FounderPanel } from "@/components/home/FounderPanel";
import { Closing } from "@/components/Closing";
import { Pending } from "@/components/Pending";
import { practices } from "@/content/practices";
import { audiences, firm, founder } from "@/content/site";
import { home } from "@/content/home";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...pageMetadata({
    title: `${firm.name} | Advocacia em Direito Imobiliário em Brasília`,
    description:
      "Assessoria jurídica estratégica em Direito Imobiliário em Brasília/DF para empresas, investidores e proprietários: due diligence, contratos e regularização.",
    path: "/",
  }),
  title: { absolute: `${firm.name} | Advocacia em Direito Imobiliário em Brasília` },
};

export default function HomePage() {
  return (
    <>
      {/* 01 — Hero → statement → practice chapters (one continuous sequence) */}
      <HomeSequence
        practices={home.sequence.featured
          .map((slug) => practices.find((p) => p.slug === slug))
          .filter((p) => p !== undefined)
          .map(({ slug, title, summary, image, imageAlt }, i) => ({ slug, number: String(i + 1).padStart(2, "0"), title, summary, image, imageAlt }))}
        copy={{
          caption: home.sequence.caption,
          practicesLabel: home.sequence.practicesLabel,
        }}
      />

      {/* 02 — Statement (manual p. 32): the brand phrase, quiet supporting text */}
      <section className="statement on-dark" aria-labelledby="statement-title">
        <div className="container statement__grid">
          <h2 id="statement-title" className="statement__title" data-reveal="">
            {home.hero.line1}
            <br />
            {home.hero.line2}
          </h2>
          <div className="statement__mark" aria-hidden="true">
            <Logo variant="completo-horizontal" title={null} />
          </div>
          <div className="statement__aside">
            <p className="statement__sub" data-reveal="">
              Advocacia especializada em Direito Imobiliário, em Brasília.
            </p>
            <div className="statement__cols" data-reveal="" style={{ ["--delay" as string]: "120ms" }}>
              <p>{home.intro.lead}</p>
              <p>{home.intro.body}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 03 — Who we advise: manual "Conceito" page — title top-left, three short entries low right */}
      <section className="whom" aria-labelledby="whom-title">
        <div className="container whom__grid">
          <span className="label whom__label" data-reveal="fade">
            03 · Para quem
          </span>
          <h2 id="whom-title" className="whom__title" data-reveal="">
            Quem assessoramos.
          </h2>
          <ol className="whom__list" role="list">
            {audiences.map((a, i) => (
              <li key={a.key} data-reveal="" style={{ ["--delay" as string]: `${i * 110}ms` }}>
                <span className="whom__n">{a.number}</span>
                <h3 className="whom__name">{a.title}</h3>
                <p className="whom__line">{a.short}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Nossa História (manual p. 31): espresso field with the title low on the left,
          a photograph on the right carrying a glass panel. */}
      <section className="story on-dark" aria-labelledby="story-title">
        <div className="story__field">
          <h2 id="story-title" className="story__title" data-reveal="">
            {home.story.title[0]}
            <br />
            {home.story.title[1]}
          </h2>
        </div>
        <div className="story__media" data-tone="dark">
          <Image src="/assets/architecture/pavilion.webp" alt="" fill sizes="(min-width: 1024px) 50vw, 100vw" style={{ objectFit: "cover", objectPosition: "50% 55%" }} />
          <div className="story__glass" data-reveal="">
            <span className="story__tag">{home.story.label}</span>
            <h3 className="story__heading">
              {home.story.heading[0]}
              <br />
              {home.story.heading[1]}
            </h3>
            <div className="story__text">
              {home.story.text.length > 0 ? home.story.text.map((t, i) => <p key={i}>{t}</p>) : <Pending>História do escritório a confirmar</Pending>}
            </div>
          </div>
        </div>
      </section>

      <FounderPanel
        name={founder.name}
        firstName={founder.name.split(" ")[0]}
        role={`Advogada · ${firm.specialty}`}
        bio={founder.biography ?? home.founder.intro}
        oab={founder.oab}
        education={founder.education}
        portrait={founder.portrait}
        label="04 · Quem conduz"
      />

      <Closing />
    </>
  );
}
