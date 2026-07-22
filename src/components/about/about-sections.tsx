/**
 * Backward-compatible re-exports.
 *
 * The section components have been split into lazy-loadable per-route
 * chunks (about-section-company, about-section-mission, …).  This file
 * re-exports everything so existing consumers in /careers don't break.
 *
 * New code inside the /about tree should import directly from the
 * per-section files or use the dynamic imports in about-content.tsx.
 */

// Shared primitives
export {
  easeOutExpo,
  fadeInUp,
  scaleIn,
  staggerContainer,
  staggerItem,
  SectionBadge,
  Card,
  GradientCard,
  MonitorIcon,
  LaptopIcon,
  WifiIcon,
  SmartphoneIcon,
  ServerIcon,
  getMediaUrl,
  getMediaAlt,
} from "./about-sections-shared";

// Company
export { CompanyIntroSection, CompanyGlanceSection } from "./about-section-company";

// Mission & Vision
export { MissionVisionSection } from "./about-section-mission";

// Core Values
export { ValuesManifestoSection, CoreValuesSection, CommitmentsSection } from "./about-section-values";

// Why Choose Us
export { ServicePillarsSection } from "./about-section-why-us";

// Milestones
export { MilestonesSection } from "./about-section-milestones";

// Leadership
export { LeadershipSection, DivisionsSection } from "./about-section-leadership";

// Awards
export { AwardsStatsRow, AwardsSection, CertificationsSection } from "./about-section-awards";

// Legacy image section (still present in the split but rarely used directly)
export { ImageSection2 } from "./about-section-image";
