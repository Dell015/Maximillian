import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BedDouble, Ruler, Users, Eye, ArrowLeft, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import BackLink from "@/components/BackLink";
import RoomGallery from "@/components/RoomGallery";
import Photo from "@/components/Photo";
import { Amen } from "@/lib/amenities";
import { rooms, formatPeso, roomPolicies, hotel } from "@/lib/hotel";
import "../../rooms.css";

export function generateStaticParams() {
  return rooms.map((r) => ({ id: r.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const r = rooms.find((x) => x.id === id);
  return r
    ? { title: r.name, description: `${r.name}: ${r.size}, ${r.bed.toLowerCase()}. ${r.blurb} From ${formatPeso(r.from)} a night.` }
    : {};
}

export default async function RoomPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const idx = rooms.findIndex((x) => x.id === id);
  if (idx < 0) notFound();
  const r = rooms[idx];
  const prev = rooms[(idx - 1 + rooms.length) % rooms.length];
  const next = rooms[(idx + 1) % rooms.length];
  const others = rooms.filter((x) => x.id !== r.id && x.tier !== r.tier).slice(0, 3);

  return (
    <>
      <Header />
      <main id="main" className="rd">
        <div className="wrap rd__top">
          <BackLink href="/rooms" label="All rooms" />
          <span className="rd__pos">
            Room {idx + 1} of {rooms.length}
          </span>
        </div>

        <div className="wrap rd__grid">
          <div className="rd__media">
            <RoomGallery slugs={r.photos} name={r.name} ratio="4 / 3" sizes="(min-width: 960px) 60vw, 100vw" zoom priority />
            {r.photos.length > 1 && (
              <ul className="rd__thumbs" aria-hidden="true">
                {r.photos.map((s) => (
                  <li key={s}>
                    <Photo slug={s} alt="" fill sizes="120px" />
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="rd__info">
            <p className="card__tier">{r.tier}</p>
            <h1 className="title">{r.name}</h1>
            <p className="rd__for">Best for: {r.bestFor.toLowerCase()}</p>

            <ul className="rd__facts">
              <li>
                <Ruler aria-hidden="true" strokeWidth={1.4} />
                <span>
                  <small>Size</small>
                  {r.size}
                </span>
              </li>
              <li>
                <BedDouble aria-hidden="true" strokeWidth={1.4} />
                <span>
                  <small>Bed</small>
                  {r.bed}
                </span>
              </li>
              <li>
                <Users aria-hidden="true" strokeWidth={1.4} />
                <span>
                  <small>Sleeps</small>
                  {r.sleeps}
                </span>
              </li>
              <li>
                <Eye aria-hidden="true" strokeWidth={1.4} />
                <span>
                  <small>View</small>
                  {r.view}
                </span>
              </li>
            </ul>

            <div className="rd__story">
              {r.story.map((p, k) => (
                <p key={k}>{p}</p>
              ))}
            </div>

            <h2 className="rd__h">In the room</h2>
            <ul className="amens">
              {r.amenities.map((a) => (
                <Amen key={a} id={a} />
              ))}
            </ul>

            <h2 className="rd__h">Good to know</h2>
            <dl className="rd__policies">
              {roomPolicies.map((p) => (
                <div key={p.name}>
                  <dt>{p.name}</dt>
                  <dd>{p.detail}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Price and the one action that matters. Sticky on desktop, a bar on phones. */}
          <aside className="rd__book" aria-label="Book this room">
            <p className="rd__price">
              <span>From</span>
              <strong>{formatPeso(r.from)}</strong>
              <span>a night, breakfast included</span>
            </p>
            <Link href={`/book?room=${r.id}`} className="btn rd__cta">
              Check dates and book
            </Link>
            <p className="rd__help">
              Free cancellation up to 48 hours before check-in. Questions? Call{" "}
              <a href={hotel.mobile.href}>{hotel.mobile.display}</a>.
            </p>
          </aside>
        </div>

        <nav className="wrap rd__pager" aria-label="More rooms">
          <Link href={`/rooms/${prev.id}`} className="rd__step">
            <ArrowLeft aria-hidden="true" strokeWidth={1.4} />
            <span>
              <small>Previous room</small>
              {prev.name}
            </span>
          </Link>
          <Link href={`/rooms/${next.id}`} className="rd__step rd__step--next">
            <span>
              <small>Next room</small>
              {next.name}
            </span>
            <ArrowRight aria-hidden="true" strokeWidth={1.4} />
          </Link>
        </nav>

        <section className="wrap rd__others" aria-labelledby="others-h">
          <h2 id="others-h" className="title title--s">
            Other ways to stay
          </h2>
          <ul>
            {others.map((o) => (
              <li key={o.id}>
                <Link href={`/rooms/${o.id}`} className="mini">
                  <span className="mini__photo">
                    <Photo slug={o.photos[0]} alt="" fill sizes="(min-width: 900px) 25vw, 40vw" />
                  </span>
                  <span className="mini__text">
                    <span className="mini__name">{o.name}</span>
                    <span className="mini__meta">
                      {o.size} · from {formatPeso(o.from)}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </>
  );
}
