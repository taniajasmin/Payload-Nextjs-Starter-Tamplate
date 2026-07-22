/**
 * Content + data helpers for the redesigned Computer Components page.
 *
 * Product/brand *inventory* lives in the Payload CMS (see
 * `lib/fetch-products.ts`). This module holds only the presentation layer the
 * page needs to turn that flat product list into the premium scroll-story
 * experience: the `BrandStory` shape, a builder that groups live products by
 * brand, curated per-brand copy, and the static marketing sections (feature
 * strip, brand ecosystem, technology showcase, why-choose-us, CTA).
 *
 * Everything degrades gracefully: when the CMS has no products,
 * `buildBrandStories([])` returns the canonical `FALLBACK_BRAND_STORIES` so the
 * page is never blank.
 */

import { BRAND_ACCENTS, BRAND_LOGOS, type Product } from "@/lib/product-config";

/* ──────────────────────────────────────────────────────────────────
   Types
   ────────────────────────────────────────────────────────────────── */

export interface BrandStory {
  /** Anchor id (brand slug) — also used by the sticky category nav. */
  id: string;
  /** Display name, e.g. "Crucial". */
  brand: string;
  brandSlug: string;
  /** Tailwind gradient classes, e.g. "from-[#286FB4] to-[#B0DDE4]". */
  accent: string;
  /** Solid rgba glow used for the showcase card / image halo. */
  glowColor: string;
  /** Brand logo path (may be undefined for brands without a logo asset). */
  logo?: string;
  tagline: string;
  description: string;
  bullets: string[];
  /** Hero product render for the section (first product image / gallery). */
  image: string;
  gallery: string[];
  productCount: number;
  sampleProducts: Product[];
  /** "View {brand}" deep-link (catalog with brand pre-selected). */
  href: string;
}

export interface FeatureItem {
  icon: "zap" | "truck" | "shield" | "globe";
  title: string;
  copy: string;
}

export interface EcosystemBrand {
  name: string;
  logo?: string;
  tagline: string;
}

export interface TechShowcaseItem {
  eyebrow: string;
  title: string;
  highlight: string;
  copy: string;
  /** Which side the text sits on (alternates). */
  reverse: boolean;
  accent: "primary" | "teal" | "pink";
}

export interface WhyChooseStat {
  value: number;
  suffix: string;
  label: string;
}

/* ──────────────────────────────────────────────────────────────────
   Curated per-brand presentation
   ────────────────────────────────────────────────────────────────── */

interface BrandCopy {
  tagline: string;
  description: string;
  bullets: string[];
  /** rgba halo for the product render. */
  glowColor: string;
}

/** Canonical display order — keeps the page layout stable regardless of CMS order. */
export const CANONICAL_BRAND_ORDER = [
  "Crucial",
  "HIKVISION",
  "ARKTEK",
  "Kingston",
  "Samsung",
  "WD",
  "TEAMGROUP",
  "MSI",
  "SanDisk",
  "Toshiba",
  "ZOTAC",
  "PNY",
] as const;

