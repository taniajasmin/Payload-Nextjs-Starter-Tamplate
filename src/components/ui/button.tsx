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
      "bg-[#DF4C73] text-white hover:bg-[#D1A080] focus:ring-[#DF4C73]",
    secondary:
      "bg-[#E4C2C1] text-[#292936] hover:bg-[#D1A080] hover:text-white focus:ring-[#D1A080]",
    outline:
      "border-2 border-[#E4C2C1] text-[#292936] hover:bg-[#FEF2F2] hover:border-[#DF4C73] focus:ring-[#DF4C73]",
    ghost:
      "text-neutral-700 hover:bg-[#FEF2F2] focus:ring-[#D1A080]",
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
