"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight, Package } from "lucide-react";
import { cn } from "@/lib/utils";
import { mediaUrl } from "@/lib/media-url";

/* ─── Types ─────────────────────────────────────────────────────── */

interface ProductData {
  id: string;
  slug: string;
  name: string;
  brand: string;
  description: string;
  image?: string;
}

interface CMSProduct {
  id: string;
  title?: string;
  slug?: string;
  brand?: { name?: string } | string;
  description?: string;
  image?: { url?: string; alt?: string };
  category?: { title?: string } | string;
}

/* ─── Fallback products ─────────────────────────────────────────── */

const FALLBACK_PRODUCTS: ProductData[] = [
  {
    id: "p1",
    slug: "crucial-t500-heatsink",
    name: "Crucial T500 Heatsink (CT1000T500SSD5)",
    brand: "Crucial",
    description: "Gen4 NVMe SSD, up to 7,400 MB/s read",
    image: "/assets/images/products/crucial/p12_t705_HS___8_-removebg-preview_952dbb7f6a.png",
  },
  {
    id: "p2",
    slug: "ugreen-revodok-pro-209",
    name: "UGREEN Revodok Pro 209 9-in-1 Docking Station",
    brand: "UGREEN",
    description: "Dual 4K, 100W PD, 10Gbps USB",
    image: "/assets/images/products/ugreen/p60_43eddcf96df2db841dbaa9efd3080665-md-removebg-preview_69609bf5d1.png",
  },
  {
    id: "p3",
    slug: "koorui-27-gaming-monitor",
    name: 'KOORUI 27" Gaming Monitor',
    brand: "KOORUI",
    description: "1920×1080, curved display",
    image: "/assets/images/products/koorui/p49_koorui-monitor-27-1_c76b66b2b8.jpg",
  },
  {
    id: "p4",
    slug: "hikvision-hs-ssd-future",
    name: "HIKVISION HS-SSD-FUTURE",
    brand: "HIKVISION",
    description: "PCIe 4.0 NVMe M.2, up to 7,450 MB/s",
    image: "/assets/images/products/hikvision/p43_39b3712ee52547d09bfe6c811467a10c-removebg-preview_fd2b4b48e3.png",
  },
  {
    id: "p5",
    slug: "arktek-rtx3060-led",
    name: "ARKTEK RTX3060 LED",
    brand: "ARKTEK",
    description: "12GB GDDR6, dual fan",
    image: "/assets/images/products/arktek/p53_RTX2060-6GB-1-1-removebg-preview_3eeead5252.png",
  },
  {
    id: "p6",
    slug: "honeywell-6-out-surge-protector",
    name: "Honeywell 6 Out Surge Protector",
    brand: "Honeywell",
    description: "1050 Joules, 2× PD20W USB",
    image: "/assets/images/products/honeywell/p28_fa9da819276a63e7276707bc7a8ee956-hi-removebg-preview-1_cbc12644b0.png",
  },
  {
    id: "p7",
    slug: "samsung-t7-shield-1tb",
    name: "Samsung T7 Shield Portable SSD 1TB",
    brand: "Samsung",
    description: "Rugged high-speed external storage",
    image: "/assets/images/products/samsung/p54_samsung-ssd_ea17010b74.jpg",
  },
  {
    id: "p8",
    slug: "dell-15-laptop",
    name: "Dell 15 Laptop",
    brand: "Dell",
    description: '14th Gen Intel Core 3, 15.6" FHD 120Hz',
    image: "/assets/images/products/dell/p25_pc-dell_860f4b76ac.jpg",
  },
  {
    id: "p9",
    slug: "nearity-c30r",
    name: "Nearity C30R",
    brand: "Nearity",
    description: "All-In-One Meeting Powerhouse",
    image: "/assets/images/products/nearity/p52_C30R_1-1_54401d16a5.png",
  },
  {
    id: "p10",
    slug: "teamgroup-ted34g1600c1101",
    name: "TEAMGROUP TED34G1600C1101",
    brand: "TEAMGROUP",
    description: "4GB DDR3 RAM",
    image: "/assets/images/brands/teamgroup/brand_11_teamgroup-Brand-Logo_5f2f19a0ac.png",
  },
  {
    id: "p11",
    slug: "aiwa-22-flat-slim-monitor",
    name: 'Aiwa 22" Flat Slim Monitor',
    brand: "Aiwa",
    description: "75Hz, FHD, HDMI/VGA",
    image: "/assets/images/products/aiwa/p3_daadd05412dd7f815eb7ecbef17fd6da-md-removebg-preview_6af3c4efe9.png",
  },
  {
    id: "p12",
    slug: "kingston-xs1000-1tb",
    name: "Kingston XS1000 1TB Portable SSD",
    brand: "Kingston",
    description: "Pocket-sized high-speed storage",
    image: "/assets/images/products/kingston/p46_kingston-ssd_4620e91639.jpg",
  },
];

