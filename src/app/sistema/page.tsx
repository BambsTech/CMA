import Link from "next/link";
import type { Metadata } from "next";
import { Logo } from "@/components/brand/Logo";
import { SpreadWordmark } from "@/components/brand/SpreadWordmark";
import { ArrowRight } from "@/components/Icons";
import { practices } from "@/content/practices";

export const metadata: Metadata = {
  title: "Sistema de design",
  robots: { index: false, follow: false },
};

const palette = [
  { name: "Stone", token: "--cma-stone", hex: "#CECBC4", role: "Superfície dominante", share: "70%" },
  { name: "Espresso", token: "--cma-espresso", hex: "#301206", role: "Texto · painéis", share: "15%" },
  { name: "Earth", token: "--cma-earth", hex: "#382C23", role: "Escuro secundário", share: "—" },
  { name: "Taupe", token: "--cma-taupe", hex: "#ACA699", role: "Texto suave · painéis calmos", share: "5%" },
  { name: "Slate", token: "--cma-slate", hex: "#B4B9BF", role: "Acento raro", share: "—" },
];

const type = [
  { token: "--fs-display", label: "Display · manual 72 pt", sample: "Objetividade e inteligência.", cls: "ds-type--display" },
  { token: "--fs-h1", label: "Título de seção · manual 36–42 pt", sample: "Áreas de atuação", cls: "ds-type--h1" },
  { token: "--fs-h2", label: "Subtítulo · manual 28 pt", sample: "Regularização de Imóveis", cls: "ds-type--h2" },
  { token: "--fs-h3", label: "Título pequeno · manual 18 pt", sample: "Advocacia especializada em Direito Imobiliário", cls: "ds-type--h3" },
  { token: "--fs-body", label: "Texto · Karla Light · manual 12 pt", sample: "Somos um escritório especializado em Direito Imobiliário, oferecendo assessoria jurídica estratégica para clientes que buscam segurança, agilidade e transparência.", cls: "ds-type--body" },
  { token: "--fs-caption", label: "Legenda · Roboto Slab · manual 12 pt", sample: "Conceito · 04", cls: "label" },
];

function Folio({ name, n }: { name: string; n: string }) {
  return (
    <div className="ds-folio">
      <span className="label">{name}</span>
      <span className="label">{n}</span>
    </div>
  );
}

export default function SistemaPage() {
  return (
    <div className="ds">
      <section className="ds-page">
        <div className="container">
          <div className="ds-head">
            <div className="ds-head__mark">
              <Logo variant="monograma" title={null} />
            </div>
            <span className="label">Sistema de design digital</span>
          </div>
          <h1 className="ds-title">Sistema de design.</h1>
          <div className="ds-intro">
            <p>
              Derivado do Manual de Identidade Visual (Estúdio Sarau, 2025) e das aplicações web do próprio estúdio
              (pp. 29–38). Tipografia leve e pequena, muito espaço, um elemento forte por tela.
            </p>
            <p>Medidas lidas diretamente do PDF e convertidas para a tela. Documentação completa em DESIGN_SYSTEM.md.</p>
          </div>
          <Folio name="Sistema" n="00" />
        </div>
      </section>

      <section className="ds-page">
        <div className="container">
          <h2 className="ds-h">Paleta</h2>
          <div className="ds-swatches">
            {palette.map((c) => (
              <div key={c.hex} className="ds-swatch" style={{ background: c.hex, color: c.name === "Espresso" || c.name === "Earth" ? "#CECBC4" : "#301206" }}>
                <span className="label" style={{ color: "inherit" }}>{c.hex}</span>
                <span className="ds-swatch__meta">
                  {c.name} · {c.role}
                  <br />
                  {c.token} · uso ≈ {c.share}
                </span>
              </div>
            ))}
          </div>
          <Folio name="Paleta" n="01" />
        </div>
      </section>

      <section className="ds-page">
        <div className="container">
          <h2 className="ds-h">Tipografia</h2>
          <ol className="ds-types" role="list">
            {type.map((t) => (
              <li key={t.token}>
                <span className="label ds-types__meta">
                  {t.label}
                  <br />
                  {t.token}
                </span>
                <span className={t.cls}>{t.sample}</span>
              </li>
            ))}
          </ol>
          <Folio name="Tipografia" n="02" />
        </div>
      </section>

      <section className="ds-page">
        <div className="container">
          <h2 className="ds-h">Assinaturas</h2>
          <div className="ds-logos">
            <div className="ds-logo"><Logo variant="monograma" title="Monograma" /><span className="label">Reduzido · mín. 55 px</span></div>
            <div className="ds-logo"><Logo variant="completo-horizontal" title="Completo horizontal" /><span className="label">Completo horizontal · mín. 170 px</span></div>
            <div className="ds-logo ds-logo--narrow"><Logo variant="completo-vertical" title="Completo vertical" /><span className="label">Completo vertical · mín. 80 px</span></div>
          </div>
          <div className="ds-spread">
            <SpreadWordmark />
            <span className="label">Assinatura espaçada — aplicação web do estúdio (pp. 37–38)</span>
          </div>
          <Folio name="Assinaturas" n="03" />
        </div>
      </section>

      <section className="ds-page ds-page--taupe">
        <div className="container ds-services">
          <span className="ds-edge ds-edge--tl label">Carolina</span>
          <span className="ds-edge ds-edge--bl label">Meirelles</span>
          <ol className="ds-list" role="list">
            {practices.map((p) => (
              <li key={p.slug}>
                <span>{Number(p.number)}</span>
                <Link href={`/areas-de-atuacao/${p.slug}`}>{p.title}</Link>
              </li>
            ))}
          </ol>
          <h2 className="ds-services__title">Serviços</h2>
        </div>
      </section>

      <section className="ds-page ds-page--espresso on-dark">
        <div className="container ds-statement">
          <h2 className="ds-statement__title">Objetividade<br />e inteligência.</h2>
          <div className="ds-statement__mark"><Logo variant="completo-horizontal" title={null} /></div>
          <div className="ds-statement__aside">
            <p className="ds-statement__sub">Advocacia especializada em Direito Imobiliário.</p>
            <div className="ds-cols">
              <p>Coluna estreita de texto pequeno, ancorada no canto inferior direito.</p>
              <p>Segunda coluna — o manual usa pares de colunas de cerca de 15 rem.</p>
            </div>
          </div>
          <span className="ds-statement__rule" />
        </div>
      </section>

      <section className="ds-page">
        <div className="container">
          <h2 className="ds-h">Componentes</h2>
          <div className="ds-components">
            <div><span className="label label--rule">Rótulo com fio</span></div>
            <div><Link href="/contato" className="link-line">Link de texto<ArrowRight /></Link></div>
            <div><Link href="/contato" className="action">Ação delimitada<ArrowRight /></Link></div>
            <div className="ds-glass"><span className="label">Painel de vidro</span><p>Texto sobre fotografia, com parcimônia (pp. 30, 32).</p></div>
            <div className="portrait-ph ds-arch" role="img" aria-label="Moldura em arco" />
          </div>
          <Folio name="Componentes" n="04" />
        </div>
      </section>
    </div>
  );
}
