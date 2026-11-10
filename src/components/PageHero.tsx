import Image from "next/image";
import Link from "next/link";
import { Lines } from "./Lines";
import { Parallax } from "./Parallax";

type Crumb = { name: string; path: string };

type Props = {
  label: string;
  title: readonly string[];
  intro?: string;
  crumbs?: Crumb[];
  image?: { src: string; alt: string; width: number; height: number; position?: string };
  note?: string;
  children?: React.ReactNode;
};

/**
 * Secondary-page opening. With an image: dark, full-bleed, cinematic.
 * Without: a light editorial title block on stone.
 */
export function PageHero({ label, title, intro, crumbs, image, note, children }: Props) {
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
            <div className="frame page-hero__split-frame" data-reveal="mask" style={{ ["--delay" as string]: "200ms" }}>
              <Parallax speed={0.12} zoom>
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 34vw, 100vw"
                  style={{ objectFit: "cover", objectPosition: image.position }}
                />
              </Parallax>
            </div>
            {note && <figcaption className="concept-note">{note}</figcaption>}
          </figure>
        </div>
      </section>
    );
  }

  if (image) {
    return (
      <section className="page-hero page-hero--image on-dark" aria-labelledby="page-title">
        <div className="page-hero__media">
          <Parallax speed={0.2} zoom>
            <Image src={image.src} alt={image.alt} fill priority sizes="100vw" style={{ objectFit: "cover", objectPosition: image.position }} />
          </Parallax>
          <div className="page-hero__shade" />
        </div>
        <div className="container page-hero__inner">
          {breadcrumb}
          <div className="page-hero__main">
            <span className="label label--rule" data-reveal="fade">
              {label}
            </span>
            <Lines as="h1" id="page-title" className="t-display page-hero__title" lines={title} delay={150} />
          </div>
          <div className="page-hero__foot">
            {intro && (
              <p className="t-lead page-hero__intro" data-reveal="" style={{ ["--delay" as string]: "450ms" }}>
                {intro}
              </p>
            )}
            {note && <p className="concept-note">{note}</p>}
          </div>
        </div>
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
