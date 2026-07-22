"use client";

import Link from "next/link";
import { ArrowRight, BadgeCheck } from "lucide-react";

/* ─── Types ─────────────────────────────────────────────────────── */

interface BrandDoc {
  id: string;
  name: string;
  slug?: string;
  logo?: { url?: string; alt?: string };
}

interface AuthorizedDistributorsProps {
  badge?: string;
  heading?: string;
  subtext?: string;
  brands?: BrandDoc[];
}

interface BrandItem {
  id: string;
  name: string;
  src: string;
  slug: string;
}

/* ─── Brand logos ───────────────────────────────────────────────── */

const BRAND_MAP: Record<string, BrandItem> = {
  crucial: {
    id: "crucial",
    name: "Crucial",
    src: "/assets/images/brands/crucial/logo_5_Crucial_Crucial-Logo-01-01_bc0d83ee79.png",
    slug: "crucial",
  },
  hikvision: {
    id: "hikvision",
    name: "HIKVISION",
    src: "/assets/images/brands/hikvision/logo_7_HIKVISION_Hikvision-Logo-01_f6dca83b30.png",
    slug: "hikvision",
  },
  samsung: {
    id: "samsung",
    name: "Samsung",
    src: "/assets/images/brands/samsung/logo_16_Samsung_samsung-1_8a79d48aa8.png",
    slug: "samsung",
  },
  kingston: {
    id: "kingston",
    name: "Kingston",
    src: "/assets/images/brands/kingston/logo_10_Kingston_kingston_e2fc2908f0.png",
    slug: "kingston",
  },
  sandisk: {
    id: "sandisk",
    name: "SanDisk",
    src: "/assets/images/brands/sandisk/logo_17_SanDisk_SanDisk-Logo_2be1d97bf0.png",
    slug: "sandisk",
  },
  wd: {
    id: "wd",
    name: "WD",
    src: "/assets/images/brands/wd/wd-logo-color.svg",
    slug: "wd",
  },
  teamgroup: {
    id: "teamgroup",
    name: "TEAMGROUP",
    src: "/assets/images/brands/teamgroup/brand_11_teamgroup-Brand-Logo_5f2f19a0ac.png",
    slug: "teamgroup",
  },
  toshiba: {
    id: "toshiba",
    name: "Toshiba",
    src: "/assets/images/brands/toshiba/logo_19_Toshiba_TOSHIBA_Logo_d8683517e2.png",
    slug: "toshiba",
  },
  arktek: {
    id: "arktek",
    name: "ARKTEK",
    src: "/assets/images/brands/arktek/logo_4_ARKTEK_Artek-Brand-Logo-01_5ec18bbfc1.png",
    slug: "arktek",
  },
  msi: {
    id: "msi",
    name: "MSI",
    src: "/assets/images/brands/msi/msi-logo-color.svg",
    slug: "msi",
  },
  zotac: {
    id: "zotac",
    name: "Zotac",
    src: "/assets/images/brands/zotac/zotac-logo-color.svg",
    slug: "zotac",
  },
  pny: {
    id: "pny",
    name: "PNY",
    src: "/assets/images/brands/pny/pny-logo-color.svg",
    slug: "pny",
  },
  dell: {
    id: "dell",
    name: "Dell",
    src: "/assets/images/brands/dell/logo_6_Dell_dell_2951a26c53.png",
    slug: "dell",
  },
  hp: {
    id: "hp",
    name: "HP",
    src: "/assets/images/brands/hp/hp-logo.png",
    slug: "hp",
  },
  lenovo: {
    id: "lenovo",
    name: "Lenovo",
    src: "/assets/images/brands/lenovo/logo_12_Lenovo_lenovo_eeb3c6f768.png",
    slug: "lenovo",
  },
  ugreen: {
    id: "ugreen",
    name: "UGREEN",
    src: "/assets/images/brands/ugreen/ugreen.png",
    slug: "ugreen",
  },
  honeywell: {
    id: "honeywell",
    name: "Honeywell",
    src: "/assets/images/brands/honeywell/honeywell-logo-color.svg",
    slug: "honeywell",
  },
  koorui: {
    id: "koorui",
    name: "Koorui",
    src: "/assets/images/brands/koorui/logo_2_Koorui_Logo_Untitled-design-34_1b8fa186b4.png",
    slug: "koorui",
  },
  aiwa: {
    id: "aiwa",
    name: "Aiwa",
    src: "/assets/images/brands/aiwa/brand_2_Aiwa-Brand-Logo_d8bedf47c4.png",
    slug: "aiwa",
  },
  nearity: {
    id: "nearity",
    name: "Nearity",
    src: "/assets/images/brands/nearity/logo_14_Nearity_channels4_profile_75811eaaab.jpg",
    slug: "nearity",
  },
};

/* ─── Flat brand order ──────────────────────────────────────────── */

const BRAND_ORDER: string[] = [
  "crucial",
  "hikvision",
  "samsung",
  "kingston",
  "sandisk",
  "wd",
  "teamgroup",
  "toshiba",
  "dell",
  "hp",
  "lenovo",
  "arktek",
  "msi",
  "zotac",
  "pny",
  "ugreen",
  "honeywell",
  "koorui",
  "aiwa",
  "nearity",
];

/* ─── Component ─────────────────────────────────────────────────── */

export default function AuthorizedDistributors({
  badge,
  heading,
  subtext,
}: AuthorizedDistributorsProps) {
  const displayHeading =
    heading ?? "Authorized Distributor for 20+ Global IT Brands";
  const displaySubtext =
    subtext ??
    "Official distribution partnerships with the world's leading technology manufacturers — covering storage, memory, graphics, computing, and accessories.";
  const displayBadge = badge ?? "Authorized Distributor";

  const totalBrands = BRAND_ORDER.length;

  return (
    <section
      id="authorized-brands"
      className="relative overflow-hidden bg-background"
    >
      {/* Subtle top-to-bottom fade */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background via-transparent to-muted/30" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* ── Section identifier bar ──────────────────────────── */}
        <div className="mb-8 flex items-center gap-4 border-b pb-4">
          <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Brand Portfolio
          </span>
          <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-primary">
            <BadgeCheck className="h-3.5 w-3.5" />
            {displayBadge}
          </span>
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

        {/* ── Logo grid ──────────────────────────────────────── */}
        <div className="mt-12 grid grid-cols-2 gap-px border border-border bg-border sm:grid-cols-4 lg:grid-cols-5">
          {BRAND_ORDER.map((brandId) => {
            const brand = BRAND_MAP[brandId];
            if (!brand) return null;
            return <LogoCard key={brandId} brand={brand} />;
          })}
        </div>

        {/* ── Footer CTA ─────────────────────────────────────── */}
        <div className="mt-12 border-t pt-8">
          <Link
            href="/brands"
            className="inline-flex items-center gap-2 bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            View All {totalBrands}+ Brands
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ─── Logo card ─────────────────────────────────────────────────── */

function LogoCard({ brand }: { brand: BrandItem }) {
  return (
    <Link
      href={`/brands/${brand.slug}`}
      title={`${brand.name} — View brand`}
      className="group flex aspect-[3/2] items-center justify-center bg-card p-4 transition-colors hover:bg-muted"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={brand.src}
        alt={`${brand.name} logo`}
        loading="lazy"
        className="max-h-full max-w-full object-contain"
      />
    </Link>
  );
}
