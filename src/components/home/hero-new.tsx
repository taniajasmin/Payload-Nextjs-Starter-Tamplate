"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

/* ─── Types ─────────────────────────────────────────────────────── */

interface Slide {
  brand: string;
  brandLogo: string;
  eyebrow: string;
  headline: string;
  subhead: string;
  cta: { label: string; href: string };
  productImage?: string;
  productAlt: string;
  glow: string;
}

interface HeroProps {
  heroContent?: Record<string, unknown>;
  heroProducts?: unknown[];
  backgroundImage?: { url?: string; alt?: string };
}

/* ─── Slide data ────────────────────────────────────────────────── */

const SLIDES: Slide[] = [
  {
    brand: "Koorui",
    brandLogo:
      "/assets/images/brands/koorui/logo_2_Koorui_Logo_Untitled-design-34_1b8fa186b4.png",
    eyebrow: "Official Distributor · UAE",
    headline: "Stunning Visuals, Smooth Performance",
    subhead:
      "KOORUI Gaming & Professional Monitors — built for play and productivity.",
    cta: {
      label: "Browse Monitors",
      href: "/hardware/product-catalog?category=monitors",
    },
    productImage: "/assets/images/products/koorui/p47_Koorui-1_31e6af5b49.jpg",
    productAlt: "KOORUI curved gaming monitor lifestyle shot",
    glow: "bg-primary/20",
  },
  {
    brand: "Crucial",
    brandLogo: "/assets/images/brands/crucial/logo_5_Crucial_Crucial-Logo-01-01_bc0d83ee79.png",
    eyebrow: "Next-Gen Storage",
    headline: "Fuel Your System with Next-Gen Speed",
    subhead:
      "Crucial T500 PCIe Gen4 NVMe SSD — up to 7,400 MB/s sequential read.",
    cta: { label: "Explore Crucial Products", href: "/brands/crucial" },
    productImage:
      "/assets/images/products/crucial/p11_t705_HS___9_-removebg-preview_ca7129ea17.png",
    productAlt: "Crucial T500 PCIe Gen4 NVMe SSD with heatsink",
    glow: "bg-primary/20",
  },
  {
    brand: "TEAMGROUP",
    brandLogo:
      "/assets/images/brands/teamgroup/brand_11_teamgroup-Brand-Logo_5f2f19a0ac.png",
    eyebrow: "Next-Generation Memory",
    headline: "Experience Unmatched Speed",
    subhead:
      "TEAMGROUP ELITE PLUS DDR5 — built for demanding enterprise workloads.",
    cta: {
      label: "View Memory Products",
      href: "/hardware/product-catalog?category=computer-components",
    },
    productImage:
      "/assets/images/brands/teamgroup/brand_11_teamgroup-Brand-Logo_5f2f19a0ac.png",
    productAlt: "TEAMGROUP DDR5 memory modules",
    glow: "bg-primary/20",
  },
  {
    brand: "HIKVISION",
    brandLogo:
      "/assets/images/brands/hikvision/logo_7_HIKVISION_Hikvision-Logo-01_f6dca83b30.png",
    eyebrow: "Enterprise Storage",
    headline: "Enterprise Storage, Consumer Simplicity",
    subhead:
      "HIKVISION SSDs — high performance with advanced thermal dissipation.",
    cta: { label: "Shop HIKVISION", href: "/brands/hikvision" },
    productImage:
      "/assets/images/products/hikvision/p41_hs-essd-t100i-1_f97aaf7a7b.png",
    productAlt: "HIKVISION T100i external SSD",
    glow: "bg-primary/20",
  },
  {
    brand: "UGREEN",
    brandLogo: "/assets/images/brands/ugreen/ugreen.png",
    eyebrow: "Connectivity",
    headline: "Redefining Connectivity",
    subhead:
      "Sleek, versatile solutions for every device — hubs, docks, cables & more.",
    cta: { label: "Discover UGREEN", href: "/brands/ugreen" },
    productImage:
      "/assets/images/products/ugreen/p59_1961e58c80e8a161bd59c85cec6855bf-md-removebg-preview_4658416207.png",
    productAlt: "UGREEN docking station and connectivity ecosystem",
    glow: "bg-primary/20",
  },
  {
    brand: "Aiwa",
    brandLogo: "/assets/images/brands/aiwa/brand_2_Aiwa-Brand-Logo_d8bedf47c4.png",
    eyebrow: "Displays",
    headline: "Clarity, Performance, Brilliance",
    subhead: "Bringing every frame to life with Aiwa flat & slim monitors.",
    cta: { label: "View Aiwa Products", href: "/brands/aiwa" },
    productImage: "/assets/images/products/aiwa/p1_61WxuoRSVJL_fcb88eaf67.png",
    productAlt: "Aiwa flat slim monitor",
    glow: "bg-primary/20",
  },
  {
    brand: "Nearity",
    brandLogo:
      "/assets/images/brands/nearity/logo_14_Nearity_channels4_profile_75811eaaab.jpg",
    eyebrow: "AV & Meeting Room",
    headline: "Transform Your Meetings",
    subhead:
      "Nearity all-in-one conference room solutions — designed for business.",
    cta: {
      label: "Explore AV Solutions",
      href: "/solutions/av-meeting-room",
    },
    productImage: "/assets/images/products/nearity/p52_C30R_1-1_54401d16a5.png",
    productAlt: "Nearity C30R all-in-one meeting room device",
    glow: "bg-primary/20",
  },
];

