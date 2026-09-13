import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  href?: string;
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  href,
  children,
  className = "",
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center rounded-full px-6 py-3 text-[length:var(--font-button)] font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-ring",
    secondary:
      "bg-secondary text-secondary-foreground hover:bg-secondary/80 focus:ring-ring",
    outline:
      "border-2 border-border text-foreground hover:border-primary hover:text-primary focus:ring-ring",
    ghost:
      "text-foreground/80 hover:bg-muted hover:text-foreground focus:ring-ring",
  };

  const combined = cn(baseStyles, variants[variant], className);

  if (href) {
    return (
      <a href={href} className={combined}>
        {children}
      </a>
    );
  }

  return (
    <button className={combined} {...props}>
      {children}
    </button>
  );
}
