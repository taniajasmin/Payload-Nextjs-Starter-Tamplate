"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { X, ZoomIn } from "lucide-react";
import { mediaUrl } from "@/lib/media-url";
import { SectionHeader } from "./awards-sections";
import { staggerContainer, staggerItem, easeOutExpo } from "../about-sections-shared";

interface GalleryImage {
  src: string;
  alt: string;
  /** Tailwind row-span class — varied so frames are different sizes. */
  span: "row-span-2" | "row-span-3";
}

/* Curated set of award-ceremony / brand-summit / partnership photos from
   public/assets/images/company-insights. `span` varies the frame height so
   the dense grid packs tight (different sizes, no empty space). */
const GALLERY: GalleryImage[] = [
  { src: mediaUrl("/assets/images/company-insights/hik-summit.jpg"), alt: "HIKSEMi MEA Distributor Summit", span: "row-span-3" },
  { src: mediaUrl("/assets/images/company-insights/Award6.jpg"), alt: "Industry recognition award ceremony", span: "row-span-2" },
  { src: mediaUrl("/assets/images/company-insights/Award3.jpg"), alt: "Award presentation on stage", span: "row-span-2" },
  { src: mediaUrl("/assets/images/company-insights/LUX04898-scaled.jpg"), alt: "Simal Technologies team with global brand partners", span: "row-span-3" },
  { src: mediaUrl("/assets/images/company-insights/Award.jpg"), alt: "Award certificate on display", span: "row-span-2" },
  { src: mediaUrl("/assets/images/company-insights/LUX04847-scaled.jpg"), alt: "Corporate partnership event", span: "row-span-2" },
  { src: mediaUrl("/assets/images/company-insights/DSC07726-scaled.jpg"), alt: "Simal Technologies corporate gathering", span: "row-span-3" },
  { src: mediaUrl("/assets/images/company-insights/LUX04877-scaled.jpg"), alt: "Industry awards night", span: "row-span-2" },
  { src: mediaUrl("/assets/images/company-insights/LUX04892-scaled.jpg"), alt: "Leadership team with partners", span: "row-span-2" },
  { src: mediaUrl("/assets/images/company-insights/LUX04853-scaled.jpg"), alt: "Simal Technologies partnership gathering", span: "row-span-3" },
];

export function RecognitionGallery() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState<number | null>(null);

  // ESC to close + lock body scroll while the modal is open.
  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [active]);

  return (
    <section
      id="gallery"
      aria-label="Recognition gallery"
      className="relative w-full py-24 md:py-32 bg-background"
    >
      <div className="container-primary">
        <SectionHeader
          badge="Gallery"
          heading="Recognition"
          headingGradient="Gallery"
          description="Moments from award ceremonies, brand summits, and partnership events."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 grid-flow-dense auto-rows-[8rem]"
        >
          {GALLERY.map((img, i) => (
            <motion.button
              key={`${img.src}-${i}`}
              variants={staggerItem}
              type="button"
              onClick={() => setActive(i)}
              className={`group relative overflow-hidden border border-border bg-card hover:border-primary/50 ${img.span} focus:outline-none focus-visible:ring-2 focus-visible:ring-primary`}
              aria-label={`Open image: ${img.alt}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute inset-0 bg-foreground/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                <span className="text-white text-[length:var(--font-section-label)] font-semibold flex items-center gap-1">
                  <ZoomIn className="w-3.5 h-3.5" aria-hidden="true" /> View
                </span>
              </span>
            </motion.button>
          ))}
        </motion.div>
      </div>

      {/* Lightbox modal */}
      <AnimatePresence>
        {active !== null && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-foreground/95"
            role="dialog"
            aria-modal="true"
            aria-label={GALLERY[active].alt}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <motion.div
              className="relative max-w-5xl w-full"
              initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25, ease: easeOutExpo }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={GALLERY[active].src}
                alt={GALLERY[active].alt}
                className="w-full max-h-[80vh] object-contain"
              />
              <p className="mt-4 text-center text-white/90 text-[length:var(--font-body)]">
                {GALLERY[active].alt}
              </p>
              <button
                type="button"
                onClick={() => setActive(null)}
                className="absolute -top-4 -right-4 w-10 h-10 bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                aria-label="Close gallery image"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
