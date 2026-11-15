"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { rooms, formatPeso, hotel } from "@/lib/hotel";

type Initial = { checkIn: string; checkOut: string; guests: number; room: string };
type Step = 1 | 2 | 3 | 4;

const STEPS = ["Dates", "Room", "Details", "Review"];

function nightsBetween(a: string, b: string): number {
  if (!a || !b) return 0;
  const ms =
    new Date(b + "T00:00:00").getTime() - new Date(a + "T00:00:00").getTime();
  return Math.round(ms / 86400000);
}

function fmtDate(d: string): string {
  if (!d) return "";
  return new Date(d + "T00:00:00").toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function localToday(): string {
  const d = new Date();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
}

export default function BookingFlow({ initial }: { initial: Initial }) {
  const [step, setStep] = useState<Step>(1);
  const [checkIn, setCheckIn] = useState(initial.checkIn);
  const [checkOut, setCheckOut] = useState(initial.checkOut);
  const [guests, setGuests] = useState(initial.guests);
  const [roomId, setRoomId] = useState(initial.room);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");
  const [ref, setRef] = useState("");
  const [today, setToday] = useState("");

  const headingRef = useRef<HTMLHeadingElement>(null);
  const firstRender = useRef(true);

  useEffect(() => setToday(localToday()), []);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    headingRef.current?.focus();
  }, [step, ref]);

  const nights = nightsBetween(checkIn, checkOut);
  const room = rooms.find((r) => r.id === roomId);
  const total = room && nights > 0 ? room.from * nights : 0;

  function next(to: Step, check?: () => string) {
    const message = check ? check() : "";
    setError(message);
    if (!message) setStep(to);
  }

  const checkDates = () => {
    if (!checkIn || !checkOut) return "Choose both a check-in and a check-out date.";
    if (today && checkIn < today) return "Check-in can’t be in the past.";
    if (nights < 1) return "Check-out must be at least one night after check-in.";
    return "";
  };
  const checkRoom = () => (room ? "" : "Choose a room to continue.");
  const checkDetails = () => {
    if (!name.trim()) return "Enter your full name.";
    if (!/^\S+@\S+\.\S+$/.test(email)) return "Enter a valid email address, like name@example.com.";
    if (phone.replace(/\D/g, "").length < 7) return "Enter a mobile number the hotel can reach you on.";
    return "";
  };

  function confirm() {
    setRef("MX-" + Math.random().toString(36).slice(2, 8).toUpperCase());
  }

  function reset() {
    setRef("");
    setStep(1);
    setRoomId("");
    setName("");
    setEmail("");
    setPhone("");
    setNotes("");
    setError("");
  }

  if (ref) {
    return (
      <div className="flow flow--done">
        <h2 ref={headingRef} tabIndex={-1} className="flow__title">
          Request received
        </h2>
        <p className="flow__lead">
          Reference <strong>{ref}</strong>. This is a design prototype, so nothing was
          sent or saved. On the live site this request would go to the hotel’s
          reservations team, who would confirm by email within a set time.
        </p>
        <dl className="facts">
          <div>
            <dt>Stay</dt>
            <dd>
              {fmtDate(checkIn)} to {fmtDate(checkOut)} ({nights}{" "}
              {nights === 1 ? "night" : "nights"})
            </dd>
          </div>
          <div>
            <dt>Room</dt>
            <dd>{room?.name}</dd>
          </div>
          <div>
            <dt>Estimated total</dt>
            <dd>{formatPeso(total)}</dd>
          </div>
        </dl>
        <div className="flow__actions">
          <button type="button" className="btn" onClick={reset}>
            Start a new request
          </button>
          <Link href="/" className="btn btn--ghost">
            Back to the hotel
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flow">
      <ol className="stepper" aria-label="Reservation steps">
        {STEPS.map((label, i) => {
          const n = (i + 1) as Step;
          return (
            <li
              key={label}
              className={n === step ? "is-current" : n < step ? "is-done" : ""}
              aria-current={n === step ? "step" : undefined}
            >
              {label}
            </li>
          );
        })}
      </ol>

      <div className="flow__grid">
        <div className="flow__main">
          {step === 1 && (
            <section aria-labelledby="s1">
              <h2 id="s1" ref={headingRef} tabIndex={-1} className="flow__title">
                When are you staying?
              </h2>
              <div className="flow__fields">
                <div className="field field--boxed">
                  <label htmlFor="f-in">Check in</label>
                  <input
                    id="f-in"
                    type="date"
                    min={today || undefined}
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                  />
                </div>
                <div className="field field--boxed">
                  <label htmlFor="f-out">Check out</label>
                  <input
                    id="f-out"
                    type="date"
                    min={checkIn || today || undefined}
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                  />
                </div>
                <div className="field field--boxed">
                  <label htmlFor="f-guests">Guests</label>
                  <select
                    id="f-guests"
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                  >
                    {[1, 2, 3, 4].map((n) => (
                      <option key={n} value={n}>
                        {n} {n === 1 ? "guest" : "guests"}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              {error && (
                <p className="error" role="alert">
                  {error}
                </p>
              )}
              <div className="flow__actions">
                <button type="button" className="btn" onClick={() => next(2, checkDates)}>
                  Choose a room
                </button>
              </div>
            </section>
          )}

          {step === 2 && (
            <section aria-labelledby="s2">
              <h2 id="s2" ref={headingRef} tabIndex={-1} className="flow__title">
                Choose your room
              </h2>
              <fieldset className="choices">
                <legend className="visually-hidden">Room type</legend>
                {rooms.map((r) => (
                  <label
                    key={r.id}
                    className={`choice${r.id === roomId ? " is-selected" : ""}`}
                  >
                    <input
                      type="radio"
                      name="room"
                      value={r.id}
                      checked={r.id === roomId}
                      onChange={() => setRoomId(r.id)}
                    />
                    <span className="choice__text">
                      <span className="choice__name">{r.name}</span>
                      <span className="choice__meta">
                        {r.bed}
                        {r.size ? `, ${r.size}` : ""}
                      </span>
                    </span>
                    <span className="choice__price">
                      {formatPeso(r.from * nights)}
                      <span className="choice__per">
                        {formatPeso(r.from)} a night
                      </span>
                    </span>
                  </label>
                ))}
              </fieldset>
              {error && (
                <p className="error" role="alert">
                  {error}
                </p>
              )}
              <div className="flow__actions">
                <button type="button" className="btn btn--ghost" onClick={() => setStep(1)}>
                  Change dates
                </button>
                <button type="button" className="btn" onClick={() => next(3, checkRoom)}>
                  Add your details
                </button>
              </div>
            </section>
          )}

          {step === 3 && (
            <section aria-labelledby="s3">
              <h2 id="s3" ref={headingRef} tabIndex={-1} className="flow__title">
                Who is staying?
              </h2>
              <div className="flow__stack">
                <div className="field field--boxed">
                  <label htmlFor="f-name">Full name</label>
                  <input
                    id="f-name"
                    type="text"
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="field field--boxed">
                  <label htmlFor="f-email">Email</label>
                  <input
                    id="f-email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="field field--boxed">
                  <label htmlFor="f-phone">Mobile number</label>
                  <input
                    id="f-phone"
                    type="tel"
                    autoComplete="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div className="field field--boxed">
                  <label htmlFor="f-notes">Requests (optional)</label>
                  <textarea
                    id="f-notes"
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>
              </div>
              {error && (
                <p className="error" role="alert">
                  {error}
                </p>
              )}
              <div className="flow__actions">
                <button type="button" className="btn btn--ghost" onClick={() => setStep(2)}>
                  Change room
                </button>
                <button type="button" className="btn" onClick={() => next(4, checkDetails)}>
                  Review request
                </button>
              </div>
            </section>
          )}

          {step === 4 && (
            <section aria-labelledby="s4">
              <h2 id="s4" ref={headingRef} tabIndex={-1} className="flow__title">
                Review your request
              </h2>
              <dl className="facts">
                <div>
                  <dt>Stay</dt>
                  <dd>
                    {fmtDate(checkIn)} to {fmtDate(checkOut)} ({nights}{" "}
                    {nights === 1 ? "night" : "nights"})
                  </dd>
                </div>
                <div>
                  <dt>Guests</dt>
                  <dd>{guests}</dd>
                </div>
                <div>
                  <dt>Room</dt>
                  <dd>
                    {room?.name}, {room?.bed.toLowerCase()}
                  </dd>
                </div>
                <div>
                  <dt>Guest</dt>
                  <dd>
                    {name}
                    <br />
                    {email}
                    <br />
                    {phone}
                  </dd>
                </div>
                {notes && (
                  <div>
                    <dt>Requests</dt>
                    <dd>{notes}</dd>
                  </div>
                )}
                <div>
                  <dt>Estimated total</dt>
                  <dd>
                    <strong>{formatPeso(total)}</strong>
                  </dd>
                </div>
              </dl>
              <p className="note">
                Rates are “from” rates for two guests. The hotel confirms the final price,
                including any extra-guest charges, before you pay. Check-in is from{" "}
                {hotel.checkIn}; check-out is by {hotel.checkOut}.
              </p>
              <div className="flow__actions">
                <button type="button" className="btn btn--ghost" onClick={() => setStep(3)}>
                  Change details
                </button>
                <button type="button" className="btn" onClick={confirm}>
                  Send reservation request
                </button>
              </div>
            </section>
          )}
        </div>

        <aside className="summary" aria-label="Your stay">
          <h3 className="summary__title">Your stay</h3>
          <dl className="summary__list">
            <div>
              <dt>Dates</dt>
              <dd>
                {checkIn && checkOut
                  ? `${fmtDate(checkIn)} to ${fmtDate(checkOut)}`
                  : "Not chosen yet"}
              </dd>
            </div>
            <div>
              <dt>Guests</dt>
              <dd>{guests}</dd>
            </div>
            <div>
              <dt>Room</dt>
              <dd>{room ? room.name : "Not chosen yet"}</dd>
            </div>
            <div>
              <dt>Estimated total</dt>
              <dd>{total ? formatPeso(total) : "Choose dates and a room"}</dd>
            </div>
          </dl>
          <p className="summary__help">
            Prefer to talk? Call <a href={hotel.mobile.href}>{hotel.mobile.display}</a>.
          </p>
        </aside>
      </div>
    </div>
  );
}
