"use client";

import { useRef, useEffect, type ReactNode } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap-setup";
import { registerGSAP } from "@/lib/gsap-setup";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface BlurToFocusProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  blur?: number;
}

export function BlurToFocus({
  children,
  className = "",
  delay = 0,
  duration = 1.2,
  blur = 12,
}: BlurToFocusProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !ref.current) return;
    registerGSAP();

    const el = ref.current;
    gsap.set(el, {
      filter: `blur(${blur}px)`,
      opacity: 0.3,
      willChange: "filter, opacity",
    });

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      end: "top 50%",
      once: true,
      onEnter: () => {
        gsap.to(el, {
          filter: "blur(0px)",
          opacity: 1,
          duration,
          delay,
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
  }, [reducedMotion, delay, duration, blur]);

  return (
    <div
      ref={ref}
      className={className}
      style={
        reducedMotion
          ? undefined
          : {
              filter: `blur(${blur}px)`,
              opacity: 0.3,
              willChange: "filter, opacity",
            }
      }
    >
      {children}
    </div>
  );
}
