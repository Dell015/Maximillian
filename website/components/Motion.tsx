"use client";

import { useEffect } from "react";
import { gsap, ScrollTrigger, SplitText, initGsap, prefersReduced } from "@/lib/motion";

/**
 * Scroll choreography for plain markup. Add an attribute, get the motion:
 *   data-reveal        rises and fades in once
 *   data-lines         a headline rises line by line out of a mask
 *   data-mask[=dir]    a photo opens like a curtain while it settles from a zoom
 *   data-par="n"       (on a .photo__img) drifts ±n% against the scroll
 *   data-words         words brighten as you read them (tied to scroll)
 *   data-speed="n"     a column drifts at its own speed (tied to scroll)
 *   data-drift="1|-1"  a row slides sideways as you pass it (tied to scroll)
 * Every timed ease is exponential out, so motion starts quick and settles slowly.
 * Nothing waits for an animation: scroll-tied effects follow the reader directly.
 */
export default function Motion() {
  useEffect(() => {
    initGsap();
    const reduced = prefersReduced();
    let ctx: gsap.Context | undefined;
    let dead = false;

    const setup = () => {
      if (dead) return;
      ctx = gsap.context(() => {
        if (reduced) {
          gsap.set("[data-reveal],[data-lines],[data-words] .w", { opacity: 1, visibility: "visible" });
          return;
        }

        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
          gsap.fromTo(
            el,
            { y: 36, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1.5,
              delay: Number(el.dataset.delay || 0),
              scrollTrigger: { trigger: el, start: "top 92%", once: true },
            },
          );
        });

        gsap.utils.toArray<HTMLElement>("[data-lines]").forEach((el) => {
          SplitText.create(el, {
            type: "lines",
            mask: "lines",
            autoSplit: true,
            linesClass: "ln",
            onSplit(self) {
              gsap.set(el, { visibility: "visible" });
              return gsap.from(self.lines, {
                yPercent: 115,
                duration: 1.6,
                stagger: 0.09,
                scrollTrigger: { trigger: el, start: "top 90%", once: true },
              });
            },
          });
        });

        gsap.utils.toArray<HTMLElement>("[data-mask]").forEach((el) => {
          const from =
            el.dataset.mask === "right"
              ? "inset(0% 0% 0% 100%)"
              : el.dataset.mask === "left"
                ? "inset(0% 100% 0% 0%)"
                : "inset(100% 0% 0% 0%)";
          const st = { trigger: el, start: "top 90%", once: true };
          gsap.fromTo(el, { clipPath: from }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.9, scrollTrigger: st });
          const inner = el.querySelector(".photo");
          if (inner) gsap.fromTo(inner, { scale: 1.28 }, { scale: 1, duration: 2.6, scrollTrigger: st });
        });

        gsap.utils.toArray<HTMLElement>("[data-par]").forEach((el) => {
          const n = Number(el.dataset.par || 8);
          gsap.fromTo(
            el,
            { yPercent: -n },
            {
              yPercent: n,
              ease: "none",
              scrollTrigger: { trigger: el.closest(".photo") ?? el, start: "top bottom", end: "bottom top", scrub: true },
            },
          );
        });

        gsap.utils.toArray<HTMLElement>("[data-words]").forEach((el) => {
          gsap.fromTo(
            el.querySelectorAll(".w"),
            { opacity: 0.16 },
            {
              opacity: 1,
              ease: "none",
              stagger: 0.1,
              scrollTrigger: { trigger: el, start: "top 82%", end: "bottom 55%", scrub: 0.5 },
            },
          );
        });

        gsap.utils.toArray<HTMLElement>("[data-speed]").forEach((el) => {
          const s = Number(el.dataset.speed || 0);
          gsap.fromTo(
            el,
            { y: () => s * window.innerHeight * 0.18 },
            {
              y: () => -s * window.innerHeight * 0.18,
              ease: "none",
              scrollTrigger: {
                trigger: el.parentElement,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.6,
                invalidateOnRefresh: true,
              },
            },
          );
        });

        gsap.utils.toArray<HTMLElement>("[data-drift]").forEach((el) => {
          const dir = Number(el.dataset.drift || 1);
          const span = () => Math.max(0, el.scrollWidth - window.innerWidth);
          gsap.fromTo(
            el,
            { x: () => (dir > 0 ? 0 : -span()) },
            {
              x: () => (dir > 0 ? -span() : 0),
              ease: "none",
              scrollTrigger: {
                trigger: el,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.8,
                invalidateOnRefresh: true,
              },
            },
          );
        });
      });
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    };

    const fonts = (document as Document & { fonts?: FontFaceSet }).fonts;
    if (fonts?.ready) fonts.ready.then(() => requestAnimationFrame(setup));
    else setup();
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);

    return () => {
      dead = true;
      window.removeEventListener("load", onLoad);
      ctx?.revert();
    };
  }, []);
  return null;
}
