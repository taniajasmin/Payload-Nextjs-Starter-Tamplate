"use client";

import { useEffect, useRef, useCallback, type ReactNode } from "react";

/* ─── WOW.js types (the package has no @types) ──────────────── */

interface WOWInstance {
  init(): void;
  sync(): void;
}

interface WOWConstructor {
  new (opts?: {
    boxClass?: string;
    animateClass?: string;
    offset?: number;
    mobile?: boolean;
    live?: boolean;
    scrollContainer?: string | null;
    resetAnimation?: boolean;
    callback?: (box: Element) => void;
  }): WOWInstance;
}

/* ─── Provider ──────────────────────────────────────────────── */

interface WOWProviderProps {
  children: ReactNode;
  /** Trigger offset from viewport bottom (px). Default 120. */
  offset?: number;
  /** Enable on mobile. Default true. */
  mobile?: boolean;
  /** Watch for DOM mutations. Default true. */
  live?: boolean;
  /** Reset animation when element scrolls out of viewport. Default false. */
  resetAnimation?: boolean;
}

export default function WOWProvider({
  children,
  offset = 120,
  mobile = true,
  live = true,
  resetAnimation = false,
}: WOWProviderProps) {
  const wowRef = useRef<WOWInstance | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const initWOW = useCallback(async () => {
    if (typeof window === "undefined") return;

    try {
      // Dynamic import — WOW.js needs window
      const WOWModule = await import("wow.js");
      const WOW: WOWConstructor =
        (WOWModule as { default?: WOWConstructor }).default ??
        (WOWModule as unknown as WOWConstructor);

      wowRef.current = new WOW({
        boxClass: "wow",
        animateClass: "animated",
        offset,
        mobile,
        live,
        scrollContainer: null,
        resetAnimation,
        callback(box: Element) {
          // Optional: dispatch custom event for tracking
          box.dispatchEvent(new CustomEvent("wow:animated", { bubbles: true }));
        },
      });

      wowRef.current.init();
    } catch (err) {
      console.warn("WOW.js failed to initialise:", err);
    }
  }, [offset, mobile, live, resetAnimation]);

  useEffect(() => {
    initWOW();

    return () => {
      wowRef.current = null;
    };
  }, [initWOW]);

  // Re-sync WOW when children change (e.g. CMS live preview updates)
  useEffect(() => {
    if (!wowRef.current) return;
    // Small delay to let React commit the DOM
    const timer = setTimeout(() => {
      wowRef.current?.sync();
    }, 100);
    return () => clearTimeout(timer);
  });

  return (
    <div ref={containerRef} className="wow-container">
      {children}
    </div>
  );
}
