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
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
    const id = requestAnimationFrame(() => getGsap().ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [pathname]);
  return null;
}
