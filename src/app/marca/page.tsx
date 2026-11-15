import type { Metadata } from "next";
import { Logo } from "@/components/brand/Logo";
import { AdvogadosMark, CmaLockup, CmaMark } from "@/components/brand/Cma";
import { escritorio } from "@/lib/content";

export const metadata: Metadata = {
  title: "Marca — revisão",
  robots: { index: false, follow: false },
};

const directionA = [
  { name: "Stone", hex: "#CECBC4" },
  { name: "Espresso", hex: "#301206" },
  { name: "Earth", hex: "#382C23" },
  { name: "Taupe", hex: "#ACA699" },
  { name: "Slate", hex: "#B4B9BF" },
];
const directionB = [
  { name: "Grafite", hex: "#2B2B2A" },
  { name: "Preto", hex: "#121212" },
  { name: "Off-white", hex: "#F2F0EB" },
  { name: "Areia", hex: "#CECBC4" },
  { name: "Bronze discreto", hex: "#8C6F55" },
];

/**
 * Review board for the client (not indexed, not in the navigation).
 * Brand hierarchy options and the two colour directions requested by the briefing.
 */
export default function MarcaPage() {
  const e = escritorio();
  return (
    <div className="mk">
      <section className="container mk__intro">
        <p className="label">Revisão de marca · uso interno</p>
        <h1 className="mk__title">CMA como identidade institucional.</h1>
        <p className="mk__lead">
          A cliente pediu ênfase na CMA, e não no logotipo “Carolina Meirelles &amp; Advogados”. As opções abaixo usam apenas os contornos
          vetoriais oficiais do manual (nenhuma letra foi redesenhada). Ambas dependem de aprovação.
        </p>
      </section>

      <section className="container mk__pair" aria-label="Hierarquia da marca">
        <figure className="mk__card">
          <div className="mk__stage mk__stage--light">
            <div className="mk__bar">
              <span className="mk__brand">
                <CmaLockup variant="inline" title={null} />
              </span>
              <span className="mk__nav">O Escritório · Atuação · Equipe · Conhecimento · Contato</span>
            </div>
            <div className="mk__big">
              <CmaLockup variant="stacked" title={null} />
            </div>
          </div>
          <figcaption>
            <strong>Opção A — recomendada e em uso nesta versão.</strong> CMA como assinatura principal, composta com as letras C, M e A do
            logotipo reduzido (sem o “&amp;”), e ADVOGADOS como descritor. O nome completo permanece no rodapé e na identificação formal.
          </figcaption>
        </figure>

        <figure className="mk__card">
          <div className="mk__stage mk__stage--light">
            <div className="mk__bar">
              <span className="mk__brand mk__brand--mono">
                <Logo variant="monograma" title={null} />
              </span>
              <span className="mk__nav">O Escritório · Atuação · Equipe · Conhecimento · Contato</span>
            </div>
            <div className="mk__big mk__big--b">
              <p className="mk__ed">CMA</p>
              <p className="mk__ed-sub">Advogados</p>
            </div>
          </div>
          <figcaption>
            <strong>Opção B.</strong> O logotipo reduzido original (CM&amp;A), sem alteração, na navegação; “CMA” usado como abreviação
            editorial, em texto (Encode Sans), nos títulos e nas comunicações.
          </figcaption>
        </figure>
      </section>

      <section className="container mk__pair" aria-label="Direções de cor">
        <figure className="mk__card">
          <div className="mk__hero mk__hero--a">
            <div className="mk__hero-mark">
              <CmaMark title={null} />
            </div>
            <p className="mk__hero-sig">
              {e.assinatura[0]}
              <br />
              {e.assinatura[1]}
            </p>
            <div className="mk__hero-adv">
              <AdvogadosMark />
            </div>
          </div>
          <ul className="mk__swatches" role="list">
            {directionA.map((c) => (
              <li key={c.hex}>
                <span style={{ background: c.hex }} />
                {c.name} · {c.hex}
              </li>
            ))}
          </ul>
          <figcaption>
            <strong>Direção A — Arquitetônica institucional (recomendada, em uso).</strong> Paleta oficial do manual: espresso, stone,
            taupe e branco quente, com fotografia arquitetônica.
          </figcaption>
        </figure>

        <figure className="mk__card">
          <div className="mk__hero mk__hero--b">
            <div className="mk__hero-mark">
              <CmaMark title={null} />
            </div>
            <p className="mk__hero-sig">
              {e.assinatura[0]}
              <br />
              {e.assinatura[1]}
            </p>
            <div className="mk__hero-adv">
              <AdvogadosMark />
            </div>
          </div>
          <ul className="mk__swatches" role="list">
            {directionB.map((c) => (
              <li key={c.hex}>
                <span style={{ background: c.hex }} />
                {c.name} · {c.hex}
              </li>
            ))}
          </ul>
          <figcaption>
            <strong>Direção B — Grafite contemporânea (alternativa).</strong> Proposta do briefing de novembro: grafite, preto, off-white,
            areia e bronze discreto. Não faz parte do manual aprovado; exigiria aprovação para substituir a paleta oficial.
          </figcaption>
        </figure>
      </section>

      <section className="container mk__type" aria-label="Tipografia">
        <p className="label">Tipografia oficial (manual)</p>
        <p className="mk__t1">Encode Sans — títulos</p>
        <p className="mk__t2">Karla — textos corridos, leitura confortável em tamanhos pequenos.</p>
        <p className="mk__t3">Roboto Slab — informações de apoio</p>
        <p className="mk__note">
          O briefing sugere combinar uma serifada com uma sem serifa; o manual já prevê Roboto Slab (serifada) como apoio, por isso a
          tipografia oficial foi mantida.
        </p>
      </section>
    </div>
  );
}
