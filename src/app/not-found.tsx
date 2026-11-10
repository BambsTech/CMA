import Link from "next/link";
import { ArrowRight } from "@/components/Icons";

export default function NotFound() {
  return (
    <section className="section section--stone notfound" aria-labelledby="nf-title">
      <div className="container">
        <p className="label label--rule">Erro 404</p>
        <h1 id="nf-title" className="t-display notfound__title">
          Página não
          <br />
          encontrada.
        </h1>
        <p className="t-body">O endereço pode ter mudado ou a página não existe mais.</p>
        <div className="notfound__links">
          <Link href="/" className="link-line">
            Página inicial
            <ArrowRight />
          </Link>
          <Link href="/areas-de-atuacao" className="link-line">
            Áreas de atuação
            <ArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
}
