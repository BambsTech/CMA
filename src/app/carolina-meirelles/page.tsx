import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Closing } from "@/components/Closing";
import { PortraitPlaceholder } from "@/components/PortraitPlaceholder";
import { Pending } from "@/components/Pending";
import { ArrowUpRight } from "@/components/Icons";
import { firm, founder, SITE_URL } from "@/content/site";
import { practices } from "@/content/practices";
import { home } from "@/content/home";
import { pageMetadata } from "@/lib/seo";
import { JsonLd, breadcrumbJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = pageMetadata({
  title: "Carolina Meirelles — advogada",
  description:
    "Perfil profissional de Carolina Meirelles, advogada e sócia fundadora do escritório Carolina Meirelles & Advogados, dedicado ao Direito Imobiliário em Brasília.",
  path: "/carolina-meirelles",
});

export default function CarolinaPage() {
  const crumbs = [
    { name: "Início", path: "/" },
    { name: "O escritório", path: "/escritorio" },
    { name: founder.name, path: "/carolina-meirelles" },
  ];
  const bio = founder.biography ?? home.founder.intro;

  return (
    <>
      <PageHero
        label="Perfil profissional"
        title={["Carolina", "Meirelles."]}
        intro={founder.role}
        crumbs={crumbs}
        image={{
          src: "/assets/architecture/detail-colonnade-rhythm.webp",
          alt: "Imagem conceitual: ritmo de colunas de concreto ao pôr do sol.",
          width: 732,
          height: 941,
          position: "50% 40%",
        }}
        note="Imagem conceitual."
        arch
      />

      <section className="section section--stone profile" aria-label="Biografia e credenciais">
        <div className="container grid">
          <div className="profile__portrait" data-reveal="mask">
            {founder.portrait ? (
              <div className="frame frame--portrait">
                <Image src={founder.portrait} alt={`Retrato de ${founder.name}`} fill sizes="(min-width: 1024px) 34vw, 100vw" />
              </div>
            ) : (
              <PortraitPlaceholder name={founder.name} />
            )}
          </div>

          <div className="profile__body">
            <h2 className="label label--rule">Biografia</h2>
            <div className="profile__bio" data-reveal="">
              {bio.map((p, i) => (
                <p key={i} className={i === 0 ? "t-h3" : "t-body"}>
                  {p}
                </p>
              ))}
            </div>

            <dl className="facts profile__facts" data-reveal="">
              <div>
                <dt className="label">Inscrição</dt>
                <dd>{founder.oab ?? <Pending>OAB/DF a confirmar</Pending>}</dd>
              </div>
              <div>
                <dt className="label">Formação</dt>
                <dd>{founder.education?.length ? founder.education.join(" · ") : <Pending />}</dd>
              </div>
              <div>
                <dt className="label">Associações</dt>
                <dd>{founder.memberships?.length ? founder.memberships.join(" · ") : <Pending />}</dd>
              </div>
              <div>
                <dt className="label">Escritório</dt>
                <dd>
                  {firm.name} · {firm.city}/{firm.state}
                </dd>
              </div>
            </dl>

            <div className="profile__areas" data-reveal="">
              <h2 className="label">Dedicação</h2>
              <ul role="list">
                {practices.map((p) => (
                  <li key={p.slug}>
                    <Link href={`/areas-de-atuacao/${p.slug}`}>
                      <span>{p.title}</span>
                      <ArrowUpRight />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
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
          worksFor: { "@id": `${SITE_URL}/#escritorio`, name: firm.name },
          knowsAbout: "Direito Imobiliário",
          url: `${SITE_URL}/carolina-meirelles`,
        }}
      />
    </>
  );
}
