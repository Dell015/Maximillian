import type { CSSProperties } from "react";

/**
 * One large sentence whose words fill in as you scroll. Words are split on the
 * server, so this needs no client JavaScript. Without scroll-driven animation
 * support the text simply shows in full.
 */
export default function Statement({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <section className="statement" aria-label="About the hotel">
      <div className="container">
        <p
          className="statement__text"
          style={{ "--n": words.length } as CSSProperties}
        >
          {words.map((w, i) => (
            <span
              key={i}
              className="statement__word"
              style={{ "--i": i } as CSSProperties}
            >
              {w}{" "}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
