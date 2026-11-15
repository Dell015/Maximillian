import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Photo from "@/components/Photo";
import Motion from "@/components/Motion";
import { rooms, formatPeso } from "@/lib/hotel";

export const metadata: Metadata = {
  title: "Rooms and rates",
  description:
    "Seven room types at The Maximilian Hotel in Cauayan City, from ₱3,288 a night for two guests. See every room, then reserve direct.",
};

export default function RoomsPage() {
  return (
    <>
      <Header />
      <main id="main" className="rooms-page">
        <header className="rooms-page__head wrap">
          <p className="kicker" data-reveal>
            <span className="kicker__rule" />
            Rooms and rates
          </p>
          <h1 className="title title--hero" data-lines>
            The rooms
          </h1>
          <p className="lede" data-reveal>
            Seven rooms in three sizes, and one suite. Every rate is per night for two guests. Reserve direct and we
            confirm the final price before you pay.
          </p>
        </header>

        {rooms.map((r, i) => (
          <article key={r.id} id={r.id} className={`spread${i % 2 ? " spread--flip" : ""}`}>
            <div className="wrap spread__grid">
              <div className="spread__main">
                <div className={`frame${i % 2 ? "" : " frame--arch"}`} data-mask>
                  <Photo slug={r.photos[0]} alt={`The ${r.name} room`} fill sizes="(min-width: 900px) 46vw, 92vw" par={6} />
                </div>
              </div>
              <div className="spread__text">
                <h2 className="title title--s" data-lines>
                  {r.name}
                </h2>
                <p className="spread__meta">
                  {r.bed}, {r.size}. Sleeps 2.
                </p>
                <p className="spread__blurb">{r.blurb}</p>
                <p className="spread__price">
                  <span>From</span> {formatPeso(r.from)} <small>a night</small>
                </p>
                <Link href={`/book?room=${r.id}`} className="btn">
                  Reserve this room
                </Link>
              </div>
              <div className="spread__more">
                {r.photos.slice(1).map((s, k) => (
                  <figure key={s}>
                    <div className="frame" data-mask={k % 2 ? "right" : undefined}>
                      <Photo slug={s} alt={`${r.name}, detail ${k + 1}`} fill sizes="(min-width: 900px) 22vw, 44vw" />
                    </div>
                  </figure>
                ))}
              </div>
            </div>
          </article>
        ))}
      </main>
      <Motion />
    </>
  );
}
