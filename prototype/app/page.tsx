import Header from "@/components/Header";
import BookingBar from "@/components/BookingBar";
import Photo from "@/components/Photo";
import Statement from "@/components/Statement";
import DayStory from "@/components/DayStory";
import RoomRail from "@/components/RoomRail";
import { hotel, goodToKnow } from "@/lib/hotel";

export default function Home() {
  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <Photo
          slug="hero"
          alt="The Maximilian Hotel facade at dusk"
          tone="dusk"
          priority
          sizes="100vw"
          className="hero__media"
        />
        <div className="hero__shade" aria-hidden="true" />
        <Header overlay />
        <div className="container hero__inner">
          <h1 id="hero-title" className="hero__title">
            <span className="hero__line">
              <span>A quiet</span>
            </span>
            <span className="hero__line">
              <span>place to land</span>
            </span>
            <span className="hero__line">
              <span>in Cauayan.</span>
            </span>
          </h1>
          <p className="hero__lede">
            Four-star rooms, a pool and two restaurants, minutes from Cauayan Airport.
          </p>
          <BookingBar />
        </div>
      </section>

      <main id="main">
        <p className="band">
          Rated {hotel.rating.score} from {hotel.rating.count} guest reviews on{" "}
          {hotel.rating.sources}.
        </p>

        <Statement text="Four-star comfort a few minutes from Cauayan Airport, with a pool, gardens and two restaurants. The front desk never closes." />

        <DayStory />

        <RoomRail />

        <section className="section section--paper" aria-labelledby="reviews-title">
          <div className="container">
            <h2 id="reviews-title" className="h2">
              What guests write
            </h2>
            <div className="reviews">
              <figure className="quote">
                <blockquote>The best in Isabela this far!</blockquote>
                <figcaption>Guest review, Hotels.com, June 2025</figcaption>
              </figure>
              <figure className="quote">
                <blockquote>I’m pleased about how beautiful this hotel was.</blockquote>
                <figcaption>Guest review, Hotels.com, June 2025</figcaption>
              </figure>
            </div>
          </div>
        </section>

        <section id="contact" className="section" aria-labelledby="contact-title">
          <div className="container">
            <h2 id="contact-title" className="h2">
              Find us, or call
            </h2>
            <div className="contact">
              <div className="contact__big">
                <a href={hotel.mobile.href} className="bigline">
                  {hotel.mobile.display}
                </a>
                <a href={`mailto:${hotel.email}`} className="bigline bigline--small">
                  {hotel.email}
                </a>
                <p className="contact__address">
                  {hotel.address.street}, {hotel.address.city}, {hotel.address.region}{" "}
                  {hotel.address.postal}. A few minutes from Cauayan Airport and about a
                  20-minute walk from SM City Cauayan.
                </p>
                <a
                  href={hotel.mapsUrl}
                  className="btn btn--ghost"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open in Google Maps
                </a>
              </div>
              <dl className="spec">
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
      </main>
    </>
  );
}
