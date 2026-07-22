"use client";

import { useRef, useEffect, useState, useCallback } from "react";

interface UseMagneticHoverOptions {
  strength?: number;
  radius?: number;
  spring?: number;
}

export function useMagneticHover(options: UseMagneticHoverOptions = {}) {
  const { strength = 0.3, radius = 200, spring = 0.15 } = options;
  const ref = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < radius) {
        targetRef.current = {
          x: dx * strength,
          y: dy * strength,
        };
      } else {
        targetRef.current = { x: 0, y: 0 };
      }
    };

    const handleMouseLeave = () => {
      targetRef.current = { x: 0, y: 0 };
    };

    // Spring-based animation loop
    const animate = () => {
      currentRef.current.x += (targetRef.current.x - currentRef.current.x) * spring;
      currentRef.current.y += (targetRef.current.y - currentRef.current.y) * spring;

      // Snap to zero when close enough
      if (
        Math.abs(currentRef.current.x) < 0.01 &&
        Math.abs(currentRef.current.y) < 0.01 &&
        Math.abs(targetRef.current.x) < 0.01 &&
        Math.abs(targetRef.current.y) < 0.01
      ) {
        currentRef.current = { x: 0, y: 0 };
        setOffset({ x: 0, y: 0 });
      } else {
        setOffset({
          x: Math.round(currentRef.current.x * 100) / 100,
          y: Math.round(currentRef.current.y * 100) / 100,
        });
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, [strength, radius, spring, isTouchDevice]);

  return {
    ref,
    offset,
    style: isTouchDevice
      ? {}
      : {
          transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
          transition: "none",
        },
  };
}
