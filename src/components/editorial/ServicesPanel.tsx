import Link from "next/link";
import { practices } from "@/content/practices";

/**
 * "Serviços" panel (manual p. 32): taupe field, the signature's two words as edge marks,
 * a small numbered list, and a quiet title low on the page.
 */
export function ServicesPanel({ title = "Áreas de atuação", intro }: { title?: string; intro?: string }) {
  return (
    <section className="svc" aria-labelledby="svc-title">
      <div className="container svc__inner">
        <span className="svc__edge svc__edge--tl" aria-hidden="true">
          Carolina
        </span>
        <span className="svc__edge svc__edge--bl" aria-hidden="true">
          Meirelles
        </span>
        <ol className="svc__list" role="list">
          {practices.map((p) => (
            <li key={p.slug} data-reveal="" style={{ ["--delay" as string]: `${Number(p.number) * 60}ms` }}>
              <Link href={`/areas-de-atuacao/${p.slug}`}>
                <span className="svc__n">{Number(p.number)}</span>
                <span>{p.title}</span>
              </Link>
            </li>
          ))}
        </ol>
        <div className="svc__foot">
          <h1 id="svc-title" className="svc__title">
            {title}
          </h1>
          {intro && <p className="svc__intro">{intro}</p>}
        </div>
      </div>
    </section>
  );
}
