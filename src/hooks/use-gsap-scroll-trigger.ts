"use client";

import { useRef, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap-setup";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface UseGSAPScrollTriggerOptions {
  trigger?: React.RefObject<HTMLElement | null>;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  markers?: boolean;
  once?: boolean;
  toggleActions?: string;
  pin?: boolean;
  onEnter?: (self: ScrollTrigger) => void;
  onLeave?: (self: ScrollTrigger) => void;
  onEnterBack?: (self: ScrollTrigger) => void;
}

export function useGSAPScrollTrigger(
  callback: (
    contextSafe: <T extends unknown[]>(fn: (...args: T) => void) => (...args: T) => void,
    container: React.RefObject<HTMLElement | null>,
  ) => void,
  options?: UseGSAPScrollTriggerOptions,
) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const { contextSafe } = useGSAP(
    () => {
      if (reducedMotion) return;
      callback(
        contextSafe as unknown as Parameters<typeof callback>[0],
        containerRef,
      );
    },
    { scope: containerRef, dependencies: [reducedMotion] },
  );

  return { containerRef, contextSafe };
}
