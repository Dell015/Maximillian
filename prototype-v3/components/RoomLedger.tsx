"use client";

import Link from "next/link";
import { useState } from "react";
import Photo from "@/components/Photo";
import { rooms, formatPeso } from "@/lib/hotel";

/**
 * The rooms as a price list. On a desktop, the photograph beside the list follows
 * your pointer down it. On a phone, each room carries a strip of its own photographs
 * you can swipe through.
 */
export default function RoomLedger() {
  const [active, setActive] = useState(0);

  return (
    <section id="rooms" className="rooms" aria-labelledby="rooms-h">
      <div className="wrap rooms__grid">
        <header className="rooms__head">
          <p className="kicker" data-reveal>
            <span className="kicker__rule" />
            Rooms and rates
          </p>
          <h2 id="rooms-h" className="title" data-lines>
            Seven rooms, one suite at the top.
          </h2>
          <p className="lede" data-reveal>
            Every rate is per night for two guests. Book direct and the price you see is the price we confirm.
          </p>
        </header>

        <ol className="rooms__list">
          {rooms.map((r, i) => (
            <li key={r.id} className={`room${i === active ? " is-active" : ""}`} data-reveal>
              <div className="room__strip" aria-label={`${r.name} photos`}>
                {r.photos.map((s, k) => (
                  <div key={s} className="room__shot">
                    <Photo
                      slug={s}
                      alt={k === 0 ? `The ${r.name} room` : `${r.name}, detail`}
                      fill
                      sizes="(min-width: 900px) 0px, 82vw"
                    />
                  </div>
                ))}
              </div>
              <Link
                href={`/rooms/${r.id}`}
                className="room__link"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
              >
                <span className="room__name">{r.name}</span>
                <span className="room__meta">
                  {r.bed}, {r.size}
                </span>
                <span className="room__price">
                  {formatPeso(r.from)}
                  <small> a night</small>
                </span>
              </Link>
            </li>
          ))}
        </ol>

        <div className="rooms__stage" aria-hidden="true">
          <div className="rooms__frame">
            {rooms.map((r, i) => (
              <div key={r.id} className={`rooms__shot${i === active ? " is-active" : ""}`}>
                <Photo slug={r.photos[0]} alt="" fill sizes="(min-width: 900px) 38vw, 0px" />
              </div>
            ))}
          </div>
          <p className="cap">{rooms[active].blurb}</p>
        </div>

        <p className="rooms__all" data-reveal>
          <Link href="/rooms" className="btn btn--ink">
            See every room
          </Link>
        </p>
      </div>
    </section>
  );
}
