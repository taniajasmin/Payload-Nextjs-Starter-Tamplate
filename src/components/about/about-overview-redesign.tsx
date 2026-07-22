"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useAboutData } from "./about-data-provider";
import { mediaUrl } from "@/lib/media-url";
import {
  staggerContainer,
  staggerItem,
  easeOutExpo,
} from "./about-sections-shared";
import {
  Building2,
  Users,
  Shield,
  Target,
  Eye,
  Star,
  RefreshCw,
  Award,
} from "lucide-react";

/* ───────────────────────────────────────────────────────────────
   Enterprise design system — semantic tokens, flat cards,
   no rounded corners, bg-primary icons, font-extrabold.
   ─────────────────────────────────────────────────────────────── */

function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`container mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>;
}

function SectionHeading({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={`text-3xl font-extrabold leading-[1.1] tracking-tight text-foreground sm:text-4xl mb-4 ${className}`}
    >
      {children}
    </h2>
  );
}

/* ───────────────────────────────────────────────────────────────
   1. Our Story — 2-column
      LEFT: heading → body → image
      RIGHT: milestones timeline
   ─────────────────────────────────────────────────────────────── */

export function StorySection() {
  const { company, milestones: milestonesData } = useAboutData();

  const storyParagraphs = [
    "Founded in Dubai in 2002, Simal Technologies has spent over two decades building the supply chain behind the region's digital transformation. As an authorized distributor for 20+ global brands — from Crucial and UGREEN to HIKVISION, Dell, and Lenovo — we combine deep technical expertise with logistics reach across the Middle East, Africa, CIS, and GCC.",
    "We serve as the primary distribution arm across seven business divisions, backed by a 300+ strong team. Our Jebel Ali warehouse and Dubai headquarters position us at the centre of one of the world's busiest trade corridors.",
    "As part of the TwinMOS Group, we bridge international markets seamlessly — delivering genuine, warrantied products with the speed and reliability that modern businesses demand.",
  ];

  const milestones = milestonesData?.items?.slice(0, 5) ?? [];

  return (
    <section className="relative overflow-hidden bg-background">
      <Container className="relative z-10 py-12 lg:py-16">
        {/* ── 2-column layout ── */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 mb-16">
          {/* ── LEFT: Company info ── */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: easeOutExpo }}
            >
              <span className="mb-4 inline-block border-l-2 border-primary pl-3 text-xs font-bold uppercase tracking-widest text-primary">
                {company.badge || "Our Story"}
              </span>
              <SectionHeading>
                {company.heading}{" "}
                <span className="text-primary">{company.headingGradient}</span>
              </SectionHeading>

              <div className="space-y-3 leading-relaxed text-sm text-muted-foreground mb-6">
                {storyParagraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </motion.div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.3, ease: easeOutExpo }}
              className="overflow-hidden h-80 sm:h-96 lg:h-[27rem]"
            >
              <img
                src={mediaUrl("/assets/images/company-insights/LUX04898-scaled.jpg")}
                alt="Simal Technologies"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </motion.div>
          </div>

          {/* ── RIGHT: Milestones timeline ── */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.1, ease: easeOutExpo }}
            >
              <span className="mb-4 inline-block border-l-2 border-primary pl-3 text-xs font-bold uppercase tracking-widest text-primary">
                Our Journey
              </span>
              <SectionHeading>
                Key{" "}
                <span className="text-primary">
                  {milestonesData?.headingGradient || "Milestones"}
                </span>
              </SectionHeading>
              <p className="text-sm text-muted-foreground mb-8">
                22+ Years of Innovation, Growth &amp; Global Partnerships
              </p>
            </motion.div>

            {/* Vertical timeline */}
            <div className="relative pl-8">
              {/* Vertical line */}
              <div className="absolute left-[15px] top-2 bottom-2 w-0.5 bg-primary/30" />

              <div className="space-y-6">
                {milestones.map((m, i) => (
                  <motion.div
                    key={`${m.year}-${m.milestone}`}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.5, delay: 0.1 * i, ease: easeOutExpo }}
                    className="relative flex items-start gap-4"
                  >
                    {/* Circle marker on the line */}
                    <div className="absolute -left-8 top-1 w-[30px] h-[30px] border-2 border-primary bg-card z-10 flex items-center justify-center">
                      <div className="w-3 h-3 bg-primary" />
                    </div>

                    {/* Card */}
                    <div className="flex-1 border border-border bg-card p-4 ml-[5%]">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-sm font-extrabold text-primary">
                          {m.year}
                        </span>
                      </div>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {m.milestone}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ───────────────────────────────────────────────────────────────
   2. Core Values — 6 icon cards
   ─────────────────────────────────────────────────────────────── */

export function ValuesSection() {
  const { coreValues } = useAboutData();

  const values = [
    { icon: Shield, title: "Customer Excellence", desc: "Every decision starts with the customer. We deliver solutions that address real business challenges." },
    { icon: Star, title: "Integrity & Transparency", desc: "We conduct business with honesty, openness, and ethical responsibility — from pricing to partnerships." },
    { icon: Award, title: "Innovation & Agility", desc: "The technology landscape evolves rapidly. We stay ahead by continuously learning and adapting." },
    { icon: RefreshCw, title: "Quality & Reliability", desc: "Authorized distributor for the world's leading IT brands. Every product meets stringent quality standards." },
    { icon: Users, title: "Partnership & Collaboration", desc: "We succeed together — with brand partners, resellers, system integrators, and end customers." },
    { icon: Target, title: "Continuous Improvement", desc: "We constantly review processes, seek feedback, and invest in getting better every day." },
  ];

  return (
    <section className="relative overflow-hidden bg-background">
      <Container className="relative z-10 py-12 lg:py-16">
        {/* Centred header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: easeOutExpo }}
          className="text-center mb-10 md:mb-12"
        >
          <span className="mb-4 inline-block border-l-2 border-primary pl-3 text-xs font-bold uppercase tracking-widest text-primary">
            {coreValues.badge || "Core Principles"}
          </span>
          <SectionHeading>
            {coreValues.heading}{" "}
            <span className="text-primary">{coreValues.headingGradient}</span>
          </SectionHeading>
        </motion.div>

        {/* 6-card grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {values.map((v) => (
            <motion.div
              key={v.title}
              variants={staggerItem}
              className="border border-border bg-card p-5 border-l-[3px] border-l-primary"
            >
              {/* Icon */}
              <span className="flex h-10 w-10 shrink-0 items-center justify-center bg-primary mb-3">
                <v.icon className="h-5 w-5 text-primary-foreground" strokeWidth={1.6} />
              </span>

              <h3 className="text-base font-extrabold text-foreground mb-1.5">
                {v.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {v.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}

/* ───────────────────────────────────────────────────────────────
   3. Vision & Mission — 2 cards
   ─────────────────────────────────────────────────────────────── */

export function VisionMissionSection() {
  const { missionVision } = useAboutData();
  const [hoverVision, setHoverVision] = useState(false);
  const [hoverMission, setHoverMission] = useState(false);

  return (
    <section className="relative overflow-hidden bg-background">
      <Container className="relative z-10 py-12 lg:py-16">
        {/* Centred heading */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: easeOutExpo }}
          className="text-center mb-10 md:mb-12"
        >
          <span className="mb-4 inline-block border-l-2 border-primary pl-3 text-xs font-bold uppercase tracking-widest text-primary">
            {missionVision.badge || "Our Purpose"}
          </span>
          <SectionHeading>{missionVision.heading}</SectionHeading>
        </motion.div>

        {/* 2-card grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {/* Vision (Left) — dark card */}
          <div
            className="relative h-full"
            onMouseEnter={() => setHoverVision(true)}
            onMouseLeave={() => setHoverVision(false)}
          >
            <motion.img
              src={mediaUrl("/assets/images/about/distributor.avif")}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
              aria-hidden
              animate={{ x: hoverVision ? "-100%" : 0, transition: { duration: 0.5, ease: easeOutExpo } }}
            />
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, ease: easeOutExpo }}
              className="relative z-10 bg-slate-950 p-8 cursor-pointer h-full border border-white/10"
            >
              <div className="relative">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center bg-white/15 mb-4">
                  <Eye className="h-8 w-8 text-white" strokeWidth={1.6} />
                </span>
                <h3 className="text-lg font-extrabold text-white mb-2">
                  {missionVision.visionHeadline}
                </h3>
                <p className="text-white/75 leading-relaxed text-sm">
                  {missionVision.visionDesc}
                </p>
              </div>
            </motion.div>
          </div>

          {/* Mission (Right) — light card */}
          <div
            className="relative h-full"
            onMouseEnter={() => setHoverMission(true)}
            onMouseLeave={() => setHoverMission(false)}
          >
            <motion.img
              src={mediaUrl("/assets/images/about/empower.avif")}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
              aria-hidden
              animate={{ x: hoverMission ? "100%" : 0, transition: { duration: 0.5, ease: easeOutExpo } }}
            />
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: 0.15, ease: easeOutExpo }}
              className="relative z-10 border border-border bg-card p-8 cursor-pointer h-full"
            >
              <div className="relative">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center bg-muted mb-4">
                  <Target className="h-8 w-8 text-primary" strokeWidth={1.6} />
                </span>
                <h3 className="text-lg font-extrabold text-foreground mb-2">
                  {missionVision.missionHeadline}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {missionVision.missionDesc}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ───────────────────────────────────────────────────────────────
   4. Industries — trusted across sectors grid
   ─────────────────────────────────────────────────────────────── */

function IndustriesSection() {
  const industries = [
    { icon: Building2, name: "Enterprise", desc: "End-to-end IT infrastructure and hardware solutions for large-scale corporate environments." },
    { icon: Shield, name: "Government", desc: "Compliant, secure technology procurement for public sector and government agencies." },
    { icon: Award, name: "Education", desc: "Technology solutions that power modern classrooms, labs, and campus-wide infrastructure." },
    { icon: Star, name: "Retail", desc: "Point-of-sale, inventory management, and customer-facing technology for modern retail." },
    { icon: Eye, name: "Healthcare", desc: "Reliable, compliant hardware for hospitals, clinics, and healthcare providers." },
    { icon: Target, name: "Finance", desc: "Secure, high-performance technology for banking, fintech, and financial services." },
  ];

  return (
    <section className="relative overflow-hidden bg-background">
      <Container className="relative z-10 py-12 lg:py-16">
        <div className="text-center mb-10 md:mb-12">
          <span className="mb-4 inline-block border-l-2 border-primary pl-3 text-xs font-bold uppercase tracking-widest text-primary">
            Industries
          </span>
          <SectionHeading>
            Trusted across{" "}
            <span className="text-primary">sectors</span>
          </SectionHeading>
          <p className="text-sm text-muted-foreground">
            From enterprise IT to government procurement, we deliver tailored
            technology solutions across every sector.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {industries.map((ind) => (
            <div
              key={ind.name}
              className="flex items-start gap-4 border border-border bg-card p-4 border-l-[3px] border-l-primary"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center bg-primary">
                <ind.icon className="h-5 w-5 text-primary-foreground" strokeWidth={1.6} />
              </span>
              <div className="min-w-0">
                <div className="text-base font-extrabold text-foreground">
                  {ind.name}
                </div>
                <div className="text-sm leading-relaxed text-muted-foreground">
                  {ind.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ───────────────────────────────────────────────────────────────
   5. Awards & Recognition
   ─────────────────────────────────────────────────────────────── */

function AwardsSection() {
  const { awards } = useAboutData();

  return (
    <section className="relative overflow-hidden bg-background">
      <Container className="relative z-10 py-12 lg:py-16">
        <div className="text-center mb-10 md:mb-12">
          <span className="mb-4 inline-block border-l-2 border-primary pl-3 text-xs font-bold uppercase tracking-widest text-primary">
            {awards.badge || "Recognition"}
          </span>
          <SectionHeading>
            {awards.heading}{" "}
            <span className="text-primary">{awards.headingGradient}</span>
          </SectionHeading>
          <p className="text-sm leading-relaxed text-muted-foreground max-w-2xl mx-auto">
            Recognized by leading technology partners for outstanding
            performance, customer commitment, and distribution excellence.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-7xl mx-auto">
          {awards.awards.map((a, i) => {
            const awardImages = [
              "/assets/images/company-insights/hik-summit.jpg",
              "/assets/images/company-insights/Award3.jpg",
            ];
            return (
              <div
                key={a.title}
                className="border border-border bg-card flex flex-col overflow-hidden"
              >
                {/* Award image */}
                <div className="aspect-[4/3] overflow-hidden shrink-0 relative">
                  <img
                    src={mediaUrl(awardImages[i % awardImages.length])}
                    alt={a.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    loading="lazy"
                  />
                  {/* Description overlay on hover */}
                  <div className="absolute inset-0 bg-slate-950/80 flex items-end p-5 opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white/90 text-sm leading-relaxed">
                      {a.description}
                    </p>
                  </div>
                </div>
                {/* Headline — always visible */}
                <div className="flex items-center gap-4 p-5">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center bg-primary">
                    <Award className="h-6 w-6 text-primary-foreground" strokeWidth={1.6} />
                  </span>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-primary">
                      {a.year}
                    </span>
                    <h3 className="text-sm font-extrabold text-foreground">
                      {a.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {a.issuer}
                    </p>
                  </div>
                </div>
                {/* Bottom bar */}
                <div className="h-1 shrink-0 mt-auto bg-primary" />
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

/* ───────────────────────────────────────────────────────────────
   6. Gallery — recognition moments
   ─────────────────────────────────────────────────────────────── */

const GALLERY_IMAGES = [
  { src: "/assets/images/company-insights/hik-summit.jpg", alt: "HIKSEMi MEA Distributor Summit" },
  { src: "/assets/images/company-insights/Award.jpg", alt: "Industry recognition award ceremony" },
  { src: "/assets/images/company-insights/Award3.jpg", alt: "Award presentation on stage" },
  { src: "/assets/images/company-insights/LUX04898-scaled.jpg", alt: "Simal Technologies team with global brand partners" },
  { src: "/assets/images/company-insights/Award6.jpg", alt: "Award certificate on display" },
  { src: "/assets/images/company-insights/LUX04877-scaled.jpg", alt: "Corporate partnership event" },
  { src: "/assets/images/company-insights/LUX04853-scaled.jpg", alt: "Simal Technologies corporate gathering" },
  { src: "/assets/images/company-insights/LUX04847-scaled.jpg", alt: "Industry awards night" },
];

export function GallerySection() {
  return (
    <section className="relative overflow-hidden bg-background">
      <Container className="relative z-10 py-12 lg:py-16">
        <div className="text-center mb-10 md:mb-12">
          <span className="mb-4 inline-block border-l-2 border-primary pl-3 text-xs font-bold uppercase tracking-widest text-primary">
            Gallery
          </span>
          <SectionHeading>
            Recognition{" "}
            <span className="text-primary">Gallery</span>
          </SectionHeading>
          <p className="text-sm leading-relaxed text-muted-foreground max-w-2xl mx-auto">
            Moments from award ceremonies, brand summits, and partnership events.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {GALLERY_IMAGES.map((img) => (
            <div
              key={img.alt}
              className="border border-border bg-card overflow-hidden"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={mediaUrl(img.src)}
                  alt={img.alt}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="p-3">
                <p className="text-sm font-medium leading-snug text-foreground">
                  {img.alt}
                </p>
                <span className="inline-flex items-center gap-1 text-xs font-semibold mt-1 text-primary">
                  View
                </span>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ───────────────────────────────────────────────────────────────
   Divider component
   ─────────────────────────────────────────────────────────────── */

function SectionDivider() {
  return <div className="h-px bg-border" />;
}

/* ───────────────────────────────────────────────────────────────
   Composed overview — the /about page body
   ─────────────────────────────────────────────────────────────── */

export function AboutOverviewRedesign() {
  return (
    <>
      <StorySection />
      <SectionDivider />
      <ValuesSection />
      <SectionDivider />
      <VisionMissionSection />
      <SectionDivider />
      <IndustriesSection />
      <SectionDivider />
      <AwardsSection />
      <SectionDivider />
      <GallerySection />
    </>
  );
}

/* ───────────────────────────────────────────────────────────────
   Compatibility exports
   ─────────────────────────────────────────────────────────────── */

export function Coral({ children }: { children: React.ReactNode }) {
  return <span className="text-primary">{children}</span>;
}

export function SectionHead({
  eyebrow,
  heading,
  sub,
  center,
}: {
  eyebrow: string;
  eyebrowColor: string;
  heading: React.ReactNode;
  sub?: string;
  center?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: easeOutExpo }}
      className={`mb-8 md:mb-10 ${center ? "text-center mx-auto max-w-2xl" : ""}`}
    >
      <span className="mb-4 inline-block border-l-2 border-primary pl-3 text-xs font-bold uppercase tracking-widest text-primary">
        {eyebrow}
      </span>
      <h2 className="text-3xl font-extrabold leading-[1.1] tracking-tight text-foreground sm:text-4xl">
        {heading}
      </h2>
      {sub && (
        <p className={`mt-2.5 text-sm leading-relaxed max-w-xl ${center ? "mx-auto" : ""} text-muted-foreground`}>
          {sub}
        </p>
      )}
    </motion.div>
  );
}
