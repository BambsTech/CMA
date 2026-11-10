"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArtImage } from "@/components/ArtImage";
import { ArrowDown, ArrowRight } from "@/components/Icons";
import { SpreadWordmark } from "@/components/brand/SpreadWordmark";
import { FULL, MQ, getGsap } from "@/components/motion/gsap";

export type SeqPractice = {
  slug: string;
  number: string;
  title: string;
  summary: string;
  image: string;
  imageAlt: string;
};

type Copy = {
  caption: string;
  practicesLabel: string;
};

type Props = { practices: SeqPractice[]; copy: Copy };

/**
 * Homepage opening — composed after the agency's own web application (manual p. 38):
 * a quiet full-width photograph with one line of small tracked capitals, and the
 * official signature spread across the band beneath it.
 *
 * On scroll (desktop), the photograph contracts from the left into a right-hand column
 * and the six practice areas follow as editorial chapters: each photograph slides up
 * inside the frame while a small numbered index (manual p. 32, "Serviços") marks the place.
 *
 * Tablet/mobile: un-pinned flow. Reduced motion: static. Every practice link is a real link.
 */
export function HomeSequence({ practices, copy }: Props) {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(-1);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const { gsap, ScrollTrigger } = getGsap();
    const q = gsap.utils.selector(el);
    const mm = gsap.matchMedia();

    // Opening (short, time-based): the photograph rises, then the caption and the signature.
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap
        .timeline({ defaults: { ease: "expo.out" }, delay: 0.1 })
        .from(q(".seq__reveal"), { clipPath: "inset(100% 0% 0% 0%)", duration: 1.6, ease: "expo.inOut" }, 0)
        .from(q(".seq__reveal picture"), { scale: 1.25, duration: 2.4 }, 0)
        .from(q(".seq__caption > *"), { autoAlpha: 0, y: 12, duration: 1.2, stagger: 0.12 }, 0.9)
        .from(q(".spread-mark > *"), { yPercent: 105, duration: 1.4, stagger: 0.08, ease: "expo.out" }, 0.75);
    });

    // Desktop cinematic: pinned, scroll-linked.
    mm.add(MQ.cinematic, () => {
      el.classList.add("is-pinned");
      const stage = q(".seq__stage")[0] as HTMLElement;
      const media = q(".seq__media")[0] as HTMLElement;
      const openBox = q(".seq__box--open")[0] as HTMLElement;
      const splitBox = q(".seq__box--split")[0] as HTMLElement;
      const panels = q(".seq__panel");
      const shots = q(".seq__shot--chapter");
      const shotImgs = q(".seq__shot--chapter img");
      const heroImg = q(".seq__shot--hero img");

      // The frame is driven by four numeric custom properties (see home.css): compositions
      // are designed as CSS boxes and only measured here.
      const insetOf = (box: HTMLElement) => {
        const t = box.getBoundingClientRect();
        const c = stage.getBoundingClientRect();
        return { "--ct": `${t.top - c.top}px`, "--cr": `${c.right - t.right}px`, "--cb": `${c.bottom - t.bottom}px`, "--cl": `${t.left - c.left}px` };
      };
      const vars = (box: HTMLElement) => ({
        "--ct": () => insetOf(box)["--ct"],
        "--cr": () => insetOf(box)["--cr"],
        "--cb": () => insetOf(box)["--cb"],
        "--cl": () => insetOf(box)["--cl"],
      });

      gsap.set(media, insetOf(openBox));
      gsap.set(shots, { clipPath: "inset(100% 0% 0% 0%)" });
      gsap.set(q(".seq__panel [data-mask] > *"), { yPercent: 110, y: 0 });
      gsap.set(q(".seq__chapters"), { opacity: 0 });

      const CH = 1.2; // timeline time at which the chapters begin
      const STEP = 1.1; // length of one chapter

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: () => `+=${Math.round(window.innerHeight * 4.4)}`,
          pin: stage,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const t = self.progress * tl.duration();
            const idx = t < CH - 0.35 ? -1 : Math.min(practices.length - 1, Math.max(0, Math.floor((t - CH - 0.3) / STEP)));
            setActive((prev) => (prev === idx ? prev : idx));
          },
        },
      });

      // The opening clears — caption fades, the signature settles away below…
      tl.to(q(".seq__caption"), { autoAlpha: 0, y: -24, duration: 0.35, ease: "power2.in" }, 0)
        .to(q(".seq__brand"), { autoAlpha: 0, y: 48, duration: 0.5, ease: "power2.in" }, 0.02)
        // …as the photograph contracts from the left into the right-hand column.
        .fromTo(media, vars(openBox), { ...vars(splitBox), duration: 1.0, ease: "power3.inOut" }, 0.1)
        .fromTo(heroImg, { scale: 1, xPercent: 0 }, { scale: 1.08, xPercent: 6, duration: 1.0, ease: "power2.inOut" }, 0.1)
        .to(q(".seq__chapters"), { opacity: 1, duration: 0.01 }, 0.75)
        .from(q(".seq__chapters-head > *"), { y: 22, autoAlpha: 0, stagger: 0.025, duration: 0.45, ease: "power3.out" }, 0.75);

      // Chapters.
      panels.forEach((panel, i) => {
        const at = CH + i * STEP;
        const parts = panel.querySelectorAll("[data-mask] > *");
        tl.to(shots[i], { clipPath: "inset(0% 0% 0% 0%)", duration: 0.8, ease: "power3.inOut" }, at)
          .fromTo(shotImgs[i], { yPercent: 14, scale: 1.06 }, { yPercent: 0, scale: 1, duration: 0.95, ease: "power2.out" }, at)
          .to(i === 0 ? heroImg : shotImgs[i - 1], { yPercent: -10, duration: 0.8, ease: "power3.inOut" }, at)
          .fromTo(parts, { yPercent: 110, y: 0, autoAlpha: 1 }, { yPercent: 0, y: 0, duration: 0.55, stagger: 0.05, ease: "power3.out" }, at + 0.32);
        if (i > 0) {
          tl.to(panels[i - 1].querySelectorAll("[data-mask] > *"), { yPercent: -60, autoAlpha: 0, duration: 0.3, stagger: 0.02, ease: "power2.in" }, at);
        }
      });
      tl.to({}, { duration: 0.6 });

      // Keyboard: focusing a chapter link scrolls to the moment it is shown.
      const onFocus = (e: FocusEvent) => {
        const st = tl.scrollTrigger;
        const target = e.target as HTMLElement;
        if (!st || !target.closest) return;
        let at: number | null = null;
        const panel = target.closest<HTMLElement>(".seq__panel");
        if (panel) at = CH + panels.indexOf(panel) * STEP + 0.95;
        else if (target.closest(".seq__chapters")) at = Math.max(tl.time(), CH + 0.95);
        if (at === null) return;
        const y = st.start + (at / tl.duration()) * (st.end - st.start);
        if (Math.abs(window.scrollY - y) > 4 && (Math.abs(at - tl.time()) > 0.2 || tl.time() < CH)) {
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

    // Tablet / mobile: chapter images reveal as they scroll in.
    mm.add(MQ.fluid, () => {
      q(".seq__panel-frame").forEach((frame) => {
        gsap.fromTo(
          frame,
          { clipPath: "inset(18% 0% 0% 0%)" },
          { clipPath: FULL, ease: "none", scrollTrigger: { trigger: frame, start: "top 95%", end: "top 45%", scrub: 0.5 } },
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

  return (
    <section ref={root} className="seq" data-active={active} aria-labelledby="seq-h1">
      <div className="seq__stage">
        <div className="seq__box seq__box--open" aria-hidden="true" />
        <div className="seq__box seq__box--split" aria-hidden="true" />

        {/* Opening photograph (manual p. 38) */}
        <div className="seq__media" data-tone="dark">
          <div className="seq__shot seq__shot--hero">
            <div className="seq__reveal">
              <ArtImage
                desktop={{ src: "/assets/architecture/colonnade.webp", width: 1672, height: 941 }}
                mobile={{ src: "/assets/architecture/colonnade-mobile.webp", width: 900, height: 1600 }}
                alt="Imagem conceitual: colunata de concreto com luz do entardecer."
                priority
                position="56% 55%"
              />
            </div>
          </div>
          {practices.map((p, i) => (
            <div key={p.slug} className="seq__shot seq__shot--chapter" data-i={i} aria-hidden="true">
              <Image src={p.image} alt="" fill sizes="50vw" loading="lazy" />
            </div>
          ))}
          <div className="seq__caption">
            <h1 id="seq-h1" className="seq__caption-text">
              <span className="sr-only">Carolina Meirelles & Advogados — </span>
              {copy.caption}
            </h1>
            <a href="#areas-lista" className="seq__cue" aria-label="Rolar para as áreas de atuação">
              <ArrowDown />
            </a>
          </div>
        </div>

        {/* The signature, spread across the band beneath the photograph */}
        <div className="seq__brand">
          <SpreadWordmark />
        </div>

        {/* Chapters */}
        <div className="seq__chapters" id="areas-lista">
          <div className="seq__chapters-head">
            <h2 className="label">{copy.practicesLabel}</h2>
            <p className="seq__counter num" aria-hidden="true">
              <span>{active >= 0 ? practices[active].number : "01"}</span> / {String(practices.length).padStart(2, "0")}
            </p>
          </div>

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
                    <Link href={`/areas-de-atuacao/${p.slug}`} className="link-line">
                      Conhecer a área
                      <ArrowRight />
                    </Link>
                  </span>
                </p>
              </li>
            ))}
          </ol>

        </div>
      </div>
    </section>
  );
}
