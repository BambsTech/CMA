import Link from "next/link";
import { Logo } from "./brand/Logo";
import { Pending } from "./Pending";
import { firm, founder, nav } from "@/content/site";
import { practices } from "@/content/practices";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer on-dark">
      <div className="container">
        <div className="site-footer__top">
          <Link href="/" className="site-footer__logo" aria-label={`${firm.name} — página inicial`}>
            <Logo variant="completo-horizontal" title={null} />
          </Link>
        </div>

        <div className="grid site-footer__cols">
          <div className="site-footer__col">
            <h2 className="label">Escritório</h2>
            <p className="t-small">
              Advocacia especializada em {firm.specialty}.
              <br />
              {firm.city} · {firm.state}
            </p>
          </div>
          <div className="site-footer__col">
            <h2 className="label">Navegação</h2>
            <ul role="list">
              {nav.map((n) => (
                <li key={n.href}>
                  <Link href={n.href}>{n.label}</Link>
                </li>
              ))}
              <li>
                <Link href="/carolina-meirelles">{founder.name}</Link>
              </li>
            </ul>
          </div>
          <div className="site-footer__col">
            <h2 className="label">Áreas de atuação</h2>
            <ul role="list">
              {practices.map((p) => (
                <li key={p.slug}>
                  <Link href={`/areas-de-atuacao/${p.slug}`}>{p.shortTitle}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="site-footer__col">
            <h2 className="label">Responsabilidade</h2>
            <p className="t-small">
              {founder.name} — {founder.oab ?? <Pending>OAB/DF a confirmar</Pending>}
              <br />
              Registro da sociedade: {firm.societyRegistration ?? <Pending>a confirmar</Pending>}
            </p>
            <p className="t-small" style={{ marginTop: "1rem" }}>
              Conteúdo de caráter exclusivamente informativo, nos termos do Provimento nº 205/2021 do Conselho Federal da OAB.
            </p>
          </div>
        </div>

        <div className="site-footer__legal">
          <p className="caption">
            © {year} {firm.name}
          </p>
          <p className="caption">
            <Link href="/privacidade" className="inline-link">
              Privacidade
            </Link>
            <span aria-hidden="true"> · </span>
            Imagens arquitetônicas conceituais, sem relação com imóveis reais.
          </p>
        </div>
      </div>
    </footer>
  );
}
