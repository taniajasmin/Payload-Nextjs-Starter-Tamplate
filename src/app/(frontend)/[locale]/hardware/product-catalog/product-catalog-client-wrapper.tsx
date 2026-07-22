"use client";

import Script from "next/script";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useLivePreview } from "@/hooks/use-live-preview";
import { ProductCatalogClient } from "@/components/products/product-catalog-client";
import type { Product } from "@/lib/product-config";

interface ProductCatalogPageClientProps {
  initialData: Record<string, unknown>;
  products: Product[];
}

export function ProductCatalogPageClient({
  initialData,
  products,
}: ProductCatalogPageClientProps) {
  const data = useLivePreview(initialData);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Simal Technologies Product Catalog",
    url: "https://www.simalme.com/hardware/product-catalog",
    numberOfItems: products.length,
    itemListElement: products.slice(0, 100).map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: p.name,
      url: `https://www.simalme.com/products/${p.slug}`,
    })),
  };

  const sectionHeading = (data.heading as string) || "Complete IT Hardware Catalog";
  const sectionSubtext =
    (data.subtext as string) ||
    "Explore our full range of authentic IT hardware from authorized brands — components, accessories, monitors, gaming gear, and laptops sourced directly with full manufacturer warranty.";

  return (
    <>
      {/* JSON-LD via next/script */}
      <Script
        id="product-catalog-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="bg-muted">
        <div className="container-primary pt-12 md:pt-16 lg:pt-20">
          {/* Breadcrumb navigation */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="transition-colors hover:text-primary">
                  Home
                </Link>
              </li>
              <li>
                <ChevronRight className="h-3.5 w-3.5" />
              </li>
              <li>
                <Link href="/hardware" className="transition-colors hover:text-primary">
                  Hardware
                </Link>
              </li>
              <li>
                <ChevronRight className="h-3.5 w-3.5" />
              </li>
              <li className="font-medium text-foreground">Product Catalog</li>
            </ol>
          </nav>

          {/* Section identifier bar */}
          <div className="mb-8 flex items-center gap-4 border-b border-border pb-4">
            <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Hardware
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
              {products.length}+ Products
            </span>
          </div>

          {/* Eyebrow + heading */}
          <span className="mb-4 inline-block border-l-2 border-primary pl-3 text-xs font-bold uppercase tracking-widest text-primary">
            Product Catalog
          </span>

          <h1 className="max-w-2xl text-3xl font-extrabold leading-[1.1] tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            {sectionHeading}
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
            {sectionSubtext}
          </p>
        </div>

        {/* The filterable catalog */}
        <div className="mt-10">
          <ProductCatalogClient products={products} pageTitle="Product Catalog" />
        </div>
      </section>
    </>
  );
}
