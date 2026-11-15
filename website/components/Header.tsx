"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ScrollTrigger, initGsap } from "@/lib/motion";

const links = [
  { href: "/#day", label: "A day here" },
  { href: "/#house", label: "The house" },
  { href: "/#rooms", label: "Rooms" },
  { href: "/#eat", label: "Eat and drink" },
  { href: "/#reserve", label: "Contact" },
];

/**
 * Over the opening photograph the header is clear, with the wordmark in white. Once
 * the photograph has scrolled away it settles onto the hotel's white with the
 * wordmark in navy. Inner pages start settled.
 */
export default function Header({ overlay = false }: { overlay?: boolean }) {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(!overlay);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!overlay) return;
    initGsap();
    const st = ScrollTrigger.create({
      trigger: ".hero",
      start: "bottom top+=90",
      end: "max",
      onToggle: (self) => setSolid(self.isActive),
    });
    setSolid(window.scrollY > window.innerHeight - 90);
    return () => st.kill();
  }, [overlay]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = prev;
    };
  }, [open]);

  const cls = ["hdr", solid ? "hdr--solid" : "hdr--clear", open ? "hdr--open" : ""].filter(Boolean).join(" ");

  return (
    <header className={cls} ref={ref}>
      <div className="hdr__bar">
        <Link href="/" className="hdr__brand" aria-label="The Maximilian Hotel, home" onClick={() => setOpen(false)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="hdr__logo hdr__logo--light" src="/brand/logo-ivory.png" alt="" width={1200} height={350} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="hdr__logo hdr__logo--dark" src="/brand/logo-navy.png" alt="" width={1200} height={350} />
        </Link>

        <nav id="site-nav" aria-label="Main" className={`nav${open ? " nav--open" : ""}`}>
          <ul className="nav__list">
            {links.map((l, i) => (
              <li key={l.href} style={{ "--i": i } as CSSProperties}>
                <Link href={l.href} onClick={() => setOpen(false)}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/book" className="nav__cta" onClick={() => setOpen(false)}>
            Reserve a room
          </Link>
        </nav>

        <button
          type="button"
          className="menu-btn"
          aria-expanded={open}
          aria-controls="site-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="menu-btn__label">{open ? "Close" : "Menu"}</span>
          <span className="menu-btn__bars" aria-hidden="true" />
        </button>
      </div>
    </header>
  );
}
