"use client";

import { useEffect, useRef } from "react";
import Photo from "@/components/Photo";
import { plates, tables, pours } from "@/lib/content";
import { gsap, initGsap, prefersReduced } from "@/lib/motion";

/**
 * Food and drink, given as much room as the rooms. It opens with one photograph that
 * grows from a small window to the whole screen as you scroll. Then Gusto's plates
 * fall in two columns at different speeds, the dining rooms slide past sideways, and
 * King's Row's drinks cross the screen in two rows going opposite ways.
 */
export default function EatDrink() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    initGsap();
    if (prefersReduced()) return;
    const el = root.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      const open = el.querySelector<HTMLElement>(".feast");
      if (!open) return;
      open.classList.add("feast--pinned");
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: { trigger: open, start: "top top", end: "+=140%", pin: true, scrub: 0.8, anticipatePin: 1 },
      });
      tl.fromTo(
        ".feast__window",
        { clipPath: "inset(24% 22% 24% 22% round 999px 999px 0px 0px)" },
        { clipPath: "inset(0% 0% 0% 0% round 0px 0px 0px 0px)", duration: 1 },
        0,
      )
        .fromTo(".feast__window .photo__img", { scale: 1.35 }, { scale: 1, duration: 1 }, 0)
        .fromTo(".feast__shade", { opacity: 0 }, { opacity: 1, duration: 0.6 }, 0.4)
        .fromTo(".feast__over", { opacity: 0, y: 70 }, { opacity: 1, y: 0, duration: 0.45, ease: "power3.out" }, 0.55)
        .to(".feast__under", { opacity: 0, y: -40, duration: 0.3 }, 0);
    }, el);
    return () => {
      ctx.revert();
      el.querySelector(".feast")?.classList.remove("feast--pinned");
    };
  }, []);

  const left = plates.filter((_, i) => i % 2 === 0);
  const right = plates.filter((_, i) => i % 2 === 1);
  const rowA = pours.slice(0, 5);
  const rowB = pours.slice(4).concat(pours.slice(0, 1));

  return (
    <div id="eat" ref={root}>
      {/* Opening: the long table, from a small arch to the full screen */}
      <section className="feast" aria-labelledby="eat-h">
        <div className="feast__under">
          <p className="kicker">
            <span className="kicker__rule" />
            Eat and drink
          </p>
          <p className="feast__hint">Two places to eat, one to linger</p>
        </div>
        <div className="feast__window">
          <Photo slug="gusto-table" alt="A long table laid with Gusto's dishes and drinks" fill sizes="100vw" />
          <div className="feast__shade" />
        </div>
        <div className="feast__over">
          <h2 id="eat-h" className="title title--hero">
            Stay for the food.
          </h2>
          <p>
            Most guests plan around the room. Many end up planning around dinner.
          </p>
        </div>
      </section>

      {/* Gusto */}
      <section className="gusto" aria-labelledby="gusto-h">
        <div className="wrap gusto__head">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="gusto__logo" src="/brand/gusto.png" alt="Gusto at Maximilian" width={555} height={346} data-reveal />
          <h3 id="gusto-h" className="title" data-lines>
            Gusto, from first coffee to last order.
          </h3>
          <div className="gusto__copy">
            <p className="lede" data-reveal>
              The hotel&apos;s all-day restaurant. Filipino breakfasts in the morning; US ribeye, kare-kare, pasta and
              plated fish by evening; a buffet when the house is full.
            </p>
            <p className="hours" data-reveal>
              <i className="live" />
              Open daily, 6:00 AM to 9:30 PM
            </p>
          </div>
        </div>

        <div className="wrap plates">
          <div className="plates__col" data-speed="0.35">
            {left.map((p) => (
              <figure key={p.slug} className="plate">
                <Photo slug={p.slug} alt={p.alt} ratio="4 / 5" sizes="(min-width: 900px) 30vw, 46vw" par={6} />
              </figure>
            ))}
          </div>
          <div className="plates__col plates__col--b" data-speed="-0.35">
            {right.map((p) => (
              <figure key={p.slug} className="plate">
                <Photo slug={p.slug} alt={p.alt} ratio="4 / 5" sizes="(min-width: 900px) 30vw, 46vw" par={6} />
              </figure>
            ))}
          </div>
          <div className="plates__note">
            <p className="plates__big" data-lines>
              Plates you came for, a table that waits for you.
            </p>
          </div>
        </div>

        <div className="tables">
          <div className="tables__row" data-drift="1">
            {tables.map((t) => (
              <figure key={t.slug} className="tables__item">
                <Photo slug={t.slug} alt={t.alt} fill sizes="(min-width: 900px) 36vw, 76vw" />
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* King's Row and the coffee bar */}
      <section className="pour" aria-labelledby="pour-h">
        <div className="wrap pour__head">
          <p className="kicker kicker--light" data-reveal>
            <span className="kicker__rule" />
            King&apos;s Row, café and bar
          </p>
          <h3 id="pour-h" className="title title--light" data-lines>
            Coffee by day, something stronger by night.
          </h3>
          <p className="lede lede--light" data-reveal>
            Frappes and iced teas through the afternoon, sangria and cocktails after dark, and a burger whenever you
            want one.
          </p>
        </div>

        <div className="pour__rows">
          <div className="pour__row" data-drift="1">
            {rowA.map((p) => (
              <figure key={p.slug} className="pour__item">
                <Photo slug={p.slug} alt={p.alt} fill sizes="(min-width: 900px) 26vw, 62vw" />
              </figure>
            ))}
          </div>
          <div className="pour__row pour__row--b" data-drift="-1">
            {rowB.map((p, i) => (
              <figure key={p.slug + i} className="pour__item">
                <Photo slug={p.slug} alt={i === rowB.length - 1 ? "" : p.alt} fill sizes="(min-width: 900px) 26vw, 62vw" />
              </figure>
            ))}
          </div>
        </div>

        <div className="wrap coffee">
          <figure className="coffee__a">
            <div className="frame" data-mask>
              <Photo slug="bar-staff" alt="Two baristas smiling behind the coffee counter" fill sizes="(min-width: 900px) 40vw, 92vw" par={6} />
            </div>
          </figure>
          <figure className="coffee__b">
            <div className="frame frame--arch" data-mask="right">
              <Photo slug="kr-counter" alt="The café counter off the lobby" fill sizes="(min-width: 900px) 24vw, 56vw" />
            </div>
          </figure>
          <div className="coffee__text">
            <h3 className="title title--s title--light" data-lines>
              Starbucks, poured off the lobby.
            </h3>
            <p className="lede lede--light" data-reveal>
              The café counter by the lobby serves Starbucks coffee: the cup you already know, before an early flight out of Cauayan or a long drive north.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
