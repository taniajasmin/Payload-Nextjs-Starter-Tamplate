"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { useLivePreview } from "@/hooks/use-live-preview";
import { mediaUrl } from "@/lib/media-url";
import { HardwareSubNav } from "@/components/hardware/hardware-sub-nav";
import { ProductCatalogClient } from "@/components/products/product-catalog-client";
import type { Product } from "@/lib/product-config";
import { Laptop, Sparkles, ShieldCheck, Truck } from "lucide-react";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Laptops — Simal Technologies",
  url: "https://www.simalme.com/hardware/laptops",
};

interface Props {
  initialData: Record<string, unknown>;
  products: Product[];
}

export function LaptopsPageClient({ initialData, products }: Props) {
  const data = useLivePreview(initialData);

  const hero = data.hero as { headline?: string; description?: string } | undefined;
  const heroHeadline = hero?.headline || "Laptops";
  const heroDescription = hero?.description || `Browse our complete range of <strong class="text-white">${products.length} authentic laptops</strong> from leading brands. Enterprise and professional laptops from Dell, HP, and Lenovo — sourced directly from authorized manufacturers with full warranty.`;
  const relatedLinks = (data.relatedLinks as string) || `Related Categories: <a href="/hardware/product-catalog" class="underline hover:text-primary">Full Product Catalog</a> | <a href="/hardware/computer-components" class="underline hover:text-primary">Computer Components</a> | <a href="/hardware/monitors" class="underline hover:text-primary">Monitors</a> | <a href="/hardware/computer-accessories" class="underline hover:text-primary">Computer Accessories</a> | <a href="/hardware/gaming" class="underline hover:text-primary">Gaming</a>`;

  // ── Gather 4 laptop hero images (from products or fallback) ────────
  const laptopHeroImages = useMemo(() => {
    const extracted: { src: string; alt: string; brand: string }[] = [];
    for (const p of products) {
      if (p.image) {
        extracted.push({ src: p.image, alt: p.name, brand: p.brand ?? "" });
      }
    }
    if (extracted.length >= 4) return extracted.slice(0, 4);

    // Fallback — known laptop cutout images (transparent bg)
    const fallback = [
      { src: "/assets/images/products/dell/p25_pc-dell_860f4b76ac.cutout.png", alt: "Dell 15 Laptop 14th Gen", brand: "Dell" },
      { src: "/assets/images/products/hp/p40_hp-pc_2f496acaa6.cutout.png", alt: "HP Laptop 14inch 2K Display", brand: "HP" },
      { src: "/assets/images/products/lenovo/p50_lenovo-pc_f57a1d7dbd.cutout.png", alt: "Lenovo IdeaPad Slim 3", brand: "Lenovo" },
    ];
    // Merge to ensure 4 — repeat if needed
    const merged = [...extracted, ...fallback];
    return merged.slice(0, 4);
  }, [products]);

  // Assign roles: 0=front(big), 1=back(small), 2=right(angled), 3=bottom(flat)
  const positions = [
    { label: "front",  scale: 1,     z: 40, x: "0%",   y: "0%",    rotate: 0 },
    { label: "back",   scale: 0.6,   z: 10, x: "18%",  y: "-22%",  rotate: -6 },
    { label: "right",  scale: 0.65,  z: 20, x: "20%",  y: "8%",    rotate: 10 },
    { label: "bottom", scale: 0.62,  z: 30, x: "-12%", y: "18%",   rotate: -4 },
  ];

  return (
    <div className="flex flex-col">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* ── Dark Enterprise Hero ─────────────────────────────────────── */}
      <section className="relative bg-slate-950 overflow-hidden">
        {/* Radial gradient dot grid overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.06)_0%,transparent_50%),radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.04)_0%,transparent_50%)] pointer-events-none" />

        <div className="relative z-10 container-primary py-12 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 items-center">

            {/* ── Left: Text Content ───────────────────────────────── */}
            <div className="flex flex-col items-start">
              {/* Enterprise badge */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 border-l-2 border-primary pl-3 text-xs font-bold uppercase tracking-widest text-primary mb-4"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Authorized Distributor — GCC</span>
              </motion.div>

              {/* Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                data-typography="heading"
                className="font-extrabold tracking-tight leading-[1.05] mb-2 text-white"
              >
                {heroHeadline}
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="text-[length:var(--font-body)] text-slate-300 leading-relaxed max-w-xl mb-4"
                dangerouslySetInnerHTML={{ __html: heroDescription }}
              />

              {/* Trust indicators */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-wrap gap-3"
              >
                {[
                  { icon: ShieldCheck, label: "100% Authentic" },
                  { icon: Truck, label: "JAFZA Stocked" },
                  { icon: Laptop, label: `${products.length}+ Models` },
                ].map((pill, i) => (
                  <motion.span
                    key={pill.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.5 + i * 0.08 }}
                    className="inline-flex items-center gap-2 px-3 py-1.5 border border-slate-700 bg-slate-800/50 text-[length:var(--font-badge)] font-bold uppercase tracking-wider text-slate-200"
                  >
                    <pill.icon className="w-3.5 h-3.5 text-primary" />
                    {pill.label}
                  </motion.span>
                ))}
              </motion.div>
            </div>

            {/* ── Right: Overlapping Laptop Gallery ──────────────────── */}
            <div className="relative flex items-center justify-center h-[180px] sm:h-[200px] md:h-[220px]">
              {/* Central radial glow */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[140px] h-[140px] sm:w-[160px] sm:h-[160px] bg-[radial-gradient(circle,rgba(255,255,255,0.08)_0%,transparent_70%)]" />
              </div>

              {laptopHeroImages.map((img, idx) => {
                const pos = positions[idx] ?? positions[0];
                return (
                  <motion.div
                    key={img.src}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: idx * 0.12 }}
                    className="absolute w-[42%] sm:w-[38%] aspect-[4/3]"
                    style={{
                      zIndex: pos.z,
                      transform: `translate(${pos.x}, ${pos.y}) scale(${pos.scale}) rotate(${pos.rotate}deg)`,
                    }}
                  >
                    <img
                      src={mediaUrl(img.src)}
                      alt={img.alt}
                      className="w-full h-full object-contain brightness-110"
                    />
                  </motion.div>
                );
              })}
            </div>

          </div>
        </div>
      </section>

      <HardwareSubNav />

      {/* Catalog — filtered to laptops only */}
      <ProductCatalogClient
        products={products}
        pageTitle="Laptops"
        hideCategoryFilter={true}
        cardAspectRatio="3/2"
        cardObjectFit="cover"
      />

      {/* Related */}
      <div className="border-t border-border bg-card">
        <div className="container-primary py-10">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: relatedLinks }} />
          </div>
        </div>
      </div>
    </div>
  );
}
