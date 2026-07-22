"use client";

import { useEffect, useRef, useState } from "react";

interface UseScrollPositionOptions {
  threshold?: number;
}

interface ScrollPosition {
  scrollY: number;
  scrollProgress: number;
  isScrolled: boolean;
}

export function useScrollPosition(
  options: UseScrollPositionOptions = {}
): ScrollPosition {
  const { threshold = 300 } = options;
  const [scrollY, setScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  // Keep the latest threshold in a ref so the scroll listener can be attached
  // exactly once without depending on a value that would force re-subscription.
  const thresholdRef = useRef(threshold);
  useEffect(() => {
    thresholdRef.current = threshold;
  }, [threshold]);

  useEffect(() => {
    const updateScroll = () => {
      const currentScrollY =
        window.scrollY || document.documentElement.scrollTop;

      const docHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const progress = docHeight > 0 ? currentScrollY / docHeight : 0;
      const clampedProgress = Math.min(Math.max(progress, 0), 1);
      const nextScrolled = currentScrollY > thresholdRef.current;

      // Bail out when nothing changed to avoid cascading re-renders.
      setScrollY((prev) => (prev === currentScrollY ? prev : currentScrollY));
      setScrollProgress((prev) =>
        prev === clampedProgress ? prev : clampedProgress
      );
      setIsScrolled((prev) => (prev === nextScrolled ? prev : nextScrolled));
    };

    let rafId = 0;
    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateScroll);
    };

    // Initialize on mount
    updateScroll();

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return { scrollY, scrollProgress, isScrolled };
}
