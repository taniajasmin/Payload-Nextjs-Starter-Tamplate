"use client";

import { motion } from "framer-motion";
import {
  Heart,
  GraduationCap,
  Leaf,
  HandHeart,
  Users2,
  Building2,
  Stethoscope,
  BookOpen,
} from "lucide-react";
import { mediaUrl } from "@/lib/media-url";
import {
  staggerContainer,
  staggerItem,
  easeOutExpo,
} from "./about-sections-shared";

const CSR_MISSION =
  "At Simal Technologies, we believe distribution is more than moving products — it's about lifting the communities where we operate. From Dubai to Dhaka, our CSR initiatives focus on technology access, education, environmental responsibility, and inclusive growth.";

const INITIATIVE_AREAS = [
  {
    icon: GraduationCap,
    title: "Education & Digital Literacy",
    desc: "STEM scholarships, school hardware donations, and digital skills workshops for underprivileged students across the UAE and Bangladesh.",
  },
  {
    icon: Leaf,
    title: "Environmental Responsibility",
    desc: "E-waste recycling programs, energy-efficient warehousing at Jebel Ali, and reduced-packaging initiatives across our supply chain.",
  },
  {
    icon: Stethoscope,
    title: "Healthcare Access",
    desc: "Sponsored medical camps, IT infrastructure donations to clinics, and support for healthcare logistics in underserved regions.",
  },
  {
    icon: HandHeart,
    title: "Community Welfare",
    desc: "Annual Ramadan campaigns, disaster relief contributions, and partnerships with local NGOs serving low-income families.",
  },
  {
    icon: Users2,
    title: "Inclusive Employment",
    desc: "Diverse hiring across 5+ nationalities, multi-lingual workplaces, and equal-opportunity pathways for women in technology roles.",
  },
  {
    icon: BookOpen,
    title: "Knowledge Sharing",
    desc: "Industry workshops, vendor training sessions, and open educational content for resellers and system integrators in our network.",
  },
];

const ENGAGEMENT_HIGHLIGHTS = [
  { value: "5,000+", label: "Students reached through STEM programs" },
  { value: "12+", label: "Schools & universities supported with hardware" },
  { value: "20+", label: "Tons of e-waste recycled annually" },
  { value: "300+", label: "Volunteer hours logged by team members" },
];

function CsrIntro() {
  return (
    <section className="relative overflow-hidden bg-background">
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="mb-8 flex items-center gap-4 border-b pb-4">
          <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            About
          </span>
          <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
            CSR
          </span>
        </div>
        <span className="mb-4 inline-block border-l-2 border-primary pl-3 text-xs font-bold uppercase tracking-widest text-primary">
          CSR & Sustainability
        </span>
        <h2 className="max-w-2xl text-3xl font-extrabold leading-[1.1] tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          Distributing technology,{" "}
          <span className="text-primary">growing communities</span>
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          {CSR_MISSION}
        </p>
      </div>
    </section>
  );
}

