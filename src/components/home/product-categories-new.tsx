"use client";

import Link from "next/link";
import {
  ArrowRight,
  Cpu,
  Cable,
  Monitor,
  Gamepad2,
  Laptop,
  HardDrive,
} from "lucide-react";
import { SectionShell } from "@/components/ui/section-shell";
import { SectionHeading } from "@/components/ui/section-heading";

interface CategoryData {
  id: string;
  slug: string;
  name: string;
  description: string;
  image: string;
  badge: string;
  subLabel: string;
}

interface CMSCategory {
  id: string;
  title?: string;
  slug?: string;
  description?: string;
  image?: { url?: string; alt?: string };
  badge?: string;
  subLabel?: string;
}

const CATEGORIES_DATA: CategoryData[] = [
  {
    id: "cat-1",
    slug: "computer-components",
    name: "Computer Components",
    description:
      "High-performance CPUs, GPUs, motherboards, and RAM modules from Crucial, ARKTEK, MSI, and TEAMGROUP.",
    image: "/assets/images/products/msi/p51_msi-mb_2a49c54d16.jpg",
    badge: "Popular",
    subLabel: "Components",
  },
  {
    id: "cat-2",
    slug: "computer-accessories",
    name: "Computer Accessories",
    description:
      "Docking stations, cables, USB hubs, adapters, surge protectors, and conferencing gear.",
    image: "/assets/images/products/ugreen/p64_71QcHTPDuL_1f184ad91a.png",
    badge: "Essential",
    subLabel: "Accessories",
  },
  {
    id: "cat-3",
    slug: "monitors",
    name: "Monitors & Displays",
    description:
      "Gaming, professional, 4K, and ultrawide monitors from Aiwa, KOORUI, and premium display brands.",
    image:
      "/assets/images/products/koorui/p48_koorui-monitor34-1_ee8eac06db.jpg",
    badge: "Featured",
    subLabel: "Displays",
  },
  {
    id: "cat-4",
    slug: "gaming",
    name: "Gaming Gear",
    description:
      "High-performance gaming peripherals, graphics cards, and motherboards for enthusiasts and competitive players.",
    image: "/assets/images/products/arktek/p6_RTX3060-12GB.jpg",
    badge: "Trending",
    subLabel: "Gaming",
  },
  {
    id: "cat-5",
    slug: "laptops",
    name: "Business Laptops",
    description:
      "Business, gaming, and ultrabook laptops from Dell, HP, and Lenovo — built for productivity and performance.",
    image: "/assets/images/products/lenovo/p50_lenovo-pc_f57a1d7dbd.jpg",
    badge: "Enterprise",
    subLabel: "Computing",
  },
  {
    id: "cat-6",
    slug: "computer-components",
    name: "Storage Solutions",
    description:
      "SSDs, HDDs, portable drives, and NAS-ready solutions from Crucial, Samsung, WD, Kingston, HIKVISION, and Toshiba.",
    image:
      "/assets/images/products/crucial/p15_P510_with_heatsink-24e5ebbb45e5d96a_bad44ce903.webp",
    badge: "In Demand",
    subLabel: "Storage",
  },
];

const CATEGORY_BY_NAME = new Map(CATEGORIES_DATA.map((c) => [c.name, c]));

const CATEGORY_ICONS: Record<
  string,
  React.ComponentType<{ size?: number; strokeWidth?: number }>
> = {
  "Computer Components": Cpu,
  "Computer Accessories": Cable,
  "Monitors & Displays": Monitor,
  "Gaming Gear": Gamepad2,
  "Business Laptops": Laptop,
  "Storage Solutions": HardDrive,
};

export default function ProductCategorySection({
  badge: badgeLabel,
  heading,
  subtext,
  categories: cmsCategories,
}: {
  badge?: string;
  heading?: string;
  subtext?: string;
  categories?: unknown[];
} = {}) {
  const displayBadge = badgeLabel || "Product Range";
  const displayHeading = heading || "Discover Our Complete Product Range.";
  const displaySubtext =
    subtext ||
    "From desktop memory to enterprise SSDs — we distribute, supply, and support the full spectrum of IT hardware technology across the Middle East, Africa, CIS & GCC.";

  const categories =
    cmsCategories && cmsCategories.length > 0
      ? (cmsCategories as CMSCategory[]).map((c, i) => {
          const fallback = CATEGORY_BY_NAME.get(c.title ?? "");
          return {
            id: c.id || `cat-cms-${i}`,
            slug: c.slug || fallback?.slug || "",
            name: c.title ?? "",
            description: c.description ?? "",
            image: c.image?.url || fallback?.image || "",
            badge: c.badge || fallback?.badge || "New",
            subLabel: c.subLabel || fallback?.subLabel || "",
          };
        })
      : CATEGORIES_DATA;

  return (
    <SectionShell id="product-categories" variant="default">
      <SectionHeading
        eyebrow={displayBadge}
        title={displayHeading}
        subtitle={displaySubtext}
        align="center"
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((cat) => {
          const IconComponent = CATEGORY_ICONS[cat.name];
          return (
            <Link
              key={cat.id}
              href={`/hardware/${cat.slug}`}
              className="group block border border-border bg-card p-6 transition-colors hover:border-primary/50"
            >
              {IconComponent && (
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center bg-primary text-primary-foreground transition-colors">
                  <IconComponent size={26} strokeWidth={1.6} />
                </div>
              )}

              <h3 className="text-lg font-semibold text-foreground">
                {cat.name}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {cat.description}
              </p>

              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                Read More
                <ArrowRight
                  size={14}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </span>
            </Link>
          );
        })}
      </div>
    </SectionShell>
  );
}
