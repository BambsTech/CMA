"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { PortraitPlaceholder } from "@/components/PortraitPlaceholder";
import { Pending } from "@/components/Pending";
import { ArrowRight } from "@/components/Icons";
import { MQ, getGsap } from "@/components/motion/gsap";

type Props = {
  name: string;
  role: string;
  bio: readonly string[];
  oab: string | null;
  education: readonly string[] | null;
  specialty: string;
  portrait: string | null;
};

function box(target: Element, container: Element, r = 0) {
  const t = target.getBoundingClientRect();
  const c = container.getBoundingClientRect();
  const f = (n: number) => Math.max(0, n).toFixed(1);
  return `inset(${f(t.top - c.top)}px ${f(c.right - t.right)}px ${f(c.bottom - t.bottom)}px ${f(t.left - c.left)}px round ${r}px ${r}px 0px 0px)`;
}

/**
 * Founder chapter: a wide architectural frame contracts into an arch — the shape of the
 * colonnades that run through the site — and the architecture lifts away to reveal the
 * portrait. The name crosses the arch and turns stone where it overlaps the image.
 */
export function FounderReveal({ name, role, bio, oab, education, specialty, portrait }: Props) {
  const root = useRef<HTMLElement>(null);
  const [first, last] = name.split(" ");

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const { gsap } = getGsap();
    const q = gsap.utils.selector(el);
    const mm = gsap.matchMedia();

    mm.add(MQ.cinematic, () => {
      el.classList.add("is-pinned");
      const stage = q(".founder2__stage")[0];
      const frame = q(".founder2__frame")[0];
      const wide = q(".founder2__box--wide")[0];
      const arch = q(".founder2__box--arch")[0];
      const radius = () => arch.getBoundingClientRect().width / 2;

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: () => `+=${Math.round(window.innerHeight * 1.6)}`,
          pin: stage,
          scrub: 0.7,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
      // 1 · the wide architectural frame contracts into an arch
      tl.fromTo(frame, { clipPath: () => box(wide, stage, 0) }, { clipPath: () => box(arch, stage, radius()), duration: 1, ease: "power3.inOut" }, 0)
        .fromTo(q(".founder2__arch-img img"), { scale: 1.12 }, { scale: 1, duration: 1, ease: "power2.out" }, 0)
        // 2 · the name slides in across the arch (stone where it overlaps the image)
        .fromTo(q(".founder2__name"), { x: () => window.innerWidth * 0.14 }, { x: 0, duration: 1.2, ease: "power2.out" }, 0.1)
        .fromTo(q(".founder2__name .seq__line > span"), { yPercent: 108, y: 0 }, { yPercent: 0, y: 0, duration: 0.6, stagger: 0.08, ease: "power3.out" }, 0.25)
        // 3 · once the arch has formed, the architecture lifts away to reveal the portrait
        .fromTo(q(".founder2__arch-img"), { clipPath: "inset(0% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 100% 0%)", duration: 0.75, ease: "power3.inOut" }, 1.0)
        .fromTo(q(".founder2__arch-img img"), { yPercent: 0 }, { yPercent: -16, duration: 0.75, ease: "power3.inOut", immediateRender: false }, 1.0)
        .fromTo(q(".founder2__portrait"), { scale: 1.1 }, { scale: 1, duration: 0.9, ease: "power2.out" }, 1.0)
        // 4 · biography and credentials
        .fromTo(q(".founder2__content > *"), { opacity: 0, y: 36 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.07, ease: "power3.out" }, 1.15)
        .fromTo(q(".founder2__caption"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4 }, 1.2)
        .to({}, { duration: 0.35 });

      const onFocus = () => {
        const st = tl.scrollTrigger;
        if (st && tl.progress() < 0.92) window.scrollTo({ top: st.end - 2, behavior: "instant" as ScrollBehavior });
      };
      const content = q(".founder2__content")[0];
      content.addEventListener("focusin", onFocus);
      return () => {
        content.removeEventListener("focusin", onFocus);
        el.classList.remove("is-pinned");
      };
    });

    mm.add(MQ.fluid, () => {
      gsap.fromTo(
        q(".founder2__frame"),
        { clipPath: "inset(30% 0% 0% 0% round 0px 0px 0px 0px)" },
        { clipPath: "inset(0% 0% 0% 0% round 0px 0px 0px 0px)", ease: "none", scrollTrigger: { trigger: q(".founder2__frame")[0], start: "top 90%", end: "top 35%", scrub: 0.5 } },
      );
    });

    return () => mm.revert();
  }, []);

  const nameEl = (ghost: boolean) => (
    <p className={`founder2__name${ghost ? " founder2__name--ghost" : ""}`} aria-hidden="true">
      <span className="seq__line">
        <span>{first}</span>
      </span>
      <span className="seq__line">
        <span>{last}.</span>
      </span>
    </p>
  );

  return (
    <section ref={root} className="founder2" aria-labelledby="founder2-title">
      <div className="founder2__stage">
        <div className="founder2__box founder2__box--wide" aria-hidden="true" />
        <div className="founder2__box founder2__box--arch" aria-hidden="true" />

        <p className="label label--rule founder2__label">
          <span className="label__num">04</span>A sócia
        </p>

        <div className="founder2__frame" data-tone="dark">
          <div className="founder2__portrait">
            {portrait ? <Image src={portrait} alt={`Retrato de ${name}`} fill sizes="30vw" style={{ objectFit: "cover" }} /> : <PortraitPlaceholder name={name} />}
          </div>
          <div className="founder2__arch-img" aria-hidden="true">
            <Image src="/assets/architecture/detail-colonnade-rhythm.webp" alt="" fill sizes="60vw" />
          </div>
          {nameEl(true)}
        </div>

        {nameEl(false)}

        <div className="founder2__content">
          <h2 id="founder2-title" className="sr-only">
            {name}
          </h2>
          <p className="caption founder__role">{role}</p>
          <div className="founder2__bio">
            <p className="t-lead">{bio[0]}</p>
            {bio.slice(1).map((b, i) => (
              <p key={i} className="t-small">
                {b}
              </p>
            ))}
          </div>
          <dl className="facts">
            <div>
              <dt className="label">Inscrição</dt>
              <dd>{oab ?? <Pending>OAB/DF a confirmar</Pending>}</dd>
            </div>
            <div>
              <dt className="label">Formação</dt>
              <dd>{education?.length ? education.join(" · ") : <Pending />}</dd>
            </div>
            <div>
              <dt className="label">Atuação</dt>
              <dd>{specialty}</dd>
            </div>
          </dl>
          <Link href="/carolina-meirelles" className="link-line">
            Perfil completo
            <ArrowRight />
          </Link>
        </div>
        <p className="concept-note founder2__caption">{portrait ? "Retrato oficial." : "Espaço reservado ao retrato oficial — imagem arquitetônica conceitual."}</p>
      </div>
    </section>
  );
}
