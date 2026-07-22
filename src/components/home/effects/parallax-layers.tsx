"use client";

import { useRef, useEffect, type ReactNode } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap-setup";
import { registerGSAP } from "@/lib/gsap-setup";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface ParallaxLayerProps {
  children: ReactNode;
  className?: string;
  speed?: number; // -1 to 1, negative = move opposite direction
}

export function ParallaxLayer({
  children,
  className = "",
  speed = 0.3,
}: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !ref.current) return;
    registerGSAP();

    const el = ref.current;

    gsap.set(el, {
      willChange: "transform",
    });

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress;
        const y = (progress - 0.5) * speed * 200;
        gsap.set(el, {
          y,
          force3D: true,
        });
      },
    });

    return () => {
      trigger.kill();
      gsap.set(el, { willChange: "auto", y: 0 });
    };
  }, [reducedMotion, speed]);

  return (
    <div ref={ref} className={`gpu-accelerated ${className}`}>
      {children}
    </div>
  );
}

// Container that manages multiple parallax layers
interface ParallaxContainerProps {
  children: ReactNode;
  className?: string;
}

export function ParallaxContainer({
  children,
  className = "",
}: ParallaxContainerProps) {
  return (
    <div className={`relative overflow-hidden ${className}`}>{children}</div>
  );
}
