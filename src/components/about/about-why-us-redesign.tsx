"use client";

import { motion, useInView, useReducedMotion, animate, type Variants } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  BadgeCheck,
  Check,
  Cpu,
  Globe,
  Headphones,
  Truck,
  type LucideIcon,
} from "lucide-react";
import { useAboutData } from "./about-data-provider";
import { easeOutExpo } from "./about-sections-shared";

/* ──────────────────────────────────────────────────────────────────────
   Why-Us — Enterprise design.
     1. Quick Highlights — five-card strip.
     2. Five numbered image+text blocks in a zigzag (the pillars).
   ────────────────────────────────────────────────────────────────────── */

type Pillar = { number: string; title: string; intro: string; benefits: string[] };

const PILLAR_IMAGES = [
  "/assets/images/why-us/partner.avif",
  "/assets/images/why-us/regional.avif",
  "/assets/images/why-us/process.avif",
  "/assets/images/why-us/team.avif",
  "/assets/images/why-us/customesolution.avif",
];

const BENEFIT_DESCRIPTIONS: Record<string, string> = {
  "100% genuine products with full manufacturer warranty":
    "Sealed, authentic stock covered by the full manufacturer warranty.",
  "Direct access to manufacturer support and RMA processes":
    "Escalate to vendors and process returns directly — no middleman.",
  "Early access to new product launches and promotional pricing":
    "Stock new releases first, with exclusive partner pricing.",
  "Official authorization letters available for tender submissions":
    "Authorization documents to strengthen your tender bids.",
  "UAE-wide delivery (Dubai, Abu Dhabi, Sharjah, all emirates)":
    "Next-day delivery to all seven emirates from Jebel Ali.",
  "GCC distribution (Saudi Arabia, Qatar, Kuwait, Bahrain, Oman)":
    "Established logistics serving the entire Gulf region.",
  "Africa coverage (Egypt, Nigeria, Kenya, South Africa)":
    "Reliable distribution to key African markets.",
  "CIS markets (Kazakhstan, Uzbekistan, Azerbaijan)":
    "Dedicated corridors into emerging CIS markets.",
  "Consultation — Understand your requirements":
    "We map your exact technical and business needs first.",
  "Quotation — Competitive, personalized pricing":
    "Transparent, volume-aware pricing tailored to your project.",
  "Fulfillment — Pick, pack, and dispatch from our Jebel Ali warehouse":
    "Picked, packed, and shipped from our own warehouse.",
  "After-Sales — Ongoing support and warranty assistance":
    "Continued support and warranty help after delivery.",
  "Certified technical professionals across multiple vendor platforms":
    "Engineers certified across the brands we distribute.",
  "Industry-trained sales teams organized by business division":
    "Sector specialists who know your industry's needs.",
  "Multi-lingual support (English, Arabic, Hindi, Urdu, Bengali)":
    "Support in the language you're most comfortable in.",
  "Bulk order configurations for enterprise deployments":
    "Large-scale orders built and configured to your specs.",
  "Kitting and bundling services":
    "Product kits and bundles assembled, ready to deploy.",
  "Pre-configured solutions for specific industries":
    "Turnkey packages tailored to your industry.",
};

const HIGHLIGHTS: { icon: LucideIcon; title: string; sentence: string }[] = [
  {
    icon: BadgeCheck,
    title: "Authorized Distributor",
    sentence: "Official distributor for the world's leading technology brands.",
  },
  {
    icon: Globe,
    title: "Regional Coverage",
    sentence: "Serving businesses across the UAE, GCC, Africa, and CIS.",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    sentence: "Rapid, reliable fulfillment from regional distribution centers.",
  },
  {
    icon: Headphones,
    title: "Enterprise Support",
    sentence: "Dedicated account managers and round-the-clock assistance.",
  },
  {
    icon: Cpu,
    title: "Technical Expertise",
    sentence: "Certified engineers with deep, hands-on product knowledge.",
  },
];

const pillarTag = (title: string) =>
  (title.split(" ").pop() || title).toUpperCase();

function Counter({ to, format }: { to: number; format: (n: number) => string }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (reduce) {
      setValue(to);
      return;
    }
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 0.9,
      ease: "easeOut",
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [reduce, inView, to]);

  return <span ref={ref}>{format(value)}</span>;
}

