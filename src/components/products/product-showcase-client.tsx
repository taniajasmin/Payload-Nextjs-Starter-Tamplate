"use client";

import { useMemo, useRef } from "react";
import Link from "next/link";
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
} from "framer-motion";
import type { MotionValue } from "framer-motion";
import {
  ArrowRight,
  ShieldCheck,
  Truck,
  Headphones,
  Package,
  Cpu,
  Cable,
  Monitor,
  Gamepad2,
  Laptop,
  Check,
} from "lucide-react";
import { mediaUrl } from "@/lib/media-url";
import { CATEGORY_MAP, BRAND_LOGOS, type Product } from "@/lib/product-config";
import { ProductSpecs } from "@/components/products/product-specs";
import { HardwareSubNav } from "@/components/hardware/hardware-sub-nav";

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

const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  "computer-components":
    "High-performance processors, memory, storage, and graphics for demanding workloads.",
  "computer-accessories":
    "Essential peripherals, cables, adapters, and connectivity solutions.",
  monitors: "Crystal-clear displays from HD to 4K for work and entertainment.",
  gaming: "RGB-lit rigs, mechanical keyboards, precision mice, and immersive audio.",
  laptops: "Portable power — ultrabooks, workstations, and gaming notebooks.",
};

const TRUST_BADGES = [
  { icon: ShieldCheck, label: "100% Genuine" },
  { icon: Truck, label: "Secure Delivery" },
  { icon: Headphones, label: "Expert Support" },
];

const HIGHLIGHTS = [
  "High performance Products",
  "Wide Range of Accessories",
  "Trusted Brand Selection",
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
}

function truncate(str: string, max: number): string {
  if (str.length <= max) return str;
  return str.slice(0, str.lastIndexOf(" ", max)) + "…";
}

// ─── Scroll reveal wrapper ────────────────────────────────────────────────────

function ScrollReveal({
  children,
  className,
  delay = 0,
  direction = "up",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "right" | "left";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const y = direction === "up" ? 48 : 0;
  const x = direction === "right" ? -48 : direction === "left" ? 48 : 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y, x }}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Breadcrumb ───────────────────────────────────────────────────────────────

function Breadcrumb() {
  return (
    <div className="border-b border-border bg-background">
      <div className="container-primary">
        <nav aria-label="Breadcrumb" className="py-2.5">
          <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
            <li>
              <Link href="/" className="transition-colors hover:text-primary">
                Home
              </Link>
            </li>
            <li aria-hidden>›</li>
            <li>
              <Link
                href="/hardware/product-catalog"
                className="transition-colors hover:text-primary"
              >
                Hardware
              </Link>
            </li>
            <li aria-hidden>›</li>
            <li className="font-medium text-foreground">Products</li>
          </ol>
        </nav>
      </div>
    </div>
  );
}

// ─── Section label ────────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="mb-4 inline-block border-l-2 border-primary pl-3 text-xs font-bold uppercase tracking-widest text-primary">
      {children}
    </span>
  );
}

// ─── Composition image ────────────────────────────────────────────────────────

interface CompositionImageProps {
  product: Product;
  position: { top: string; left: string; scale: number; rotate: number; z: number; factor: number };
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  index: number;
}

