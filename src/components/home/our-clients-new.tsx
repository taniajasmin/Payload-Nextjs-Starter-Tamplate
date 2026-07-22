"use client";

import React from "react";
import { mediaUrl } from "@/lib/media-url";
import { SectionShell } from "@/components/ui/section-shell";
import { SectionHeading } from "@/components/ui/section-heading";

/* ─── Reuse brand logo assets from trust-band / brand-showcase ─────── */

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

/* ─── Types ────────────────────────────────────────────────────────── */

interface BrandDoc {
  id: string;
  name: string;
  slug?: string;
  logo?: { url?: string; alt?: string };
}

interface OurClientsNewProps {
  badge?: string;
  heading?: string;
  subtext?: string;
  brands?: BrandDoc[];
}

/* ─── Fallback brands ──────────────────────────────────────────────── */

const fallbackBrands: BrandDoc[] = [
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
  { id: "zotac", name: "Zotac", slug: "zotac" },
];

/* ─── Helpers ──────────────────────────────────────────────────────── */

function resolveLogo(brand: BrandDoc): string | null {
  if (brand.logo?.url) return brand.logo.url;
  const key = brand.slug || brand.id;
  return brandLogoMap[key] || null;
}

/* ─── Component ────────────────────────────────────────────────────── */

export default function OurClientsNew({
  badge = "Our Clients",
  heading = "Partnering with industry leaders across diverse sectors",
  subtext,
  brands = [],
}: OurClientsNewProps) {
  const displayBrands = brands.length > 0 ? brands : fallbackBrands;

  return (
    <SectionShell id="our-clients" variant="default">
      <SectionHeading
        eyebrow={badge}
        title={heading}
        subtitle={subtext}
        align="center"
      />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {displayBrands.map((brand) => {
          const src = resolveLogo(brand);
          return (
            <div
              key={brand.id || brand.slug}
              className="flex h-[7.2rem] items-center justify-center p-2 md:h-[9rem]"
            >
              {src ? (
                <img
                  src={mediaUrl(src)}
                  alt={`${brand.name} logo`}
                  className="max-h-full max-w-[216px] object-contain md:max-w-[252px]"
                  loading="lazy"
                  decoding="async"
                />
              ) : (
                <span className="whitespace-nowrap text-sm font-semibold text-muted-foreground">
                  {brand.name}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </SectionShell>
  );
}
