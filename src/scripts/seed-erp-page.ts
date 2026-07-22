/**
 * Seed script for the ERP Platform global (UniERP overview page).
 *
 * Populates the erp-page global with all sections: hero, overview,
 * partnership, technology, differentiators, core modules, industries,
 * implementation, pricing, case studies, testimonials, CTA, and SEO.
 *
 * Usage: npx tsx src/scripts/seed-erp-page.ts
 */

import "dotenv/config";
import { getPayload } from "payload";
import config from "../../payload.config";

/* ------------------------------------------------------------------
   Lexical rich text helpers
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
   Seed Data
   ------------------------------------------------------------------ */

const ERP_PAGE_DATA = {
  heroBackgroundImage: undefined as number | undefined,
  hero: {
    headline:
      "Transform Your Business with UniERP — The Complete Enterprise Platform",
    subHeadline:
      "A comprehensive, modular ERP solution built on Odoo 19 Community Edition, delivered through a proven Simal–UniSoft partnership. From finance to manufacturing, get the tools your business needs to operate smarter, faster, and more profitably.",
    ctaLabel: "Request a Demo",
    ctaLink: "/contact",
    secondaryCtaLabel: "Calculate Your ROI",
    secondaryCtaLink: "/erp/roi-calculator",
  },

  overviewEyebrow: "Platform Overview",
  overviewHeading: "One Platform. Endless Possibilities.",
  overviewDescription: richDoc([
    {
      h2: "UniERP — Enterprise Resource Planning Reimagined",
    },
    {
      p: "UniERP is a next-generation enterprise resource planning platform built on Odoo 19 Community Edition, the world's leading open-source business software. It brings together finance, HR, sales, inventory, manufacturing, and project management into a single, unified system — eliminating data silos and giving your leadership team real-time visibility across every department.",
    },
    {
      p: "Unlike traditional ERP systems that require massive upfront investments and years-long deployments, UniERP is modular, fast to implement, and scales with your business. Start with the modules you need today and add more as you grow.",
    },
    {
      h3: "Why Businesses Choose UniERP",
    },
    {
      p: "Cost-effective — significantly lower TCO than SAP, Oracle, or Microsoft Dynamics. Localized — built for UAE and GCC regulatory requirements including VAT (UniVAT is NBR-approved). Modular — implement what you need, when you need it. Supported — dedicated local support from Simal Technologies and technical excellence from UniSoft's 40+ engineering team.",
    },
  ]),
  keyStats: [
    { value: "150+", label: "Projects Delivered" },
    { value: "40+", label: "Engineers" },
    { value: "98%", label: "On-Time Delivery" },
    { value: "8+", label: "Industry Verticals" },
  ],

  comparisonEyebrow: "The UniERP Advantage",
  comparisonHeading: "Built on Odoo 19 CE — No License Fees",
  comparisonDescription:
    "Unlike proprietary ERP systems that charge $50–$500 per user per month, UniERP is built on Odoo 19 Community Edition — the free, open-source ERP platform. You get enterprise-grade functionality without the enterprise-grade licensing costs.",
  comparisonColumns: [
    { name: "Traditional ERP (SAP/Oracle)" },
    { name: "Microsoft Dynamics" },
    { name: "UniERP (Odoo 19 CE)" },
  ],
  comparisonRows: [
    {
      feature: "License Cost Per User/Month",
      valueA: "$100–$500",
      valueB: "$70–$200",
      valueC: "$0",
    },
    {
      feature: "Implementation Time",
      valueA: "6–18 months",
      valueB: "4–12 months",
      valueC: "4–12 weeks",
    },
    {
      feature: "Customization",
      valueA: "Complex, expensive",
      valueB: "Possible, costly",
      valueC: "Flexible, affordable",
    },
    {
      feature: "Source Code Access",
      valueA: "No",
      valueB: "No",
      valueC: "Yes (open source)",
    },
    {
      feature: "Local VAT Compliance",
      valueA: "Needs custom build",
      valueB: "Needs custom build",
      valueC: "UniVAT — NBR Approved",
    },
    {
      feature: "Annual Maintenance",
      valueA: "18–22% of license",
      valueB: "16–20% of license",
      valueC: "Pay for what you use",
    },
  ],

  partnershipEyebrow: "Partnership",
  partnershipHeading: "Simal + UniSoft: A Powerful Combination",
  partnershipDescription: richDoc([
    {
      h2: "How the Partnership Works",
    },
    {
      p: "Simal Technologies Middle East LLC serves as the customer-facing entity — handling sales, pre-sales consulting, requirements gathering, and ongoing account management. Our team works closely with your stakeholders to understand your business processes, pain points, and goals, then translates those requirements into a tailored UniERP configuration.",
    },
    {
      p: "UniSoft, founded in 2015, is the software engineering powerhouse behind UniERP. With 40+ engineers and a track record of 150+ successful projects, UniSoft handles all software development, ERP implementation, customization, data migration, and technical support. Their team brings deep expertise in Odoo, Python, PostgreSQL, and enterprise integration patterns.",
    },
    {
      p: "This partnership model ensures you get the best of both worlds: a local, responsive partner who understands your business context (Simal), backed by a seasoned technical team that delivers on time and on budget (UniSoft).",
    },
  ]),
  partnershipHighlights: [
    {
      icon: "Building",
      title: "Local Presence",
      description:
        "Simal is headquartered in Dubai, UAE, with deep understanding of regional business practices and regulatory requirements across the GCC.",
    },
    {
      icon: "Users",
      title: "40+ Engineers",
      description:
        "UniSoft's dedicated engineering team brings expertise across Odoo, Python, PostgreSQL, React, and enterprise system integration.",
    },
    {
      icon: "Shield",
      title: "98% On-Time Delivery",
      description:
        "Proven track record of delivering ERP projects on schedule with comprehensive testing, training, and go-live support.",
    },
    {
      icon: "Target",
      title: "End-to-End Ownership",
      description:
        "Simal manages the relationship; UniSoft manages the technology. You get one cohesive experience from discovery through post-go-live support.",
    },
  ],

  technologyEyebrow: "Technology Foundation",
  technologyHeading: "Built on World-Class Open Source Technology",
  technologyDescription: richDoc([
    {
      h2: "Odoo 19 Community Edition",
    },
    {
      p: "UniERP is built on Odoo 19 Community Edition, the latest version of the world's most popular open-source business application platform. Odoo provides a modern, modular architecture with a rich ecosystem of integrated business apps covering every operational need.",
    },
    {
      p: "The Community Edition provides the robust, stable core that UniSoft extends with custom modules, localizations, and integrations tailored to Middle East and African business requirements. This approach combines the reliability and continuous improvement of a globally-adopted open-source platform with the flexibility of custom development where it matters most.",
    },
    {
      p: "The technology stack includes PostgreSQL for the database, Python for backend services, React/OWL for the frontend, and REST APIs for integration with third-party systems. The entire platform can be deployed on-premise, in the cloud (AWS, Azure, GCP), or as a hybrid setup depending on your security and compliance requirements.",
    },
  ]),
  techStack: [
    {
      name: "Odoo 19 CE",
      description:
        "Latest version of the world's leading open-source ERP platform with modern UI and enhanced performance.",
      icon: "Server",
    },
    {
      name: "PostgreSQL",
      description:
        "Enterprise-grade relational database with robust ACID compliance, replication, and scaling capabilities.",
      icon: "Database",
    },
    {
      name: "Cloud-Native",
      description:
        "Deploy on AWS, Azure, GCP, or on-premise. Containerized architecture with Docker and Kubernetes support.",
      icon: "Cloud",
    },
    {
      name: "REST API",
      description:
        "Comprehensive REST APIs for integration with payment gateways, e-commerce platforms, BI tools, and legacy systems.",
      icon: "Code",
    },
  ],

  audienceEyebrow: "Target Audience",
  audienceHeading: "Who Is UniERP For?",
  audienceDescription:
    "UniERP is designed for organizations that need enterprise-grade business management without the cost, complexity, and vendor lock-in of traditional ERP systems.",
  audience: [
    {
      icon: "Building",
      title: "Growing SMEs",
      description:
        "Businesses that have outgrown spreadsheets and need a proper ERP — without SAP/Oracle budgets or multi-year implementations.",
    },
    {
      icon: "Briefcase",
      title: "Mid-Market Companies",
      description:
        "Organizations seeking a flexible, customizable ERP with no vendor lock-in and full access to source code.",
    },
    {
      icon: "Globe",
      title: "Multi-Entity Businesses",
      description:
        "Companies with multiple branches or subsidiaries needing consolidated financials across locations and currencies.",
    },
    {
      icon: "Landmark",
      title: "Trading with Bangladesh",
      description:
        "Businesses operating in or trading with Bangladesh that require NBR-approved VAT compliance via UniVAT — one of only 5 such certified systems.",
    },
    {
      icon: "Users",
      title: "UAE & GCC Organizations",
      description:
        "Companies needing localized payroll (UAE labor law), VAT-compliant invoicing (FTA standards), and bilingual English/Arabic interfaces.",
    },
    {
      icon: "Shield",
      title: "NGOs & Government",
      description:
        "Agencies looking for cost-effective, auditable systems with role-based access, full traceability, and compliance reporting.",
    },
  ],

  differentiatorsEyebrow: "Why UniERP",
  differentiatorsHeading: "What Sets UniERP Apart",
  differentiators: [
    {
      icon: "DollarSign",
      title: "Lower Total Cost of Ownership",
      description:
        "Significantly more affordable than SAP, Oracle, or Microsoft Dynamics — with no per-user licensing fees on the Community Edition core.",
    },
    {
      icon: "MapPin",
      title: "Localized for the Region",
      description:
        "GCC-specific features including VAT (UniVAT is NBR-approved), WPS payroll, UAE labor law compliance, and bilingual English/Arabic interfaces.",
    },
    {
      icon: "Rocket",
      title: "Faster Implementation",
      description:
        "Modular architecture and pre-configured templates reduce deployment time from years to months — go live in weeks for core modules.",
    },
    {
      icon: "Headphones",
      title: "Dedicated Local Support",
      description:
        "Simal's Dubai-based team provides in-person consulting, training, and support — not just a remote helpdesk.",
    },
    {
      icon: "CheckCircle",
      title: "Modular & Scalable",
      description:
        "Start with finance and HR, then add inventory, manufacturing, CRM, and more as your needs evolve. No rip-and-replace.",
    },
    {
      icon: "HeartHandshake",
      title: "Partnership Approach",
      description:
        "We invest in understanding your business, mapping your processes, and configuring UniERP to match how you actually work.",
    },
    {
      icon: "Star",
      title: "Modern User Experience",
      description:
        "Clean, intuitive interface built with OWL/React that requires minimal training. Mobile-responsive for access on any device.",
    },
    {
      icon: "BadgeCheck",
      title: "Enterprise-Grade Security",
      description:
        "Role-based access control, audit trails, encryption at rest and in transit, and regular security updates to protect your business data.",
    },
  ],

  modulesEyebrow: "Core Modules",
  modulesHeading: "Everything Your Business Needs, In One Platform",
  modulesDescription:
    "Six integrated modules cover every critical business function. Each module works standalone or seamlessly with the others — no data silos, no duplicate entry, no integration headaches.",
  coreModules: [
    {
      name: "Finance & Accounting",
      description:
        "Complete financial management with multi-currency support, VAT compliance, and real-time reporting — the backbone of your ERP system.",
      icon: "Calculator",
      features: [
        { name: "General Ledger & Chart of Accounts", description: "Full double-entry accounting with customizable account structures." },
        { name: "Accounts Receivable & Payable", description: "Track customer invoices, vendor bills, and payment aging in real time." },
        { name: "Bank Reconciliation", description: "Automated bank feed matching and reconciliation tools." },
        { name: "Financial Reporting", description: "P&L, balance sheet, cash flow statements, and custom drill-down reports." },
        { name: "Budgeting & Forecasting", description: "Create, track, and compare budgets across departments and cost centers." },
        { name: "UniVAT Integration", description: "NBR-approved VAT management with automated return filing for UAE and GCC." },
      ],
      link: "/erp/overview?module=finance",
    },
    {
      name: "HR & Payroll",
      description:
        "Manage your entire employee lifecycle — from recruitment to retirement — with UAE labor law compliance built in.",
      icon: "Users",
      features: [
        { name: "Employee Database", description: "Centralized HR records with document management and self-service portals." },
        { name: "Attendance & Leave", description: "Biometric integration, leave balances, approvals, and calendar views." },
        { name: "Payroll Processing", description: "WPS-compliant payroll with automated salary calculations and bank file generation." },
        { name: "Recruitment Management", description: "Job postings, applicant tracking, interview scheduling, and offer management." },
        { name: "Performance Appraisals", description: "Customizable review cycles with goal tracking and 360-degree feedback." },
        { name: "Training & Development", description: "Course catalog, enrollment tracking, and skills gap analysis." },
      ],
      link: "/erp/overview?module=hr",
    },
    {
      name: "Sales & CRM",
      description:
        "Convert more leads, close deals faster, and build lasting customer relationships with an integrated sales pipeline.",
      icon: "BarChart3",
      features: [
        { name: "Lead Management", description: "Capture leads from web forms, events, and referrals with automated scoring." },
        { name: "Opportunity Pipeline", description: "Visual kanban view with drag-and-drop stages and probability-weighted forecasting." },
        { name: "Quotation & Order Management", description: "Generate professional quotes, convert to sales orders, and track fulfillment." },
        { name: "Customer Database", description: "360-degree customer view with communication history, orders, and support tickets." },
        { name: "Email Integration", description: "Sync with Gmail/Outlook — send, receive, and log emails directly from UniERP." },
        { name: "Dashboards & Reports", description: "Sales performance, pipeline health, win/loss analysis, and team productivity metrics." },
      ],
      link: "/erp/overview?module=crm",
    },
    {
      name: "Inventory & Supply Chain",
      description:
        "Optimize stock levels, automate purchasing, and manage multi-location warehouses with barcode and serial number tracking.",
      icon: "Package",
      features: [
        { name: "Stock Management", description: "Real-time inventory tracking across multiple warehouses with min/max alerts." },
        { name: "Purchase Management", description: "RFQ to PO workflows with vendor price lists and approval hierarchies." },
        { name: "Warehouse Management", description: "Putaway strategies, picking rules, and bin location management." },
        { name: "Barcode Integration", description: "Scan receiving, picking, packing, and physical counts with barcode scanners." },
        { name: "Serial & Lot Tracking", description: "Full traceability from supplier receipt through to customer delivery." },
        { name: "Reorder Automation", description: "Automated purchase order generation based on stock rules and lead times." },
      ],
      link: "/erp/overview?module=inventory",
    },
    {
      name: "Manufacturing",
      description:
        "Plan production, manage bills of materials, track work orders, and control quality — all integrated with inventory and finance.",
      icon: "Factory",
      features: [
        { name: "Bill of Materials (BOM)", description: "Multi-level BOMs with routing, by-products, and version control." },
        { name: "Production Planning", description: "Master Production Schedule (MPS) with capacity planning and resource allocation." },
        { name: "Work Order Management", description: "Create, dispatch, track, and close work orders with labor and material consumption." },
        { name: "MRP", description: "Material Requirements Planning with demand forecasting and supply chain integration." },
        { name: "Quality Control", description: "In-process inspections, quality alerts, and non-conformance tracking." },
        { name: "Costing", description: "Job costing with actual vs. standard cost comparison and variance analysis." },
      ],
      link: "/erp/overview?module=manufacturing",
    },
    {
      name: "Project Management",
      description:
        "Plan projects, allocate resources, track time, and monitor profitability — all integrated with accounting and HR.",
      icon: "Clipboard",
      features: [
        { name: "Project Planning", description: "Gantt charts, milestones, task dependencies, and critical path visualization." },
        { name: "Resource Allocation", description: "Assign team members, manage workload, and resolve conflicts across projects." },
        { name: "Task Management", description: "Kanban and list views with priorities, deadlines, and subtasks." },
        { name: "Time Tracking", description: "Timesheets with task-based entries, approvals, and billing rate integration." },
        { name: "Budget Management", description: "Track planned vs. actual costs with alerts and profitability dashboards." },
        { name: "Client Portal", description: "Share project progress, documents, and milestones with clients via a secure portal." },
      ],
      link: "/erp/overview?module=project",
    },
  ],

  industriesEyebrow: "Industry Solutions",
  industriesHeading: "Tailored for Your Industry",
  industriesDescription:
    "UniERP is pre-configured for 8+ industry verticals — each with specialized modules, regulatory compliance features, and best-practice workflows built in. Whether you are in retail, manufacturing, healthcare, or government, UniERP adapts to how you work.",

  implementationEyebrow: "Implementation Process",
  implementationHeading: "Your Journey to Digital Transformation",
  implementationDescription:
    "Our proven 7-step implementation methodology ensures a smooth, predictable deployment. Most clients go live with core modules in 8-12 weeks.",
  implementationSteps: [
    {
      stepNumber: 1,
      title: "Discovery",
      description:
        "We meet your team to understand current processes, pain points, and goals. Document requirements and define the project scope.",
      icon: "Search",
      duration: "1-2 weeks",
    },
    {
      stepNumber: 2,
      title: "Planning",
      description:
        "Create a detailed project plan with milestones, resource assignments, data migration strategy, and risk mitigation.",
      icon: "Clipboard",
      duration: "1 week",
    },
    {
      stepNumber: 3,
      title: "Configuration",
      description:
        "Install and configure UniERP modules, customize workflows, set up user roles and permissions, and integrate with existing systems.",
      icon: "Settings",
      duration: "3-5 weeks",
    },
    {
      stepNumber: 4,
      title: "Testing",
      description:
        "Conduct unit testing, integration testing, and User Acceptance Testing (UAT). Validate data migration accuracy and report outputs.",
      icon: "Flask",
      duration: "1-2 weeks",
    },
    {
      stepNumber: 5,
      title: "Training",
      description:
        "Train your team on UniERP modules, workflows, and best practices. Provide user manuals and role-specific training materials.",
      icon: "GraduationCap",
      duration: "1-2 weeks",
    },
    {
      stepNumber: 6,
      title: "Go-Live",
      description:
        "Migrate final data, activate the system, and provide hyper-care support during the critical first weeks of operations.",
      icon: "Rocket",
      duration: "1 week",
    },
    {
      stepNumber: 7,
      title: "Support & Optimization",
      description:
        "Ongoing technical support, periodic system health checks, and continuous improvement recommendations to maximize your ROI.",
      icon: "Headphones",
      duration: "Ongoing",
    },
  ],

  pricingEyebrow: "Pricing",
  pricingHeading: "Flexible Plans for Every Stage of Growth",
  pricingDescription:
    "Transparent, modular pricing that scales with your business. All plans include implementation support, training, and 3 months of post-go-live support.",
  pricingTiers: [
    {
      tierName: "Starter",
      price: "Starting at AED 3,999/mo",
      description:
        "Perfect for small businesses and startups ready to move beyond spreadsheets. Includes 2 core modules of your choice.",
      features: [
        { feature: "2 core modules of your choice" },
        { feature: "Up to 10 users" },
        { feature: "Cloud hosting (UAE data center)" },
        { feature: "Standard implementation (4-6 weeks)" },
        { feature: "Email support (business hours)" },
        { feature: "Basic training for admin users" },
        { feature: "Quarterly system updates" },
      ],
      ctaLabel: "Get Started",
      ctaLink: "/contact",
      highlighted: false,
    },
    {
      tierName: "Professional",
      price: "Starting at AED 7,999/mo",
      description:
        "The most popular choice for growing businesses. Includes 4 core modules, advanced reporting, and priority support.",
      features: [
        { feature: "4 core modules of your choice" },
        { feature: "Up to 30 users" },
        { feature: "Cloud hosting with daily backups" },
        { feature: "Accelerated implementation (6-8 weeks)" },
        { feature: "Priority phone & email support" },
        { feature: "Full user training program" },
        { feature: "Monthly system updates" },
        { feature: "Custom report builder" },
        { feature: "API access for integrations" },
      ],
      ctaLabel: "Request a Quote",
      ctaLink: "/contact",
      highlighted: true,
    },
    {
      tierName: "Enterprise",
      price: "Custom pricing",
      description:
        "For organizations with complex requirements, multi-entity structures, or high user counts. Fully tailored to your needs.",
      features: [
        { feature: "All 6 core modules + custom modules" },
        { feature: "Unlimited users" },
        { feature: "On-premise or dedicated cloud hosting" },
        { feature: "Full implementation with data migration" },
        { feature: "24/7 dedicated support" },
        { feature: "Executive & end-user training" },
        { feature: "Continuous updates & enhancements" },
        { feature: "Custom integrations & API development" },
        { feature: "Dedicated account manager" },
        { feature: "SLA with guaranteed response times" },
      ],
      ctaLabel: "Contact Sales",
      ctaLink: "/contact",
      highlighted: false,
    },
  ],
  pricingDisclaimer:
    "Pricing is indicative and varies based on module selection, user count, customization requirements, and deployment model. All prices exclude VAT. Annual contracts include a 10% discount.",

  caseStudiesEyebrow: "Success Stories",
  caseStudiesHeading: "Proven Results Across Industries",
  featuredCaseStudies: [
    {
      clientName: "Al Mariffa Healthcare Group",
      industry: "Healthcare",
      background:
        "A growing healthcare network with 3 hospitals and 12 clinics across the UAE, managing 500,000+ patient records annually with disconnected legacy systems.",
      challenge:
        "Patient records were fragmented across facilities, billing was manual and error-prone, inventory of pharmaceuticals had no real-time visibility, and regulatory reporting for HAAD/DHA compliance was taking weeks to compile.",
      solution:
        "Deployed UniERP with Finance, Inventory, and a customized HMIS module. Integrated with existing PACS and LIMS systems. Automated insurance claim submissions and HAAD/DHA compliance reporting.",
      results: [
        { value: "60%", label: "Faster Billing Cycle" },
        { value: "40%", label: "Inventory Cost Reduction" },
        { value: "99.9%", label: "Data Accuracy" },
        { value: "3 Days", label: "Month-End Close" },
      ],
      testimonialQuote:
        "UniERP transformed how we manage patient care and operations. What used to take our billing team 2 weeks now takes 3 days. The real-time inventory visibility alone saved us 40% on pharmaceutical stock costs in the first year.",
      testimonialAuthor: "Dr. Ahmed Al Rashid",
      testimonialRole: "Chief Operating Officer",
    },
    {
      clientName: "Gulf Food Industries LLC",
      industry: "Manufacturing — Food Processing",
      background:
        "A mid-sized food processing company producing 200+ SKUs across 3 production lines, supplying major retailers in the UAE, KSA, and Oman.",
      challenge:
        "Production planning was done on spreadsheets with frequent stock-outs of raw materials. Batch traceability for food safety compliance was manual and time-consuming. Quality control data was siloed and hard to retrieve during audits.",
      solution:
        "Implemented UniERP Manufacturing, Inventory, and Quality Control modules with full batch tracking from raw material receipt through to finished goods dispatch. Integrated barcode scanning at all production checkpoints.",
      results: [
        { value: "35%", label: "Production Efficiency Gain" },
        { value: "100%", label: "Batch Traceability" },
        { value: "28%", label: "Waste Reduction" },
        { value: "AED 2.1M", label: "Annual Savings" },
      ],
      testimonialQuote:
        "The batch traceability alone would justify the investment. During our last ISO 22000 audit, we pulled up the complete history of any batch in seconds. Our production manager now has real-time visibility of every line and can adjust schedules before shortages happen.",
      testimonialAuthor: "Fatima Al Zaabi",
      testimonialRole: "General Manager",
    },
  ],

  testimonialsEyebrow: "Trusted By",
  testimonialsHeading: "Companies Across the Region Rely on UniERP",
  customerLogos: [
    { companyName: "Al Mariffa Healthcare" },
    { companyName: "Gulf Food Industries" },
    { companyName: "Premier Education Group" },
    { companyName: "Safeer Logistics" },
    { companyName: "Green Valley Agriculture" },
    { companyName: "Al Ahli Retail Group" },
    { companyName: "Emirates Manufacturing Co." },
    { companyName: "National Banking Services" },
  ],

  ctaEyebrow: "Get Started",
  ctaHeading: "Ready to Transform Your Business?",
  ctaDescription:
    "Speak with our ERP specialists to see how UniERP can be configured for your specific needs. No obligation — just a conversation about your challenges and goals.",
  cta: {
    phoneLabel: "Call",
    phoneNumber: "+971 4 123 4567",
    whatsappLabel: "WhatsApp",
    whatsappNumber: "+971 54 308 8655",
    emailLabel: "Email",
    emailAddress: "erp@simal.ae",
    demoLinkLabel: "Schedule a Free Demo",
    demoLinkUrl: "/contact",
  },

  meta: {
    title: "UniERP Platform — Enterprise Resource Planning | Simal Technologies",
    description:
      "Transform your business with UniERP — a comprehensive, modular ERP solution built on Odoo 19 CE. Finance, HR, CRM, inventory, manufacturing & project management. NBR-approved UniVAT. Localized for UAE & GCC.",
  },
};

/* ------------------------------------------------------------------
   Seed function
   ------------------------------------------------------------------ */

async function seed() {
  console.log("Seeding ERP platform page global...\n");

  const payload = await getPayload({ config });

  try {
    await payload.updateGlobal({
      slug: "erp-page",
      data: ERP_PAGE_DATA as never,
    });
    console.log("✓ Updated erp-page global with all sections");
  } catch (error) {
    console.error("✗ Failed to seed erp-page:", error);
    process.exit(1);
  }

  await payload.destroy();
  console.log("\nERP page seeding complete!");
  process.exit(0);
}

seed();
