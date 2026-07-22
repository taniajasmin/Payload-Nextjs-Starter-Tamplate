"use client";

import dynamic from "next/dynamic";

const ValuesSection = dynamic(() =>
  import("./about-overview-redesign").then((m) => ({ default: m.ValuesSection }))
);
const VisionMissionSection = dynamic(() =>
  import("./about-overview-redesign").then((m) => ({ default: m.VisionMissionSection }))
);

export function AboutMissionVisionPage() {
  return (
    <>
      <VisionMissionSection />
      <div className="h-px bg-border" />
      <ValuesSection />
    </>
  );
}
