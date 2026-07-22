import React from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  className?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = "", ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-[length:var(--font-body)] font-medium text-black mb-1.5">{label}</label>
        )}
        <input
          ref={ref}
          className={cn(
            "w-full rounded-lg border px-4 py-2.5 text-[length:var(--font-body)] bg-white text-black placeholder:text-neutral-700 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-all duration-200",
            error ? "border-red-500" : "border-neutral-200",
            className
          )}
          {...props}
        />
        {error && <p className="mt-1 text-[length:var(--font-body)] text-red-500">{error}</p>}
      </div>
    );
  }
);
Input.displayName = "Input";
