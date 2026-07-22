/**
 * Seed script for ERP Industries collection.
 *
 * Populates 8 industry vertical pages with structured content sourced from
 * docs/content/06_Software_ERP_Solutions/.
 *
 * Usage: npx tsx src/scripts/seed-erp-industries.ts
 */

import "dotenv/config";
import { getPayload } from "payload";
import config from "../../payload.config";

/* ------------------------------------------------------------------
   Lexical rich text helpers (mirrors seed-all.ts richDoc pattern)
   ------------------------------------------------------------------ */

function textNode(text: string) {
  return {
    type: "text",
    detail: 0,
    format: 0,
    mode: "normal",
    style: "",
    text,
    version: 1,
  };
}

function richDoc(blocks: Array<{ h2?: string; p?: string; h3?: string }>) {
  return {
    root: {
      type: "root",
      format: "",
      indent: 0,
      version: 1,
      direction: "ltr",
      textFormat: 0,
      textStyle: "",
      children: blocks.map((b) =>
        b.h2
          ? {
              type: "heading",
              tag: "h2",
              format: "",
              indent: 0,
              version: 1,
              direction: "ltr",
              children: [textNode(b.h2)],
            }
          : b.h3
            ? {
                type: "heading",
                tag: "h3",
                format: "",
                indent: 0,
                version: 1,
                direction: "ltr",
                children: [textNode(b.h3)],
              }
            : {
                type: "paragraph",
                format: "",
                indent: 0,
                version: 1,
                direction: "ltr",
                textFormat: 0,
                textStyle: "",
                children: [textNode(b.p ?? "")],
              },
      ),
    },
  };
}

/* ------------------------------------------------------------------
   Industry seed data
   ------------------------------------------------------------------ */

interface SeedIndustry {
  title: string;
  slug: string;
  tagline: string;
  icon: string;
  iconColor: string;
  status: "published";
  hero: {
    headline: string;
    subHeadline: string;
    ctaLabel: string;
    ctaLink: string;
  };
  overviewDescription: ReturnType<typeof richDoc>;
  industryChallenges: Array<{ challenge: string; solution: string }>;
  subSectors: Array<{
    name: string;
    institutionTypes: string;
    painPoints: string[];
    erpSolutions: string[];
  }>;
  moduleGroups: Array<{
    groupName: string;
    icon: string;
    features: Array<{ featureName: string; description: string; businessImpact: string }>;
  }>;
  benefits: Array<{ title: string; description: string; icon: string }>;
  caseStudy: {
    clientName: string;
    background: string;
    challenge: string;
    solution: string;
    results: Array<{ value: string; label: string }>;
    testimonialQuote: string;
    testimonialAuthor: string;
    testimonialRole: string;
  };
  cta: {
    phoneLabel: string;
    phoneNumber: string;
    emailLabel: string;
    emailAddress: string;
    demoLinkLabel: string;
    demoLinkUrl: string;
  };
  meta: { title: string; description: string };
}

