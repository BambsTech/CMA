"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "@/components/Icons";
import { MQ, getGsap } from "@/components/motion/gsap";

export type IndexArea = {
  slug: string;
  numero: string;
  titulo: string;
  chamada: string;
  servicos: string[];
  imagem: string;
  imagemAlt: string;
};

/**
 * Signature interaction B — the connected expertise sequence.
 *
 * Desktop: the index holds still while the reader scrolls; each area takes its turn as the
 * active entry (its summary opens beneath its title) and its photograph rises over the
 * previous one through a mask, the previous one drifting up behind it. About two-thirds of
 * a viewport of scroll per area, so five short descriptions never become a long journey.
 *
 * Tablet/mobile and reduced motion: a plain vertical sequence with each photograph inline.
 * Every title is a real link to the area's page.
 */
export function AreasIndex({ items, note }: { items: IndexArea[]; note: string }) {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const { gsap } = getGsap();
    const q = gsap.utils.selector(el);
    const mm = gsap.matchMedia();

    mm.add(MQ.cinematic, () => {
      el.classList.add("is-pinned");
      const shots = q(".ax__shot");
      const imgs = q(".ax__shot img");
      gsap.set(shots.slice(1), { clipPath: "inset(100% 0% 0% 0%)" });

      const STEP = 1;
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: () => `+=${Math.round(window.innerHeight * 0.68 * items.length)}`,
          pin: q(".ax__stage")[0],
          scrub: 0.7,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const t = self.progress * tl.duration();
            const idx = Math.min(items.length - 1, Math.max(0, Math.floor((t + 0.45) / STEP)));
            setActive((p) => (p === idx ? p : idx));
          },
        },
      });
      tl.fromTo(imgs[0], { scale: 1.06 }, { scale: 1, duration: STEP, ease: "power1.out" }, 0);
      for (let i = 1; i < items.length; i++) {
        const at = (i - 1) * STEP + 0.35;
        tl.to(shots[i], { clipPath: "inset(0% 0% 0% 0%)", duration: 0.75, ease: "power3.inOut" }, at)
          .fromTo(imgs[i], { yPercent: 12, scale: 1.12 }, { yPercent: 0, scale: 1, duration: 0.9, ease: "power2.out" }, at)
          .to(imgs[i - 1], { yPercent: -8, duration: 0.75, ease: "power3.inOut" }, at);
      }
      tl.to({}, { duration: 0.4 });

      // Keyboard: focusing an entry scrolls to the moment it is active.
      const onFocus = (e: FocusEvent) => {
        const st = tl.scrollTrigger;
        const li = (e.target as HTMLElement).closest?.<HTMLElement>(".ax__item");
        if (!st || !li) return;
        const i = Number(li.dataset.i);
        const at = Math.max(0, i * STEP - 0.2);
        window.scrollTo({ top: st.start + (at / tl.duration()) * (st.end - st.start), behavior: "instant" as ScrollBehavior });
      };
      el.addEventListener("focusin", onFocus);
      return () => {
        el.removeEventListener("focusin", onFocus);
        el.classList.remove("is-pinned");
        setActive(0);
      };
    });

    mm.add(MQ.fluid, () => {
      q(".ax__inline").forEach((f) =>
        gsap.fromTo(f, { clipPath: "inset(16% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", ease: "none", scrollTrigger: { trigger: f, start: "top 95%", end: "top 50%", scrub: 0.5 } }),
      );
    });

    return () => mm.revert();
  }, [items.length]);

  return (
    <section ref={root} className="ax" aria-labelledby="ax-title" data-active={active}>
      <div className="ax__stage">
        <header className="ax__head">
          <p className="label">Atuação</p>
          <h2 id="ax-title" className="ax__title">
            Áreas que se conectam.
          </h2>
          <p className="ax__count num" aria-hidden="true">
            <span>{items[active]?.numero}</span> / {String(items.length).padStart(2, "0")}
          </p>
        </header>

        <ol className="ax__list" role="list">
          {items.map((a, i) => (
            <li key={a.slug} className="ax__item" data-i={i} data-current={active === i ? "true" : "false"}>
              <Link href={`/areas-de-atuacao/${a.slug}`} className="ax__link">
                <span className="ax__n num">{a.numero}</span>
                <span className="ax__name">{a.titulo}</span>
              </Link>
              <div className="ax__detail">
                <div>
                  <div className="ax__inline">
                    <Image src={a.imagem} alt="" fill sizes="100vw" />
                  </div>
                  <p className="ax__chamada">{a.chamada}</p>
                  <p className="ax__servicos">{a.servicos.join(" · ")}</p>
                  <Link href={`/areas-de-atuacao/${a.slug}`} className="link-line ax__more" tabIndex={-1} aria-hidden="true">
                    Conhecer a área
                    <ArrowRight />
                  </Link>
                </div>
              </div>
            </li>
          ))}
        </ol>

        <p className="ax__note">{note}</p>

        <div className="ax__media" data-tone="dark" aria-hidden="true">
          {items.map((a, i) => (
            <div key={a.slug} className="ax__shot" data-i={i}>
              <Image src={a.imagem} alt="" fill sizes="(min-width: 1024px) 46vw, 100vw" priority={i === 0} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
