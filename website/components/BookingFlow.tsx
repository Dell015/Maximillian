"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, BedDouble, Ruler, Users, Check, Minus, Plus, ChevronDown, Pencil, ShieldCheck, Coffee } from "lucide-react";
import RoomGallery from "@/components/RoomGallery";
import Photo from "@/components/Photo";
import RangeCalendar, { iso, parse } from "@/components/RangeCalendar";
import { Amen } from "@/lib/amenities";
import { rooms, formatPeso, hotel, type Room } from "@/lib/hotel";

type Initial = { checkIn: string; checkOut: string; guests: number; room: string };
type Step = 1 | 2 | 3 | 4;

const STEPS = ["Dates", "Room", "Details", "Review"] as const;
const REQUESTS = ["Early check-in", "Late check-out", "Airport pick-up", "High floor", "Quiet room", "Celebrating something"];
const SAVE_KEY = "mx-booking";

const nightsBetween = (a: string, b: string) =>
  a && b ? Math.round((parse(b).getTime() - parse(a).getTime()) / 86400000) : 0;
const fmt = (d: string, long = false) =>
  d
    ? parse(d).toLocaleDateString("en-PH", long ? { weekday: "short", month: "short", day: "numeric", year: "numeric" } : { weekday: "short", month: "short", day: "numeric" })
    : "";
const fits = (r: Room, adults: number, children: number) =>
  adults <= r.fits.adults && children <= r.fits.children && adults + children <= r.fits.total;

