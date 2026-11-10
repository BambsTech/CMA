"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

/** Registers ScrollTrigger once, on the client only. */
export function getGsap() {
  if (!registered && typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
    gsap.defaults({ ease: "power2.inOut" });
    ScrollTrigger.config({ ignoreMobileResize: true });
    registered = true;
  }
  return { gsap, ScrollTrigger };
}

/** Media queries shared by every choreography. */
export const MQ = {
  /** Desktop with motion allowed: pinned, scroll-linked sequences. */
  cinematic: "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
  /** Tablet / mobile with motion allowed: un-pinned, scroll-linked reveals. */
  fluid: "(max-width: 1023px) and (prefers-reduced-motion: no-preference)",
} as const;

/**
 * Converts a target element's box into a clip-path `inset()` relative to a container,
 * so that compositions are designed in CSS and only measured in JS.
 */
export function insetFor(target: Element, container: Element, radius = 0) {
  const t = target.getBoundingClientRect();
  const c = container.getBoundingClientRect();
  const top = Math.max(0, t.top - c.top);
  const left = Math.max(0, t.left - c.left);
  const right = Math.max(0, c.right - t.right);
  const bottom = Math.max(0, c.bottom - t.bottom);
  const round = radius ? ` round ${radius}px` : "";
  return `inset(${top.toFixed(1)}px ${right.toFixed(1)}px ${bottom.toFixed(1)}px ${left.toFixed(1)}px${round})`;
}

/**
 * Fully open. The four values are deliberately distinct: browsers collapse
 * `inset(0px 0px 0px 0px)` to `inset(0px)`, which GSAP cannot interpolate
 * against a four-value inset (the tween would jump instead of travelling).
 */
export const FULL = "inset(0px 0.001px 0.002px 0.003px)";
