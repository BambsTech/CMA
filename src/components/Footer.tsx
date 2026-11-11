import Link from "next/link";
import { Logo } from "./brand/Logo";
import { firm, founder } from "@/content/site";

/** One quiet line: the signature, then © and privacy. OAB details appear here once confirmed. */
export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer on-dark">
      <div className="container site-footer__bar">
        <Link href="/" className="site-footer__logo" aria-label={`${firm.name} — página inicial`}>
          <Logo variant="completo-horizontal" title={null} />
        </Link>
        <p className="caption">
          © {year} {firm.name}
          {founder.oab ? ` · ${founder.name} — ${founder.oab}` : ""}
          {firm.societyRegistration ? ` · ${firm.societyRegistration}` : ""}
        </p>
        <p className="caption site-footer__privacy">
          <Link href="/privacidade">Privacidade</Link>
        </p>
      </div>
    </footer>
  );
}