const INDUSTRIES: SeedIndustry[] = [
  /* ================================================================
     1. Retail & Distribution
     ================================================================ */
  {
    title: "Retail & Distribution",
    slug: "retail-distribution",
    tagline:
      "Integrated POS, multi-channel inventory, and supplier management for retailers and distributors.",
    icon: "Store",
    iconColor: "orange",
    status: "published",
    hero: {
      headline: "UniERP for Retail & Distribution",
      subHeadline:
        "From single-store retailers to multi-warehouse distributors — real-time inventory, point of sale, purchasing, accounting, and CRM on one platform.",
      ctaLabel: "Explore Retail ERP",
      ctaLink: "/erp/industries/retail-distribution",
    },
    overviewDescription: richDoc([
      {
        p: "Retail and distribution businesses operate on thin margins where inventory accuracy, fast checkout, and supplier responsiveness directly determine profitability. UniERP for Retail & Distribution brings together point of sale, multi-location inventory, purchase management, accounting, and CRM in a single integrated system — giving operators real-time visibility from shop floor to warehouse to financial close.",
      },
      {
        p: "Whether you run a single boutique, a chain of electronics stores, or a distribution center serving B2B customers across the GCC, UniERP adapts to your workflow with pre-configured modules that reduce stockouts, eliminate manual reconciliation, and help you make data-driven buying decisions.",
      },
      {
        h3: "Key Capabilities",
      },
      {
        p: "Unified inventory across physical stores, e-commerce, and B2B channels ensures every sales channel sees accurate stock levels. Automated min/max reordering with demand forecasting prevents both stockouts and overstock. The integrated POS supports barcode scanning, customer displays, receipt printing, and multiple payment methods. Centralized supplier management with RFQ workflows and purchase automation streamlines procurement, while real-time cost tracking with landed cost allocation protects margins.",
      },
    ]),
    industryChallenges: [
      {
        challenge: "Stock-Outs & Overstock",
        solution:
          "Min/max rules, automated reordering, and demand forecasting keep inventory at optimal levels across all locations.",
      },
      {
        challenge: "Multi-Channel Complexity",
        solution:
          "Unified inventory across physical stores, e-commerce, and B2B channels — every channel sees accurate stock in real time.",
      },
      {
        challenge: "Slow Checkout",
        solution:
          "Integrated POS with barcode scanning, customer display, receipt printing, and multiple payment method support.",
      },
      {
        challenge: "Supplier Management",
        solution:
          "Centralized supplier database, RFQ management, purchase automation, and landed cost tracking.",
      },
      {
        challenge: "Margin Erosion",
        solution:
          "Real-time cost tracking with landed cost allocation and margin analysis by product, category, and channel.",
      },
      {
        challenge: "Customer Retention",
        solution:
          "CRM with purchase history, loyalty programs, targeted promotions, and automated re-engagement campaigns.",
      },
    ],
    subSectors: [
      {
        name: "Electronics & Consumer Goods Retail",
        institutionTypes:
          "Single-store retailers, multi-branch electronics chains, consumer goods distributors across the GCC and wider Middle East.",
        painPoints: [
          "Managing thousands of SKUs across multiple locations",
          "Serial number and IMEI tracking for warranty management",
          "Promotional pricing and bundle offers across channels",
        ],
        erpSolutions: [
          "Multi-location inventory with serial/batch tracking",
          "Integrated POS with barcode and serial number capture",
          "Dynamic pricing engine with promotion management",
          "Real-time stock sync across stores and e-commerce",
        ],
      },
      {
        name: "Wholesale & B2B Distribution",
        institutionTypes:
          "B2B distributors, wholesale traders, bulk suppliers serving retail and corporate customers.",
        painPoints: [
          "Complex customer-specific pricing and credit limits",
          "Bulk order processing with partial shipments",
          "Route planning and delivery tracking",
        ],
        erpSolutions: [
          "Customer price lists with volume-based tiering",
          "Sales order management with backorder and partial delivery support",
          "Delivery route optimization and driver app integration",
          "Credit control with automated block/release workflows",
        ],
      },
    ],
    moduleGroups: [
      {
        groupName: "Point of Sale (POS)",
        icon: "Store",
        features: [
          {
            featureName: "In-Store Checkout",
            description: "Barcode scanning, customer display, receipt printing, and integrated payments.",
            businessImpact: "50% faster checkout times",
          },
          {
            featureName: "Multi-Payment Support",
            description: "Cash, card, digital wallets, BNPL — all reconciled in real time.",
            businessImpact: "Eliminates end-of-day payment reconciliation",
          },
          {
            featureName: "Customer Display & Promos",
            description: "Customer-facing display with real-time promotions and loyalty point updates.",
            businessImpact: "15-20% increase in upsell conversion",
          },
        ],
      },
      {
        groupName: "Inventory & Warehouse",
        icon: "Package",
        features: [
          {
            featureName: "Multi-Location Stock",
            description: "Real-time stock visibility across all stores, warehouses, and e-commerce.",
            businessImpact: "30% fewer stockouts",
          },
          {
            featureName: "Automated Reordering",
            description: "Min/max rules, reorder points, and demand forecasting trigger POs automatically.",
            businessImpact: "22% reduction in carrying costs",
          },
          {
            featureName: "Serial & Batch Tracking",
            description: "Full traceability from receipt to sale for warranty and recall management.",
            businessImpact: "Complete audit trail for every item",
          },
        ],
      },
      {
        groupName: "Sales & CRM",
        icon: "Users",
        features: [
          {
            featureName: "Customer Database",
            description: "Purchase history, preferences, and communication log in one place.",
            businessImpact: "Improved customer retention and repeat sales",
          },
          {
            featureName: "Loyalty Programs",
            description: "Points-based, tiered, and promotional loyalty with automated reward issuance.",
            businessImpact: "25% higher customer lifetime value",
          },
          {
            featureName: "Targeted Promotions",
            description: "Segment customers by purchase behavior and send targeted offers via email/SMS.",
            businessImpact: "3-5x ROI on promotional campaigns",
          },
        ],
      },
    ],
    benefits: [
      {
        title: "Unified Commerce",
        description: "One view of inventory, sales, and customers across all channels — stores, web, and B2B.",
        icon: "Globe",
      },
      {
        title: "Faster Operations",
        description: "Automated reordering, barcode scanning, and integrated payments cut manual work significantly.",
        icon: "Zap",
      },
      {
        title: "Better Margins",
        description: "Real-time landed cost tracking, margin analysis, and supplier performance management.",
        icon: "TrendingUp",
      },
      {
        title: "Customer Loyalty",
        description: "Built-in CRM with purchase history, loyalty programs, and targeted marketing automation.",
        icon: "Star",
      },
      {
        title: "GCC Tax Compliance",
        description: "VAT-ready with automated tax calculation, filing reports, and multi-currency support.",
        icon: "CheckCircle",
      },
      {
        title: "Scalable Platform",
        description: "Start with one store, scale to hundreds — the same platform grows with your business.",
        icon: "LayoutGrid",
      },
    ],
    caseStudy: {
      clientName: "Regional Electronics Retailer",
      background:
        "A mid-size electronics retailer with 5 stores across the UAE was running separate POS, inventory, and accounting systems that required 3+ hours of daily manual reconciliation. Stock discrepancies between physical counts and system records averaged 12%, leading to lost sales and excess holding costs.",
      challenge:
        "Disconnected systems caused inventory blind spots, overstock of slow-moving items, and stockouts of popular SKUs. Manual reconciliation consumed staff time that should have been spent on customer service. The retailer needed a unified platform to bring all channels and locations under one source of truth.",
      solution:
        "UniERP was deployed across all 5 stores with integrated POS, centralized inventory, purchase automation, and accounting. Serial number tracking was enabled for warranty management. Customer purchase history and loyalty programs were activated to drive repeat business.",
      results: [
        { value: "45 min/day", label: "Reconciliation Time (down from 3+ hours)" },
        { value: "30% fewer", label: "Stockouts" },
        { value: "22% lower", label: "Carrying Costs" },
        { value: "18% increase", label: "Repeat Customer Rate" },
      ],
      testimonialQuote:
        "UniERP gave us one source of truth for all five stores. We went from guessing what to reorder to knowing exactly what each location needs. The time we save on reconciliation now goes into serving customers better.",
      testimonialAuthor: "Operations Director",
      testimonialRole: "UAE Electronics Retail Chain",
    },
    cta: {
      phoneLabel: "Call",
      phoneNumber: "+971 4 393 0507",
      emailLabel: "Email",
      emailAddress: "erp@simalme.com",
      demoLinkLabel: "Book a Demo",
      demoLinkUrl: "/erp/demo-request",
    },
    meta: {
      title: "Retail & Distribution ERP Software — UniERP | Simal Technologies UAE",
      description:
        "Integrated POS, multi-channel inventory, and supplier management for retailers and distributors. Real-time stock visibility, automated reordering, customer loyalty. Built on Odoo 19 CE by Simal & UniSoft Systems.",
    },
  },

  /* ================================================================
     2. Manufacturing (RMG, Pharma, Food Processing)
     ================================================================ */
  {
    title: "Manufacturing",
    slug: "manufacturing",
    tagline:
      "End-to-end manufacturing ERP for RMG/textiles, pharmaceuticals, and food processing — BOM, MRP, QC, lot traceability, and regulatory compliance.",
    icon: "Factory",
    iconColor: "blue",
    status: "published",
    hero: {
      headline: "UniERP for Manufacturing",
      subHeadline:
        "Three distinct manufacturing tracks — RMG & Textiles, Pharmaceuticals, and Food Processing — each pre-configured for the workflows, compliance requirements, and operational realities of its sub-sector.",
      ctaLabel: "Explore Manufacturing ERP",
      ctaLink: "/erp/industries/manufacturing",
    },
    overviewDescription: richDoc([
      {
        p: "Manufacturing is not one-size-fits-all. A Ready-Made Garment (RMG) exporter operates nothing like a pharmaceutical formulation plant, and a food processor faces compliance challenges neither of the other two encounter. UniERP delivers three distinct manufacturing solution tracks on a single unified platform — each pre-configured for the workflows, compliance requirements, and operational realities of its sub-sector.",
      },
      {
        h3: "RMG & Textiles",
      },
      {
        p: "Multi-dimensional size matrix (XS-5XL), color variants, seasonal collections with nested BOM for trims and accessories. Subcontract management with challan tracking for washing, dyeing, printing, and embroidery. Export documentation automation including commercial invoice, packing list, and certificate of origin. Buyer compliance audit checklists for ACCORD, RSC, WRAP, BSCI, and SEDEX standards.",
      },
      {
        h3: "Pharmaceuticals",
      },
      {
        p: "Formula-based BOM with version control and approval workflow. Full forward and backward lot traceability with genealogy in under 10 seconds. Integrated QC lab management with certificate of analysis generation. Regulatory compliance with country-wise product registration, dossier tracking, and 21 CFR Part 11 audit trails. Campaign-based production planning with cleanroom availability management.",
      },
      {
        h3: "Food Processing",
      },
      {
        p: "Recipe-based BOM with ingredient percentages, by-product handling, and nutrition fact calculation. FEFO (First Expired First Out) picking logic with production-date-to-expiry tracking. HACCP compliance with critical control point monitoring, deviation alerts, and corrective action workflows. Automated label generation with allergen declarations and cold chain monitoring.",
      },
    ]),
    industryChallenges: [
      {
        challenge: "SKU Complexity (RMG)",
        solution:
          "Multi-dimensional BOM matrix handles size, color, and style variants — eliminating manual style sheets and enabling 60% faster sample-to-production handoff.",
      },
      {
        challenge: "Regulatory Compliance (Pharma)",
        solution:
          "Formula versioning, batch genealogy, and 21 CFR Part 11 audit trails keep you audit-ready with regulatory submission deadlines never missed.",
      },
      {
        challenge: "Shelf-Life & Safety (Food)",
        solution:
          "FEFO picking, automated expiry alerts, HACCP CCP monitoring, and allergen-aware labeling ensure zero customer complaints for expired or mislabeled products.",
      },
      {
        challenge: "Subcontract Visibility (RMG)",
        solution:
          "Challan-based WIP tracking at each subcontract location with finished goods reconciliation against issued quantities.",
      },
      {
        challenge: "Quality Control (All)",
        solution:
          "Incoming material testing, in-process quality checks, and finished product release testing with specification-based pass/fail and automated CoA generation.",
      },
      {
        challenge: "Production Efficiency",
        solution:
          "SAM database, line balancing, production target setting, and hourly output monitoring with visual shop floor dashboards driving 15-25% line efficiency improvement.",
      },
    ],
    subSectors: [
      {
        name: "RMG & Textiles",
        institutionTypes:
          "Garment manufacturers, textile mills, knitwear producers, home textile exporters — serving buyers like H&M, Zara, Uniqlo, and Walmart across Bangladesh, India, and SE Asia.",
        painPoints: [
          "Multi-size/style/color SKU explosion",
          "Subcontract processing with challan tracking",
          "Export documentation and buyer compliance audits",
          "Piece-rate payroll across hundreds of operators",
        ],
        erpSolutions: [
          "BOM variant matrix with nested trims and accessories",
          "Subcontract PO with challan tracking and WIP reconciliation",
          "Commercial invoice and packing list automation",
          "Piece-rate payroll with barcode/tablet production capture",
          "Compliance checklist module for ACCORD, RSC, WRAP, BSCI",
        ],
      },
      {
        name: "Pharmaceuticals",
        institutionTypes:
          "Formulation plants, API manufacturers, contract manufacturing organizations (CMOs), nutraceutical producers.",
        painPoints: [
          "Formula versioning and regulatory approval workflow",
          "Batch/lot traceability for mock recalls",
          "Expiry management and FEFO warehouse operations",
          "Regulatory submissions (DGDA, DCGI, SFDA, US FDA)",
        ],
        erpSolutions: [
          "Formula management with version control and digital signature",
          "Full forward/backward lot genealogy in under 10 seconds",
          "Automated expiry alerts and FEFO picking logic",
          "Country-wise product registration repository with renewal reminders",
          "Campaign-based production planning with cleanroom scheduling",
        ],
      },
      {
        name: "Food Processing",
        institutionTypes:
          "Food manufacturers, beverage producers, dairy processors, bakery and confectionery plants.",
        painPoints: [
          "Recipe scaling and by-product cost allocation",
          "Shelf-life tracking and FEFO warehouse management",
          "HACCP documentation and CCP monitoring",
          "Allergen and nutrition labeling compliance",
        ],
        erpSolutions: [
          "Recipe-based BOM with nutrition fact auto-calculation",
          "FEFO picking with automated short-shelf-life alerts",
          "HACCP CCP logging with deviation and corrective action workflow",
          "Automated label generation with allergen declarations",
          "Batch yield analytics with raw material variance tracking",
        ],
      },
    ],
    moduleGroups: [
      {
        groupName: "BOM & Product Engineering",
        icon: "Settings",
        features: [
          {
            featureName: "Multi-Dimensional BOM",
            description: "Size/color/variant matrix BOM for RMG; formula-based BOM with version control for pharma; recipe-based BOM with ingredient percentages for food.",
            businessImpact: "60% faster sample-to-production handoff (RMG)",
          },
          {
            featureName: "Engineering Change Control",
            description: "Approval workflow for BOM/formula changes with digital signature and full version history.",
            businessImpact: "GMP-compliant formula governance",
          },
        ],
      },
      {
        groupName: "Production & Shop Floor",
        icon: "Factory",
        features: [
          {
            featureName: "Production Planning",
            description: "Campaign-based scheduling for pharma, line balancing for RMG, batch processing for food — each with sub-sector-specific planning logic.",
            businessImpact: "15-25% improvement in line efficiency",
          },
          {
            featureName: "Shop Floor Data Capture",
            description: "Barcode/tablet-based production capture with hourly output vs. target dashboards.",
            businessImpact: "Real-time production visibility",
          },
        ],
      },
      {
        groupName: "Quality & Compliance",
        icon: "Shield",
        features: [
          {
            featureName: "Quality Control",
            description: "Incoming material testing, in-process QC, finished product release with CoA generation.",
            businessImpact: "Zero defective shipments",
          },
          {
            featureName: "Regulatory Repository",
            description: "Country-wise product registration, dossier tracking, renewal alerts, audit trail logging.",
            businessImpact: "Audit-ready at all times",
          },
        ],
      },
      {
        groupName: "Traceability",
        icon: "Database",
        features: [
          {
            featureName: "Lot Genealogy",
            description: "Full forward trace (raw material → batch → customer) and backward trace (customer → batch → supplier).",
            businessImpact: "Mock recall in minutes, not days",
          },
          {
            featureName: "Expiry & Shelf-Life",
            description: "Batch-level expiry tracking with FEFO logic, automated near-expiry quarantine, and expiry-based pricing.",
            businessImpact: "40% reduction in expiry write-offs",
          },
        ],
      },
    ],
    benefits: [
      {
        title: "Sub-Sector Fit",
        description: "Three distinct manufacturing tracks — not a generic one-size-fits-all system forced onto your industry.",
        icon: "Settings",
      },
      {
        title: "Compliance Ready",
        description: "DGDA, DCGI, SFDA, US FDA 21 CFR Part 11 — regulatory frameworks pre-configured per sub-sector.",
        icon: "Shield",
      },
      {
        title: "End-to-End Traceability",
        description: "Full lot genealogy in under 10 seconds for mock recalls and regulatory audits.",
        icon: "Database",
      },
      {
        title: "Quality Built-In",
        description: "Integrated QC at every stage — receiving, in-process, and finished product — with automated CoA.",
        icon: "CheckCircle",
      },
      {
        title: "Export Ready (RMG)",
        description: "Automated commercial invoice, packing list, certificate of origin — buyer-specific templates included.",
        icon: "Globe",
      },
      {
        title: "Efficiency Gains",
        description: "15-25% line efficiency improvement within 3 months through SAM-based planning and shop floor dashboards.",
        icon: "TrendingUp",
      },
    ],
    caseStudy: {
      clientName: "Bangladesh RMG Exporter",
      background:
        "A 5,000-operator RMG exporter in Bangladesh supplying major European and US brands was struggling with manual style sheets, fragmented subcontract tracking, and a 5-day payroll processing cycle. Export documentation errors were causing shipment delays and chargebacks from buyers.",
      challenge:
        "The existing mix of spreadsheets and a legacy accounting system could not handle the complexity of multi-dimensional BOMs, subcontract challan reconciliation, or buyer-specific documentation formats. Compliance audit scores were declining, putting key buyer relationships at risk.",
      solution:
        "UniERP Manufacturing (RMG track) was deployed with style and BOM management, subcontract challan tracking, piece-rate payroll, export documentation automation, and compliance checklist modules. Operator-wise production was captured via barcode scanners on the shop floor.",
      results: [
        { value: "5 days → 4 hrs", label: "Payroll Processing Time" },
        { value: "90% fewer", label: "Documentation Errors" },
        { value: "40% improvement", label: "Repeat Audit Scores" },
        { value: "22% increase", label: "Line Efficiency" },
      ],
      testimonialQuote:
        "The UniERP RMG module transformed how we manage subcontract operations. We now have real-time visibility of WIP at every washing, dyeing, and printing unit. Export documentation that used to take hours is now generated in minutes with zero errors.",
      testimonialAuthor: "Managing Director",
      testimonialRole: "Bangladesh RMG Export Group",
    },
    cta: {
      phoneLabel: "Call",
      phoneNumber: "+971 4 393 0507",
      emailLabel: "Email",
      emailAddress: "erp@simalme.com",
      demoLinkLabel: "Book a Demo",
      demoLinkUrl: "/erp/demo-request",
    },
    meta: {
      title: "Manufacturing ERP Software — RMG, Pharma & Food Processing | Simal Technologies UAE",
      description:
        "End-to-end UniERP manufacturing suite for RMG/textiles, pharmaceutical, and food processing industries. BOM, MRP, QC, lot traceability, regulatory compliance, shop floor control.",
    },
  },

  /* ================================================================
     3. Healthcare (HMIS)
     ================================================================ */
  {
    title: "Healthcare",
    slug: "healthcare",
    tagline:
      "Hospital Management Information System (HMIS) — patient records, appointment scheduling, billing, pharmacy, lab, and compliance in one integrated platform.",
    icon: "HeartPulse",
    iconColor: "rose",
    status: "published",
    hero: {
      headline: "UniERP for Healthcare — HMIS",
      subHeadline:
        "From patient registration to discharge, UniERP's Hospital Management Information System connects every department — OPD, IPD, pharmacy, lab, radiology, billing, and insurance — on a single platform built for modern healthcare delivery.",
      ctaLabel: "Explore Healthcare ERP",
      ctaLink: "/erp/industries/healthcare",
    },
    overviewDescription: richDoc([
      {
        p: "Healthcare providers face a unique challenge: deliver better patient outcomes while managing complex administrative, clinical, and financial workflows — often with legacy systems that don't talk to each other. UniERP's Hospital Management Information System (HMIS) brings patient administration, clinical services, pharmacy, laboratory, radiology, billing, insurance, and reporting into one integrated platform.",
      },
      {
        p: "Built for hospitals, clinics, and diagnostic centers, UniERP HMIS supports the full patient journey — from online appointment booking through triage, consultation, diagnostics, treatment, inpatient admission, and discharge. Every interaction is captured in a unified electronic medical record accessible to authorized clinicians across departments.",
      },
    ]),
    industryChallenges: [
      {
        challenge: "Fragmented Patient Records",
        solution:
          "Unified EMR across OPD, IPD, lab, radiology, and pharmacy — one complete patient view for every authorized clinician.",
      },
      {
        challenge: "Billing & Insurance Complexity",
        solution:
          "Integrated billing with insurance eligibility verification, pre-approval workflows, and automated claim submission reducing denials by up to 60%.",
      },
      {
        challenge: "Inventory Waste & Expiry",
        solution:
          "Pharmacy and consumables inventory with FEFO picking, batch tracking, automated reorder points, and expiry alerts.",
      },
      {
        challenge: "Regulatory Compliance",
        solution:
          "Built-in support for DHA, MOHAP, SFDA, and JCI documentation requirements with automated audit trail logging.",
      },
      {
        challenge: "Patient Wait Times",
        solution:
          "Online appointment booking, digital queue management, and real-time department load dashboards reduce average wait times significantly.",
      },
      {
        challenge: "Data-Driven Decisions",
        solution:
          "Clinical and operational analytics dashboards — bed occupancy, revenue per department, disease prevalence, drug utilization patterns.",
      },
    ],
    subSectors: [
      {
        name: "Multi-Specialty Hospitals",
        institutionTypes:
          "100+ bed hospitals with OPD, IPD, ICU, NICU, OT, emergency, and multiple specialty departments.",
        painPoints: [
          "Coordinating patient flow across 15+ departments",
          "Managing complex insurance approvals and multi-payer billing",
          "Maintaining JCI/DHA compliance documentation",
          "Pharmacy and consumables inventory across multiple dispensing points",
        ],
        erpSolutions: [
          "Centralized patient administration with inter-department referrals",
          "Insurance eligibility, pre-approval, and claim management",
          "Automated compliance documentation and audit trail",
          "Multi-location pharmacy with ward-wise dispensing",
        ],
      },
      {
        name: "Diagnostic Centers & Labs",
        institutionTypes:
          "Standalone diagnostic labs, radiology centers, and polyclinic-affiliated lab operations.",
        painPoints: [
          "Sample tracking from collection to result",
          "Integration with referring physicians for result delivery",
          "Equipment utilization and reagent inventory management",
          "Turnaround time (TAT) monitoring and SLA compliance",
        ],
        erpSolutions: [
          "Barcode-based sample tracking with chain of custody",
          "Online result portal for referring physicians and patients",
          "Equipment maintenance scheduling and reagent FEFO management",
          "TAT dashboards with SLA breach alerts",
        ],
      },
    ],
    moduleGroups: [
      {
        groupName: "Patient Administration",
        icon: "Users",
        features: [
          {
            featureName: "Patient Registration & EMR",
            description: "Demographics, insurance, medical history, allergies — unified record accessible across departments.",
            businessImpact: "Single source of truth for every patient",
          },
          {
            featureName: "Appointment & Queue Management",
            description: "Online booking, digital token system, department-wise queue dashboards, SMS/email reminders.",
            businessImpact: "40% reduction in patient wait times",
          },
          {
            featureName: "IPD & Bed Management",
            description: "Admission/discharge/transfer, bed occupancy dashboard, OT scheduling, nurse station interface.",
            businessImpact: "Optimized bed utilization and reduced ALOS",
          },
        ],
      },
      {
        groupName: "Clinical Services",
        icon: "HeartPulse",
        features: [
          {
            featureName: "Doctor Consultation",
            description: "SOAP notes, e-prescriptions, investigation ordering, referral management with digital signature.",
            businessImpact: "Complete clinical documentation per encounter",
          },
          {
            featureName: "Laboratory Information System",
            description: "Test catalog, barcode-based sample tracking, auto-analyzer integration, result validation and CoC.",
            businessImpact: "30% faster TAT with zero sample mix-ups",
          },
          {
            featureName: "Radiology Information System",
            description: "Modality scheduling, DICOM/PACS integration, radiologist reporting with templates, critical finding alerts.",
            businessImpact: "Streamlined reporting workflow",
          },
        ],
      },
      {
        groupName: "Pharmacy & Inventory",
        icon: "Package",
        features: [
          {
            featureName: "Pharmacy Management",
            description: "Inpatient/outpatient dispensing, formulary management, drug interaction alerts, narcotics tracking.",
            businessImpact: "Zero dispensing errors for critical medications",
          },
          {
            featureName: "Inventory & Supply Chain",
            description: "Multi-location stock, FEFO picking, automated reorder with min/max, consignment stock management.",
            businessImpact: "Up to 40% reduction in expiry write-offs",
          },
        ],
      },
      {
        groupName: "Billing & Insurance",
        icon: "Wallet",
        features: [
          {
            featureName: "Integrated Billing",
            description: "OP/IP billing, package deals, corporate billing, multi-currency with automatic charge capture from departments.",
            businessImpact: "Zero revenue leakage from missed charges",
          },
          {
            featureName: "Insurance Management",
            description: "Eligibility verification, pre-approval workflow, e-claim submission, denial tracking, reconciliation.",
            businessImpact: "Up to 60% reduction in claim denials",
          },
        ],
      },
    ],
    benefits: [
      {
        title: "Unified Patient Record",
        description: "One EMR across all departments — no more hunting for lab results or previous consultation notes.",
        icon: "FileText",
      },
      {
        title: "Faster Patient Flow",
        description: "Online booking, digital queuing, and real-time dashboards reduce wait times and improve satisfaction.",
        icon: "Zap",
      },
      {
        title: "Revenue Integrity",
        description: "Automatic charge capture from all departments — no missed billing, no revenue leakage.",
        icon: "TrendingUp",
      },
      {
        title: "Regulatory Compliance",
        description: "DHA, MOHAP, JCI, and SFDA documentation requirements supported with automated audit trails.",
        icon: "Shield",
      },
      {
        title: "Inventory Control",
        description: "FEFO picking, batch tracking, automated reordering, and expiry alerts across pharmacy and consumables.",
        icon: "Package",
      },
      {
        title: "Data-Driven Decisions",
        description: "Clinical and operational analytics — from bed occupancy to disease prevalence to drug utilization.",
        icon: "BarChart3",
      },
    ],
    caseStudy: {
      clientName: "GCC Multi-Specialty Hospital",
      background:
        "A 150-bed multi-specialty hospital in the UAE was running separate systems for OPD registration, IPD admission, lab, radiology, pharmacy, and billing. Patient records were fragmented across departments, and insurance claim denials were running at 25% due to missing pre-approvals and documentation errors.",
      challenge:
        "Clinicians spent too much time hunting for patient information across systems. Billing delays caused by manual charge capture led to revenue leakage. Pharmacy stockouts of critical medications occurred due to lack of real-time inventory visibility. The hospital needed a single integrated HMIS.",
      solution:
        "UniERP HMIS was deployed with patient administration, clinical services (doctor consultation, lab, radiology), pharmacy, billing, and insurance modules. EMR was unified across all departments. Insurance pre-approval workflow was automated with eligibility verification at registration.",
      results: [
        { value: "60% fewer", label: "Insurance Claim Denials" },
        { value: "40% reduction", label: "Patient Wait Times" },
        { value: "35% less", label: "Pharmacy Expiry Write-offs" },
        { value: "100%", label: "Charge Capture (Zero Leakage)" },
      ],
      testimonialQuote:
        "UniERP HMIS transformed how we deliver care. Our clinicians now have a complete patient record at their fingertips — lab results, radiology reports, previous consultations, allergies, and medications — all in one place. Insurance claims that used to take weeks are now processed in days with near-zero denials.",
      testimonialAuthor: "Chief Medical Officer",
      testimonialRole: "UAE Multi-Specialty Hospital",
    },
    cta: {
      phoneLabel: "Call",
      phoneNumber: "+971 4 393 0507",
      emailLabel: "Email",
      emailAddress: "erp@simalme.com",
      demoLinkLabel: "Book a Demo",
      demoLinkUrl: "/erp/demo-request",
    },
    meta: {
      title: "Healthcare ERP — Hospital Management Information System (HMIS) | Simal Technologies UAE",
      description:
        "UniERP HMIS for hospitals, clinics, and diagnostic centers. Patient records, appointment scheduling, billing, pharmacy, lab, radiology, insurance — all in one integrated platform.",
    },
  },

  /* ================================================================
     4. Education
     ================================================================ */
  {
    title: "Education",
    slug: "education",
    tagline:
      "Student information system, academic planning, fee management, examination, library, and parent portal — all in one unified education ERP.",
    icon: "GraduationCap",
    iconColor: "indigo",
    status: "published",
    hero: {
      headline: "UniERP for Education",
      subHeadline:
        "From K-12 schools to universities and training institutes — manage admissions, academics, examinations, fees, library, and communication on a single integrated education platform.",
      ctaLabel: "Explore Education ERP",
      ctaLink: "/erp/industries/education",
    },
    overviewDescription: richDoc([
      {
        p: "Educational institutions — from K-12 schools through universities to vocational training centers — manage complex workflows spanning admissions, academic planning, timetabling, examinations, fee collection, library management, and parent communication. UniERP for Education brings all these functions together in a single platform designed specifically for the education sector.",
      },
      {
        p: "Teachers get intuitive tools for attendance, grade entry, and lesson planning. Administrators gain real-time visibility into admissions pipelines, fee collection, and resource utilization. Parents stay connected through a dedicated portal with academic progress, attendance, fee status, and school announcements. Students access timetables, assignments, grades, and learning materials from any device.",
      },
    ]),
    industryChallenges: [
      {
        challenge: "Admissions Management",
        solution:
          "Online application portal, document upload, evaluation workflow, merit list generation, and enrollment — all automated from inquiry to admission.",
      },
      {
        challenge: "Fee Collection & Arrears",
        solution:
          "Automated fee schedule generation, online payment gateway integration, installment tracking, and automated arrears reminders reducing outstanding fees significantly.",
      },
      {
        challenge: "Academic Planning",
        solution:
          "Curriculum mapping, timetable generation with teacher/room constraints, substitution management, and academic calendar automation.",
      },
      {
        challenge: "Examination & Grading",
        solution:
          "Exam scheduling, seating plan generation, mark entry with validation rules, grade calculation (GPA/CGPA), and automated report card generation.",
      },
      {
        challenge: "Parent Communication",
        solution:
          "Dedicated parent portal and mobile app with real-time attendance alerts, academic progress, fee status, and direct messaging to teachers.",
      },
      {
        challenge: "Library Management",
        solution:
          "Catalog with barcode/RFID, issue/return with due date tracking, fine calculation, reservation system, and inventory with weeding reports.",
      },
    ],
    subSectors: [
      {
        name: "K-12 Schools",
        institutionTypes:
          "Private and international schools following CBSE, IB, British, American, and national curricula across the GCC and wider region.",
        painPoints: [
          "Managing admissions for hundreds of applicants each cycle",
          "Multi-currency fee collection with sibling discounts and scholarships",
          "Parent communication in multiple languages",
          "Transport fleet management with route optimization",
        ],
        erpSolutions: [
          "Online admission portal with document management and merit list automation",
          "Flexible fee structure with discounts, installments, and online payment",
          "Multi-language parent portal with real-time alerts",
          "Transport module with GPS tracking, route planning, and attendance",
        ],
      },
      {
        name: "Universities & Higher Education",
        institutionTypes:
          "Universities, colleges, and higher education institutions offering undergraduate and postgraduate programs.",
        painPoints: [
          "Credit-based course registration and prerequisite validation",
          "Faculty workload management and room allocation",
          "Research grant and project management",
          "Accreditation documentation (ABET, AACSB, etc.)",
        ],
        erpSolutions: [
          "Student portal with course registration, degree audit, and transcript requests",
          "Faculty workload dashboard and automated timetable generation",
          "Research management with grant tracking and publication repository",
          "Accreditation data warehouse with automated report generation",
        ],
      },
    ],
    moduleGroups: [
      {
        groupName: "Student Information System",
        icon: "Users",
        features: [
          {
            featureName: "Admissions & Enrollment",
            description: "Online application, document upload, evaluation workflow, merit list, enrollment, and ID card generation.",
            businessImpact: "50% faster admission processing",
          },
          {
            featureName: "Student Records",
            description: "Demographics, academic history, attendance, discipline, health records — all in one profile.",
            businessImpact: "Complete 360° student view",
          },
          {
            featureName: "Attendance Management",
            description: "Biometric/RFID integration, class-wise/period-wise attendance, automated absence alerts to parents.",
            businessImpact: "Real-time attendance visibility",
          },
        ],
      },
      {
        groupName: "Academics & Examination",
        icon: "BookOpen",
        features: [
          {
            featureName: "Timetable & Scheduling",
            description: "Automated timetable with teacher, room, and period constraints; substitution management.",
            businessImpact: "Hours saved every semester on manual scheduling",
          },
          {
            featureName: "Examination Management",
            description: "Exam scheduling, seating plans, mark entry with validation, grade calculation (GPA/CGPA), report cards.",
            businessImpact: "Error-free grade calculation and reporting",
          },
          {
            featureName: "Learning Management",
            description: "Assignment posting, submission collection, online quizzes, resource sharing, discussion forums.",
            businessImpact: "Extended learning beyond the classroom",
          },
        ],
      },
      {
        groupName: "Finance & Administration",
        icon: "Wallet",
        features: [
          {
            featureName: "Fee Management",
            description: "Fee structure configuration, automated invoice generation, online payment, installment tracking, arrears management.",
            businessImpact: "95%+ fee collection rate",
          },
          {
            featureName: "HR & Payroll",
            description: "Teacher and staff contracts, attendance-based payroll, leave management, appraisal tracking.",
            businessImpact: "Streamlined staff administration",
          },
        ],
      },
      {
        groupName: "Communication & Portal",
        icon: "Mail",
        features: [
          {
            featureName: "Parent Portal",
            description: "Academic progress, attendance, fee status, announcements, direct teacher messaging, mobile app.",
            businessImpact: "Improved parent engagement and satisfaction",
          },
          {
            featureName: "Student Portal",
            description: "Timetable, assignments, grades, learning materials, exam schedule — accessible from any device.",
            businessImpact: "Empowered self-service for students",
          },
        ],
      },
    ],
    benefits: [
      {
        title: "Streamlined Admissions",
        description: "End-to-end digital admission process from inquiry to enrollment — faster decisions, better conversion.",
        icon: "ClipboardList",
      },
      {
        title: "Financial Health",
        description: "Automated fee collection with online payments and arrears tracking ensures consistent cash flow.",
        icon: "TrendingUp",
      },
      {
        title: "Teacher Productivity",
        description: "Intuitive tools for attendance, grading, and lesson planning — less admin, more teaching time.",
        icon: "Zap",
      },
      {
        title: "Parent Engagement",
        description: "Real-time visibility into academic progress, attendance, and school communication via dedicated portal.",
        icon: "Star",
      },
      {
        title: "Data-Driven Decisions",
        description: "Dashboards for admissions trends, academic performance, fee collection, and resource utilization.",
        icon: "BarChart3",
      },
      {
        title: "Accreditation Ready",
        description: "Automated data collection and reporting for CBSE, IB, KHDA, ADEK, and other accreditation bodies.",
        icon: "CheckCircle",
      },
    ],
    caseStudy: {
      clientName: "GCC International K-12 School",
      background:
        "A K-12 international school with 3,000+ students across two campuses was struggling with manual admissions processing, disparate systems for fee collection and academics, and limited parent communication. Fee arrears were running at 18%, and report card generation took 2 weeks each term.",
      challenge:
        "The school needed a unified platform to manage the complete student lifecycle — from admission inquiry through enrollment, academics, fee collection, and parent communication. Manual processes were consuming administrative staff time and causing delays in reporting to the board and accreditation bodies.",
      solution:
        "UniERP Education was deployed with admissions, student information, academics, examination, fee management, library, transport, and parent/student portals. Online fee payment was integrated with multiple payment gateways. Report cards were automated with configurable templates matching the school's grading system.",
      results: [
        { value: "50% faster", label: "Admission Processing" },
        { value: "18% → 2%", label: "Fee Arrears Rate" },
        { value: "2 weeks → 1 day", label: "Report Card Generation" },
        { value: "92%", label: "Parent Portal Adoption" },
      ],
      testimonialQuote:
        "UniERP transformed how our school operates. Admissions that used to take weeks of back-and-forth are now completed in days. Parents love the real-time visibility into their children's progress. And our finance team went from chasing fee payments to having 98% collected on time — automatically.",
      testimonialAuthor: "School Principal",
      testimonialRole: "GCC International K-12 School",
    },
    cta: {
      phoneLabel: "Call",
      phoneNumber: "+971 4 393 0507",
      emailLabel: "Email",
      emailAddress: "erp@simalme.com",
      demoLinkLabel: "Book a Demo",
      demoLinkUrl: "/erp/demo-request",
    },
    meta: {
      title: "Education ERP Software — Student Management System | Simal Technologies UAE",
      description:
        "UniERP for Education: student information system, admissions, academic planning, fee management, examination, library, parent portal. Built for K-12 schools, universities, and training institutes.",
    },
  },

  /* ================================================================
     5. Banking & Finance
     ================================================================ */
  {
    title: "Banking & Finance",
    slug: "banking-finance",
    tagline:
      "Compliance management, risk management, financial reporting, and integration capabilities for banks, insurance companies, and financial institutions.",
    icon: "Landmark",
    iconColor: "gold",
    status: "published",
    hero: {
      headline: "UniERP for Banking & Finance",
      subHeadline:
        "Purpose-built for banks, insurance companies, and financial institutions — compliance management, risk analytics, regulatory reporting, multi-entity consolidation, and system integration on a secure, auditable platform.",
      ctaLabel: "Explore Financial ERP",
      ctaLink: "/erp/industries/banking-finance",
    },
    overviewDescription: richDoc([
      {
        p: "Financial institutions operate in one of the world's most heavily regulated environments. From central bank reporting to IFRS compliance, AML/KYC requirements to risk-weighted asset calculations — the compliance burden is immense and the cost of failure is existential. UniERP for Banking & Finance provides the governance, risk, and compliance framework that financial institutions need, together with the financial consolidation, reporting, and integration capabilities that modern finance demands.",
      },
      {
        p: "Built on a secure, fully auditable platform with role-based access down to the field level, UniERP supports multi-entity operations with automated intercompany eliminations, multi-currency translation, and consolidated reporting against IFRS, central bank, and management reporting standards simultaneously.",
      },
    ]),
    industryChallenges: [
      {
        challenge: "Regulatory Compliance",
        solution:
          "Central bank reporting templates, automated submission scheduling, and compliance calendar with deadline alerts across all operating jurisdictions.",
      },
      {
        challenge: "Risk Management",
        solution:
          "Credit risk, market risk, operational risk, and liquidity risk dashboards with automated data aggregation from core banking and treasury systems.",
      },
      {
        challenge: "Multi-Entity Consolidation",
        solution:
          "Automated intercompany eliminations, multi-currency translation, and consolidated financial statements against IFRS, local GAAP, and management reporting.",
      },
      {
        challenge: "AML & KYC",
        solution:
          "Customer due diligence workflows, transaction monitoring rules engine, suspicious activity alerts, and regulatory filing automation.",
      },
      {
        challenge: "Audit & Internal Control",
        solution:
          "Granular role-based access control, segregation of duties enforcement, full audit trail with field-level change tracking.",
      },
      {
        challenge: "System Integration",
        solution:
          "Pre-built connectors for core banking, treasury, cards, trade finance, and SWIFT systems with API-first architecture.",
      },
    ],
    subSectors: [
      {
        name: "Commercial Banks",
        institutionTypes:
          "Retail and corporate banks, Islamic banks, digital/neo banks operating across the GCC, Africa, and CIS regions.",
        painPoints: [
          "Central bank reporting across multiple jurisdictions",
          "IFRS 9 expected credit loss calculations",
          "Multi-entity consolidation with intercompany eliminations",
          "Integration with legacy core banking systems",
        ],
        erpSolutions: [
          "Automated central bank reporting with validation rules",
          "IFRS 9 module with staging, ECL calculation, and disclosure",
          "Multi-entity consolidation with intercompany matching",
          "Pre-built core banking connectors with API gateway",
        ],
      },
      {
        name: "Insurance Companies",
        institutionTypes:
          "Life, general (P&C), and Takaful insurance companies with multi-line operations.",
        painPoints: [
          "IFRS 17 insurance contract measurement and disclosure",
          "Actuarial data integration and model governance",
          "Reinsurance treaty management and settlement",
          "Claims reserving and IBNR calculation",
        ],
        erpSolutions: [
          "IFRS 17 calculation engine with transition support",
          "Actuarial data pipeline with model versioning and governance",
          "Reinsurance module with treaty administration and bordereaux",
          "Claims analytics with automated IBNR estimation",
        ],
      },
    ],
    moduleGroups: [
      {
        groupName: "Financial Control",
        icon: "Calculator",
        features: [
          {
            featureName: "General Ledger & Consolidation",
            description: "Multi-entity, multi-currency GL with automated intercompany eliminations and consolidation.",
            businessImpact: "Days to hours for month-end close",
          },
          {
            featureName: "IFRS Compliance",
            description: "IFRS 9 (financial instruments), IFRS 16 (leases), IFRS 17 (insurance) modules with automated calculations and disclosures.",
            businessImpact: "Audit-ready IFRS reporting",
          },
          {
            featureName: "Budgeting & Planning",
            description: "Driver-based budgeting, rolling forecasts, what-if scenarios with version control and approval workflows.",
            businessImpact: "Faster, more accurate planning cycles",
          },
        ],
      },
      {
        groupName: "Risk & Compliance",
        icon: "Shield",
        features: [
          {
            featureName: "Risk Analytics",
            description: "Credit, market, operational, and liquidity risk dashboards with automated data feeds from source systems.",
            businessImpact: "Real-time risk visibility",
          },
          {
            featureName: "Regulatory Reporting",
            description: "Central bank reporting templates, automated submission scheduling, compliance calendar with alerts.",
            businessImpact: "Zero missed regulatory deadlines",
          },
          {
            featureName: "AML & KYC",
            description: "Customer risk scoring, transaction monitoring rules, suspicious activity detection, regulatory filing.",
            businessImpact: "Reduced false positives, faster investigations",
          },
        ],
      },
      {
        groupName: "Integration Hub",
        icon: "Network",
        features: [
          {
            featureName: "Core Banking Connector",
            description: "Pre-built adapters for major core banking platforms with real-time and batch integration modes.",
            businessImpact: "Seamless data flow between systems",
          },
          {
            featureName: "API Gateway",
            description: "RESTful API layer for internal and external system integration with authentication and rate limiting.",
            businessImpact: "Future-proof integration architecture",
          },
        ],
      },
    ],
    benefits: [
      {
        title: "Regulatory Confidence",
        description: "Automated reporting with built-in validation ensures accuracy and timeliness for every submission.",
        icon: "Shield",
      },
      {
        title: "Faster Close",
        description: "Multi-entity consolidation with automated eliminations reduces month-end close from days to hours.",
        icon: "Zap",
      },
      {
        title: "Risk Visibility",
        description: "Integrated risk dashboards provide a real-time view of credit, market, operational, and liquidity risk.",
        icon: "BarChart3",
      },
      {
        title: "Audit Ready",
        description: "Granular access controls, segregation of duties, and complete field-level audit trails.",
        icon: "CheckCircle",
      },
      {
        title: "IFRS Compliance",
        description: "IFRS 9, IFRS 16, IFRS 17 — purpose-built modules with automated calculation and disclosure.",
        icon: "FileText",
      },
      {
        title: "Seamless Integration",
        description: "Pre-built connectors for core banking, treasury, cards, and trade finance systems.",
        icon: "Network",
      },
    ],
    caseStudy: {
      clientName: "Regional Commercial Bank",
      background:
        "A commercial bank operating across 3 GCC countries with 50+ branches was managing regulatory reporting manually using spreadsheets. Month-end consolidation across entities took 12 days, and central bank reporting was a high-risk manual process prone to errors and late submissions.",
      challenge:
        "The bank needed to automate multi-entity consolidation against both IFRS and central bank reporting standards, implement IFRS 9 expected credit loss calculations, and establish a robust internal control framework with segregation of duties and full audit trails.",
      solution:
        "UniERP Banking & Finance was deployed with multi-entity GL, automated consolidation, IFRS 9 module, central bank reporting templates for all 3 jurisdictions, and integration connectors to the bank's core banking and treasury systems.",
      results: [
        { value: "12 days → 2 days", label: "Month-End Close" },
        { value: "100% on-time", label: "Regulatory Submissions" },
        { value: "Zero", label: "Audit Findings (First Year)" },
        { value: "85% reduction", label: "Manual Reconciliation" },
      ],
      testimonialQuote:
        "The UniERP implementation transformed our finance function. Consolidation that took 12 painful days is now completed in 2. Central bank reports are generated with one click and submitted on time, every time. Our external auditors noted the improvement in internal controls as a significant upgrade.",
      testimonialAuthor: "Chief Financial Officer",
      testimonialRole: "Regional Commercial Bank, GCC",
    },
    cta: {
      phoneLabel: "Call",
      phoneNumber: "+971 4 393 0507",
      emailLabel: "Email",
      emailAddress: "erp@simalme.com",
      demoLinkLabel: "Book a Demo",
      demoLinkUrl: "/erp/demo-request",
    },
    meta: {
      title: "Banking & Finance ERP Software — Compliance & Risk Management | Simal Technologies UAE",
      description:
        "UniERP for banking, insurance, and financial institutions. IFRS compliance, risk management, regulatory reporting, multi-entity consolidation, AML/KYC. Built on Odoo 19 CE.",
    },
  },

  /* ================================================================
     6. Government
     ================================================================ */
  {
    title: "Government",
    slug: "government",
    tagline:
      "Tender management, procurement workflow, compliance documentation, and security requirements for government ministries, agencies, and public sector entities.",
    icon: "Building2",
    iconColor: "teal",
    status: "published",
    hero: {
      headline: "UniERP for Government",
      subHeadline:
        "Designed for the unique requirements of public sector organizations — tender and procurement management, budget control, compliance documentation, and enterprise-grade security on a platform built for government.",
      ctaLabel: "Explore Government ERP",
      ctaLink: "/erp/industries/government",
    },
    overviewDescription: richDoc([
      {
        p: "Government organizations face procurement rules, budgetary controls, compliance mandates, and security requirements that commercial ERP systems are not designed to handle. UniERP for Government is built from the ground up to meet public sector needs — from multi-stage tender management and encumbrance accounting to compliance documentation and citizen service delivery tracking.",
      },
      {
        p: "With role-based access down to individual fields, complete audit trails, and support for government-specific financial controls including commitment accounting and budget checking at the point of requisition, UniERP ensures that every transaction is compliant, every approval is documented, and every public fund is accounted for.",
      },
    ]),
    industryChallenges: [
      {
        challenge: "Tender & Procurement Management",
        solution:
          "Multi-stage tender workflow from RFP publication through technical and commercial evaluation to award, with automated compliance checks and bid comparison.",
      },
      {
        challenge: "Budget Control & Encumbrance",
        solution:
          "Commitment accounting with budget checking at requisition — prevents overspending before it happens, not after.",
      },
      {
        challenge: "Compliance Documentation",
        solution:
          "Automated documentation for every procurement decision, approval, and payment — complete audit trail for supreme audit institutions.",
      },
      {
        challenge: "Security & Access Control",
        solution:
          "Field-level role-based access, IP whitelisting, MFA, encryption at rest and in transit — meeting government infosec standards.",
      },
      {
        challenge: "Citizen Service Delivery",
        solution:
          "Service request tracking with SLAs, digital case management, and citizen-facing portal for application submission and status tracking.",
      },
      {
        challenge: "Multi-Entity Operations",
        solution:
          "Support for ministry/department/agency hierarchies with consolidated and entity-level reporting against national budget classifications.",
      },
    ],
    subSectors: [
      {
        name: "Ministries & Central Government",
        institutionTypes:
          "Federal and state-level ministries, executive offices, and central government departments managing national budgets and programs.",
        painPoints: [
          "National budget classification alignment (COFOG, GFSM)",
          "Multi-year capital project budgeting and tracking",
          "Parliamentary/congressional reporting requirements",
          "Inter-ministerial fund transfers and settlement",
        ],
        erpSolutions: [
          "Chart of accounts mapped to national budget classification",
          "Capital project module with multi-year budget and progress tracking",
          "Automated parliamentary report generation",
          "Inter-entity transaction module with automated settlement",
        ],
      },
      {
        name: "Municipalities & Local Government",
        institutionTypes:
          "City and regional municipalities, local government authorities, and municipal service delivery organizations.",
        painPoints: [
          "Citizen service request management with SLAs",
          "Asset-intensive operations (roads, utilities, facilities)",
          "Revenue collection (permits, licenses, fines, taxes)",
          "Field workforce management and route optimization",
        ],
        erpSolutions: [
          "Citizen service portal with online submission and status tracking",
          "Enterprise asset management with preventive maintenance scheduling",
          "Integrated revenue management with online payment and receipting",
          "Field service module with mobile app and GPS route optimization",
        ],
      },
    ],
    moduleGroups: [
      {
        groupName: "Procurement & Tenders",
        icon: "ClipboardList",
        features: [
          {
            featureName: "Tender Management",
            description: "RFP creation, publication, bid submission portal, technical and commercial evaluation, award recommendation workflow.",
            businessImpact: "Transparent, compliant procurement process",
          },
          {
            featureName: "Purchase-to-Pay",
            description: "Requisition with budget check, purchase order, goods receipt, invoice matching, payment with full audit trail.",
            businessImpact: "Zero budget violations at point of commitment",
          },
          {
            featureName: "Supplier Registration",
            description: "Supplier portal for registration, document submission, bid participation, and payment status tracking.",
            businessImpact: "Streamlined supplier onboarding and engagement",
          },
        ],
      },
      {
        groupName: "Financial Management",
        icon: "Calculator",
        features: [
          {
            featureName: "Budget & Commitment Control",
            description: "Multi-level budget structure with encumbrance/commitment accounting — budget checked at requisition, not at payment.",
            businessImpact: "No overspending, full fiscal discipline",
          },
          {
            featureName: "GFSM / COFOG Reporting",
            description: "Chart of accounts mapped to international government financial reporting standards with automated classification.",
            businessImpact: "IMF/World Bank compliant financial statements",
          },
          {
            featureName: "Grants & Aid Management",
            description: "Grant lifecycle from application through disbursement to outcome reporting with donor-specific compliance.",
            businessImpact: "Complete grant audit trail",
          },
        ],
      },
      {
        groupName: "HR & Payroll (Government)",
        icon: "Users",
        features: [
          {
            featureName: "Civil Service HR",
            description: "Position-based HR with grade/step structures, civil service rules engine, promotion board workflow.",
            businessImpact: "Compliant HR operations per civil service law",
          },
          {
            featureName: "Government Payroll",
            description: "Multi-scale payroll with allowances, deductions, pension contributions, and bank file generation per government format.",
            businessImpact: "Error-free payroll for thousands of employees",
          },
        ],
      },
    ],
    benefits: [
      {
        title: "Fiscal Discipline",
        description: "Budget checked at commitment, not at payment — prevents overspending before it occurs.",
        icon: "Lock",
      },
      {
        title: "Transparent Procurement",
        description: "End-to-end digital tender process with automated compliance checks and complete audit trail.",
        icon: "ClipboardList",
      },
      {
        title: "Compliance Ready",
        description: "Automated documentation for supreme audit institutions, parliamentary reporting, and international standards.",
        icon: "Shield",
      },
      {
        title: "Enterprise Security",
        description: "Field-level RBAC, IP whitelisting, MFA, encryption at rest and in transit — meeting government infosec standards.",
        icon: "Lock",
      },
      {
        title: "Citizen-Centric",
        description: "Online service portals, digital case management, and SLA tracking for citizen-facing services.",
        icon: "Star",
      },
      {
        title: "Integrated Operations",
        description: "Single platform across finance, procurement, HR, payroll, assets, and citizen services.",
        icon: "LayoutGrid",
      },
    ],
    caseStudy: {
      clientName: "Government Entity, GCC",
      background:
        "A large government entity with 5,000+ employees and an annual procurement budget exceeding $500M was managing procurement through paper-based processes with limited budget control. Budget overruns were common, and procurement cycle times averaged 90+ days. Audit findings consistently highlighted internal control weaknesses.",
      challenge:
        "The entity needed to implement digital procurement with multi-stage tender management, enforce budget control at the point of commitment (not after the fact), establish complete procurement audit trails, and deploy civil service HR and payroll compliant with government regulations.",
      solution:
        "UniERP Government was deployed with tender management, purchase-to-pay with encumbrance accounting, budget control, civil service HR and payroll, and citizen service management modules. The chart of accounts was mapped to GFSM classification for international reporting compliance.",
      results: [
        { value: "90 → 35 days", label: "Procurement Cycle Time" },
        { value: "Zero", label: "Budget Overruns (First Year)" },
        { value: "100%", label: "Procurement Audit Trail Coverage" },
        { value: "70% reduction", label: "Audit Findings" },
      ],
      testimonialQuote:
        "UniERP brought discipline and transparency to our procurement function that we simply could not achieve with paper-based processes. The budget control at the point of requisition has eliminated overspending. Our supreme audit institution noted the transformation as best practice for other government entities.",
      testimonialAuthor: "Director General of Finance",
      testimonialRole: "Government Entity, GCC",
    },
    cta: {
      phoneLabel: "Call",
      phoneNumber: "+971 4 393 0507",
      emailLabel: "Email",
      emailAddress: "erp@simalme.com",
      demoLinkLabel: "Book a Demo",
      demoLinkUrl: "/erp/demo-request",
    },
    meta: {
      title: "Government ERP Software — Tender Management & Compliance | Simal Technologies UAE",
      description:
        "UniERP for government ministries, agencies, and municipalities. Tender management, procurement workflow, budget control, compliance documentation, civil service HR.",
    },
  },

  /* ================================================================
     7. Logistics & Supply Chain
     ================================================================ */
  {
    title: "Logistics & Supply Chain",
    slug: "logistics-supply-chain",
    tagline:
      "Fleet management, shipment tracking, warehouse optimization, and third-party logistics (3PL) operations on a unified supply chain platform.",
    icon: "Truck",
    iconColor: "emerald",
    status: "published",
    hero: {
      headline: "UniERP for Logistics & Supply Chain",
      subHeadline:
        "From fleet and warehouse management to shipment tracking and third-party logistics — UniERP provides end-to-end visibility and control across your entire supply chain operation.",
      ctaLabel: "Explore Logistics ERP",
      ctaLink: "/erp/industries/logistics-supply-chain",
    },
    overviewDescription: richDoc([
      {
        p: "Logistics and supply chain operators manage some of the most operationally complex workflows in business — fleet scheduling, route optimization, warehouse slotting, shipment tracking, customs documentation, and third-party billing. UniERP for Logistics & Supply Chain brings all these functions together on a single integrated platform with real-time visibility from order to delivery.",
      },
      {
        p: "Whether you operate a fleet of delivery vehicles, manage a multi-client warehouse, or run a full 3PL operation, UniERP provides the tools to optimize every link in your supply chain — reducing cost per shipment, improving on-time delivery rates, and giving your customers the real-time tracking visibility they expect.",
      },
    ]),
    industryChallenges: [
      {
        challenge: "Fleet Utilization",
        solution:
          "Route optimization, load consolidation, vehicle tracking with GPS, and driver performance analytics maximize fleet utilization and reduce cost per kilometer.",
      },
      {
        challenge: "Warehouse Efficiency",
        solution:
          "Slotting optimization, wave picking, putaway strategies, and real-time inventory accuracy with barcode/RFID integration.",
      },
      {
        challenge: "Shipment Visibility",
        solution:
          "End-to-end tracking from order placement through pick, pack, dispatch, in-transit milestones, and proof of delivery — visible to customers via portal.",
      },
      {
        challenge: "3PL Billing Complexity",
        solution:
          "Activity-based billing engine supporting storage, handling, value-added services, and transportation charges with client-specific rate cards.",
      },
      {
        challenge: "Customs & Documentation",
        solution:
          "Automated customs documentation, duty calculation, and compliance checking for cross-border shipments across GCC, Africa, and CIS.",
      },
      {
        challenge: "Last-Mile Delivery",
        solution:
          "Dynamic route planning, delivery time window management, electronic proof of delivery, and real-time driver tracking for customers.",
      },
    ],
    subSectors: [
      {
        name: "Third-Party Logistics (3PL)",
        institutionTypes:
          "3PL providers offering warehousing, transportation, and value-added services to multiple clients across the Middle East and Africa.",
        painPoints: [
          "Multi-client warehouse management with varying SLAs",
          "Activity-based billing with client-specific rate cards",
          "Integration with client ERP/WMS systems for order receipt",
          "Value-added service tracking (kitting, labeling, quality inspection)",
        ],
        erpSolutions: [
          "Multi-tenant WMS with client-specific storage and handling rules",
          "Configurable billing engine with contract management",
          "EDI/API integration layer for client system connectivity",
          "VAS module with work order management and cost capture",
        ],
      },
      {
        name: "Fleet & Transportation",
        institutionTypes:
          "Transportation companies, last-mile delivery operators, cross-border freight forwarders.",
        painPoints: [
          "Fleet maintenance scheduling and cost tracking",
          "Driver management including licenses, hours, and performance",
          "Cross-border documentation and customs clearance",
          "Real-time customer visibility and ETA communication",
        ],
        erpSolutions: [
          "Fleet maintenance module with preventive and predictive scheduling",
          "Driver portal with trip assignment, navigation, and ePOD capture",
          "Customs documentation automation with country-specific templates",
          "Customer tracking portal with real-time GPS and automated ETA updates",
        ],
      },
    ],
    moduleGroups: [
      {
        groupName: "Warehouse Management",
        icon: "Package",
        features: [
          {
            featureName: "Inventory & Slotting",
            description: "Real-time inventory with barcode/RFID, dynamic slotting based on velocity and dimensions, putaway and picking strategy optimization.",
            businessImpact: "30% improvement in warehouse space utilization",
          },
          {
            featureName: "Order Fulfillment",
            description: "Wave picking, batch picking, pick-to-light integration, packing station management, shipping label generation.",
            businessImpact: "50% faster order processing",
          },
          {
            featureName: "Multi-Client WMS",
            description: "Client-specific storage zones, handling rules, billing parameters, and inventory segregation.",
            businessImpact: "Seamless multi-tenant operations",
          },
        ],
      },
      {
        groupName: "Fleet & Transportation",
        icon: "Truck",
        features: [
          {
            featureName: "Route Optimization",
            description: "AI-powered route planning with constraints for time windows, vehicle capacity, driver hours, and traffic.",
            businessImpact: "15-20% reduction in fuel costs",
          },
          {
            featureName: "Fleet Maintenance",
            description: "Preventive maintenance scheduling, repair tracking, tire and parts inventory, cost-per-kilometer analytics.",
            businessImpact: "25% reduction in unplanned downtime",
          },
          {
            featureName: "Driver Management",
            description: "License tracking, hours-of-service compliance, trip assignment, mobile app with navigation and ePOD.",
            businessImpact: "Real-time driver performance visibility",
          },
        ],
      },
      {
        groupName: "Customer & Billing",
        icon: "Wallet",
        features: [
          {
            featureName: "Activity-Based Billing",
            description: "Configurable rate cards per client — storage (per pallet/day), handling (per unit), transport (per km/kg), VAS.",
            businessImpact: "Accurate, automated client invoicing",
          },
          {
            featureName: "Customer Portal",
            description: "Order placement, inventory visibility, shipment tracking, POD access, invoice and statement download.",
            businessImpact: "Improved customer satisfaction and self-service",
          },
        ],
      },
    ],
    benefits: [
      {
        title: "End-to-End Visibility",
        description: "Real-time tracking from order through warehouse to delivery — visible to you and your customers.",
        icon: "Globe",
      },
      {
        title: "Optimized Operations",
        description: "Route optimization, dynamic slotting, and wave picking reduce costs across fleet and warehouse.",
        icon: "Zap",
      },
      {
        title: "Accurate Billing",
        description: "Activity-based billing with client-specific rate cards eliminates revenue leakage from unbilled services.",
        icon: "TrendingUp",
      },
      {
        title: "Fleet Reliability",
        description: "Preventive maintenance scheduling reduces unplanned downtime and extends vehicle life.",
        icon: "Wrench",
      },
      {
        title: "Customer Satisfaction",
        description: "Real-time tracking, automated ETAs, and electronic proof of delivery build customer trust.",
        icon: "Star",
      },
      {
        title: "Cross-Border Ready",
        description: "Customs documentation automation, duty calculation, and compliance checking for GCC, Africa, and CIS.",
        icon: "CheckCircle",
      },
    ],
    caseStudy: {
      clientName: "GCC 3PL Provider",
      background:
        "A 3PL provider operating 3 warehouses (50,000+ sqm total) and a fleet of 80+ vehicles across the UAE and Saudi Arabia was managing operations with separate WMS, TMS, and accounting systems. Inventory discrepancies averaged 8%, billing was manual and taking 15 days post-month-end, and customers complained about lack of shipment visibility.",
      challenge:
        "The provider needed a unified platform to manage multi-client warehousing, fleet operations, and activity-based billing. Customer demands for real-time inventory visibility and shipment tracking were not being met, leading to client churn. Manual billing processes were causing cash flow delays.",
      solution:
        "UniERP Logistics was deployed with multi-client WMS, fleet and transportation management, and activity-based billing. Customer portals were launched providing real-time inventory visibility and shipment tracking. Barcode scanning was implemented across all warehouses for inventory accuracy.",
      results: [
        { value: "8% → 0.5%", label: "Inventory Discrepancy" },
        { value: "15 days → 2 days", label: "Month-End Billing" },
        { value: "95%", label: "On-Time Delivery Rate" },
        { value: "Zero", label: "Client Churn (Next 12 Months)" },
      ],
      testimonialQuote:
        "UniERP gave us and our customers one version of the truth. Clients can see their inventory levels and shipment status in real time without calling our operations team. Billing that used to take our finance team two weeks now happens automatically. The system paid for itself in the first year through operational savings alone.",
      testimonialAuthor: "Chief Operating Officer",
      testimonialRole: "GCC 3PL Provider",
    },
    cta: {
      phoneLabel: "Call",
      phoneNumber: "+971 4 393 0507",
      emailLabel: "Email",
      emailAddress: "erp@simalme.com",
      demoLinkLabel: "Book a Demo",
      demoLinkUrl: "/erp/demo-request",
    },
    meta: {
      title: "Logistics & Supply Chain ERP Software — Fleet & Warehouse Management | Simal Technologies UAE",
      description:
        "UniERP for logistics, 3PL, fleet, and supply chain operators. Warehouse management, route optimization, shipment tracking, activity-based billing. Built on Odoo 19 CE.",
    },
  },

  /* ================================================================
     8. Agriculture
     ================================================================ */
  {
    title: "Agriculture",
    slug: "agriculture",
    tagline:
      "Farm management, crop planning, supply chain, processing, and compliance — from field to fork on one integrated agri-ERP platform.",
    icon: "Leaf",
    iconColor: "emerald",
    status: "published",
    hero: {
      headline: "UniERP for Agriculture",
      subHeadline:
        "From crop planning and farm management through processing, supply chain, and compliance — UniERP Agriculture provides end-to-end visibility across the entire agri-value chain.",
      ctaLabel: "Explore Agriculture ERP",
      ctaLink: "/erp/industries/agriculture",
    },
    overviewDescription: richDoc([
      {
        p: "Agriculture is the world's oldest industry and one of its most complex. Modern agribusinesses manage vast operations spanning crop planning, input procurement, farm management, harvest, processing, cold chain logistics, and distribution — all while navigating weather variability, commodity price fluctuations, food safety regulations, and sustainability requirements. UniERP for Agriculture brings the entire agri-value chain onto a single platform.",
      },
      {
        p: "Whether you operate large-scale field crops, protected agriculture (greenhouses/hydroponics), livestock and dairy, or an integrated processing and export operation, UniERP provides the tools to plan more accurately, produce more efficiently, and get your products to market with complete traceability from field to fork.",
      },
    ]),
    industryChallenges: [
      {
        challenge: "Crop Planning & Yield",
        solution:
          "Seasonal crop planning with variety selection, planting schedules, input requirements, and yield forecasting based on historical data and agronomic models.",
      },
      {
        challenge: "Input Management",
        solution:
          "Seeds, fertilizers, pesticides, and water — procurement, inventory, application tracking, and cost allocation to individual plots and crops.",
      },
      {
        challenge: "Harvest & Post-Harvest",
        solution:
          "Harvest scheduling, quality grading, packhouse operations, cold chain monitoring, and inventory with batch/lot traceability.",
      },
      {
        challenge: "Food Safety Compliance",
        solution:
          "GlobalG.A.P., Organic, HACCP, and buyer-specific certification management with automated documentation and audit readiness.",
      },
      {
        challenge: "Supply Chain & Exports",
        solution:
          "Cold chain logistics, export documentation (phytosanitary, certificate of origin), and buyer-specific packing and labeling requirements.",
      },
      {
        challenge: "Cost & Profitability",
        solution:
          "Activity-based costing per plot, crop, and season — capturing all direct and indirect costs for true profitability analysis.",
      },
    ],
    subSectors: [
      {
        name: "Field Crops & Plantations",
        institutionTypes:
          "Large-scale field crop operations, plantation companies, and contract farming organizations across Africa, the Middle East, and South Asia.",
        painPoints: [
          "Managing thousands of hectares with multiple crops and varieties",
          "Weather risk and irrigation management",
          "Mechanization fleet management and cost tracking",
          "Contract farming with outgrower management and payment",
        ],
        erpSolutions: [
          "GIS-integrated plot management with crop and variety tracking",
          "Weather station integration with irrigation scheduling",
          "Farm machinery fleet management with utilization and cost tracking",
          "Outgrower module with registration, input credit, delivery, and payment",
        ],
      },
      {
        name: "Protected Agriculture & Horticulture",
        institutionTypes:
          "Greenhouse operations, hydroponic farms, vertical farms, fruit and vegetable producers for domestic and export markets.",
        painPoints: [
          "Climate control and resource optimization",
          "Labor-intensive operations with piece-rate harvesting",
          "Quality grading and packhouse management",
          "Cold chain from harvest to customer",
        ],
        erpSolutions: [
          "Climate monitoring integration with automated alerts",
          "Labor management with piece-rate harvesting and productivity tracking",
          "Packhouse module with quality grading, packing, and labeling",
          "Cold chain monitoring with temperature logging and alerts",
        ],
      },
    ],
    moduleGroups: [
      {
        groupName: "Farm Management",
        icon: "Leaf",
        features: [
          {
            featureName: "Plot & Crop Planning",
            description: "GIS-linked plot management, seasonal crop planning, variety selection, planting schedule, input requirement calculation.",
            businessImpact: "Optimized land utilization and input planning",
          },
          {
            featureName: "Input & Inventory",
            description: "Seeds, fertilizers, pesticides, water — procurement, inventory, application logging, cost allocation.",
            businessImpact: "Reduced input waste and accurate cost capture",
          },
          {
            featureName: "Irrigation Management",
            description: "Irrigation scheduling, water usage tracking, pump operation logging, moisture sensor integration.",
            businessImpact: "20-30% water savings",
          },
        ],
      },
      {
        groupName: "Harvest & Post-Harvest",
        icon: "Package",
        features: [
          {
            featureName: "Harvest Management",
            description: "Harvest scheduling, quality grading at point of harvest, yield recording per plot, labor productivity tracking.",
            businessImpact: "Complete harvest-to-inventory traceability",
          },
          {
            featureName: "Packhouse Operations",
            description: "Receiving, grading, packing, labeling, palletizing — with buyer-specific packing instructions and label generation.",
            businessImpact: "Export-ready packing and labeling",
          },
          {
            featureName: "Cold Chain",
            description: "Temperature monitoring from packhouse through cold storage to transport, with automated alerts and compliance logging.",
            businessImpact: "Zero cold chain breaks",
          },
        ],
      },
      {
        groupName: "Compliance & Exports",
        icon: "Shield",
        features: [
          {
            featureName: "Certification Management",
            description: "GlobalG.A.P., Organic, HACCP, Fair Trade, Rainforest Alliance — certification status tracking, audit scheduling, document repository.",
            businessImpact: "Audit-ready at all times",
          },
          {
            featureName: "Export Documentation",
            description: "Phytosanitary certificate, certificate of origin, bill of lading, commercial invoice — automated per destination country requirements.",
            businessImpact: "Zero export documentation errors",
          },
          {
            featureName: "Traceability",
            description: "Full chain traceability from seed/input through field, harvest, packhouse, cold chain, to customer — in under 30 seconds.",
            businessImpact: "Meets retailer and regulator traceability requirements",
          },
        ],
      },
    ],
    benefits: [
      {
        title: "Higher Yields",
        description: "Data-driven crop planning and input management optimize yields across every plot and season.",
        icon: "TrendingUp",
      },
      {
        title: "Input Efficiency",
        description: "Precise tracking and cost allocation for seeds, fertilizers, pesticides, and water — reducing waste and cost.",
        icon: "Zap",
      },
      {
        title: "Complete Traceability",
        description: "Field-to-fork traceability in under 30 seconds meeting the most stringent retailer and regulator requirements.",
        icon: "Database",
      },
      {
        title: "Food Safety",
        description: "GlobalG.A.P., Organic, HACCP, and buyer-specific certification management with automated audit documentation.",
        icon: "Shield",
      },
      {
        title: "Export Ready",
        description: "Automated phytosanitary certificates, packing lists, and buyer-specific labeling for international markets.",
        icon: "Globe",
      },
      {
        title: "True Profitability",
        description: "Activity-based costing per plot, crop, and season reveals which crops and practices drive the best returns.",
        icon: "Calculator",
      },
    ],
    caseStudy: {
      clientName: "East African Horticulture Exporter",
      background:
        "A large horticulture operation in East Africa with 500+ hectares under protected agriculture exporting fresh vegetables and flowers to European supermarkets. The operation was managing crop planning, input procurement, harvest, packhouse, and export documentation through a patchwork of spreadsheets and paper records.",
      challenge:
        "European retail customers were demanding full field-to-fork traceability and GlobalG.A.P. certification. Packhouse operations had limited visibility into incoming harvest quality. Export documentation errors were causing shipment delays. Input costs were not being tracked to individual crops, making profitability analysis impossible.",
      solution:
        "UniERP Agriculture was deployed covering plot management, crop planning, input procurement and application tracking, harvest management with quality grading, packhouse operations, cold chain monitoring, certification management (GlobalG.A.P., Organic), and export documentation automation.",
      results: [
        { value: "Under 30 sec", label: "Full Traceability (Field to Fork)" },
        { value: "Zero", label: "Export Documentation Errors" },
        { value: "25% reduction", label: "Input Waste" },
        { value: "100%", label: "Customer Audit Pass Rate" },
      ],
      testimonialQuote:
        "UniERP gave our European retail customers exactly what they demanded — complete traceability from the field where the crop was grown to the packhouse where it was packed, through cold chain to their distribution center. Our GlobalG.A.P. audits are now stress-free because every record is captured automatically.",
      testimonialAuthor: "Managing Director",
      testimonialRole: "East African Horticulture Export Group",
    },
    cta: {
      phoneLabel: "Call",
      phoneNumber: "+971 4 393 0507",
      emailLabel: "Email",
      emailAddress: "erp@simalme.com",
      demoLinkLabel: "Book a Demo",
      demoLinkUrl: "/erp/demo-request",
    },
    meta: {
      title: "Agriculture ERP Software — Farm Management & Supply Chain | Simal Technologies UAE",
      description:
        "UniERP for agriculture: farm management, crop planning, harvest, packhouse, cold chain, compliance (GlobalG.A.P., Organic, HACCP), and export documentation. Field-to-fork traceability.",
    },
  },
];

