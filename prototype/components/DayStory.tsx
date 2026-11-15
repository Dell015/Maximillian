import Link from "next/link";
import Photo from "./Photo";
import { chapters } from "@/lib/hotel";

/**
 * "A day at the hotel": one pinned scene that moves from morning to night as you
 * scroll. Native scrolling and CSS scroll-driven animation only. Where that isn't
 * supported, or motion is reduced, the four chapters simply stack.
 */
export default function DayStory() {
  return (
    <section id="story" className="story" aria-labelledby="story-title">
      <h2 id="story-title" className="visually-hidden">
        A day at the hotel
      </h2>
      <div className="story__stage">
        <div className="story__sky" aria-hidden="true" />
        <div className="story__disc" aria-hidden="true" />
        <ol className="story__list">
          {chapters.map((c) => (
            <li key={c.id} className={`chapter chapter--${c.id}`}>
              <p className="chapter__when">{c.when}</p>
              <Photo
                slug={c.photo}
                alt={c.alt}
                tone={c.tone}
                className="chapter__photo"
                sizes="(min-width: 900px) 55vw, 90vw"
              />
              <div className="chapter__text">
                <h3 className="chapter__title">{c.title}</h3>
                <p>{c.text}</p>
                {c.cta && (
                  <Link href="/rooms" className="btn btn--light">
                    See the rooms
                  </Link>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
