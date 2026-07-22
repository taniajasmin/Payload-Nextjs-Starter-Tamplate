/** @deprecated Use seed/index.ts instead — the canonical seeder. */
/**
 * Seed Globals Script — Simal Corporate Website
 *
 * Seeds all page content globals with the hardcoded content from page files.
 * Idempotent: safe to run multiple times (updateGlobal is upsert).
 *
 * Uses Payload's Local API — no dev server required.
 *
 * Usage:  npx tsx src/scripts/seed-globals.ts
 */

import "dotenv/config";
import { readFileSync, existsSync } from "fs";
import { resolve, basename } from "path";

import { getPayload } from "payload";

import config from "../../payload.config";

type PayloadInstance = Awaited<ReturnType<typeof getPayload>>;

function log(phase: string, msg: string) {
  console.log(`  [${phase}] ${msg}`);
}

// ─── Upload helper (idempotent by filename) ────────────────────────
// Uploads a local file (relative to public/) to the media collection,
// reusing an existing doc when the filename already exists.

const MIME_BY_EXT: Record<string, string> = {
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  gif: "image/gif",
  svg: "image/svg+xml",
  webp: "image/webp",
  avif: "image/avif",
};

const PUBLIC_DIR = resolve(__dirname, "../../public");

async function findMediaByFilename(
  payload: PayloadInstance,
  filename: string,
): Promise<number | null> {
  const res = await payload.find({
    collection: "media",
    where: { filename: { equals: filename } },
    limit: 1,
    overrideAccess: true,
  });
  return (res.docs[0]?.id as number | undefined) ?? null;
}

