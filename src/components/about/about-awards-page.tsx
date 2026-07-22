"use client";

import dynamic from "next/dynamic";
import { useAboutData } from "./about-data-provider";

const AwardsStatsRow = dynamic(() =>
  import("./about-section-awards").then((m) => ({ default: m.AwardsStatsRow }))
);
const AwardsSection = dynamic(() =>
  import("./about-section-awards").then((m) => ({ default: m.AwardsSection }))
);
const CertificationsSection = dynamic(() =>
  import("./about-section-awards").then((m) => ({ default: m.CertificationsSection }))
);
const GallerySection = dynamic(() =>
  import("./about-overview-redesign").then((m) => ({ default: m.GallerySection }))
);

function AwardsIntro() {
  const { awards } = useAboutData();
  return (
    <section className="relative overflow-hidden bg-background">
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="mb-8 flex items-center gap-4 border-b pb-4">
          <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            About
          </span>
          <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
            {awards.badge}
          </span>
        </div>
        <span className="mb-4 inline-block border-l-2 border-primary pl-3 text-xs font-bold uppercase tracking-widest text-primary">
          {awards.badge}
        </span>
        <h2 className="max-w-2xl text-3xl font-extrabold leading-[1.1] tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          {awards.heading}{" "}
          <span className="text-primary">{awards.headingGradient}</span>
        </h2>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
          Recognized by leading technology partners for outstanding performance,
          customer commitment, and distribution excellence across the Middle
          East, Africa, CIS, and GCC regions.
        </p>
      </div>
    </section>
  );
}

function AwardsShowcaseBlock() {
  const { awards } = useAboutData();
  return (
    <section className="relative overflow-hidden bg-background">
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <AwardsStatsRow />
        <AwardsSection awards={awards.awards} />
      </div>
    </section>
  );
}

function CertificationsBlock() {
  const { awards } = useAboutData();
  return (
    <section className="relative overflow-hidden bg-muted">
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="mb-8 flex items-center gap-4 border-b pb-4">
          <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Compliance
          </span>
          <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
            Authorized
          </span>
        </div>
        <span className="mb-4 inline-block border-l-2 border-primary pl-3 text-xs font-bold uppercase tracking-widest text-primary">
          Certifications & Partnerships
        </span>
        <h2 className="max-w-2xl text-3xl font-extrabold leading-[1.1] tracking-tight text-foreground sm:text-4xl">
          Authorized distributor for{" "}
          <span className="text-primary">20+ global brands</span>
        </h2>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
          Every partnership below is backed by official authorization letters,
          direct manufacturer support, and full warranty coverage &mdash;
          available for tender submissions on request.
        </p>
        <div className="mt-10">
          <CertificationsSection certifications={awards.certifications} />
        </div>
      </div>
    </section>
  );
}

export function AboutAwardsPage() {
  return (
    <>
      <AwardsIntro />
      <AwardsShowcaseBlock />
      <CertificationsBlock />
      <GallerySection />
    </>
  );
}
