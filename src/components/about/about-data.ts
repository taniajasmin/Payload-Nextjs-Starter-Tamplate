import { cache } from "react";
import { fetchGlobal } from "@/lib/fetch-global";

/* ------------------------------------------------------------------
   Fallback data
   ------------------------------------------------------------------ */

export const fallbackCompanyDetails = [
  { label: "Legal Name", value: "Simal Technologies Middle East LLC" },
  { label: "Founded", value: "2002" },
  { label: "Headquarters", value: "Office No: 201, Dar Al Riffa Building, Khalid Bin Al Waleed Rd, Bur Dubai, PO Box: 49740, Dubai, UAE" },
  { label: "Phone", value: "+971 4 393 0507" },
  { label: "Email", value: "info@simalme.com" },
  { label: "Website", value: "www.simalme.com" },
  { label: "Employees", value: "300+ across all divisions" },
  { label: "Annual Revenue", value: "~$1.97 Million USD" },
  { label: "VAT/TAX ID", value: "100207478700003" },
  { label: "Parent Company", value: "TwinMOS Group" },
  { label: "Business Model", value: "Local Wholesaler, Global Wholesaler (Importer/Exporter), Distributor" },
  { label: "Tagline", value: "Best IT Distributor in Dubai, UAE" },
];

export const fallbackMissionHeadline = "Empowering businesses with essential tools for a digital-first landscape";
export const fallbackMissionDesc = "Simal Technologies is committed to bridging the technology gap for businesses across the Middle East, Africa, CIS, and GCC regions. With a clear mission to empower digital transformation, Simal focuses on proactive customer service, rapid response times, and a continuous improvement mindset. Our experienced team works relentlessly to ensure precision in delivery, high availability of stock, and strategic support that fuels our clients' success.";

export const fallbackVisionHeadline = "To be the premier IT solutions distributor";
export const fallbackVisionDesc = "Going beyond product delivery, we empower businesses with innovative technology solutions that drive sustainable growth, improve operational efficiency, and unlock new opportunities. Through trusted partnerships, expert guidance, and customer-focused service, we help organizations confidently embrace digital transformation and achieve long-term success.";

export const fallbackVisionStandards = [
  { title: "Service Excellence", desc: "Unmatched customer support and technical expertise" },
  { title: "Innovation Leadership", desc: "Bringing cutting-edge technology to our markets first" },
  { title: "Regional Dominance", desc: "Being the first-choice IT distributor across all served markets" },
  { title: "Trusted Partnership", desc: "Building long-term relationships that drive mutual growth" },
];

export const fallbackCoreValues = [
  { number: "01", title: "Customer-Centric Excellence", desc: "Every decision we make starts with the customer. We listen, understand, and deliver solutions that address real business challenges." },
  { number: "02", title: "Integrity & Transparency", desc: "We conduct business with honesty, openness, and ethical responsibility. From pricing to partnerships, we believe in doing the right thing." },
  { number: "03", title: "Innovation & Agility", desc: "The technology landscape evolves rapidly. We stay ahead by continuously learning, adapting, and bringing innovative solutions to our customers." },
  { number: "04", title: "Quality & Reliability", desc: "We are authorized distributors for the world's leading IT brands. Every product meets stringent quality standards, backed by full manufacturer warranty." },
  { number: "05", title: "Partnership & Collaboration", desc: "We succeed together — with our brand partners, our resellers, our system integrators, and our end customers." },
  { number: "06", title: "Continuous Improvement", desc: "We never stand still. We constantly review our processes, seek feedback, and invest in improvement." },
];

export const fallbackMilestones = [
  { year: "2002", milestone: "Simal Technologies founded in Dubai, UAE" },
  { year: "2005", milestone: "Established first major brand partnerships" },
  { year: "2010", milestone: "Expanded to 50+ employees across multiple divisions" },
  { year: "2015", milestone: "Joined TwinMOS Group; launched Corporate division" },
  { year: "2018", milestone: "Expanded market reach to Africa and CIS regions" },
  { year: "2020", milestone: "Launched e-commerce catalog (76 products)" },
  { year: "2022", milestone: "20th Anniversary; crossed $1.5M annual revenue" },
  { year: "2025", milestone: "Awarded HIKSEMi Best Distribution Partner at MEA Summit" },
  { year: "2026", milestone: "Launching new enterprise website" },
];

