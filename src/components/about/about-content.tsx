"use client";

import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import { useAboutData } from "./about-data-provider";
import { mediaUrl } from "@/lib/media-url";

/* ------------------------------------------------------------------
   Lazy-loaded section bundles — each sub-page only downloads the
   section components it actually renders instead of all 1,338 lines
   of about-sections code at once.  ~85% smaller initial JS per route.
   ------------------------------------------------------------------ */

const CompanyIntroSection = dynamic(() =>
  import("./about-section-company").then((m) => ({ default: m.CompanyIntroSection }))
);
const CompanyGlanceSection = dynamic(() =>
  import("./about-section-company").then((m) => ({ default: m.CompanyGlanceSection }))
);
const MissionVisionSection = dynamic(() =>
  import("./about-section-mission").then((m) => ({ default: m.MissionVisionSection }))
);
const ValuesManifestoSection = dynamic(() =>
  import("./about-section-values").then((m) => ({ default: m.ValuesManifestoSection }))
);
const CoreValuesSection = dynamic(() =>
  import("./about-section-values").then((m) => ({ default: m.CoreValuesSection }))
);
const CommitmentsSection = dynamic(() =>
  import("./about-section-values").then((m) => ({ default: m.CommitmentsSection }))
);
const ServicePillarsSection = dynamic(() =>
  import("./about-section-why-us").then((m) => ({ default: m.ServicePillarsSection }))
);
const MilestonesSection = dynamic(() =>
  import("./about-section-milestones").then((m) => ({ default: m.MilestonesSection }))
);
const LeadershipSection = dynamic(() =>
  import("./about-section-leadership").then((m) => ({ default: m.LeadershipSection }))
);
const DivisionsSection = dynamic(() =>
  import("./about-section-leadership").then((m) => ({ default: m.DivisionsSection }))
);
const AwardsSection = dynamic(() =>
  import("./about-section-awards").then((m) => ({ default: m.AwardsSection }))
);
const CertificationsSection = dynamic(() =>
  import("./about-section-awards").then((m) => ({ default: m.CertificationsSection }))
);
const AwardsStatsRow = dynamic(() =>
  import("./about-section-awards").then((m) => ({ default: m.AwardsStatsRow }))
);

/* ------------------------------------------------------------------
   Shared UI (lightweight — stays in the main bundle)
   ------------------------------------------------------------------ */

type Section =
  | "company"
  | "mission"
  | "values"
  | "why-us"
  | "milestones"
  | "leadership"
  | "awards";

const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];

const sectionTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: easeOutExpo } },
  exit: { opacity: 0, y: -16, transition: { duration: 0.25, ease: easeOutExpo } },
};

function SectionHeader({
  badge,
  heading,
  headingGradient,
  description,
}: {
  badge: string;
  heading: string;
  headingGradient?: string;
  description?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: easeOutExpo }}
      className="text-center mb-12"
    >
      <span className="inline-flex items-center gap-2 border-l-2 border-primary pl-3 pr-4 py-2 mb-6 text-xs font-bold uppercase tracking-widest text-primary">
        {badge}
      </span>
      <h2 className="text-[length:var(--font-heading)] font-extrabold tracking-tighter leading-none">
        <span className="text-foreground">{heading}</span>{" "}
        {headingGradient && (
          <span className="text-primary">{headingGradient}</span>
        )}
      </h2>
      {description && (
        <p className="mt-6 text-[length:var(--font-body)] text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          {description}
        </p>
      )}
    </motion.div>
  );
}

