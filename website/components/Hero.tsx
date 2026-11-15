"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import Header from "@/components/Header";
import Photo from "@/components/Photo";
import { gsap, initGsap, prefersReduced } from "@/lib/motion";

/**
 * The front of the hotel, full screen, with the wordmark in white. The entrance is CSS
 * (it plays the moment the curtain lifts); as you scroll, the photograph sinks a little
 * slower than the page and the wordmark lifts away.
 */
export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    initGsap();
    if (prefersReduced()) return;
    const q = gsap.utils.selector(root);
    const ctx = gsap.context(() => {
      const st = { trigger: root.current, start: "top top", end: "bottom top", scrub: true };
      gsap.to(q(".hero__media"), { yPercent: 22, ease: "none", scrollTrigger: st });
      gsap.to(q(".hero__veil"), { opacity: 1, ease: "none", scrollTrigger: st });
      gsap.to(q(".hero__copy"), {
        yPercent: -18,
        opacity: 0,
        ease: "none",
        scrollTrigger: { ...st, end: "65% top" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section className="hero" ref={root}>
      <Header overlay />
      <div className="hero__media">
        <div className="hero__zoom">
          <Photo slug="hero" alt="" fill priority sizes="100vw" imgClass="hero__img" />
        </div>
        <div className="hero__veil" />
      </div>

      <div className="hero__copy">
        <div className="hero__top">
        <h1 className="hero__mark">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/logo-ivory.png" alt="The Maximilian Hotel" width={1200} height={350} />
        </h1>
        <p className="hero__line">A courtyard hotel on the national highway, Cauayan City, Isabela</p>
        </div>
        <div className="hero__actions">
          <Link href="/book" className="btn btn--ivory">
            Reserve a room
          </Link>
          <Link href="/rooms" className="btn btn--line">
            See the rooms
          </Link>
        </div>
      </div>

      <div className="hero__foot" aria-hidden="true">
        <span className="open">
          <i className="live" />
          Front desk open 24 hours
        </span>
        <span className="hero__cue">
          <i />
        </span>
      </div>
    </section>
  );
}
