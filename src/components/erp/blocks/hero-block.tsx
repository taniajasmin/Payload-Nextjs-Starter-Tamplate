"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface HeroBlockData {
  backgroundImage?: { url?: string; alt?: string } | null;
  headline?: string;
  subHeadline?: string;
  ctaLabel?: string;
  ctaLink?: string;
}

export function HeroBlock({ data }: { data: HeroBlockData }) {
  const bgImage =
    data.backgroundImage?.url ||
    "/assets/images/homepage/business-pillars.avif";

  return (
    <section className="relative overflow-hidden bg-slate-950 py-28 md:py-36">
      <Image
        src={bgImage}
        alt={data.backgroundImage?.alt ?? ""}
        fill
        sizes="100vw"
        className="object-cover"
        priority
      />
      <div className="pointer-events-none absolute inset-0 bg-slate-950/80" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          {data.headline && (
            <h1 className="text-3xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-4xl lg:text-5xl">
              {data.headline}
            </h1>
          )}
          {data.subHeadline && (
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-slate-300">
              {data.subHeadline}
            </p>
          )}
          {data.ctaLabel && data.ctaLink && (
            <Link
              href={data.ctaLink}
              className="mt-8 inline-flex items-center gap-2 bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              {data.ctaLabel}
              <ArrowRight className="h-4 w-4" />
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
