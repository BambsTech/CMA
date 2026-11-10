"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Practice } from "@/content/practices";
import { ArrowUpRight } from "./Icons";

type Props = { practices: Practice[]; children: React.ReactNode };

/**
 * Section 03 — numbered editorial rows. On fine pointers the active row reveals its image
 * in the left column; on touch devices rows are simple, fully visible links.
 */
export function PracticeIndex({ practices, children }: Props) {
  const [active, setActive] = useState(0);
  return (
    <div className="grid practices__grid">
      <div className="practices__aside">
        {children}
        <div className="practices__preview" aria-hidden="true">
          {practices.map((p, i) => (
            <div key={p.slug} className="practices__preview-item" data-active={i === active ? "true" : "false"}>
              <Image src={p.image} alt="" fill sizes="(min-width: 1024px) 30vw, 0px" className="practices__preview-img" />
            </div>
          ))}
          <span className="practices__preview-num num">{practices[active]?.number}</span>
        </div>
      </div>

      <ol className="practices__list" role="list">
        {practices.map((p, i) => (
          <li key={p.slug} className="prow" data-active={i === active ? "true" : "false"} data-reveal="" style={{ ["--delay" as string]: `${i * 60}ms` }}>
            <Link href={`/areas-de-atuacao/${p.slug}`} className="prow__link" onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)}>
              <span className="prow__num num">{p.number}</span>
              <span className="prow__title">{p.title}</span>
              <span className="prow__summary">{p.summary}</span>
              <ArrowUpRight className="arrow prow__arrow" />
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
