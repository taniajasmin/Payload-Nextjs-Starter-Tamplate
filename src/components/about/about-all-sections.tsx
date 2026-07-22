"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useAboutData } from "./about-data-provider";
import { ArrowRight, Users, Globe2, Award, Building2 } from "lucide-react";

/* Lazy-load the company-overview section bundles. */

const ImageCollageRow = dynamic(() =>
  import("./about-new-sections").then((m) => ({ default: m.ImageCollageRow }))
);
const IntroStatement = dynamic(() =>
  import("./about-new-sections").then((m) => ({ default: m.IntroStatement }))
);
const ImageQuoteSplit = dynamic(() =>
  import("./about-new-sections").then((m) => ({ default: m.ImageQuoteSplit }))
);
const TrustFeatureRow = dynamic(() =>
  import("./about-new-sections").then((m) => ({ default: m.TrustFeatureRow }))
);
const StorySection = dynamic(() =>
  import("./about-overview-redesign").then((m) => ({ default: m.StorySection }))
);

/* Company-at-a-glance stat grid */
function CompanyAtAGlance() {
  const stats = [
    { icon: Award, value: "20+", label: "Years of Excellence" },
    { icon: Globe2, value: "20+", label: "Global Brand Partners" },
    { icon: Users, value: "300+", label: "Team Professionals" },
    { icon: Building2, value: "7", label: "Business Divisions" },
  ];

  return (
    <section className="relative overflow-hidden bg-muted">
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 border border-border bg-card sm:grid-cols-4">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`flex flex-col items-center text-center p-6 md:p-8 ${
                i < stats.length - 1 ? "border-b sm:border-b-0 sm:border-r border-border" : ""
              } ${i % 2 === 0 ? "border-r sm:border-r" : ""} ${
                i === 1 ? "sm:border-r" : ""
              }`}
            >
              <span className="flex h-10 w-10 items-center justify-center bg-primary mb-3">
                <stat.icon className="h-5 w-5 text-primary-foreground" strokeWidth={1.6} />
              </span>
              <span className="text-2xl font-extrabold tabular-nums leading-none text-foreground">
                {stat.value}
              </span>
              <span className="mt-1 text-xs font-medium text-muted-foreground">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* TwinMOS Group + associated companies strip */
function GroupAffiliations() {
  const associated = [
    { name: "TwinMOS Group", role: "Parent Company" },
    { name: "StarSeed Technologies", role: "Affiliate" },
    { name: "Stellent Technologies", role: "Affiliate" },
  ];

  return (
    <section className="relative overflow-hidden bg-background">
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <span className="mb-4 inline-block border-l-2 border-primary pl-3 text-xs font-bold uppercase tracking-widest text-primary">
              Our Group
            </span>
            <h2 className="text-3xl font-extrabold leading-[1.1] tracking-tight text-foreground sm:text-4xl">
              Part of the{" "}
              <span className="text-primary">TwinMOS Group</span>
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
              Simal Technologies operates as the primary distribution arm of the
              TwinMOS Group, bridging international markets with seamless supply
              chain expertise. Our group structure gives us the scale, financial
              stability, and regional reach to deliver genuine, warrantied
              products with the speed modern businesses demand.
            </p>
          </div>
          <div className="space-y-3">
            {associated.map((c) => (
              <div
                key={c.name}
                className="flex items-center justify-between border border-border bg-card p-5"
              >
                <div>
                  <div className="text-base font-extrabold text-foreground">{c.name}</div>
                  <div className="text-xs font-medium text-muted-foreground">{c.role}</div>
                </div>
                <span className="h-2 w-2 bg-primary" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* Cross-links to sub-pages */
function SubPageCrossLinks() {
  const cards = [
    {
      href: "/about/leadership",
      label: "Leadership Team",
      desc: "Meet the chairman, managing director, and executive team driving Simal forward.",
    },
    {
      href: "/about/mission-vision",
      label: "Mission, Vision & Values",
      desc: "The principles that guide every partnership and decision we make.",
    },
    {
      href: "/about/awards",
      label: "Awards & Achievements",
      desc: "Industry recognition and certifications from our global brand partners.",
    },
    {
      href: "/about/csr",
      label: "CSR & Sustainability",
      desc: "Our commitment to community engagement and responsible business.",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-background">
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="border-t border-border pt-10">
          <div className="mb-8 flex items-center gap-4 border-b pb-4">
            <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Explore About
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
              Sections
            </span>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {cards.map((c) => (
              <Link
                key={c.href}
                href={c.href}
                className="group flex flex-col border border-border bg-card p-6 transition-colors hover:border-primary"
              >
                <h3 className="text-lg font-extrabold leading-[1.1] tracking-tight text-foreground">
                  {c.label}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {c.desc}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary">
                  Visit Page
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function AboutAllSections() {
  // Touch the data provider so the hook still validates context is wired.
  useAboutData();
  return (
    <>
      <ImageCollageRow />
      <IntroStatement />
      <StorySection />
      <ImageQuoteSplit />
      <CompanyAtAGlance />
      <GroupAffiliations />
      <TrustFeatureRow />
      <SubPageCrossLinks />
    </>
  );
}
