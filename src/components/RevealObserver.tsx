"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * One observer for the whole document: adds `.is-in` to [data-reveal] elements as they enter.
 * Content is fully visible without JS (styles are gated by the `.js` class on <html>).
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-in)"));
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-in"));
      return;
    }
    // A fully clipped element (mask reveal) never reports an intersection, so its parent is observed instead.
    const targets = new Map<Element, HTMLElement[]>();
    for (const el of els) {
      const t = el.dataset.reveal === "mask" && el.parentElement ? el.parentElement : el;
      targets.set(t, [...(targets.get(t) ?? []), el]);
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            targets.get(entry.target)?.forEach((el) => el.classList.add("is-in"));
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.01 },
    );
    targets.forEach((_, t) => io.observe(t));
    // Keyboard focus must never land on content that is still waiting to be revealed.
    const onFocus = (e: FocusEvent) => {
      let n = e.target instanceof Element ? e.target.closest<HTMLElement>("[data-reveal]") : null;
      while (n) {
        n.classList.add("is-in");
        n = n.parentElement?.closest<HTMLElement>("[data-reveal]") ?? null;
      }
    };
    document.addEventListener("focusin", onFocus);
    return () => {
      io.disconnect();
      document.removeEventListener("focusin", onFocus);
    };
  }, [pathname]);

  return null;
}
