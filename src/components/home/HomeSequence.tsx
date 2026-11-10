"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArtImage } from "@/components/ArtImage";
import { ArrowDown, ArrowRight, ArrowUpRight } from "@/components/Icons";
import { FULL, MQ, getGsap, insetFor } from "@/components/motion/gsap";

export type SeqPractice = {
  slug: string;
  number: string;
  title: string;
  summary: string;
  image: string;
  imageAlt: string;
};

type Copy = {
  kicker: string;
  line1: string;
  line2: string;
  lede: string;
  statementLabel: string;
  statement: string;
  values: readonly string[];
  practicesLabel: string;
  practicesIntro: string;
};

type Props = { practices: SeqPractice[]; copy: Copy; city: string };

/**
 * Homepage signature sequence — one continuous, scroll-linked composition:
 *
 *  A  Hero: monumental type crossing a framed photograph. Wherever the photograph sits
 *     behind the headline the letters turn stone — type and image share one surface.
 *  B  The frame expands to full bleed; the headline settles small at the lower left and
 *     the firm's statement arrives over the photograph (the bridge into the next chapter).
 *  C  The photograph contracts from the left into a right-hand column, freeing the canvas.
 *  D  Six editorial chapters: each practice photograph slides up inside the frame while
 *     the text column swaps title and summary through line masks.
 *
 * Desktop with motion: one pinned ScrollTrigger timeline. Tablet/mobile: un-pinned,
 * art-directed flow with light scroll-linked reveals. Reduced motion: static layout.
 * All six practice links are real links, always present in the DOM.
 */
