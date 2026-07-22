"use client";

import { useMemo, useState, useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight,
  Package,
  Cpu,
  Cable,
  Monitor,
  Gamepad2,
  Laptop,
  ArrowUpRight,
} from "lucide-react";
import { CATEGORY_MAP, HIDDEN_SPEC_KEYS, type Product, productShortDescription } from "@/lib/product-config";
import {
  resolveProductImage,
  hasTransparentImage,
  isImageOpaque,
} from "@/lib/product-image";

// ─── Static content ───────────────────────────────────────────────────────────

const CATEGORY_ORDER = [
  "computer-components",
  "computer-accessories",
  "monitors",
  "gaming",
  "laptops",
];

const CATEGORY_ICONS: Record<string, typeof Cpu> = {
  "computer-components": Cpu,
  "computer-accessories": Cable,
  monitors: Monitor,
  gaming: Gamepad2,
  laptops: Laptop,
};

const CREDENTIAL_BADGES = [
  "Authorized Distributor",
  "Full Manufacturer Warranty",
  "76+ Products",
];

const BANNER_BADGES = ["Popular", "Featured", "New Arrival", "Best Seller", "Premium"];
const GRID_BADGES = ["New", "Premium", "Best Seller", "Popular", "Trending"];

const MAX_GRID_PER_CATEGORY = 5;

// ─── Helpers ──────────────────────────────────────────────────────────────────

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
}

function titleCase(s: string): string {
  return s.replace(/\b\w/g, (c) => c.toUpperCase());
}

function specLabels(product: Product, max = 7): string {
  const keys = Object.keys(product.attributes ?? {})
    .filter((k) => !HIDDEN_SPEC_KEYS.has(k.toLowerCase()))
    .slice(0, max);
  return keys.map(titleCase).join(" · ");
}

// ─── Scroll reveal wrapper ────────────────────────────────────────────────────

function ScrollReveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Section label ────────────────────────────────────────────────────────────

function SectionLabel({
  children,
  tone = "light",
}: {
  children: React.ReactNode;
  tone?: "light" | "dark";
}) {
  return (
    <span
      className={`mb-4 inline-block border-l-2 pl-3 text-xs font-bold uppercase tracking-widest ${
        tone === "light"
          ? "border-white/40 text-white/80"
          : "border-primary text-primary"
      }`}
    >
      {children}
    </span>
  );
}

// ─── Badge pill ───────────────────────────────────────────────────────────────

