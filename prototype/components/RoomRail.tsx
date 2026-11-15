import Link from "next/link";
import Photo from "./Photo";
import { rooms, formatPeso } from "@/lib/hotel";

/** Rooms as a native swipe rail on phones; three across on larger screens. */
export default function RoomRail() {
  return (
    <section id="rooms" className="rooms-rail" aria-labelledby="rooms-title">
      <div className="container rooms-rail__head">
        <h2 id="rooms-title" className="h2">
          Six rooms, from {formatPeso(rooms[0].from)}
        </h2>
        <p className="rooms-rail__sub">
          Rates are per night for two guests. Swipe to see them all.
        </p>
      </div>
      <ul className="rail" tabIndex={0} aria-label="Room types">
        {rooms.map((r) => (
          <li key={r.id} className="plate">
            <Photo
              slug={r.photo}
              alt={`${r.name} room`}
              ratio="4 / 5"
              tone="dusk"
              className="plate__photo"
              sizes="(min-width: 900px) 30vw, 80vw"
            />
            <h3 className="plate__name">{r.name}</h3>
            <p className="plate__meta">
              {r.bed}
              {r.size ? `, ${r.size}` : ""}
            </p>
            <p className="plate__price">
              From {formatPeso(r.from)} <span>a night</span>
            </p>
            <Link href={`/book?room=${r.id}`} className="plate__link">
              Reserve {r.name}
            </Link>
          </li>
        ))}
      </ul>
      <div className="container rooms-rail__foot">
        <Link href="/rooms" className="btn btn--light">
          Compare all rooms
        </Link>
      </div>
    </section>
  );
}