export function HomeSequence({ practices, copy, city }: Props) {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(-1);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const { gsap, ScrollTrigger } = getGsap();
    const q = gsap.utils.selector(el);
    const mm = gsap.matchMedia();

    // — Opening (time-based, short): headline lines rise, frame reveals, small type follows.
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const intro = gsap.timeline({ defaults: { ease: "expo.out" }, delay: 0.15 });
      intro
        .from(q(".seq__line > span"), { yPercent: 108, duration: 1.5, stagger: 0.12 })
        .from(q(".seq__reveal"), { clipPath: "inset(100% 0% 0% 0%)", duration: 1.6, ease: "expo.inOut" }, 0)
        .from(q(".seq__reveal picture"), { scale: 1.3, duration: 2.2 }, 0)
        .from(q(".seq__fade > *"), { autoAlpha: 0, y: 14, duration: 1, stagger: 0.08 }, 0.7);
    });

    // — Desktop cinematic: pinned, scroll-linked choreography.
    mm.add(MQ.cinematic, () => {
      el.classList.add("is-pinned");
      const stage = q(".seq__stage")[0] as HTMLElement;
      const media = q(".seq__media")[0] as HTMLElement;
      const heroBox = q(".seq__box--hero")[0] as HTMLElement;
      const splitBox = q(".seq__box--split")[0] as HTMLElement;
      const titles = q(".seq__title");
      const line2 = q(".seq__line--2 > span");
      const panels = q(".seq__panel");
      const shots = q(".seq__shot--chapter");
      const shotImgs = q(".seq__shot--chapter img");
      const heroImg = q(".seq__shot--hero img");

      gsap.set(media, { clipPath: () => insetFor(heroBox, stage) });
      gsap.set(shots, { clipPath: "inset(100% 0% 0% 0%)" });
      gsap.set(q(".seq__panel [data-mask] > *"), { yPercent: 110, y: 0 });
      gsap.set(q(".seq__chapters"), { opacity: 0 });
      gsap.set(q(".seq__overlay [data-mask] > *"), { yPercent: 110, y: 0 });

      const CH = 3.0; // timeline time at which chapters begin
      const STEP = 1.15; // timeline length of one chapter

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: () => `+=${Math.round(window.innerHeight * 5.4)}`,
          pin: stage,
          scrub: 0.7,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const t = self.progress * tl.duration();
            const idx = t < CH - 0.35 ? -1 : Math.min(practices.length - 1, Math.max(0, Math.floor((t - CH - 0.3) / STEP)));
            setActive((prev) => (prev === idx ? prev : idx));
          },
        },
      });

      // A → B: the frame opens to full bleed with a counter-zoom for depth.
      tl.fromTo(media, { clipPath: () => insetFor(heroBox, stage) }, { clipPath: FULL, duration: 1.1, ease: "power2.inOut" }, 0)
        .fromTo(heroImg, { scale: 1.16 }, { scale: 1, duration: 1.3, ease: "power1.out" }, 0)
        .to(q(".seq__fade"), { autoAlpha: 0, y: -16, duration: 0.35, stagger: 0.03 }, 0)
        .to(q(".seq__shade"), { opacity: 1, duration: 0.6 }, 0.7)
        // The headline reorganises: the second line aligns under the first, then the
        // whole title settles, smaller, at the lower left of the photograph.
        .to(line2, { x: () => -(line2[0].parentElement!.offsetWidth - line2[0].offsetWidth), duration: 0.8, ease: "power2.inOut" }, 0.55)
        .to(
          titles,
          {
            scale: 0.4,
            y: () => {
              const t0 = titles[0];
              return window.innerHeight * 0.9 - (t0.offsetTop + t0.offsetHeight);
            },
            duration: 0.9,
            ease: "power2.inOut",
          },
          0.6,
        )
        // B: the statement arrives over the photograph.
        .fromTo(q(".seq__overlay [data-mask] > *"), { yPercent: 110, y: 0 }, { yPercent: 0, y: 0, duration: 0.6, stagger: 0.06, ease: "power3.out" }, 1.2)
        // C: the photograph contracts into the right-hand column.
        .to(q(".seq__overlay"), { autoAlpha: 0, x: -40, duration: 0.35, ease: "power1.in" }, 2.0)
        .to(titles, { autoAlpha: 0, x: -60, duration: 0.35, ease: "power1.in" }, 2.0)
        .to(q(".seq__shade"), { opacity: 0, duration: 0.5 }, 2.05)
        .to(media, { clipPath: () => insetFor(splitBox, stage), duration: 0.85, ease: "power3.inOut" }, 2.0)
        .to(heroImg, { scale: 1.12, xPercent: 6, duration: 0.85, ease: "power2.inOut" }, 2.0)
        .to(q(".seq__chapters"), { opacity: 1, duration: 0.01 }, 2.62)
        .from(q(".seq__chapters-head > *, .seq__chapters-intro, .seq__rail li"), { y: 28, autoAlpha: 0, stagger: 0.025, duration: 0.45, ease: "power3.out" }, 2.62);

      // D: chapters.
      panels.forEach((panel, i) => {
        const at = CH + i * STEP;
        const parts = panel.querySelectorAll("[data-mask] > *");
        tl.to(shots[i], { clipPath: "inset(0% 0% 0% 0%)", duration: 0.8, ease: "power3.inOut" }, at)
          .fromTo(shotImgs[i], { yPercent: 16, scale: 1.08 }, { yPercent: 0, scale: 1, duration: 0.95, ease: "power2.out" }, at)
          .to(i === 0 ? heroImg : shotImgs[i - 1], { yPercent: -10, duration: 0.8, ease: "power3.inOut" }, at)
          .fromTo(parts, { yPercent: 110, y: 0, autoAlpha: 1 }, { yPercent: 0, y: 0, duration: 0.55, stagger: 0.05, ease: "power3.out" }, at + 0.32);
        if (i > 0) {
          // Outgoing chapter: lifts and dims quickly, clearing the column before the next arrives.
          tl.to(panels[i - 1].querySelectorAll("[data-mask] > *"), { yPercent: -60, autoAlpha: 0, duration: 0.3, stagger: 0.02, ease: "power2.in" }, at);
        }
      });
      tl.to({}, { duration: 0.6 }); // closing hold on the last chapter

      // Keyboard: when focus enters a part of the stage that is not on screen yet,
      // scroll to the moment of the sequence where that part is shown.
      const onFocus = (e: FocusEvent) => {
        const st = tl.scrollTrigger;
        const target = e.target as HTMLElement;
        if (!st || !target.closest) return;
        let at: number | null = null;
        if (target.closest(".seq__overlay")) at = 1.75;
        const panel = target.closest<HTMLElement>(".seq__panel");
        if (panel) at = CH + panels.indexOf(panel) * STEP + 0.95;
        else if (target.closest(".seq__chapters")) at = Math.max(tl.time(), CH + 0.95);
        if (at === null) return;
        const y = st.start + (at / tl.duration()) * (st.end - st.start);
        if (Math.abs(window.scrollY - y) > 4 && (at < tl.time() - 0.2 || at > tl.time() + 0.2 || tl.time() < CH)) {
          window.scrollTo({ top: y, behavior: "instant" as ScrollBehavior });
        }
      };
      el.addEventListener("focusin", onFocus);

      return () => {
        el.removeEventListener("focusin", onFocus);
        el.classList.remove("is-pinned");
        setActive(-1);
      };
    });

    // — Tablet / mobile: art-directed flow with scroll-linked frame and image reveals.
    mm.add(MQ.fluid, () => {
      gsap.fromTo(
        q(".seq__media"),
        { clipPath: "inset(0% 7% 0% 7% round 0px)" },
        { clipPath: FULL, ease: "none", scrollTrigger: { trigger: q(".seq__media")[0], start: "top 85%", end: "top 15%", scrub: 0.5 } },
      );
      q(".seq__panel-frame").forEach((frame) => {
        gsap.fromTo(
          frame,
          { clipPath: "inset(18% 0% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", ease: "none", scrollTrigger: { trigger: frame, start: "top 95%", end: "top 45%", scrub: 0.5 } },
        );
        gsap.fromTo(
          frame.querySelector("img"),
          { yPercent: -8, scale: 1.12 },
          { yPercent: 0, scale: 1, ease: "none", scrollTrigger: { trigger: frame, start: "top bottom", end: "bottom top", scrub: true } },
        );
      });
    });

    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);
    return () => {
      window.removeEventListener("load", onLoad);
      mm.revert();
    };
  }, [practices.length]);

  const title = (ghost: boolean) => (
    <p className={`seq__title${ghost ? " seq__title--ghost" : ""}`} aria-hidden="true">
      <span className="seq__line seq__line--1">
        <span>{copy.line1}</span>
      </span>
      <span className="seq__line seq__line--2">
        <span>{copy.line2}</span>
      </span>
    </p>
  );

  return (
    <section ref={root} className="seq" data-active={active} aria-labelledby="seq-h1">
      <div className="seq__stage">
        {/* Invisible layout targets the timeline measures (designed in CSS). */}
        <div className="seq__box seq__box--hero" aria-hidden="true" />
        <div className="seq__box seq__box--split" aria-hidden="true" />

        {/* A — hero canvas (stone) */}
        <div className="seq__hero">
          <h1 id="seq-h1" className="sr-only">
            {copy.line1} {copy.line2} — {copy.kicker}
          </h1>
          <p className="label seq__kicker seq__fade">
            <span>{copy.kicker}</span>
          </p>
          {title(false)}
          <p className="seq__lede seq__fade">
            <span>{copy.lede}</span>
          </p>
          <div className="seq__cue seq__fade">
            <a href="#areas-lista" className="link-line link-line--down">
              Áreas de atuação
              <ArrowDown />
            </a>
            <span className="caption">{city} · DF</span>
          </div>
        </div>

        {/* The photographic window */}
        <div className="seq__media" data-tone="dark">
          <div className="seq__shot seq__shot--hero">
            <div className="seq__reveal">
              <ArtImage
                desktop={{ src: "/assets/architecture/colonnade.webp", width: 1672, height: 941 }}
                mobile={{ src: "/assets/architecture/colonnade-mobile.webp", width: 900, height: 1600 }}
                alt="Imagem conceitual: colunata de concreto com luz do entardecer."
                priority
                position="56% 50%"
              />
            </div>
          </div>
          {practices.map((p, i) => (
            <div key={p.slug} className="seq__shot seq__shot--chapter" data-i={i} aria-hidden="true">
              <Image src={p.image} alt="" fill sizes="50vw" loading="lazy" />
            </div>
          ))}
          <div className="seq__shade" />
          {title(true)}
          <div className="seq__overlay">
            <p className="label seq__overlay-label" data-mask="">
              <span>{copy.statementLabel}</span>
            </p>
            <div className="seq__overlay-body">
              <p className="seq__statement" data-mask="">
                <span>{copy.statement}</span>
              </p>
              <p className="seq__values" data-mask="">
                <span>
                  {copy.values.map((v, i) => (
                    <span key={v} className="seq__value">
                      <span className="num">{String(i + 1).padStart(2, "0")}</span> {v}
                    </span>
                  ))}
                </span>
              </p>
              <p data-mask="">
                <span>
                  <Link href="/escritorio" className="link-line">
                    Conheça o escritório
                    <ArrowRight />
                  </Link>
                </span>
              </p>
            </div>
          </div>
          <p className="concept-note seq__note">Imagens conceituais.</p>
        </div>

        {/* D — chapter column */}
        <div className="seq__chapters" id="areas-lista">
          <div className="seq__chapters-head">
            <h2 className="label label--rule">{copy.practicesLabel}</h2>
            <p className="seq__counter num" aria-hidden="true">
              <span>{active >= 0 ? practices[active].number : "01"}</span> / {String(practices.length).padStart(2, "0")}
            </p>
          </div>
          <p className="t-body seq__chapters-intro">{copy.practicesIntro}</p>

          <ol className="seq__panels" role="list">
            {practices.map((p, i) => (
              <li key={p.slug} className="seq__panel" data-current={active === i ? "true" : "false"}>
                <div className="frame seq__panel-frame">
                  <Image src={p.image} alt={p.imageAlt} fill sizes="(min-width: 720px) 45vw, 100vw" />
                </div>
                <p className="num seq__panel-num" data-mask="">
                  <span>{p.number}</span>
                </p>
                <h3 className="seq__panel-title" data-mask="">
                  <span>{p.title}</span>
                </h3>
                <p className="seq__panel-summary" data-mask="">
                  <span>{p.summary}</span>
                </p>
                <p data-mask="">
                  <span>
                    <Link href={`/areas-de-atuacao/${p.slug}`} className="link-line" tabIndex={active === -1 || active === i ? undefined : -1}>
                      Conhecer a área
                      <ArrowRight />
                    </Link>
                  </span>
                </p>
              </li>
            ))}
          </ol>

          <nav className="seq__rail" aria-label="Áreas de atuação">
            <ol role="list">
              {practices.map((p, i) => (
                <li key={p.slug} data-current={active === i ? "true" : "false"}>
                  <Link href={`/areas-de-atuacao/${p.slug}`}>
                    <span className="num">{p.number}</span>
                    <span className="seq__rail-title">{p.title}</span>
                    <ArrowUpRight />
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/areas-de-atuacao" className="seq__rail-all">
                  <span className="num">—</span>
                  <span className="seq__rail-title">Visão geral das áreas</span>
                  <ArrowRight />
                </Link>
              </li>
            </ol>
          </nav>
        </div>
      </div>
    </section>
  );
}
