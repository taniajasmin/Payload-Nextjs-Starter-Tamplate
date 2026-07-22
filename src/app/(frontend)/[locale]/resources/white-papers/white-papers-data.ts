/* ------------------------------------------------------------------
   Shared white-paper data — used by both the list page and detail
   pages. Content sourced from:
   docs/content/08_Resources/04_White_Papers_3_to_5.md
   ------------------------------------------------------------------ */
import type { ComponentType } from "react";
import {
  Database,
  RefreshCw,
  Shield,
  Package,
  Layers,
  BarChart3,
  Gauge,
  TableProperties,
  Route,
  TrendingUp,
  Users,
  LineChart,
  Network,
  Server,
  ClipboardCheck,
  MonitorSmartphone,
  Siren,
  LayoutGrid,
  GitMerge,
  Leaf,
  Blocks,
  Webhook,
  Lock,
  Cloud,
  LifeBuoy,
  Cpu,
} from "lucide-react";

export type Topic =
  | "Storage"
  | "Digital Transformation"
  | "Security"
  | "IT Distribution"
  | "ERP Architecture";

/* ------------------------------------------------------------------
   Topic → icon + accent.
   The `accent` gradient + `color` hexes are copied VERBATIM from the
   Company Insights page card palette (insights/page.tsx topBarColors
   + journey/reason accents) so white-paper topics draw from the same
   in-system colour set — no new accent colours are introduced.
   ------------------------------------------------------------------ */
export interface TopicMeta {
  icon: ComponentType<{ className?: string }>;
  /** Tailwind gradient class fragment, e.g. "from-[#286FB4] to-[#3A85C8]" */
  accent: string;
  /** Single accent hex for text/badges, e.g. "#286FB4" */
  color: string;
}

export const TOPIC_META: Record<Topic, TopicMeta> = {
  Storage: { icon: Database, accent: "from-[#286FB4] to-[#3A85C8]", color: "#286FB4" },
  "Digital Transformation": { icon: RefreshCw, accent: "from-[#06B6D4] to-[#22D3EE]", color: "#06B6D4" },
  Security: { icon: Shield, accent: "from-[#DF4C73] to-[#E8718F]", color: "#DF4C73" },
  "IT Distribution": { icon: Package, accent: "from-[#F59E0B] to-[#FBBF24]", color: "#F59E0B" },
  "ERP Architecture": { icon: Layers, accent: "from-[#8B5CF6] to-[#6366F1]", color: "#8B5CF6" },
};

/* ------------------------------------------------------------------
   "What You'll Learn" card — icon + short headline + one-line blurb,
   shown in a 2-column grid on the detail page.
   ------------------------------------------------------------------ */
