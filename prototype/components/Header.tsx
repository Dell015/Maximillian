"use client";

import Link from "next/link";
import { useEffect, useState, type CSSProperties } from "react";

const links = [
  { href: "/#story", label: "A day here" },
  { href: "/rooms", label: "Rooms" },
  { href: "/#contact", label: "Contact" },
];

export default function Header({ overlay = false }: { overlay?: boolean }) {
  const [open, setOpen] = useState(false);

  // Close on Escape, and stop the page scrolling behind the open menu.
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

  const cls = [
    "site-header",
    overlay ? "site-header--overlay" : "",
    open ? "site-header--open" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <header className={cls}>
      <div className="container site-header__bar">
        <Link href="/" className="brand" aria-label="The Maximilian Hotel, home" onClick={() => setOpen(false)}>
          <span className="brand__name">Maximilian</span>
          <span className="brand__sub">Hotel, Cauayan</span>
        </Link>

        <button
          type="button"
          className="menu-btn"
          aria-expanded={open}
          aria-controls="site-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close" : "Menu"}
        </button>

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
          <Link href="/book" className="btn btn--light nav__cta" onClick={() => setOpen(false)}>
            Reserve a room
          </Link>
        </nav>
      </div>
    </header>
  );
}
