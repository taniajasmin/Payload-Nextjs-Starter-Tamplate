/* ------------------------------------------------------------------
   Shared case-study data — used by the list page, the filter grid,
   and the [slug] detail pages.
   Content sourced from:
   docs/content/08_Resources/03_Case_Studies_5_to_8.md
   (Clients are composite / anonymised, so backgrounds are written
   from the documented facts — size, industry, location, scope.)
   ------------------------------------------------------------------ */
import type { ComponentType } from "react";
import {
  Store,
  Wrench,
  Building2,
  Factory,
  ShoppingBag,
  HeartPulse,
  GraduationCap,
  Truck,
} from "lucide-react";

export type Industry =
  | "IT Retail"
  | "IT Services"
  | "Government"
  | "Manufacturing"
  | "Retail"
  | "Healthcare"
  | "Education"
  | "Logistics";

/* ------------------------------------------------------------------
   Industry → icon + accent.
   The `accent` gradient + `color` hexes are the SAME in-system
   palette used by the white-papers / Insights pages (blue, cyan,
   pink, amber, green, purple) — no off-system colours introduced.
   Defined in this data module so both the client grid and the
   server detail page can read them.
   ------------------------------------------------------------------ */
export interface IndustryMeta {
  icon: ComponentType<{ className?: string }>;
  /** Tailwind gradient class fragment, e.g. "from-[#286FB4] to-[#3A85C8]" */
  accent: string;
  /** Single accent hex for text/badges, e.g. "#286FB4" */
  color: string;
}

export const INDUSTRY_META: Record<Industry, IndustryMeta> = {
  "IT Retail": { icon: Store, accent: "from-[#DF4C73] to-[#E8718F]", color: "#DF4C73" },
  "IT Services": { icon: Wrench, accent: "from-[#06B6D4] to-[#22D3EE]", color: "#06B6D4" },
  Government: { icon: Building2, accent: "from-[#286FB4] to-[#3A85C8]", color: "#286FB4" },
  Manufacturing: { icon: Factory, accent: "from-[#F59E0B] to-[#FBBF24]", color: "#F59E0B" },
  Retail: { icon: ShoppingBag, accent: "from-[#10B981] to-[#34D399]", color: "#10B981" },
  Healthcare: { icon: HeartPulse, accent: "from-[#8B5CF6] to-[#6366F1]", color: "#8B5CF6" },
  Education: { icon: GraduationCap, accent: "from-[#286FB4] to-[#3A85C8]", color: "#286FB4" },
  Logistics: { icon: Truck, accent: "from-[#10B981] to-[#34D399]", color: "#10B981" },
};

export interface CaseStudyResult {
  /** Headline value, e.g. "$1.2M → $3.6M" or "3x" */
  value: string;
  /** Short label, e.g. "Revenue (18 months)" */
  label: string;
}

export interface CaseStudy {
  slug: string;
  client: string;
  industry: Industry;
  service: string;
  title: string;
  /** Short summary shown on the list card + hero */
  summary: string;
  location: string;
  /** Implementation duration / phrasing for the hero meta row */
  timeline: string;
  /** Two headline metrics shown on the card + hero */
  metrics: CaseStudyResult[];