function SectionSkeleton() {
  return (
    <div className="animate-pulse space-y-6">
      <div className="h-8 w-48 mx-auto bg-muted" />
      <div className="h-12 max-w-xl mx-auto bg-muted" />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-24 border border-border bg-muted" />
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------
   AboutContent
   ------------------------------------------------------------------ */

export function AboutContent({ section }: { section: Section }) {
  const data = useAboutData();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={section}
        variants={sectionTransition}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {section === "company" && (
          <section className="relative w-full py-28 md:py-36 bg-muted overflow-hidden">
            <div className="relative z-10 container-primary">
              <SectionHeader
                badge={data.company.badge}
                heading={data.company.heading}
                headingGradient={data.company.headingGradient}
                description={data.company.description}
              />
              <CompanyIntroSection
                imageSrc={mediaUrl("/assets/images/company-insights/LUX04898-scaled.jpg")}
                imageAlt="The Simal Technologies team with global brand partners"
                caption="The Simal Technologies team with our global brand partners"
                narrative="Founded in Dubai in 2002, Simal Technologies has spent over two decades building the supply chain behind the region's digital transformation. As an authorized distributor for 20+ global brands — from Crucial and UGREEN to HIKVISION, Dell, and Lenovo — we combine deep technical expertise with the logistics reach to deliver enterprise-grade technology across the Middle East, Africa, CIS, and GCC, backed by a 300+ strong team across seven business divisions."
                stats={[
                  { value: "20+", label: "Years" },
                  { value: "20+", label: "Brand Partners" },
                  { value: "300+", label: "Professionals" },
                ]}
              />
              <CompanyGlanceSection companyDetails={data.company.details} />
            </div>
          </section>
        )}

        {section === "mission" && (
          <section className="relative w-full py-28 md:py-36 bg-background overflow-hidden">
            <div className="relative z-10 container-primary">
              <SectionHeader badge={data.missionVision.badge} heading={data.missionVision.heading} />
              <MissionVisionSection
                missionHeadline={data.missionVision.missionHeadline}
                missionDesc={data.missionVision.missionDesc}
                visionHeadline={data.missionVision.visionHeadline}
                visionDesc={data.missionVision.visionDesc}
                visionStandards={data.missionVision.visionStandards}
              />
            </div>
          </section>
        )}

        {section === "values" && (
          <section className="relative w-full py-28 md:py-36 bg-muted overflow-hidden">
            <div className="relative z-10 container-primary">
              <SectionHeader
                badge={data.coreValues.badge}
                heading={data.coreValues.heading}
                headingGradient={data.coreValues.headingGradient}
              />
              <ValuesManifestoSection
                imageSrc={mediaUrl("/assets/images/company-insights/WhatsApp-Image-2025-02-25-at-12.33.41_656dbc38.jpg")}
                imageAlt="The Simal Technologies team — the people who live our values every day"
                caption="The people behind our principles"
                manifesto="For over two decades, these principles have guided every decision at Simal Technologies — from the brands we choose to partner with, to the way we serve each customer across the Middle East, Africa, CIS, and GCC. Our values aren't slogans on a wall; they're the operating standards our 300+ team members live every day."
                accent="Values that ship with every order."
              />
              <CoreValuesSection coreValues={data.coreValues.values} />
              <div className="mt-20">
                <CommitmentsSection
                  commitments={[
                    { title: "100% Genuine & Warrantied", desc: "Every product is sourced directly from authorized manufacturers and backed by full warranty and RMA support." },
                    { title: "Rapid Response & Support", desc: "Proactive, multi-lingual support in English, Arabic, Hindi, Urdu, and Bengali — with fast turnaround on every request." },
                    { title: "Authorized & Trusted", desc: "Official authorized distributor for 20+ global brands, with authorization letters available for tender submissions." },
                    { title: "Continuous Improvement", desc: "We constantly review our processes, seek feedback, and invest in getting better every single day." },
                  ]}
                />
              </div>
            </div>
          </section>
        )}

        {section === "why-us" && (
          <section className="relative w-full py-28 md:py-36 bg-background overflow-hidden">
            <div className="relative z-10 container-primary">
              <SectionHeader
                badge={data.whyChooseUs.badge}
                heading={data.whyChooseUs.heading}
                headingGradient={data.whyChooseUs.headingGradient}
                description={data.whyChooseUs.description}
              />
              <ServicePillarsSection pillars={data.whyChooseUs.pillars} />
            </div>
          </section>
        )}

        {section === "milestones" && (
          <section className="relative w-full py-28 md:py-36 bg-muted overflow-hidden">
            <div className="relative z-10 container-primary">
              <SectionHeader
                badge={data.milestones.badge}
                heading={data.milestones.heading}
                headingGradient={data.milestones.headingGradient}
              />
              <MilestonesSection milestones={data.milestones.items} />
            </div>
          </section>
        )}

        {section === "leadership" && (
          <section className="relative w-full py-28 md:py-36 bg-background overflow-hidden">
            <div className="relative z-10 container-primary">
              <SectionHeader
                badge={data.leadership.badge}
                heading={data.leadership.heading}
                headingGradient={data.leadership.headingGradient}
              />
              <LeadershipSection boardOfDirectors={data.leadership.board} />
              <div className="mt-16">
                <DivisionsSection divisions={data.leadership.divisions} />
              </div>
            </div>
          </section>
        )}

        {section === "awards" && (
          <section className="relative w-full py-16 md:py-24 bg-background overflow-hidden">
            <div className="relative z-10 container-primary">
              <SectionHeader
                badge={data.awards.badge}
                heading={data.awards.heading}
                headingGradient={data.awards.headingGradient}
              />
              <AwardsStatsRow />

              <div className="grid lg:grid-cols-2 gap-8">
                <AwardsSection awards={data.awards.awards} />
                <CertificationsSection certifications={data.awards.certifications} />
              </div>
            </div>
          </section>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
