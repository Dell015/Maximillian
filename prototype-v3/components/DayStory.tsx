"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import Photo from "@/components/Photo";
import { chapters } from "@/lib/hotel";
import { gsap, initGsap, prefersReduced } from "@/lib/motion";

/**
 * A day at the hotel as a stack of full-screen scenes. Each scene stays put while the
 * next one slides up over it; the one underneath eases back and dims. There is no
 * timed animation to wait for: every movement follows your scroll.
 */
export default function DayStory() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    initGsap();
    if (prefersReduced()) return;
    const ctx = gsap.context(() => {
      const scenes = gsap.utils.toArray<HTMLElement>(".scene");
      scenes.forEach((scene, i) => {
        const inner = scene.querySelector(".scene__inner");
        const img = scene.querySelector(".scene__main .photo__img");
        const text = scene.querySelectorAll(".scene__when, .scene__title, .scene__body, .scene__cta");

        // The photograph drifts the whole time its scene is on screen.
        if (img)
          gsap.fromTo(
            img,
            { scale: 1.18, yPercent: -4 },
            {
              scale: 1.04,
              yPercent: 4,
              ease: "none",
              scrollTrigger: { trigger: scene, start: "top bottom", end: "bottom top", scrub: true },
            },
          );

        // Words and the small photo arrive as the scene settles into place.
        gsap.from(text, {
          y: 60,
          opacity: 0,
          stagger: 0.07,
          duration: 1.5,
          scrollTrigger: { trigger: scene, start: "top 55%", toggleActions: "play none none reverse" },
        });

        // When the next scene covers this one, ease it back into the dark.
        const next = scenes[i + 1];
        if (next && inner)
          gsap.to(inner, {
            scale: 0.9,
            opacity: 0.35,
            ease: "none",
            scrollTrigger: { trigger: next, start: "top bottom", end: "top top", scrub: true },
          });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="day" className="day" ref={root} aria-labelledby="day-h">
      <h2 id="day-h" className="visually-hidden">
        A day at the hotel
      </h2>
      {chapters.map((c) => (
        <article key={c.id} className={`scene scene--${c.id}`}>
          <div className="scene__inner">
            <div className="scene__main">
              <Photo slug={c.main} alt={c.alt} fill sizes="100vw" />
            </div>
            <div className="scene__shade" />
            <div className="scene__copy">
              <p className="scene__when">{c.when}</p>
              <div className="scene__lower">
                <div>
                  <h3 className="scene__title">{c.title}</h3>
                  <p className="scene__body">{c.text}</p>
                  {c.cta ? (
                    <p className="scene__cta">
                      <Link href="/rooms" className="btn btn--ivory">
                        See the rooms
                      </Link>
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}
