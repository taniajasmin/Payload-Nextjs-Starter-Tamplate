"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { useLivePreview } from "@/hooks/use-live-preview";
import { mediaUrl } from "@/lib/media-url";
import { HardwareSubNav } from "@/components/hardware/hardware-sub-nav";
import { ProductCatalogClient } from "@/components/products/product-catalog-client";
import type { Product } from "@/lib/product-config";
import { Cpu, ShieldCheck, Truck } from "lucide-react";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Computer Components — Simal Technologies",
  url: "https://www.simalme.com/hardware/computer-components",
};

interface Props {
  initialData: Record<string, unknown>;
  products: Product[];
}

export function ComputerComponentsPageClient({ initialData, products }: Props) {
  const data = useLivePreview(initialData);

  const hero = data.hero as { headline?: string; description?: string } | undefined;
  const heroHeadline = hero?.headline || "Computer Components";
  const heroDescription = hero?.description || `Browse our complete range of <strong class="text-foreground">${products.length} authentic components</strong> from leading brands. SSDs, RAM, graphics cards, and storage — sourced directly from authorized manufacturers with full warranty.`;
  const relatedLinks = (data.relatedLinks as string) || `Related Categories: <a href="/hardware/product-catalog" class="underline hover:text-foreground">Full Product Catalog</a> | <a href="/hardware/computer-accessories" class="underline hover:text-foreground">Computer Accessories</a> | <a href="/hardware/monitors" class="underline hover:text-foreground">Monitors</a> | <a href="/hardware/gaming" class="underline hover:text-foreground">Gaming</a> | <a href="/hardware/laptops" class="underline hover:text-foreground">Laptops</a>`;

  // ── Gather 3 hero images (from products or fallback) ────────────
  const heroImages = useMemo(() => {
    const extracted: { src: string; alt: string; brand: string }[] = [];
    for (const p of products) {
      if (p.image) {
        extracted.push({ src: p.image, alt: p.name, brand: p.brand ?? "" });
      }
    }
    if (extracted.length >= 3) return extracted.slice(0, 3);

    // Fallback — attractive component cutout images (transparent bg)
    const fallback = [
      { src: "/assets/images/products/crucial/p15_P510_with_heatsink-24e5ebbb45e5d96a_bad44ce903.cutout.png", alt: "Crucial P510 PCIe Gen5 SSD with Heatsink", brand: "Crucial" },
      { src: "/assets/images/products/arktek/p6_RTX3060-12GB.cutout.png", alt: "ARKTEK RTX 3060 12GB Graphics Card", brand: "ARKTEK" },
      { src: "/assets/images/products/samsung/p54_samsung-ssd_ea17010b74.cutout.png", alt: "Samsung Portable SSD", brand: "Samsung" },
    ];
    const merged = [...extracted, ...fallback];
    return merged.slice(0, 3);
  }, [products]);

  // Positions: 0=front center (big), 1=left-back (small), 2=right-back (small)
  const positions = [
    { scale: 1,    z: 40, x: "0%",   y: "0%",   rotate: 0 },
    { scale: 0.6,  z: 10, x: "-20%", y: "-18%", rotate: -8 },
    { scale: 0.62, z: 20, x: "18%",  y: "-14%", rotate: 10 },
  ];

  return (
    <div className="flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── Enterprise Dark Hero ──────────────────────────────────── */}
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 80% at 50% 0%, rgba(40,111,180,0.25), transparent 70%)",
          }}
        />

        <div className="relative z-10 container-primary py-4 md:py-5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-5 items-center">

            {/* ── Left: Text Content ─────────────────────────────── */}
            <div className="flex flex-col items-start">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-1.5 border-l-2 border-primary pl-3 mb-1.5"
              >
                <span className="uppercase font-bold tracking-wider text-[length:var(--font-badge)] text-primary">
                  Authorized Distributor — GCC
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                data-typography="heading"
                className="font-extrabold tracking-tight leading-[1.05] mb-1"
              >
                <span className="text-white">
                  {heroHeadline}
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="text-[length:var(--font-body)] text-white/70 leading-relaxed max-w-xl mb-1.5"
                dangerouslySetInnerHTML={{ __html: heroDescription }}
              />

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-wrap gap-2.5"
              >
                {[
                  { icon: ShieldCheck, label: "100% Authentic" },
                  { icon: Truck, label: "JAFZA Stocked" },
                  { icon: Cpu, label: `${products.length}+ Products` },
                ].map((pill, i) => (
                  <motion.span
                    key={pill.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.5 + i * 0.08 }}
                    className="inline-flex items-center gap-1.5 border border-primary/20 bg-primary/5 px-3 py-1.5 text-[length:var(--font-badge)] font-bold uppercase tracking-wider text-primary"
                  >
                    <pill.icon className="w-3.5 h-3.5" />
                    {pill.label}
                  </motion.span>
                ))}
              </motion.div>
            </div>

            {/* ── Right: Overlapping Component Gallery ────────────── */}
            <div className="relative flex items-center justify-center h-[180px] sm:h-[200px] md:h-[220px]">
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[140px] h-[140px] sm:w-[160px] sm:h-[160px] bg-primary/10 blur-2xl" />
              </div>

              {heroImages.map((img, idx) => {
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
                      className="w-full h-full object-contain"
                      style={{ mixBlendMode: "multiply" }}
                    />
                  </motion.div>
                );
              })}
            </div>

          </div>
        </div>
      </section>

      <HardwareSubNav />

      <ProductCatalogClient
        products={products}
        pageTitle="Computer Components"
        hideCategoryFilter={true}
        cardAspectRatio="3/2"
        cardObjectFit="cover"
        cardColumns={4}
      />

      {/* Related */}
      <div className="bg-muted text-foreground">
        <div className="container-primary py-10">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: relatedLinks }} />
          </div>
        </div>
      </div>
    </div>
  );
}