const BRAND_COPY: Record<string, BrandCopy> = {
  Crucial: {
    tagline: "NVMe SSDs & DDR5 Memory",
    description:
      "Storage and memory engineered for raw speed — Gen4 and Gen5 NVMe drives paired with high-frequency DDR5 kits, built on Micron NAND.",
    bullets: [
      "Gen4 & Gen5 NVMe SSDs",
      "DDR5 up to 6400 MT/s",
      "Read speeds up to 7,300 MB/s",
      "Proven endurance & reliability",
    ],
    glowColor: "rgba(40, 111, 180, 0.45)",
  },
  HIKVISION: {
    tagline: "Enterprise-Grade SSDs",
    description:
      "Dependable SATA and NVMe solid-state storage — from desktop upgrades to always-on, high-endurance workloads.",
    bullets: [
      "SATA & NVMe options",
      "Rugged portable SSDs",
      "High write endurance",
      "Surveillance-ready storage",
    ],
    glowColor: "rgba(255, 117, 19, 0.45)",
  },
  ARKTEK: {
    tagline: "Graphics Cards",
    description:
      "Accessible gaming and creator GPUs with quiet thermal designs — smooth frames and VR-ready performance at honest value.",
    bullets: [
      "Entry to mid-range GPUs",
      "Quiet dual-fan thermal design",
      "VR-ready options",
      "Exceptional value",
    ],
    glowColor: "rgba(223, 76, 115, 0.45)",
  },
  Kingston: {
    tagline: "Portable SSDs & Memory",
    description:
      "Compact, pocket-sized solid-state storage and memory trusted worldwide — move gigabytes in seconds, anywhere.",
    bullets: [
      "Compact portable SSDs",
      "USB 3.2 Gen2 speeds",
      "Rugged, shock-resistant builds",
      "Trusted globally",
    ],
    glowColor: "rgba(223, 76, 115, 0.40)",
  },
  Samsung: {
    tagline: "Portable SSDs",
    description:
      "Premium portable solid-state drives — flagship speeds in a slim, drop- and dust-resistant shell that travels anywhere.",
    bullets: [
      "T7 & T7 Shield series",
      "Up to 1,050 MB/s",
      "Drop & dust resistant",
      "Sleek, premium design",
    ],
    glowColor: "rgba(40, 111, 180, 0.40)",
  },
  WD: {
    tagline: "NVMe SSDs",
    description:
      "Western Digital NVme storage tuned for gamers and creators — sustained bandwidth, game-optimized firmware, long warranty.",
    bullets: [
      "WD Blue & Black NVMe",
      "Up to 7,000 MB/s",
      "Game-optimized firmware",
      "5-year warranty",
    ],
    glowColor: "rgba(16, 185, 129, 0.40)",
  },
  TEAMGROUP: {
    tagline: "Memory & Storage",
    description:
      "High-frequency memory kits and value SSDs — from everyday upgrades to RGB-lit enthusiast builds.",
    bullets: [
      "DDR4 & DDR5 kits",
      "RGB-enabled options",
      "High-frequency tuning",
      "Great value",
    ],
    glowColor: "rgba(223, 76, 115, 0.40)",
  },
  MSI: {
    tagline: "Motherboards",
    description:
      "Robust gaming and creator motherboards with strong VRMs and refined firmware — a reliable foundation for any build.",
    bullets: [
      "Intel & AMD platforms",
      "Robust VRM power delivery",
      "Gaming-class networking & audio",
      "Battle-tested reliability",
    ],
    glowColor: "rgba(255, 0, 0, 0.35)",
  },
  SanDisk: {
    tagline: "Memory Cards & Storage",
    description:
      "Extreme Pro SD and microSD cards plus portable storage — built for 4K video and fast, dependable capture.",
    bullets: [
      "Extreme Pro SD & microSD",
      "Up to 200 MB/s",
      "4K video ready",
      "Durable, weather-resistant",
    ],
    glowColor: "rgba(237, 28, 36, 0.40)",
  },
  Toshiba: {
    tagline: "Reliable Storage",
    description: "Proven HDD and SSD storage with the longevity Toshiba is known for.",
    bullets: ["Dependable HDD & SSD", "Long service life", "Backed by heritage"],
    glowColor: "rgba(255, 0, 0, 0.35)",
  },
  ZOTAC: {
    tagline: "Graphics Cards",
    description: "Compact GeForce graphics cards — serious performance in space-saving designs.",
    bullets: ["GeForce RTX series", "Compact form factors", "IceStorm cooling"],
    glowColor: "rgba(40, 111, 180, 0.40)",
  },
  PNY: {
    tagline: "Graphics Cards",
    description: "GeForce and workstation GPUs for gaming and creative professionals.",
    bullets: ["GeForce RTX GPUs", "Workstation options", "Reliable thermals"],
    glowColor: "rgba(0, 92, 169, 0.40)",
  },
};

