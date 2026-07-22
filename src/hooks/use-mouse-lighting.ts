"use client";

import { useRef, useEffect, useCallback, useState } from "react";

export function useMouseLighting() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const rafRef = useRef<number>(0);
  const mouseRef = useRef({ x: 50, y: 50 });

  useEffect(() => {
    setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || isTouchDevice) return;

    let ticking = false;

    const handleMouseMove = (e: MouseEvent) => {
      if (ticking) return;
      ticking = true;

      mouseRef.current = {
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      };

      requestAnimationFrame(() => {
        el.style.setProperty("--mouse-x", `${mouseRef.current.x}%`);
        el.style.setProperty("--mouse-y", `${mouseRef.current.y}%`);
        ticking = false;
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isTouchDevice]);

  return { containerRef };
}
