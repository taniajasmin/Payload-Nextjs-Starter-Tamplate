"use client";

import { motion } from "framer-motion";
import { Shield, Truck, Headphones, Quote } from "lucide-react";
import { mediaUrl } from "@/lib/media-url";
import {
  easeOutExpo,
  staggerContainer,
  staggerItem,
} from "./about-sections-shared";

/* ──────────────────────────────────────────────────────────────────────
   Four new content sections for the /about page, inserted between the
   hero and "Company at a Glance". Enterprise design system.
   ────────────────────────────────────────────────────────────────────── */

/* ─── 1. Image Collage Row ─── */

const COLLAGE_IMAGES = [
  {
    src: "/assets/images/company-insights/LUX04853-scaled.jpg",
    alt: "Simal team collaborating in the office",
    h: "h-48 md:h-56",
  },
  {
    src: "/assets/images/company-insights/LUX04892-scaled.jpg",
    alt: "Simal warehouse and logistics operations",
    h: "h-64 md:h-72",
  },
  {
    src: "/assets/images/company-insights/LUX04877-scaled.jpg",
    alt: "Simal team at a brand partner event",
    h: "h-56 md:h-64",
  },
  {
    src: "/assets/images/company-insights/LUX04898-scaled.jpg",
    alt: "The Simal Technologies team with global brand partners",
    h: "h-52 md:h-60",
  },
];

export function ImageCollageRow() {
  return (
    <section className="relative overflow-hidden bg-background">
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: easeOutExpo }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4"
        >
          {COLLAGE_IMAGES.map((img, i) => (
            <div
              key={img.src}
              className={`overflow-hidden ${img.h} ${
                i === 0
                  ? "md:mt-4"
                  : i === 1
                    ? "md:-mt-2"
                    : i === 2
                      ? "md:mt-2"
                      : "md:-mt-4"
              }`}
            >
              <img
                src={mediaUrl(img.src)}
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                loading="lazy"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ─── 2. Two-Column Intro Statement ─── */

export function IntroStatement() {
  return (
    <section className="relative overflow-hidden bg-background">
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: easeOutExpo }}
          className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start"
        >
          {/* Left — large heading */}
          <h2 className="text-3xl font-extrabold leading-[1.1] tracking-tight text-foreground sm:text-4xl">
            We deliver technology,
            <br />
            reliably and on time
          </h2>

          {/* Right — two paragraphs */}
          <div className="space-y-4">
            <p className="text-sm leading-relaxed text-muted-foreground">
              For over two decades, Simal Technologies has been the distribution
              backbone for businesses across the Middle East, Africa, CIS, and
              GCC. We partner with 20+ global brands — from Crucial and UGREEN
              to HIKVISION, Dell, and Lenovo — to ensure that every order is
              fulfilled with precision, speed, and the authenticity guarantee
              that only an authorized distributor can provide.
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Our 300+ professionals operate across seven business divisions
              from our Dubai headquarters and Jebel Ali warehouse, positioned at
              the centre of one of the world&apos;s busiest trade corridors.
              Whether it&apos;s enterprise hardware, IT services, or supply
              chain solutions, we deliver — every time.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── 3. Image + Quote Split Section ─── */

export function ImageQuoteSplit() {
  return (
    <section className="relative overflow-hidden bg-background">
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left — image with floating quote card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: easeOutExpo }}
            className="relative"
          >
            <div className="overflow-hidden">
              <img
                src={mediaUrl(
                  "/assets/images/company-insights/LUX04847-scaled.jpg",
                )}
                alt="Simal Technologies leadership and team"
                className="w-full h-auto aspect-[4/3] object-cover"
                loading="lazy"
              />
            </div>

            {/* Floating quote card */}
            <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-[280px] border border-border bg-card p-5">
              <Quote className="w-5 h-5 mb-2 text-primary" strokeWidth={1.6} />
              <p className="text-sm leading-relaxed italic mb-3 text-muted-foreground">
                &ldquo;Our commitment to quality and reliability has been the
                cornerstone of our success for over two decades.&rdquo;
              </p>
              <div>
                <p className="text-xs font-bold text-foreground">
                  Mohammad Mazharul Islam
                </p>
                <p className="text-xs text-muted-foreground">
                  Chairman, Simal Technologies
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right — heading + paragraph + pull-quote */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: easeOutExpo, delay: 0.1 }}
          >
            <span className="mb-4 inline-block border-l-2 border-primary pl-3 text-xs font-bold uppercase tracking-widest text-primary">
              Our Foundation
            </span>
            <h2 className="text-3xl font-extrabold leading-[1.1] tracking-tight text-foreground sm:text-4xl mb-4">
              Built on trust,
              <br />
              driven by expertise
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              Since our founding in 2002, we&apos;ve grown from a local Dubai
              distributor into a regional powerhouse serving enterprise,
              government, and SMB clients across four continents. Our team
              brings together deep technical knowledge, logistics expertise, and
              an unwavering commitment to genuine, warrantied products.
            </p>

            {/* Pull-quote */}
            <blockquote className="border-l-4 border-primary pl-4 py-1 text-sm italic leading-relaxed text-foreground">
              &ldquo;Every product we ship carries our reputation. That&apos;s
              why we never compromise on authenticity, quality, or
              service.&rdquo;
            </blockquote>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─── 4. Centred Heading + 3-Icon Feature Row ─── */

const TRUST_FEATURES = [
  {
    icon: Shield,
    label: "Authorized & Genuine",
    desc: "Official distributor for 20+ global brands with full manufacturer warranty on every product.",
  },
  {
    icon: Truck,
    label: "Reliable Delivery",
    desc: "Seamless logistics across UAE, GCC, Africa, and CIS from our Jebel Ali warehouse.",
  },
  {
    icon: Headphones,
    label: "Dedicated Support",
    desc: "Multi-lingual team providing rapid, proactive support in five languages.",
  },
];

export function TrustFeatureRow() {
  return (
    <section className="relative overflow-hidden bg-background">
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Centred header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: easeOutExpo }}
          className="text-center mb-10 md:mb-12"
        >
          <span className="mb-4 inline-block border-l-2 border-primary pl-3 text-xs font-bold uppercase tracking-widest text-primary">
            Why Choose Simal
          </span>
          <h2 className="text-3xl font-extrabold leading-[1.1] tracking-tight text-foreground sm:text-4xl">
            Why businesses trust{" "}
            <span className="text-primary">Simal</span>
          </h2>
          <p className="mt-2 text-sm text-muted-foreground max-w-xl mx-auto">
            Three pillars that define every partnership we build — from
            enterprise clients to government procurement teams across the
            region.
          </p>
        </motion.div>

        {/* 3-icon grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {TRUST_FEATURES.map((feature) => (
            <motion.div
              key={feature.label}
              variants={staggerItem}
              className="flex flex-col items-center text-center border border-border bg-card p-6 md:p-8"
            >
              {/* Icon badge */}
              <span className="flex h-[52px] w-[52px] shrink-0 items-center justify-center bg-primary mb-4">
                <feature.icon className="w-6 h-6 text-primary-foreground" strokeWidth={1.6} />
              </span>

              <h3 className="text-lg font-extrabold leading-[1.1] tracking-tight text-foreground mb-2">
                {feature.label}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
