/**
 * Seed script for the 6 ERP module detail pages.
 *
 * Creates/updates pages in the "pages" collection with dynamic layout
 * blocks (heroBlock, richTextBlock, highlightBlock, ctaBlock) so they
 * render via the ErpModuleRenderer instead of generic rich-text.
 *
 * Usage: npx tsx src/scripts/seed-erp-modules.ts
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

function richDoc(blocks: Array<{ h2?: string; h3?: string; p?: string }>) {
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
   ERP Module Page Definitions
   ------------------------------------------------------------------ */

interface ErpModulePage {
  title: string;
  slug: string;
  excerpt: string;
  layout: Array<Record<string, unknown>>;
  meta: { title: string; description: string };
}

const ERP_MODULES: ErpModulePage[] = [
  /* ─── Finance & Accounting ────────────────────────────────── */
  {
    title: "Finance & Accounting — UniERP",
    slug: "erp/finance-accounting",
    excerpt:
      "Complete financial management with multi-currency support, UniVAT compliance, and real-time reporting — the backbone of your ERP system.",
    meta: {
      title:
        "Finance & Accounting Module — UniERP | Simal Technologies",
      description:
        "UniERP Finance & Accounting module: GL, AR/AP, bank reconciliation, multi-currency, UniVAT (NBR-approved), budgeting, and financial reporting. Built on Odoo 19 CE.",
    },
    layout: [
      {
        blockType: "heroBlock",
        headline: "Complete Financial Control. From Day One.",
        subHeadline:
          "UniERP's Finance & Accounting module provides a complete, real-time view of your financial position — from general ledger and accounts receivable/payable to multi-currency consolidation and tax compliance. Built on Odoo 19 CE and enhanced with UniVAT (NBR-approved VAT management), it's the financial backbone your business needs.",
        ctaLabel: "Request a Demo",
        ctaLink: "/contact",
      },
      {
        blockType: "featureCardsBlock",
        heading: "Core Capabilities",
        cards: [
          {
            icon: "Calculator",
            title: "General Ledger",
            description:
              "Multi-level chart of accounts, journal entries with approvals, multi-company consolidation, flexible fiscal periods, and complete audit trail.",
          },
          {
            icon: "TrendingUp",
            title: "Accounts Receivable (AR)",
            description:
              "Automated invoicing from sales orders, flexible payment terms, real-time aging analysis, automated dunning, and credit management.",
          },
          {
            icon: "DollarSign",
            title: "Accounts Payable (AP)",
            description:
              "Vendor bill processing, batch payments with approvals, AP aging with cash flow forecasting, expense management, and GR/IR matching.",
          },
          {
            icon: "Landmark",
            title: "Bank & Cash Management",
            description:
              "Automated bank reconciliation (CSV, OFX, CAMT), multi-bank multi-currency accounts, cash forecasting, check management, and petty cash.",
          },
          {
            icon: "BarChart3",
            title: "Financial Reporting",
            description:
              "Balance sheet, P&L, cash flow, trial balance, VAT/sales tax reports, and budget variance — all with drill-down analysis.",
          },
          {
            icon: "Globe",
            title: "Multi-Currency",
            description:
              "30+ currencies with live exchange rates, automatic unrealized gain/loss, and multi-currency invoicing in customer's currency.",
          },
          {
            icon: "Target",
            title: "Budgeting & Planning",
            description:
              "Budgets by period, department, project, or cost center. Multiple scenarios, approval workflows, spending limits, and variance analysis.",
          },
          {
            icon: "Package",
            title: "Fixed Asset Management",
            description:
              "Asset register, straight-line and declining balance depreciation, disposals with gain/loss, barcode tracking, and capex reporting.",
          },
        ],
      },
      {
        blockType: "richTextBlock",
        heading: "UniVAT — NBR-Approved VAT Management",
        content: richDoc([
          { p: "UniVAT is a certified VAT module approved by the National Board of Revenue (NBR) of Bangladesh — one of only 5 such approved systems in the country. It provides automatic output VAT on sales, input VAT credit on purchases, NBR-compliant Mushok generation (6.1–6.10), auto-populated monthly VAT return (9.1), automatic input-output co-efficient calculation per NBR rules, VDS calculation and tracking, configurable supplementary duty by product category, and complete transaction history for NBR audit compliance." },
          { p: "For UAE-based businesses, UniERP also supports UAE Federal Tax Authority (FTA) VAT standards — 5% standard rate, zero-rated, exempt, and out-of-scope supplies." },
        ]),
      },
      {
        blockType: "highlightBlock",
        heading: "Why UniERP Finance & Accounting?",
        highlights: [
          {
            icon: "DollarSign",
            title: "No License Cost",
            description:
              "Unlike QuickBooks, Xero, Zoho Books, or SAP Business One — no per-user monthly fees. The core accounting engine is free. You pay only for implementation, customization, and optional support.",
          },
          {
            icon: "TrendingUp",
            title: "Complete Integration",
            description:
              "Finance data flows seamlessly from Sales, Purchases, HR, Manufacturing, Inventory — no double entry, no reconciliation headaches.",
          },
          {
            icon: "Shield",
            title: "UniVAT Certification",
            description:
              "The only ERP sold in the UAE with NBR-approved VAT software — critical for companies with Bangladesh operations or trade.",
          },
          {
            icon: "Clock",
            title: "Real-Time Visibility",
            description:
              "Cash position, AR aging, AP aging, P&L — all updated in real time as transactions occur throughout the organization.",
          },
          {
            icon: "BadgeCheck",
            title: "Audit-Ready",
            description:
              "Complete, immutable audit trail. Role-based access controls. Segregation of duties. Auditor-friendly reporting.",
          },
        ],
      },
      {
        blockType: "ctaBlock",
        heading: "Ready to Transform Your Financial Operations?",
        description:
          "Speak with our ERP finance specialists to see how UniERP can streamline your accounting, reporting, and compliance.",
        phoneLabel: "Call",
        phoneNumber: "+971 4 123 4567",
        emailLabel: "Email",
        emailAddress: "erp@simal.ae",
        demoLinkLabel: "Schedule a Free Demo",
        demoLinkUrl: "/contact",
      },
    ],
  },

  /* ─── HR & Payroll ──────────────────────────────────────── */
  {
    title: "HR & Payroll — UniERP",
    slug: "erp/hr-payroll",
    excerpt:
      "Manage your entire employee lifecycle — from recruitment to retirement — with UAE labor law compliance built in.",
    meta: {
      title: "HR & Payroll Module — UniERP | Simal Technologies",
      description:
        "UniERP HR & Payroll module: employee database, attendance, leave management, WPS-compliant payroll, recruitment, performance appraisals, and training. UAE labor law compliant.",
    },
    layout: [
      {
        blockType: "heroBlock",
        headline: "Your People. Your Greatest Asset. Manage Them Effortlessly.",
        subHeadline:
          "UniERP's HR & Payroll module manages the complete employee lifecycle — recruitment, onboarding, attendance, leave, payroll (WPS-compliant), performance appraisals, and training — all fully integrated with Finance and Operations.",
        ctaLabel: "Request a Demo",
        ctaLink: "/contact",
      },
      {
        blockType: "featureCardsBlock",
        heading: "Core Capabilities",
        cards: [
          {
            icon: "Users",
            title: "Employee Database",
            description:
              "Centralized records with document management (passports, visas, certifications with expiry alerts) and employee self-service portal.",
          },
          {
            icon: "Clock",
            title: "Attendance & Leave Management",
            description:
              "Biometric integration, configurable leave types with balance tracking, multi-level approval workflows, and team availability calendars.",
          },
          {
            icon: "DollarSign",
            title: "Payroll Processing",
            description:
              "WPS-compliant payroll with automatic gratuity, allowances, deductions, overtime, multi-currency, and automatic GL journal entries.",
          },
          {
            icon: "Clipboard",
            title: "Recruitment Management",
            description:
              "Multi-channel job postings, applicant tracking pipeline, interview scheduling, offer letter generation, and onboarding checklists.",
          },
          {
            icon: "Star",
            title: "Performance Appraisals",
            description:
              "Customizable review cycles, cascading goal setting (OKRs), 360-degree feedback, and performance-linked compensation adjustments.",
          },
          {
            icon: "GraduationCap",
            title: "Training & Development",
            description:
              "Course catalog, enrollment tracking with waitlists, certification expiry alerts, skills gap analysis, and training budget ROI.",
          },
        ],
      },
      {
        blockType: "richTextBlock",
        heading: "UAE Labor Law Compliance",
        content: richDoc([
          { p: "UniERP HR & Payroll is built with UAE Labor Law embedded. Automatic end-of-service gratuity calculation per Federal Decree-Law No. 33 of 2021 (21 days/year for first 5 years, 30 days/year thereafter). Standard working hours: 8 hours/day, 48 hours/week; reduced to 6 hours/day during Ramadan. Overtime at 125% of basic salary for daytime, 150% for night/weekend/holiday. All UAE statutory leave types pre-configured (annual, sick, maternity, paternity, public holidays). Salary file generation in UAE Central Bank WPS (Wage Protection System) format. Limited and unlimited contract types with auto-renewal alerts. Passport, visa, Emirates ID, and labor card expiry tracking with automatic alerts. Employee and dependent medical insurance tracking per Dubai Health Authority requirements." },
        ]),
      },
      {
        blockType: "highlightBlock",
        heading: "Why UniERP HR & Payroll?",
        highlights: [
          {
            icon: "CheckCircle",
            title: "One System, No Spreadsheets",
            description:
              "Eliminate the chaos of multiple spreadsheets, separate payroll software, and manual leave tracking. One unified HRMS.",
          },
          {
            icon: "Shield",
            title: "UAE Labor Law Built-In",
            description:
              "No need to configure gratuity rules, overtime calculations, or WPS formats — they're built in and updated as regulations change.",
          },
          {
            icon: "Smartphone",
            title: "Employee Self-Service",
            description:
              "Employees handle leave requests, download payslips, and update their information — freeing HR from administrative burden.",
          },
          {
            icon: "TrendingUp",
            title: "Integrated with Finance",
            description:
              "Payroll journals auto-post to the General Ledger. Gratuity provisions calculated automatically. No manual journal entries.",
          },
          {
            icon: "DollarSign",
            title: "Cost-Effective",
            description:
              "No per-employee-per-month SaaS fees. The HR module is included in the UniERP platform at no license cost.",
          },
        ],
      },
      {
        blockType: "ctaBlock",
        heading: "Simplify Your HR Operations",
        description:
          "Talk to our HR/Payroll specialists about how UniERP can automate your employee management processes.",
        phoneLabel: "Call",
        phoneNumber: "+971 4 123 4567",
        emailLabel: "Email",
        emailAddress: "erp@simal.ae",
        demoLinkLabel: "Schedule a Free Demo",
        demoLinkUrl: "/contact",
      },
    ],
  },

  /* ─── Sales & CRM ───────────────────────────────────────── */
  {
    title: "Sales & CRM — UniERP",
    slug: "erp/sales-crm",
    excerpt:
      "Convert more leads, close deals faster, and build lasting customer relationships with an integrated sales pipeline.",
    meta: {
      title: "Sales & CRM Module — UniERP | Simal Technologies",
      description:
        "UniERP Sales & CRM module: lead management, opportunity pipeline, quotations, order management, customer database, email integration, and sales dashboards. Built on Odoo 19 CE.",
    },
    layout: [
      {
        blockType: "heroBlock",
        headline: "Turn Leads into Loyal Customers. Systematically.",
        subHeadline:
          "UniERP's Sales & CRM module gives your team a complete toolkit — lead capture and scoring, visual opportunity pipeline, professional quotations, order management, and real-time dashboards. Everything integrated with inventory and finance for a seamless order-to-cash cycle.",
        ctaLabel: "Request a Demo",
        ctaLink: "/contact",
      },
      {
        blockType: "featureCardsBlock",
        heading: "Core Capabilities",
        cards: [
          {
            icon: "Target",
            title: "Lead Management",
            description:
              "Capture leads from web forms, events, and referrals with automated scoring, assignment, nurturing, and source tracking.",
          },
          {
            icon: "TrendingUp",
            title: "Opportunity Pipeline",
            description:
              "Visual kanban with drag-and-drop stages, probability-weighted forecasting, deal tracking, and automated activity logging.",
          },
          {
            icon: "Clipboard",
            title: "Quotation & Order Management",
            description:
              "Professional branded quotations from catalog, one-click conversion to sales orders, real-time fulfillment, and multi-currency support.",
          },
          {
            icon: "Users",
            title: "Customer Database",
            description:
              "360-degree customer view with communication history, segmentation by industry/region/behavior, and lifetime value tracking.",
          },
          {
            icon: "Mail",
            title: "Email Integration",
            description:
              "Sync with Gmail and Outlook — send, receive, and log emails directly. Automatic threading linked to leads and customers.",
          },
          {
            icon: "BarChart3",
            title: "Dashboards & Reports",
            description:
              "Real-time KPIs, pipeline health analysis, win/loss by product/region/salesperson, and team quota attainment tracking.",
          },
        ],
      },
      {
        blockType: "highlightBlock",
        heading: "Why UniERP Sales & CRM?",
        highlights: [
          {
            icon: "TrendingUp",
            title: "Full Integration",
            description:
              "CRM connects directly to Inventory (real-time stock), Accounting (invoices), and Manufacturing (production orders) — no data silos.",
          },
          {
            icon: "DollarSign",
            title: "No Per-User CRM Fees",
            description:
              "Unlike Salesforce ($25–$300/user/month), HubSpot, or Zoho CRM — no recurring per-user CRM license costs.",
          },
          {
            icon: "Smartphone",
            title: "Mobile-Ready",
            description:
              "Sales reps access leads, update opportunities, and create quotations from any device.",
          },
        ],
      },
      {
        blockType: "ctaBlock",
        heading: "Ready to Supercharge Your Sales?",
        description:
          "Speak with our sales automation specialists about how UniERP can help your team close more deals, faster.",
        phoneLabel: "Call",
        phoneNumber: "+971 4 123 4567",
        emailLabel: "Email",
        emailAddress: "erp@simal.ae",
        demoLinkLabel: "Schedule a Free Demo",
        demoLinkUrl: "/contact",
      },
    ],
  },

  /* ─── Inventory & Supply Chain ───────────────────────────── */
  {
    title: "Inventory & Supply Chain — UniERP",
    slug: "erp/inventory-supply-chain",
    excerpt:
      "Optimize stock levels, automate purchasing, and manage multi-location warehouses with barcode and serial number tracking.",
    meta: {
      title:
        "Inventory & Supply Chain Module — UniERP | Simal Technologies",
      description:
        "UniERP Inventory & Supply Chain module: stock management, purchase management, warehouse management, barcode integration, serial/lot tracking, and reorder automation. Built on Odoo 19 CE.",
    },
    layout: [
      {
        blockType: "heroBlock",
        headline: "Right Product. Right Place. Right Time. Always.",
        subHeadline:
          "UniERP's Inventory & Supply Chain module gives you real-time visibility and control over your entire supply chain — from procurement and warehousing to delivery. Reduce carrying costs, prevent stock-outs, and automate replenishment with intelligent reorder rules.",
        ctaLabel: "Request a Demo",
        ctaLink: "/contact",
      },
      {
        blockType: "featureCardsBlock",
        heading: "Core Capabilities",
        cards: [
          {
            icon: "Package",
            title: "Stock Management",
            description:
              "Real-time inventory across multiple warehouses with min/max alerts, serial/lot/batch tracking, FIFO/LIFO/average valuation, and cycle counts.",
          },
          {
            icon: "Clipboard",
            title: "Purchase Management",
            description:
              "RFQ-to-PO workflows, vendor price lists, approval hierarchies, vendor performance tracking, and landed cost calculation.",
          },
          {
            icon: "Building",
            title: "Warehouse Management",
            description:
              "Configurable putaway and picking strategies (FEFO/FIFO/LIFO), bin/location management, wave/batch/zone picking, and carrier integration.",
          },
          {
            icon: "Smartphone",
            title: "Barcode Integration",
            description:
              "Scan receiving, putaway, picking, packing, and counts. Product, location, and serial barcodes with mobile-friendly tablet interface.",
          },
          {
            icon: "Search",
            title: "Serial & Lot Tracking",
            description:
              "Full traceability from supplier to customer. Lot expiry with FEFO/FIFO, quality holds, and recall management in seconds.",
          },
          {
            icon: "Zap",
            title: "Reorder Automation",
            description:
              "Auto PO generation based on stock rules, lead times, and demand forecasts. Vendor-specific MOQs, safety stock, and seasonal profiles.",
          },
          {
            icon: "MapPin",
            title: "Multi-Location Inventory",
            description:
              "Inter-warehouse transfers with documentation, consignment stock at customer sites, and drop shipping from supplier to customer.",
          },
          {
            icon: "HeartHandshake",
            title: "Supplier Management",
            description:
              "Supplier profiles with pricing and lead times, multiple price lists, supplier evaluation ratings, and spend analysis by category.",
          },
        ],
      },
      {
        blockType: "highlightBlock",
        heading: "Why UniERP Inventory & Supply Chain?",
        highlights: [
          {
            icon: "TrendingUp",
            title: "End-to-End Integration",
            description:
              "Inventory connects seamlessly with Sales (order → delivery), Purchasing (requisition → receive), Manufacturing (BOM → consumption), and Accounting (cost → GL).",
          },
          {
            icon: "BadgeCheck",
            title: "Real-Time Accuracy",
            description:
              "Say goodbye to stock discrepancies. Every transaction updates inventory in real time — your sales team always sees accurate stock.",
          },
          {
            icon: "DollarSign",
            title: "Cost Control",
            description:
              "Landed cost allocation, automated reordering, and warehouse optimization reduce carrying costs and stockouts.",
          },
        ],
      },
      {
        blockType: "ctaBlock",
        heading: "Optimize Your Supply Chain Today",
        description:
          "Speak with our supply chain specialists about how UniERP can reduce your inventory costs and improve fulfillment speed.",
        phoneLabel: "Call",
        phoneNumber: "+971 4 123 4567",
        emailLabel: "Email",
        emailAddress: "erp@simal.ae",
        demoLinkLabel: "Schedule a Free Demo",
        demoLinkUrl: "/contact",
      },
    ],
  },

  /* ─── Manufacturing ──────────────────────────────────────── */
  {
    title: "Manufacturing — UniERP",
    slug: "erp/manufacturing",
    excerpt:
      "Plan production, manage bills of materials, track work orders, and control quality — all integrated with inventory and finance.",
    meta: {
      title: "Manufacturing Module — UniERP | Simal Technologies",
      description:
        "UniERP Manufacturing module: BOM, MRP, production planning, work order management, quality control, shop floor tracking, and costing. Built on Odoo 19 CE.",
    },
    layout: [
      {
        blockType: "heroBlock",
        headline: "From Raw Materials to Finished Products. Effortlessly.",
        subHeadline:
          "UniERP's Manufacturing module provides complete control over your production process — from planning and scheduling to execution and quality control. Manage Bills of Materials, plan material requirements, schedule work centers, track shop floor operations, and control quality at every step.",
        ctaLabel: "Request a Demo",
        ctaLink: "/contact",
      },
      {
        blockType: "featureCardsBlock",
        heading: "Core Capabilities",
        cards: [
          {
            icon: "Package",
            title: "Bill of Materials (BOM)",
            description:
              "Multi-level BOM with version control, byproducts, co-products, phantom BOMs, and automatic cost roll-up from raw materials to finished goods.",
          },
          {
            icon: "BarChart3",
            title: "Material Requirements Planning (MRP)",
            description:
              "Forecast or order-driven planning. MPS, automatic raw material calculation, auto purchase proposals, and exception management alerts.",
          },
          {
            icon: "Clipboard",
            title: "Work Order Management",
            description:
              "Auto-generated or manual work orders, finite capacity scheduling, work instructions, time tracking, and material consumption variance.",
          },
          {
            icon: "BadgeCheck",
            title: "Quality Control",
            description:
              "Inspection points at incoming, in-process, and final stages. Tolerance alerts, non-conformance tracking, root cause analysis, and COA generation.",
          },
          {
            icon: "Factory",
            title: "Shop Floor Tracking",
            description:
              "Real-time production dashboard, tablet/mobile operator interface, and PLC/SCADA machine integration for automated data capture.",
          },
          {
            icon: "DollarSign",
            title: "Costing",
            description:
              "Standard and actual costing with real-time accumulation. Complete manufacturing order breakdown: materials, labor, and overhead per order.",
          },
        ],
      },
      {
        blockType: "highlightBlock",
        heading: "Why UniERP Manufacturing?",
        highlights: [
          {
            icon: "TrendingUp",
            title: "Integrated MRP",
            description:
              "Demand from sales orders flows directly to production planning. MRP calculates exactly what raw materials are needed and when — no spreadsheets, no guesswork.",
          },
          {
            icon: "DollarSign",
            title: "Real-Time Costing",
            description:
              "Know your exact production costs as they happen. Compare actual vs. standard costs per work order. Identify cost variances before they eat into margins.",
          },
          {
            icon: "BadgeCheck",
            title: "Quality Built-In",
            description:
              "Inspections at every stage — incoming materials, in-process checks, and final QC. Non-conformance tracking ensures quality issues are resolved, not repeated.",
          },
        ],
      },
      {
        blockType: "ctaBlock",
        heading: "Ready to Optimize Your Production?",
        description:
          "Speak with our manufacturing specialists about how UniERP can streamline your production planning, quality control, and costing.",
        phoneLabel: "Call",
        phoneNumber: "+971 4 123 4567",
        emailLabel: "Email",
        emailAddress: "erp@simal.ae",
        demoLinkLabel: "Schedule a Free Demo",
        demoLinkUrl: "/contact",
      },
    ],
  },

  /* ─── Project Management ─────────────────────────────────── */
  {
    title: "Project Management — UniERP",
    slug: "erp/project-management",
    excerpt:
      "Plan projects, allocate resources, track time, and monitor profitability — all integrated with accounting and HR.",
    meta: {
      title:
        "Project Management Module — UniERP | Simal Technologies",
      description:
        "UniERP Project Management module: project planning, Gantt charts, resource allocation, task management, time tracking, budget management, and client portal. Built on Odoo 19 CE.",
    },
    layout: [
      {
        blockType: "heroBlock",
        headline: "Every Project. On Time. On Budget. Profitable.",
        subHeadline:
          "UniERP's Project Management module helps you plan, execute, and monitor projects with precision. Gantt charts, resource allocation, task management, time tracking, and budget controls — fully integrated with Accounting, HR, and Sales.",
        ctaLabel: "Request a Demo",
        ctaLink: "/contact",
      },
      {
        blockType: "featureCardsBlock",
        heading: "Core Capabilities",
        cards: [
          {
            icon: "Clipboard",
            title: "Project Planning",
            description:
              "Gantt charts with milestones, task dependencies, and critical path visualization. Work breakdown structure (WBS) with unlimited sub-tasks. Project templates for repeatable project types. Baseline tracking — compare planned vs. actual schedule and cost.",
          },
          {
            icon: "Users",
            title: "Resource Allocation",
            description:
              "Assign team members to tasks with workload visibility across all projects. Identify and resolve resource conflicts and over-allocations. Role-based resource planning with skill matching. Capacity planning for future project pipeline.",
          },
          {
            icon: "CheckCircle",
            title: "Task Management",
            description:
              "Kanban and list views with configurable stages. Task priorities, deadlines, tags, and subtasks. Collaborative comments and file attachments. Automatic notifications for overdue tasks and approaching deadlines.",
          },
          {
            icon: "Clock",
            title: "Time Tracking",
            description:
              "Timesheets with task-based entries and approval workflows. Billable vs. non-billable time tracking with automatic rate application. Timer-based tracking for accurate time capture. Integration with payroll for overtime and project-based compensation.",
          },
          {
            icon: "DollarSign",
            title: "Budget Management",
            description:
              "Track planned vs. actual costs with real-time alerts. Revenue recognition based on project progress (percentage-of-completion). Profitability dashboards at project, portfolio, and client levels. Expense tracking with receipt capture and approval workflows.",
          },
          {
            icon: "Globe",
            title: "Client Portal",
            description:
              "Share project progress, milestones, and documents with clients via a secure, branded portal. Clients can view tasks, approve deliverables, and provide feedback — reducing email back-and-forth and keeping everyone aligned.",
          },
        ],
      },
      {
        blockType: "highlightBlock",
        heading: "Why UniERP Project Management?",
        highlights: [
          {
            icon: "TrendingUp",
            title: "Integrated Financials",
            description:
              "Project costs feed directly from timesheets, purchase orders, and expense reports into the General Ledger — no double entry.",
          },
          {
            icon: "DollarSign",
            title: "Client Billing",
            description:
              "Billable hours and expenses flow directly to customer invoices — never miss billable work again.",
          },
          {
            icon: "BarChart3",
            title: "Real-Time Profitability",
            description:
              "Know your project margin while the project is running — not weeks after completion.",
          },
        ],
      },
      {
        blockType: "ctaBlock",
        heading: "Start Delivering Projects Profitably",
        description:
          "Speak with our project management specialists about how UniERP can help you deliver every project on time and on budget.",
        phoneLabel: "Call",
        phoneNumber: "+971 4 123 4567",
        emailLabel: "Email",
        emailAddress: "erp@simal.ae",
        demoLinkLabel: "Schedule a Free Demo",
        demoLinkUrl: "/contact",
      },
    ],
  },
];

