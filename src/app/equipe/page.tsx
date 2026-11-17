import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Logo } from "@/components/brand/Logo";
import { Closing } from "@/components/Closing";
import { Pending } from "@/components/Pending";
import { firm, founder } from "@/content/site";
import { home } from "@/content/home";
import { pageMetadata } from "@/lib/seo";
import { JsonLd, breadcrumbJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = pageMetadata({
  title: "Equipe",
  description: "Os profissionais da CMA Advogados, em Brasília/DF. Perfis com informações verificáveis.",
  path: "/equipe",
});

/**
 * Team — composed after the client's reference: the name large in the top-left corner,
 * a portrait in the middle column, then a small label on the left and two justified
 * columns of text (no rule). Below, three further profiles in the same small format.
 * Only verified professionals are named; the other slots wait for confirmed members.
 */
const others = [1, 2, 3];

export default function EquipePage() {
  const bio = founder.biography ?? home.founder.intro;
  return (
    <>
      <section className="tm" aria-labelledby="tm-title">
        <div className="container tm__grid">
          <h1 id="tm-title" className="tm__name">
            <span className="sr-only">{founder.name}</span>
            <Logo variant="nome-horizontal" title={null} />
          </h1>

          <div className="tm__photo" data-reveal="mask">
            {founder.portrait ? (
              <Image src={founder.portrait} alt={`Retrato de ${founder.name}`} fill sizes="(min-width: 1024px) 16vw, 50vw" />
            ) : (
              <div className="tm__ph" role="img" aria-label="Retrato a ser fornecido" />
            )}
          </div>

          <p className="tm__label">Sobre</p>

          <div className="tm__cols" data-reveal="">
            <p>{bio[0]}</p>
            <div>
              {bio.slice(1).map((p, i) => (
                <p key={i}>{p}</p>
              ))}
              <dl className="tm__facts">
                <div>
                  <dt>Cargo</dt>
                  <dd>Advogada · {firm.shortName}</dd>
                </div>
                <div>
                  <dt>Inscrição</dt>
                  <dd>{founder.oab ?? <Pending>OAB/DF a confirmar</Pending>}</dd>
                </div>
                <div>
                  <dt>Formação</dt>
                  <dd>{founder.education?.length ? founder.education.join(" · ") : <Pending />}</dd>
                </div>
              </dl>
              <Link href="/carolina-meirelles" className="link-line tm__more">
                Perfil completo →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="tm2" aria-labelledby="tm2-title">
        <div className="container tm2__grid">
          <h2 id="tm2-title" className="tm__label">
            Equipe
          </h2>
          <ul className="tm2__list" role="list">
            {others.map((n) => (
              <li key={n} className="tm2__person">
                <div className="tm2__photo tm__ph" role="img" aria-label="Retrato a ser fornecido" />
                <p className="tm2__name">
                  <Pending>Nome a confirmar</Pending>
                </p>
                <p className="tm2__role">Advogado(a) · {firm.shortName}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Closing />
      <JsonLd data={breadcrumbJsonLd([{ name: "Início", path: "/" }, { name: "Equipe", path: "/equipe" }])} />
    </>
  );
}
