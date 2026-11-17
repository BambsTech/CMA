import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Logo } from "@/components/brand/Logo";
import { Closing } from "@/components/Closing";
import { Pending } from "@/components/Pending";
import { firm, founder, SITE_URL } from "@/content/site";
import { practices } from "@/content/practices";
import { home } from "@/content/home";
import { pageMetadata } from "@/lib/seo";
import { JsonLd, breadcrumbJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = pageMetadata({
  title: "Carolina Meirelles — advogada",
  description: "Perfil profissional de Carolina Meirelles, advogada da CMA Advogados, em Brasília.",
  path: "/carolina-meirelles",
});

/**
 * Profile — same language as the Equipe page: the name (official logotype) in the top-left
 * corner, the portrait in the middle column, then small labels on the left and justified
 * text in narrow columns. No rules, no arch.
 */
export default function CarolinaPage() {
  const crumbs = [
    { name: "Início", path: "/" },
    { name: "Equipe", path: "/equipe" },
    { name: founder.name, path: "/carolina-meirelles" },
  ];
  const bio = founder.biography ?? home.founder.intro;
  const facts: { k: string; v: React.ReactNode }[] = [
    { k: "Cargo", v: `Advogada · ${firm.shortName}` },
    { k: "Inscrição", v: founder.oab ?? <Pending>OAB/DF a confirmar</Pending> },
    { k: "Formação", v: founder.education?.length ? founder.education.join(" · ") : <Pending /> },
    { k: "Experiência", v: <Pending /> },
    { k: "Idiomas", v: <Pending /> },
    { k: "Associações", v: founder.memberships?.length ? founder.memberships.join(" · ") : <Pending /> },
    { k: "Escritório", v: `${firm.shortName} · ${firm.city}/${firm.state}` },
  ];

  return (
    <>
      <section className="tm" aria-labelledby="pf-title">
        <div className="container tm__grid">
          <h1 id="pf-title" className="tm__name">
            <span className="sr-only">{founder.name}</span>
            <Logo variant="nome-horizontal" title={null} />
          </h1>

          <div className="tm__photo" data-reveal="mask">
            {founder.portrait ? (
              <Image src={founder.portrait} alt="Imagem ilustrativa — retrato oficial a ser fornecido pelo escritório." fill sizes="(min-width: 1024px) 16vw, 50vw" />
            ) : (
              <div className="tm__ph" role="img" aria-label="Retrato a ser fornecido" />
            )}
          </div>

          <p className="tm__note">Imagem ilustrativa</p>

          <p className="tm__label">Biografia</p>

          <div className="tm__cols" data-reveal="">
            <p>{bio[0]}</p>
            <div>
              {bio.slice(1).map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="tm2" aria-label="Dados profissionais e atuação">
        <div className="container tm2__grid pf2__grid">
          <h2 className="tm__label">Dados profissionais</h2>
          <dl className="tm__facts pf2__facts">
            {facts.map((f) => (
              <div key={f.k}>
                <dt>{f.k}</dt>
                <dd>{f.v}</dd>
              </div>
            ))}
          </dl>

          <h2 className="tm__label pf2__label2">Atuação</h2>
          <ul className="pf2__areas" role="list">
            {practices.map((p) => (
              <li key={p.slug}>
                <Link href={`/areas-de-atuacao/${p.slug}`}>{p.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Closing />
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Person",
          name: founder.name,
          jobTitle: "Advogada",
          worksFor: { "@id": `${SITE_URL}/#escritorio`, name: firm.shortName },
          knowsAbout: practices.map((p) => p.title),
          url: `${SITE_URL}/carolina-meirelles`,
        }}
      />
    </>
  );
}
