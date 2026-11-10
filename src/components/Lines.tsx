import type { ElementType } from "react";

type Props = {
  as?: ElementType;
  lines: readonly React.ReactNode[];
  className?: string;
  delay?: number;
  id?: string;
};

/** Headline split into masked lines that rise into view, one after another. */
export function Lines({ as: Tag = "h2", lines, className, delay = 0, id }: Props) {
  return (
    <Tag className={["lines", className].filter(Boolean).join(" ")} data-reveal="" style={{ ["--delay" as string]: `${delay}ms` }} id={id}>
      {lines.map((line, i) => (
        <span className="line" key={i}>
          <span style={{ ["--i" as string]: i }}>{line}</span>
        </span>
      ))}
    </Tag>
  );
}