/* ------------------------------------------------------------------
   Seed function
   ------------------------------------------------------------------ */

async function seed() {
  console.log("Seeding ERP module detail pages...\n");

  const payload = await getPayload({ config });

  for (const mod of ERP_MODULES) {
    try {
      const existing = await payload.find({
        collection: "pages",
        where: { slug: { equals: mod.slug } },
        limit: 1,
        overrideAccess: true,
      });

      const data = {
        title: mod.title,
        slug: mod.slug,
        excerpt: mod.excerpt,
        status: "published",
        layout: mod.layout,
        meta: mod.meta,
      };

      if (existing.docs.length > 0) {
        await payload.update({
          collection: "pages",
          id: existing.docs[0].id as number,
          data: data as never,
          overrideAccess: true,
          draft: false,
          publish: true,
        });
        console.log(`✓ Updated: ${mod.title}`);
      } else {
        await payload.create({
          collection: "pages",
          data: data as never,
          overrideAccess: true,
          draft: false,
        });
        console.log(`✓ Created: ${mod.title}`);
      }
    } catch (error) {
      console.error(`✗ Failed to seed ${mod.title}:`, error);
    }
  }

  await payload.destroy();
  console.log(`\nSeeded ${ERP_MODULES.length} ERP module pages.`);
  process.exit(0);
}

seed();
