"use client";

import { createContext, useContext, type ReactNode } from "react";

export interface AboutPageData {
  hero: {
    badge: string;
    headline: string;
    description: string;
    secondaryDescription: string;
  };
  company: {
    badge: string;
    heading: string;
    headingGradient: string;
    description: string;
    details: Array<{ label: string; value: string }>;
  };
  missionVision: {
    badge: string;
    heading: string;
    missionHeadline: string;
    missionDesc: string;
    visionHeadline: string;
    visionDesc: string;
    visionStandards: Array<{ title: string; desc: string }>;
  };
  coreValues: {
    badge: string;
    heading: string;
    headingGradient: string;
    values: Array<{ number: string; title: string; desc: string }>;
  };
  whyChooseUs: {
    badge: string;
    heading: string;
    headingGradient: string;
    description: string;
    pillars: Array<{ number: string; title: string; intro: string; benefits: string[] }>;
  };
  milestones: {
    badge: string;
    heading: string;
    headingGradient: string;
    items: Array<{ year: string; milestone: string }>;
  };
  leadership: {
    badge: string;
    heading: string;
    headingGradient: string;
    board: Array<{ name: string; code: string; role: string; profile: string }>;
    divisions: Array<{ name: string; size: string; focus: string }>;
  };
  awards: {
    badge: string;
    heading: string;
    headingGradient: string;
    awards: Array<{ year: string; title: string; issuer: string; description: string }>;
    certifications: Array<{ cert: string; authority: string; status: string }>;
  };
  cta: {
    heading: string;
    description: string;
    primaryLabel: string;
    primaryHref: string;
    secondaryLabel: string;
    secondaryHref: string;
  };
}

const AboutDataContext = createContext<AboutPageData | null>(null);

export function AboutDataProvider({
  children,
  data,
}: {
  children: ReactNode;
  data: AboutPageData;
}) {
  return (
    <AboutDataContext.Provider value={data}>{children}</AboutDataContext.Provider>
  );
}

export function useAboutData(): AboutPageData {
  const context = useContext(AboutDataContext);
  if (!context) {
    throw new Error("useAboutData must be used within an AboutDataProvider");
  }
  return context;
}
