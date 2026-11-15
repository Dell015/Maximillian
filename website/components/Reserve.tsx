import Photo from "@/components/Photo";
import BookingBar from "@/components/BookingBar";
import { hotel, goodToKnow } from "@/lib/hotel";

/** The last scene: the building at dusk, the dates, the ways to reach the hotel. */
export default function Reserve() {
  return (
    <section id="reserve" className="reserve" aria-labelledby="reserve-h">
      <div className="reserve__photo" aria-hidden="true">
        <Photo slug="facade-angle" fill sizes="100vw" alt="" par={10} />
        <div className="reserve__veil" />
      </div>

      <div className="wrap reserve__inner">
        <p className="kicker kicker--light" data-reveal>
          <span className="kicker__rule" />
          Reserve direct
          <span className="open open--inline">
            <i className="live" />
            Answering now
          </span>
        </p>
        <h2 id="reserve-h" className="title title--hero title--light" data-lines>
          Stay a night. Stay the weekend.
        </h2>
        <div data-reveal>
          <BookingBar />
        </div>
        <div className="reserve__cols">
          <div data-reveal>
            <a className="bigline" href={hotel.mobile.href}>
              {hotel.mobile.display}
            </a>
            <a className="bigline bigline--small" href={`mailto:${hotel.email}`}>
              {hotel.email}
            </a>
            <p className="reserve__address">
              {hotel.address.street}, {hotel.address.city}, {hotel.address.region} {hotel.address.postal}
            </p>
            <a className="btn btn--line" href={hotel.mapsUrl} target="_blank" rel="noopener noreferrer">
              Open in Google Maps
            </a>
          </div>
          <dl className="spec" data-reveal>
            {goodToKnow.map((g) => (
              <div key={g.name} className="spec__row">
                <dt>{g.name}</dt>
                <dd>{g.detail}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
