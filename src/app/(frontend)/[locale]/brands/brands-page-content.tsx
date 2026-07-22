"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Sparkles,
  Award,
  ArrowRight,
  Globe,
  Package,
  Zap,
  HeadphonesIcon,
  Building2,
  ShoppingCart,
  Cpu,
  Monitor,
  Gamepad2,
  Laptop,
  Cable,
  Search,
} from "lucide-react";
import { brandCategories } from "@/lib/brand-data";
import type { BrandPageData } from "@/lib/brand-data";
import { BRAND_LOGOS } from "@/lib/product-config";
import { mediaUrl } from "@/lib/media-url";
import { useLivePreview } from "@/hooks/use-live-preview";

/* ------------------------------------------------------------------
   Types
   ------------------------------------------------------------------ */

interface HeroData {
  headline?: string;
  description?: string;
  headingSize?: string;
  descriptionSize?: string;
  primaryButtonLabel?: string;
  primaryButtonHref?: string;
  primaryButtonColor?: string;
  secondaryButtonLabel?: string;
  secondaryButtonHref?: string;
  secondaryButtonStyle?: string;
}

interface BrandDirectoryData {
  badge?: string;
  heading?: string;
  description?: string;
}

interface AuthorizedSectionData {
  badge?: string;
  heading?: string;
  description?: string;
}

interface AuthorizedFeature {
  iconType?: string;
  title: string;
  desc?: string;
  gradientColor?: string;
}

interface CategoriesSectionData {
  badge?: string;
  heading?: string;
  description?: string;
}

interface PartnershipsSectionData {
  badge?: string;
  heading?: string;
  description?: string;
}

interface AwardData {
  title: string;
  subtitle?: string;
  desc?: string;
}

interface CtaData {
  badge?: string;
  heading?: string;
  headingSize?: string;
  description?: string;
  descriptionSize?: string;
  primaryButtonLabel?: string;
  primaryButtonHref?: string;
  primaryButtonColor?: string;
  secondaryButtonLabel?: string;
  secondaryButtonHref?: string;
  secondaryButtonStyle?: string;
}

/* ------------------------------------------------------------------
   Fallback data
   ------------------------------------------------------------------ */

const fallbackHero: HeroData = {
  headline: "Authorized Distribution — Global Brands",
  description:
    "Simal Technologies Middle East is the authorized distributor for over 20 world-class IT brands across the Middle East, Africa, CIS, and GCC regions.",
  primaryButtonLabel: "Browse Product Catalog",
  primaryButtonHref: "/hardware/product-catalog",
  secondaryButtonLabel: "Contact Sales",
  secondaryButtonHref: "/contact",
};

const fallbackBrandDirectory: BrandDirectoryData = {
  badge: "Brand Portfolio",
  heading: "Our Authorized Brand Partners",
  description:
    "Partnering with the world's leading technology manufacturers to bring enterprise-grade products to the Middle East, Africa, and CIS regions.",
};

const fallbackAuthorizedSection: AuthorizedSectionData = {
  badge: "Trust & Authenticity",
  heading: "What Authorized Means",
  description:
    "Every product ships with full manufacturer backing — not gray-market promises.",
};

const fallbackAuthorizedFeatures: AuthorizedFeature[] = [
  {
    iconType: "shield-check",
    title: "100% Genuine Products",
    desc: "Direct from manufacturer — zero counterfeit risk. Every product carries full authenticity guarantee.",
  },
  {
    iconType: "award",
    title: "Full Manufacturer Warranty",
    desc: "Backed by brand warranty, not third-party. Direct RMA processing and warranty claims.",
  },
  {
    iconType: "headphones",
    title: "Technical Support",
    desc: "Direct access to manufacturer-trained experts. Pre-sales consultation and post-sales assistance.",
  },
  {
    iconType: "zap",
    title: "Firmware & Updates",
    desc: "Eligible for all official software and firmware updates. Stay current with latest releases.",
  },
  {
    iconType: "shopping-cart",
    title: "B2B Pricing",
    desc: "Volume pricing directly from authorized channels. Competitive trade rates for resellers.",
  },
  {
    iconType: "building-2",
    title: "After-Sales Service",
    desc: "Manufacturer-backed service and RMA support. Dedicated account managers for enterprise.",
  },
];

