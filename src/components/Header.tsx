"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { Logo } from "./brand/Logo";
import { ArrowRight } from "./Icons";
import { nav, firm } from "@/content/site";

/**
 * Reads what is actually under the header (hit-testing respects clip-path, so a photograph
 * that is mid-transition counts only where it is visible). Dark if the nearest marked
 * ancestor is `[data-tone="dark"]` or an `.on-dark` surface.
 */
function toneUnderHeader(header: HTMLElement | null): "dark" | "light" {
  const y = Math.min(32, (header?.offsetHeight ?? 64) / 2);
  for (const x of [window.innerWidth * 0.25, window.innerWidth * 0.75]) {
    const stack = document.elementsFromPoint(x, y);
    const hit = stack.find((n) => !header?.contains(n) && !n.closest("#mobile-menu"));
    if (!hit) continue;
    const marked = hit.closest<HTMLElement>("[data-tone], .on-dark");
    if (marked && (marked.dataset.tone === "dark" || (!marked.dataset.tone && marked.classList.contains("on-dark")))) return "dark";
  }
  return "light";
}

function isCurrent(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");
}

export function Header() {
  const pathname = usePathname() || "/";
  const [overlay, setOverlay] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const [hidden, setHidden] = useState(false);
  // The menu is tied to the route it was opened on, so any navigation closes it.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const lastY = useRef(0);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const y = window.scrollY;
        setScrolled(y > 24);
        setOverlay(toneUnderHeader(headerRef.current) === "dark");
        setHidden(y > 480 && y > lastY.current + 4);
        if (y < lastY.current - 4 || y < 480) setHidden(false);
        lastY.current = y;
      });
    };
    const settle = window.setTimeout(onScroll, 120);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(settle);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  const close = useCallback((restoreFocus = true) => {
    setOpenOn(null);
    if (restoreFocus) requestAnimationFrame(() => toggleRef.current?.focus());
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    if (!open) return;
    requestAnimationFrame(() => closeRef.current?.focus());
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "Tab" && menuRef.current) {
        const focusables = menuRef.current.querySelectorAll<HTMLElement>("a, button");
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.classList.remove("menu-open");
    };
  }, [open, close]);

  const mainLinks = nav.filter((n) => n.href !== "/contato");

  return (
    <>
      <header
        ref={headerRef}
        className="site-header"
        data-overlay={overlay ? "true" : "false"}
        data-scrolled={scrolled ? "true" : "false"}
        data-hidden={hidden && !open ? "true" : "false"}
      >
        <div className="container site-header__inner">
          <Link href="/" className="site-header__brand" aria-label={`${firm.name} — página inicial`}>
            <Logo variant="completo-horizontal" title={null} />
          </Link>

          <nav className="site-nav" aria-label="Navegação principal">
            <ul role="list">
              {mainLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} aria-current={isCurrent(pathname, item.href) ? "page" : undefined}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <Link href="/contato" className="site-header__contact" aria-current={isCurrent(pathname, "/contato") ? "page" : undefined}>
            Contato
            <ArrowRight />
          </Link>

          <button
            ref={toggleRef}
            type="button"
            className="menu-toggle"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpenOn(pathname)}
          >
            Menu
            <span className="menu-toggle__icon" aria-hidden="true" />
          </button>
        </div>
      </header>

      <div
        id="mobile-menu"
        ref={menuRef}
        className="mobile-menu on-dark"
        data-open={open ? "true" : "false"}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        inert={!open}
      >
        <div className="container mobile-menu__top">
          <Link href="/" className="site-header__brand" aria-label={`${firm.name} — página inicial`} onClick={() => close(false)}>
            <Logo variant="completo-horizontal" title={null} />
          </Link>
          <button ref={closeRef} type="button" className="menu-toggle menu-close" onClick={() => close()}>
            Fechar
            <span className="menu-toggle__icon" aria-hidden="true" />
          </button>
        </div>
        <nav className="container mobile-menu__list" aria-label="Navegação principal (menu)">
          <ul role="list">
            {nav.map((item, i) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  style={{ ["--i" as string]: i }}
                  aria-current={isCurrent(pathname, item.href) ? "page" : undefined}
                  onClick={() => close(false)}
                >
                  <span className="num">{String(i + 1).padStart(2, "0")}</span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="container mobile-menu__foot">
          <span className="label">Direito Imobiliário</span>
          <span className="label">
            {firm.city} · {firm.state}
          </span>
        </div>
      </div>
    </>
  );
}
