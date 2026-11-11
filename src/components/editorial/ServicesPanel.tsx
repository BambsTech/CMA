import Link from "next/link";
import { LOGOS } from "@/components/brand/logo-data";
import { practices } from "@/content/practices";

function Word({ k }: { k: "palavra-carolina" | "palavra-meirelles" }) {
  const l = LOGOS[k];
  return <svg viewBox={`0 0 ${l.width} ${l.height}`} fill="currentColor" aria-hidden="true" focusable="false" dangerouslySetInnerHTML={{ __html: l.markup }} />;
}

/**
 * "Serviços" (manual p. 32, reproduced as the agency drew it): taupe field, the
 * signature's two words at the left edge, the numbered list top right and the
 * title pale and low.
 */
export function ServicesPanel({ title = "Serviços" }: { title?: string }) {
  return (
    <section className="svc" aria-labelledby="svc-title">
      <div className="container svc__inner">
        <span className="svc__edge svc__edge--tl">
          <Word k="palavra-carolina" />
        </span>
        <span className="svc__edge svc__edge--bl">
          <Word k="palavra-meirelles" />
        </span>
        <ol className="svc__list" role="list">
          {practices.map((p) => (
            <li key={p.slug}>
              <a href={`#${p.slug}`}>
                <span className="svc__n">{Number(p.number)}</span>
                <span>{p.title}</span>
              </a>
            </li>
          ))}
        </ol>
        <div className="svc__foot">
          <h1 id="svc-title" className="svc__title">
            {title}
          </h1>
        </div>
      </div>
    </section>
  );
}

/** Expandable rows (reference: process list) with the unified small justified text. */
export function AreaRows() {
  return (
    <section className="arows" aria-label="Detalhes das áreas de atuação">
      <div className="container">
        <ol className="arows__list" role="list">
          {practices.map((p) => (
            <li key={p.slug} id={p.slug} className="arow">
              <details>
                <summary>
                  <span className="arow__n">{p.number}</span>
                  <h2 className="arow__title">{p.title}</h2>
                  <p className="arow__summary">{p.summary}</p>
                  <span className="arow__toggle" aria-hidden="true">
                    Mais
                  </span>
                </summary>
                <div className="arow__more">
                  <p>{p.lead}</p>
                  <ul className="arow__scope" role="list">
                    {p.scope.slice(0, 4).map((s) => (
                      <li key={s.title}>
                        <h4>{s.title}</h4>
                        <p>{s.text}</p>
                      </li>
                    ))}
                  </ul>
                  <Link href={`/areas-de-atuacao/${p.slug}`} className="link-line">
                    Página completa da área →
                  </Link>
                </div>
              </details>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
