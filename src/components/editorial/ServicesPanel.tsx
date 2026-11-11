import Link from "next/link";
import { practices } from "@/content/practices";

/**
 * "Serviços" (manual p. 32): taupe field, the numbered list on the right and the
 * title set in line beneath it.
 */
export function ServicesPanel({ title = "Serviços" }: { title?: string }) {
  return (
    <section className="svc" aria-labelledby="svc-title">
      <div className="container svc__inner">
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
