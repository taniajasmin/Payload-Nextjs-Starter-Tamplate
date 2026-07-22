"use client";

import Link from "next/link";
import { mediaUrl } from "@/lib/media-url";
import { type Product, productShortDescription } from "@/lib/product-config";

interface ProductGridCardProps {
  product: Product;
  index?: number;
  aspectRatio?: string;
  objectFit?: "contain" | "cover";
}

export function ProductGridCard({
  product,
  index = 0,
  aspectRatio = "1/1",
  objectFit = "contain",
}: ProductGridCardProps) {
  const description = productShortDescription(product);

  return (
    <article className="group flex flex-col border border-border bg-card">
      {/* Image + info — linked */}
      <Link href={`/products/${product.slug}`} className="flex flex-col flex-1">
        <div
          className="relative flex items-center justify-center overflow-hidden border-b border-border bg-muted/50"
          style={{ aspectRatio }}
        >
          {product.image ? (
            <img
              src={mediaUrl(product.image)}
              alt={product.name}
              className={`h-full w-full p-6 ${objectFit === "cover" ? "object-cover" : "object-contain"}`}
              loading={index < 12 ? "eager" : "lazy"}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center p-6 text-muted-foreground/30">
              <svg className="h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="2" />
                <circle cx="8.5" cy="8.5" r="1.5" strokeWidth="2" />
                <path d="m21 15-5-5L5 21" strokeWidth="2" />
              </svg>
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col p-5">
          {product.brand && (
            <p className="text-xs font-bold uppercase tracking-wider text-primary">
              {product.brand}
            </p>
          )}
          <h3 className="mt-1 line-clamp-2 text-sm font-bold leading-snug text-foreground">
            {product.name}
          </h3>
          <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
            {description}
          </p>
        </div>
      </Link>

      {/* Details button — separate link, no nesting */}
      <div className="px-5 pb-5">
        <Link
          href={`/products/${product.slug}`}
          className="inline-flex w-full items-center justify-center gap-1.5 border border-border px-4 py-2 text-xs font-semibold text-foreground transition-colors hover:bg-primary hover:text-primary-foreground hover:border-primary"
        >
          Details
        </Link>
      </div>
    </article>
  );
}
