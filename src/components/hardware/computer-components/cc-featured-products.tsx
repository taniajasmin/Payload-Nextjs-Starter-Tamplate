"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { mediaUrl } from "@/lib/media-url";
import { RevealGroup, Reveal } from "@/components/home/ui/reveal";
import { StaggeredTextReveal } from "@/components/home/ui/staggered-text-reveal";
import type { Product } from "@/lib/product-config";

/** Curated slug priority so the same highlights surface when present. */
const FEATURED_SLUGS = [
  "crucial-t500-heatsink",
  "hs-ssd-future",
  "samsung-t7-shield-portable-ssd-1tb",
  "arktek-gt730-4gb-ddr3",
  "kingston-xs1000-1tb",
  "wd-sn7100",
];

/** Pick up to `limit` products, front-loading known highlights and brand variety. */
function pickFeatured(products: Product[], limit = 6): Product[] {
  if (!products.length) return [];
  const bySlug = new Map(products.map((p) => [p.slug, p]));
  const chosen: Product[] = [];
  const seen = new Set<string>();

  const add = (p?: Product) => {
    if (!p || seen.has(p.brand) || chosen.length >= limit) return;
    chosen.push(p);
    seen.add(p.brand);
  };

  // 1. Known highlight slugs (brand variety applied).
  for (const slug of FEATURED_SLUGS) add(bySlug.get(slug));
  // 2. Fill remaining from the rest.
  for (const p of products) add(p);
  return chosen.slice(0, limit);
}

interface CcFeaturedProductsProps {
  products: Product[];
}

/** A tight, premium row of 4–6 featured components (not a dense grid). */
export function CcFeaturedProducts({ products }: CcFeaturedProductsProps) {
  const featured = pickFeatured(products);
  if (!featured.length) return null;

  return (
    <section id="featured" className="scroll-mt-24 bg-background">
      <div className="container-primary py-20 md:py-28">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <Reveal>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                Featured Components
              </p>
            </Reveal>
            <StaggeredTextReveal
              as="h2"
              splitBy="word"
              className="mt-3 text-[clamp(2rem,5vw,3.25rem)] font-extrabold leading-[1.05] tracking-tight text-foreground"
            >
              Hand-picked highlights
            </StaggeredTextReveal>
          </div>
          <Reveal delay={0.1}>
            <Link
              href="/hardware/product-catalog"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary"
            >
              View all components
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>

        <RevealGroup
          className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          stagger={0.08}
        >
          {featured.map((product) => (
            <Reveal key={product.slug}>
              <Link
                href={`/products/${product.slug}`}
                className="group flex h-full flex-col border border-border bg-card p-5 transition-colors hover:border-primary/50"
              >
                {/* image stage */}
                <div className="relative mb-5 flex aspect-[4/3] items-center justify-center overflow-hidden bg-muted">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={mediaUrl(product.image)}
                    alt={product.name}
                    className="relative max-h-full max-w-[80%] object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                  {product.brand}
                </span>
                <h3 className="mt-1 line-clamp-2 text-base font-semibold text-foreground">
                  {product.name}
                </h3>

                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-foreground">
                  Learn more
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