function CsrMissionBanner() {
  return (
    <section className="relative overflow-hidden bg-slate-950">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{
          backgroundImage: `url(${mediaUrl("/assets/images/company-insights/LUX04877-scaled.jpg")})`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950/90 via-slate-950/80 to-primary/25" />
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="max-w-3xl">
          <span className="mb-4 inline-flex h-10 w-10 items-center justify-center bg-primary">
            <Heart className="h-5 w-5 text-primary-foreground" strokeWidth={1.6} />
          </span>
          <blockquote className="text-2xl font-extrabold leading-[1.2] tracking-tight text-white sm:text-3xl">
            “Every product we ship carries our reputation — and every community
            we touch carries our responsibility.”
          </blockquote>
          <div className="mt-6 flex items-center gap-3">
            <span className="h-px w-12 bg-primary" />
            <span className="text-xs font-bold uppercase tracking-widest text-white/80">
              Simal Technologies CSR Pledge
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function InitiativeAreas() {
  return (
    <section className="relative overflow-hidden bg-background">
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="mb-10 md:mb-12 text-center">
          <span className="mb-4 inline-block border-l-2 border-primary pl-3 text-xs font-bold uppercase tracking-widest text-primary">
            Focus Areas
          </span>
          <h2 className="text-3xl font-extrabold leading-[1.1] tracking-tight text-foreground sm:text-4xl">
            Six pillars of{" "}
            <span className="text-primary">community impact</span>
          </h2>
          <p className="mt-2 text-sm text-muted-foreground max-w-2xl mx-auto">
            Long-term programs aligned with the UN Sustainable Development
            Goals, delivered with regional NGO partners.
          </p>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {INITIATIVE_AREAS.map((area) => (
            <motion.div
              key={area.title}
              variants={staggerItem}
              className="flex flex-col border border-border bg-card p-6 md:p-8 border-l-[3px] border-l-primary"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center bg-primary mb-4">
                <area.icon className="h-5 w-5 text-primary-foreground" strokeWidth={1.6} />
              </span>
              <h3 className="text-base font-extrabold leading-snug text-foreground mb-1.5">
                {area.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {area.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function EngagementHighlights() {
  return (
    <section className="relative overflow-hidden bg-muted">
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="mb-8 flex items-center gap-4 border-b pb-4">
          <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Community
          </span>
          <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
            Engagement
          </span>
        </div>
        <span className="mb-4 inline-block border-l-2 border-primary pl-3 text-xs font-bold uppercase tracking-widest text-primary">
          Community Engagement
        </span>
        <h2 className="max-w-2xl text-3xl font-extrabold leading-[1.1] tracking-tight text-foreground sm:text-4xl">
          Impact we can{" "}
          <span className="text-primary">measure</span>
        </h2>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: easeOutExpo }}
          className="mt-10 grid grid-cols-2 border border-border bg-card sm:grid-cols-4"
        >
          {ENGAGEMENT_HIGHLIGHTS.map((stat, i) => (
            <div
              key={stat.label}
              className={`flex flex-col items-center text-center p-6 md:p-8 ${
                i < ENGAGEMENT_HIGHLIGHTS.length - 1
                  ? "border-b sm:border-b-0 sm:border-r border-border"
                  : ""
              } ${i % 2 === 0 ? "border-r sm:border-r border-border" : ""}`}
            >
              <span className="text-2xl font-extrabold tabular-nums leading-none text-primary">
                {stat.value}
              </span>
              <span className="mt-2 text-xs font-medium text-muted-foreground">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function PartnerNetwork() {
  return (
    <section className="relative overflow-hidden bg-background">
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <span className="mb-4 inline-block border-l-2 border-primary pl-3 text-xs font-bold uppercase tracking-widest text-primary">
              Partner With Us
            </span>
            <h2 className="text-3xl font-extrabold leading-[1.1] tracking-tight text-foreground sm:text-4xl">
              Building a{" "}
              <span className="text-primary">responsible supply chain</span>
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
              We work with resellers, system integrators, vendors, and NGOs who
              share our commitment to ethical sourcing, environmental
              stewardship, and community development. If your organization
              aligns with these values, we want to hear from you.
            </p>
            <div className="mt-6 flex items-start gap-3 border border-border bg-card p-5">
              <Building2 className="h-5 w-5 shrink-0 text-primary" strokeWidth={1.6} />
              <div className="text-xs leading-relaxed text-muted-foreground">
                <strong className="text-foreground">CSR Reporting:</strong>{" "}
                Annual sustainability disclosures available to enterprise and
                government customers on request. Reach out via{" "}
                <a
                  href="mailto:info@simalme.com"
                  className="font-semibold text-primary hover:underline"
                >
                  info@simalme.com
                </a>
                .
              </div>
            </div>
          </div>
          <div className="overflow-hidden">
            <img
              src={mediaUrl("/assets/images/company-insights/LUX04853-scaled.jpg")}
              alt="Simal Technologies team engaging with the community"
              className="w-full h-auto aspect-[4/3] object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export function AboutCsrPage() {
  return (
    <>
      <CsrIntro />
      <CsrMissionBanner />
      <InitiativeAreas />
      <EngagementHighlights />
      <PartnerNetwork />
    </>
  );
}
