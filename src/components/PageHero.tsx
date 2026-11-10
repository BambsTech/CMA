import Image from "next/image";
import Link from "next/link";
import { Lines } from "./Lines";
import { ExpandFrame } from "./motion/ExpandFrame";

type Crumb = { name: string; path: string };

type Props = {
  label: string;
  title: readonly string[];
  intro?: string;
  crumbs?: Crumb[];
  image?: { src: string; alt: string; width: number; height: number; position?: string };
  /** Frame the split-hero image as an arch (the founder's signature shape). */
  arch?: boolean;
  note?: string;
  children?: React.ReactNode;
};

/**
 * Secondary-page opening. With an image: dark, full-bleed, cinematic.
 * Without: a light editorial title block on stone.
 */
export function PageHero({ label, title, intro, crumbs, image, note, arch, children }: Props) {
  const breadcrumb = crumbs && (
    <nav aria-label="Trilha de navegação" className="crumbs" data-reveal="fade">
      <ol role="list">
        {crumbs.map((c, i) => (
          <li key={c.path}>
            {i < crumbs.length - 1 ? <Link href={c.path}>{c.name}</Link> : <span aria-current="page">{c.name}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );

  if (image && image.width < 1200) {
    // Small, detail crops: framed at native resolution instead of being upscaled full-bleed.
    return (
      <section className="page-hero page-hero--split on-dark" aria-labelledby="page-title">
        <div className="container grid page-hero__split">
          <div className="page-hero__split-text">
            {breadcrumb}
            <div className="page-hero__main">
              <span className="label label--rule" data-reveal="fade">
                {label}
              </span>
              <Lines as="h1" id="page-title" className="t-display page-hero__title" lines={title} delay={150} />
            </div>
            {intro && (
              <p className="t-lead page-hero__intro" data-reveal="" style={{ ["--delay" as string]: "450ms" }}>
                {intro}
              </p>
            )}
          </div>
          <figure className="page-hero__split-figure">
            <div className={`page-hero__split-shape${arch ? " page-hero__split-shape--arch" : ""}`} data-reveal="mask" style={{ ["--delay" as string]: "200ms" }}>
              <ExpandFrame className="frame page-hero__split-frame" from="inset(0% 14% 10% 14%)" fromCompact="inset(0% 6% 6% 6%)" start="top 85%" end="bottom 30%">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 34vw, 100vw"
                  style={{ objectFit: "cover", objectPosition: image.position }}
                />
              </ExpandFrame>
            </div>
            {note && <figcaption className="concept-note">{note}</figcaption>}
          </figure>
        </div>
      </section>
    );
  }

  if (image) {
    // Wide photographs: an editorial title on stone, then a window that opens to full bleed.
    return (
      <section className="page-hero page-hero--window" aria-labelledby="page-title">
        <div className="container">
          {breadcrumb}
          <div className="grid page-hero__plain-grid">
            <span className="label label--rule page-hero__label" data-reveal="fade">
              {label}
            </span>
            <Lines as="h1" id="page-title" className="t-display page-hero__title" lines={title} delay={100} />
            {intro && (
              <p className="t-lead page-hero__intro" data-reveal="" style={{ ["--delay" as string]: "350ms" }}>
                {intro}
              </p>
            )}
          </div>
        </div>
        <ExpandFrame className="page-hero__window" from="inset(0% 26% 0% 26%)" fromCompact="inset(0% 6% 0% 6%)" tone="dark" start="top 92%" end="top 8%">
          <Image src={image.src} alt={image.alt} fill priority sizes="100vw" style={{ objectFit: "cover", objectPosition: image.position }} />
        </ExpandFrame>
        {note && (
          <div className="container">
            <p className="concept-note">{note}</p>
          </div>
        )}
      </section>
    );
  }

  return (
    <section className="page-hero page-hero--plain" aria-labelledby="page-title">
      <div className="container">
        {breadcrumb}
        <div className="grid page-hero__plain-grid">
          <span className="label label--rule page-hero__label" data-reveal="fade">
            {label}
          </span>
          <Lines as="h1" id="page-title" className="t-display page-hero__title" lines={title} delay={100} />
          {intro && (
            <p className="t-lead page-hero__intro" data-reveal="" style={{ ["--delay" as string]: "350ms" }}>
              {intro}
            </p>
          )}
          {children}
        </div>
      </div>
    </section>
  );
}
