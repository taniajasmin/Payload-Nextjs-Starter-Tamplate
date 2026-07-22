import { createElement } from "react";
import { iconNameToComponent } from "@/components/layout/navigation-data";

export function resolveIcon(iconName?: string) {
  if (!iconName) return null;
  return iconNameToComponent[iconName] ?? null;
}

export function SectionCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`flex h-full flex-col border border-border bg-card p-8 ${className ?? ""}`}
    >
      {children}
    </div>
  );
}

export function IconBox({
  icon,
  tone = "default",
}: {
  icon?: string;
  tone?: "default" | "dark";
}) {
  const IconComp = resolveIcon(icon);
  if (!IconComp) return null;
  const bg = tone === "dark" ? "bg-white/10" : "bg-primary/10";
  const fg = tone === "dark" ? "text-primary" : "text-primary";
  return (
    <div
      className={`mb-4 inline-flex h-10 w-10 items-center justify-center ${bg}`}
    >
      {createElement(IconComp, { className: `h-5 w-5 ${fg}` })}
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  heading,
  description,
  tone = "default",
}: {
  eyebrow?: string;
  heading?: string;
  description?: string;
  tone?: "default" | "light";
}) {
  const textTone =
    tone === "light"
      ? {
          heading: "text-white",
          description: "text-slate-300",
          eyebrow: "text-slate-300",
        }
      : {
          heading: "text-foreground",
          description: "text-muted-foreground",
          eyebrow: "text-muted-foreground",
        };
  return (
    <>
      {eyebrow && (
        <span
          className={`mb-3 block border-l-2 border-primary pl-3 text-xs font-bold uppercase tracking-widest ${textTone.eyebrow}`}
        >
          {eyebrow}
        </span>
      )}
      {heading && (
        <h2
          className={`max-w-2xl text-3xl font-extrabold leading-[1.1] tracking-tight sm:text-4xl lg:text-5xl ${textTone.heading}`}
        >
          {heading}
        </h2>
      )}
      {description && (
        <p
          className={`mt-4 max-w-2xl text-sm leading-relaxed ${textTone.description}`}
        >
          {description}
        </p>
      )}
    </>
  );
}
