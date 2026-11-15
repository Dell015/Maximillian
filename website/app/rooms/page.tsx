import type { Metadata } from "next";
import Link from "next/link";
import { Check, Minus } from "lucide-react";
import Header from "@/components/Header";
import BackLink from "@/components/BackLink";
import RoomsBrowser from "@/components/RoomsBrowser";
import { rooms, formatPeso, roomPolicies, type Amenity } from "@/lib/hotel";
import "../rooms.css";

export const metadata: Metadata = {
  title: "Rooms and rates",
  description:
    "Seven room types at The Maximilian Hotel in Cauayan City, from ₱3,288 a night with breakfast. Compare every room, then reserve direct.",
};

const compareRows: { label: string; get: (r: (typeof rooms)[number]) => React.ReactNode }[] = [
  { label: "Size", get: (r) => r.size },
  { label: "Bed", get: (r) => r.bed },
  { label: "Sleeps", get: (r) => `Up to ${r.fits.total}` },
  { label: "View", get: (r) => r.view },
];
const compareAmens: { id: Amenity; label: string }[] = [
  { id: "breakfast", label: "Breakfast" },
  { id: "airport", label: "Airport transfers" },
  { id: "desk", label: "Work desk" },
  { id: "minibar", label: "Mini bar" },
  { id: "lounge", label: "Separate lounge" },
  { id: "bathtub", label: "Bathtub" },
];

export default function RoomsPage() {
  return (
    <>
      <Header />
      <main id="main" className="rp">
        <div className="wrap rp__top">
          <BackLink href="/" label="Home" />
        </div>
        <header className="wrap rp__head">
          <h1 className="title">Rooms and rates</h1>
          <p className="lede">
            Seven room types, all with breakfast, Wi-Fi, pool access and free parking. Rates are per night for two
            guests. Tap a room to see everything in it.
          </p>
        </header>

        <RoomsBrowser />

        <section id="compare" className="wrap compare" aria-labelledby="compare-h">
          <h2 id="compare-h" className="title title--s">
            Compare the rooms
          </h2>
          <p className="lede">Swipe sideways on a phone to see every room.</p>
          <div className="compare__scroll" tabIndex={0} aria-label="Room comparison table">
            <table>
              <thead>
                <tr>
                  <th scope="col">
                    <span className="visually-hidden">Feature</span>
                  </th>
                  {rooms.map((r) => (
                    <th key={r.id} scope="col">
                      <Link href={`/rooms/${r.id}`}>{r.name}</Link>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="compare__price">
                  <th scope="row">From, a night</th>
                  {rooms.map((r) => (
                    <td key={r.id}>{formatPeso(r.from)}</td>
                  ))}
                </tr>
                {compareRows.map((row) => (
                  <tr key={row.label}>
                    <th scope="row">{row.label}</th>
                    {rooms.map((r) => (
                      <td key={r.id}>{row.get(r)}</td>
                    ))}
                  </tr>
                ))}
                {compareAmens.map((a) => (
                  <tr key={a.id}>
                    <th scope="row">{a.label}</th>
                    {rooms.map((r) => (
                      <td key={r.id}>
                        {r.amenities.includes(a.id) ? (
                          <Check className="yes" aria-label="Yes" strokeWidth={1.6} />
                        ) : (
                          <Minus className="no" aria-label="No" strokeWidth={1.2} />
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
                <tr>
                  <th scope="row">
                    <span className="visually-hidden">Book</span>
                  </th>
                  {rooms.map((r) => (
                    <td key={r.id}>
                      <Link href={`/book?room=${r.id}`} className="btn btn--sm">
                        Book
                      </Link>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="wrap policies" aria-labelledby="pol-h">
          <h2 id="pol-h" className="title title--s">
            Good to know
          </h2>
          <dl>
            {roomPolicies.map((p) => (
              <div key={p.name}>
                <dt>{p.name}</dt>
                <dd>{p.detail}</dd>
              </div>
            ))}
          </dl>
        </section>
      </main>
    </>
  );
}
