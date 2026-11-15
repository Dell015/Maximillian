"use client";

import { useEffect, useRef } from "react";
import Photo from "@/components/Photo";
import { house } from "@/lib/content";
import { gsap, initGsap, prefersReduced } from "@/lib/motion";

/**
 * A walk through the building. The section holds still while scrolling down carries
 * you sideways past each room; inside every frame the photograph drifts the other way,
 * which gives the walk its depth. Without motion it is a plain swipeable strip.
 */
export default function HouseRail() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    initGsap();
    if (prefersReduced()) return;
    const el = root.current;
    if (!el) return;
    el.classList.add("house--pinned");
    const ctx = gsap.context(() => {
      const track = el.querySelector<HTMLElement>(".house__track")!;
      const bar = el.querySelector<HTMLElement>(".house__bar i");
      const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);

      const walk = gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: () => "+=" + distance(),
          pin: true,
          scrub: 0.7,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onUpdate: (self) => bar && gsap.set(bar, { scaleX: self.progress }),
        },
      });

      gsap.utils.toArray<HTMLElement>(".slide__img").forEach((img) => {
        gsap.fromTo(
          img,
          { xPercent: -9, scale: 1.22 },
          {
            xPercent: 9,
            scale: 1.22,
            ease: "none",
            scrollTrigger: {
              trigger: img.closest(".slide"),
              containerAnimation: walk,
              start: "left right",
              end: "right left",
              scrub: true,
            },
          },
        );
      });
    }, el);
    return () => {
      ctx.revert();
      el.classList.remove("house--pinned");
    };
  }, []);

  return (
    <section id="house" className="house" ref={root} aria-labelledby="house-h">
      <div className="house__track">
        <div className="house__intro">
          <p className="kicker kicker--light">
            <span className="kicker__rule" />
            The house
          </p>
          <h2 id="house-h" className="title title--light">
            Walk through it slowly.
          </h2>
          <p className="house__lede">
            Stone floors, timber screens and brass light, arranged around a garden. Keep scrolling and the corridor
            keeps going.
          </p>
        </div>
        {house.map((f, i) => (
          <figure key={f.slug} className={`slide slide--${f.shape ?? "wide"}${i % 2 ? " slide--low" : ""}`}>
            <div className="slide__frame">
              <Photo slug={f.slug} alt={f.alt} fill sizes="(min-width: 900px) 50vw, 80vw" imgClass="slide__img" />
            </div>
            <figcaption className="cap cap--light">{f.caption}</figcaption>
          </figure>
        ))}
        <div className="house__end" aria-hidden="true" />
      </div>
      <div className="house__bar" aria-hidden="true">
        <i />
      </div>
    </section>
  );
}
