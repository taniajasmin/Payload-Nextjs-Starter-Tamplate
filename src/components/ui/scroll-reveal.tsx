"use client";

import { motion, useInView, Variants } from "framer-motion";
import { useRef, ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  variant?: "fade-up" | "fade-in" | "scale-in" | "slide-right" | "slide-left";
  delay?: number;
  duration?: number;
  once?: boolean;
  amount?: number;
}

const variants: Record<string, Variants> = {
  "fade-up": {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  },
  "fade-in": {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  "scale-in": {
    hidden: { opacity: 0, scale: 0.92 },
    visible: { opacity: 1, scale: 1 },
  },
  "slide-right": {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  },
  "slide-left": {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
  },
};

export function ScrollReveal({
  children,
  className = "",
  variant = "fade-up",
  delay = 0,
  duration = 0.6,
  once = true,
  amount = 0.2,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants[variant]}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  once?: boolean;
  amount?: number;
}

export function StaggerContainer({
  children,
  className = "",
  staggerDelay = 0.1,
  once = true,
  amount = 0.15,
}: StaggerContainerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
  variant?: "fade-up" | "fade-in" | "scale-in" | "slide-right" | "slide-left";
}

export function StaggerItem({
  children,
  className = "",
  variant = "fade-up",
}: StaggerItemProps) {
  return (
    <motion.div variants={variants[variant]} className={className}>
      {children}
    </motion.div>
  );
}
