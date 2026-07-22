import {
  ShoppingBag,
  Truck,
  Package,
  Building2,
  Headphones,
  ShieldCheck,
  Handshake,
  HelpCircle,
  type LucideIcon,
} from "lucide-react";

/**
 * Centralised category metadata for the FAQ page.
 * Cohesive enterprise-blue system: every category shares the same blue
 * accent and is differentiated by its ICON (not by a per-category hue).
 *
 * NOTE: keep class strings as static literals — Tailwind v4 scans this
 * file. The accent classes below are intentionally not category-specific.
 */
export interface CategoryMeta {
  icon: LucideIcon;
  description: string;
}

export const CATEGORY_META: Record<string, CategoryMeta> = {
  "Ordering & Pricing": {
    icon: ShoppingBag,
    description:
      "Placing orders, payment methods, volume discounts, and minimum order quantities.",
  },
  "Shipping & Delivery": {
    icon: Truck,
    description:
      "Shipping regions, delivery timelines, and expedited shipping options.",
  },
  "Products & Brands": {
    icon: Package,
    description:
      "Authorized brands, product warranties, and technical documentation.",
  },
  "Company Information": {
    icon: Building2,
    description:
      "General information about Simal Technologies, our location, and history.",
  },
  "Returns & Warranty": {
    icon: ShieldCheck,
    description:
      "Policies and procedures for returns, warranty claims, and replacements.",
  },
  "Technical Support": {
    icon: Headphones,
    description:
      "Help with technical issues, installation services, and maintenance contracts.",
  },
  "Partnership & Reseller": {
    icon: Handshake,
    description:
      "Becoming a reseller and partner program benefits.",
  },
};

/** Ordered list of categories shown as Quick-Help cards / sections. */
export const CATEGORY_DISPLAY_ORDER = [
  "Ordering & Pricing",
  "Shipping & Delivery",
  "Returns & Warranty",
  "Products & Brands",
  "Company Information",
  "Technical Support",
];

export function getCategoryMeta(category: string): CategoryMeta {
  return (
    CATEGORY_META[category] ?? {
      icon: HelpCircle,
      description: "",
    }
  );
}

/** Canonical anchor id for a category — used by sidebar, grid, and sections. */
export function getSectionId(category: string): string {
  return category
    .toLowerCase()
    .replace(/&/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}
