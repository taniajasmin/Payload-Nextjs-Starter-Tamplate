"use client";

import { useLivePreview } from "@/hooks/use-live-preview";
import { mediaUrl } from "@/lib/media-url";
import { HardwareSubNav } from "@/components/hardware/hardware-sub-nav";
import { ProductCatalogClient } from "@/components/products/product-catalog-client";
import type { Product } from "@/lib/product-config";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Gaming — Simal Technologies",
  url: "https://www.simalme.com/hardware/gaming",
};

interface Props {
  initialData: Record<string, unknown>;
  products: Product[];
}

export function GamingPageClient({ initialData, products }: Props) {
  const data = useLivePreview(initialData);

  const hero = data.hero as { headline?: string; description?: string } | undefined;
  const heroBackgroundImage = data.heroBackgroundImage as { url?: string; alt?: string } | undefined;
  const heroHeadline = hero?.headline || "Gaming";
  const heroDescription = hero?.description || `Browse our complete range of <strong class="text-white">${products.length} authentic gaming products</strong> from leading brands. Gaming GPUs, monitors, motherboards, and high-speed storage — sourced directly from authorized manufacturers with full warranty.`;
  const relatedLinks = (data.relatedLinks as string) || `Related Categories: <a href="/hardware/product-catalog" class="underline hover:text-neutral-900">Full Product Catalog</a> | <a href="/hardware/computer-components" class="underline hover:text-neutral-900">Computer Components</a> | <a href="/hardware/monitors" class="underline hover:text-neutral-900">Monitors</a> | <a href="/hardware/computer-accessories" class="underline hover:text-neutral-900">Computer Accessories</a> | <a href="/hardware/laptops" class="underline hover:text-neutral-900">Laptops</a>`;

  return (
    <div className="flex flex-col">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <div className="relative bg-neutral-950 text-white">
        <img
          src={mediaUrl(heroBackgroundImage?.url || "/assets/images/homepage/hello.avif")}
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-[center_75%] blur-[2px]"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 container-primary py-16 md:py-20">
          <h1 className="text-[length:var(--font-hero-heading)] font-bold tracking-tight">
            {heroHeadline}
          </h1>
          <p
            className="mt-4 text-[length:var(--font-body)] text-neutral-300 max-w-3xl"
            dangerouslySetInnerHTML={{ __html: heroDescription }}
          />
        </div>
      </div>

      <HardwareSubNav />

      {/* Catalog — filtered to gaming only */}
      <ProductCatalogClient
        products={products}
        pageTitle="Gaming"
        hideCategoryFilter={true}
        cardAspectRatio="3/2"
        cardObjectFit="cover"
        cardColumns={4}
      />

      {/* Related */}
      <div className="bg-neutral-50 text-neutral-900">
        <div className="container-primary py-10">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-neutral-600" dangerouslySetInnerHTML={{ __html: relatedLinks }} />
          </div>
        </div>
      </div>
    </div>
  );
}
