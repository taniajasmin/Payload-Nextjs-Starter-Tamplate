"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

let registered = false;

export function registerGSAP() {
  if (registered || typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
  gsap.defaults({
    ease: "expo.out",
    duration: 1,
  });
  registered = true;
}

export { gsap, ScrollTrigger, ScrollToPlugin };
