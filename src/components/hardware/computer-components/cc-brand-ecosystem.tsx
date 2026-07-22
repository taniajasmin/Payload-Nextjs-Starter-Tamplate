"use client";

import { CircuitBoard } from "lucide-react";
import { mediaUrl } from "@/lib/media-url";
import { Reveal } from "@/components/home/ui/reveal";
import { StaggeredTextReveal } from "@/components/home/ui/staggered-text-reveal";
import { ECOSYSTEM_BRANDS } from "@/lib/computer-components-content";

/** Brands orbiting a central component node — hover to lift a brand chip. */
export function CcBrandEcosystem() {
  const n = ECOSYSTEM_BRANDS.length;

  return (
    <section className="relative overflow-hidden bg-muted">
      {/* soft radial wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_50%,rgba(40,111,180,0.08),transparent_70%)]"
      />
      <div className="container-primary relative py-20 md:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              One ecosystem
            </p>
          </Reveal>
          <StaggeredTextReveal
            as="h2"
            splitBy="word"
            className="mt-4 text-[clamp(2rem,5vw,3.5rem)] font-extrabold leading-[1.05] tracking-tight text-foreground"
          >
            Everything fits together
          </StaggeredTextReveal>
          <Reveal delay={0.15}>
            <p className="mx-auto mt-5 max-w-xl text-[length:var(--font-body)] leading-relaxed text-muted-foreground">
              Storage, memory, graphics and motherboards from the brands you trust —
              one authorized source for a complete build.
            </p>
          </Reveal>
        </div>

        {/* Radial orbit (md+) */}
        <div className="relative mx-auto mt-14 hidden aspect-square w-full max-w-[36rem] md:block">
          {/* concentric guides */}
          <div className="absolute inset-[18%] border border-border" />
          <div className="absolute inset-[6%] border border-border/70" />

          {/* center node */}
          <div className="absolute left-1/2 top-1/2 flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center bg-primary text-primary-foreground">
            <CircuitBoard className="h-9 w-9" />
            <span className="mt-1 text-[0.6rem] font-semibold uppercase tracking-widest">
              Build
            </span>
          </div>

          {/* orbiting brand chips */}
          {ECOSYSTEM_BRANDS.map((brand, i) => {
            const angle = (i / n) * Math.PI * 2 - Math.PI / 2; // start at top
            const radius = 40; // % of half the container
            const x = 50 + radius * Math.cos(angle);
            const y = 50 + radius * Math.sin(angle);
            return (
              <div
                key={brand.name}
                className="group absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${x}%`, top: `${y}%` }}
              >
                <div className="flex flex-col items-center">
                  <div className="flex h-20 w-20 items-center justify-center border border-border bg-card p-3 transition-colors duration-300 group-hover:border-primary/50">
                    {brand.logo ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={mediaUrl(brand.logo)}
                        alt={`${brand.name} logo`}
                        className="max-h-full max-w-full object-contain"
                      />
                    ) : (
                      <span className="text-xs font-bold text-foreground">
                        {brand.name}
                      </span>
                    )}
                  </div>
                  <span className="mt-2 text-xs font-semibold text-foreground">
                    {brand.name}
                  </span>
                  <span className="text-[0.65rem] text-muted-foreground">
                    {brand.tagline}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile grid fallback */}
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4 md:hidden">
          {ECOSYSTEM_BRANDS.map((brand) => (
            <div
              key={brand.name}
              className="flex flex-col items-center gap-2 border border-border bg-card p-4"
            >
              {brand.logo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={mediaUrl(brand.logo)}
                  alt={`${brand.name} logo`}
                  className="h-8 w-auto object-contain"
                />
              ) : (
                <span className="text-sm font-bold text-foreground">
                  {brand.name}
                </span>
              )}
              <span className="text-[0.65rem] text-muted-foreground">{brand.tagline}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
