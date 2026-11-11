"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { getGsap } from "./motion/gsap";

/**
 * Every navigation starts at the very top of the page, instantly — never part-way through
 * a pinned sequence and never rewinding it with a smooth scroll.
 */
export function RouteScroll() {
  const pathname = usePathname();
  useEffect(() => {
    if (window.location.hash) return;
    const top = () => window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
    top();
    // The outgoing page's pinned sections release their spacers a frame later, and the
    // router may restore a scroll position after this effect: repeat once layout has settled.
    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      top();
      getGsap().ScrollTrigger.refresh();
      raf2 = requestAnimationFrame(top);
    });
    const timer = window.setTimeout(top, 120);
    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      window.clearTimeout(timer);
    };
  }, [pathname]);
  return null;
}
