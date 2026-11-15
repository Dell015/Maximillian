"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const pad = (n: number) => String(n).padStart(2, "0");
export const iso = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
export const parse = (s: string) => new Date(s + "T00:00:00");

const DOW = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

type Props = {
  start: string;
  end: string;
  min: string;
  onChange: (start: string, end: string) => void;
};

/**
 * Pick a stay in two taps: arrival, then departure. Two months at a time (side by side on
 * a desktop, stacked on a phone). Tapping a day before your arrival moves the arrival.
 */
export default function RangeCalendar({ start, end, min, onChange }: Props) {
  const first = parse(start || min || iso(new Date()));
  const [month, setMonth] = useState(new Date(first.getFullYear(), first.getMonth(), 1));
  const [hover, setHover] = useState("");
  const minMonth = new Date(parse(min).getFullYear(), parse(min).getMonth(), 1);

  const pick = (d: string) => {
    if (!start || end) return onChange(d, "");
    if (d <= start) return onChange(d, "");
    onChange(start, d);
  };

  const months = [month, new Date(month.getFullYear(), month.getMonth() + 1, 1)];
  const choosingEnd = Boolean(start && !end);
  const span = (a: string, b: string) => Math.round((parse(b).getTime() - parse(a).getTime()) / 86400000);
  const count = start && end ? span(start, end) : choosingEnd && hover > start ? span(start, hover) : 0;
  const nightsLabel = (n: number) => `${n} ${n === 1 ? "night" : "nights"}`;

  return (
    <div className="cal" onMouseLeave={() => setHover("")}>
      <div className="cal__nav">
        <button
          type="button"
          aria-label="Previous month"
          disabled={month <= minMonth}
          onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))}
        >
          <ChevronLeft strokeWidth={1.5} />
        </button>
        <p className="cal__hint" aria-live="polite">
          {start && end ? (
            <>
              <strong className="cal__count">{nightsLabel(count)}</strong> · tap a date to start again
            </>
          ) : choosingEnd ? (
            count ? (
              <>
                Check out here: <strong className="cal__count">{nightsLabel(count)}</strong>
              </>
            ) : (
              "Now choose your check-out date"
            )
          ) : (
            "Choose your check-in date"
          )}
        </p>
        <button
          type="button"
          aria-label="Next month"
          onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))}
        >
          <ChevronRight strokeWidth={1.5} />
        </button>
      </div>
      <div className="cal__months">
        {months.map((m) => {
          const y = m.getFullYear();
          const mo = m.getMonth();
          const lead = new Date(y, mo, 1).getDay();
          const days = new Date(y, mo + 1, 0).getDate();
          const cells: (string | null)[] = Array(lead).fill(null);
          for (let d = 1; d <= days; d++) cells.push(`${y}-${pad(mo + 1)}-${pad(d)}`);
          return (
            <div key={`${y}-${mo}`} className="cal__month">
              <p className="cal__title">{m.toLocaleDateString("en-PH", { month: "long", year: "numeric" })}</p>
              <div className="cal__grid cal__dow" aria-hidden="true">
                {DOW.map((d) => (
                  <span key={d}>{d}</span>
                ))}
              </div>
              <div className="cal__grid">
                {cells.map((d, k) => {
                  if (!d) return <span key={`b${k}`} />;
                  const past = d < min;
                  const isStart = d === start;
                  const isEnd = d === end;
                  const edge = end || (choosingEnd && hover > start ? hover : "");
                  const inRange = start && edge && d > start && d < edge;
                  const cls = [
                    "cal__day",
                    isStart && "is-start",
                    (isEnd || (!end && choosingEnd && d === hover && d > start)) && "is-end",
                    inRange && "in-range",
                    start && edge && (isStart || d === edge) && "has-range",
                  ]
                    .filter(Boolean)
                    .join(" ");
                  return (
                    <button
                      key={d}
                      type="button"
                      className={cls}
                      disabled={past}
                      aria-pressed={isStart || isEnd}
                      aria-label={parse(d).toLocaleDateString("en-PH", { weekday: "long", month: "long", day: "numeric" })}
                      onMouseEnter={() => setHover(d)}
                      onClick={() => pick(d)}
                    >
                      <span>{Number(d.slice(8))}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
