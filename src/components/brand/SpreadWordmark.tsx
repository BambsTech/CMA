import { LOGOS } from "./logo-data";

/**
 * The agency's own web treatment of the signature (manual pp. 37–38):
 * CAROLINA and MEIRELLES at the two edges, "& ADVOGADOS" small in the space between.
 * Every glyph is the official vector outline; only the spacing between the words varies.
 */
export function SpreadWordmark({ className }: { className?: string }) {
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