const GENERIC_COPY: BrandCopy = {
  tagline: "Premium Components",
  description:
    "Authentic components sourced directly from authorized manufacturers, backed by full warranty.",
  bullets: ["Authorized distributor", "Genuine products", "Full manufacturer warranty"],
  glowColor: "rgba(176, 221, 228, 0.40)",
};

function brandCopy(brand: string): BrandCopy {
  return BRAND_COPY[brand] ?? GENERIC_COPY;
}

/* ──────────────────────────────────────────────────────────────────
   Builder — group live products into BrandStory sections
   ────────────────────────────────────────────────────────────────── */

function pickHeroImage(products: Product[]): { image: string; gallery: string[] } {
  for (const p of products) {
    const gallery = p.gallery?.length ? p.gallery : [];
    const image = p.image || gallery[0] || "";
    if (image) return { image, gallery };
  }
  return { image: "", gallery: [] };
}

/**
 * Group a flat product list into ordered `BrandStory` sections.
 *
 * Brands present in the CMS are rendered first, in `CANONICAL_BRAND_ORDER`;
 * any unexpected brands are appended alphabetically. When `products` is empty
 * the canonical fallback set is returned so the page still tells its story.
 */
export function buildBrandStories(products: Product[]): BrandStory[] {
  if (!products.length) return FALLBACK_BRAND_STORIES;

  // Group products by brand display name.
  const groups = new Map<string, Product[]>();
  for (const p of products) {
    const key = p.brand || "Other";
    const list = groups.get(key);
    if (list) list.push(p);
    else groups.set(key, [p]);
  }

  // Order: canonical first (in defined order), then the rest A–Z.
  const present = new Set(groups.keys());
  const ordered = [
    ...CANONICAL_BRAND_ORDER.filter((b) => present.has(b)),
    ...[...present]
      .filter((b) => !(CANONICAL_BRAND_ORDER as readonly string[]).includes(b))
      .sort((a, b) => a.localeCompare(b)),
  ];

  return ordered.map((brand) => {
    const items = groups.get(brand)!;
    const brandSlug =
      items[0]?.brandSlug || brand.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const { image, gallery } = pickHeroImage(items);
    const copy = brandCopy(brand);
    return {
      id: brandSlug,
      brand,
      brandSlug,
      accent: BRAND_ACCENTS[brand] ?? "from-[#286FB4] to-[#B0DDE4]",
      glowColor: copy.glowColor,
      logo: BRAND_LOGOS[brandSlug],
      tagline: copy.tagline,
      description: copy.description,
      bullets: copy.bullets,
      image,
      gallery,
      productCount: items.length,
      sampleProducts: items.slice(0, 4),
      href: `/hardware/product-catalog?brand=${encodeURIComponent(brandSlug)}`,
    };
  });
}

/* ──────────────────────────────────────────────────────────────────
   Static fallback stories (used when the CMS has no products)
   ────────────────────────────────────────────────────────────────── */

function fallbackStory(brand: string): BrandStory {
  const brandSlug = brand.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const copy = brandCopy(brand);
  return {
    id: brandSlug,
    brand,
    brandSlug,
    accent: BRAND_ACCENTS[brand] ?? "from-[#286FB4] to-[#B0DDE4]",
    glowColor: copy.glowColor,
    logo: BRAND_LOGOS[brandSlug],
    tagline: copy.tagline,
    description: copy.description,
    bullets: copy.bullets,
    image: BRAND_LOGOS[brandSlug] || "",
    gallery: [],
    productCount: 0,
    sampleProducts: [],
    href: `/hardware/product-catalog?brand=${encodeURIComponent(brandSlug)}`,
  };
}