  /* ── Detail-page content ── */
  /** One-paragraph client background */
  background: string;
  /** The Challenge — paragraph */
  challenge: string;
  /** The Simal Solution — paragraph */
  solution: string;
  /** Simal Solution — checkmark highlights */
  solutionHighlights: string[];
  /** Implementation — paragraph */
  implementation: string;
  /** Implementation — ordered phases (optional) */
  implementationPhases?: string[];
  /** Full Results set (before → after metrics) */
  results: CaseStudyResult[];
  /** Direct client quote */
  testimonial: string;
  /** Quoted stakeholder role + location */
  testimonialAuthor: string;
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "it-reseller-growth-3x-revenue-dubai",
    client: "Mid-size IT reseller, Dubai (3 outlets, 22 employees)",
    industry: "IT Retail",
    service: "IT Distribution",
    title: "IT Reseller Growth — 3x Revenue in 18 Months",
    summary:
      "Managing 8+ supplier relationships separately was causing inconsistent pricing, slow quote turnaround, and stockouts. Simal consolidated 8 supplier relationships into one Premier-tier partnership — providing access to 22+ brands, a single pricing portal, and priority stock allocation. Revenue went from $1.2M to $3.6M in 18 months.",
    location: "Dubai, UAE",
    timeline: "4 weeks",
    metrics: [
      { value: "3x", label: "Revenue in 18 months" },
      { value: "48h → 4h", label: "Quote turnaround" },
    ],
    background:
      "A mid-size IT reseller headquartered in Dubai, operating 3 outlets with a 22-person team. Serving both retail walk-in customers and B2B accounts, the business stocks hardware and consumables from a broad range of IT brands across a highly competitive UAE market.",
    challenge:
      "Managing 8+ supplier relationships separately created inconsistent pricing, slow quote turnaround, and frequent stockouts on high-demand SKUs. With no credit flexibility and no single source of pricing, the team spent roughly 20 hours a week juggling distributors instead of selling.",
    solution:
      "Simal consolidated all 8 supplier relationships into a single Premier-tier partnership — giving the reseller access to 22+ brands through one pricing portal, with priority stock allocation and flexible credit terms and a dedicated account manager.",
    solutionHighlights: [
      "8 suppliers consolidated into 1 Premier-tier partnership",
      "Single pricing portal across 22+ brands",
      "Priority stock allocation on high-demand SKUs",
      "Flexible credit terms + dedicated account manager",
    ],
    implementation:
      "Onboarding took just 4 weeks — credit approval, account setup, and staff training on the Simal Partner Portal — after which the reseller operated from a single consolidated supplier relationship.",
    results: [
      { value: "$1.2M → $3.6M", label: "Revenue (3x in 18 months)" },
      { value: "48h → 4h", label: "Quote turnaround" },
      { value: "12% → 2%", label: "Stockout rate" },
      { value: "20 → 4 hrs/wk", label: "Supplier management time" },
    ],
    testimonial:
      "One account manager. One portal. 22 brands. We stopped chasing 8 different distributors and started growing our business.",
    testimonialAuthor: "Owner, IT Reseller (Dubai)",
  },
  {
    slug: "system-integrator-enterprise-project-abu-dhabi",
    client: "System integrator, Abu Dhabi (85 employees)",
    industry: "IT Services",
    service: "IT Distribution",
    title: "System Integrator — Enterprise Project Won with Simal Support",
    summary:
      "Bidding for a 500-workstation government project, this integrator needed competitive pricing, authorized distributor certification, and 3-year on-site warranty. Simal provided Elite partner tender support — special pricing, documentation, and delivery guarantee. Won the $1.4M contract beating 4 competitors at 22% margin.",
    location: "Abu Dhabi, UAE",
    timeline: "2 weeks tender support · 8 weeks delivery",
    metrics: [
      { value: "$1.4M", label: "Contract won" },
      { value: "22%", label: "Project margin" },
    ],
    background:
      "An Abu Dhabi-based system integrator with 85 employees, specializing in turnkey enterprise IT deployments — from workstations and networking to multi-year on-site support — for government and large enterprise clients across the UAE.",
    challenge:
      "While bidding for a 500-workstation government project, the integrator needed competitive pricing across Dell laptops, HP workstations, and Samsung monitors, authorized distributor certification, technical compliance sheets, and a 3-year on-site warranty commitment — all prerequisites simply to submit a credible tender.",
    solution:
      "Simal provided Elite partner tender support: special project pricing, an authorized distributor certificate, warranty documentation, technical compliance sheets, and a guaranteed delivery schedule — the full tender package required to win.",
    solutionHighlights: [
      "Special project (tender) pricing",
      "Authorized distributor certification",
      "Warranty & technical compliance documentation",
      "3-year on-site warranty support",
      "Guaranteed delivery schedule",
    ],
    implementation:
      "Two weeks of tender preparation support from Simal preceded an 8-week delivery and deployment phase, with the entire workstation rollout completed on schedule.",
    results: [
      { value: "$1.4M", label: "Contract won (vs. 4 competitors)" },
      { value: "22%", label: "Project margin (vs. typical 15%)" },
      { value: "On time", label: "Delivery & deployment" },
      { value: "3-year AMC", label: "Post-project contract signed" },
    ],
    testimonial:
      "Simal didn't just supply hardware — they helped us win the deal. The tender support, pricing, and documentation were the difference between winning and losing.",
    testimonialAuthor: "Bid Manager, System Integrator (Abu Dhabi)",
  },
  {
    slug: "government-entity-transparent-procurement",
    client: "Government authority, Bangladesh (3,500 employees)",
    industry: "Government",
    service: "IT Distribution",
    title: "Government Entity — Transparent IT Procurement",
    summary:
      "Annual IT hardware procurement for 12 regional offices was fragmented across multiple suppliers with inconsistent pricing and audit findings. Simal delivered an annual rate contract with fixed pricing on 60+ SKUs and a centralized warranty portal. Procurement costs dropped 18% and audit findings went from 8 to zero.",
    location: "Bangladesh",
    timeline: "3 months",
    metrics: [
      { value: "18%", label: "Cost reduction" },
      { value: "8 → 0", label: "Audit findings" },
    ],
    background:
      "A government authority in Bangladesh employing 3,500 staff across 12 regional offices. The organization runs an annual IT hardware procurement cycle to equip every regional office with laptops, desktops, printers, UPS units, and networking gear.",
    challenge:
      "Annual IT hardware procurement for 12 regional offices was fragmented across multiple suppliers with inconsistent pricing. Warranty tracking was manual, delivery was slow, and the process repeatedly produced audit findings on procurement documentation.",
    solution:
      "Simal delivered an annual rate contract via competitive tender — fixed pricing for 12 months across 60+ SKUs (laptops, desktops, printers, UPS, networking), delivery to all 12 locations, and a centralized warranty management portal.",
    solutionHighlights: [
      "Annual rate contract with fixed 12-month pricing",
      "60+ SKUs covered (laptops, desktops, printers, UPS, networking)",
      "Delivery to all 12 regional offices",
      "Centralized warranty management portal",
    ],
    implementation:
      "The engagement took 3 months end-to-end — running the competitive tender, signing the rate contract, and completing the first round of deliveries to regional offices.",
    results: [
      { value: "18%", label: "Procurement cost reduction" },
      { value: "6 → 2 wks", label: "Delivery time" },
      { value: "15 → 4 days", label: "Warranty claim resolution" },
      { value: "8 → 0", label: "Audit findings" },
    ],
    testimonial:
      "For the first time, our annual IT procurement was audit-clean. One rate contract, transparent pricing, on-time delivery to every regional office — this is how government procurement should work.",
    testimonialAuthor: "Procurement Head, Government Authority",
  },
  {
    slug: "manufacturing-rmg-erp-transformation",
    client: "Leading RMG exporter, Bangladesh (12 factories, 35,000 workers)",
    industry: "Manufacturing",
    service: "ERP",
    title: "Manufacturing — RMG Group ERP Transformation",
    summary:
      "Managing 12 factories with fragmented systems caused subcontract challan leakage, manual export docs (3.5 hrs/shipment), and payroll for 35,000 workers taking 5 days. UniERP Enterprise was deployed in 16 weeks across three phases. Subcontract reconciliation went real-time, export docs dropped to 18 minutes, saving $180K/year.",
    location: "Bangladesh",
    timeline: "16 weeks (3 phases)",
    metrics: [
      { value: "$180K", label: "Annual savings" },
      { value: "72% → 91%", label: "Compliance score" },
    ],
    background:
      "One of Bangladesh's leading ready-made garment (RMG) exporters, running 12 factories and a 35,000-strong workforce. The group supplies global fashion brands and must meet stringent buyer-compliance and export-documentation standards on every shipment.",
    challenge:
      "Managing 12 factories on fragmented systems caused subcontract challan leakage, manual export documentation taking 3.5 hours per shipment, and payroll for 35,000 workers taking 5 days with 30 staff. Buyer compliance audit scores averaged just 72%.",
    solution:
      "UniERP Enterprise was deployed with Manufacturing, Subcontract, Export Documentation, Piece-Rate Payroll, and Compliance modules — giving the group a single real-time view across all 12 factories.",
    solutionHighlights: [
      "Manufacturing & production planning",
      "Subcontract (challan) tracking",
      "Export documentation automation",
      "Piece-rate payroll for 35,000 workers",
      "Buyer compliance management",
    ],
    implementation:
      "A phased 16-week rollout limited disruption to live operations, with each phase going live before the next began.",
    implementationPhases: [
      "Phase 1 — Merchandising + Production (8 weeks)",
      "Phase 2 — Subcontract + Export Docs (4 weeks)",
      "Phase 3 — Payroll + Compliance (4 weeks)",
    ],
    results: [
      { value: "72 → 58 days", label: "Order-to-shipment (-19%)" },
      { value: "4 days → real-time", label: "Subcontract reconciliation" },
      { value: "3.5 hrs → 18 min", label: "Export documentation" },
      { value: "5 days → 4 hrs", label: "Payroll (30 → 2 staff)" },
      { value: "72% → 91%", label: "Compliance score" },
      { value: "$180K/yr", label: "Savings (challan leakage)" },
    ],
    testimonial:
      "UniERP gave us visibility into every subcontract challan in real time. That alone saved us $180,000 in the first year.",
    testimonialAuthor: "Group COO, RMG Exporter",
  },
  {
    slug: "retail-chain-pos-inventory-uae",
    client: "Regional electronics retailer, UAE (8 stores, 120 employees)",
    industry: "Retail",
    service: "ERP",
    title: "Retail Chain — POS & Inventory Integration",
    summary:
      "8 stores with independent POS systems and no centralized inventory. Monthly reconciliation took 2 weeks. UniERP Professional with Retail POS and Inventory modules was deployed across all 8 stores in 12 weeks — delivering centralized inventory, real-time transfers, and barcode-based receiving. Inventory accuracy jumped from 82% to 98.5%.",
    location: "UAE",
    timeline: "12 weeks",
    metrics: [
      { value: "82% → 98.5%", label: "Inventory accuracy" },
      { value: "12%", label: "Revenue uplift" },
    ],
    background:
      "A regional consumer-electronics retailer in the UAE, operating 8 stores with 120 employees. Each store ran its own point-of-sale system, with no shared view of stock across the network.",
    challenge:
      "Eight stores ran independent POS systems with no centralized inventory visibility. Inter-store transfers were manual and error-prone, and monthly inventory reconciliation took a full two weeks to complete.",
    solution:
      "UniERP Professional was deployed with Retail POS, Inventory, and Procurement modules — centralizing inventory across all 8 stores with real-time inter-store transfers and barcode-based receiving and sales.",
    solutionHighlights: [
      "Retail POS across all 8 stores",
      "Centralized inventory visibility",
      "Real-time inter-store transfers",
      "Barcode-based receiving & sales",
      "Procurement module",
    ],
    implementation:
      "All 8 stores went live simultaneously after a focused 12-week implementation, so the entire network operated on one system from day one.",
    results: [
      { value: "82% → 98.5%", label: "Inventory accuracy" },
      { value: "2 days → 2 hrs", label: "Inter-store transfer time" },
      { value: "2 wks → 1 day", label: "Monthly reconciliation" },
      { value: "15% → 4%", label: "Stockouts" },
      { value: "12%", label: "Revenue uplift" },
    ],
    testimonial:
      "Now I can see inventory across all 8 stores from my phone. We reduced stockouts by 70% and our sales staff stopped wasting time calling other stores to check stock.",
    testimonialAuthor: "Operations Director, Electronics Retailer",
  },
  {
    slug: "healthcare-hospital-management-dhaka",
    client: "Multi-specialty hospital, Dhaka (120 beds, 22 specialties)",
    industry: "Healthcare",
    service: "ERP",
    title: "Healthcare — Hospital Management System",
    summary:
      "Paper-based records, 67-minute OPD waits, 8% billing errors, and 21% insurance rejection. UniERP HMIS was deployed in 18 weeks with HL7 lab integration. OPD wait dropped to 28 minutes, billing errors to 0.5%, and monthly revenue leakage of $15K was eliminated entirely.",
    location: "Dhaka, Bangladesh",
    timeline: "18 weeks (phased)",
    metrics: [
      { value: "67 → 28 min", label: "OPD wait time" },
      { value: "$15K → $0", label: "Monthly leakage" },
    ],
    background:
      "A 120-bed multi-specialty hospital in Dhaka offering 22 specialties. The facility handles high outpatient volume, inpatient care, an in-house laboratory, and a pharmacy — all supported by insurance billing.",
    challenge:
      "Paper-based patient records drove an average OPD wait of 67 minutes, billing errors at 8%, and an insurance claim rejection rate of 21%. Lab turnaround was 6.2 hours and pharmacy expiry losses ran $22K a year.",
    solution:
      "UniERP HMIS was deployed with EMR, Scheduling, Billing & Insurance, Lab (LIS), Pharmacy, and Inpatient modules — including HL7 integration with the hospital's lab analyzers.",
    solutionHighlights: [
      "Electronic Medical Records (EMR)",
      "Patient scheduling & OPD flow",
      "Billing & insurance claims",
      "Lab Information System (HL7 integrated)",
      "Pharmacy & expiry management",
      "Inpatient management",
    ],
    implementation:
      "An 18-week phased rollout went live department by department to keep the hospital fully operational throughout the transition.",
    implementationPhases: [
      "Phase 1 — OPD (outpatient)",
      "Phase 2 — IP (inpatient)",
      "Phase 3 — Lab (LIS + HL7)",
      "Phase 4 — Pharmacy",
    ],
    results: [
      { value: "12 → 3 min", label: "Registration time" },
      { value: "67 → 28 min", label: "OPD wait time" },
      { value: "8% → 0.5%", label: "Billing errors" },
      { value: "21% → 6%", label: "Insurance rejection" },
      { value: "6.2 → 2.8 hrs", label: "Lab turnaround" },
      { value: "$15K → $0", label: "Monthly revenue leakage" },
    ],
    testimonial:
      "The insurance claim module alone paid for the system in 14 months. Patient satisfaction scores have nearly doubled.",
    testimonialAuthor: "Hospital Administrator, Dhaka",
  },
  {
    slug: "education-k12-school-digital-campus",
    client: "K-12 school group, UAE (3 campuses, 8,500 students)",
    industry: "Education",
    service: "ERP",
    title: "Education — K-12 School Group Digital Campus",
    summary:
      "Fee collection took 45 days, report cards were a 3-week process, and parent complaints averaged 120/month. UniERP Education was deployed across all 3 campuses in 14 weeks with a parent portal and online payments. Parent complaints dropped 85% and 78% of annual fees were collected in 2 weeks.",
    location: "UAE",
    timeline: "14 weeks",
    metrics: [
      { value: "85%", label: "Fewer complaints" },
      { value: "45 → 12 days", label: "Fee collection" },
    ],
    background:
      "A K-12 school group in the UAE with 3 campuses and 8,500 students. The group manages admissions, fees, examinations, library, and parent communications across all three campuses.",
    challenge:
      "Fee collection took 45 days, report cards were a 3-week manual process, and parent complaints averaged 120 a month. Admission processing took 14 days and 22 administrative staff were tied up managing student records.",
    solution:
      "UniERP Education was deployed with Student Management, Fee Management, Examination, Library, Parent Portal, and SMS Gateway modules — including online payment integration.",
    solutionHighlights: [
      "Student & admission management",
      "Fee management + online payments",
      "Examination & report cards",
      "Library management",
      "Parent Portal + SMS Gateway",
    ],
    implementation:
      "All 3 campuses went live simultaneously over a 14-week implementation, standardizing operations across the entire group at once.",
    results: [
      { value: "45 → 12 days", label: "Fee collection cycle" },
      { value: "3 wks → 2 days", label: "Report card generation" },
      { value: "120 → 18/mo", label: "Parent complaints (-85%)" },
      { value: "14 → 3 days", label: "Admission processing" },
      { value: "200 → 25/yr", label: "Library book loss" },
      { value: "22 → 8", label: "Admin staff" },
    ],
    testimonial:
      "The parent portal transformed our relationship with parents. Complaints dropped 85% in the first term. Online fee payment collected 78% of annual fees in 2 weeks.",
    testimonialAuthor: "Principal, K-12 School Group",
  },
  {
    slug: "logistics-fleet-3pl-optimization",
    client: "Integrated logistics company, Bangladesh (180 vehicles, 3 warehouses)",
    industry: "Logistics",
    service: "ERP",
    title: "Logistics — Fleet & 3PL Optimization",
    summary:
      "Fuel at $0.38/km, fleet utilization at 68%, picking accuracy at 93%, and 3PL billing taking 12 days with $22K/month leakage. UniERP Logistics with GPS for 180 vehicles and RF scanning for 3 warehouses was deployed in 16 weeks. Fleet utilization rose to 84% and 3PL billing went from 12 days to 1 day.",
    location: "Bangladesh",
    timeline: "16 weeks (3 phases)",
    metrics: [
      { value: "$22K → $0", label: "Monthly leakage" },
      { value: "68% → 84%", label: "Fleet utilization" },
    ],
    background:
      "An integrated logistics company in Bangladesh operating a fleet of 180 vehicles and 3 warehouses. The business provides fleet transport and third-party logistics (3PL) services to enterprise clients.",
    challenge:
      "Fuel cost sat at $0.38/km with high variance, fleet utilization was only 68%, and warehouse picking accuracy was 93%. 3PL billing took 12 days after month-end, leaking roughly $22K a month from missed charges.",
    solution:
      "UniERP Logistics was deployed with Fleet, WMS, and 3PL Billing modules — GPS integration for 180 vehicles, RF scanning across 3 warehouses, and automated client-specific 3PL billing.",
    solutionHighlights: [
      "Fleet management + GPS (180 vehicles)",
      "Warehouse Management (WMS)",
      "RF scanning across 3 warehouses",
      "Automated client-specific 3PL billing",
    ],
    implementation:
      "A 16-week phased rollout brought each capability live in sequence, minimizing disruption to active fleet and warehouse operations.",
    implementationPhases: [
      "Phase 1 — Fleet + GPS (8 weeks)",
      "Phase 2 — WMS + RF scanning (4 weeks)",
      "Phase 3 — 3PL Billing (4 weeks)",
    ],
    results: [
      { value: "$0.38 → $0.31/km", label: "Fuel cost (-15%)" },
      { value: "68% → 84%", label: "Fleet utilization" },
      { value: "93% → 99.4%", label: "Picking accuracy" },
      { value: "12 days → 1 day", label: "3PL billing cycle" },
      { value: "$22K → $0", label: "Monthly revenue leakage" },
    ],
    testimonial:
      "The 3PL billing engine now captures every charge automatically — we stopped leaving $22,000/month on the table. The GPS integration reduced fuel costs 15% in 6 months.",
    testimonialAuthor: "Operations Head, Logistics Company",
  },
];

/** Look up a case study by its URL slug */
export function getCaseStudy(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((cs) => cs.slug === slug);
}

/** All valid slugs for generateStaticParams */
export function getAllCaseStudySlugs(): string[] {
  return CASE_STUDIES.map((cs) => cs.slug);
}
