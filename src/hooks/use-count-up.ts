"use client";

import { useEffect, useState } from "react";

interface UseCountUpOptions {
  end: number;
  duration?: number;
  start?: number;
  enabled?: boolean;
  decimals?: number;
}

export function useCountUp({
  end,
  duration = 2000,
  start = 0,
  enabled = true,
  decimals = 0,
}: UseCountUpOptions) {
  const [count, setCount] = useState(start);

  useEffect(() => {
    if (!enabled) {
      setCount(start);
      return;
    }

    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      // easeOutQuart
      const eased = 1 - Math.pow(1 - progress, 4);
      const current = start + (end - start) * eased;

      setCount(Number(current.toFixed(decimals)));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [end, duration, start, enabled, decimals]);

  return count;
}
