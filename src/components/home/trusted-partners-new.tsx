"use client";

import React from "react";
import { motion } from "framer-motion";
import { mediaUrl } from "@/lib/media-url";
import { SectionShell } from "@/components/ui/section-shell";
import { SectionHeading } from "@/components/ui/section-heading";

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

const fallbackBrandSlugs = [
  "samsung",
  "hikvision",
  "dell",
  "hp",
  "lenovo",
  "kingston",
  "sandisk",
  "wd",
  "msi",
  "crucial",
  "toshiba",
  "zotac",
  "pny",
  "ugreen",
  "honeywell",
  "koorui",
];

interface BrandDoc {
  id: string;
  name: string;
  slug?: string;
  logo?: { url?: string; alt?: string };
}

interface TrustedPartnersNewProps {
  badge?: string;
  heading?: string;
  subtext?: string;
  brands?: BrandDoc[];
}

function resolveLogo(brand: BrandDoc): string | null {
  if (brand.logo?.url) return brand.logo.url;
  const key = brand.slug || brand.id;
  return brandLogoMap[key] || null;
}

export default function TrustedPartnersNew({
  badge,
  heading,
  subtext,
  brands = [],
}: TrustedPartnersNewProps) {
  const displayBadge = badge || "Trusted Partners";
  const displayHeading = heading || "Built on Trust, Delivered with Care";
  const displaySubtext =
    subtext ||
    "We partner with 20+ world-class IT brands as their authorized distributor across the Middle East, Africa, and CIS regions. Every partnership is built on reliability, expertise, and a shared commitment to quality.";

  const displayBrands: BrandDoc[] =
    brands.length > 0
      ? brands
      : fallbackBrandSlugs.map((slug) => ({
          id: slug,
          name: slug.charAt(0).toUpperCase() + slug.slice(1),
          slug,
        }));

  return (
    <SectionShell id="trusted-partners" variant="muted">
      <SectionHeading
        eyebrow={displayBadge}
        title={displayHeading}
        subtitle={displaySubtext}
        align="center"
      />

      <div className="flex flex-wrap justify-center gap-4 md:gap-5">
        {displayBrands.map((brand, idx) => {
          const src = resolveLogo(brand);
          return (
            <motion.div
              key={brand.id || brand.slug}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: idx * 0.04, duration: 0.3, ease: "easeOut" }}
              className="flex h-[12.6rem] w-[14.4rem] flex-col items-center justify-center border border-border bg-card p-4 sm:h-[14.4rem] sm:w-[18rem]"
            >
              <div className="flex flex-1 items-center justify-center">
                {src ? (
                  <img
                    src={mediaUrl(src)}
                    alt={`${brand.name} logo`}
                    className="max-h-[5.4rem] max-w-[10.8rem] object-contain"
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  <span className="text-sm font-semibold text-foreground">
                    {brand.name}
                  </span>
                )}
              </div>
              <span className="mt-1 text-xs font-medium text-muted-foreground">
                {brand.name}
              </span>
            </motion.div>
          );
        })}
      </div>
    </SectionShell>
  );
}
