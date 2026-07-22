"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { mediaUrl } from "@/lib/media-url";
import {
  fadeInUp,
  staggerContainer,
  staggerItem,
} from "@/components/about/about-sections";
import {
  Star,
  Globe,
  Users,
  TrendingUp,
  BookOpen,
  Heart,
  Briefcase,
  MapPin,
  Clock,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Building2,
  HeadphonesIcon,
  BarChart3,
  Megaphone,
  Calculator,
  Package,
  GraduationCap,
} from "lucide-react";

/* ─── Department → Icon mapping ─── */
const departmentIcons: Record<string, React.ReactNode> = {
  "Sales & Business Development": <Briefcase className="w-5 h-5" strokeWidth={1.6} />,
  "Product Management": <BarChart3 className="w-5 h-5" strokeWidth={1.6} />,
  "Technical Support": <HeadphonesIcon className="w-5 h-5" strokeWidth={1.6} />,
  "Warehouse & Logistics": <Package className="w-5 h-5" strokeWidth={1.6} />,
  Marketing: <Megaphone className="w-5 h-5" strokeWidth={1.6} />,
  "Finance & Administration": <Calculator className="w-5 h-5" strokeWidth={1.6} />,
};

/* ─── Why Join → Icon mapping ─── */
const whyJoinIcons = [
  <Star key="1" className="w-5 h-5" strokeWidth={1.6} />,
  <Globe key="2" className="w-5 h-5" strokeWidth={1.6} />,
  <Users key="3" className="w-5 h-5" strokeWidth={1.6} />,
  <TrendingUp key="4" className="w-5 h-5" strokeWidth={1.6} />,
  <BookOpen key="5" className="w-5 h-5" strokeWidth={1.6} />,
  <Heart key="6" className="w-5 h-5" strokeWidth={1.6} />,
];

/* ================================================================
   1. CareersHeroSection
   ================================================================ */
interface CTAButton {
  href: string;
  label: string;
}

interface CareersHeroProps {
  badge: string;
  badgeIcon?: React.ReactNode;
  title: string;
  subtitle: string;
  description?: string;
  primaryCta?: CTAButton;
  secondaryCta?: CTAButton;
  breadcrumb?: { label: string; href: string; current?: string };
}

