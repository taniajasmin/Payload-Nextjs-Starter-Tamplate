"use client";

import { SectionContainer } from "@/components/ui/section-container";

export default function IndustriesWeServe({
  badge,
  heading,
  subtext,
}: {
  badge?: string;
  heading?: string;
  subtext?: string;
}) {
  const displayBadge = badge || "Industries We Serve";
  const displayHeading = heading || "Trusted Across";
  const displaySubtext =
    subtext ||
    "From IT service providers to government procurement — Simal supplies certified hardware tailored to the unique demands of every sector across the Middle East and Africa.";

  /* Split heading: last word = accent */
  const words = displayHeading.trim().split(/\s+/);
  const accentWord = words.length > 1 ? words.pop()! : "";
  const leadText = words.join(" ");

  return (
    <SectionContainer
      id="industries-we-serve"
      variant="default"
      className="bg-background"
    >
      <div className="relative z-10">
        <div className="mx-auto max-w-2xl text-center">
          {/* Badge */}
          <div className="wow animate__fadeInDown mx-auto mb-5 inline-flex items-center gap-2 border-l-2 border-primary pl-3">
            <span className="text-[length:var(--font-section-label)] font-bold uppercase tracking-[0.18em] text-primary">
              {displayBadge}
            </span>
          </div>

          {/* Heading */}
          <h2
            className="wow animate__fadeInUp mb-3 font-extrabold tracking-tight text-foreground"
            data-wow-duration="0.7s"
            data-wow-delay="0.08s"
            style={{
              fontSize: "clamp(26px, 3.6vw, 40px)",
              letterSpacing: "-0.02em",
            }}
          >
            {leadText}{" "}
            {accentWord ? (
              <span className="text-primary">{accentWord}</span>
            ) : null}
          </h2>

          {/* Subtext */}
          <p
            className="wow animate__fadeInUp mx-auto max-w-xl text-[length:var(--font-body)] leading-relaxed text-muted-foreground"
            data-wow-duration="0.7s"
            data-wow-delay="0.14s"
          >
            {displaySubtext}
          </p>
        </div>
      </div>
    </SectionContainer>
  );
}
