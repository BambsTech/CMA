"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { ArtImage } from "@/components/ArtImage";
import { CmaMark, AdvogadosMark } from "@/components/brand/Cma";
import { ArrowRight } from "@/components/Icons";
import { MQ, getGsap } from "@/components/motion/gsap";

type Img = { src: string; width: number; height: number };
type Props = {
  image: { desktop: Img; mobile?: Img; alt: string; position?: string };
  signature: readonly [string, string] | string[];
  essence: string;
  intro: { title: string; paragraphs: string[] };
};

/**
 * Signature interaction A — the institutional opening.
 *
 * At rest: an architectural photograph, CMA set large from the brand's own outlines, the
 * institutional signature. On scroll (desktop), one continuous movement: the photograph
 * contracts into a window on the right, CMA — drawn twice, once inside the photograph in
 * stone and once on the page in espresso — shrinks to the top left, so the letters change
 * colour exactly at the edge of the moving frame; the introduction rises beneath it.
 *
 * Tablet/mobile and reduced motion: the photograph and the introduction simply follow
 * each other in the page. Every piece of text is real, selectable, in the DOM.
 */
export function Hero({ image, signature, essence, intro }: Props) {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const { gsap, ScrollTrigger } = getGsap();
    const q = gsap.utils.selector(el);
    const mm = gsap.matchMedia();

    // Arrival (time-based, short; content is visible without it).
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap
        .timeline({ defaults: { ease: "expo.out" }, delay: 0.05 })
        .from(q(".hero__photo"), { clipPath: "inset(100% 0% 0% 0%)", duration: 1.5, ease: "expo.inOut" }, 0)
        .from(q(".hero__photo picture"), { scale: 1.18, duration: 2.4 }, 0)
        .from(q(".hero__mark-in"), { yPercent: 104, duration: 1.5, stagger: 0 }, 0.55)
        .from(q(".hero__line > span"), { yPercent: 110, duration: 1.2, stagger: 0.1 }, 0.85)
        .from(q(".hero__essence, .hero__adv, .hero__place"), { autoAlpha: 0, y: 14, duration: 1.1, stagger: 0.08 }, 1.15);
    });

    mm.add(MQ.cinematic, () => {
      el.classList.add("is-pinned");
      const stage = q(".hero__stage")[0] as HTMLElement;
      const media = q(".hero__media")[0] as HTMLElement;
      const winBox = q(".hero__box--win")[0] as HTMLElement;
      const markStart = q(".hero__mbox--start")[0] as HTMLElement;
      const markEnd = q(".hero__mbox--end")[0] as HTMLElement;
      const marks = q(".hero__mark");

      const inset = () => {
        const t = winBox.getBoundingClientRect();
        const c = stage.getBoundingClientRect();
        return { "--ct": `${t.top - c.top}px`, "--cr": `${c.right - t.right}px`, "--cb": `${c.bottom - t.bottom}px`, "--cl": `${t.left - c.left}px` };
      };
      // FLIP between two CSS-designed boxes: the mark is laid out at its start box.
      const flip = () => {
        const a = markStart.getBoundingClientRect();
        const b = markEnd.getBoundingClientRect();
        return { x: b.left - a.left, y: b.top - a.top, scale: b.width / a.width };
      };

      gsap.set(media, { "--ct": "0px", "--cr": "0px", "--cb": "0px", "--cl": "0px" });
      gsap.set(marks, { transformOrigin: "0 0" });
      gsap.set(q(".hero__intro [data-rise]"), { yPercent: 40, autoAlpha: 0 });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: () => `+=${Math.round(window.innerHeight * 1.5)}`,
          pin: stage,
          scrub: 0.9,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.to(q(".hero__copy, .hero__adv, .hero__place, .hero__cue"), { autoAlpha: 0, y: -28, duration: 0.25, ease: "power2.in", stagger: 0.02 }, 0)
        .to(media, { "--ct": () => inset()["--ct"], "--cr": () => inset()["--cr"], "--cb": () => inset()["--cb"], "--cl": () => inset()["--cl"], duration: 1, ease: "power3.inOut" }, 0.08)
        .to(q(".hero__photo picture"), { scale: 1.1, xPercent: -4, duration: 1, ease: "power2.inOut" }, 0.08)
        .to(q(".hero__veil"), { opacity: 0.12, duration: 0.8 }, 0.1)
        .to(marks, { x: () => flip().x, y: () => flip().y, scale: () => flip().scale, duration: 1, ease: "power3.inOut" }, 0.08)
        .to(q(".hero__intro [data-rise]"), { yPercent: 0, autoAlpha: 1, duration: 0.45, stagger: 0.06, ease: "power3.out" }, 0.78)
        .to({}, { duration: 0.35 });

      // Keyboard: focusing the introduction's link shows its final state.
      const onFocus = (e: FocusEvent) => {
        const st = tl.scrollTrigger;
        if (st && (e.target as HTMLElement).closest?.(".hero__intro")) window.scrollTo({ top: st.end - 2, behavior: "instant" as ScrollBehavior });
      };
      el.addEventListener("focusin", onFocus);
      return () => {
        el.removeEventListener("focusin", onFocus);
        el.classList.remove("is-pinned");
      };
    });

    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);
    return () => {
      window.removeEventListener("load", onLoad);
      mm.revert();
    };
  }, []);

  return (
    <section ref={root} className="hero" aria-labelledby="hero-title">
      <div className="hero__stage">
        {/* Layout targets — measured, never visible */}
        <div className="hero__box hero__box--win" aria-hidden="true" />
        <div className="hero__mbox hero__mbox--start" aria-hidden="true" />
        <div className="hero__mbox hero__mbox--end" aria-hidden="true" />

        {/* The page beneath the photograph */}
        <div className="hero__ground">
          <div className="hero__mark hero__mark--ink" aria-hidden="true">
            <div className="hero__mark-in">
              <CmaMark title={null} />
            </div>
          </div>
          <div className="hero__intro">
            <p className="label" data-rise="">
              O escritório
            </p>
            <h2 className="hero__intro-title" data-rise="">
              {intro.title}
            </h2>
            <div className="hero__intro-cols" data-rise="">
              {intro.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <p data-rise="">
              <Link href="/escritorio" className="link-line">
                Conheça o escritório
                <ArrowRight />
              </Link>
            </p>
          </div>
        </div>

        {/* The photograph, with its own (stone) copy of CMA */}
        <div className="hero__media" data-tone="dark">
          <div className="hero__photo">
            <ArtImage desktop={image.desktop} mobile={image.mobile} alt={image.alt} priority position={image.position} />
          </div>
          <div className="hero__veil" aria-hidden="true" />
          <div className="hero__mark hero__mark--light" aria-hidden="true">
            <div className="hero__mark-in">
              <CmaMark title={null} />
            </div>
          </div>
          <div className="hero__copy">
            <h1 id="hero-title" className="hero__title">
              <span className="sr-only">CMA Advogados — </span>
              <span className="hero__line">
                <span>{signature[0]}</span>
              </span>
              <span className="hero__line">
                <span>{signature[1]}</span>
              </span>
            </h1>
            <p className="hero__essence">{essence}</p>
          </div>
          <div className="hero__adv" aria-hidden="true">
            <AdvogadosMark />
          </div>
          <p className="hero__place">Brasília · DF</p>
        </div>
      </div>
    </section>
  );
}