function CompositionImage({ product, position, mouseX, mouseY, index }: CompositionImageProps) {
  const px = useTransform(mouseX, [0, 1], [-position.factor * 20, position.factor * 20]);
  const py = useTransform(mouseY, [0, 1], [-position.factor * 20, position.factor * 20]);

  return (
    <motion.div
      className="absolute flex flex-col items-center"
      style={{
        top: position.top,
        left: position.left,
        zIndex: position.z,
        x: px,
        y: py,
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: position.scale }}
      transition={{
        delay: 0.3 + index * 0.12,
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {product.image ? (
        <motion.img
          src={mediaUrl(product.image)}
          alt={product.name}
          className="max-h-[140px] w-auto max-w-[180px] object-contain sm:max-h-[180px] sm:max-w-[220px]"
          style={{ rotate: position.rotate }}
          animate={{ y: [0, -8, 0] }}
          transition={{
            y: {
              repeat: Infinity,
              duration: 3.5 + index * 0.5,
              ease: "easeInOut",
              delay: index * 0.3,
            },
          }}
        />
      ) : (
        <div
          className="flex h-[120px] w-[160px] items-center justify-center bg-muted"
          style={{ rotate: `${position.rotate}deg` }}
        >
          <Package className="h-10 w-10 text-muted-foreground/30" />
        </div>
      )}
    </motion.div>
  );
}

// ─── Hero Section ─────────────────────────────────────────────────────────────

function PremiumHero({
  headline,
  sub,
  heroProducts,
}: {
  headline: string;
  sub: string;
  heroProducts: Product[];
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const compositionProducts = heroProducts.slice(0, 5);

  const positions = [
    { top: "5%", left: "25%", scale: 1.05, rotate: -1.5, z: 30, factor: 1.5 },
    { top: "28%", left: "8%", scale: 0.78, rotate: -3, z: 20, factor: 1.2 },
    { top: "45%", left: "45%", scale: 0.88, rotate: 2.5, z: 25, factor: 1.0 },
    { top: "52%", left: "15%", scale: 0.65, rotate: -4, z: 15, factor: 0.8 },
    { top: "18%", left: "55%", scale: 0.72, rotate: 1.5, z: 10, factor: 0.6 },
  ];

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative overflow-hidden bg-background"
    >
      <div className="container-primary relative grid grid-cols-1 items-center gap-12 py-16 md:py-24 lg:grid-cols-2 lg:gap-16">
        {/* Left — Copy */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <SectionLabel>Product Catalog</SectionLabel>

          <h1 className="mt-6 text-[clamp(40px,6vw,72px)] font-extrabold leading-[1.05] tracking-tight text-foreground">
            {headline}
          </h1>

          <p className="mt-6 max-w-lg text-sm leading-relaxed text-muted-foreground md:text-lg">
            {truncate(sub, 180)}
          </p>

          {/* CTA */}
          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <Link
              href="#featured-categories"
              className="group inline-flex items-center gap-2.5 bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 hover:gap-3"
            >
              Explore Products
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </motion.div>

          {/* Feature bullets */}
          <motion.ul
            className="mt-10 flex flex-col gap-3"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.12, delayChildren: 0.5 } },
            }}
          >
            {HIGHLIGHTS.map((label) => (
              <motion.li
                key={label}
                variants={{
                  hidden: { opacity: 0, x: -16 },
                  visible: { opacity: 1, x: 0 },
                }}
                className="flex items-center gap-3"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center bg-primary text-primary-foreground">
                  <Check className="h-3.5 w-3.5" strokeWidth={3} />
                </span>
                <span className="text-sm font-semibold text-foreground">
                  {label}
                </span>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        {/* Right — Floating product composition */}
        <div className="relative flex h-[420px] items-center justify-center sm:h-[480px] lg:h-[560px]">
          {compositionProducts.map((product, i) => (
            <CompositionImage
              key={product.slug || i}
              product={product}
              position={positions[i] || positions[0]}
              mouseX={mouseX}
              mouseY={mouseY}
              index={i}
            />
          ))}

          {compositionProducts.length === 0 && (
            <div className="flex items-center justify-center bg-muted p-16">
              <Package className="h-16 w-16 text-muted-foreground/30" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// ─── Highlights Band ──────────────────────────────────────────────────────────

function HighlightsBand() {
  return (
    <section className="border-y border-border bg-background">
      <div className="container-primary py-10 md:py-12">
        <ScrollReveal>
          <div className="flex flex-col items-center gap-8 sm:flex-row sm:justify-center sm:gap-16">
            {TRUST_BADGES.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center bg-primary text-primary-foreground">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="text-sm font-semibold text-foreground">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

// ─── Featured Categories ──────────────────────────────────────────────────────

function FeaturedCategories({
  categories,
}: {
  categories: { slug: string; label: string; count: number; image?: string; description?: string }[];
}) {
  if (categories.length === 0) return null;

  return (
    <section id="featured-categories" className="scroll-mt-28 bg-background">
      <div className="container-primary py-20 md:py-28">
        <ScrollReveal>
          <div className="mx-auto max-w-2xl text-center">
            <SectionLabel>Categories</SectionLabel>
            <h2 className="mt-5 text-[clamp(32px,5vw,56px)] font-extrabold leading-[1.1] tracking-tight text-foreground">
              Find Your Perfect Setup
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-lg">
              Browse our curated categories — each one a gateway to world-class
              hardware from authorized brands.
            </p>
          </div>
        </ScrollReveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map(({ slug, label, count, image, description }, i) => {
            const Icon = CATEGORY_ICONS[slug] ?? Package;

            return (
              <motion.div
                key={slug}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  delay: i * 0.08,
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <Link
                  href={`/hardware/${slug}`}
                  className="group flex h-full flex-col border border-border bg-card p-8 transition-colors hover:border-primary/50 sm:p-10"
                >
                  {/* Image area */}
                  <div className="relative flex h-48 items-center justify-center sm:h-56">
                    {image ? (
                      <motion.img
                        src={mediaUrl(image)}
                        alt={label}
                        className="relative max-h-44 w-auto max-w-[85%] object-contain transition-all duration-500 group-hover:scale-110 sm:max-h-52"
                        animate={{ y: [0, -6, 0] }}
                        transition={{
                          repeat: Infinity,
                          duration: 4,
                          ease: "easeInOut",
                        }}
                      />
                    ) : (
                      <div className="relative flex h-32 w-32 items-center justify-center bg-muted">
                        <Icon className="h-12 w-12 text-muted-foreground/30" />
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="mt-6 flex flex-1 flex-col">
                    <h3 className="text-lg font-extrabold leading-[1.1] tracking-tight text-foreground transition-colors group-hover:text-primary">
                      {label}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {description ||
                        `${count}+ premium products from leading brands.`}
                    </p>

                    <div className="mt-auto flex items-center gap-2 pt-6">
                      <span className="text-sm font-semibold text-primary">
                        Browse {label}
                      </span>
                      <ArrowRight className="h-4 w-4 text-primary transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Featured Product Spotlight ────────────────────────────────────────────────

function ProductSpotlight({ product }: { product: Product }) {
  return (
    <section className="bg-muted">
      <div className="container-primary py-20 md:py-28">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left — Content */}
          <ScrollReveal direction="right">
            <div>
              <SectionLabel>Featured Product</SectionLabel>

              <h2 className="mt-5 text-[clamp(32px,5vw,52px)] font-extrabold leading-[1.08] tracking-tight text-foreground">
                {product.name}
              </h2>

              <p className="mt-5 max-w-lg text-sm leading-relaxed text-muted-foreground md:text-lg">
                {truncate(product.description, 200)}
              </p>

              {product.attributes && Object.keys(product.attributes).length > 0 && (
                <div className="mt-8">
                  <ProductSpecs attributes={product.attributes} columns={2} max={6} />
                </div>
              )}

              <div className="mt-8">
                <Link
                  href={`/products/${product.slug}`}
                  className="inline-flex items-center gap-2.5 bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 hover:gap-3"
                >
                  View Details
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </ScrollReveal>

          {/* Right — Product image */}
          <ScrollReveal direction="left">
            <div className="relative flex items-center justify-center">
              {product.image ? (
                <motion.img
                  src={mediaUrl(product.image)}
                  alt={product.name}
                  className="relative max-h-[340px] w-auto max-w-[85%] object-contain sm:max-h-[420px]"
                  animate={{ y: [0, -12, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 4.5,
                    ease: "easeInOut",
                  }}
                />
              ) : (
                <div className="relative flex h-64 w-64 items-center justify-center bg-card sm:h-80 sm:w-80">
                  <Package className="h-16 w-16 text-muted-foreground/30" />
                </div>
              )}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

// ─── Category Showcase (alternating) ──────────────────────────────────────────

function CategoryShowcases({
  categories,
  products,
}: {
  categories: { slug: string; label: string; count: number }[];
  products: Product[];
}) {
  if (categories.length === 0) return null;

  return (
    <>
      {categories.map((category, i) => {
        const isEven = i % 2 === 0;
        const catProducts = products
          .filter((p) => p.categorySlug === category.slug && p.image)
          .slice(0, 1);
        const featured = catProducts[0];

        if (!featured) return null;

        const description =
          CATEGORY_DESCRIPTIONS[category.slug] ||
          `${category.count} premium products from authorized brands.`;

        const contentBlock = (
          <div>
            <span className="mb-4 inline-block border-l-2 border-primary pl-3 text-xs font-bold uppercase tracking-widest text-primary">
              {category.label}
            </span>

            <h3 className="mt-4 text-[clamp(28px,4vw,44px)] font-extrabold leading-[1.1] tracking-tight text-foreground">
              {featured.name}
            </h3>

            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground md:text-lg">
              {truncate(featured.description, 160) || description}
            </p>

            {featured.attributes && Object.keys(featured.attributes).length > 0 && (
              <div className="mt-6">
                <ProductSpecs attributes={featured.attributes} columns={2} max={4} />
              </div>
            )}

            <div className="mt-7">
              <Link
                href={`/hardware/${category.slug}`}
                className="inline-flex items-center gap-2 border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-primary hover:text-primary-foreground hover:border-primary"
              >
                Explore {category.label}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        );

        const imageBlock = (
          <div className="relative flex items-center justify-center">
            {featured.image ? (
              <motion.img
                src={mediaUrl(featured.image)}
                alt={featured.name}
                className="relative max-h-[280px] w-auto max-w-[80%] object-contain sm:max-h-[340px]"
                animate={{ y: [0, -8, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 4,
                  ease: "easeInOut",
                }}
              />
            ) : (
              <div className="flex h-48 w-48 items-center justify-center bg-card sm:h-56 sm:w-56">
                {(() => {
                  const Icon = CATEGORY_ICONS[category.slug] ?? Package;
                  return <Icon className="h-16 w-16 text-muted-foreground/20" />;
                })()}
              </div>
            )}
          </div>
        );

        return (
          <section
            key={category.slug}
            id={category.slug}
            className="scroll-mt-28 bg-background"
          >
            <div className="container-primary py-16 md:py-24">
              <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
                {isEven ? (
                  <>
                    <ScrollReveal direction="right">{imageBlock}</ScrollReveal>
                    <ScrollReveal direction="left">{contentBlock}</ScrollReveal>
                  </>
                ) : (
                  <>
                    <ScrollReveal direction="right">{contentBlock}</ScrollReveal>
                    <ScrollReveal direction="left">{imageBlock}</ScrollReveal>
                  </>
                )}
              </div>
            </div>

            {i < categories.length - 1 && (
              <div className="container-primary">
                <div className="h-px bg-border" />
              </div>
            )}
          </section>
        );
      })}
    </>
  );
}

// ─── Trusted Brands ───────────────────────────────────────────────────────────

function TrustedBrands() {
  const logos = Object.entries(BRAND_LOGOS).slice(0, 12);

  return (
    <section className="bg-muted">
      <div className="container-primary py-16 md:py-20">
        <ScrollReveal>
          <h2 className="text-center text-[clamp(24px,4vw,40px)] font-extrabold tracking-tight text-foreground">
            Trusted by Leading Brands
          </h2>
          <p className="mt-3 text-center text-sm text-muted-foreground">
            We partner with the world&apos;s most respected hardware manufacturers.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {logos.map(([slug, logo]) => (
              <motion.div
                key={slug}
                className="flex h-14 shrink-0 items-center justify-center grayscale transition-all duration-500 hover:grayscale-0"
                whileHover={{ scale: 1.08 }}
              >
                <img
                  src={logo}
                  alt={`${slug} logo`}
                  loading="lazy"
                  className="max-h-10 w-auto max-w-[100px] object-contain opacity-60 transition-opacity duration-500 hover:opacity-100 md:max-h-12"
                />
              </motion.div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

// ─── Help / CTA Band ──────────────────────────────────────────────────────────

function HelpBand() {
  return (
    <section className="bg-background">
      <div className="container-primary py-16 md:py-24">
        <ScrollReveal>
          <div className="mx-auto max-w-4xl border border-border bg-muted p-10 sm:p-14">
            <div className="flex flex-col items-center gap-8 text-center md:flex-row md:text-left">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center bg-primary text-primary-foreground">
                <Headphones className="h-7 w-7" />
              </div>
              <div className="flex-1">
                <p className="text-[clamp(20px,2.5vw,28px)] font-extrabold text-foreground">
                  Need help?
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground md:text-base">
                  Our experts are ready to help you spec the right hardware for your
                  needs.
                </p>
              </div>
              <div className="shrink-0">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2.5 bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 hover:gap-3"
                >
                  Contact Support
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

// ─── Main showcase component ───────────────────────────────────────────────────

interface ProductShowcaseClientProps {
  initialData: Record<string, unknown>;
  products: Product[];
}

export function ProductShowcaseClient({
  initialData,
  products,
}: ProductShowcaseClientProps) {
  const hero = initialData.hero as
    | { headline?: string; subHeadline?: string }
    | undefined;
  const heroHeadline =
    hero?.headline || "Premium Technology. Endless Possibilities.";
  const heroSub =
    stripHtml(hero?.subHeadline || "") ||
    "Discover cutting-edge computers, components and accessories — all in one place, from authorized brands.";

  const categories = useMemo(() => {
    const present = new Set(products.map((p) => p.categorySlug));
    return CATEGORY_ORDER.filter((slug) => present.has(slug)).map((slug) => ({
      slug,
      label: CATEGORY_MAP[slug] || slug,
      count: products.filter((p) => p.categorySlug === slug).length,
      image: products.find((p) => p.categorySlug === slug && p.image)?.image,
      description: CATEGORY_DESCRIPTIONS[slug] || undefined,
    }));
  }, [products]);

  const heroProducts = useMemo(() => {
    if (!products.length) return [];
    const picked: Product[] = [];
    const usedIds = new Set<number>();
    for (const slug of CATEGORY_ORDER) {
      const p = products.find(
        (pr) =>
          pr.categorySlug === slug && pr.image && !usedIds.has(pr.id),
      );
      if (p) {
        picked.push(p);
        usedIds.add(p.id);
      }
      if (picked.length >= 5) break;
    }
    for (const p of products) {
      if (picked.length >= 5) break;
      if (p.image && !usedIds.has(p.id)) {
        picked.push(p);
        usedIds.add(p.id);
      }
    }
    return picked.slice(0, 5);
  }, [products]);

  const spotlightProduct = useMemo(() => {
    return (
      products.find(
        (p) =>
          p.image &&
          p.attributes &&
          Object.keys(p.attributes).length > 0,
      ) ||
      products.find((p) => p.image) ||
      products[0]
    );
  }, [products]);

  const showcaseCategories = useMemo(
    () => categories.map(({ slug, label, count }) => ({ slug, label, count })),
    [categories],
  );

  return (
    <div className="flex flex-col bg-background">
      <HardwareSubNav />
      <Breadcrumb />

      <PremiumHero
        headline={heroHeadline}
        sub={heroSub}
        heroProducts={heroProducts}
      />
      <HighlightsBand />
      <FeaturedCategories categories={categories} />

      {spotlightProduct && <ProductSpotlight product={spotlightProduct} />}

      <CategoryShowcases
        categories={showcaseCategories}
        products={products}
      />

      <TrustedBrands />
      <HelpBand />
    </div>
  );
}