function BadgePill({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center bg-primary px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider text-primary-foreground">
      {label}
    </span>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero({
  headline,
  sub,
  heroProduct,
  totalProducts,
}: {
  headline: string;
  sub: string;
  heroProduct?: Product;
  totalProducts: number;
}) {
  const labels = heroProduct ? specLabels(heroProduct) : "";

  return (
    <section className="relative overflow-hidden bg-background">
      <div className="container-primary relative">
        <div className="grid grid-cols-1 items-center gap-8 py-10 md:py-14 lg:grid-cols-2 lg:gap-12">
          {/* Left — copy */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <SectionLabel tone="dark">Product Catalog</SectionLabel>

            <h1 className="mt-5 text-[clamp(30px,5vw,54px)] font-extrabold leading-[1.05] tracking-tight text-foreground">
              {headline}
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-lg">
              {sub}
            </p>

            {/* Credential badges */}
            <div className="mt-5 flex flex-wrap gap-2.5">
              {CREDENTIAL_BADGES.map((label) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-1.5 border border-primary/20 bg-primary/5 px-3.5 py-1.5 text-xs font-semibold text-primary"
                >
                  <span className="h-1.5 w-1.5 bg-primary" />
                  {label}
                </span>
              ))}
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <Link
                href="#catalog"
                className="group inline-flex items-center gap-2.5 bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 hover:gap-3"
              >
                Explore Products
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="#bulk"
                className="inline-flex items-center gap-2.5 border border-border bg-card px-7 py-3.5 text-sm font-semibold text-foreground transition-colors hover:bg-primary hover:text-primary-foreground hover:border-primary"
              >
                Request Bulk Pricing
              </Link>
            </div>
          </motion.div>

          {/* Right — hero featured product card */}
          {heroProduct && (
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="relative mx-auto w-full max-w-sm"
            >
              <div className="relative isolate overflow-hidden border border-border bg-card p-6">
                {/* Accent bar */}
                <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-primary" />
                <div className="flex items-center justify-between">
                  <BadgePill label={BANNER_BADGES[0]} />
                  <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                    {heroProduct.brand}
                  </span>
                </div>

                <div className="relative mt-4 flex h-40 items-center justify-center sm:h-48">
                  {resolveProductImage(heroProduct) ? (
                    <motion.img
                      src={resolveProductImage(heroProduct)}
                      alt={heroProduct.name}
                      className={`max-h-32 w-auto max-w-[80%] object-contain sm:max-h-40 ${isImageOpaque(heroProduct) ? "mix-blend-multiply" : ""}`}
                      animate={{ y: [0, -8, 0] }}
                      transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                    />
                  ) : (
                    <Package className="h-14 w-14 text-muted-foreground/30" />
                  )}
                </div>

                <h3 className="mt-5 text-base font-extrabold leading-tight text-foreground">
                  {heroProduct.name}
                </h3>
                {labels && (
                  <p className="mt-1.5 line-clamp-1 text-sm text-muted-foreground">
                    {labels}
                  </p>
                )}

                <div className="mt-5 flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {totalProducts}+ products in stock
                  </span>
                  <Link
                    href={`/products/${heroProduct.slug}`}
                    className="inline-flex items-center gap-1.5 bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                  >
                    Explore
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}

// ─── Sticky category tab bar ──────────────────────────────────────────────────

function CategoryTabs({
  categories,
  totalProducts,
  active,
  onChange,
}: {
  categories: { slug: string; label: string; count: number }[];
  totalProducts: number;
  active: string;
  onChange: (slug: string) => void;
}) {
  const tabs = [
    { slug: "all", label: "All Products", count: totalProducts },
    ...categories,
  ];

  return (
    <div className="sticky top-0 z-40 border-b border-border bg-background">
      <div className="container-primary">
        <div className="flex items-center gap-2 py-3">
          <span className="hidden shrink-0 pr-1 text-xs font-bold uppercase tracking-wider text-muted-foreground sm:inline">
            Browse
          </span>
          <div className="flex gap-1.5 overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => {
              const isActive = active === tab.slug;
              return (
                <button
                  key={tab.slug}
                  type="button"
                  onClick={() => onChange(tab.slug)}
                  aria-pressed={isActive}
                  className={`shrink-0 inline-flex items-center gap-1.5 px-3.5 py-2 text-sm font-semibold whitespace-nowrap transition-colors ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  {tab.label}
                  <span
                    className={`px-1.5 py-px text-xs font-bold ${
                      isActive ? "bg-primary-foreground/20 text-primary-foreground" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Grid product card ────────────────────────────────────────────────────────

function ProductCard({ product, badge }: { product: Product; badge?: string }) {
  const description = productShortDescription(product);

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex flex-col border border-border bg-card transition-colors hover:border-primary/50"
    >
      <div className="relative isolate flex h-40 items-center justify-center bg-muted">
        {badge && (
          <span className="absolute left-3 top-3 z-10">
            <BadgePill label={badge} />
          </span>
        )}
        {resolveProductImage(product) ? (
          <img
            src={resolveProductImage(product)}
            alt={product.name}
            loading="lazy"
            className={`relative h-full w-full p-4 object-contain transition-transform duration-500 group-hover:scale-105 ${isImageOpaque(product) ? "mix-blend-multiply" : ""}`}
          />
        ) : (
          <Package className="h-12 w-12 text-muted-foreground/30" />
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <span className="min-h-[1.1em] text-xs font-bold uppercase tracking-wider text-primary">
          {product.brand}
        </span>
        <h3 className="mt-1 line-clamp-2 min-h-[2.6em] text-sm font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">
          {product.name}
        </h3>
        <p className="mt-1.5 line-clamp-2 min-h-[3.2em] text-xs text-muted-foreground">
          {description}
        </p>
      </div>
    </Link>
  );
}

// ─── Left banner card ─────────────────────────────────────────────────────────

function CategoryBanner({
  slug,
  label,
  product,
  badge,
}: {
  slug: string;
  label: string;
  product: Product;
  badge: string;
}) {
  const labels = specLabels(product);

  return (
    <div className="relative flex h-full flex-col bg-slate-950 p-6 text-white sm:p-7">
      {/* Overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-950/85 via-slate-950/70 to-primary/25" />

      <div className="relative flex items-center justify-between">
        <BadgePill label={badge} />
        <span className="text-xs font-semibold uppercase tracking-wider text-white/70">
          {label}
        </span>
      </div>

      <div className="relative mt-5 flex flex-1 items-center justify-center">
        {resolveProductImage(product) ? (
          hasTransparentImage(product) ? (
            <motion.img
              src={resolveProductImage(product)}
              alt={product.name}
              className="max-h-44 w-auto max-w-[85%] object-contain sm:max-h-52"
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            />
          ) : (
            <div className="flex h-40 w-full max-w-[80%] items-center justify-center bg-white p-3 isolate sm:h-48">
              <motion.img
                src={resolveProductImage(product)}
                alt={product.name}
                className="max-h-28 w-auto max-w-full object-contain mix-blend-multiply sm:max-h-36"
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              />
            </div>
          )
        ) : (
          (() => {
            const Icon = CATEGORY_ICONS[slug] ?? Package;
            return <Icon className="h-14 w-14 text-white/40" />;
          })()
        )}
      </div>

      <h3 className="relative mt-5 text-base font-extrabold leading-tight text-white">
        {product.name}
      </h3>
      {labels && (
        <p className="relative mt-1.5 line-clamp-2 text-xs text-white/70">
          {labels}
        </p>
      )}

      <Link
        href={`/hardware/${slug}`}
        className="relative mt-5 inline-flex w-fit items-center gap-2 bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 hover:gap-3"
      >
        Explore
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}

// ─── Category section ─────────────────────────────────────────────────────────

function CategorySection({
  slug,
  label,
  count,
  products,
  catIndex,
}: {
  slug: string;
  label: string;
  count: number;
  products: Product[];
  catIndex: number;
}) {
  const featured =
    products.find((p) => hasTransparentImage(p)) ||
    products.find((p) => resolveProductImage(p)) ||
    products[0];
  const rest = products
    .filter((p) => p.slug !== featured?.slug)
    .slice(0, MAX_GRID_PER_CATEGORY);

  if (!featured) return null;

  return (
    <section id={slug} className="scroll-mt-24">
      <div className="container-primary py-12 md:py-16">
        {/* Header */}
        <ScrollReveal>
          <div className="mb-7 flex items-end justify-between gap-4">
            <div className="flex items-baseline gap-3">
              <h2 className="text-[clamp(24px,3.5vw,38px)] font-extrabold tracking-tight text-foreground">
                {label}
              </h2>
              <span className="text-sm font-bold text-muted-foreground">
                · {count}
              </span>
            </div>
            <Link
              href={`/hardware/${slug}`}
              className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
            >
              View all
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </ScrollReveal>

        {/* Left banner + right grid */}
        <div className="flex flex-col gap-5 lg:flex-row">
          <ScrollReveal className="w-full lg:w-[34%] lg:shrink-0" delay={0.05}>
            <CategoryBanner
              slug={slug}
              label={label}
              product={featured}
              badge={BANNER_BADGES[catIndex % BANNER_BADGES.length]}
            />
          </ScrollReveal>

          <div className="grid flex-1 grid-cols-2 gap-4 sm:gap-5 xl:grid-cols-3">
            {rest.map((product, i) => (
              <ScrollReveal key={product.slug} delay={0.05 + i * 0.05}>
                <ProductCard
                  product={product}
                  badge={GRID_BADGES[i % GRID_BADGES.length]}
                />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Bulk / enterprise CTA ────────────────────────────────────────────────────

function BulkCTA() {
  return (
    <section id="bulk" className="scroll-mt-24 bg-background">
      <div className="container-primary py-16 md:py-20">
        <ScrollReveal>
          <div className="relative overflow-hidden bg-slate-950 px-6 py-12 text-center text-white sm:px-12 md:py-14">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-950/85 via-slate-950/70 to-primary/25" />
            <div className="relative">
              <h2 className="text-[clamp(26px,4vw,42px)] font-extrabold tracking-tight text-white">
                Looking for bulk or enterprise orders?
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-white/70 md:text-lg">
                Wholesale, trade, and OEM-grade volume pricing for businesses —
                with a customized quotation within 24 hours.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2.5 bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 hover:gap-3"
                >
                  Contact Sales
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2.5 border border-white/30 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                >
                  Submit an RFQ
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

// ─── Main products category page ──────────────────────────────────────────────

interface ProductsCategoryClientProps {
  initialData: Record<string, unknown>;
  products: Product[];
}

export function ProductsCategoryClient({
  initialData,
  products,
}: ProductsCategoryClientProps) {
  const [active, setActive] = useState<string>("all");

  const hero = initialData.hero as
    | { headline?: string; subHeadline?: string }
    | undefined;
  const heroHeadline = hero?.headline || "Our Product Lineup";
  const heroSub =
    stripHtml(hero?.subHeadline || "") ||
    "Discover our complete range of authentic IT hardware — components, accessories, monitors, gaming gear, and laptops from authorized brands, sourced directly with full warranty.";

  const categories = useMemo(() => {
    const present = new Set(products.map((p) => p.categorySlug));
    return CATEGORY_ORDER.filter((slug) => present.has(slug)).map((slug) => ({
      slug,
      label: CATEGORY_MAP[slug] || slug,
      count: products.filter((p) => p.categorySlug === slug).length,
      items: products.filter((p) => p.categorySlug === slug),
    }));
  }, [products]);

  const heroProduct = useMemo(
    () =>
      products.find(
        (p) =>
          hasTransparentImage(p) &&
          p.attributes &&
          Object.keys(p.attributes).length > 0,
      ) ||
      products.find((p) => hasTransparentImage(p)) ||
      products.find((p) => resolveProductImage(p)) ||
      products[0],
    [products],
  );

  const visibleCategories = useMemo(
    () => (active === "all" ? categories : categories.filter((c) => c.slug === active)),
    [categories, active],
  );

  return (
    <div className="flex flex-col bg-background">
      <Hero
        headline={heroHeadline}
        sub={heroSub}
        heroProduct={heroProduct}
        totalProducts={products.length}
      />

      <CategoryTabs
        categories={categories.map(({ slug, label, count }) => ({ slug, label, count }))}
        totalProducts={products.length}
        active={active}
        onChange={setActive}
      />

      <div id="catalog" className="scroll-mt-20">
        {visibleCategories.length === 0 ? (
          <div className="container-primary py-24 text-center">
            <Package className="mx-auto h-12 w-12 text-muted-foreground/30" />
            <h2 className="mt-4 text-lg font-extrabold text-foreground">
              No products available
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              The product catalog is being updated. Please check back shortly.
            </p>
          </div>
        ) : (
          visibleCategories.map((category, i) => (
            <div key={category.slug} className={i % 2 === 1 ? "bg-muted" : "bg-background"}>
              <CategorySection
                slug={category.slug}
                label={category.label}
                count={category.count}
                products={category.items}
                catIndex={i}
              />
            </div>
          ))
        )}
      </div>

      <BulkCTA />
    </div>
  );
}
