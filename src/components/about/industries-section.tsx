"use client";

import { motion } from "framer-motion";
import {
  Building2,
  Landmark,
  GraduationCap,
  ShoppingBag,
  HeartPulse,
  BedDouble,
  Banknote,
  type LucideIcon,
} from "lucide-react";
import { staggerContainer, staggerItem, easeOutExpo } from "./about-sections-shared";

const INDUSTRIES: Array<{ icon: LucideIcon; label: string }> = [
  { icon: Building2, label: "Enterprise" },
  { icon: Landmark, label: "Government" },
  { icon: GraduationCap, label: "Education" },
  { icon: ShoppingBag, label: "Retail" },
  { icon: HeartPulse, label: "Healthcare" },
  { icon: BedDouble, label: "Hospitality" },
  { icon: Banknote, label: "Finance" },
];

/**
 * "Trusted Across Industries" — icon + label cards showing the sectors we
 * serve. Shared by the /about overview and the /about/awards showcase.
 */
export function IndustriesSection() {
  return (
    <section
      id="industries"
      aria-label="Industries we serve"
      className="relative w-full py-24 md:py-32 bg-background"
    >
      <div className="container-primary">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: easeOutExpo }}
          className="text-center mx-auto max-w-3xl mb-12 md:mb-16"
        >
          <span className="mb-4 inline-block border-l-2 border-primary pl-3 text-xs font-bold uppercase tracking-widest text-primary">
            Versatility
          </span>
          <h2 className="mt-3 text-[length:var(--font-heading)] font-extrabold tracking-tight leading-[1.1] text-foreground">
            Trusted Across <span className="text-primary">Industries</span>
          </h2>
          <p className="mt-5 text-muted-foreground leading-relaxed text-[length:var(--font-body)]">
            Our authorized portfolio and logistics reach serve organizations of every size and sector across the region.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4"
        >
          {INDUSTRIES.map((ind) => {
            const Icon = ind.icon;
            return (
              <motion.div
                key={ind.label}
                variants={staggerItem}
                className="border border-border bg-card p-5 flex flex-col items-center text-center transition-colors hover:border-primary/50"
              >
                <div className="w-12 h-12 bg-primary flex items-center justify-center text-primary-foreground mb-3">
                  <Icon className="w-6 h-6" aria-hidden="true" />
                </div>
                <span className="text-[length:var(--font-body)] font-semibold text-foreground">
                  {ind.label}
                </span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