export const fallbackServicePillars = [
  { number: "01", title: "Authorized Partnerships", intro: "Official authorized distributor for 20+ global IT brands including Crucial, UGREEN, HIKVISION, ARKTEK, Dell, HP, Lenovo, Samsung, Kingston, and more.", benefits: ["100% genuine products with full manufacturer warranty", "Direct access to manufacturer support and RMA processes", "Early access to new product launches and promotional pricing", "Official authorization letters available for tender submissions"] },
  { number: "02", title: "Regional Coverage", intro: "Serving businesses across UAE, GCC, Africa, and CIS with seamless logistics and reliable delivery networks.", benefits: ["UAE-wide delivery (Dubai, Abu Dhabi, Sharjah, all emirates)", "GCC distribution (Saudi Arabia, Qatar, Kuwait, Bahrain, Oman)", "Africa coverage (Egypt, Nigeria, Kenya, South Africa)", "CIS markets (Kazakhstan, Uzbekistan, Azerbaijan)"] },
  { number: "03", title: "Seamless Process", intro: "From consultation to delivery, we ensure a smooth, efficient workflow to meet your technology requirements.", benefits: ["Consultation — Understand your requirements", "Quotation — Competitive, personalized pricing", "Fulfillment — Pick, pack, and dispatch from our Jebel Ali warehouse", "After-Sales — Ongoing support and warranty assistance"] },
  { number: "04", title: "Dedicated Team", intro: "Our experienced team is committed to providing personalized support and innovative solutions for your business.", benefits: ["Certified technical professionals across multiple vendor platforms", "Industry-trained sales teams organized by business division", "Multi-lingual support (English, Arabic, Hindi, Urdu, Bengali)"] },
  { number: "05", title: "Custom Solutions", intro: "We offer tailored storage and memory solutions that align with your unique business goals and technical needs.", benefits: ["Bulk order configurations for enterprise deployments", "Kitting and bundling services", "Pre-configured solutions for specific industries"] },
];

export const fallbackBoardOfDirectors = [
  { name: "Mohammad Mazharul Islam", code: "STBL-0001", role: "Chairman — Strategic Vision & Corporate Governance", profile: "Provides the overarching strategic direction for Simal Technologies and TwinMOS Group. His leadership has been instrumental in establishing Simal Technologies as a premier IT distributor in the UAE over two decades." },
  { name: "Mohammad Zahirul Islam", code: "STBL-0002", role: "Managing Director — Operational Leadership & Business Strategy", profile: "Oversees day-to-day operations and drives strategic initiatives. Under his guidance, Simal Technologies has expanded its market reach across the Middle East, Africa, CIS, and GCC regions." },
  { name: "S. M. Mohibul Hasan", code: "STBL-1900", role: "Deputy Managing Director", profile: "Supports the MD in operational oversight and leads key strategic projects. His focus on operational excellence has contributed to consistent growth." },
];

export const fallbackDivisions = [
  { name: "SBU 1", size: "48 professionals", focus: "Connectivity & Presentation (Monitors, Peripherals, Power Systems)" },
  { name: "SBU 2", size: "18 professionals", focus: "Digital Workspaces (Notebooks, PCs, Printers, Servers)" },
  { name: "SBU 3", size: "24 professionals", focus: "Networking & Surveillance" },
  { name: "SBU 4", size: "34 professionals", focus: "Mobility & Accessories (Smartphones, Gimbals, Microphones)" },
  { name: "B2B Corporate", size: "66 professionals", focus: "Enterprise Systems Group (ESG) & Personal Systems Group (PSG)" },
  { name: "B2B Solution", size: "92 professionals", focus: "Technology Architecture (HPE, Dell, EMC, Cisco)" },
  { name: "B2G", size: "18 professionals", focus: "Government & Corporate Tenders" },
];

