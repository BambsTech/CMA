import { LOGOS, type LogoVariant } from "./logo-data";

type Props = {
  variant?: LogoVariant;
  /** Accessible name. Pass `null` when the logo sits inside a link that already has a label. */
  title?: string | null;
  className?: string;
};

/**
 * Official CMA signatures, rendered from vector paths extracted 1:1 from the brand manual.
 * Colour is inherited (currentColor) so only approved palette colours from CSS are applied.
 * Minimum digital widths (manual): monograma 55px · completo horizontal 170px ·
 * completo vertical 80px · nome horizontal 105px · nome vertical 40px.
 */
export function Logo({ variant = "completo-horizontal", title = "Carolina Meirelles & Advogados", className }: Props) {
  const logo = LOGOS[variant];
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${logo.width} ${logo.height}`}
      fill="currentColor"
      className={className}
      role={title ? "img" : undefined}
      aria-label={title ?? undefined}
      aria-hidden={title ? undefined : true}
      focusable="false"
      style={{ width: "100%", height: "auto", display: "block" }}
      dangerouslySetInnerHTML={{ __html: logo.markup }}
    />
  );
}
