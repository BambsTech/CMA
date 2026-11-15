"use client";

import { useEffect, useRef } from "react";

type Props = {
  children: React.ReactNode;
  /** Fraction of scroll distance applied as translation (0.1 = subtle). */
  speed?: number;
  /** Gentle scale-down as the element scrolls away. */
  zoom?: boolean;
  className?: string;
};

/** Subtle, GPU-only image parallax. Disabled for reduced-motion users and on coarse pointers. */
export function Parallax({ children, speed = 0.12, zoom = false, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = el.parentElement?.getBoundingClientRect() ?? el.getBoundingClientRect();
      const vh = window.innerHeight;
      if (rect.bottom < 0 || rect.top > vh) return;
      const progress = (vh - rect.top) / (vh + rect.height); // 0 → 1 while crossing the viewport
      const y = (progress - 0.5) * rect.height * speed;
      const s = zoom ? 1.08 - Math.min(Math.max(progress, 0), 1) * 0.08 : 1;
      el.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0) scale(${s.toFixed(4)})`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [speed, zoom]);

  return (
    <div ref={ref} className={className} style={{ willChange: "transform", height: "100%" }}>
      {children}
    </div>
  );
}