export const fallbackAwards = [
  { year: "2025", title: "HIKSEMi Best Distribution Partner 2025", issuer: "HIKSEMi MEA National Distributor Summit", description: "Recognizes the top-performing distributor in the Middle East and Africa region for outstanding sales performance, market coverage, and brand representation." },
  { year: "Multi-Year", title: "HikVision Best Distributor Partner", issuer: "HikVision Digital Technology", description: "Ongoing recognition for exceptional performance in representing and distributing HikVision's comprehensive portfolio of security and surveillance products." },
];

export const fallbackCertifications = [
  { cert: "UAE Trade License", authority: "Department of Economic Development, Dubai", status: "Active" },
  { cert: "VAT Registration (100207478700003)", authority: "UAE Federal Tax Authority", status: "Active" },
  { cert: "Authorized Distributor — Crucial", authority: "Micron Technology", status: "Active" },
  { cert: "Authorized Distributor — HIKVISION", authority: "HikVision Digital Technology", status: "Active" },
  { cert: "Authorized Distributor — UGREEN", authority: "UGREEN Group Limited", status: "Active" },
  { cert: "Authorized Distributor — Dell", authority: "Dell Technologies", status: "Active" },
  { cert: "Authorized Distributor — HP", authority: "HP Inc.", status: "Active" },
  { cert: "Authorized Distributor — Lenovo", authority: "Lenovo Group", status: "Active" },
  { cert: "Authorized Distributor — Samsung", authority: "Samsung Electronics", status: "Active" },
];

/* ── Hero fallbacks ── */
export const fallbackHeroBadge = "About us";
export const fallbackHeroHeadline = "About Simal Technologies";
export const fallbackHeroDesc = "Established in 2002, Simal Technologies has grown into one of the most trusted and recognized IT distribution companies in the UAE, serving as a key supply chain partner for IT solutions across the Middle East, Africa, CIS, and GCC countries.";
export const fallbackHeroSecondaryDesc = "As an authorized distributor of globally recognized brands including Crucial, UGREEN, and other leading IT hardware manufacturers, we deliver cutting-edge technology products, timely services, and unparalleled customer support.";

/* ── Section header fallbacks ── */
export const fallbackCompanyBadge = "Who We Are";
export const fallbackCompanyHeading = "Company at a";
export const fallbackCompanyHeadingGradient = "Glance";
export const fallbackCompanyDesc = "As an authorized distributor of globally recognized brands, including Crucial, UGREEN, and other leading IT hardware manufacturers, Simal Technologies offers a robust portfolio that includes enterprise SSDs, RAM, NAS storage, docking stations, networking devices, and more.";

export const fallbackMissionVisionBadge = "Our Purpose";
export const fallbackMissionVisionHeading = "Mission & Vision";

export const fallbackCoreValuesBadge = "What We Believe";
export const fallbackCoreValuesHeading = "Our Core";
export const fallbackCoreValuesHeadingGradient = "Values";

export const fallbackWhyChooseBadge = "Why Choose Us";
export const fallbackWhyChooseHeading = "Your Trusted Partner in";
export const fallbackWhyChooseHeadingGradient = "Quality & Performance";
export const fallbackWhyChooseDesc = "We deliver high-quality memory, storage, and SSD solutions, combining performance, reliability, and innovation to meet your technology needs.";

export const fallbackMilestonesBadge = "Our Journey";
export const fallbackMilestonesHeading = "Key";
export const fallbackMilestonesHeadingGradient = "Milestones";

export const fallbackLeadershipBadge = "Leadership";
export const fallbackLeadershipHeading = "Our";
export const fallbackLeadershipHeadingGradient = "Leadership";

export const fallbackAwardsBadge = "Recognition";
export const fallbackAwardsHeading = "Awards &";
export const fallbackAwardsHeadingGradient = "Certifications";

/* ── CTA fallbacks ── */
export const fallbackCtaHeading = "Optimizing Your Business";
export const fallbackCtaDesc = "Let us help optimize your business with reliable, high-performance storage and memory solutions. Driven by innovation, reliability, and strategic partnerships.";
export const fallbackCtaPrimaryLabel = "Contact Us";
export const fallbackCtaPrimaryHref = "/contact";
export const fallbackCtaSecondaryLabel = "Browse Products";
export const fallbackCtaSecondaryHref = "/brands";