export function CareersHeroSection({
  badge,
  badgeIcon,
  title,
  subtitle,
  description,
  primaryCta,
  secondaryCta,
  breadcrumb,
}: CareersHeroProps) {
  return (
    <section className="relative overflow-hidden bg-slate-950">
      <img
        src={mediaUrl("/assets/images/homepage/hello.avif")}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-slate-950/85 via-slate-950/70 to-primary/25" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="max-w-3xl">
          {/* Breadcrumb */}
          {breadcrumb && (
            <div className="flex items-center gap-2 text-sm text-slate-300 mb-4">
              <a
                href={breadcrumb.href}
                className="hover:text-white transition-colors"
              >
                {breadcrumb.label}
              </a>
              <span className="text-slate-500">/</span>
              <span className="text-white">{breadcrumb.current}</span>
            </div>
          )}

          {/* Enterprise badge */}
          <span className="mb-4 inline-flex items-center gap-2 border-l-2 border-primary pl-3 text-xs font-bold uppercase tracking-widest text-primary">
            {badgeIcon && <span className="shrink-0">{badgeIcon}</span>}
            {badge}
          </span>

          <h1 className="text-3xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-4xl lg:text-5xl">
            {title}
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-300">
            {subtitle}
          </p>

          {description && (
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-400">
              {description}
            </p>
          )}

          {(primaryCta || secondaryCta) && (
            <div className="mt-8 flex flex-wrap gap-3">
              {primaryCta && (
                <a
                  href={primaryCta.href}
                  className="inline-flex items-center gap-2 bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  {primaryCta.label}
                  <ArrowRight className="h-4 w-4" />
                </a>
              )}
              {secondaryCta && (
                <a
                  href={secondaryCta.href}
                  className="inline-flex items-center gap-2 border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                >
                  {secondaryCta.label}
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   2. DepartmentsSection
   ================================================================ */
interface Department {
  name: string;
  openings: number;
  description: string;
}

export function DepartmentsSection({ departments }: { departments: Department[] }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={staggerContainer}
      className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {departments.map((dept) => {
        const icon = departmentIcons[dept.name] || <Building2 className="w-5 h-5" strokeWidth={1.6} />;
        return (
          <motion.div key={dept.name} variants={staggerItem}>
            <div className="flex h-full flex-col border border-border bg-card p-6 md:p-8">
              <div className="flex items-center justify-between mb-4">
                <div className="shrink-0 text-primary">
                  {icon}
                </div>
                {dept.openings > 0 && (
                  <span className="inline-flex items-center gap-1.5 border border-primary/30 bg-primary/5 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-primary">
                    <span className="w-1.5 h-1.5 bg-primary" />
                    {dept.openings} opening{dept.openings > 1 ? "s" : ""}
                  </span>
                )}
              </div>
              <h3 className="text-xl font-extrabold leading-[1.1] tracking-tight text-foreground mb-2">
                {dept.name}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {dept.description}
              </p>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

/* ================================================================
   3. WhyJoinSection
   ================================================================ */
interface Benefit {
  title: string;
  description: string;
}

export function WhyJoinSection({ benefits }: { benefits: Benefit[] }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={staggerContainer}
      className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {benefits.map((item, i) => {
        return (
          <motion.div key={item.title} variants={staggerItem}>
            <div className="flex h-full flex-col border border-border bg-card p-6 md:p-8">
              <div className="shrink-0 text-primary mb-5">
                {whyJoinIcons[i % whyJoinIcons.length]}
              </div>
              <h3 className="text-xl font-extrabold leading-[1.1] tracking-tight text-foreground mb-3">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

/* ================================================================
   4. ApplicationCTA
   ================================================================ */
interface ApplicationCTAProps {
  heading: string;
  subtitle: string;
  primaryCta: CTAButton;
  secondaryCta?: CTAButton;
}

export function ApplicationCTA({
  heading,
  subtitle,
  primaryCta,
  secondaryCta,
}: ApplicationCTAProps) {
  return (
    <section className="relative overflow-hidden bg-slate-950">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-slate-950/85 via-slate-950/70 to-primary/25" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 text-center">
        <h2 className="text-3xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-4xl lg:text-5xl">
          {heading}
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-sm leading-relaxed text-slate-300">
          {subtitle}
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <a
            href={primaryCta.href}
            className="inline-flex items-center gap-2 bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {primaryCta.label}
          </a>
          {secondaryCta && (
            <a
              href={secondaryCta.href}
              className="inline-flex items-center gap-2 border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              {secondaryCta.label}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   5. JobDetailContent
   ================================================================ */
interface JobDetailProps {
  slug: string;
  title?: string;
  department?: string;
  location?: string;
  type?: string;
  experience?: string;
  description?: string;
  responsibilities?: string[];
  requirements?: string[];
  benefits?: string[];
}

export function JobDetailContent({
  slug,
  title,
  department,
  location,
  type,
  experience,
  description,
  responsibilities,
  requirements,
  benefits,
}: JobDetailProps) {
  const displayTitle = title || slug.replace(/-/g, " ");
  const tags = [
    location && { label: location, icon: <MapPin className="w-3 h-3" /> },
    type && { label: type, icon: <Clock className="w-3 h-3" /> },
    department && { label: department, icon: <Briefcase className="w-3 h-3" /> },
    experience && { label: experience, icon: <GraduationCap className="w-3 h-3" /> },
  ]
    .filter(Boolean)
    .map((t, i) => ({ ...t!, key: i }));

  const defaultResponsibilities = [
    "Manage and grow key accounts within the assigned territory",
    "Develop new business opportunities through prospecting and networking",
    "Collaborate with product and marketing teams on go-to-market strategies",
    "Meet or exceed quarterly and annual sales targets",
  ];

  const defaultRequirements = [
    "Relevant experience in the IT distribution or technology sector",
    "Strong communication and negotiation skills",
    "Bachelor's degree in a relevant field",
    "UAE driving license preferred",
  ];

  const defaultBenefits = [
    "Competitive salary + commission structure",
    "Health insurance for employee and family",
    "Visa sponsorship",
    "Annual leave and public holidays",
    "Professional development and training budget",
  ];

  const respList = responsibilities?.length ? responsibilities : defaultResponsibilities;
  const reqList = requirements?.length ? requirements : defaultRequirements;
  const benList = benefits?.length ? benefits : defaultBenefits;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={staggerContainer}
    >
      {/* Tags */}
      {tags.length > 0 && (
        <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-2 mb-8">
          {tags.map((tag) => (
            <span
              key={tag.key}
              className="inline-flex items-center gap-1.5 border border-border bg-muted px-3 py-1.5 text-xs font-medium text-muted-foreground"
            >
              {tag.icon}
              {tag.label}
            </span>
          ))}
        </motion.div>
      )}

      {/* About This Role */}
      <motion.div variants={fadeInUp}>
        <h2 className="text-xl font-extrabold leading-[1.1] tracking-tight text-foreground mb-3">
          About This Role
        </h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {description ||
            `This is a placeholder for the job detail content. Full job description, requirements,
            responsibilities, and benefits will be loaded from the CMS via the slug: ${slug}.`}
        </p>
      </motion.div>

      {/* Responsibilities */}
      <motion.div variants={fadeInUp} className="mt-8">
        <h2 className="text-xl font-extrabold leading-[1.1] tracking-tight text-foreground mb-3">
          Responsibilities
        </h2>
        <ul className="space-y-2.5">
          {respList.map((item, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
              <CheckCircle2 className="shrink-0 w-4 h-4 mt-0.5 text-primary" strokeWidth={1.6} />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Requirements */}
      <motion.div variants={fadeInUp} className="mt-8">
        <h2 className="text-xl font-extrabold leading-[1.1] tracking-tight text-foreground mb-3">
          Requirements
        </h2>
        <ul className="space-y-2.5">
          {reqList.map((item, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
              <CheckCircle2 className="shrink-0 w-4 h-4 mt-0.5 text-primary" strokeWidth={1.6} />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Benefits */}
      <motion.div variants={fadeInUp} className="mt-8">
        <h2 className="text-xl font-extrabold leading-[1.1] tracking-tight text-foreground mb-3">
          Benefits
        </h2>
        <ul className="space-y-2.5">
          {benList.map((item, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
              <CheckCircle2 className="shrink-0 w-4 h-4 mt-0.5 text-primary" strokeWidth={1.6} />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Apply CTA */}
      <motion.div variants={fadeInUp} className="mt-10">
        <Link
          href="/careers/apply"
          className="inline-flex items-center gap-2 bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Apply for This Position
          <ArrowRight className="h-4 w-4" />
        </Link>
      </motion.div>
    </motion.div>
  );
}
