"use client";

import Link from "next/link";
import {
  BadgeCheck,
  Truck,
  Headphones,
  Calendar,
  Building2,
  Users,
  ArrowRight,
} from "lucide-react";
import { SectionShell } from "@/components/ui/section-shell";
import { Eyebrow } from "@/components/ui/eyebrow";

const STATS = [
  {
    icon: Calendar,
    value: "20+",
    label: "Years in UAE",
    sub: "Industry Leaders",
  },
  {
    icon: Users,
    value: "300+",
    label: "Employees Worldwide",
    sub: "Across 4 Regions",
  },
  {
    icon: BadgeCheck,
    value: "20+",
    label: "Brand Partners",
    sub: "Authorised Distributor",
  },
  {
    icon: Building2,
    value: "4",
    label: "Regional Markets",
    sub: "MEA · GCC · CIS · Africa",
  },
];

const FEATURES = [
  {
    icon: Truck,
    title: "Strategic Dubai Logistics.",
    desc: "Operating from JAFZA, Dubai — rapid customs clearance, multi-million-dirham warehousing, and last-mile GCC delivery.",
  },
  {
    icon: Headphones,
    title: "Expert Support. Every Time.",
    desc: "Certified engineers provide pre-sales consulting, deployment assistance, and GCC-wide SLA support with same-day response.",
  },
];

interface WhyUsProps {
  badge?: string;
  heading?: string;
  accent?: string;
  subheading?: string;
}

export default function WhyChooseUsNew({
  badge = "Why Choose Simal",
  heading = "Why Gulf Enterprises Choose Simal.",
  accent: _accent,
  subheading,
}: WhyUsProps) {
  const sub =
    subheading ??
    "Four reasons over 1,000 clients trust us with their IT infrastructure. We don't just supply hardware; we engineer the systems that allow enterprises to operate without friction. As the authorised partner for 20+ world-leading brands, every product we deliver is 100% genuine and fully manufacturer-warrantied.";

  return (
    <SectionShell id="why-choose-us-section" variant="default">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">
        <div>
          <Eyebrow className="mb-3 block">{badge}</Eyebrow>
          <h2 className="text-2xl font-extrabold tracking-tight text-foreground md:text-3xl lg:text-4xl">
            {heading}
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
            {sub}
          </p>

          <div className="mt-8 grid grid-cols-2 gap-4">
            {STATS.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="border border-border bg-card p-4"
                >
                  <div className="mb-2 inline-flex h-8 w-8 items-center justify-center bg-primary text-primary-foreground">
                    <Icon size={16} strokeWidth={2} />
                  </div>
                  <p className="text-sm font-semibold text-foreground">
                    {stat.value}
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{stat.label}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground/70">{stat.sub}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-5 lg:pt-12">
          {FEATURES.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.title}
                className="border border-border bg-card p-6 md:p-8"
              >
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center bg-primary text-primary-foreground">
                  <Icon size={22} strokeWidth={1.8} />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">
                  {feat.title}
                </h3>
                <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                  {feat.desc}
                </p>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-colors hover:text-primary"
                >
                  Learn More
                  <ArrowRight size={14} />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </SectionShell>
  );
}
