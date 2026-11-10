import { getImageProps } from "next/image";

type Props = {
  desktop: { src: string; width: number; height: number };
  mobile?: { src: string; width: number; height: number };
  alt: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
  /** CSS object-position for each breakpoint, e.g. "60% 50%". */
  position?: string;
  mobilePosition?: string;
};

/** Art-directed responsive image: a different crop below 720px, optimised by next/image. */
export function ArtImage({ desktop, mobile, alt, priority, sizes = "100vw", className, position, mobilePosition }: Props) {
  const common = { alt, sizes, priority, quality: 82 } as const;
  const d = getImageProps({ ...common, ...desktop }).props;
  const m = mobile ? getImageProps({ ...common, ...mobile }).props : null;
  return (
    <picture className={className}>
      {m && <source media="(max-width: 719px)" srcSet={m.srcSet} sizes={sizes} />}
      <source media={m ? "(min-width: 720px)" : "all"} srcSet={d.srcSet} sizes={sizes} />
      {/* eslint-disable-next-line jsx-a11y/alt-text -- alt supplied via props */}
      <img
        {...d}
        style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: position, ...({ ["--mobile-pos" as string]: mobilePosition } as object) }}
      />
    </picture>
  );
}