function Counter({ label, hint, value, min, max, onChange }: { label: string; hint: string; value: number; min: number; max: number; onChange: (n: number) => void }) {
  return (
    <div className="counter">
      <div>
        <p className="counter__label">{label}</p>
        <p className="counter__hint">{hint}</p>
      </div>
      <div className="counter__ctl">
        <button type="button" onClick={() => onChange(value - 1)} disabled={value <= min} aria-label={`Fewer ${label.toLowerCase()}`}>
          <Minus strokeWidth={1.5} />
        </button>
        <output aria-live="polite">{value}</output>
        <button type="button" onClick={() => onChange(value + 1)} disabled={value >= max} aria-label={`More ${label.toLowerCase()}`}>
          <Plus strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
}

export default function BookingFlow({ initial }: { initial: Initial }) {
  const [step, setStepState] = useState<Step>(1);
  const [checkIn, setCheckIn] = useState(initial.checkIn);
  const [checkOut, setCheckOut] = useState(initial.checkOut);
  const [adults, setAdults] = useState(Math.min(initial.guests, 4));
  const [children, setChildren] = useState(0);
  const [roomId, setRoomId] = useState(initial.room);
  const [openId, setOpenId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [arrival, setArrival] = useState("");
  const [requests, setRequests] = useState<string[]>([]);
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");
  const [ref, setRef] = useState("");
  const [today, setToday] = useState("");
  const [restored, setRestored] = useState(false);

  const headingRef = useRef<HTMLHeadingElement>(null);
  const firstRender = useRef(true);

  // Each step is a history entry, so the phone's own back gesture goes back a step.
  const goTo = useCallback((n: Step) => {
    setError("");
    setStepState(n);
    const url = new URL(location.href);
    url.searchParams.set("step", String(n));
    history.pushState({ mxStep: n }, "", url);
  }, []);

  useEffect(() => {
    setToday(iso(new Date()));
    const url = new URL(location.href);
    url.searchParams.delete("step");
    history.replaceState({ mxStep: 1 }, "", url);
    const onPop = (e: PopStateEvent) => {
      const n = (e.state?.mxStep as Step) || 1;
      setError("");
      setStepState(n);
    };
    window.addEventListener("popstate", onPop);

    // Pick up where you left off (for example after opening a room's full page).
    try {
      const saved = JSON.parse(sessionStorage.getItem(SAVE_KEY) || "null");
      if (saved) {
        if (!initial.checkIn && saved.checkIn) setCheckIn(saved.checkIn);
        if (!initial.checkOut && saved.checkOut) setCheckOut(saved.checkOut);
        if (saved.adults) setAdults(saved.adults);
        if (saved.children) setChildren(saved.children);
        if (!initial.room && saved.roomId) setRoomId(saved.roomId);
        if (saved.name) setName(saved.name);
        if (saved.email) setEmail(saved.email);
        if (saved.phone) setPhone(saved.phone);
      }
    } catch {}
    setRestored(true);
    return () => window.removeEventListener("popstate", onPop);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!restored) return;
    try {
      sessionStorage.setItem(SAVE_KEY, JSON.stringify({ checkIn, checkOut, adults, children, roomId, name, email, phone }));
    } catch {}
  }, [restored, checkIn, checkOut, adults, children, roomId, name, email, phone]);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    headingRef.current?.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step, ref]);

  const nights = nightsBetween(checkIn, checkOut);
  const room = rooms.find((r) => r.id === roomId);
  const total = room && nights > 0 ? room.from * nights : 0;
  const roomFits = room ? fits(room, adults, children) : true;
  const freeUntil = checkIn ? fmt(iso(new Date(parse(checkIn).getTime() - 2 * 86400000)), true) : "";

  const checks: Record<Step, () => string> = {
    1: () => {
      if (!checkIn) return "Choose your check-in date.";
      if (!checkOut) return "Choose your check-out date.";
      if (nights < 1) return "Check-out must be at least one night after check-in.";
      return "";
    },
    2: () => (!room ? "Choose a room to continue." : !roomFits ? `The ${room.name} doesn’t fit your party. Choose another room.` : ""),
    3: () => {
      if (!name.trim()) return "Enter the name the booking should be under.";
      if (!/^\S+@\S+\.\S+$/.test(email)) return "Enter a valid email, like name@example.com. Your confirmation goes there.";
      if (phone.replace(/\D/g, "").length < 7) return "Enter a mobile number the hotel can reach you on.";
      return "";
    },
    4: () => "",
  };

  const advance = () => {
    const msg = checks[step]();
    if (msg) return setError(msg);
    if (step < 4) goTo((step + 1) as Step);
    else setRef("MX-" + Math.random().toString(36).slice(2, 8).toUpperCase());
  };

  // Short on a phone (the bar already shows the room and price), fuller on a desktop.
  const primary: Record<Step, [string, string]> = {
    1: ["See rooms", nights > 0 ? `See rooms for ${nights} ${nights === 1 ? "night" : "nights"}` : "See rooms"],
    2: ["Continue", room ? `Continue with ${room.name}` : "Continue"],
    3: ["Review", "Review booking"],
    4: ["Send request", "Send booking request"],
  };

  const toggleRequest = (r: string) =>
    setRequests((xs) => (xs.includes(r) ? xs.filter((x) => x !== r) : [...xs, r]));

  /* ---------- Confirmation ---------- */
  if (ref) {
    return (
      <div className="bk bk--done">
        <div className="done">
          <span className="done__tick" aria-hidden="true">
            <Check strokeWidth={1.4} />
          </span>
          <h1 ref={headingRef} tabIndex={-1} className="title title--s">
            Your request is in, {name.split(" ")[0]}.
          </h1>
          <p className="lede">
            Reference <strong>{ref}</strong>. In the live site the reservations team would email {email} to confirm
            your room and payment. This prototype sends nothing.
          </p>
          {room && (
            <div className="done__card">
              <div className="done__photo">
                <Photo slug={room.photos[0]} alt="" fill sizes="(min-width: 700px) 40vw, 90vw" />
              </div>
              <dl className="sumlist">
                <div>
                  <dt>Room</dt>
                  <dd>{room.name}</dd>
                </div>
                <div>
                  <dt>Stay</dt>
                  <dd>
                    {fmt(checkIn, true)} to {fmt(checkOut, true)}
                  </dd>
                </div>
                <div>
                  <dt>Guests</dt>
                  <dd>
                    {adults} {adults === 1 ? "adult" : "adults"}
                    {children ? `, ${children} ${children === 1 ? "child" : "children"}` : ""}
                  </dd>
                </div>
                <div className="sumlist__total">
                  <dt>Estimated total</dt>
                  <dd>{formatPeso(total)}</dd>
                </div>
              </dl>
            </div>
          )}
          <div className="done__actions">
            <Link href="/" className="btn">
              Back to the hotel
            </Link>
            <a href={hotel.mobile.href} className="btn btn--ghost">
              Call {hotel.mobile.display}
            </a>
          </div>
        </div>
      </div>
    );
  }

  /* ---------- Summary (desktop side panel, phone pull-down) ---------- */
  const Summary = (
    <>
      {room ? (
        <div className="sum__room">
          <div className="sum__photo">
            <Photo slug={room.photos[0]} alt="" fill sizes="360px" />
          </div>
          <div>
            <p className="sum__name">{room.name}</p>
            <p className="sum__meta">
              {room.size} · {room.bed}
            </p>
          </div>
        </div>
      ) : null}
      <dl className="sumlist">
        <div>
          <dt>Dates</dt>
          <dd>{checkIn && checkOut ? `${fmt(checkIn)} to ${fmt(checkOut)}` : checkIn ? `${fmt(checkIn)} to …` : "Not chosen yet"}</dd>
        </div>
        <div>
          <dt>Guests</dt>
          <dd>
            {adults} {adults === 1 ? "adult" : "adults"}
            {children ? `, ${children} ${children === 1 ? "child" : "children"}` : ""}
          </dd>
        </div>
        {room && nights > 0 && (
          <div>
            <dt>
              {formatPeso(room.from)} × {nights} {nights === 1 ? "night" : "nights"}
            </dt>
            <dd>{formatPeso(total)}</dd>
          </div>
        )}
        <div className="sumlist__total">
          <dt>Estimated total</dt>
          <dd>{total ? formatPeso(total) : "—"}</dd>
        </div>
      </dl>
      <ul className="sum__perks">
        <li>
          <Coffee aria-hidden="true" strokeWidth={1.4} /> Breakfast included
        </li>
        <li>
          <ShieldCheck aria-hidden="true" strokeWidth={1.4} />
          {freeUntil ? `Free cancellation until ${freeUntil}, 2:00 PM` : "Free cancellation up to 48 hours before check-in"}
        </li>
      </ul>
      <p className="sum__help">
        <i className="live" />
        Prefer to talk? Call <a href={hotel.mobile.href}>{hotel.mobile.display}</a>, any hour.
      </p>
    </>
  );

  return (
    <div className="bk">
      {/* Always a way back, always a sense of where you are */}
      <div className="bk__top">
        {step > 1 ? (
          <button type="button" className="back" onClick={() => history.back()}>
            <ArrowLeft aria-hidden="true" strokeWidth={1.5} />
            Back
          </button>
        ) : (
          <Link href={roomId ? `/rooms/${roomId}` : "/rooms"} className="back">
            <ArrowLeft aria-hidden="true" strokeWidth={1.5} />
            {roomId ? "Back to the room" : "Back to rooms"}
          </Link>
        )}
        <ol className="steps" aria-label="Booking steps">
          {STEPS.map((label, i) => {
            const n = (i + 1) as Step;
            const done = n < step;
            return (
              <li key={label} className={n === step ? "is-current" : done ? "is-done" : ""} aria-current={n === step ? "step" : undefined}>
                {done ? (
                  <button type="button" onClick={() => goTo(n)}>
                    <i aria-hidden="true">
                      <Check strokeWidth={2} />
                    </i>
                    <span>{label}</span>
                  </button>
                ) : (
                  <span className="steps__label">
                    <i aria-hidden="true">{n}</i>
                    <span>{label}</span>
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </div>

      <details className="sumbar">
        <summary>
          <span>
            {checkIn && checkOut ? `${fmt(checkIn)} – ${fmt(checkOut)}` : "Your stay"}
            {room ? ` · ${room.name}` : ""}
          </span>
          <strong>{total ? formatPeso(total) : ""}</strong>
          <ChevronDown aria-hidden="true" strokeWidth={1.5} />
        </summary>
        <div className="sumbar__body">{Summary}</div>
      </details>

      <div className="bk__grid">
        <div className="bk__main">
          {/* ---------- 1. Dates and guests ---------- */}
          {step === 1 && (
            <section aria-labelledby="s1">
              <h1 id="s1" ref={headingRef} tabIndex={-1} className="bk__title">
                When are you staying?
              </h1>
              <div className="bk__picked" aria-live="polite">
                <div className={checkIn ? "is-set" : ""}>
                  <small>Check in</small>
                  {checkIn ? fmt(checkIn) : "Add date"}
                  <em>from 2:00 PM</em>
                </div>
                <div className={checkOut ? "is-set" : ""}>
                  <small>Check out</small>
                  {checkOut ? fmt(checkOut) : "Add date"}
                  <em>by 12:00 noon</em>
                </div>
              </div>
              {nights > 14 && (
                <p className="note note--warn" role="status">
                  That’s {nights} nights, {fmt(checkIn)} to {fmt(checkOut)}. If that’s right, wonderful: for stays this
                  long, call <a href={hotel.mobile.href}>{hotel.mobile.display}</a> and ask about a long-stay rate. If not,
                  tap a new check-in date below.
                </p>
              )}
              {today && (
                <RangeCalendar
                  start={checkIn}
                  end={checkOut}
                  min={today}
                  onChange={(a, b) => {
                    setCheckIn(a);
                    setCheckOut(b);
                    setError("");
                  }}
                />
              )}
              <h2 className="bk__sub">Who’s coming?</h2>
              <div className="counters">
                <Counter label="Adults" hint="Ages 12 and up" value={adults} min={1} max={4} onChange={setAdults} />
                <Counter label="Children" hint="Under 12" value={children} min={0} max={3} onChange={setChildren} />
              </div>
            </section>
          )}

          {/* ---------- 2. Room ---------- */}
          {step === 2 && (
            <section aria-labelledby="s2">
              <h1 id="s2" ref={headingRef} tabIndex={-1} className="bk__title">
                Choose your room
              </h1>
              <p className="bk__lead">
                {nights} {nights === 1 ? "night" : "nights"}, {fmt(checkIn)} to {fmt(checkOut)}. Prices are totals for your
                stay, breakfast included.
              </p>
              <ul className="opts">
                {[...rooms]
                  .sort((a, b) => Number(b.id === initial.room) - Number(a.id === initial.room) || Number(fits(b, adults, children)) - Number(fits(a, adults, children)))
                  .map((r) => {
                    const ok = fits(r, adults, children);
                    const selected = r.id === roomId;
                    const open = openId === r.id;
                    return (
                      <li key={r.id} className={`opt${selected ? " is-selected" : ""}${ok ? "" : " is-unfit"}`}>
                        <div className="opt__media">
                          <RoomGallery slugs={r.photos} name={r.name} ratio="3 / 2" sizes="(min-width: 960px) 22rem, 100vw" />
                          {selected && (
                            <span className="opt__badge">
                              <Check aria-hidden="true" strokeWidth={2} /> Selected
                            </span>
                          )}
                        </div>
                        <div className="opt__body">
                          <p className="card__tier">{r.tier}</p>
                          <h2 className="opt__name">{r.name}</h2>
                          <p className="opt__for">{r.bestFor}</p>
                          <ul className="card__facts">
                            <li>
                              <Ruler aria-hidden="true" strokeWidth={1.4} />
                              {r.size}
                            </li>
                            <li>
                              <BedDouble aria-hidden="true" strokeWidth={1.4} />
                              {r.bed}
                            </li>
                            <li>
                              <Users aria-hidden="true" strokeWidth={1.4} />
                              Up to {r.fits.total}
                            </li>
                          </ul>
                          <ul className="card__amens">
                            {r.highlights.map((a) => (
                              <Amen key={a} id={a} compact />
                            ))}
                          </ul>

                          <button
                            type="button"
                            className="opt__more"
                            aria-expanded={open}
                            aria-controls={`more-${r.id}`}
                            onClick={() => setOpenId(open ? "" : r.id)}
                          >
                            {open ? "Hide room details" : "Room details and everything included"}
                            <ChevronDown aria-hidden="true" strokeWidth={1.5} />
                          </button>
                          <div id={`more-${r.id}`} className={`opt__panel${open ? " is-open" : ""}`}>
                            <div>
                              {r.story.map((p, k) => (
                                <p key={k} className="opt__story">
                                  {p}
                                </p>
                              ))}
                              <p className="opt__sleeps">
                                <strong>Sleeps:</strong> {r.sleeps}. <strong>View:</strong> {r.view}.
                              </p>
                              <ul className="amens amens--tight">
                                {r.amenities.map((a) => (
                                  <Amen key={a} id={a} />
                                ))}
                              </ul>
                              <Link href={`/rooms/${r.id}`} className="textlink">
                                Open the full room page
                              </Link>
                            </div>
                          </div>

                          <div className="opt__foot">
                            <p className="opt__price">
                              <strong>{formatPeso(r.from * nights)}</strong>
                              <span>
                                {formatPeso(r.from)} × {nights} {nights === 1 ? "night" : "nights"}
                              </span>
                            </p>
                            {ok ? (
                              <button
                                type="button"
                                className={`btn btn--sm${selected ? " btn--chosen" : ""}`}
                                aria-pressed={selected}
                                onClick={() => {
                                  setRoomId(r.id);
                                  setError("");
                                }}
                              >
                                {selected ? "Selected" : "Select"}
                              </button>
                            ) : (
                              <p className="opt__unfit">
                                Fits up to {r.fits.adults} adults{r.fits.children ? ` and ${r.fits.children} child` : ""}.
                              </p>
                            )}
                          </div>
                        </div>
                      </li>
                    );
                  })}
              </ul>
              {rooms.every((r) => !fits(r, adults, children)) && (
                <p className="note">
                  No single room fits {adults + children} guests. Call {hotel.mobile.display} and the front desk will
                  arrange connecting rooms.
                </p>
              )}
            </section>
          )}

          {/* ---------- 3. Details ---------- */}
          {step === 3 && (
            <section aria-labelledby="s3">
              <h1 id="s3" ref={headingRef} tabIndex={-1} className="bk__title">
                Your details
              </h1>
              <p className="bk__lead">We’ll send your confirmation by email, and only call if something needs your answer.</p>
              <div className="form">
                <div className="field field--boxed field--wide">
                  <label htmlFor="f-name">Full name</label>
                  <input id="f-name" type="text" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="field field--boxed">
                  <label htmlFor="f-email">Email</label>
                  <input id="f-email" type="email" inputMode="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="field field--boxed">
                  <label htmlFor="f-phone">Mobile number</label>
                  <input
                    id="f-phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="0917 123 4567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div className="field field--boxed field--wide">
                  <label htmlFor="f-arrival">Arriving around (optional)</label>
                  <select id="f-arrival" value={arrival} onChange={(e) => setArrival(e.target.value)}>
                    <option value="">I’m not sure yet</option>
                    <option>Before 2:00 PM (early check-in request)</option>
                    <option>2:00 to 6:00 PM</option>
                    <option>6:00 to 10:00 PM</option>
                    <option>After 10:00 PM</option>
                  </select>
                </div>
              </div>
              <h2 className="bk__sub">Anything we should prepare?</h2>
              <div className="chips chips--left" role="group" aria-label="Requests">
                {REQUESTS.map((r) => (
                  <button key={r} type="button" className={`chip${requests.includes(r) ? " is-on" : ""}`} aria-pressed={requests.includes(r)} onClick={() => toggleRequest(r)}>
                    {requests.includes(r) && <Check aria-hidden="true" strokeWidth={2} size={14} />}
                    {r}
                  </button>
                ))}
              </div>
              <div className="field field--boxed field--wide">
                <label htmlFor="f-notes">Notes for the front desk (optional)</label>
                <textarea id="f-notes" rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} />
              </div>
              <p className="bk__fine">Requests depend on availability. Nothing is charged until the hotel confirms.</p>
            </section>
          )}

          {/* ---------- 4. Review ---------- */}
          {step === 4 && room && (
            <section aria-labelledby="s4">
              <h1 id="s4" ref={headingRef} tabIndex={-1} className="bk__title">
                Check and send
              </h1>
              <div className="review">
                <div className="review__block">
                  <div className="review__head">
                    <h2>Your stay</h2>
                    <button type="button" onClick={() => goTo(1)}>
                      <Pencil aria-hidden="true" strokeWidth={1.5} size={14} /> Edit
                    </button>
                  </div>
                  <p>
                    {fmt(checkIn, true)} to {fmt(checkOut, true)}
                    <br />
                    {nights} {nights === 1 ? "night" : "nights"}, {adults} {adults === 1 ? "adult" : "adults"}
                    {children ? `, ${children} ${children === 1 ? "child" : "children"}` : ""}
                  </p>
                </div>
                <div className="review__block review__block--room">
                  <div className="review__head">
                    <h2>Your room</h2>
                    <button type="button" onClick={() => goTo(2)}>
                      <Pencil aria-hidden="true" strokeWidth={1.5} size={14} /> Change
                    </button>
                  </div>
                  <div className="review__room">
                    <div className="review__photo">
                      <Photo slug={room.photos[0]} alt="" fill sizes="160px" />
                    </div>
                    <p>
                      <strong>{room.name}</strong>
                      <br />
                      {room.size}, {room.bed.toLowerCase()}
                      <br />
                      Breakfast included
                    </p>
                  </div>
                </div>
                <div className="review__block">
                  <div className="review__head">
                    <h2>Guest</h2>
                    <button type="button" onClick={() => goTo(3)}>
                      <Pencil aria-hidden="true" strokeWidth={1.5} size={14} /> Edit
                    </button>
                  </div>
                  <p>
                    {name}
                    <br />
                    {email}
                    <br />
                    {phone}
                    {arrival && (
                      <>
                        <br />
                        Arriving {arrival.toLowerCase()}
                      </>
                    )}
                  </p>
                  {(requests.length > 0 || notes) && (
                    <p className="review__req">{[...requests, notes].filter(Boolean).join(" · ")}</p>
                  )}
                </div>
                <div className="review__block review__block--price">
                  <h2>Price</h2>
                  <dl className="sumlist">
                    <div>
                      <dt>
                        {formatPeso(room.from)} × {nights} {nights === 1 ? "night" : "nights"}
                      </dt>
                      <dd>{formatPeso(total)}</dd>
                    </div>
                    <div>
                      <dt>Breakfast</dt>
                      <dd>Included</dd>
                    </div>
                    <div className="sumlist__total">
                      <dt>Estimated total</dt>
                      <dd>{formatPeso(total)}</dd>
                    </div>
                  </dl>
                </div>
              </div>
              <ul className="sum__perks">
                <li>
                  <ShieldCheck aria-hidden="true" strokeWidth={1.4} />
                  Free cancellation until {freeUntil}, 2:00 PM
                </li>
                <li>
                  <Check aria-hidden="true" strokeWidth={1.4} />
                  Pay after the hotel confirms: card, QR code or bank transfer
                </li>
              </ul>
            </section>
          )}

          {error && (
            <p className="error" role="alert">
              {error}
            </p>
          )}

          {/* The one next action: fixed to the bottom of a phone, inline on a desktop */}
          <div className="bk__bar">
            <div className="bk__barsum">
              {total ? (
                <>
                  <strong>{formatPeso(total)}</strong>
                  <span>
                    {nights} {nights === 1 ? "night" : "nights"} · {room?.name}
                  </span>
                </>
              ) : nights > 0 ? (
                <>
                  <strong>
                    {nights} {nights === 1 ? "night" : "nights"}
                  </strong>
                  <span>
                    {fmt(checkIn)} – {fmt(checkOut)}
                  </span>
                </>
              ) : (
                <span>{checkIn ? "Choose check-out" : "Choose your dates"}</span>
              )}
            </div>
            <button type="button" className="btn bk__go" onClick={advance}>
              <span className="bk__go-s">{primary[step][0]}</span>
              <span className="bk__go-l">{primary[step][1]}</span>
            </button>
          </div>
        </div>

        <aside className="sum" aria-label="Your stay">
          <h2 className="sum__title">Your stay</h2>
          {Summary}
        </aside>
      </div>
    </div>
  );
}