async function uploadFile(
  payload: PayloadInstance,
  relPath: string,
  alt: string,
): Promise<number | null> {
  const absolutePath = resolve(PUBLIC_DIR, relPath.replace(/^\//, ""));
  if (!existsSync(absolutePath)) {
    return null;
  }

  const filename = basename(absolutePath);

  // Idempotency: reuse existing media by filename (unique constraint)
  const existing = await findMediaByFilename(payload, filename);
  if (existing) return existing;

  const fileBuffer = readFileSync(absolutePath);
  const ext = filename.split(".").pop()?.toLowerCase() ?? "";
  const mimeType = MIME_BY_EXT[ext] || "application/octet-stream";

  const doc = await payload.create({
    collection: "media",
    data: { alt: { en: alt } } as never,
    file: {
      data: fileBuffer,
      mimetype: mimeType,
      name: filename,
      size: fileBuffer.length,
    },
    overrideAccess: true,
  });
  return doc.id as number;
}

// ─── Seed Data ──────────────────────────────────────────────────────

// ============================================================
// 1. About Page Global (consolidated single page)
// ============================================================
const ABOUT_PAGE_DATA = {
  hero: {
    headline: "About Simal Technologies",
    description:
      "Established in 2002, Simal Technologies has grown into one of the most trusted and recognized IT distribution companies in the UAE, serving as a key supply chain partner for IT solutions across the Middle East, Africa, CIS, and GCC countries.",
    secondaryDescription:
      "As an authorized distributor of globally recognized brands including Crucial, UGREEN, and other leading IT hardware manufacturers, we deliver cutting-edge technology products, timely services, and unparalleled customer support.",
  },
  companySection: {
    badge: "Who We Are",
    heading: "Company at a Glance",
    description:
      "As an authorized distributor of globally recognized brands, including Crucial, UGREEN, and other leading IT hardware manufacturers, Simal Technologies offers a robust portfolio that includes enterprise SSDs, RAM, NAS storage, docking stations, networking devices, and more. Our solutions are tailored to meet the needs of system integrators, value-added resellers (VARs), consultants, and corporate IT departments.",
  },
  companyDetails: [
    { label: "Legal Name", value: "Simal Technologies Middle East LLC" },
    { label: "Founded", value: "2002" },
    {
      label: "Headquarters",
      value:
        "Office No: 201, Dar Al Riffa Building, Khalid Bin Al Waleed Rd, Bur Dubai, PO Box: 49740, Dubai, UAE",
    },
    { label: "Phone", value: "+971 4 393 0507" },
    { label: "Email", value: "info@simalme.com" },
    { label: "Website", value: "www.simalme.com" },
    { label: "Employees", value: "300+ across all divisions" },
    { label: "Annual Revenue", value: "~$1.97 Million USD" },
    { label: "VAT/TAX ID", value: "100207478700003" },
    { label: "Parent Company", value: "TwinMOS Group" },
    {
      label: "Business Model",
      value:
        "Local Wholesaler, Global Wholesaler (Importer/Exporter), Distributor",
    },
    { label: "Tagline", value: "Best IT Distributor in Dubai, UAE" },
  ],
  associatedCompanies: [
    {
      company: "StarSeed Technologies ME FZE",
      location: "Jebel Ali Free Zone, UAE",
      role: "Warehouse Operations",
    },
    {
      company: "Stellent Technologies ME LLC",
      location: "Bur Dubai, UAE",
      role: "Retail Store Operations",
    },
  ],
  parentCompanyFocus: [
    { item: "Data Storage & Backup" },
    { item: "Security Surveillance" },
    { item: "Networking" },
    { item: "IT Security Solutions" },
  ],
  missionVisionSection: {
    badge: "Our Purpose",
    heading: "Mission & Vision",
  },
  mission: {
    badge: "Mission",
    headline:
      "Empowering businesses with essential tools for a digital-first landscape",
    description:
      "Simal Technologies is committed to bridging the technology gap for businesses across the Middle East, Africa, CIS, and GCC regions. With a clear mission to empower digital transformation, Simal focuses on proactive customer service, rapid response times, and a continuous improvement mindset. Our experienced team works relentlessly to ensure precision in delivery, high availability of stock, and strategic support that fuels our clients' success.",
  },
  vision: {
    badge: "Vision",
    headline: "To be the premier IT solutions distributor",
    description:
      "Going beyond mere product delivery to empower businesses with innovative technology solutions.",
  },
  visionStandards: [
    {
      title: "Service Excellence",
      desc: "Unmatched customer support and technical expertise",
    },
    {
      title: "Innovation Leadership",
      desc: "Bringing cutting-edge technology to our markets first",
    },
    {
      title: "Regional Dominance",
      desc: "Being the first-choice IT distributor across all served markets",
    },
    {
      title: "Trusted Partnership",
      desc: "Building long-term relationships that drive mutual growth",
    },
  ],
  coreValuesSection: {
    badge: "What We Believe",
    heading: "Our Core Values",
  },
  coreValues: [
    {
      number: "01",
      title: "Customer-Centric Excellence",
      desc: "Every decision we make starts with the customer. We listen, understand, and deliver solutions that address real business challenges.",
    },
    {
      number: "02",
      title: "Integrity & Transparency",
      desc: "We conduct business with honesty, openness, and ethical responsibility. From pricing to partnerships, we believe in doing the right thing.",
    },
    {
      number: "03",
      title: "Innovation & Agility",
      desc: "The technology landscape evolves rapidly. We stay ahead by continuously learning, adapting, and bringing innovative solutions to our customers.",
    },
    {
      number: "04",
      title: "Quality & Reliability",
      desc: "We are authorized distributors for the world's leading IT brands. Every product meets stringent quality standards, backed by full manufacturer warranty.",
    },
    {
      number: "05",
      title: "Partnership & Collaboration",
      desc: "We succeed together — with our brand partners, our resellers, our system integrators, and our end customers.",
    },
    {
      number: "06",
      title: "Continuous Improvement",
      desc: "We never stand still. We constantly review our processes, seek feedback, and invest in improvement.",
    },
  ],
  whyChooseSection: {
    badge: "Why Choose Us",
    heading:
      "Your Trusted Partner in Quality, Performance & Reliable Solutions",
    description:
      "We deliver high-quality memory, storage, and SSD solutions, combining performance, reliability, and innovation to meet your technology needs.",
  },
  servicePillars: [
    {
      number: "01",
      title: "Authorized Partnerships",
      intro:
        "Official authorized distributor for 20+ global IT brands including Crucial, UGREEN, HIKVISION, ARKTEK, Dell, HP, Lenovo, Samsung, Kingston, and more.",
      benefits: [
        { item: "100% genuine products with full manufacturer warranty" },
        { item: "Direct access to manufacturer support and RMA processes" },
        {
          item: "Early access to new product launches and promotional pricing",
        },
        {
          item: "Official authorization letters available for tender submissions",
        },
      ],
    },
    {
      number: "02",
      title: "Regional Coverage",
      intro:
        "Serving businesses across UAE, GCC, Africa, and CIS with seamless logistics and reliable delivery networks.",
      benefits: [
        { item: "UAE-wide delivery (Dubai, Abu Dhabi, Sharjah, all emirates)" },
        {
          item: "GCC distribution (Saudi Arabia, Qatar, Kuwait, Bahrain, Oman)",
        },
        { item: "Africa coverage (Egypt, Nigeria, Kenya, South Africa)" },
        { item: "CIS markets (Kazakhstan, Uzbekistan, Azerbaijan)" },
      ],
    },
    {
      number: "03",
      title: "Seamless Process",
      intro:
        "From consultation to delivery, we ensure a smooth, efficient workflow to meet your technology requirements.",
      benefits: [
        { item: "Consultation — Understand your requirements" },
        { item: "Quotation — Competitive, personalized pricing" },
        {
          item: "Fulfillment — Pick, pack, and dispatch from our Jebel Ali warehouse",
        },
        { item: "After-Sales — Ongoing support and warranty assistance" },
      ],
    },
    {
      number: "04",
      title: "Dedicated Team",
      intro:
        "Our experienced team is committed to providing personalized support and innovative solutions for your business.",
      benefits: [
        {
          item: "Certified technical professionals across multiple vendor platforms",
        },
        { item: "Industry-trained sales teams organized by business division" },
        {
          item: "Multi-lingual support (English, Arabic, Hindi, Urdu, Bengali)",
        },
      ],
    },
    {
      number: "05",
      title: "Custom Solutions",
      intro:
        "We offer tailored storage and memory solutions that align with your unique business goals and technical needs.",
      benefits: [
        { item: "Bulk order configurations for enterprise deployments" },
        { item: "Kitting and bundling services" },
        { item: "Pre-configured solutions for specific industries" },
      ],
    },
  ],
  milestonesSection: {
    badge: "Our Journey",
    heading: "Key Milestones",
  },
  milestones: [
    { year: "2002", milestone: "Simal Technologies founded in Dubai, UAE" },
    { year: "2005", milestone: "Established first major brand partnerships" },
    {
      year: "2010",
      milestone: "Expanded to 50+ employees across multiple divisions",
    },
    {
      year: "2015",
      milestone: "Joined TwinMOS Group; launched Corporate division",
    },
    {
      year: "2018",
      milestone: "Expanded market reach to Africa and CIS regions",
    },
    { year: "2020", milestone: "Launched e-commerce catalog (76 products)" },
    {
      year: "2022",
      milestone: "20th Anniversary; crossed $1.5M annual revenue",
    },
    {
      year: "2025",
      milestone: "Awarded HIKSEMi Best Distribution Partner at MEA Summit",
    },
    { year: "2026", milestone: "Launching new enterprise website" },
  ],
  leadershipSection: {
    badge: "Leadership",
    heading: "Our Leadership",
  },
  boardOfDirectors: [
    {
      name: "Mohammad Mazharul Islam",
      code: "STBL-0001",
      role: "Chairman — Strategic Vision & Corporate Governance",
      profile:
        "Provides the overarching strategic direction for Simal Technologies and TwinMOS Group. His leadership has been instrumental in establishing Simal Technologies as a premier IT distributor in the UAE over two decades.",
    },
    {
      name: "Mohammad Zahirul Islam",
      code: "STBL-0002",
      role: "Managing Director — Operational Leadership & Business Strategy",
      profile:
        "Oversees day-to-day operations and drives strategic initiatives. Under his guidance, Simal Technologies has expanded its market reach across the Middle East, Africa, CIS, and GCC regions.",
    },
    {
      name: "S. M. Mohibul Hasan",
      code: "STBL-1900",
      role: "Deputy Managing Director",
      profile:
        "Supports the MD in operational oversight and leads key strategic projects. His focus on operational excellence has contributed to consistent growth.",
    },
  ],
  executiveTeam: [
    {
      position: "General Manager (GM)",
      name: "A K M Shafiq Ul Haque",
      code: "STBL-0132",
    },
    { position: "Director", name: "Abu Mostofa Chowdhury", code: "STBL-3656" },
    {
      position: "GM & Chief Financial Officer",
      name: "Forhad Hossain",
      code: "STBL-0707",
    },
    { position: "Director", name: "Md. Muzahid Al Beruni", code: "STBL-0012" },
    { position: "Director", name: "Md. Tanvir Hossain", code: "STBL-3551" },
    {
      position: "General Manager (GM)",
      name: "Md. Zakir Hossain",
      code: "STBL-0008",
    },
    { position: "Director", name: "Zafor Ahmed", code: "STBL-0003" },
  ],
  divisions: [
    {
      name: "SBU 1",
      size: "48 professionals",
      focus:
        "Connectivity & Presentation (Monitors, Peripherals, Power Systems)",
    },
    {
      name: "SBU 2",
      size: "18 professionals",
      focus: "Digital Workspaces (Notebooks, PCs, Printers, Servers)",
    },
    {
      name: "SBU 3",
      size: "24 professionals",
      focus: "Networking & Surveillance",
    },
    {
      name: "SBU 4",
      size: "34 professionals",
      focus: "Mobility & Accessories (Smartphones, Gimbals, Microphones)",
    },
    {
      name: "B2B Corporate",
      size: "66 professionals",
      focus: "Enterprise Systems Group (ESG) & Personal Systems Group (PSG)",
    },
    {
      name: "B2B Solution",
      size: "92 professionals",
      focus: "Technology Architecture (HPE, Dell, EMC, Cisco)",
    },
    {
      name: "B2G",
      size: "18 professionals",
      focus: "Government & Corporate Tenders",
    },
  ],
  awardsSection: {
    badge: "Recognition",
    heading: "Awards & Certifications",
  },
  awards: [
    {
      year: "2025",
      title: "HIKSEMi Best Distribution Partner 2025",
      issuer: "HIKSEMi MEA National Distributor Summit",
      description:
        "Recognizes the top-performing distributor in the Middle East and Africa region for outstanding sales performance, market coverage, and brand representation.",
    },
    {
      year: "Multi-Year",
      title: "HikVision Best Distributor Partner",
      issuer: "HikVision Digital Technology",
      description:
        "Ongoing recognition for exceptional performance in representing and distributing HikVision's comprehensive portfolio of security and surveillance products.",
    },
  ],
  certifications: [
    {
      cert: "UAE Trade License",
      authority: "Department of Economic Development, Dubai",
      status: "Active",
    },
    {
      cert: "VAT Registration (100207478700003)",
      authority: "UAE Federal Tax Authority",
      status: "Active",
    },
    {
      cert: "Authorized Distributor — Crucial",
      authority: "Micron Technology",
      status: "Active",
    },
    {
      cert: "Authorized Distributor — HIKVISION",
      authority: "HikVision Digital Technology",
      status: "Active",
    },
    {
      cert: "Authorized Distributor — UGREEN",
      authority: "UGREEN Group Limited",
      status: "Active",
    },
    {
      cert: "Authorized Distributor — Dell",
      authority: "Dell Technologies",
      status: "Active",
    },
    {
      cert: "Authorized Distributor — HP",
      authority: "HP Inc.",
      status: "Active",
    },
    {
      cert: "Authorized Distributor — Lenovo",
      authority: "Lenovo Group",
      status: "Active",
    },
    {
      cert: "Authorized Distributor — Samsung",
      authority: "Samsung Electronics",
      status: "Active",
    },
  ],
  ethicalPractices: [
    {
      item: "Anti-Corruption — Zero-tolerance policy for bribery or unethical business practices",
    },
    {
      item: "Fair Competition — Competing fairly in all markets in compliance with UAE competition laws",
    },
    {
      item: "Transparent Pricing — Honest and transparent pricing with no hidden charges",
    },
    {
      item: "Data Protection — Protecting customer and employee data in compliance with UAE PDPL",
    },
    {
      item: "Supply Chain Integrity — Only partnering with authorized manufacturers and verified suppliers",
    },
    {
      item: "Regulatory Compliance — Full compliance with UAE commercial and labor laws",
    },
  ],
  uaeAlignment: [
    {
      priority: "Digital Economy",
      contribution:
        "Enabling businesses with IT infrastructure for digital transformation",
    },
    {
      priority: "Knowledge Economy",
      contribution:
        "Distributing technology that powers innovation and knowledge-based industries",
    },
    {
      priority: "Economic Diversification",
      contribution:
        "Supporting non-oil sector growth through technology distribution",
    },
    {
      priority: "Emiratisation",
      contribution:
        "Commitment to UAE national talent development and employment",
    },
  ],
  marketCoverage: [
    {
      region: "Middle East",
      coverage: "Full coverage",
      markets: "UAE, Saudi Arabia, Qatar, Kuwait, Bahrain, Oman",
    },
    {
      region: "Africa",
      coverage: "North & West Africa",
      markets: "Egypt, Nigeria, Kenya, South Africa",
    },
    {
      region: "CIS",
      coverage: "Commonwealth of Independent States",
      markets: "Kazakhstan, Uzbekistan, Azerbaijan",
    },
    {
      region: "GCC",
      coverage: "Gulf Cooperation Council",
      markets: "Complete GCC coverage",
    },
  ],
  distributionChannels: [
    { title: "Retailers", desc: "Brick-and-mortar and online stores" },
    { title: "Resellers", desc: "Value-added technology providers" },
    { title: "E-Commerce Platforms", desc: "Amazon UAE, Sharaf DG, Microless" },
    { title: "System Integrators", desc: "Enterprise solution providers" },
    {
      title: "Value-Added Resellers (VARs)",
      desc: "Specialized technology consultants",
    },
    { title: "Consultants", desc: "IT advisory and implementation firms" },
    {
      title: "Contractors",
      desc: "Government and corporate project implementers",
    },
  ],
  philosophy: [
    {
      title: "Excellent Customer Support",
      desc: "Fast response times, dedicated account managers",
    },
    {
      title: "Technical Expertise",
      desc: "Deep product knowledge and solution architecture capabilities",
    },
    {
      title: "Innovation",
      desc: "Staying ahead of the curve with cutting-edge technology products",
    },
    {
      title: "Availability",
      desc: "High product availability with reliable delivery networks",
    },
    { title: "Continuous Improvement", desc: "Regular process optimization" },
    { title: "Proactive Approach", desc: "Anticipating customer needs" },
    {
      title: "Timely Responses",
      desc: "Quick turnaround on inquiries and orders",
    },
    {
      title: "Accuracy",
      desc: "Precision that enhances business for our partners",
    },
  ],
  cta: {
    heading:
      "Optimizing Your Business with Reliable Storage and Memory Solutions",
    description:
      "Let us help optimize your business with reliable, high-performance storage and memory solutions. Driven by innovation, reliability, and strategic partnerships.",
    primaryButtonLabel: "Contact Us",
    primaryButtonHref: "/contact",
    secondaryButtonLabel: "Browse Products",
    secondaryButtonHref: "/brands",
  },
};

// ============================================================
// 2. IT Distribution Page Global
// ============================================================
const IT_DISTRIBUTION_PAGE_DATA = {
  hero: {
    headline: "Powering the Digital Infrastructure of the Middle East",
    subHeadline:
      "For over 20 years, Simal Technologies Middle East LLC has stood as one of the premier IT distribution hubs in the United Arab Emirates. Founded in 2002 with a clear mission—to establish a robust technology distribution business serving the Middle East, Africa, CIS, and GCC countries—Simal Technologies has grown into a trusted partner for enterprises, resellers, system integrators, and government entities seeking reliable, genuine IT hardware and components.",
    primaryCtaLabel: "Browse Product Catalog",
    primaryCtaLink: "/hardware/product-catalog",
    secondaryCtaLabel: "Contact Sales",
    secondaryCtaLink: "/contact",
  },
  authorizedBrandsTitle: "Authorized Distribution — Guaranteed Authenticity",
  authorizedBrandsDescription:
    "Unlike gray-market resellers, Simal Technologies is the officially authorized distributor for every brand in our portfolio. Every product that ships from our warehouse carries full manufacturer warranty, dedicated support, and the assurance of authenticity.",
  authorizedBrands: [
    {
      category: "SSD & Memory",
      brands:
        "Crucial, HIKVISION, Kingston, Samsung, SanDisk, TEAMGROUP, Toshiba, WD",
    },
    { category: "Graphics Cards", brands: "ARKTEK, Inno3D, Zotac, PNY" },
    { category: "Monitors", brands: "Aiwa, KOORUI" },
    { category: "Laptops", brands: "Dell, HP, Lenovo" },
    { category: "Accessories & Cables", brands: "UGREEN" },
    { category: "Surge Protection", brands: "Honeywell" },
    { category: "Motherboards", brands: "MSI" },
    { category: "AV & Conferencing", brands: "Nearity" },
    { category: "Networking", brands: "Wavlink" },
  ],
  productCategoriesTitle: "76+ Products Across 5 Core Categories",
  productCategoriesDescription:
    "Our distribution catalog spans the full spectrum of IT hardware needs.",
  productCategories: [
    {
      category: "Computer Components",
      count: 35,
      subCategories:
        "SSDs (14), Portable SSDs (12), RAM (4), Graphics Cards (5)",
    },
    {
      category: "Computer Accessories",
      count: 30,
      subCategories:
        "HDMI Cables, Hubs & Docking Stations, Surge Protectors (11)",
    },
    {
      category: "Monitors",
      count: 6,
      subCategories: "Gaming, Professional, Ultrawide",
    },
    {
      category: "Gaming",
      count: 9,
      subCategories: "Gaming GPUs, Gaming Monitors, High-Speed SSDs",
    },
    {
      category: "Laptops",
      count: 3,
      subCategories: "Enterprise, Professional, Slim",
    },
  ],
  geographicCoverage: [
    { region: "UAE", coverage: "Nationwide next-day delivery" },
    { region: "GCC", coverage: "Saudi Arabia, Qatar, Kuwait, Bahrain, Oman" },
    { region: "Middle East", coverage: "Jordan, Lebanon, Iraq, Yemen" },
    {
      region: "Africa",
      coverage: "Egypt, Kenya, Nigeria, South Africa, Morocco",
    },
    { region: "CIS", coverage: "Kazakhstan, Azerbaijan, Uzbekistan, Georgia" },
  ],
  qualityAssuranceTitle: "Quality Assurance & Warranty",
  qualityAssuranceDescription:
    "Every product distributed by Simal Technologies undergoes:",
  qualityAssurance: [
    {
      item: "Authenticity Verification — Direct sourcing from manufacturers; no parallel imports",
    },
    {
      item: "Quality Inspection — Physical inspection before dispatch for all orders",
    },
    {
      item: "Manufacturer Warranty — Full manufacturer warranty honored across all served regions",
    },
    {
      item: "Dead-on-Arrival (DOA) Policy — Immediate replacement for DOA units",
    },
    {
      item: "Technical Support — Pre-sales consultation and post-sales technical assistance",
    },
  ],
  channelAdvantages: {
    siVarTitle: "For System Integrators & VARs",
    siVarAdvantages: [
      { item: "Competitive trade pricing with volume-based discounts" },
      { item: "Dedicated account manager for each partner" },
      { item: "Priority allocation for high-demand components" },
      { item: "Technical pre-sales support and solution design assistance" },
      { item: "Flexible payment terms for established partners" },
    ],
    corporateGovTitle: "For Corporate & Government Buyers",
    corporateGovAdvantages: [
      { item: "Compliance with UAE procurement regulations" },
      { item: "VAT-compliant invoicing (TRN: 100207478700003)" },
      { item: "Project-based pricing for large-scale deployments" },
      { item: "Detailed product documentation and compliance certificates" },
      { item: "Extended warranty and service-level agreements available" },
    ],
    ecommerceRetailTitle: "For E-Commerce & Retail Partners",
    ecommerceRetailAdvantages: [
      { item: "Drop-shipping support with white-label packaging" },
      { item: "Real-time stock API integration" },
      { item: "Marketing collateral and product imagery" },
      { item: "Competitive retail pricing with healthy margins" },
      { item: "Fast fulfillment from Jebel Ali warehouse" },
    ],
  },
  industriesTitle: "Industries We Serve",
  industries: [
    {
      industry: "IT Services & MSPs",
      requirements: "SSDs, RAM, networking equipment",
    },
    {
      industry: "Construction & Real Estate",
      requirements: "Surveillance, networking, cabling",
    },
    {
      industry: "Education",
      requirements: "Laptops, monitors, classroom technology",
    },
    {
      industry: "Healthcare",
      requirements: "Reliable storage, secure networking",
    },
    {
      industry: "Government",
      requirements: "High-volume procurement, compliance-grade hardware",
    },
    {
      industry: "Retail & E-Commerce",
      requirements: "POS systems, displays, accessories",
    },
    {
      industry: "Gaming & Entertainment",
      requirements: "High-performance GPUs, gaming monitors, fast storage",
    },
    {
      industry: "Financial Services",
      requirements: "Enterprise-grade SSDs, secure networking",
    },
  ],
  infrastructure: {
    warehouseTitle: "Warehouse & Logistics",
    warehouseDescription:
      "Through our associated company StarSeed Technologies ME FZE (Jebel Ali Free Zone, UAE), we maintain:",
    warehouseFeatures: [
      { item: "Climate-controlled warehousing for sensitive components" },
      { item: "Real-time inventory management with stock visibility" },
      { item: "Same-day dispatch for orders placed before 2:00 PM GST" },
      { item: "Insured shipping with tracking across all served regions" },
      {
        item: "Dedicated logistics team handling customs clearance and documentation",
      },
    ],
    retailTitle: "Retail Presence",
    retailDescription:
      "Stellent Technologies ME LLC (Bur Dubai) operates as our retail storefront, providing:",
    retailFeatures: [
      { item: "Walk-in customer service and product demonstrations" },
      { item: "Pickup point for online orders" },
      { item: "Technical consultation and product recommendations" },
    ],
  },
  getStartedTitle: "Get Started",
  getStartedItems: [
    {
      title: "Registered Business?",
      description:
        "Contact our sales team for trade pricing and priority support",
      ctaLabel: "Contact Sales",
      ctaLink: "/contact",
    },
    {
      title: "New Partner Inquiry?",
      description: "Contact our distribution team at distribution@simalme.com",
      ctaLabel: "Email Distribution Team",
      ctaLink: "mailto:distribution@simalme.com",
    },
    {
      title: "Product Availability?",
      description:
        "Browse our live product catalog or speak with a product specialist",
      ctaLabel: "Browse Catalog",
      ctaLink: "/hardware/product-catalog",
    },
    {
      title: "Bulk RFQ?",
      description:
        "Submit your requirements for a customized quotation within 24 hours",
      ctaLabel: "Submit RFQ",
      ctaLink: "/contact",
    },
  ],
  cta: {
    headline: "Explore the Full Product Catalog",
    description:
      "76+ authentic IT products across five major categories. Every product is sourced directly from the manufacturer with full warranty.",
    primaryCtaLabel: "View Product Catalog →",
    primaryCtaLink: "/hardware/product-catalog",
    secondaryCtaLabel: "Brand Partnerships",
    secondaryCtaLink: "/brands",
    relatedLinks: "Brand Partnerships | Contact Sales",
  },
};

// ============================================================
// 3. Contact Page Global
// ============================================================
const CONTACT_PAGE_DATA = {
  hero: {
    headline: "Get in Touch",
    subHeadline:
      "Whether you're looking for IT products, solutions, or support — our team is ready to help. We typically respond within 24 hours for general inquiries and 4 hours for sales requests.",
  },
  quickContactsTitle: "Quick Contact",
  quickContacts: [
    {
      label: "Call Us",
      value: "+971 4 393 0507",
      href: "tel:+97143930507",
      action: "Call Now",
      iconType: "phone",
    },
    {
      label: "WhatsApp",
      value: "+971 54 308 8655",
      href: "https://wa.me/971543088655",
      action: "Chat Now",
      iconType: "whatsapp",
    },
    {
      label: "Email Us",
      value: "info@simalme.com",
      href: "mailto:info@simalme.com",
      action: "Send Email",
      iconType: "email",
    },
  ],
  contactFormTitle: "Send Us a Message",
  officeTitle: "Dubai Head Office",
  officeAddress: "Dubai Silicon Oasis, DDP Building A, Office 706, Dubai, UAE",
  officeHours:
    "Mon – Thu: 9:00 AM – 6:00 PM (GST)\nSun: 9:00 AM – 6:00 PM (GST)\nFri – Sat: Closed",
  departments: [
    {
      title: "Sales & Distribution",
      description: "Submit a sales inquiry or email sales@simalme.com",
      linkLabel: "Submit a sales inquiry",
      linkHref: "/contact",
      email: "sales@simalme.com",
    },
    {
      title: "Technical Support",
      description: "Open a support ticket or call +971 4 393 0507",
      linkLabel: "Open a support ticket",
      linkHref: "/contact",
      email: "",
    },
    {
      title: "Partnership Opportunities",
      description: "Learn about partnerships or email partnerships@simalme.com",
      linkLabel: "Learn about partnerships",
      linkHref: "/partners",
      email: "partnerships@simalme.com",
    },
  ],
  viewAllOfficesLabel: "View All Offices →",
  viewAllOfficesLink: "/contact",
};

// ============================================================
// 4. Brands Page Global
// ============================================================
const BRANDS_PAGE_DATA = {
  hero: {
    headline: "Authorized Distribution — Global Brands",
    description:
      "Simal Technologies Middle East is the authorized distributor for over 20 world-class IT brands across the Middle East, Africa, CIS, and GCC regions.",
    headingSize: "text-2xl",
    descriptionSize: "text-lg",
    primaryButtonLabel: "Browse Product Catalog",
    primaryButtonHref: "/hardware/product-catalog",
    primaryButtonColor: "default",
    secondaryButtonLabel: "Contact Sales",
    secondaryButtonHref: "/contact",
    secondaryButtonStyle: "outline-light",
  },
  brandDirectory: {
    badge: "Brand Portfolio",
    heading: "Our Authorized Brand Partners",
    description:
      "Partnering with the world's leading technology manufacturers to bring enterprise-grade products to the Middle East, Africa, and CIS regions.",
  },
  authorizedSection: {
    badge: "Trust & Authenticity",
    heading: "What Authorized Means",
    description:
      "Every product ships with full manufacturer backing — not gray-market promises.",
  },
  authorizedFeatures: [
    {
      iconType: "shield-check",
      title: "100% Genuine Products",
      desc: "Direct from manufacturer — zero counterfeit risk. Every product carries full authenticity guarantee.",
      gradientColor: "blue-to-cyan",
    },
    {
      iconType: "award",
      title: "Full Manufacturer Warranty",
      desc: "Backed by brand warranty, not third-party. Direct RMA processing and warranty claims.",
      gradientColor: "pink-to-light",
    },
    {
      iconType: "headphones",
      title: "Technical Support",
      desc: "Direct access to manufacturer-trained experts. Pre-sales consultation and post-sales assistance.",
      gradientColor: "cyan-to-blue",
    },
    {
      iconType: "zap",
      title: "Firmware & Updates",
      desc: "Eligible for all official software and firmware updates. Stay current with latest releases.",
      gradientColor: "light-to-pink",
    },
    {
      iconType: "shopping-cart",
      title: "B2B Pricing",
      desc: "Volume pricing directly from authorized channels. Competitive trade rates for resellers.",
      gradientColor: "tan-to-cyan",
    },
    {
      iconType: "building-2",
      title: "After-Sales Service",
      desc: "Manufacturer-backed service and RMA support. Dedicated account managers for enterprise.",
      gradientColor: "blue-to-pink",
    },
  ],
  categoriesSection: {
    badge: "Browse by Category",
    heading: "Brand Categories",
    description: "Explore our portfolio organized by product category.",
  },
  partnershipsSection: {
    badge: "Awards & Recognition",
    heading: "Strategic Partnerships",
    description:
      "Recognized by our partners for outstanding distribution performance.",
  },
  awards: [
    {
      title: "HIKSEMi Best Distribution Partner 2025",
      subtitle: "MEA National Distributor Summit",
      desc: "Awarded at the 2025 HIKSEMi MEA National Distributor Summit — recognition of our outstanding distribution performance across the Middle East and Africa.",
    },
    {
      title: "HikVision Best Distributor Partner",
      subtitle: "Top-Performing Partner",
      desc: "Recognized as a top-performing distribution partner for HikVision, one of the world's leading security and storage brands.",
    },
  ],
  cta: {
    badge: "Partnership Opportunities",
    heading: "Interested in Partnering With Us?",
    description:
      "Contact our partnership team to distribute your brand in the Middle East, Africa, CIS, and GCC regions.",
    headingSize: "text-3xl",
    descriptionSize: "text-lg",
    primaryButtonLabel: "Email Partnership Team",
    primaryButtonHref: "mailto:info@simalme.com",
    primaryButtonColor: "pink-gradient",
    secondaryButtonLabel: "WhatsApp +971 54 308 8655",
    secondaryButtonHref: "https://wa.me/971543088655",
    secondaryButtonStyle: "outline-dark",
  },
};

// ─── Main ────────────────────────────────────────────────────────────

async function seedGlobals() {
  const force = process.argv.includes("--force");
  if (process.env.NODE_ENV === "production" && !force) {
    console.error(
      "[seed] Refusing to seed in production. Re-run with --force to override.",
    );
    process.exit(1);
  }

  console.log("\n🚀 Seeding page content globals...\n");
  console.log("=".repeat(60) + "\n");

  const payload = await getPayload({ config });

  // ── Phase 1: About Page Global ──
  console.log("\n📋 Phase 1: About Page Global");
  try {
    await payload.updateGlobal({
      slug: "about-page",
      data: ABOUT_PAGE_DATA as never,
    });
    log("about-page", "✓ Seeded");
  } catch (e: unknown) {
    console.error(
      "  ✗",
      e instanceof Error ? e.message.slice(0, 200) : String(e),
    );
  }

  // ── Phase 1.5: Header Global ──
  console.log("\n📋 Phase 1.5: Header Global");
  try {
    await payload.updateGlobal({
      slug: "header",
      data: {
        utilityBar: {
          phone: "+971 4 393 0507",
          email: "info@simalme.com",
          whatsapp: "+971 54 308 8655",
          showLanguageSwitcher: true,
          showWhatsapp: true,
          showSocialLinks: true,
          socialLinks: [
            {
              platform: "linkedin",
              url: "https://www.linkedin.com/company/simal-technologies-middle-east-llc/",
            },
            {
              platform: "instagram",
              url: "https://www.instagram.com/simaltechnologiesuae/",
            },
            {
              platform: "facebook",
              url: "https://www.facebook.com/SimalTechnologiesMiddleEast",
            },
            {
              platform: "youtube",
              url: "https://www.youtube.com/@simaltechnologies",
            },
          ],
        },
        ctaButton: {
          label: "B2B Portal",
          href: "/portal",
          show: true,
        },
        navItems: [
          // ── 1. Products (mega menu) ──
          {
            label: "Products",
            link: "/products",
            status: "published",
            hasDropdown: true,
            dropdownVariant: "mega",
            children: [
              {
                label: "Computer Components",
                link: "/products/computer-components",
                description: "SSDs, RAM, graphics cards & motherboards",
                status: "published",
              },
              {
                label: "Computer Accessories",
                link: "/products/computer-accessories",
                description: "Hubs, cables, docks & surge protectors",
                status: "published",
              },
              {
                label: "Monitors",
                link: "/products/monitors",
                description: "Gaming, professional & ultrawide displays",
                status: "published",
              },
              {
                label: "Gaming",
                link: "/products/gaming",
                description: "GPUs, gaming monitors & high-speed SSDs",
                status: "published",
              },
              {
                label: "Laptops",
                link: "/products/laptops",
                description: "Business, premium & versatile notebooks",
                status: "published",
              },
              {
                label: "Browse by Brand",
                link: "/brands",
                description: "21 authorized brands — Crucial, HIKVISION, UGREEN & more",
                status: "published",
              },
              {
                label: "Product Comparison",
                link: "/products/compare",
                description: "Compare specs, features & pricing side by side",
                status: "published",
              },
              {
                label: "Request a Quote",
                link: "/contact?topic=rfq",
                description: "Get a customized quotation within 24 hours",
                status: "published",
              },
            ],
          },
          // ── 2. Solutions (mega menu: IT services + ERP) ──
          {
            label: "Solutions",
            link: "/solutions",
            status: "published",
            hasDropdown: true,
            dropdownVariant: "mega",
            children: [
              {
                label: "AMC",
                link: "/solutions/amc",
                description: "Annual maintenance contracts for IT infrastructure",
                status: "published",
              },
              {
                label: "AV & Meeting Room",
                link: "/solutions/av-meeting-room",
                description: "Conference & collaboration solutions",
                status: "published",
              },
              {
                label: "Cloud Security",
                link: "/solutions/cloud-security",
                description: "Threat detection, IAM & compliance management",
                status: "published",
              },
              {
                label: "Data Recovery & Storage",
                link: "/solutions/data-recovery-storage",
                description: "NAS, SAN, backup & recovery services",
                status: "published",
              },
              {
                label: "Firewall Solutions",
                link: "/solutions/firewall",
                description: "Next-gen firewall with 24/7 monitoring",
                status: "published",
              },
              {
                label: "UniERP Overview",
                link: "/erp/overview",
                description: "Full-range ERP built on Odoo 19 Community",
                status: "published",
              },
              {
                label: "Finance & Accounting",
                link: "/erp/modules/finance-accounting",
                description: "GL, AR/AP, UniVAT — NBR approved",
                status: "published",
              },
              {
                label: "HR & Payroll",
                link: "/erp/modules/hr-payroll",
                description: "Employee lifecycle, attendance & payroll",
                status: "published",
              },
              {
                label: "Sales & CRM",
                link: "/erp/modules/sales-crm",
                description: "Pipeline, quotations & customer 360",
                status: "published",
              },
              {
                label: "Inventory & Supply Chain",
                link: "/erp/modules/inventory-supply-chain",
                description: "Warehouse, procurement & barcode scanning",
                status: "published",
              },
              {
                label: "Manufacturing",
                link: "/erp/modules/manufacturing",
                description: "Production planning, BOM & MRP",
                status: "published",
              },
              {
                label: "Project Management",
                link: "/erp/modules/project-management",
                description: "Planning, Gantt charts & profitability",
                status: "published",
              },
              {
                label: "Retail & Distribution",
                link: "/erp/industries/retail-distribution",
                description: "POS, eCommerce & loyalty",
                status: "published",
              },
              {
                label: "Healthcare",
                link: "/erp/industries/healthcare",
                description: "Patient records, billing & lab management",
                status: "published",
              },
              {
                label: "Education",
                link: "/erp/industries/education",
                description: "Student management, academics & fees",
                status: "published",
              },
              {
                label: "Government",
                link: "/erp/industries/government",
                description: "Tender management & compliance",
                status: "published",
              },
              {
                label: "Request a Demo",
                link: "/erp/demo-request",
                description: "Schedule a free personalized demo",
                status: "published",
              },
              {
                label: "ROI Calculator",
                link: "/erp/roi-calculator",
                description: "Estimate your ERP cost savings",
                status: "published",
              },
            ],
          },
          // ── 3. Resources (simple dropdown) ──
          {
            label: "Resources",
            link: "/resources/blog",
            status: "published",
            hasDropdown: true,
            dropdownVariant: "simple",
            children: [
              {
                label: "Blog & News",
                link: "/resources/blog",
                description: "Articles, product updates & company news",
                status: "published",
              },
              {
                label: "Case Studies",
                link: "/resources/case-studies",
                description: "Customer success stories & deployments",
                status: "published",
              },
              {
                label: "White Papers",
                link: "/resources/white-papers",
                description: "In-depth technical & strategy papers",
                status: "published",
              },
              {
                label: "FAQ",
                link: "/resources/faq",
                description: "Answers to common questions",
                status: "published",
              },
              {
                label: "Downloads & Datasheets",
                link: "/resources/downloads",
                description: "PDF specifications & documentation",
                status: "published",
              },
            ],
          },
          // ── 4. About (simple dropdown) ──
          {
            label: "About",
            link: "/about",
            status: "published",
            hasDropdown: true,
            dropdownVariant: "simple",
            children: [
              {
                label: "Company Overview",
                link: "/about",
                description: "20+ years of IT distribution excellence",
                status: "published",
              },
              {
                label: "Leadership Team",
                link: "/about/leadership",
                description: "Meet the people behind Simal",
                status: "published",
              },
              {
                label: "Mission, Vision & Values",
                link: "/about/mission-vision",
                description: "What drives us every day",
                status: "published",
              },
              {
                label: "Awards & Achievements",
                link: "/about/awards",
                description: "Industry recognition & milestones",
                status: "published",
              },
              {
                label: "Partners",
                link: "/partners",
                description: "Become a reseller or technology partner",
                status: "published",
              },
              {
                label: "Careers",
                link: "/careers",
                description: "Join our team across UAE & Bangladesh",
                status: "published",
              },
              {
                label: "CSR & Sustainability",
                link: "/about/csr",
                description: "Our commitment to community & environment",
                status: "published",
              },
            ],
          },
        ],
      } as never,
    });
    log("header", "✓ Seeded");
  } catch (e: unknown) {
    console.error(
      "  ✗",
      e instanceof Error ? e.message.slice(0, 200) : String(e),
    );
  }

  // ── Phase 2: IT Distribution Page Global ──
  console.log("\n📋 Phase 2: IT Distribution Page Global");
  try {
    await payload.updateGlobal({
      slug: "it-dp",
      data: IT_DISTRIBUTION_PAGE_DATA as never,
    });
    log("it-dp", "✓ Seeded");
  } catch (e: unknown) {
    console.error(
      "  ✗",
      e instanceof Error ? e.message.slice(0, 200) : String(e),
    );
  }

  // ── Phase 3: Contact Page Global ──
  console.log("\n📋 Phase 3: Contact Page Global");
  try {
    await payload.updateGlobal({
      slug: "contact-page",
      data: CONTACT_PAGE_DATA as never,
    });
    log("contact-page", "✓ Seeded");
  } catch (e: unknown) {
    console.error(
      "  ✗",
      e instanceof Error ? e.message.slice(0, 200) : String(e),
    );
  }

  // ── Phase 4: Brands Page Global ──
  console.log("\n📋 Phase 4: Brands Page Global");
  try {
    await payload.updateGlobal({
      slug: "brands-page",
      data: BRANDS_PAGE_DATA as never,
    });
    log("brands-page", "✓ Seeded");
  } catch (e: unknown) {
    console.error(
      "  ✗",
      e instanceof Error ? e.message.slice(0, 200) : String(e),
    );
  }

  // ── Phase 5: IT Distribution Sub-Page Globals ──
  console.log("\n📋 Phase 5: IT Distribution Sub-Page Globals");

  // Authorized Brands
  try {
    await payload.updateGlobal({
      slug: "authorized-brands-page",
      data: {
        hero: {
          headline: "Authorized Distribution — Guaranteed Authenticity",
          subHeadline:
            "Unlike gray-market resellers, Simal Technologies is the officially authorized distributor for every brand in our portfolio. Every product that ships from our warehouse carries full manufacturer warranty, dedicated support, and the assurance of authenticity.",
        },
        authorizedBrands: IT_DISTRIBUTION_PAGE_DATA.authorizedBrands,
        cta: {
          headline: "Interested in Becoming a Partner?",
          description:
            "We are always looking for new reseller and distribution partners across the Middle East, Africa, CIS, and GCC.",
        },
      } as never,
    });
    log("authorized-brands-page", "✓ Seeded");
  } catch (e: unknown) {
    console.error(
      "  ✗",
      e instanceof Error ? e.message.slice(0, 200) : String(e),
    );
  }

  // Distribution Channels
  try {
    await payload.updateGlobal({
      slug: "distribution-channels-page",
      data: {
        hero: {
          headline: "Distribution Channels",
          subHeadline:
            "Simal Technologies operates across multiple distribution channels, serving enterprises, resellers, system integrators, and government entities across the Middle East, Africa, CIS, and GCC.",
        },
        b2bChannels: [
          {
            label: "System Integrators (SIs)",
            description: "End-to-end IT infrastructure projects",
          },
          {
            label: "Value-Added Resellers (VARs)",
            description: "Specialized solutions with pre/post-sales support",
          },
          {
            label: "Corporate Enterprises",
            description: "Bulk procurement for internal IT operations",
          },
          {
            label: "Government & Public Sector (B2G)",
            description: "Tender-based procurement and large-scale deployments",
          },
          {
            label: "Consultants & Contractors",
            description: "Project-specific component sourcing",
          },
        ],
        ecommerceChannels: [
          {
            label: "Online Marketplaces",
            description: "Amazon UAE, Sharaf DG, Microless",
          },
          {
            label: "Retail Partners",
            description: "Electronics stores and IT retail chains",
          },
          {
            label: "Direct Sales",
            description: "Registered business customers with trade pricing",
          },
        ],
        geographicCoverage: IT_DISTRIBUTION_PAGE_DATA.geographicCoverage,
        cta: {
          headline: "Ready to Partner With Us?",
          description:
            "Whether you are a system integrator, reseller, or enterprise buyer, we have the right channel for you.",
        },
      } as never,
    });
    log("distribution-channels-page", "✓ Seeded");
  } catch (e: unknown) {
    console.error(
      "  ✗",
      e instanceof Error ? e.message.slice(0, 200) : String(e),
    );
  }

  // Product Catalog
  try {
    await payload.updateGlobal({
      slug: "product-catalog-page",
      data: {
        hero: {
          headline: "Product Catalog",
          subHeadline:
            "Browse our complete catalog of 76+ authentic IT products sourced directly from manufacturers with full warranty.",
        },
        gallerySection: {
          headline: "",
          description: "",
          images: [],
        },
        cta: {
          headline: "Need Help Finding a Product?",
          description:
            "Contact our product specialists for recommendations, bulk pricing, or custom solutions.",
        },
      } as never,
    });
    log("product-catalog-page", "✓ Seeded");
  } catch (e: unknown) {
    console.error(
      "  ✗",
      e instanceof Error ? e.message.slice(0, 200) : String(e),
    );
  }

  // Computer Components
  try {
    await payload.updateGlobal({
      slug: "computer-components-page",
      data: {
        hero: {
          headline: "Computer Components",
          description:
            "Browse our complete range of <strong>authentic computer components</strong> from leading brands. SSDs, RAM, graphics cards, and storage — sourced directly from authorized manufacturers with full warranty.",
        },
        relatedLinks:
          'Related Categories: <a href="/hardware/product-catalog" class="underline hover:text-white">Full Product Catalog</a> | <a href="/hardware/computer-accessories" class="underline hover:text-white">Computer Accessories</a> | <a href="/hardware/monitors" class="underline hover:text-white">Monitors</a> | <a href="/hardware/gaming" class="underline hover:text-white">Gaming</a> | <a href="/hardware/laptops" class="underline hover:text-white">Laptops</a>',
      } as never,
    });
    log("computer-components-page", "✓ Seeded");
  } catch (e: unknown) {
    console.error(
      "  ✗",
      e instanceof Error ? e.message.slice(0, 200) : String(e),
    );
  }

  // Computer Accessories
  try {
    await payload.updateGlobal({
      slug: "computer-accessories-page",
      data: {
        hero: {
          headline: "Computer Accessories",
          description:
            "Browse our complete range of <strong>authentic computer accessories</strong> from leading brands. USB-C hubs, docking stations, cables, surge protectors, and extension cords — sourced directly from authorized manufacturers with full warranty.",
        },
        relatedLinks:
          'Related Categories: <a href="/hardware/product-catalog" class="underline hover:text-white">Full Product Catalog</a> | <a href="/hardware/computer-components" class="underline hover:text-white">Computer Components</a> | <a href="/hardware/monitors" class="underline hover:text-white">Monitors</a> | <a href="/hardware/gaming" class="underline hover:text-white">Gaming</a> | <a href="/hardware/laptops" class="underline hover:text-white">Laptops</a>',
      } as never,
    });
    log("computer-accessories-page", "✓ Seeded");
  } catch (e: unknown) {
    console.error(
      "  ✗",
      e instanceof Error ? e.message.slice(0, 200) : String(e),
    );
  }

  // Monitors
  try {
    await payload.updateGlobal({
      slug: "monitors-page",
      data: {
        hero: {
          headline: "Monitors",
          description:
            "Browse our complete range of <strong>authentic monitors</strong> from leading brands. Gaming, professional, and everyday productivity displays — sourced directly from authorized manufacturers with full warranty.",
        },
        relatedLinks:
          'Related Categories: <a href="/hardware/product-catalog" class="underline hover:text-white">Full Product Catalog</a> | <a href="/hardware/computer-components" class="underline hover:text-white">Computer Components</a> | <a href="/hardware/computer-accessories" class="underline hover:text-white">Computer Accessories</a> | <a href="/hardware/gaming" class="underline hover:text-white">Gaming</a> | <a href="/hardware/laptops" class="underline hover:text-white">Laptops</a>',
      } as never,
    });
    log("monitors-page", "✓ Seeded");
  } catch (e: unknown) {
    console.error(
      "  ✗",
      e instanceof Error ? e.message.slice(0, 200) : String(e),
    );
  }

  // Gaming
  try {
    await payload.updateGlobal({
      slug: "gaming-page",
      data: {
        hero: {
          headline: "Gaming",
          description:
            "Browse our complete range of <strong>authentic gaming products</strong> from leading brands. Gaming GPUs, monitors, motherboards, and high-speed storage — sourced directly from authorized manufacturers with full warranty.",
        },
        relatedLinks:
          'Related Categories: <a href="/hardware/product-catalog" class="underline hover:text-white">Full Product Catalog</a> | <a href="/hardware/computer-components" class="underline hover:text-white">Computer Components</a> | <a href="/hardware/monitors" class="underline hover:text-white">Monitors</a> | <a href="/hardware/computer-accessories" class="underline hover:text-white">Computer Accessories</a> | <a href="/hardware/laptops" class="underline hover:text-white">Laptops</a>',
      } as never,
    });
    log("gaming-page", "✓ Seeded");
  } catch (e: unknown) {
    console.error(
      "  ✗",
      e instanceof Error ? e.message.slice(0, 200) : String(e),
    );
  }

  // Laptops
  try {
    await payload.updateGlobal({
      slug: "laptops-page",
      data: {
        hero: {
          headline: "Laptops",
          description:
            "Browse our complete range of <strong>authentic laptops</strong> from leading brands. Enterprise and professional laptops from Dell, HP, and Lenovo — sourced directly from authorized manufacturers with full warranty.",
        },
        relatedLinks:
          'Related Categories: <a href="/hardware/product-catalog" class="underline hover:text-white">Full Product Catalog</a> | <a href="/hardware/computer-components" class="underline hover:text-white">Computer Components</a> | <a href="/hardware/monitors" class="underline hover:text-white">Monitors</a> | <a href="/hardware/computer-accessories" class="underline hover:text-white">Computer Accessories</a> | <a href="/hardware/gaming" class="underline hover:text-white">Gaming</a>',
      } as never,
    });
    log("laptops-page", "✓ Seeded");
  } catch (e: unknown) {
    console.error(
      "  ✗",
      e instanceof Error ? e.message.slice(0, 200) : String(e),
    );
  }

  // Quality Assurance
  try {
    await payload.updateGlobal({
      slug: "quality-assurance-page",
      data: {
        hero: {
          headline: "Quality Assurance & Warranty",
          subHeadline:
            "Every product distributed by Simal Technologies undergoes rigorous quality assurance processes to guarantee authenticity and reliability.",
        },
        qualityAssurance: IT_DISTRIBUTION_PAGE_DATA.qualityAssurance,
        cta: {
          headline: "Need Product Verification?",
          description:
            "Contact our quality assurance team for product authenticity verification or warranty claims.",
        },
      } as never,
    });
    log("quality-assurance-page", "✓ Seeded");
  } catch (e: unknown) {
    console.error(
      "  ✗",
      e instanceof Error ? e.message.slice(0, 200) : String(e),
    );
  }

  // Retail Presence
  try {
    await payload.updateGlobal({
      slug: "retail-presence-page",
      data: {
        hero: {
          headline: "Retail Presence",
          subHeadline:
            "Stellent Technologies ME LLC (Bur Dubai) operates as our retail storefront, providing direct customer access to our full product range.",
        },
        retail: {
          title: "Retail Presence",
          description:
            "<strong>Stellent Technologies ME LLC</strong> (Bur Dubai) operates as our retail storefront, providing:",
          features: [
            { feature: "Walk-in customer service and product demonstrations" },
            { feature: "Pickup point for online orders" },
            { feature: "Technical consultation and product recommendations" },
          ],
        },
        cta: {
          headline: "Visit Our Store",
          description:
            "Come see our products in person. Our team is ready to help with product demonstrations and technical consultations.",
        },
      } as never,
    });
    log("retail-presence-page", "✓ Seeded");
  } catch (e: unknown) {
    console.error(
      "  ✗",
      e instanceof Error ? e.message.slice(0, 200) : String(e),
    );
  }

  // Warehouse Logistics
  try {
    await payload.updateGlobal({
      slug: "warehouse-logistics-page",
      data: {
        hero: {
          headline: "Warehouse & Logistics",
          subHeadline:
            "Through our associated company StarSeed Technologies ME FZE (Jebel Ali Free Zone, UAE), we maintain state-of-the-art warehousing and logistics capabilities.",
        },
        warehouse: {
          title: "Warehouse & Logistics",
          description:
            "Through our associated company <strong>StarSeed Technologies ME FZE</strong> (Jebel Ali Free Zone, UAE), we maintain:",
          features: [
            {
              feature:
                "Climate-controlled warehousing for sensitive components",
            },
            { feature: "Real-time inventory management with stock visibility" },
            {
              feature: "Same-day dispatch for orders placed before 2:00 PM GST",
            },
            {
              feature:
                "Insured shipping with tracking across all served regions",
            },
            {
              feature:
                "Dedicated logistics team handling customs clearance and documentation",
            },
          ],
        },
        cta: {
          headline: "Need Logistics Support?",
          description:
            "Contact our logistics team for shipping inquiries, customs clearance, and bulk order fulfillment.",
        },
      } as never,
    });
    log("warehouse-logistics-page", "✓ Seeded");
  } catch (e: unknown) {
    console.error(
      "  ✗",
      e instanceof Error ? e.message.slice(0, 200) : String(e),
    );
  }

  // ── Phase 6: IT Distribution Hero Background Images ──
  // Seeds the `heroBackgroundImage` field added to the IT-distribution globals.
  // Uses the website's current hero image (hello.avif) and links it as a
  // partial update — existing text content on each global is left untouched.
  console.log("\n📋 Phase 6: IT Distribution Hero Background Images");
  const HERO_GLOBALS = [
    "it-dp",
    "laptops-page",
    "monitors-page",
    "gaming-page",
    "computer-accessories-page",
    "computer-components-page",
  ];
  try {
    const heroImageId = await uploadFile(
      payload,
      "/assets/images/homepage/hello.avif",
      "IT Distribution hero background",
    );
    if (heroImageId) {
      for (const slug of HERO_GLOBALS) {
        try {
          await payload.updateGlobal({
            slug: slug as never,
            data: { heroBackgroundImage: heroImageId } as never,
          });
          log(slug, `✓ hero image → media #${heroImageId}`);
        } catch (e: unknown) {
          console.error(
            `  ✗ ${slug}: ${e instanceof Error ? e.message.slice(0, 200) : String(e)}`,
          );
        }
      }
    } else {
      console.log("  ⊘ hello.avif not found — skipping hero image seeding");
    }
  } catch (e: unknown) {
    console.error(
      "  ✗ hero image phase:",
      e instanceof Error ? e.message.slice(0, 200) : String(e),
    );
  }

  await payload.destroy();

  console.log("\n" + "=".repeat(60));
  console.log("✅ All globals seeded!");
  console.log("=".repeat(60) + "\n");
}

seedGlobals().catch((err) => {
  console.error("Fatal seed error:", err);
  process.exit(1);
});
