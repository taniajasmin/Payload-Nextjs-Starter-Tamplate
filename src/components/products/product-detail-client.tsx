"use client";

import { useState } from "react";
import { FileText, MessageCircle } from "lucide-react";
import {
  BRAND_LOGOS,
  type Product,
  getStockStatus,
  STOCK_BADGE_STYLES,
  WHATSAPP_NUMBER,
} from "@/lib/product-config";
import { resolveProductImage } from "@/lib/product-image";
import { SafeImage } from "@/components/ui/safe-image";

// ─── Product Gallery ──────────────────────────────────────────────────

export function ProductGallery({ product }: { product: Product }) {
  const mainImage = resolveProductImage(product);
  const allImages = [
    mainImage,
    ...product.gallery.filter((g) => g && g !== product.image),
  ];
  const validImages = allImages.filter((img) => img && img.trim() !== "");

  const [failed, setFailed] = useState<Set<string>>(new Set());
  const markFailed = (url: string) =>
    setFailed((prev) => {
      if (prev.has(url)) return prev;
      const next = new Set(prev);
      next.add(url);
      return next;
    });

  const [activeIdx, setActiveIdx] = useState(0);

  const shownImages = validImages.filter((img) => !failed.has(img));
  const safeActiveIdx = Math.min(activeIdx, Math.max(shownImages.length - 1, 0));
  const mainSrc = shownImages[safeActiveIdx] || "";

  return (
    <div className="space-y-4 lg:max-w-md lg:mx-auto">
      {/* Main Image */}
      <div className="relative flex items-center justify-center">
        {mainSrc ? (
          <SafeImage
            src={mainSrc}
            alt={product.name}
            className="max-h-[420px] w-auto max-w-full object-contain"
          />
        ) : null}
        {/* Brand logo badge */}
        {BRAND_LOGOS[product.brandSlug] && (
          <div className="absolute left-3 top-3 border border-border bg-card p-2 sm:left-4 sm:top-4">
            <SafeImage
              src={BRAND_LOGOS[product.brandSlug]}
              alt={product.brand}
              className="h-5 w-auto object-contain sm:h-6"
            />
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {shownImages.length > 1 && (
        <div className="grid grid-cols-4 gap-2 sm:gap-3">
          {shownImages.slice(0, 4).map((img, idx) => (
            <button
              key={img}
              className={`overflow-hidden border-2 bg-muted/50 transition-all focus:outline-none ${
                idx === safeActiveIdx
                  ? "border-primary"
                  : "border-border hover:border-primary/50"
              }`}
              onClick={() => setActiveIdx(idx)}
            >
              <SafeImage
                src={img}
                alt={`${product.name} gallery ${idx + 1}`}
                className="h-full w-full object-contain p-1 sm:p-1.5"
                loading="lazy"
                onError={() => markFailed(img)}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Product Actions ──────────────────────────────────────────────────

export function ProductActions({ product }: { product: Product }) {
  const stock = getStockStatus(product);
  const badge = STOCK_BADGE_STYLES[stock];
  const whatsappMsg = encodeURIComponent(
    `Hi, I'm interested in: ${product.name} (${product.sku})`,
  );
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMsg}`;
  const hasDatasheet = product.tags.some(
    (t) => t.toLowerCase() === "datasheet" || t.toLowerCase() === "pdf",
  );

  return (
    <div>
      {/* Header bar with stock status */}
      <div className="flex items-center justify-between border-b border-border px-4 py-2">
        <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
          Enquiry
        </span>
        <span
          className={`inline-flex items-center gap-1.5 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${badge.className}`}
        >
          <span className={`h-1.5 w-1.5 ${badge.dotClass}`} />
          {badge.label}
        </span>
      </div>

      {/* Action buttons */}
      <div className="space-y-3 p-4">
        {/* Request Quote — primary CTA */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-full items-center justify-center gap-2 bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Request Quote
        </a>

        {/* WhatsApp */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-full items-center justify-center gap-2 border border-border px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
        >
          <MessageCircle className="h-4 w-4" />
          Inquire on WhatsApp
        </a>

        {/* Datasheet download */}
        {hasDatasheet && (
          <a
            href={`/api/products/${product.slug}/datasheet`}
            className="inline-flex w-full items-center justify-center gap-2 border border-border px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
          >
            <FileText className="h-4 w-4" />
            Download Datasheet
          </a>
        )}
      </div>
    </div>
  );
}
