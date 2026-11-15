import { CMA_MARKS } from "./cma-data";

type MarkProps = { className?: string; title?: string | null };

function Svg({ k, className, title }: MarkProps & { k: keyof typeof CMA_MARKS }) {
  const m = CMA_MARKS[k];
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${m.width} ${m.height}`}
      fill="currentColor"
      className={className}
      role={title ? "img" : undefined}
      aria-label={title ?? undefined}
      aria-hidden={title ? undefined : true}
      focusable="false"
      dangerouslySetInnerHTML={{ __html: m.markup }}
    />
  );
}

/**
 * CMA — the institutional shorthand, set from the official outlines of the reduced logo
 * (C, M, A re-spaced; the "&" is left out). Proposal pending client approval.
 */
export function CmaMark({ className, title = "CMA Advogados" }: MarkProps) {
  return <Svg k="cma" className={["cma-mark", className].filter(Boolean).join(" ")} title={title} />;
}

/** ADVOGADOS — the official signature's letters, without the ampersand. */
export function AdvogadosMark({ className }: { className?: string }) {
  return <Svg k="advogados" className={["adv-mark", className].filter(Boolean).join(" ")} title={null} />;
}

/**
 * Lockups. "inline": CMA with ADVOGADOS small at its baseline (header).
 * "stacked": ADVOGADOS beneath, set to the width of CMA (footer, hero, review page).
 */
export function CmaLockup({ variant = "inline", className, title = "CMA Advogados" }: { variant?: "inline" | "stacked" } & MarkProps) {
  return (
    <span className={["cma-lockup", `cma-lockup--${variant}`, className].filter(Boolean).join(" ")} role={title ? "img" : undefined} aria-label={title ?? undefined}>
      <Svg k="cma" className="cma-lockup__cma" title={null} />
      <Svg k="advogados" className="cma-lockup__adv" title={null} />
    </span>
  );
}
