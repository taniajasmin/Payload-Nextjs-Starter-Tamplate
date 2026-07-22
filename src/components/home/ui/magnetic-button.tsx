"use client";

import { type ReactNode, type Ref } from "react";
import { useMagneticHover } from "@/hooks/use-magnetic-hover";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  href?: string;
  strength?: number;
  type?: "button" | "submit";
  onClick?: () => void;
}

export function MagneticButton({
  children,
  className = "",
  href,
  strength = 0.25,
  type = "button",
  onClick,
}: MagneticButtonProps) {
  const { ref, style } = useMagneticHover({ strength });

  const combinedClassName = `inline-block will-change-transform ${className}`;

  if (href) {
    return (
      <a
        ref={ref as unknown as Ref<HTMLAnchorElement>}
        href={href}
        className={combinedClassName}
        style={style}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={ref as unknown as Ref<HTMLButtonElement>}
      type={type}
      className={combinedClassName}
      style={style}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
