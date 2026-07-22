"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Star,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Quote,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";

/* ─── Types ─────────────────────────────────────────────────────── */

interface TestimonialDoc {
  id: string;
  authorName: string;
  authorTitle?: string;
  authorCompany?: string;
  quote: string | { root: { type: string; children: unknown[] } };
  rating?: number;
  avatar?: { url?: string; alt?: string };
}

interface CustomerReviewsProps {
  badge?: string;
  heading?: string;
  subtext?: string;
  testimonials?: TestimonialDoc[];
}

interface TestimonialSpec {
  id: string;
  name: string;
  role: string;
  company: string;
  location?: string;
  quote: string;
  rating: number;
}

/* ─── Fallback testimonials ─────────────────────────────────────── */

const FALLBACK_TESTIMONIALS: TestimonialSpec[] = [
  {
    id: "t1",
    name: "Sarah Thomas",
    role: "Procurement Head",
    company: "Gulf Data Systems",
    location: "Abu Dhabi",
    quote:
      "We rely on Simal Technologies for our IT infrastructure needs. The quality of their products, timely deliveries, and after-sales support are outstanding. They are a trusted partner for our business.",
    rating: 5,
  },
  {
    id: "t2",
    name: "Ahmed Faisal",
    role: "System Integrator",
    company: "SecureNet Solutions",
    location: "Qatar",
    quote:
      "Simal Technologies stands out for its commitment to providing top-tier IT security solutions. Their distribution network is extensive, ensuring timely deliveries across the Middle East.",
    rating: 4.5,
  },
  {
    id: "t3",
    name: "Mohammed Raza",
    role: "IT Manager",
    company: "Al Noor Technologies",
    location: "Dubai",
    quote:
      "Simal Technologies has been our go-to distributor for high-performance memory modules and storage solutions. Their Crucial and Micron products have significantly improved our data processing speeds.",
    rating: 4,
  },
  {
    id: "t4",
    name: "Muhammad Jaseem",
    role: "Purchase Executive",
    company: "GRAND PCD Trading LLC",
    quote:
      "Your salesman HASSAN MUSHEER was well-behaved and very responsive. Your pricing is excellent. Your company efficiently manages deliveries, ensuring our orders are sent on time.",
    rating: 5,
  },
  {
    id: "t5",
    name: "Jasper Guevarra",
    role: "Technical Support Manager",
    company: "Mercans",
    quote:
      "We have been working with Simal Technologies for quite some time now, and our overall experience has been excellent. The quality of the IT products consistently meets our expectations.",
    rating: 5,
  },
  {
    id: "t6",
    name: "NADEEM",
    role: "Sales Manager",
    company: "MICROTRANS LLC",
    quote:
      "My overall experience with Simal Technologies was great! The product quality exceeded my expectations. I'd definitely recommend Simal Technologies for their exceptional service.",
    rating: 5,
  },
];

const AUTO_ROTATE_MS = 6000;

/* ─── Helpers ───────────────────────────────────────────────────── */

function quoteToText(
  quote: TestimonialDoc["quote"] | undefined,
): string | undefined {
  if (!quote) return undefined;
  if (typeof quote === "string") return quote;
  try {
    const visit = (node: unknown): string => {
      if (!node || typeof node !== "object") return "";
      const n = node as { type?: string; text?: string; children?: unknown[] };
      if (n.text) return String(n.text);
      if (Array.isArray(n.children)) return n.children.map(visit).join("");
      return "";
    };
    return visit((quote as { root: unknown }).root);
  } catch {
    return undefined;
  }
}

function toSpec(doc: TestimonialDoc, fallback: TestimonialSpec): TestimonialSpec {
  const text = quoteToText(doc.quote);
  const companyAndLoc = doc.authorCompany || "";
  return {
    id: doc.id || fallback.id,
    name: doc.authorName || fallback.name,
    role: doc.authorTitle || fallback.role,
    company: companyAndLoc || fallback.company,
    quote: text || fallback.quote,
    rating: typeof doc.rating === "number" ? doc.rating : fallback.rating,
  };
}

/* ─── Star row ──────────────────────────────────────────────────── */

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => {
        const filled = i + 1 <= Math.floor(rating);
        const half = !filled && i + 0.5 <= rating;
        return (
          <Star
            key={i}
            className="h-4 w-4 text-primary"
            fill={filled || half ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth={1.5}
            style={half ? { clipPath: "inset(0 50% 0 0)" } : undefined}
          />
        );
      })}
    </div>
  );
}

/* ─── Component ─────────────────────────────────────────────────── */

