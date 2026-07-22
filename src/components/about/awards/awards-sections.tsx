"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Calendar,
  Globe2,
  Users,
  Rocket,
  Eye,
  ShieldCheck,
  BadgeCheck,
  Truck,
  Headset,
  type LucideIcon,
} from "lucide-react";
import { mediaUrl } from "@/lib/media-url";
import { BRAND_LOGOS } from "@/lib/product-config";
import {
  staggerContainer,
  staggerItem,
  easeOutExpo,
} from "../about-sections-shared";

/* ============================================================
   Types
   ============================================================ */

export interface AwardItem {
  year: string;
  title: string;
  issuer: string;
  description: string;
}
export interface CertificationItem {
  cert: string;
  authority: string;
  status: string;
}
export interface MilestoneItem {
  year: string;
  milestone: string;
}

/* ============================================================
   Shared section header
   ============================================================ */

export function SectionHeader({
  badge,
  heading,
  headingGradient,
  description,
  align = "center",
}: {
  badge: string;
  heading: string;
  headingGradient?: string;
  description?: string;
  align?: "center" | "left";
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: easeOutExpo }}
      className={`mb-12 md:mb-16 ${align === "center" ? "text-center mx-auto max-w-3xl" : "max-w-2xl"}`}
    >
      <span className="about-eyebrow">{badge}</span>
      <h2 className="mt-3 text-[length:var(--font-heading)] font-extrabold tracking-tighter leading-[1.1] text-foreground">
        <span>{heading}</span>
        {headingGradient && (
          <>
            {" "}
            <span className="text-primary">{headingGradient}</span>
          </>
        )}
      </h2>
      {description && (
        <p className="mt-5 text-muted-foreground leading-relaxed text-[length:var(--font-body)]">
          {description}
        </p>
      )}
    </motion.div>
  );
}

/* ============================================================
   Helpers
   ============================================================ */

/** Map an award issuer to a brand logo path (for cards/timeline). */
function brandLogoFor(issuer: string): string | undefined {
  const i = issuer.toLowerCase();
  if (i.includes("hik")) return BRAND_LOGOS.hikvision;
  if (i.includes("crucial") || i.includes("micron")) return BRAND_LOGOS.crucial;
  if (i.includes("dell")) return BRAND_LOGOS.dell;
  if (i.includes("ugreen")) return BRAND_LOGOS.ugreen;
  if (i.includes("lenovo")) return BRAND_LOGOS.lenovo;
  if (i.includes("hp")) return BRAND_LOGOS.hp;
  if (i.includes("samsung")) return BRAND_LOGOS.samsung;
  if (i.includes("kingston")) return BRAND_LOGOS.kingston;
  return undefined;
}

/* ============================================================
   1. Awards & Industry Recognition — premium masonry of award cards
   ============================================================ */