/* ------------------------------------------------------------------
   Data fetching + parsing
   ------------------------------------------------------------------ */

export const fetchAboutPageData = cache(async (locale: string) => {
  // depth: 0 — no relation fields are consumed by the about frontend,
  // so don't waste DB JOINs populating upload/media references.
  const pageData = await fetchGlobal<Record<string, unknown>>("about-page", locale, 0);

  /* ── Hero ── */
  const hero = pageData.hero as Record<string, string> | undefined;
  const heroBadge = fallbackHeroBadge;
  const heroHeadline = hero?.headline || fallbackHeroHeadline;
  const heroDesc = hero?.description || fallbackHeroDesc;
  const heroSecondaryDesc = hero?.secondaryDescription || fallbackHeroSecondaryDesc;

  /* ── Company Section Header ── */
  const companySection = pageData.companySection as Record<string, string> | undefined;
  const companyBadge = companySection?.badge || fallbackCompanyBadge;
  const companyHeading = companySection?.heading || fallbackCompanyHeading;
  const companyHeadingGradient = fallbackCompanyHeadingGradient;
  const companyDesc = companySection?.description || fallbackCompanyDesc;

  // Company Details
  const companyDetails = (pageData.companyDetails as Array<{ label: string; value: string }> | undefined) || fallbackCompanyDetails;

  /* ── Mission & Vision ── */
  const missionVisionSection = pageData.missionVisionSection as Record<string, string> | undefined;
  const missionVisionBadge = missionVisionSection?.badge || fallbackMissionVisionBadge;
  const missionVisionHeading = missionVisionSection?.heading || fallbackMissionVisionHeading;

  const mission = pageData.mission as { headline?: string; description?: string } | undefined;
  const vision = pageData.vision as { headline?: string; description?: string } | undefined;
  const missionHeadline = mission?.headline || fallbackMissionHeadline;
  const missionDesc = mission?.description || fallbackMissionDesc;
  const visionHeadline = vision?.headline || fallbackVisionHeadline;
  const visionDesc = vision?.description || fallbackVisionDesc;
  const visionStandards = (pageData.visionStandards as Array<{ title: string; desc: string }> | undefined) || fallbackVisionStandards;

  /* ── Core Values ── */
  const coreValuesSection = pageData.coreValuesSection as Record<string, string> | undefined;
  const coreValuesBadge = coreValuesSection?.badge || fallbackCoreValuesBadge;
  const coreValuesHeading = coreValuesSection?.heading || fallbackCoreValuesHeading;
  const coreValuesHeadingGradient = fallbackCoreValuesHeadingGradient;

  const coreValues = (pageData.coreValues as Array<{ number: string; title: string; desc: string }> | undefined) || fallbackCoreValues;

  /* ── Why Choose Us ── */
  const whyChooseSection = pageData.whyChooseSection as Record<string, string> | undefined;
  const whyChooseBadge = whyChooseSection?.badge || fallbackWhyChooseBadge;
  const whyChooseHeading = whyChooseSection?.heading || fallbackWhyChooseHeading;
  const whyChooseHeadingGradient = fallbackWhyChooseHeadingGradient;
  const whyChooseDesc = whyChooseSection?.description || fallbackWhyChooseDesc;

  // Service Pillars
  const servicePillars = (() => {
    const raw = pageData.servicePillars as Array<{ number: string; title: string; intro: string; benefits: Array<{ item?: string }> }> | undefined;
    if (!raw?.length) return fallbackServicePillars;
    const extract = (arr: Array<{ item?: string }> | undefined) => arr?.map(x => x.item).filter((s): s is string => !!s) ?? [];
    return raw.map(p => ({ ...p, benefits: extract(p.benefits) })) as Array<{ number: string; title: string; intro: string; benefits: string[] }>;
  })();

  /* ── Milestones ── */
  const milestonesSection = pageData.milestonesSection as Record<string, string> | undefined;
  const milestonesBadge = milestonesSection?.badge || fallbackMilestonesBadge;
  const milestonesHeading = milestonesSection?.heading || fallbackMilestonesHeading;
  const milestonesHeadingGradient = fallbackMilestonesHeadingGradient;

  const rawMilestones = pageData.milestones as Array<{ year: string; milestone: string }> | undefined;
  const milestones = rawMilestones?.length ? rawMilestones : fallbackMilestones;

  /* ── Leadership ── */
  const leadershipSection = pageData.leadershipSection as Record<string, string> | undefined;
  const leadershipBadge = leadershipSection?.badge || fallbackLeadershipBadge;
  const leadershipHeading = leadershipSection?.heading || fallbackLeadershipHeading;
  const leadershipHeadingGradient = fallbackLeadershipHeadingGradient;

  const rawBoard = pageData.boardOfDirectors as Array<{ name: string; code: string; role: string; profile: string }> | undefined;
  const boardOfDirectors = rawBoard?.length ? rawBoard : fallbackBoardOfDirectors;

  const rawDivisions = pageData.divisions as Array<{ name: string; size: string; focus: string }> | undefined;
  const divisions = rawDivisions?.length ? rawDivisions : fallbackDivisions;

  /* ── Awards & Certifications ── */
  const awardsSection = pageData.awardsSection as Record<string, string> | undefined;
  const awardsBadge = awardsSection?.badge || fallbackAwardsBadge;
  const awardsHeading = awardsSection?.heading || fallbackAwardsHeading;
  const awardsHeadingGradient = fallbackAwardsHeadingGradient;

  const rawAwards = pageData.awards as Array<{ year: string; title: string; issuer: string; description: string }> | undefined;
  const awards = rawAwards?.length ? rawAwards : fallbackAwards;

  const rawCerts = pageData.certifications as Array<{ cert: string; authority: string; status: string }> | undefined;
  const certifications = rawCerts?.length ? rawCerts : fallbackCertifications;

  /* ── CTA ── */
  const cta = pageData.cta as {
    heading?: string;
    description?: string;
    primaryButton?: { label?: string; href?: string };
    secondaryButton?: { label?: string; href?: string };
  } | undefined;
  const ctaHeading = cta?.heading || fallbackCtaHeading;
  const ctaDesc = cta?.description || fallbackCtaDesc;
  const ctaPrimaryLabel = cta?.primaryButton?.label || fallbackCtaPrimaryLabel;
  const ctaPrimaryHref = cta?.primaryButton?.href || fallbackCtaPrimaryHref;
  const ctaSecondaryLabel = cta?.secondaryButton?.label || fallbackCtaSecondaryLabel;
  const ctaSecondaryHref = cta?.secondaryButton?.href || fallbackCtaSecondaryHref;

  return {
    hero: { badge: heroBadge, headline: heroHeadline, description: heroDesc, secondaryDescription: heroSecondaryDesc },
    company: { badge: companyBadge, heading: companyHeading, headingGradient: companyHeadingGradient, description: companyDesc, details: companyDetails },
    missionVision: { badge: missionVisionBadge, heading: missionVisionHeading, missionHeadline, missionDesc, visionHeadline, visionDesc, visionStandards },
    coreValues: { badge: coreValuesBadge, heading: coreValuesHeading, headingGradient: coreValuesHeadingGradient, values: coreValues },
    whyChooseUs: { badge: whyChooseBadge, heading: whyChooseHeading, headingGradient: whyChooseHeadingGradient, description: whyChooseDesc, pillars: servicePillars },
    milestones: { badge: milestonesBadge, heading: milestonesHeading, headingGradient: milestonesHeadingGradient, items: milestones },
    leadership: { badge: leadershipBadge, heading: leadershipHeading, headingGradient: leadershipHeadingGradient, board: boardOfDirectors, divisions },
    awards: { badge: awardsBadge, heading: awardsHeading, headingGradient: awardsHeadingGradient, awards, certifications },
    cta: { heading: ctaHeading, description: ctaDesc, primaryLabel: ctaPrimaryLabel, primaryHref: ctaPrimaryHref, secondaryLabel: ctaSecondaryLabel, secondaryHref: ctaSecondaryHref },
  };
});