/** Subset of canonical brands shown when no live products exist. */
export const FALLBACK_BRAND_STORIES: BrandStory[] = [
  "Crucial",
  "HIKVISION",
  "ARKTEK",
  "Kingston",
  "Samsung",
  "WD",
  "TEAMGROUP",
  "MSI",
].map(fallbackStory);

/* ──────────────────────────────────────────────────────────────────
   Static marketing sections
   ────────────────────────────────────────────────────────────────── */

export const HERO_COPY = {
  eyebrow: "Computer Components",
  lines: ["Build Faster.", "Work Smarter.", "Game Better."],
  sub: "Premium components from global brands — SSDs, memory, graphics cards and motherboards, sourced directly from authorized manufacturers with full warranty.",
  primaryCta: { label: "Browse Components", href: "#brands" },
  secondaryCta: { label: "View Full Catalog", href: "/hardware/product-catalog" },
};

export const FEATURE_STRIP_ITEMS: FeatureItem[] = [
  { icon: "zap", title: "High Performance", copy: "Gen5 SSDs & DDR5 memory" },
  { icon: "truck", title: "Fast Delivery", copy: "Nationwide, tracked" },
  { icon: "shield", title: "Official Warranty", copy: "Full manufacturer cover" },
  { icon: "globe", title: "Global Brands", copy: "Authorized distributor" },
];

export const ECOSYSTEM_BRANDS: EcosystemBrand[] = [
  { name: "Crucial", logo: BRAND_LOGOS.crucial, tagline: "SSDs & Memory" },
  { name: "HIKVISION", logo: BRAND_LOGOS.hikvision, tagline: "SSDs" },
  { name: "Samsung", logo: BRAND_LOGOS.samsung, tagline: "Portable SSDs" },
  { name: "Kingston", logo: BRAND_LOGOS.kingston, tagline: "Portable SSDs" },
  { name: "WD", logo: BRAND_LOGOS.wd, tagline: "NVMe SSDs" },
  { name: "TEAMGROUP", logo: BRAND_LOGOS.teamgroup, tagline: "Memory" },
  { name: "ARKTEK", logo: BRAND_LOGOS.arktek, tagline: "Graphics" },
  { name: "MSI", logo: BRAND_LOGOS.msi, tagline: "Motherboards" },
];

export const TECH_SHOWCASE_ITEMS: TechShowcaseItem[] = [
  {
    eyebrow: "Interface",
    title: "PCIe Gen5",
    highlight: "Twice the bandwidth.",
    copy: "Next-generation storage and expansion with double the bandwidth of Gen4 — ready for the fastest NVMe drives and GPUs.",
    reverse: false,
    accent: "primary",
  },
  {
    eyebrow: "Memory",
    title: "DDR5",
    highlight: "Higher speed. Lower latency.",
    copy: "Faster frequencies, better power regulation and larger capacities keep modern platforms fed and responsive.",
    reverse: true,
    accent: "teal",
  },
  {
    eyebrow: "Storage",
    title: "NVMe SSD",
    highlight: "Up to 7,000 MB/s.",
    copy: "Sequential read speeds that obliterate load times — boot, transfer and render at the speed of thought.",
    reverse: false,
    accent: "pink",
  },
];

export const WHY_CHOOSE_STATS: WhyChooseStat[] = [
  { value: 20, suffix: "+", label: "Years in distribution" },
  { value: 20, suffix: "+", label: "Global brands" },
  { value: 100, suffix: "%", label: "Genuine products" },
];

export const WHY_CHOOSE_POINTS: string[] = [
  "Genuine products, authorized distributor",
  "Full manufacturer warranty support",
  "Expert pre-sales technical consultation",
  "Nationwide tracked delivery",
];

export const CTA_COPY = {
  eyebrow: "Ready when you are",
  title: "Ready to build your next PC?",
  sub: "Explore the full components catalog or talk to our team for a tailored configuration.",
  primaryCta: { label: "Explore Components", href: "/hardware/product-catalog" },
  secondaryCta: { label: "Contact Sales", href: "/contact" },
};
