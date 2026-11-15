import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@/components/Icons";
import { Pending } from "@/components/Pending";
import { ExpandFrame } from "@/components/motion/ExpandFrame";
import { CmaMark } from "@/components/brand/Cma";
import type { Area, Artigo, Escritorio, Pessoa } from "@/lib/content";
import { dataPorExtenso, linhasEditoriais } from "@/lib/content";
import { firm, whatsappHref } from "@/content/site";

const roman = ["I", "II", "III", "IV", "V", "VI"];

/**
 * Signature interaction C — the boutique approach. An espresso panel opens out of the white
 * page (its window widening to full bleed as it rises); inside, a tall photograph opens in
 * turn while the three themes settle beside it.
 */
export function Approach({ data }: { data: Escritorio["abordagem"] }) {
  return (
    <section className="apx" aria-labelledby="apx-title">
      <ExpandFrame className="apx__panel on-dark" from="inset(0% 6% 0% 6%)" fromCompact="inset(0% 3% 0% 3%)" zoom={1} tone="dark" start="top 92%" end="top 25%">
        <div className="container apx__grid">
          <div className="apx__photo">
            <ExpandFrame className="apx__frame" from="inset(12% 14% 12% 14%)" fromCompact="inset(6% 6% 6% 6%)" zoom={1.12} start="top 90%" end="center 45%">
              <Image src="/assets/architecture/corridor-mobile.webp" alt="Imagem conceitual: corredor de concreto atravessado pela luz." fill sizes="(min-width: 1024px) 34vw, 100vw" />
            </ExpandFrame>
          </div>
          <div className="apx__text">
            <p className="label" data-reveal="fade">
              Modelo de atuação
            </p>
            <h2 id="apx-title" className="apx__title" data-reveal="">
              {data.titulo}
            </h2>
            <p className="apx__lead" data-reveal="">
              {data.texto}
            </p>
            <ol className="apx__themes" role="list">
              {data.temas.map((t, i) => (
                <li key={t.titulo} data-reveal="" style={{ ["--delay" as string]: `${i * 120}ms` }}>
                  <span className="apx__n">{roman[i]}</span>
                  <h3 className="apx__theme">{t.titulo}</h3>
                  <p>{t.texto}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </ExpandFrame>
    </section>
  );
}

/** Who CMA advises — four quiet entries, each tied to the areas that serve it. */
export function Audiences({ items, areas, title = "Quem a CMA assessora." }: { items: Escritorio["publicos"]; areas: Area[]; title?: string }) {
  const byslug = new Map(areas.map((a) => [a.slug, a]));
  return (
    <section className="aud" aria-labelledby="aud-title">
      <div className="container aud__grid">
        <div className="aud__head">
          <p className="label" data-reveal="fade">
            Para quem
          </p>
          <h2 id="aud-title" className="aud__title" data-reveal="">
            {title}
          </h2>
        </div>
        <ol className="aud__list" role="list">
          {items.map((p, i) => (
            <li key={p.chave} className="aud__item" data-reveal="" style={{ ["--delay" as string]: `${i * 90}ms` }}>
              <span className="aud__n">{roman[i]}</span>
              <h3 className="aud__name">{p.titulo}</h3>
              <p className="aud__text">{p.texto}</p>
              <p className="aud__areas">
                {p.areas
                  .map((s) => byslug.get(s))
                  .filter((a): a is Area => !!a)
                  .map((a, j, arr) => (
                    <span key={a.slug}>
                      <Link href={`/areas-de-atuacao/${a.slug}`}>{a.tituloCurto}</Link>
                      {j < arr.length - 1 ? " · " : ""}
                    </span>
                  ))}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/** A portrait slot that never pretends: until an authentic photograph is approved, it says so. */
export function Portrait({ p, sizes = "(min-width: 1024px) 22vw, 70vw" }: { p: Pessoa; sizes?: string }) {
  return (
    <div className="ptr">
      {p.foto ? (
        <Image src={p.foto} alt={p.fotoAlt || `Retrato de ${p.nome}`} fill sizes={sizes} />
      ) : (
        <div className="ptr__ph" role="img" aria-label={`Espaço reservado para o retrato de ${p.nome}`}>
          <CmaMark title={null} className="ptr__mark" />
          <span className="ptr__note">Retrato autoral a ser fornecido</span>
        </div>
      )}
    </div>
  );
}

/** The firm's people, inside the institution. Only verified professionals are listed. */
export function Team({ people, heading = "As pessoas por trás da estratégia.", link = true }: { people: Pessoa[]; heading?: string; link?: boolean }) {
  return (
    <section className="team" aria-labelledby="team-title">
      <div className="container team__grid">
        <div className="team__head">
          <p className="label" data-reveal="fade">
            Equipe
          </p>
          <h2 id="team-title" className="team__title" data-reveal="">
            {heading}
          </h2>
          {link && (
            <p data-reveal="">
              <Link href="/equipe" className="link-line">
                Conheça a equipe
                <ArrowRight />
              </Link>
            </p>
          )}
        </div>
        <ul className="team__list" role="list">
          {people.map((p) => (
            <li key={p.slug} className="team__person" data-reveal="">
              <Link href={`/equipe/${p.slug}`} className="team__link">
                <Portrait p={p} />
                <span className="team__name">{p.nome}</span>
                <span className="team__role">{p.cargo}</span>
              </Link>
              <p className="team__summary">{p.resumo}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Conhecimento — published articles, or the editorial lines while none is approved. */
export function Knowledge({ articles, compact = false }: { articles: Artigo[]; compact?: boolean }) {
  return (
    <section className="kn" aria-labelledby="kn-title">
      <div className="container kn__grid">
        <div className="kn__head">
          <p className="label" data-reveal="fade">
            Conhecimento
          </p>
          <h2 id="kn-title" className="kn__title" data-reveal="">
            Análises, notas e atualizações.
          </h2>
          <p className="kn__intro" data-reveal="">
            Conteúdo técnico sobre temas imobiliários, fundiários, sucessórios, tributários e patrimoniais, escrito e revisado pelos advogados do escritório.
          </p>
          {compact && (
            <p data-reveal="">
              <Link href="/conhecimento" className="link-line">
                Ver publicações
                <ArrowRight />
              </Link>
            </p>
          )}
        </div>
        {articles.length > 0 ? (
          <ol className="kn__list" role="list">
            {articles.slice(0, compact ? 3 : undefined).map((a) => (
              <li key={a.slug} className="kn__item" data-reveal="">
                <Link href={`/conhecimento/${a.slug}`} className="kn__link">
                  <span className="kn__cat">{a.categoria}</span>
                  <span className="kn__name">{a.titulo}</span>
                  <span className="kn__summary">{a.resumo}</span>
                  <span className="kn__date">{a.data ? dataPorExtenso(a.data) : ""}</span>
                </Link>
              </li>
            ))}
          </ol>
        ) : (
          <div className="kn__lines">
            <p className="kn__k">Linhas editoriais</p>
            <ol className="kn__list" role="list">
              {linhasEditoriais.map((l, i) => (
                <li key={l} className="kn__line" data-reveal="" style={{ ["--delay" as string]: `${i * 70}ms` }}>
                  <span className="kn__n num">{String(i + 1).padStart(2, "0")}</span>
                  <span className="kn__line-name">{l}</span>
                  <span className="kn__status">Em preparação</span>
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </section>
  );
}

/** The closing invitation, followed by the footer. */
export function ContactClose({ heading = "Estamos à disposição para uma conversa." }: { heading?: string }) {
  const wa = whatsappHref("Olá. Gostaria de falar com a CMA Advogados.");
  return (
    <section className="cc" aria-labelledby="cc-title">
      <div className="container cc__grid">
        <h2 id="cc-title" className="cc__title" data-reveal="">
          {heading}
        </h2>
        <dl className="cc__details" data-reveal="">
          <div>
            <dt>Escritório</dt>
            <dd>{firm.address ?? `${firm.city} · ${firm.state}`}</dd>
          </div>
          <div>
            <dt>E-mail</dt>
            <dd>{firm.email ? <a href={`mailto:${firm.email}`}>{firm.email}</a> : <Pending />}</dd>
          </div>
          <div>
            <dt>Telefone</dt>
            <dd>{firm.phone ? <a href={`tel:${firm.phone.replace(/[^+\d]/g, "")}`}>{firm.phone}</a> : <Pending />}</dd>
          </div>
          {wa && (
            <div>
              <dt>WhatsApp</dt>
              <dd>
                <a href={wa} target="_blank" rel="noopener noreferrer">
                  Iniciar conversa<span className="sr-only"> (abre em nova janela)</span>
                </a>
              </dd>
            </div>
          )}
        </dl>
        <p className="cc__action" data-reveal="">
          <Link href="/contato" className="link-line">
            Fale com a CMA
            <ArrowRight />
          </Link>
        </p>
      </div>
      <ExpandFrame className="cc__strip" from="inset(0% 30% 0% 30%)" fromCompact="inset(0% 8% 0% 8%)" tone="dark" start="top 98%" end="top 35%">
        <Image src="/assets/architecture/detail-floor-light.webp" alt="" fill sizes="100vw" />
      </ExpandFrame>
    </section>
  );
}
