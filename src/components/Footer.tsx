import Link from "next/link";
import { Logo } from "./brand/Logo";
import { CmaLockup } from "./brand/Cma";
import { Pending } from "./Pending";
import { areas } from "@/lib/content";
import { firm, nav } from "@/content/site";

/**
 * Espresso footer. CMA leads; the formal identification (the manual's full signature,
 * the society's name and, once confirmed, its OAB registration) closes the page.
 */
export function Footer() {
  const year = new Date().getFullYear();
  const list = areas();
  return (
    <footer className="foot on-dark" data-tone="dark">
      <div className="container foot__grid">
        <Link href="/" className="foot__mark" aria-label={`${firm.shortName} — página inicial`}>
          <CmaLockup variant="stacked" title={null} />
        </Link>

        <nav className="foot__col" aria-label="Navegação do rodapé">
          <p className="foot__k">Navegação</p>
          <ul role="list">
            {nav
              .filter((n) => n.href !== "/")
              .map((n) => (
                <li key={n.href}>
                  <Link href={n.href}>{n.label}</Link>
                </li>
              ))}
          </ul>
        </nav>

        <div className="foot__col">
          <p className="foot__k">Atuação</p>
          <ul role="list">
            {list.map((a) => (
              <li key={a.slug}>
                <Link href={`/areas-de-atuacao/${a.slug}`}>{a.titulo}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="foot__col">
          <p className="foot__k">Contato</p>
          <ul role="list">
            <li>
              {firm.city} · {firm.state}
            </li>
            <li>{firm.email ? <a href={`mailto:${firm.email}`}>{firm.email}</a> : <Pending>e-mail a confirmar</Pending>}</li>
            <li>{firm.phone ? <a href={`tel:${firm.phone.replace(/[^+\d]/g, "")}`}>{firm.phone}</a> : <Pending>telefone a confirmar</Pending>}</li>
            {firm.instagram && (
              <li>
                <a href={firm.instagram} target="_blank" rel="noopener noreferrer">
                  Instagram<span className="sr-only"> (abre em nova janela)</span>
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className="container foot__legal">
        <div className="foot__signature" aria-hidden="true">
          <Logo variant="completo-horizontal" title={null} />
        </div>
        <p className="foot__id">
          {firm.name} · Sociedade de advogados
          {firm.societyRegistration ? ` · ${firm.societyRegistration}` : " · registro na OAB/DF a confirmar"}
        </p>
        <p className="foot__meta">
          <span>© {year} {firm.shortName}</span>
          <Link href="/privacidade">Privacidade</Link>
        </p>
      </div>
    </footer>
  );
}
