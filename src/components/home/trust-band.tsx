"use client";

import React from "react";
import { mediaUrl } from "@/lib/media-url";

/* ─── Reuse brand logo assets from brand-showcase ─────────────────── */

const brandLogoMap: Record<string, string> = {
  aiwa: "/assets/images/brands/aiwa/brand_2_Aiwa-Brand-Logo_d8bedf47c4.png",
  arktek:
    "/assets/images/brands/arktek/logo_4_ARKTEK_Artek-Brand-Logo-01_5ec18bbfc1.png",
  crucial:
    "/assets/images/brands/crucial/logo_5_Crucial_Crucial-Logo-01-01_bc0d83ee79.png",
  dell: "/assets/images/brands/dell/logo_6_Dell_dell_2951a26c53.png",
  hikvision:
    "/assets/images/brands/hikvision/logo_7_HIKVISION_Hikvision-Logo-01_f6dca83b30.png",
  honeywell: "/assets/images/brands/honeywell/honeywell-logo-color.svg",
  hp: "/assets/images/brands/hp/logo_9_HP_HP_logo_2025_c733071c6a.svg",
  kingston:
    "/assets/images/brands/kingston/logo_10_Kingston_kingston_e2fc2908f0.png",
  koorui:
    "/assets/images/brands/koorui/logo_2_Koorui_Logo_Untitled-design-34_1b8fa186b4.png",
  lenovo: "/assets/images/brands/lenovo/logo_12_Lenovo_lenovo_eeb3c6f768.png",
  msi: "/assets/images/brands/msi/msi-logo-color.svg",
  nearity:
    "/assets/images/brands/nearity/logo_14_Nearity_channels4_profile_75811eaaab.jpg",
  pny: "/assets/images/brands/pny/logo_15_PNY_pny_0600cad6d8.png",
  samsung:
    "/assets/images/brands/samsung/logo_16_Samsung_samsung-1_8a79d48aa8.png",
  sandisk:
    "/assets/images/brands/sandisk/logo_17_SanDisk_SanDisk-Logo_2be1d97bf0.png",
  teamgroup:
    "/assets/images/brands/teamgroup/brand_11_teamgroup-Brand-Logo_5f2f19a0ac.png",
  toshiba:
    "/assets/images/brands/toshiba/logo_19_Toshiba_TOSHIBA_Logo_d8683517e2.png",
  ugreen: "/assets/images/brands/ugreen/ugreen.png",
  wd: "/assets/images/brands/wd/wd-logo-color.svg",
  zotac:
    "/assets/images/brands/zotac/logo_22_Zotac_Zotac-Logo-1-1500x1000-1_863ea92f9c.webp",
};

interface BrandItem {
  id: string;
  name: string;
  slug?: string;
}

const defaultBrands: BrandItem[] = [
  { id: "samsung", name: "Samsung", slug: "samsung" },
  { id: "hikvision", name: "HIKVISION", slug: "hikvision" },
  { id: "dell", name: "Dell", slug: "dell" },
  { id: "hp", name: "HP", slug: "hp" },
  { id: "lenovo", name: "Lenovo", slug: "lenovo" },
  { id: "kingston", name: "Kingston", slug: "kingston" },
  { id: "sandisk", name: "SanDisk", slug: "sandisk" },
  { id: "wd", name: "WD", slug: "wd" },
  { id: "msi", name: "MSI", slug: "msi" },
  { id: "crucial", name: "Crucial", slug: "crucial" },
  { id: "toshiba", name: "Toshiba", slug: "toshiba" },
  { id: "teamgroup", name: "TEAMGROUP", slug: "teamgroup" },
  { id: "zotac", name: "Zotac", slug: "zotac" },
  { id: "pny", name: "PNY", slug: "pny" },
  { id: "ugreen", name: "UGREEN", slug: "ugreen" },
  { id: "honeywell", name: "Honeywell", slug: "honeywell" },
  { id: "koorui", name: "Koorui", slug: "koorui" },
  { id: "aiwa", name: "Aiwa", slug: "aiwa" },
  { id: "nearity", name: "Nearity", slug: "nearity" },
  { id: "arktek", name: "ARKTEK", slug: "arktek" },
];

function resolveLogo(brand: BrandItem): string | null {
  const key = brand.slug || brand.id;
  return brandLogoMap[key] || null;
}

function BrandLogo({ brand }: { brand: BrandItem }) {
  const src = resolveLogo(brand);
  return (
    <div className="group flex h-[8.55rem] w-[21.87rem] md:h-[9.72rem] md:w-[24.3rem] items-center justify-center border border-border bg-card p-2 md:p-3 transition-colors hover:border-primary/50">
      {src ? (
        <img
          src={mediaUrl(src)}
          alt={`${brand.name} logo`}
          className="max-h-full max-w-full object-contain opacity-80 grayscale-[20%] transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0"
          loading="lazy"
          decoding="async"
        />
      ) : (
        <span className="text-[length:var(--font-body)] font-semibold text-foreground/60 tracking-tight whitespace-nowrap">
          {brand.name}
        </span>
      )}
    </div>
  );
}

/* ─── Component ───────────────────────────────────────────────────── */

interface TrustBandProps {
  brands?: BrandItem[];
}

export default function TrustBand({ brands = [] }: TrustBandProps) {
  const displayBrands = brands.length > 0 ? brands : defaultBrands;
  // Duplicate for seamless infinite loop
  const doubledBrands = [...displayBrands, ...displayBrands];

  return (
    <section
      id="trust-band"
      className="relative w-full py-4 md:py-6 overflow-hidden border-y border-border bg-background"
    >
      {/* Section label */}
      <div className="text-center mb-2 md:mb-3">
        <span className="inline-flex items-center gap-2 border border-border bg-card px-4 py-1.5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping bg-primary opacity-60" />
            <span className="relative inline-flex h-2 w-2 bg-primary" />
          </span>
          <span className="uppercase font-bold tracking-[0.2em] text-[length:var(--font-section-label)] text-primary">
            Trusted by Industry Leaders
          </span>
        </span>
      </div>

      {/* Marquee container */}
      <div className="relative w-full group">
        {/* Left fade mask */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 md:w-24 bg-gradient-to-r from-background to-transparent z-10" />
        {/* Right fade mask */}
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 md:w-24 bg-gradient-to-l from-background to-transparent z-10" />

        {/* Scrolling track */}
        <div className="flex animate-marquee-fast group-hover:[animation-play-state:paused]">
          {doubledBrands.map((brand, idx) => (
            <div
              key={`${brand.id}-${idx}`}
              className="flex items-center justify-center px-3 md:px-4 shrink-0"
            >
              <BrandLogo brand={brand} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
