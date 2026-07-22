"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useScrollPosition } from "@/hooks/use-scroll-position";

interface BackToTopProps {
  threshold?: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
}

export function BackToTop({
  threshold = 300,
  size = 56,
  strokeWidth = 3,
  className = "",
}: BackToTopProps) {
  const { scrollProgress, isScrolled } = useScrollPosition({ threshold });
  const [isPressed, setIsPressed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);

    const handler = (event: MediaQueryListEvent) =>
      setPrefersReducedMotion(event.matches);

    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const handleClick = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        handleClick();
      }
    },
    [handleClick]
  );

  // Progress ring calculations
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - scrollProgress);

  const transitionStyle = prefersReducedMotion
    ? undefined
    : {
        transition:
          "opacity 400ms cubic-bezier(0.4, 0, 0.2, 1), transform 400ms cubic-bezier(0.4, 0, 0.2, 1)",
      };

  const ringTransition = prefersReducedMotion
    ? undefined
    : {
        transition: "stroke-dashoffset 150ms linear",
      };

  const isVisible = isScrolled;

  return (
    <button
      type="button"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onPointerDown={() => setIsPressed(true)}
      onPointerUp={() => setIsPressed(false)}
      onPointerCancel={() => setIsPressed(false)}
      aria-label="Back to top"
      title="Back to top"
      className={`
        fixed z-50 cursor-pointer border border-border bg-background
        focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
        focus-visible:ring-primary
        ${className}
      `}
      style={{
        bottom: "max(1.5rem, env(safe-area-inset-bottom, 0px))",
        right: "max(1.5rem, env(safe-area-inset-right, 0px))",
        width: size,
        height: size,
        opacity: isVisible ? 1 : 0,
        transform: isVisible
          ? `translateY(0) scale(${isPressed ? 0.92 : isHovered ? 1.08 : 1})`
          : "translateY(12px) scale(0.9)",
        pointerEvents: isVisible ? "auto" : "none",
        ...transitionStyle,
      }}
    >
      {/* Progress ring */}
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="absolute inset-0 -rotate-90"
        aria-hidden="true"
      >
        {/* Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          className="stroke-border"
          strokeWidth={strokeWidth}
        />
        {/* Progress */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          className="stroke-primary"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          style={ringTransition}
        />
      </svg>

      {/* Icon */}
      <span className="absolute inset-0 flex items-center justify-center">
        <svg
          width={size * 0.4}
          height={size * 0.4}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-foreground"
          aria-hidden="true"
        >
          <polyline points="18 15 12 9 6 15" />
        </svg>
      </span>
    </button>
  );
}
