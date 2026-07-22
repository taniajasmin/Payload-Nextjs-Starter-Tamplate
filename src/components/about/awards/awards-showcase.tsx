"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useAboutData } from "../about-data-provider";
import { mediaUrl } from "@/lib/media-url";
import { easeOutExpo } from "../about-sections-shared";
import { AwardsMasonry } from "./awards-sections";
import { RecognitionGallery } from "./awards-gallery";

/* ============================================================
   Image sets (public/assets/images/company-insights)
   ============================================================ */

const AWARDS_IMAGES = [
  mediaUrl("/assets/images/company-insights/hik-summit.jpg"),
  mediaUrl("/assets/images/company-insights/Award3.jpg"),
];

/* ============================================================
   Final CTA — enterprise dark section
   ============================================================ */

function FinalCta() {
  const reduced = useReducedMotion();
  return (
    <section
      aria-label="Contact sales or become a partner"
      className="relative w-full py-24 md:py-32 bg-foreground overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/20 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-primary/10 blur-3xl" />
      </div>
      <motion.div
        initial={reduced ? { opacity: 0 } : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, ease: easeOutExpo }}
        className="container-primary relative z-10 text-center max-w-3xl mx-auto"
      >
        <h2 className="text-[length:var(--font-hero-heading)] font-extrabold tracking-tighter text-background leading-[1.1]">
          Ready to Partner With an Award-Winning IT Distributor?
        </h2>
        <p className="mt-5 text-background/80 leading-relaxed text-[length:var(--font-body)]">
          Join 20+ global brands and thousands of businesses who rely on Simal Technologies for authentic products, authorized distribution, and enterprise-grade support across MEA, CIS, and GCC.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 text-[length:var(--font-button)] font-semibold transition-all duration-200 hover:bg-primary/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
          >
            Contact Sales
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 border border-primary/40 px-6 py-3 text-[length:var(--font-button)] font-semibold text-background transition-all duration-200 hover:bg-primary/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
          >
            Become a Partner
          </Link>
        </div>
      </motion.div>
    </section>
  );
}

/* ============================================================
   Orchestrator — body only.
   Hero + 4-item sub-nav come from the route-group layout (mirrored
   from about/layout.tsx); the custom final CTA is section 10 below.
   ============================================================ */

export function AwardsShowcase() {
  const data = useAboutData();

  return (
    <>
      <AwardsMasonry awards={data.awards.awards} images={AWARDS_IMAGES} />
      <RecognitionGallery />
      <FinalCta />
    </>
  );
}