export default function CustomerReviews({
  badge = "Customer Testimonials",
  heading = "What Our Customers Say",
  subtext = "Trusted by enterprises across the Middle East & Africa for IT distribution excellence, product quality, and reliable after-sales support.",
  testimonials,
}: CustomerReviewsProps = {}) {
  const items =
    testimonials && testimonials.length > 0
      ? testimonials.map((t, i) =>
          toSpec(t, FALLBACK_TESTIMONIALS[i % FALLBACK_TESTIMONIALS.length]),
        )
      : FALLBACK_TESTIMONIALS;

  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const goTo = useCallback(
    (i: number) => setCurrent(((i % items.length) + items.length) % items.length),
    [items.length],
  );
  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  useEffect(() => {
    if (paused || items.length <= 1) return;
    const id = window.setInterval(next, AUTO_ROTATE_MS);
    return () => window.clearInterval(id);
  }, [paused, next, items.length]);

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
    <section
      id="customer-testimonials"
      className="relative overflow-hidden bg-background"
    >
      {/* Background image */}
      <Image
        src="/assets/images/homepage/newsletter-office.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
        priority={false}
      />
      {/* Light overlay */}
      <div className="pointer-events-none absolute inset-0 bg-background/90" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* ── Section identifier bar ──────────────────────────── */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b pb-4">
          <div className="flex items-center gap-4">
            <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Client Feedback
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
              {badge}
            </span>
          </div>
          {/* Slide counter */}
          <span className="text-xs tabular-nums text-muted-foreground">
            <span className="text-sm font-bold text-foreground">
              {String(current + 1).padStart(2, "0")}
            </span>
            <span className="text-border"> / </span>
            {String(items.length).padStart(2, "0")}
          </span>
        </div>

        {/* ── Heading ────────────────────────────────────────── */}
        <span className="mb-4 inline-block border-l-2 border-primary pl-3 text-xs font-bold uppercase tracking-widest text-primary">
          {badge}
        </span>

        <h2 className="max-w-2xl text-3xl font-extrabold leading-[1.1] tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          {heading}
        </h2>

        <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
          {subtext}
        </p>

        {/* ── Carousel viewport ──────────────────────────────── */}
        <div
          className="relative mt-10"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          role="region"
          aria-roledescription="carousel"
          aria-label="Customer testimonials"
        >
          {/* Slides */}
          <div className="grid">
            {items.map((t, i) => (
              <TestimonialCard key={t.id} spec={t} active={i === current} />
            ))}
          </div>

          {/* Prev / next arrows */}
          <div className="mt-6 flex items-center gap-1">
            <button
              type="button"
              onClick={prev}
              disabled={items.length <= 1}
              aria-label="Previous testimonial"
              className="flex h-8 w-8 items-center justify-center border border-border text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={next}
              disabled={items.length <= 1}
              aria-label="Next testimonial"
              className="flex h-8 w-8 items-center justify-center border border-border text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronRight className="h-4 w-4" />
            </button>

            {/* Dots */}
            <div className="ml-4 flex items-center gap-2">
              {items.map((t, i) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Go to testimonial ${i + 1}: ${t.name}`}
                  aria-current={i === current}
                  className={cn(
                    "h-0.5 transition-all",
                    i === current
                      ? "w-8 bg-foreground"
                      : "w-4 bg-muted-foreground/30 hover:bg-muted-foreground/50",
                  )}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ── Footer CTA ─────────────────────────────────────── */}
        <div className="mt-10 border-t pt-8">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Read All Reviews
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ─── Card ──────────────────────────────────────────────────────── */

function TestimonialCard({
  spec,
  active,
}: {
  spec: TestimonialSpec;
  active: boolean;
}) {
  return (
    <article
      aria-hidden={!active}
      className={cn(
        "col-start-1 row-start-1 border border-border bg-card p-8 transition-opacity duration-500 md:p-10",
        active ? "opacity-100" : "pointer-events-none opacity-0",
      )}
    >
      <div className="flex flex-col gap-0 lg:flex-row lg:gap-16">
        {/* Left: quote + stars */}
        <div className="flex-1">
          <Quote className="mb-4 h-6 w-6 text-primary/40" fill="currentColor" />

          <StarRow rating={spec.rating} />

          <blockquote className="mt-4 text-base leading-relaxed text-foreground">
            &ldquo;{spec.quote}&rdquo;
          </blockquote>
        </div>

        {/* Right: author */}
        <div className="mt-6 flex items-center gap-3 border-t pt-4 lg:mt-0 lg:w-56 lg:shrink-0 lg:flex-col lg:items-start lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
          <div className="flex h-10 w-10 items-center justify-center bg-primary text-primary-foreground">
            <User className="h-5 w-5" strokeWidth={1.6} />
          </div>
          <div>
            <div className="text-sm font-bold text-foreground">
              {spec.name}
            </div>
            <div className="text-xs text-muted-foreground">
              {spec.role}
              {spec.company ? `, ${spec.company}` : ""}
            </div>
            {spec.location && (
              <div className="text-xs text-muted-foreground/70">{spec.location}</div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
