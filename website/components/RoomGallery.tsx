"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import Photo from "@/components/Photo";

type Props = {
  slugs: string[];
  name: string;
  sizes?: string;
  ratio?: string;
  /** Show a full-screen viewer when a photo is tapped. */
  zoom?: boolean;
  priority?: boolean;
};

/**
 * Swipe through a room's photographs. Native scroll-snap does the swiping (so it feels
 * right on every phone); arrows and a counter make it work with a mouse and tell you
 * how many photos there are.
 */
export default function RoomGallery({ slugs, name, sizes = "100vw", ratio = "4 / 3", zoom = false, priority = false }: Props) {
  const track = useRef<HTMLDivElement>(null);
  const [i, setI] = useState(0);
  const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const onScroll = () => setI(Math.round(el.scrollLeft / el.clientWidth));
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  const go = (n: number) => {
    const el = track.current;
    if (!el) return;
    const to = Math.max(0, Math.min(slugs.length - 1, n));
    el.scrollTo({ left: to * el.clientWidth, behavior: "smooth" });
  };

  return (
    <div className="gal" style={{ aspectRatio: ratio }}>
      <div className="gal__track" ref={track} tabIndex={0} aria-label={`${name} photos`}>
        {slugs.map((s, k) => (
          <div className="gal__slide" key={s}>
            <Photo
              slug={s}
              alt={`${name}, photo ${k + 1} of ${slugs.length}`}
              fill
              sizes={sizes}
              priority={priority && k === 0}
            />
          </div>
        ))}
      </div>
      {slugs.length > 1 && (
        <>
          <button type="button" className="gal__arrow gal__arrow--prev" onClick={() => go(i - 1)} disabled={i === 0} aria-label="Previous photo">
            <ChevronLeft strokeWidth={1.5} />
          </button>
          <button
            type="button"
            className="gal__arrow gal__arrow--next"
            onClick={() => go(i + 1)}
            disabled={i === slugs.length - 1}
            aria-label="Next photo"
          >
            <ChevronRight strokeWidth={1.5} />
          </button>
          <div className="gal__dots" aria-hidden="true">
            {slugs.map((s, k) => (
              <i key={s} className={k === i ? "is-on" : ""} />
            ))}
          </div>
        </>
      )}
      <span className="gal__count" aria-live="polite">
        {i + 1} / {slugs.length}
      </span>
      {zoom && (
        <>
          <button type="button" className="gal__zoom" onClick={() => setOpen(true)} aria-label="View photos full screen">
            <Expand strokeWidth={1.5} />
          </button>
          <dialog ref={dialog} className="viewer" onClose={() => setOpen(false)} aria-label={`${name} photos`}>
            <button type="button" className="viewer__close" onClick={() => setOpen(false)}>
              <X strokeWidth={1.5} aria-hidden="true" /> Close
            </button>
            <div className="viewer__list">
              {slugs.map((s, k) => (
                <figure key={s} className="viewer__item">
                  <Photo slug={s} alt={`${name}, photo ${k + 1}`} sizes="100vw" />
                </figure>
              ))}
            </div>
          </dialog>
        </>
      )}
    </div>
  );
}