const fallbackCategoriesSection: CategoriesSectionData = {
  badge: "Browse by Category",
  heading: "Brand Categories",
  description: "Explore our portfolio organized by product category.",
};

const fallbackPartnershipsSection: PartnershipsSectionData = {
  badge: "Awards & Recognition",
  heading: "Strategic Partnerships",
  description:
    "Recognized by our partners for outstanding distribution performance.",
};

const fallbackAwards: AwardData[] = [
  {
    title: "HIKSEMi Best Distribution Partner 2025",
    subtitle: "MEA National Distributor Summit",
    desc: "Awarded at the 2025 HIKSEMi MEA National Distributor Summit — recognition of our outstanding distribution performance across the Middle East and Africa.",
  },
  {
    title: "HikVision Best Distributor Partner",
    subtitle: "Top-Performing Partner",
    desc: "Recognized as a top-performing distribution partner for HikVision, one of the world's leading security and storage brands.",
  },
];

const fallbackCta: CtaData = {
  badge: "Partnership Opportunities",
  heading: "Interested in Partnering With Us?",
  description:
    "Contact our partnership team to distribute your brand in the Middle East, Africa, CIS, and GCC regions.",
  primaryButtonLabel: "Email Partnership Team",
  primaryButtonHref: "mailto:info@simalme.com",
  secondaryButtonLabel: "WhatsApp +971 54 308 8655",
  secondaryButtonHref: "https://wa.me/971543088655",
};

/* ------------------------------------------------------------------
   Icon mappings
   ------------------------------------------------------------------ */

const FEATURE_ICONS: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  "shield-check": ShieldCheck,
  award: Award,
  headphones: HeadphonesIcon,
  zap: Zap,
  "shopping-cart": ShoppingCart,
  "building-2": Building2,
};

const CATEGORY_ICONS: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  "Computer Components": Cpu,
  "Computer Accessories": Cable,
  Monitors: Monitor,
  "Monitors & Laptops": Laptop,
  Gaming: Gamepad2,
  Laptops: Laptop,
};

const CATEGORY_IMAGES: Record<string, string> = {
  "computer-components": "/assets/images/homepage/home_4_t705_HS___6_-removebg-preview_6f21d30648.png",
  "computer-accessories": "/assets/images/products/ugreen/p73_xcs-removebg-preview_d5bb7aaa00.png",
  monitors: "/assets/images/products/koorui/p49_koorui-monitor-27-1_c76b66b2b8.jpg",
  gaming: "/assets/images/products/arktek/p53_RTX2060-6GB-1-1-removebg-preview_3eeead5252.png",
  laptops: "/assets/images/products/lenovo/p50_lenovo-pc_f57a1d7dbd.jpg",
};

/* ------------------------------------------------------------------
   Helpers
   ------------------------------------------------------------------ */

function groupBrandsByCategory(brands: BrandPageData[]) {
  const groups: Record<string, BrandPageData[]> = {};
  brands.forEach((brand) => {
    let cat = brand.category || "Other";
    if (cat === "Monitors" || cat === "Laptops") {
      cat = "Monitors & Laptops";
    }
    if (!groups[cat]) groups[cat] = [];
    groups[cat].push(brand);
  });
  return groups;
}

function getBrandLogoUrl(brand: BrandPageData): string | null {
  const b = brand as unknown as Record<string, unknown>;
  const logoPng = b.logoPng as Record<string, unknown> | undefined;
  const logoSvg = b.logoSvg as Record<string, unknown> | undefined;
  const logo = b.logo as Record<string, unknown> | undefined;
  return (
    (logoPng?.url as string) ||
    (logoSvg?.url as string) ||
    (logo?.url as string) ||
    (BRAND_LOGOS[brand.slug as keyof typeof BRAND_LOGOS] as string) ||
    null
  );
}

/* ------------------------------------------------------------------
   JSON-LD
   ------------------------------------------------------------------ */

function buildJsonLd(brands: BrandPageData[]) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Our Brands — Simal Technologies",
    url: "https://www.simalme.com/brands",
    description:
      "Complete brand directory for Simal Technologies Middle East — 20+ authorized IT brand partners.",
    mainEntity: {
      "@type": "Organization",
      name: "Simal Technologies Middle East LLC",
      url: "https://www.simalme.com",
      brand: brands.map((b) => ({
        "@type": "Brand",
        name: b.name,
        description: b.tagline,
        url: `https://www.simalme.com/brands/${b.slug}`,
      })),
    },
  };
}

