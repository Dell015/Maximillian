import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Photo from "@/components/Photo";
import { rooms, formatPeso } from "@/lib/hotel";

export const metadata: Metadata = {
  title: "Rooms and rates",
  description:
    "Six room types at The Maximilian Hotel in Cauayan City, from ₱3,288 a night for two guests. Compare beds and rates, then reserve direct.",
};

export default function RoomsPage() {
  return (
    <>
      <Header />
      <main id="main" className="page-top">
        <section className="section section--first" aria-labelledby="rooms-h1">
          <div className="container">
            <div className="section__head">
              <h1 id="rooms-h1" className="h1">
                Rooms and rates
              </h1>
              <p className="section__sub">
                Every rate is a “from” rate per night for two guests. Reserve directly with
                the hotel and we confirm the final price before you pay.
              </p>
            </div>
            <ul className="rooms">
              {rooms.map((r) => (
                <li key={r.id} className="room">
                  <Photo
                    slug={r.photo}
                    alt={`${r.name} room`}
                    ratio="4 / 3"
                    sizes="(min-width: 900px) 280px, 100vw"
                    className="room__photo"
                  />
                  <div className="room__body">
                    <h2 className="h3">{r.name}</h2>
                    <p className="room__meta">
                      {r.bed}
                      {r.size ? `, ${r.size}` : ""}. Sleeps 2.
                    </p>
                    <p>{r.blurb}</p>
                  </div>
                  <div className="room__cta">
                    <p className="price">
                      <span className="price__from">From</span> {formatPeso(r.from)}
                      <span className="price__per">a night</span>
                    </p>
                    <Link href={`/book?room=${r.id}`} className="btn">
                      Reserve
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}
