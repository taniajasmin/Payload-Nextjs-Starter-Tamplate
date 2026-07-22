"use client";

import { useRef, useEffect, type ReactNode } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap-setup";
import { registerGSAP } from "@/lib/gsap-setup";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface SectionWipeProps {
  children: ReactNode;
  className?: string;
  direction?: "up" | "left" | "right";
  duration?: number;
}

const clipPaths = {
  up: { hidden: "inset(100% 0 0 0)", visible: "inset(0% 0% 0% 0%)" },
  left: { hidden: "inset(0 100% 0 0)", visible: "inset(0% 0% 0% 0%)" },
  right: { hidden: "inset(0 0 0 100%)", visible: "inset(0% 0% 0% 0%)" },
};

export function SectionWipe({
  children,
  className = "",
  direction = "up",
  duration = 1.4,
}: SectionWipeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !ref.current) return;
    registerGSAP();

    const el = ref.current;
    const paths = clipPaths[direction];

    gsap.set(el, {
      clipPath: paths.hidden,
      willChange: "clip-path",
    });

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 80%",
      once: true,
      onEnter: () => {
        gsap.to(el, {
          clipPath: paths.visible,
          duration,
          ease: "expo.out",
          onComplete: () => {
            gsap.set(el, { willChange: "auto" });
          },
        });
      },
    });

    return () => {
      trigger.kill();
    };
  }, [reducedMotion, direction, duration]);

  return (
    <div
      ref={ref}
      className={className}
      style={
        reducedMotion
          ? undefined
          : { clipPath: clipPaths[direction].hidden, willChange: "clip-path" }
      }
    >
      {children}
    </div>
  );
}
