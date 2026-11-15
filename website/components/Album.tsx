import Photo from "@/components/Photo";
import { album } from "@/lib/content";

/**
 * The rest of the house and the people who run it. Three columns (two on a phone)
 * drift at different speeds as you scroll, so a long run of photographs reads as
 * one moving wall instead of a grid.
 */
export default function Album() {
  const cols = [0, 1, 2].map((c) => album.filter((_, i) => i % 3 === c));
  const speeds = [0.25, -0.2, 0.4];
  return (
    <section className="album" aria-labelledby="album-h">
      <div className="wrap album__head">
        <p className="kicker" data-reveal>
          <span className="kicker__rule" />
          The people, the hours in between
        </p>
        <h2 id="album-h" className="title" data-lines>
          Someone is always at the door.
        </h2>
        <p className="lede" data-reveal>
          Housekeeping before noon, the kitchen before dawn, a team that remembers your name by the second night.
        </p>
      </div>
      <div className="wrap album__wall">
        {cols.map((col, c) => (
          <div key={c} className={`album__col album__col--${c}`} data-speed={speeds[c]}>
            {col.map((p, i) => (
              <figure key={p.slug} className="album__item">
                <Photo
                  slug={p.slug}
                  alt={p.alt}
                  ratio={(i + c) % 2 ? "4 / 5" : "1 / 1"}
                  sizes="(min-width: 900px) 30vw, 46vw"
                  par={5}
                />
              </figure>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