/* ------------------------------------------------------------------
   BrandFilterPill — category filter button
   ------------------------------------------------------------------ */

function BrandFilterPill({
  label,
  count,
  isActive,
  onClick,
}: {
  label: string;
  count?: number;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-3.5 py-2 text-sm font-semibold transition-colors ${
        isActive
          ? "bg-primary text-primary-foreground"
          : "border border-border text-muted-foreground hover:text-foreground hover:bg-muted"
      }`}
    >
      {label}
      {count !== undefined && (
        <span className={`ml-1.5 ${isActive ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
          ({count})
        </span>
      )}
    </button>
  );
}

export function BrandsPageContent({
  initialData,
  brands,
  initialTab = "brands",
}: {
  initialData: Record<string, unknown>;
  brands: BrandPageData[];
  initialTab?: "brands" | "categories";
}) {
  const data = useLivePreview(initialData);
  const [activeTab, setActiveTab] = useState<"brands" | "categories">(() => {
    if (typeof window !== "undefined") {
      const t = new URLSearchParams(window.location.search).get("tab");
      if (t === "categories" || t === "brands") return t;
    }
    return initialTab;
  });
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<
    string | null
  >(null);

  // ─── Hero ───────────────────────────────────────────────────────
  const hero = data.hero as HeroData | undefined;
  const heroHeadline = hero?.headline || fallbackHero.headline!;
  const heroDescription = hero?.description || fallbackHero.description!;
  const heroPrimaryLabel =
    hero?.primaryButtonLabel || fallbackHero.primaryButtonLabel!;
  const heroPrimaryHref =
    hero?.primaryButtonHref || fallbackHero.primaryButtonHref!;
  const heroSecondaryLabel =
    hero?.secondaryButtonLabel || fallbackHero.secondaryButtonLabel!;
  const heroSecondaryHref =
    hero?.secondaryButtonHref || fallbackHero.secondaryButtonHref!;

  // ─── Brand Directory ────────────────────────────────────────────
  const brandDir = data.brandDirectory as BrandDirectoryData | undefined;
  const dirBadge = brandDir?.badge || fallbackBrandDirectory.badge!;
  const dirHeading = brandDir?.heading || fallbackBrandDirectory.heading!;
  const dirDescription =
    brandDir?.description || fallbackBrandDirectory.description!;

  // ─── Categories Section ─────────────────────────────────────────
  const catSection = data.categoriesSection as
    | CategoriesSectionData
    | undefined;
  const catBadge = catSection?.badge || fallbackCategoriesSection.badge!;
  const catHeading = catSection?.heading || fallbackCategoriesSection.heading!;
  const catDescription =
    catSection?.description || fallbackCategoriesSection.description!;

  // ─── CTA ────────────────────────────────────────────────────────
  const cta = data.cta as CtaData | undefined;
  const ctaBadge = cta?.badge || fallbackCta.badge!;
  const ctaHeading = cta?.heading || fallbackCta.heading!;
  const ctaDescription = cta?.description || fallbackCta.description!;
  const ctaPrimaryLabel =
    cta?.primaryButtonLabel || fallbackCta.primaryButtonLabel!;
  const ctaPrimaryHref =
    cta?.primaryButtonHref || fallbackCta.primaryButtonHref!;
  const ctaSecondaryLabel =
    cta?.secondaryButtonLabel || fallbackCta.secondaryButtonLabel!;
  const ctaSecondaryHref =
    cta?.secondaryButtonHref || fallbackCta.secondaryButtonHref!;

  // ─── Derived data ───────────────────────────────────────────────
  const grouped = groupBrandsByCategory(brands);
  const jsonLd = buildJsonLd(brands);

  return (
    <div className="flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── Hero ── */}
      <section className="relative w-full py-28 md:py-36 overflow-hidden bg-slate-950">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{
            backgroundImage: `url(${mediaUrl("/assets/images/homepage/brands.avif")})`,
          }}
        />
        <div className="absolute inset-0 bg-slate-950/80" />

        <div className="container-primary relative z-10">
          <div className="max-w-3xl">
            <span className="mb-4 inline-block border-l-2 border-primary pl-3 text-xs font-bold uppercase tracking-widest text-primary">
              Authorized Distribution
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.05] tracking-tight mb-8 text-white">
              {heroHeadline}
            </h1>
            <p className="text-base text-white/80 leading-relaxed max-w-xl">
              {heroDescription}
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href={heroPrimaryHref}
                className="bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 inline-flex items-center gap-2"
              >
                {heroPrimaryLabel} <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href={heroSecondaryHref}
                className="border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10 inline-flex items-center gap-2"
              >
                {heroSecondaryLabel}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── View Tabs ── */}
      <nav
        aria-label="Brands sections"
        className="border-b border-border bg-background sticky top-0 z-30"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 overflow-x-auto py-3">
            {[
              { id: "brands" as const, label: "Brands" },
              { id: "categories" as const, label: "Product Category" },
            ].map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveTab(item.id)}
                  className={`shrink-0 px-5 py-2 text-sm font-semibold transition-colors whitespace-nowrap ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                  aria-current={isActive ? "true" : undefined}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {activeTab === "brands" && (
        <>
          {/* ── Brand Directory ── */}
          <section className="relative overflow-hidden bg-background">
            <div className="pointer-events-none absolute inset-0 " />
            <div className="container-primary relative z-10 py-12 lg:py-16">
              {/* Section header */}
              <div className="mb-10">
                <span className="mb-4 inline-block border-l-2 border-primary pl-3 text-xs font-bold uppercase tracking-widest text-primary">
                  {dirBadge}
                </span>
                <h2 className="text-3xl font-extrabold leading-[1.1] tracking-tight text-foreground sm:text-4xl">
                  Our Authorized{" "}
                  <span className="text-primary">{dirHeading}</span>
                </h2>
                <p className="mt-3 text-sm text-muted-foreground max-w-2xl leading-relaxed">
                  {dirDescription}
                </p>
              </div>

              {/* Category filter pills */}
              <div className="flex flex-wrap gap-2 mb-8">
                <BrandFilterPill
                  label={`All (${brands.length})`}
                  isActive={activeCategoryFilter === null}
                  onClick={() => setActiveCategoryFilter(null)}
                />
                {Object.keys(grouped).map((cat) => (
                  <BrandFilterPill
                    key={cat}
                    label={cat}
                    count={grouped[cat].length}
                    isActive={activeCategoryFilter === cat}
                    onClick={() =>
                      setActiveCategoryFilter(
                        activeCategoryFilter === cat ? null : cat,
                      )
                    }
                  />
                ))}
              </div>

              {/* Brand logos grid */}
              <div className="space-y-10">
                {Object.entries(grouped)
                  .filter(([cat]) =>
                    activeCategoryFilter ? cat === activeCategoryFilter : true,
                  )
                  .map(([category, categoryBrands]) => {
                    const CatIcon = CATEGORY_ICONS[category] || Package;
                    return (
                      <div key={category}>
                        {/* Category heading */}
                        <div className="flex items-center gap-3 mb-5">
                          <div className="shrink-0 w-9 h-9 bg-primary flex items-center justify-center text-primary-foreground">
                            <CatIcon className="h-4 w-4" />
                          </div>
                          <div>
                            <h3 className="text-base font-extrabold text-foreground">
                              {category}
                            </h3>
                            <p className="text-xs text-muted-foreground">
                              {categoryBrands.length} brand{categoryBrands.length !== 1 ? "s" : ""}
                            </p>
                          </div>
                        </div>

                        {/* Logo grid */}
                        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-x-4 gap-y-6">
                          {categoryBrands.map((brand) => {
                            const logoUrl = getBrandLogoUrl(brand);
                            return (
                              <Link
                                key={brand.slug}
                                href={`/brands/${brand.slug}`}
                                className="group flex flex-col items-center justify-center gap-2.5 py-3 px-2 hover:bg-muted transition-colors"
                              >
                                <div className="relative w-32 h-14 flex items-center justify-center">
                                  {logoUrl ? (
                                    <img
                                      src={mediaUrl(logoUrl)}
                                      alt={brand.name}
                                      className="max-w-full max-h-full object-contain transition-all duration-300 group-hover:scale-110"
                                      style={{ filter: "grayscale(0)" }}
                                    />
                                  ) : (
                                    <span className="text-2xl font-extrabold text-muted-foreground">
                                      {brand.name.charAt(0)}
                                    </span>
                                  )}
                                </div>
                                <span className="text-[11px] text-muted-foreground text-center leading-tight font-medium group-hover:text-foreground transition-colors">
                                  {brand.name}
                                </span>
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </section>
        </>
      )}

      {activeTab === "categories" && (
        <>
          {/* ── Brand Categories ── */}
          <section className="relative overflow-hidden bg-muted">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background via-transparent to-muted" />
            <div className="container-primary relative z-10 py-12 lg:py-16">
              <div className="text-center mb-16">
                <span className="mb-4 inline-block border-l-2 border-primary pl-3 text-xs font-bold uppercase tracking-widest text-primary">
                  {catBadge}
                </span>
                <h2 className="text-3xl font-extrabold leading-[1.1] tracking-tight text-foreground sm:text-4xl">
                  Brand{" "}
                  <span className="text-primary">{catHeading}</span>
                </h2>
                <p className="mt-6 text-sm text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  {catDescription}
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {brandCategories.map((cat) => {
                  const CatIcon = CATEGORY_ICONS[cat.label] || Package;
                  const categoryImage = CATEGORY_IMAGES[cat.id];

                  return (
                    <Link
                      key={cat.id}
                      href={`/hardware/${cat.id}`}
                      className="group relative border border-border bg-card transition-colors hover:border-primary/50"
                    >
                      {categoryImage && (
                        <div
                          className="absolute right-2 bottom-2 top-8 left-auto w-[55%] bg-no-repeat bg-right-bottom transition-transform duration-500 group-hover:scale-105"
                          style={{
                            backgroundImage: `url(${mediaUrl(categoryImage)})`,
                            backgroundSize: "contain",
                          }}
                        />
                      )}

                      <div className="relative p-5 md:p-6 flex flex-col items-start h-full min-h-[160px]">
                        <div className="w-11 h-11 bg-primary flex items-center justify-center text-primary-foreground mb-4">
                          <CatIcon className="w-5 h-5" />
                        </div>

                        <h3 className="font-extrabold text-foreground text-lg leading-[1.1] tracking-tight mb-1">
                          {cat.label}
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed mb-3 max-w-[55%]">
                          Browse {cat.label.toLowerCase()} products
                        </p>

                        <div className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                          View Products
                          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </div>
                      </div>
                    </Link>
                  );
                })}

                {/* Full catalog card */}
                <Link
                  href="/hardware/product-catalog"
                  className="group relative border border-primary/30 bg-card transition-colors hover:border-primary/60"
                >
                  <div className="relative p-5 md:p-6 flex flex-col items-start h-full min-h-[160px]">
                    <div className="w-11 h-11 bg-primary flex items-center justify-center text-primary-foreground mb-4">
                      <Package className="w-5 h-5" />
                    </div>

                    <h3 className="font-extrabold text-foreground text-lg leading-[1.1] tracking-tight mb-1">
                      Full Product Catalog
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                      Browse all 76+ products across every category
                    </p>

                    <div className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors">
                      View All Products
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </section>
        </>
      )}

      {/* ── CTA ── */}
      <section className="relative w-full py-28 md:py-36 overflow-hidden bg-slate-950">
        <div className="absolute inset-0 bg-slate-950/80" />

        <div className="container-primary text-center relative z-10">
          <span className="mb-4 inline-block border-l-2 border-primary pl-3 text-xs font-bold uppercase tracking-widest text-primary">
            {ctaBadge}
          </span>

          <h2 className="text-3xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-4xl lg:text-5xl mb-6">
            {ctaHeading}
          </h2>

          <p className="text-base text-white/70 max-w-xl mx-auto leading-relaxed">
            {ctaDescription}
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href={ctaPrimaryHref}
              className="bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 inline-flex items-center gap-2"
            >
              {ctaPrimaryLabel} <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href={ctaSecondaryHref}
              className="border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10 inline-flex items-center gap-2"
            >
              {ctaSecondaryLabel}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
