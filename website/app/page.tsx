import Hero from "@/components/Hero";
import Welcome from "@/components/Welcome";
import DayStory from "@/components/DayStory";
import HouseRail from "@/components/HouseRail";
import RoomLedger from "@/components/RoomLedger";
import EatDrink from "@/components/EatDrink";
import Album from "@/components/Album";
import Reserve from "@/components/Reserve";
import Motion from "@/components/Motion";
import Preloader from "@/components/Preloader";
import { hotel } from "@/lib/hotel";

export default function Home() {
  return (
    <>
      <Preloader />
      <main id="main">
        <Hero />
        <Welcome />
        <DayStory />
        <HouseRail />
        <RoomLedger />
        <EatDrink />
        <Album />
        <section className="voices" aria-labelledby="voices-h">
          <div className="wrap voices__grid">
            <div className="voices__score" data-reveal>
              <p className="kicker">
                <span className="kicker__rule" />
                What guests say
              </p>
              <h2 id="voices-h" className="voices__num">
                4.6<span>/5</span>
              </h2>
              <p className="voices__src">
                Average from {hotel.rating.count} reviews on {hotel.rating.sources}
              </p>
            </div>
            <ul className="voices__list">
              {[
                { q: "The best in Isabela this far!", by: "Guest review, Hotels.com, June 2025" },
                { q: "I’m pleased about how beautiful this hotel was.", by: "Guest review, Hotels.com, June 2025" },
              ].map((v, i) => (
                <li key={i} className="voice" data-reveal data-delay={i * 0.1}>
                  <blockquote>“{v.q.replace(/[“”]/g, "")}”</blockquote>
                  <p>{v.by}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
        <Reserve />
      </main>
      <Motion />
    </>
  );
}