export interface LearnItem {
  icon: ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

export interface WhitePaper {
  slug: string;
  title: string;
  excerpt: string;
  topic: Topic;
  pages: string;
  date: string;
  readTime: string;
  /** Longer description shown on the detail page */
  description: string;
  /** Checkmark list — "Topics Covered" column */
  topicsCovered: string[];
  /** Icon list — "Target Audience" column */
  targetAudience: string[];
  /** 6-card grid — "What You'll Learn" section */
  whatYouLearn: LearnItem[];
}

export const WHITE_PAPERS: WhitePaper[] = [
  {
    slug: "enterprise-storage-strategies-middle-east-2026",
    title: "Enterprise Storage Strategies for Middle East Data Centers (2026 Edition)",
    excerpt:
      "The Middle East data center market is projected to grow at 15.8% CAGR through 2029, driven by cloud adoption, AI workloads, and data sovereignty regulations. This white paper analyzes enterprise storage technologies — NVMe, SAS SSD, HDD — against five workload profiles common in GCC data centers. Includes TCO models, performance benchmarks, and a vendor comparison matrix (Samsung, WD, Kingston, Crucial).",
    topic: "Storage",
    pages: "24 pages",
    date: "January 2026",
    readTime: "12 min read",
    description:
      "The Middle East data center market is projected to grow at 15.8% CAGR through 2029, driven by cloud adoption, AI workloads, and data sovereignty regulations. This white paper analyzes enterprise storage technologies — NVMe, SAS SSD, HDD — against five workload profiles common in GCC data centers. It includes TCO models, performance benchmarks, and a vendor comparison matrix covering Samsung, WD, Kingston, and Crucial. Target audience: IT infrastructure managers, data center architects, and CTOs evaluating storage investments for ME data centers.",
    topicsCovered: [
      "NVMe, SAS SSD & HDD technology deep-dive",
      "Five GCC data-center workload profiles",
      "Performance benchmarks (IOPS, latency, throughput)",
      "3-year Total Cost of Ownership models",
      "Vendor comparison matrix (Samsung, WD, Kingston, Crucial)",
      "Sizing & deployment best practices",
    ],
    targetAudience: [
      "IT Infrastructure Managers",
      "Data Center Architects",
      "Chief Technology Officers",
      "Storage Administrators",
      "Procurement & Sourcing Leads",
    ],
    whatYouLearn: [
      { icon: BarChart3, title: "Market Trends", description: "GCC storage demand drivers and the 15.8% CAGR growth outlook through 2029." },
      { icon: LineChart, title: "Performance Benchmarks", description: "Side-by-side IOPS, latency and throughput across NVMe, SAS SSD and HDD." },
      { icon: TableProperties, title: "Vendor Comparison", description: "A decision matrix spanning Samsung, WD, Kingston and Crucial enterprise lines." },
      { icon: Gauge, title: "TCO Analysis", description: "3-year cost models that surface the true price of performance tiering." },
      { icon: Cpu, title: "Workload Profiles", description: "How five common GCC workloads map onto the right media type." },
      { icon: ClipboardCheck, title: "Best Practices", description: "Sizing, tiering and deployment patterns validated for regional data centers." },
    ],
  },
  {
    slug: "digital-transformation-erp-framework-uae-gcc-smes",
    title: "Digital Transformation Through ERP — A Framework for UAE & GCC SMEs",
    excerpt:
      "78% of GCC SMEs still rely primarily on spreadsheets and disconnected software for core business processes. This white paper presents a structured digital transformation framework: Assess → Select → Implement → Optimize. Includes a self-assessment maturity model, ERP selection criteria matrix, implementation roadmap, and 7 real-world case studies with quantified ROI.",
    topic: "Digital Transformation",
    pages: "32 pages",
    date: "December 2025",
    readTime: "16 min read",
    description:
      "78% of GCC SMEs still rely primarily on spreadsheets and disconnected software for core business processes. This white paper presents a structured digital transformation framework — Assess → Select → Implement → Optimize. It includes a self-assessment maturity model, an ERP selection criteria matrix, a phased implementation roadmap, and 7 real-world case studies with quantified ROI. Target audience: SME owners, CFOs, and operations directors seeking a practical path to digital operations.",
    topicsCovered: [
      "Self-assessment digital maturity model",
      "ERP selection criteria & scoring matrix",
      "Phased implementation roadmap",
      "Change management & user adoption",
      "Quantified ROI measurement",
      "7 real-world SME case studies",
    ],
    targetAudience: [
      "SME Owners & Founders",
      "Chief Financial Officers",
      "Operations Directors",
      "IT & Systems Managers",
      "Business Analysts",
    ],
    whatYouLearn: [
      { icon: Gauge, title: "Maturity Model", description: "Score your organization across the Assess → Select → Implement → Optimize arc." },
      { icon: TableProperties, title: "Selection Matrix", description: "Weighted criteria to evaluate ERP vendors against your real requirements." },
      { icon: Route, title: "Implementation Roadmap", description: "A phased rollout that de-risks go-live and protects day-to-day operations." },
      { icon: Users, title: "Change Management", description: "Adoption playbooks that turn a system launch into a behaviour shift." },
      { icon: TrendingUp, title: "ROI Framework", description: "How to quantify returns and build a defensible business case." },
      { icon: ClipboardCheck, title: "Case Studies", description: "Seven SME transformations with before-and-after metrics." },
    ],
  },
  {
    slug: "network-security-best-practices-distributed-enterprises-gcc",
    title: "Network Security Best Practices for Distributed Enterprises in the GCC",
    excerpt:
      "With 67% of GCC enterprises operating across multiple locations and 43% adopting hybrid work models, the traditional perimeter-based security model is obsolete. This white paper covers: Zero Trust architecture, SASE framework, next-gen firewall selection (with Sophos XG Series analysis), endpoint protection, UAE NESA/IAS compliance mapping, and incident response planning.",
    topic: "Security",
    pages: "28 pages",
    date: "November 2025",
    readTime: "14 min read",
    description:
      "With 67% of GCC enterprises operating across multiple locations and 43% adopting hybrid work models, the traditional perimeter-based security model is obsolete. This white paper covers Zero Trust architecture, the SASE framework, next-gen firewall selection with Sophos XG Series analysis, endpoint protection strategies, UAE NESA/IAS compliance mapping, and incident response planning. Target audience: CISOs, IT security managers, and compliance officers responsible for securing distributed enterprise environments.",
    topicsCovered: [
      "Zero Trust architecture principles",
      "SASE convergence framework",
      "Next-gen firewall selection (Sophos XG Series)",
      "Endpoint & device protection",
      "UAE NESA / IAS compliance mapping",
      "Incident response planning",
    ],
    targetAudience: [
      "Chief Information Security Officers",
      "IT Security Managers",
      "Compliance & GRC Officers",
      "Network Architects",
      "IT Directors",
    ],
    whatYouLearn: [
      { icon: Shield, title: "Zero Trust", description: "Identity- and context-based controls that replace the legacy network perimeter." },
      { icon: Network, title: "SASE Framework", description: "Converged networking and security at the edge for distributed teams." },
      { icon: Server, title: "Firewall Selection", description: "A capability deep-dive on the Sophos XG Series for GCC enterprises." },
      { icon: ClipboardCheck, title: "Compliance Mapping", description: "Aligning controls to UAE NESA and IAS regulatory requirements." },
      { icon: MonitorSmartphone, title: "Endpoint Protection", description: "Device-level defence for hybrid and bring-your-own environments." },
      { icon: Siren, title: "Incident Response", description: "A tiered response plan that limits blast radius and downtime." },
    ],
  },
  {
    slug: "future-b2b-it-distribution-gcc-2026-2030",
    title: "The Future of B2B IT Distribution in the GCC — 2026–2030",
    excerpt:
      "B2B IT distribution in the GCC is being reshaped by e-commerce platforms, direct-to-enterprise vendor models, and value-added services. This white paper analyzes five trends: platformization, servitization, vertical specialization, cross-border consolidation, and sustainability mandates. Includes partner readiness assessment and business model evolution framework.",
    topic: "IT Distribution",
    pages: "20 pages",
    date: "October 2025",
    readTime: "10 min read",
    description:
      "B2B IT distribution in the GCC is being reshaped by e-commerce platforms, direct-to-enterprise vendor models, and value-added services. This white paper analyzes five key trends — platformization, servitization, vertical specialization, cross-border consolidation, and sustainability mandates — and their impact on the regional channel. It includes a partner readiness assessment and a business model evolution framework. Target audience: IT resellers, system integrators, and vendor channel managers.",
    topicsCovered: [
      "Platformization & B2B e-commerce",
      "Servitization & value-added services",
      "Vertical & industry specialization",
      "Cross-border consolidation",
      "Sustainability & green mandates",
      "Partner readiness self-assessment",
    ],
    targetAudience: [
      "IT Resellers & Retailers",
      "System Integrators",
      "Vendor Channel Managers",
      "Distributors & Wholesalers",
      "Sales & Strategy Leaders",
    ],
    whatYouLearn: [
      { icon: LayoutGrid, title: "Platformization", description: "How self-serve B2B marketplaces are redefining the channel transaction." },
      { icon: Package, title: "Servitization", description: "Why margin is migrating from boxes to managed and outcome services." },
      { icon: Layers, title: "Vertical Specialization", description: "The case for depth in priority industries over broad-line coverage." },
      { icon: GitMerge, title: "Consolidation", description: "Cross-border M&A and what it means for regional competitiveness." },
      { icon: Leaf, title: "Sustainability", description: "Turning green procurement mandates into a differentiator." },
      { icon: ClipboardCheck, title: "Partner Readiness", description: "A self-assessment to benchmark your position on the 2026–2030 curve." },
    ],
  },
  {
    slug: "unierp-technical-architecture-security-odoo-19",
    title: "UniERP Technical Architecture & Security — Built on Odoo 19 CE",
    excerpt:
      "Comprehensive technical documentation of the UniERP platform: Odoo 19 Community Edition foundation, custom module architecture, database design (PostgreSQL), API layer (REST/XML-RPC), security architecture (RBAC, encryption, audit trail), deployment options (cloud/on-premise/hybrid), performance benchmarks, scalability limits, and disaster recovery architecture. Essential reading for technical evaluators.",
    topic: "ERP Architecture",
    pages: "36 pages",
    date: "September 2025",
    readTime: "18 min read",
    description:
      "Comprehensive technical documentation of the UniERP platform built on Odoo 19 Community Edition. Covers custom module architecture, database design (PostgreSQL), the API layer (REST/XML-RPC), security architecture including RBAC, encryption, and audit trail, deployment options across cloud, on-premise, and hybrid, plus performance benchmarks, scalability limits, and disaster recovery architecture. Target audience: CTOs, IT architects, security auditors, and ERP evaluators conducting technical due diligence.",
    topicsCovered: [
      "Custom Odoo 19 CE module architecture",
      "PostgreSQL database design",
      "REST & XML-RPC API layer",
      "RBAC, encryption & audit trail",
      "Cloud / on-premise / hybrid deployment",
      "Disaster recovery architecture",
    ],
    targetAudience: [
      "Chief Technology Officers",
      "Solution & IT Architects",
      "Security Auditors",
      "ERP Evaluation Teams",
      "DevOps & Platform Leads",
    ],
    whatYouLearn: [
      { icon: Blocks, title: "Module Architecture", description: "How custom modules extend the Odoo 19 Community Edition core." },
      { icon: Database, title: "Database Design", description: "The PostgreSQL schema and extension patterns behind UniERP." },
      { icon: Webhook, title: "API Layer", description: "REST and XML-RPC endpoints for integrations and automation." },
      { icon: Lock, title: "Security Architecture", description: "Role-based access, encryption and a tamper-evident audit trail." },
      { icon: Cloud, title: "Deployment Options", description: "Cloud, on-premise and hybrid models with their trade-offs." },
      { icon: LifeBuoy, title: "DR & Scalability", description: "Performance benchmarks, scale limits and recovery objectives." },
    ],
  },
];

/** Look up a white paper by its URL slug */
export function getWhitePaper(slug: string): WhitePaper | undefined {
  return WHITE_PAPERS.find((wp) => wp.slug === slug);
}

/** All valid slugs for generateStaticParams */
export function getAllSlugs(): string[] {
  return WHITE_PAPERS.map((wp) => wp.slug);
}
