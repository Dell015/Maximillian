import Photo from "@/components/Photo";
import { hotel } from "@/lib/hotel";

const TEXT =
  "Off the national highway, a white house with a garden in the middle. Seven kinds of rooms look onto a courtyard pool. Breakfast starts at six, the bar stays open late, and someone is at the front desk at every hour.";

export default function Welcome() {
  return (
    <section className="welcome" aria-labelledby="welcome-h">
      <div className="wrap">
        <p className="kicker" data-reveal>
          <span className="kicker__rule" />
          Welcome to Cauayan
        </p>
        <h2 id="welcome-h" className="visually-hidden">
          About the hotel
        </h2>
        <p className="welcome__text" data-words>
          {TEXT.split(" ").map((w, i) => (
            <span key={i} className="w">
              {w}{" "}
            </span>
          ))}
        </p>

        <div className="welcome__grid">
          <figure className="welcome__a">
            <div className="frame" data-mask>
              <Photo slug="lobby-stair" alt="The stone staircase in the lobby" fill sizes="(min-width: 900px) 58vw, 100vw" par={8} />
            </div>
          </figure>
          <figure className="welcome__b">
            <div className="frame frame--arch" data-mask="right">
              <Photo slug="courtyard-up" alt="Looking up from the courtyard to the sky" fill sizes="(min-width: 900px) 28vw, 64vw" />
            </div>
            <figcaption className="cap" data-reveal>
              Looking up from the courtyard
            </figcaption>
          </figure>
          <dl className="welcome__facts">
            <div data-reveal>
              <dt>Check in</dt>
              <dd>From {hotel.checkIn}</dd>
            </div>
            <div data-reveal data-delay="0.08">
              <dt>Check out</dt>
              <dd>By {hotel.checkOut}</dd>
            </div>
            <div data-reveal data-delay="0.16">
              <dt>Guests say</dt>
              <dd>
                {hotel.rating.score} out of 5, from {hotel.rating.count} reviews
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