/* ------------------------------------------------------------------
   Main
   ------------------------------------------------------------------ */

/** Transform seeder data shape (string[]) into the collection's object shape. */
function transformIndustry(industry: SeedIndustry) {
  return {
    ...industry,
    subSectors: industry.subSectors.map((s) => ({
      name: s.name,
      institutionTypes: s.institutionTypes,
      painPoints: (s.painPoints ?? []).map((p) => ({ point: p })),
      erpSolutions: (s.erpSolutions ?? []).map((e) => ({ solution: e })),
    })),
  };
}

async function seed() {
  console.log("Seeding ERP Industries...\n");

  const payload = await getPayload({ config });

  let created = 0;
  let updated = 0;

  for (const industry of INDUSTRIES) {
    try {
      const data = transformIndustry(industry) as unknown as Record<string, unknown>;
      const existing = await payload.find({
        collection: "erp-industries",
        where: { slug: { equals: industry.slug } },
        limit: 1,
        overrideAccess: true,
      });

      if (existing.docs.length > 0) {
        await payload.update({
          collection: "erp-industries",
          id: existing.docs[0].id as string,
          data,
          overrideAccess: true,
        });
        console.log(`  ✓ Updated: ${industry.title} (${industry.slug})`);
        updated++;
      } else {
        await payload.create({
          collection: "erp-industries",
          data,
          overrideAccess: true,
        });
        console.log(`  ✓ Created: ${industry.title} (${industry.slug})`);
        created++;
      }
    } catch (err) {
      console.error(`  ✗ Failed: ${industry.title} (${industry.slug})`);
      console.error(`    ${(err as Error).message}`);
    }
  }

  console.log(`\nDone. Created: ${created}, Updated: ${updated}, Total: ${INDUSTRIES.length}`);
  await payload.destroy();
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
