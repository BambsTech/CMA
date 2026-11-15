import Image from "next/image";
import { ExpandFrame } from "@/components/motion/ExpandFrame";

type Props = {
  label: string;
  title: string;
  lead?: string;
  /** Optional photograph: opens from a narrow window into the right-hand column. */
  image?: { src: string; alt: string };
  dark?: boolean;
  children?: React.ReactNode;
};

/**
 * Secondary-page opening. Title close to the top-left corner (one line where it fits),
 * a small justified lead low on the left, and — when given — a photographic window on
 * the right that opens as the page settles.
 */
export function PageHead({ label, title, lead, image, dark, children }: Props) {
  return (
    <section className={`ph${image ? " ph--image" : ""}${dark ? " ph--dark on-dark" : ""}`} aria-labelledby="page-title" data-tone={dark ? "dark" : undefined}>
      <div className="container ph__grid">
        <div className="ph__text">
          <p className="label" data-reveal="fade">
            {label}
          </p>
          <h1 id="page-title" className="ph__title" data-reveal="">
            {title}
          </h1>
          {lead && (
            <p className="ph__lead" data-reveal="" style={{ ["--delay" as string]: "150ms" }}>
              {lead}
            </p>
          )}
          {children}
        </div>
        {image && (
          <div className="ph__media">
            <ExpandFrame className="ph__frame" from="inset(0% 0% 0% 60%)" fromCompact="inset(0% 0% 0% 30%)" zoom={1.08} tone="dark" start="top 100%" end="bottom 40%">
              <Image src={image.src} alt={image.alt} fill priority sizes="(min-width: 1024px) 44vw, 100vw" />
            </ExpandFrame>
          </div>
        )}
      </div>
    </section>
  );
}
