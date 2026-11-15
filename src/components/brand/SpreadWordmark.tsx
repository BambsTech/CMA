import { LOGOS } from "./logo-data";

/**
 * The agency's own web treatment of the signature (manual pp. 37–38): two words at the
 * edges of the band and a small element in the space between.
 *
 * variant "signature" (original): CAROLINA … & ADVOGADOS … MEIRELLES, official vector outlines.
 * variant "cma" (Nov 2026, client asked to emphasise CMA rather than the full signature):
 * the same composition and proportions — CMA … BRASÍLIA · DF … ADVOGADOS — set in the
 * manual's heading face (Encode Sans) instead of an invented logo. The cap height equals the
 * original letters' (6.08 % of the band's width), so the band keeps its exact size.
 */
export function SpreadWordmark({ className, variant = "signature" }: { className?: string; variant?: "signature" | "cma" }) {
  if (variant === "cma") {
    // Units: the band is 1299 wide and the original letters 79 tall (measured at 1440 px).
    const word = (text: string, w: number, cls: string) => (
      <svg className={cls} viewBox={`0 0 ${w} 79`} fill="currentColor" aria-hidden="true" focusable="false">
        <text x="0" y="79" textLength={w} lengthAdjust="spacing" style={{ fontFamily: "var(--font-heading)", fontWeight: 400, fontSize: 113 }}>
          {text}
        </text>
      </svg>
    );
    return (
      <div className={["spread-mark", "spread-mark--cma", className].filter(Boolean).join(" ")} role="img" aria-label="CMA Advogados">
        {word("CMA", 259, "spread-mark__a")}
        <svg className="spread-mark__mid" viewBox="0 0 120 20" fill="currentColor" aria-hidden="true" focusable="false">
          <text x="0" y="17" textLength={120} lengthAdjust="spacing" style={{ fontFamily: "var(--font-heading)", fontWeight: 400, fontSize: 13 }}>
            BRASÍLIA · DF
          </text>
        </svg>
        {word("ADVOGADOS", 760, "spread-mark__b")}
      </div>
    );
  }

  const part = (k: "palavra-carolina" | "palavra-meirelles" | "palavra-advogados", cls: string) => {
    const l = LOGOS[k];
    return (
      <svg
        className={cls}
        viewBox={`0 0 ${l.width} ${l.height}`}
        fill="currentColor"
        aria-hidden="true"
        focusable="false"
        dangerouslySetInnerHTML={{ __html: l.markup }}
      />
    );
  };
  return (
    <div className={["spread-mark", className].filter(Boolean).join(" ")} role="img" aria-label="Carolina Meirelles & Advogados">
      {part("palavra-carolina", "spread-mark__a")}
      {part("palavra-advogados", "spread-mark__mid")}
      {part("palavra-meirelles", "spread-mark__b")}
    </div>
  );
}