const AUTO_ROTATE_MS = 5000;

/* ─── Slide view ────────────────────────────────────────────────── */

function SlideView({ slide, active }: { slide: Slide; active: boolean }) {
  return (
    <div
      aria-hidden={!active}
      className={`col-start-1 row-start-1 grid grid-cols-1 items-stretch transition-opacity duration-500 lg:grid-cols-2 ${
        active ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      {/* Text column */}
      <div className="flex flex-col justify-center px-6 py-10 sm:px-10 md:px-12 lg:px-16 lg:py-20">
        <div className="mb-6 flex items-center gap-3">
          <div className="relative h-[3.15rem] w-[10.8rem] shrink-0">
            <Image
              src={slide.brandLogo}
              alt={`${slide.brand} logo`}
              fill
              sizes="120px"
              className="object-contain object-left"
            />
          </div>
          <span className="h-4 w-px bg-border" />
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">
            {slide.eyebrow}
          </span>
        </div>

        <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          {slide.headline}
        </h2>

        <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base lg:text-lg">
          {slide.subhead}
        </p>

        <div className="mt-8">
          <a
            href={slide.cta.href}
            tabIndex={active ? 0 : -1}
            className="inline-flex items-center gap-2 bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
          >
            {slide.cta.label}
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>

      {/* Image column */}
      <div className="relative flex min-h-[280px] items-center justify-center overflow-hidden bg-muted px-6 py-10 lg:min-h-[420px] lg:px-12 lg:py-16">
        <div
          className={`pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 blur-3xl lg:h-96 lg:w-96 ${slide.glow}`}
        />
        {slide.productImage ? (
          <div className="relative aspect-square w-full max-w-md">
            <Image
              src={slide.productImage}
              alt={slide.productAlt}
              fill
              sizes="(min-width: 1024px) 40vw, 80vw"
              className="object-contain"
              priority={active && slide === SLIDES[0]}
              loading={slide === SLIDES[0] ? undefined : "lazy"}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}

/* ─── Component ─────────────────────────────────────────────────── */

export default function HeroNew(_: HeroProps) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const goTo = useCallback((index: number) => {
    setCurrent(((index % SLIDES.length) + SLIDES.length) % SLIDES.length);
  }, []);

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(next, AUTO_ROTATE_MS);
    return () => window.clearInterval(id);
  }, [paused, next]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0]?.clientX ?? null;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current == null) return;
    const endX = e.changedTouches[0]?.clientX ?? touchStartX.current;
    if (endX - touchStartX.current > 50) prev();
    else if (touchStartX.current - endX > 50) next();
    touchStartX.current = null;
  };

  return (
    <section className="relative overflow-hidden bg-muted py-12 md:py-16 lg:py-20">
      <Image
        src="/assets/images/homepage/tech.avif"
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-background/75" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="relative overflow-hidden border border-border bg-card"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          role="region"
          aria-roledescription="carousel"
          aria-label="Featured products and brands"
        >
          {/* Progress bar */}
          <div className="absolute inset-x-0 top-0 z-20 h-0.5 bg-muted">
            <div
              key={`progress-${current}-${paused}`}
              className="h-full bg-primary"
              style={
                paused
                  ? { width: "100%", transition: "width 0.3s ease" }
                  : {
                      width: "100%",
                      animation: `hero-progress ${AUTO_ROTATE_MS}ms linear forwards`,
                    }
              }
            />
          </div>

          {/* Arrows (desktop) */}
          <button
            type="button"
            onClick={prev}
            aria-label="Previous slide"
            className="absolute left-3 top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 items-center justify-center border border-border bg-card text-foreground transition hover:bg-muted md:flex"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next slide"
            className="absolute right-3 top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 items-center justify-center border border-border bg-card text-foreground transition hover:bg-muted md:flex"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Stacked slides */}
          <div className="grid">
            {SLIDES.map((s, i) => (
              <SlideView key={s.brand} slide={s} active={i === current} />
            ))}
          </div>

          {/* Dots */}
          <div className="absolute inset-x-0 bottom-4 z-20 flex items-center justify-center gap-2">
            {SLIDES.map((s, i) => (
              <button
                key={s.brand}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}: ${s.brand}`}
                aria-current={i === current}
                className={
                  i === current
                    ? "h-2 w-8 bg-primary transition-all"
                    : "h-2 w-2 bg-muted-foreground/40 transition-all hover:bg-muted-foreground/60"
                }
              />
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes hero-progress {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
}
