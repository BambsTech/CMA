"use client";

import { useEffect, useRef } from "react";
import { getGsap } from "./gsap";

type Props = {
  children: React.ReactNode;
  className?: string;
  /** clip-path the frame starts from, e.g. "inset(0% 22% 0% 22%)". It always opens to full. */
  from?: string;
  /** clip-path the frame opens to (default: fully open). */
  to?: string;
  /** Narrower screens start closer to full width. */
  fromCompact?: string;
  /** Marks the frame for the header's tone detection. */
  tone?: "dark" | "light";
  /** ScrollTrigger range, relative to the frame. */
  start?: string;
  end?: string;
};

/**
 * A photographic window that opens as it travels up the viewport (scroll-linked, never pinned).
 * The image inside counter-zooms so the opening reads as depth, not as a resize.
 * Reduced motion: shown fully open.
 */
export function ExpandFrame({ children, className, from = "inset(0% 12% 0% 12%)", fromCompact = "inset(0% 5% 0% 5%)", to = "inset(0% 0% 0% 0%)", tone, start = "top 95%", end = "top 20%" }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const { gsap } = getGsap();
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const start0 = window.matchMedia("(max-width: 719px)").matches ? fromCompact : from;
      gsap.fromTo(el, { clipPath: start0 }, { clipPath: window.matchMedia("(max-width: 719px)").matches ? "inset(0% 0% 0% 0%)" : to, ease: "none", scrollTrigger: { trigger: el, start, end, scrub: 0.6 } });
      const media = el.querySelector("img, picture");
      if (media) {
        gsap.fromTo(media, { scale: 1.18 }, { scale: 1, ease: "none", scrollTrigger: { trigger: el, start, end: "bottom top", scrub: true } });
      }
    });
    return () => mm.revert();
  }, [from, fromCompact, to, start, end]);

  return (
    <div ref={ref} className={["xframe", className].filter(Boolean).join(" ")} data-tone={tone}>
      {children}
    </div>
  );
}