function NumberedBlock({ pillar, index }: { pillar: Pillar; index: number }) {
  const reduce = useReducedMotion();
  const reverse = index % 2 === 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: reduce ? 0 : 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: easeOutExpo }}
      className={`group flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-10 ${
        reverse ? "lg:flex-row-reverse" : ""
      }`}
    >
      {/* Image */}
      <div className="lg:w-[519px] lg:shrink-0">
        <div className="relative aspect-[1.85] overflow-hidden border border-border bg-card">
          <img
            src={PILLAR_IMAGES[index % PILLAR_IMAGES.length]}
            alt={pillar.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </div>

      {/* Text */}
      <div className="lg:flex-1">
        <div className="mb-3 flex items-center gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center bg-primary text-sm font-bold text-primary-foreground">
            <Counter
              to={parseInt(pillar.number, 10) || 0}
              format={(n) => String(n).padStart(2, "0")}
            />
          </span>
          <span className="text-xs font-bold uppercase tracking-wider text-primary">
            {pillarTag(pillar.title)}
          </span>
        </div>

        <h3 className="mb-2 text-2xl font-extrabold leading-[1.1] tracking-tight text-foreground">
          {pillar.title}
        </h3>

        {pillar.intro && (
          <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
            {pillar.intro}
          </p>
        )}

        {pillar.benefits.length > 0 && (
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {pillar.benefits.map((b) => (
              <div
                key={b}
                className="flex items-start gap-2 border border-border bg-card px-3 py-2.5 text-sm"
              >
                <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center bg-primary text-primary-foreground">
                  <Check className="h-2.5 w-2.5" />
                </span>
                <div className="min-w-0">
                  <span className="block font-semibold text-foreground">{b}</span>
                  {BENEFIT_DESCRIPTIONS[b] && (
                    <span className="mt-0.5 block text-[13px] leading-snug text-muted-foreground">
                      {BENEFIT_DESCRIPTIONS[b]}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export function WhyUsRedesign() {
  const { whyChooseUs } = useAboutData();
  const pillars = whyChooseUs.pillars;
  const reduce = useReducedMotion();

  const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
  };
  const item: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 22 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeOutExpo } },
  };

  if (!pillars.length) return null;

  return (
    <>
      {/* Numbered image+text blocks (zigzag) — the 5 pillars */}
      <section className="relative overflow-hidden bg-background">
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: reduce ? 0 : 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, ease: easeOutExpo }}
            className="mb-10 md:mb-14"
          >
            {whyChooseUs.badge && (
              <span className="mb-4 inline-block border-l-2 border-primary pl-3 text-xs font-bold uppercase tracking-widest text-primary">
                {whyChooseUs.badge}
              </span>
            )}
            <h2 className="text-3xl font-extrabold leading-[1.1] tracking-tight text-foreground sm:text-4xl">
              {whyChooseUs.heading}{" "}
              {whyChooseUs.headingGradient && (
                <span className="text-primary">{whyChooseUs.headingGradient}</span>
              )}
            </h2>
            {whyChooseUs.description && (
              <p className="mt-2 text-sm text-muted-foreground">
                {whyChooseUs.description}
              </p>
            )}
          </motion.div>

          <div className="space-y-10 md:space-y-16">
            {pillars.map((p, i) => (
              <NumberedBlock key={p.number} pillar={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Quick Highlights — five-card strip */}
      <section className="relative overflow-hidden bg-muted">
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <motion.div
            initial={{ opacity: 0, y: reduce ? 0 : 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, ease: easeOutExpo }}
            className="mb-10 text-center"
          >
            <span className="mb-4 inline-block border-l-2 border-primary pl-3 text-xs font-bold uppercase tracking-widest text-primary">
              At a Glance
            </span>
            <h2 className="text-3xl font-extrabold leading-[1.1] tracking-tight text-foreground sm:text-4xl">
              Quick Highlights
            </h2>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5"
          >
            {HIGHLIGHTS.map((h) => {
              const Icon = h.icon;
              return (
                <motion.div
                  key={h.title}
                  variants={item}
                  className="group flex flex-col items-center border border-border bg-card p-6 text-center"
                >
                  <span className="mb-4 flex h-14 w-14 items-center justify-center bg-primary text-primary-foreground">
                    <Icon className="h-7 w-7" />
                  </span>
                  <h3 className="mb-1.5 text-lg font-extrabold leading-[1.1] tracking-tight text-foreground">
                    {h.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {h.sentence}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>
    </>
  );
}
