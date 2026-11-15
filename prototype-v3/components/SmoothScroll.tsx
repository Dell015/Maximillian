"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, initGsap, prefersReduced, isTouch } from "@/lib/motion";

/**
 * Inertia scrolling on desktop, driven by GSAP's clock so pinned scenes and smooth
 * scroll never disagree. Phones keep their own native momentum, which is already
 * smooth and which people expect.
 */
export default function SmoothScroll() {
  useEffect(() => {
    initGsap();
    if (prefersReduced() || isTouch()) return;
    const lenis = new Lenis({
      duration: 1.25,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 0.95,
    });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // In-page links glide instead of jumping.
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest('a[href*="#"]') as HTMLAnchorElement | null;
      if (!a || a.pathname !== location.pathname) return;
      const el = document.querySelector(a.hash);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el as HTMLElement, { duration: 1.8 });
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);
  return null;
}
