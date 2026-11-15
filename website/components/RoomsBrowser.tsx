"use client";

import Link from "next/link";
import { useState } from "react";
import { BedDouble, Ruler, Users, ArrowRight } from "lucide-react";
import RoomGallery from "@/components/RoomGallery";
import { Amen } from "@/lib/amenities";
import { rooms, formatPeso, type Room } from "@/lib/hotel";

const filters: { id: string; label: string; test: (r: Room) => boolean }[] = [
  { id: "all", label: "All rooms", test: () => true },
  { id: "king", label: "King bed", test: (r) => r.bedKind === "king" },
  { id: "queen", label: "Queen bed", test: (r) => r.bedKind === "queen" },
  { id: "twin", label: "Two beds", test: (r) => r.bedKind === "twin" },
  { id: "family", label: "Room for 3+", test: (r) => r.fits.total >= 4 },
];

/** Room cards with quick filters. Each card says what the room is for and what is in it. */
export default function RoomsBrowser() {
  const [f, setF] = useState("all");
  const list = rooms.filter(filters.find((x) => x.id === f)!.test);

  return (
    <>
      <div className="wrap chips" role="group" aria-label="Filter rooms">
        {filters.map((x) => (
          <button
            key={x.id}
            type="button"
            className={`chip${x.id === f ? " is-on" : ""}`}
            aria-pressed={x.id === f}
            onClick={() => setF(x.id)}
          >
            {x.label}
          </button>
        ))}
        <span className="chips__count" aria-live="polite">
          {list.length} {list.length === 1 ? "room" : "rooms"}
        </span>
      </div>

      <ul className="wrap cards">
        {list.map((r) => (
          <li key={r.id} className="card">
            <RoomGallery slugs={r.photos} name={r.name} sizes="(min-width: 1100px) 33vw, (min-width: 700px) 50vw, 100vw" />
            <div className="card__body">
              <p className="card__tier">{r.tier}</p>
              <h2 className="card__name">
                <Link href={`/rooms/${r.id}`} className="card__link">
                  {r.name}
                </Link>
              </h2>
              <p className="card__for">{r.bestFor}</p>
              <ul className="card__facts">
                <li>
                  <Ruler aria-hidden="true" strokeWidth={1.4} />
                  {r.size}
                </li>
                <li>
                  <BedDouble aria-hidden="true" strokeWidth={1.4} />
                  {r.bed}
                </li>
                <li>
                  <Users aria-hidden="true" strokeWidth={1.4} />
                  Up to {r.fits.total}
                </li>
              </ul>
              <ul className="card__amens">
                {r.highlights.map((a) => (
                  <Amen key={a} id={a} compact />
                ))}
              </ul>
              <div className="card__foot">
                <p className="card__price">
                  <span>From</span>
                  <strong>{formatPeso(r.from)}</strong>
                  <span>a night</span>
                </p>
                <div className="card__actions">
                  <Link href={`/rooms/${r.id}`} className="btn btn--ghost btn--sm" tabIndex={-1} aria-hidden="true">
                    Details
                  </Link>
                  <Link href={`/book?room=${r.id}`} className="btn btn--sm">
                    Book
                  </Link>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <p className="wrap cards__more">
        <a href="#compare" className="textlink">
          Compare every room side by side <ArrowRight aria-hidden="true" strokeWidth={1.5} size={16} />
        </a>
      </p>
    </>
  );
}