export function AwardsMasonry({
  awards,
  images,
}: {
  awards: AwardItem[];
  images: string[];
}) {
  return (
    <section
      id="awards"
      aria-label="Awards and industry recognition"
      className="relative w-full py-24 md:py-32 bg-background scroll-mt-[160px] lg:scroll-mt-[210px]"
    >
      <div className="container-primary">
        <SectionHeader
          badge="Awards & Recognition"
          heading="Awards & Industry"
          headingGradient="Recognition"
          description="Recognized by leading technology partners for outstanding performance, customer commitment, and distribution excellence."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid md:grid-cols-2 gap-7 lg:gap-8"
        >
          {awards.map((award, i) => {
            const image = images[i];
            const logo = brandLogoFor(award.issuer);
            return (
              <motion.article
                key={`${award.title}-${i}`}
                variants={staggerItem}
                className="group about-card overflow-hidden flex flex-col transition-all duration-300 hover:border-primary/50 border border-border bg-card"
              >
                {image && (
                  <div className="relative h-[44.8rem] w-full overflow-hidden">
                    <img
                      src={image}
                      alt={`${award.title} — award ceremony`}
                      className="h-full w-full object-cover transition-transform duration-[800ms] ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-slate-950/60" />
                    <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 border-l-2 border-primary pl-3 py-1 text-xs font-bold uppercase tracking-widest text-primary bg-background">
                      <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
                      {award.year}
                    </span>
                    {logo && (
                      <img
                        src={mediaUrl(logo)}
                        alt="Brand logo"
                        className="absolute bottom-4 right-4 h-9 w-auto object-contain bg-background px-2 py-1"
                      />
                    )}
                  </div>
                )}
                <div className="p-7 md:p-8 flex flex-col flex-1">
                  <h3 className="text-[length:var(--font-heading)] font-extrabold text-foreground leading-tight">
                    {award.title}
                  </h3>
                  <p className="mt-2 text-[length:var(--font-body)] font-bold text-primary">
                    {award.issuer}
                  </p>
                  <p className="mt-4 text-muted-foreground leading-relaxed text-[length:var(--font-body)] flex-1">
                    {award.description}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

/* ============================================================
   2. Company at a Glance — team photo + story + vertical stat cards
   ============================================================ */

export function CompanyAtAGlance({
  heading,
  headingGradient,
  description,
  teamImage,
  teamAlt,
}: {
  heading: string;
  headingGradient: string;
  description: string;
  teamImage: string;
  teamAlt: string;
}) {
  const stats: Array<{ icon: LucideIcon; value: string; label: string }> = [
    { icon: Calendar, value: "20+", label: "Years" },
    { icon: Globe2, value: "20+", label: "Brand Partners" },
    { icon: Users, value: "300+", label: "Professionals" },
  ];

  return (
    <section
      id="company"
      aria-label="Company at a glance"
      className="relative w-full py-24 md:py-32 bg-muted"
    >
      <div className="container-primary">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Large team photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: easeOutExpo }}
            className="relative overflow-hidden aspect-[4/3] ring-1 ring-border"
          >
            <img
              src={teamImage}
              alt={teamAlt}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </motion.div>

          {/* Story + stats */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: easeOutExpo }}
          >
            <span className="about-eyebrow">Who We Are</span>
            <h2 className="mt-3 text-[length:var(--font-heading)] font-extrabold tracking-tighter leading-[1.1] text-foreground">
              {heading} <span className="text-primary">{headingGradient}</span>
            </h2>
            <p className="mt-5 text-muted-foreground leading-relaxed text-[length:var(--font-body)]">
              {description}
            </p>

            <div className="mt-8 grid sm:grid-cols-3 gap-4">
              {stats.map((s) => {
                const Icon = s.icon;
                return (
                  <div
                    key={s.label}
                    className="about-card p-5 flex flex-col items-center text-center transition-all duration-300 hover:border-primary/50 border border-border bg-card"
                  >
                    <div className="w-11 h-11 bg-primary text-primary-foreground flex items-center justify-center mb-3">
                      <Icon className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <div className="text-[length:var(--font-heading)] font-extrabold text-foreground leading-none">
                      {s.value}
                    </div>
                    <div className="mt-1.5 text-[length:var(--font-section-label)] font-semibold text-muted-foreground uppercase tracking-wider">
                      {s.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   3. Mission & Vision — two premium cards
   ============================================================ */

export function MissionVisionCards({
  missionHeadline,
  missionDesc,
  visionHeadline,
  visionDesc,
}: {
  missionHeadline: string;
  missionDesc: string;
  visionHeadline: string;
  visionDesc: string;
}) {
  const cards = [
    {
      icon: Rocket,
      headline: missionHeadline,
      desc: missionDesc,
      border: "bg-primary",
    },
    {
      icon: Eye,
      headline: visionHeadline,
      desc: visionDesc,
      border: "bg-primary",
    },
  ];

  return (
    <section
      id="mission"
      aria-label="Mission and vision"
      className="relative w-full py-24 md:py-32 bg-background"
    >
      <div className="container-primary">
        <SectionHeader badge="Our Purpose" heading="Mission &" headingGradient="Vision" />
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid md:grid-cols-2 gap-7 lg:gap-8"
        >
          {cards.map((c) => {
            const Icon = c.icon;
            return (
              <motion.div
                key={c.headline}
                variants={staggerItem}
                className="group relative about-card p-8 md:p-10 overflow-hidden transition-all duration-300 hover:border-primary/50 border border-border bg-card"
              >
                {/* Colored top border */}
                <div className={`absolute top-0 inset-x-0 h-1.5 ${c.border}`} aria-hidden="true" />
                {/* Subtle tint */}
                <div
                  className="absolute inset-0 bg-primary/5 pointer-events-none"
                  aria-hidden="true"
                />
                <div className="relative">
                  <div className="w-14 h-14 bg-primary text-primary-foreground flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                    <Icon className="w-7 h-7" aria-hidden="true" />
                  </div>
                  <h3 className="mt-5 text-[length:var(--font-heading)] font-extrabold text-foreground leading-snug">
                    {c.headline}
                  </h3>
                  <p className="mt-3 text-muted-foreground leading-relaxed text-[length:var(--font-body)]">
                    {c.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

/* ============================================================
   4. Why Customers Trust Simal — four feature cards
   ============================================================ */

const TRUST_FEATURES: Array<{ icon: LucideIcon; title: string; desc: string }> = [
  {
    icon: ShieldCheck,
    title: "Genuine Products",
    desc: "100% authentic, sourced directly from authorized manufacturers — never grey-market or refurbished sold as new.",
  },
  {
    icon: BadgeCheck,
    title: "Authorized Distributor",
    desc: "Official distribution rights for 20+ global brands, with authorization letters available for tender submissions.",
  },
  {
    icon: Truck,
    title: "Fast Regional Delivery",
    desc: "Rapid, reliable fulfillment from our Jebel Ali warehouse across UAE, GCC, Africa, and CIS markets.",
  },
  {
    icon: Headset,
    title: "Dedicated Enterprise Support",
    desc: "Certified, multi-lingual technical teams organized by division and vendor platform — English, Arabic, Hindi, Urdu, Bengali.",
  },
];

export function WhyCustomersTrust() {
  return (
    <section
      id="trust"
      aria-label="Why customers trust Simal"
      className="relative w-full py-24 md:py-32 bg-muted"
    >
      <div className="container-primary">
        <SectionHeader
          badge="Why Choose Us"
          heading="Why Customers"
          headingGradient="Trust Simal"
          description="Authorization isn't paperwork — it's the guarantee behind every product we ship."
        />
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {TRUST_FEATURES.map((f) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.title}
                variants={staggerItem}
                className="group about-card p-7 flex flex-col transition-all duration-300 hover:border-primary/50 border border-border bg-card"
              >
                <div className="w-14 h-14 bg-primary text-primary-foreground flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                  <Icon className="w-7 h-7" aria-hidden="true" />
                </div>
                <h3 className="mt-5 text-[length:var(--font-heading)] font-extrabold text-foreground leading-snug">
                  {f.title}
                </h3>
                <p className="mt-2.5 text-muted-foreground leading-relaxed text-[length:var(--font-body)]">
                  {f.desc}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

/* ============================================================
   6. Authorized Brand Partners — logo wall + verification badges
   ============================================================ */

export function BrandLogoWall({
  registrations,
}: {
  registrations: CertificationItem[];
}) {
  const brands = Object.entries(BRAND_LOGOS);

  return (
    <section
      id="partners"
      aria-label="Authorized brand partners"
      className="relative w-full py-24 md:py-32 bg-muted scroll-mt-[160px] lg:scroll-mt-[210px]"
    >
      <div className="container-primary">
        <SectionHeader
          badge="Our Partners"
          heading="Authorized Brand"
          headingGradient="Partners"
          description="Officially authorized to distribute 20+ of the world's leading technology brands."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5"
        >
          {brands.map(([slug, path]) => {
            const name = slug.charAt(0).toUpperCase() + slug.slice(1);
            return (
              <motion.div
                key={slug}
                variants={staggerItem}
                className="group about-card px-6 py-8 flex items-center justify-center transition-all duration-300 hover:border-primary/50 border border-border bg-card"
              >
                <img
                  src={mediaUrl(path)}
                  alt={`${name} logo`}
                  className="max-h-10 w-auto object-contain grayscale opacity-70 transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100"
                  loading="lazy"
                />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Verified business registrations */}
        {registrations.length > 0 && (
          <div className="mt-16">
            <p className="text-center about-eyebrow mb-6">Verified Business Registrations</p>
            <div className="flex flex-wrap justify-center gap-4">
              {registrations.map((r) => (
                <div
                  key={r.cert}
                  className="about-card px-5 py-4 flex items-center gap-3 border border-border bg-card"
                >
                  <div className="w-10 h-10 bg-primary/10 flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5 text-primary" aria-hidden="true" />
                  </div>
                  <div>
                    <div className="text-[length:var(--font-body)] font-bold text-foreground leading-tight">
                      {r.cert}
                    </div>
                    <div className="text-[length:var(--font-section-label)] text-muted-foreground">
                      {r.authority}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

/* ============================================================
   8. Company Growth Journey — connected milestone cards,
        animated connector line drawn on scroll.
   ============================================================ */

export function GrowthJourney({ milestones }: { milestones: MilestoneItem[] }) {
  const reduced = useReducedMotion();
  return (
    <section
      id="growth"
      aria-label="Company growth journey"
      className="relative w-full py-24 md:py-32 bg-muted"
    >
      <div className="container-primary">
        <SectionHeader badge="Our Journey" heading="Company Growth" headingGradient="Journey" />

        <div className="relative max-w-3xl mx-auto">
          {/* Animated vertical connector */}
          <motion.div
            aria-hidden="true"
            initial={reduced ? { opacity: 1 } : { scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1.1, ease: easeOutExpo }}
            style={{ transformOrigin: "top" }}
            className="absolute left-5 top-2 bottom-2 w-0.5 bg-primary"
          />

          <motion.ol
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.05 }}
            className="space-y-5"
          >
            {milestones.map((m) => (
              <motion.li key={`${m.year}-${m.milestone}`} variants={staggerItem} className="relative pl-16">
                <div className="absolute left-0 top-1 w-11 h-11 bg-primary text-primary-foreground flex items-center justify-center text-[length:var(--font-badge)] font-extrabold ring-4 ring-background">
                  {m.year}
                </div>
                <div className="about-card p-5 transition-all duration-300 hover:border-primary/50 border border-border bg-card">
                  <p className="text-[length:var(--font-body)] font-semibold text-foreground leading-snug">
                    {m.milestone}
                  </p>
                </div>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </div>
    </section>
  );
}
