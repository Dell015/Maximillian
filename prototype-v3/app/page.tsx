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
          <div className="wrap">
            <h2 id="voices-h" className="visually-hidden">
              What guests say
            </h2>
            <figure className="voice">
              <blockquote data-lines>The best in Isabela this far!</blockquote>
              <figcaption data-reveal>Guest review, Hotels.com, June 2025</figcaption>
            </figure>
            <figure className="voice voice--b">
              <blockquote data-lines>I’m pleased about how beautiful this hotel was.</blockquote>
              <figcaption data-reveal>Guest review, Hotels.com, June 2025</figcaption>
            </figure>
          </div>
        </section>
        <Reserve />
      </main>
      <Motion />
    </>
  );
}