/* ─── Component ─────────────────────────────────────────────────── */

export default function TopProductsNew({
  badge: badgeLabel,
  heading,
  subtext,
  products: cmsProducts,
}: {
  badge?: string;
  heading?: string;
  subtext?: string;
  products?: unknown[];
} = {}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const displayBadge = badgeLabel || "Top Products";
  const displayHeading = heading || "Top Products from Our Catalog";
  const displaySubtext =
    subtext ||
    "A curated selection of our most in-demand IT hardware — backed by authorized distribution, warranty, and dedicated account support.";

  const products: ProductData[] =
    cmsProducts && cmsProducts.length > 0
      ? (cmsProducts as CMSProduct[]).map((p, i) => {
          const fallback = FALLBACK_PRODUCTS[i % FALLBACK_PRODUCTS.length];
          const brandName = typeof p.brand === "object" ? p.brand?.name : p.brand;
          return {
            id: p.id || `cms-p-${i}`,
            slug: p.slug || fallback.slug,
            name: p.title || fallback.name,
            brand: brandName || fallback.brand,
            description: p.description || fallback.description,
            image: p.image?.url || fallback.image,
          };
        })
      : FALLBACK_PRODUCTS;

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 8);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  }, []);

  useEffect(() => {
    updateScrollState();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateScrollState, { passive: true });
    const ro = new ResizeObserver(updateScrollState);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      ro.disconnect();
    };
  }, [updateScrollState]);

  const scrollByStep = (dir: 1 | -1) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({
      left: dir * Math.max(el.clientWidth * 0.8, 280),
      behavior: "smooth",
    });
  };

  return (
    <section id="top-products" className="relative overflow-hidden bg-muted">
      {/* Subtle top-to-bottom fade */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background via-transparent to-muted" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* ── Section identifier bar ──────────────────────────── */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b pb-4">
          <div className="flex items-center gap-4">
            <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Featured Products
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
              {displayBadge}
            </span>
          </div>
          {/* Nav arrows */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => scrollByStep(-1)}
              disabled={!canPrev}
              aria-label="Previous products"
              className="flex h-8 w-8 items-center justify-center border border-border text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollByStep(1)}
              disabled={!canNext}
              aria-label="Next products"
              className="flex h-8 w-8 items-center justify-center border border-border text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* ── Heading ────────────────────────────────────────── */}
        <span className="mb-4 inline-block border-l-2 border-primary pl-3 text-xs font-bold uppercase tracking-widest text-primary">
          {displayBadge}
        </span>

        <h2 className="max-w-2xl text-3xl font-extrabold leading-[1.1] tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          {displayHeading}
        </h2>

        <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
          {displaySubtext}
        </p>

        {/* ── Horizontal scroll carousel ─────────────────────── */}
        <div
          ref={scrollRef}
          className="mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {products.map((product) => {
            const imgUrl = product.image ? mediaUrl(product.image) : null;
            return (
              <article
                key={product.id}
                className="group flex w-[260px] shrink-0 snap-start flex-col border border-border bg-card sm:w-[300px]"
              >
                {/* Image area */}
                <div className="relative aspect-square w-full border-b border-border bg-muted/50">
                  {imgUrl ? (
                    <Image
                      src={imgUrl}
                      alt={product.name}
                      fill
                      sizes="300px"
                      className="object-contain p-6"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <Package className="h-16 w-16 text-muted-foreground/40" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-5">
                  <div className="text-xs font-bold uppercase tracking-wider text-primary">
                    {product.brand}
                  </div>
                  <h3 className="mt-1 line-clamp-2 text-sm font-bold leading-snug text-foreground">
                    {product.name}
                  </h3>
                  <p className="mt-2 line-clamp-1 text-xs text-muted-foreground">
                    {product.description}
                  </p>

                  <div className="mt-auto pt-3">
                    <Link
                      href={`/products/${product.slug}`}
                      className="inline-flex w-full items-center justify-center gap-1.5 border border-border px-4 py-2 text-xs font-semibold text-foreground transition-colors hover:bg-primary hover:text-primary-foreground hover:border-primary"
                    >
                      Details
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* ── Footer CTA ─────────────────────────────────────── */}
        <div className="mt-10 border-t pt-8">
          <Link
            href="/hardware/product-catalog"
            className="inline-flex items-center gap-2 bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            View All 76+ Products
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
