/**
 * Product UI configuration — shared type + theming constants.
 *
 * Product/brand/category *content* lives in the Payload CMS (see
 * `lib/fetch-products.ts`). This file holds only the non-data pieces that the
 * frontend needs to render products: the shared `Product` shape and the
 * per-brand/category presentation constants (accent gradients, logo paths,
 * slug→title lookups).
 */

export interface Product {
  id: number
  sku: string
  name: string
  slug: string
  description: string
  brand: string
  brandSlug: string
  category: string
  categorySlug: string
  image: string
  gallery: string[]
  tags: string[]
  attributes?: Record<string, string>
}

// Category slug → display title
export const CATEGORY_MAP: Record<string, string> = {
  'computer-components': 'Computer Components',
  'computer-accessories': 'Computer Accessories',
  'monitors': 'Monitors',
  'gaming': 'Gaming',
  'laptops': 'Laptops',
}

// Brand accent colors for UI theming
export const BRAND_ACCENTS: Record<string, string> = {
  Aiwa: 'from-[#D1A080] to-[#B0DDE4]',
  ARKTEK: 'from-[#D1A080] to-[#DF4C73]',
  Crucial: 'from-[#286FB4] to-[#B0DDE4]',
  Dell: 'from-[#286FB4] to-[#B0DDE4]',
  HIKVISION: 'from-[#FF7513] to-[#E0620A]',
  Honeywell: 'from-[#286FB4] to-[#DF4C73]',
  HP: 'from-[#0096D6] to-[#B0DDE4]',
  Kingston: 'from-[#DF4C73] to-[#286FB4]',
  KOORUI: 'from-[#DF4C73] to-[#D1A080]',
  Lenovo: 'from-[#E2231A] to-[#B0DDE4]',
  MSI: 'from-[#FF0000] to-[#D1A080]',
  Nearity: 'from-[#B0DDE4] to-[#286FB4]',
  PNY: 'from-[#005CA9] to-[#B0DDE4]',
  Samsung: 'from-[#1A1D2E] to-[#286FB4]',
  SanDisk: 'from-[#ED1C24] to-[#D1A080]',
  TEAMGROUP: 'from-[#DF4C73] to-[#FF7513]',
  Toshiba: 'from-[#FF0000] to-[#B0DDE4]',
  UGREEN: 'from-[#B0DDE4] to-[#8BC8D2]',
  WD: 'from-[#005128] to-[#B0DDE4]',
  ZOTAC: 'from-[#000000] to-[#286FB4]',
}

// Brand slug → logo asset path
export const BRAND_LOGOS: Record<string, string> = {
  aiwa: '/assets/images/brands/aiwa/brand_2_Aiwa-Brand-Logo_d8bedf47c4.png',
  arktek: '/assets/images/brands/arktek/logo_4_ARKTEK_Artek-Brand-Logo-01_5ec18bbfc1.png',
  crucial: '/assets/images/brands/crucial/logo_5_Crucial_Crucial-Logo-01-01_bc0d83ee79.png',
  dell: '/assets/images/brands/dell/logo_6_Dell_dell_2951a26c53.png',
  hikvision: '/assets/images/brands/hikvision/logo_7_HIKVISION_Hikvision-Logo-01_f6dca83b30.png',
  honeywell: '/assets/images/brands/honeywell/honeywell-logo-color.svg',
  hp: '/assets/images/brands/hp/hp-logo.png',
  kingston: '/assets/images/brands/kingston/logo_10_Kingston_kingston_e2fc2908f0.png',
  koorui: '/assets/images/brands/koorui/logo_2_Koorui_Logo_Untitled-design-34_1b8fa186b4.png',
  lenovo: '/assets/images/brands/lenovo/logo_12_Lenovo_lenovo_eeb3c6f768.png',
  msi: '/assets/images/brands/msi/msi-logo-color.svg',
  nearity: '/assets/images/brands/nearity/logo_14_Nearity_channels4_profile_75811eaaab.jpg',
  pny: '/assets/images/brands/pny/pny-logo-color.svg',
  samsung: '/assets/images/brands/samsung/logo_16_Samsung_samsung-1_8a79d48aa8.png',
  sandisk: '/assets/images/brands/sandisk/logo_17_SanDisk_SanDisk-Logo_2be1d97bf0.png',
  teamgroup: '/assets/images/brands/teamgroup/brand_11_teamgroup-Brand-Logo_5f2f19a0ac.png',
  toshiba: '/assets/images/brands/toshiba/logo_19_Toshiba_TOSHIBA_Logo_d8683517e2.png',
  ugreen: '/assets/images/brands/ugreen/ugreen.png',
  wd: '/assets/images/brands/wd/wd-logo-color.svg',
  zotac: '/assets/images/brands/zotac/zotac-logo-color.svg',
  inno3d: '/assets/images/brands/inno3d/inno3d-logo-color.svg',
}

/** Spec keys too generic/redundant to surface on product cards — hidden from
 *  the spec grid, the spec-label lines, and the fallback description. */
export const HIDDEN_SPEC_KEYS = new Set(["bus", "type", "gpu"]);

// ─── Stock status ────────────────────────────────────────────────────

export type StockStatus = "in-stock" | "limited" | "out-of-stock" | "discontinued";

/** Derive a stock-status label from the product's CMS tags. */
export function getStockStatus(product: Product): StockStatus {
  const tagsLower = product.tags.map((t) => t.toLowerCase());
  if (tagsLower.some((t) => t.includes("out-of-stock") || t.includes("out of stock")))
    return "out-of-stock";
  if (tagsLower.some((t) => t.includes("discontinued"))) return "discontinued";
  if (tagsLower.some((t) => t.includes("limited") || t.includes("low-stock")))
    return "limited";
  return "in-stock";
}

export const STOCK_BADGE_STYLES: Record<
  StockStatus,
  { label: string; className: string; dotClass: string }
> = {
  "in-stock": {
    label: "In Stock",
    className: "bg-emerald-50 text-emerald-700",
    dotClass: "bg-emerald-500",
  },
  limited: {
    label: "Limited Stock",
    className: "bg-amber-50 text-amber-700",
    dotClass: "bg-amber-500",
  },
  "out-of-stock": {
    label: "Out of Stock",
    className: "bg-red-50 text-red-700",
    dotClass: "bg-red-500",
  },
  discontinued: {
    label: "Discontinued",
    className: "bg-neutral-100 text-neutral-500",
    dotClass: "bg-neutral-400",
  },
};

export const WHATSAPP_NUMBER = "+971543088655";

/**
 * Plain-text short description for a product card. Uses the CMS description
 * when present; otherwise builds an informative fallback from the key spec
 * values (or the name) + category so every card shows copy.
 */
export function productShortDescription(product: Product, max = 140): string {
  const clean = (s: string) => s.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  const truncate = (s: string): string =>
    s.length <= max ? s : s.slice(0, Math.max(0, s.lastIndexOf(" ", max))) + "…";

  const cms = truncate(clean(product.description || ""));
  if (cms) return cms;

  const specs = Object.entries(product.attributes ?? {})
    .filter(([k, v]) => {
      const val = String(v ?? "").trim();
      return val.length > 0 && !HIDDEN_SPEC_KEYS.has(k.toLowerCase());
    })
    .map(([, v]) => String(v).trim())
    .slice(0, 4);
  const lead = specs.join(" · ") || product.name;
  const category = product.category || "product";
  return truncate(
    `${lead}. Authentic ${category} from an authorized distributor with full manufacturer warranty.`,
  );
}
