"use client";

import { useRef, useEffect, type ReactNode, type Ref, type CSSProperties } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap-setup";
import { registerGSAP } from "@/lib/gsap-setup";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface StaggeredTextRevealProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  splitBy?: "char" | "word";
  stagger?: number;
  duration?: number;
  y?: number;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
}

export function StaggeredTextReveal({
  children,
  className = "",
  style,
  splitBy = "char",
  stagger = 0.03,
  duration = 0.8,
  y = 100,
  delay = 0,
  as: Tag = "div",
}: StaggeredTextRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !ref.current) return;
    registerGSAP();

    const el = ref.current;
    const text = el.textContent || "";
    if (!text.trim()) return;

    const originalText = text;

    if (splitBy === "char") {
      const html = text
        .split("")
        .map(
          (char) =>
            `<span style="display:inline-block;overflow:hidden;vertical-align:bottom;">` +
            `<span class="stagger-inner" style="display:inline-block;transform:translateY(${y}%);">${char === " " ? "&nbsp;" : char}</span>` +
            `</span>`,
        )
        .join("");
      el.innerHTML = `<span class="sr-only">${originalText}</span><span aria-hidden="true">${html}</span>`;
    } else {
      const html = text
        .split(/(\s+)/)
        .map(
          (word) =>
            `<span style="display:inline-block;overflow:hidden;vertical-align:bottom;">` +
            `<span class="stagger-inner" style="display:inline-block;transform:translateY(${y}%);">${word}</span>` +
            `</span>`,
        )
        .join(" ");
      el.innerHTML = `<span class="sr-only">${originalText}</span><span aria-hidden="true">${html}</span>`;
    }

    const inners = el.querySelectorAll(".stagger-inner");

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      once: true,
      onEnter: () => {
        gsap.to(inners, {
          y: "0%",
          duration,
          stagger,
          delay,
          ease: "expo.out",
          force3D: true,
        });
      },
    });

    return () => {
      trigger.kill();
    };
  }, [reducedMotion, splitBy, stagger, duration, y, delay]);

  return (
    <Tag
      ref={ref as unknown as Ref<HTMLHeadingElement>}
      className={className}
      style={style}
    >
      {children}
    </Tag>
  );
}
