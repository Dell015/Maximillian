"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

let ready = false;

/** Register plugins once and set the house ease: exponential out, fast then slow. */
export function initGsap() {
  if (ready || typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger, SplitText);
  gsap.defaults({ ease: "expo.out", duration: 1.4 });
  ScrollTrigger.config({ ignoreMobileResize: true });
  ready = true;
}

export const prefersReduced = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** True on phones and tablets, where native momentum scrolling is already smooth. */
export const isTouch = () =>
  typeof window !== "undefined" && window.matchMedia("(hover: none), (pointer: coarse)").matches;

export { gsap, ScrollTrigger, SplitText };
