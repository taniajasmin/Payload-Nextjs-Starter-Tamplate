import type { ServiceDetail, ServiceSummary } from "./services-config";
import { SERVICES_CONTENT } from "./services-seed-content";

/**
 * Offline fallback content for the service pages.
 *
 * The service pages are CMS-driven (`services` collection via fetch-services),
 * but the dev database may be unreachable. To keep the pages rendering —
 * mirroring how the /it-distribution pages ship inline fallback content when
 * the CMS returns empty — the routes fall back to this static data whenever
 * the CMS lookup comes back empty.
 *
 * CMS is still authoritative: when the DB is reachable and a `services` doc
 * exists for the slug, that doc wins (see services/[slug]/page.tsx). The
 * content here is kept in sync with the seeder
 * (src/app/(payload)/api/seed-services/route.ts) and enriched from
 * services-seed-content.ts.
 */

const enriched = (slug: string) => SERVICES_CONTENT[slug] ?? { overview: "", features: [], benefits: [] };

const AMC: ServiceDetail = {
  id: "fallback-amc",
  title: "Annual Maintenance Contract (AMC)",
  slug: "amc",
  family: "it-services",
  tagline:
    "Comprehensive maintenance for hardware, software and network infrastructure — with defined SLA tiers, proactive monitoring and 24/7 support options.",
  icon: "Wrench",
  iconColor: "orange",
  heroBackgroundImage: {
    url: "/assets/images/services/amc-hero.jpg",
    alt: "Server rack maintenance and IT infrastructure support",
  },
  hero: {
    headline: "Annual Maintenance Contract (AMC)",
    subHeadline:
      "Keep your infrastructure running without an in-house IT team. Our certified engineers monitor, maintain and resolve issues before they disrupt your business.",
    primaryCtaLabel: "Request a Quote",
    primaryCtaLink: "/contact",
    secondaryCtaLabel: "Explore IT Solutions",
    secondaryCtaLink: "/services",
  },
  heroStats: [
    { value: "99.9%", label: "System Availability", description: "Average uptime for Premium AMC clients across all covered infrastructure." },
    { value: "3.5 hrs", label: "Average Resolution Time", description: "Mean time to resolve critical incidents under Standard and Premium tiers." },
    { value: "20–40%", label: "Extended Asset Lifespan", description: "Regular maintenance extends useful life of IT hardware assets." },
    { value: "3 Tiers", label: "Flexible SLA Options", description: "Basic, Standard, and Premium — tailored to your budget and uptime requirements." },
  ],
  processSteps: [
    { title: "Free Consultation", description: "We assess your infrastructure, business requirements, pain points, and goals through on-site consultation.", icon: "search" },
    { title: "Proposal & Sign", description: "Tailored AMC proposal with SLA tier recommendation, scope, timeline, and pricing for your review.", icon: "fileCheck" },
    { title: "Audit & Plan", description: "Comprehensive infrastructure audit and maintenance schedule created with gap analysis.", icon: "barChart3" },
    { title: "Onboard & Setup", description: "Monitoring tools deployed, documentation created, support channels activated for seamless handover.", icon: "wrench" },
    { title: "Ongoing Support", description: "Proactive maintenance, responsive support, regular health reporting per your SLA tier.", icon: "headphones" },
  ],
  useCases: [
    { title: "Banking & Finance", description: "Servers, firewalls, secure workstations, and backup systems under regulatory compliance.", icon: "building2" },
    { title: "Government", description: "Complete IT infrastructure, secure networks, and AV systems with NESA-aligned documentation.", icon: "shield" },
    { title: "Healthcare", description: "Medical workstations, PACS servers, and network infrastructure with HIPAA compliance support.", icon: "activity" },
    { title: "Education", description: "Computer labs, smart boards, projectors, and campus WiFi across multiple buildings.", icon: "monitor" },
    { title: "Retail & Distribution", description: "POS systems, inventory terminals, and warehouse networks across multiple locations.", icon: "globe" },
    { title: "Hospitality", description: "PMS servers, guest WiFi, and in-room entertainment systems for hotels and resorts.", icon: "users" },
  ],
  brands: [
    { name: "Sophos", description: "Endpoint protection and next-gen firewall technologies." },
    { name: "Microsoft", description: "Operating systems, cloud services, and enterprise software." },
    { name: "Kaspersky", description: "Anti-malware and endpoint security solutions." },
    { name: "SolarWinds", description: "Network performance monitoring and management." },
    { name: "HPE", description: "Servers, storage, and networking hardware." },
    { name: "Dell", description: "Enterprise servers, workstations, and storage." },
  ],
  relatedServices: [
    { name: "Cloud Security", description: "Protect your cloud and hybrid environments with layered defences and 24/7 SOC.", href: "/solutions/cloud-security" },
    { name: "Firewall Solutions", description: "Next-gen Sophos XG firewalls with IPS, VPN, and managed monitoring.", href: "/solutions/firewall" },
    { name: "Data Recovery & Storage", description: "NAS, SAN, cloud storage architecture and professional data recovery.", href: "/solutions/data-recovery-storage" },
    { name: "IT Infrastructure", description: "Scalable servers, storage, virtualization, and networking design and deployment.", href: "/solutions/it-infrastructure" },
  ],
  ctaSection: {
    heading: "Ready to Secure Your IT Infrastructure?",
    description: "Get a tailored AMC proposal with the right SLA tier for your business. Email amc@simalme.com or call for a free consultation.",
    primaryLabel: "Request AMC Quote",
    primaryLink: "/contact/amc-inquiry",
    secondaryLabel: "WhatsApp +971 54 308 8655",
    secondaryLink: "https://wa.me/971543088655",
  },
  overview: enriched("amc").overview,
  features: enriched("amc").features,
  benefits: enriched("amc").benefits,
  meta: {
    title: "Annual Maintenance Contract (AMC) — IT Support Dubai | Simal Technologies",
    description:
      "SLA-backed AMC covering hardware, software and network infrastructure with proactive monitoring and 24/7 support across the UAE and MEA.",
  },
};

const AV: ServiceDetail = {
  id: "fallback-av",
  title: "AV & Meeting Room Solutions",
  slug: "av-meeting-room",
  family: "it-services",
  tagline:
    "Audio-visual and meeting room solutions featuring Nearity all-in-one conferencing systems — design, installation and integration for any space.",
  icon: "Video",
  iconColor: "purple",
  heroBackgroundImage: {
    url: "/assets/images/services/av-meeting-room-hero.jpg",
    alt: "Modern conference room with audio-visual technology",
  },
  hero: {
    headline: "AV & Meeting Room Solutions",
    subHeadline:
      "From huddle rooms to conference halls, we design, supply and integrate audio-visual and conferencing systems built around Nearity all-in-one devices — crystal-clear meetings, every time.",
    primaryCtaLabel: "Plan My Room",
    primaryCtaLink: "/contact",
  },
  heroStats: [
    { value: "< 1 min", label: "Meeting Start Time", description: "Standardized, pre-configured rooms get meetings running in under a minute." },
    { value: "7 Types", label: "Room Configurations", description: "From huddle rooms to auditoriums — every space engineered to its purpose." },
    { value: "4K + AI", label: "Nearity C30R Powered", description: "8-mic array, AI noise cancellation, auto-framing, and speaker tracking." },
    { value: "85%", label: "Fewer AV Support Calls", description: "Reliable, consistent rooms dramatically reduce helpdesk tickets and IT overhead." },
  ],
  processSteps: [
    { title: "Consult & Assess", description: "We visit your space, understand collaboration needs, room dimensions, and user expectations.", icon: "search" },
    { title: "Design & Quote", description: "Our AV architects create a detailed design with equipment recommendations, cabling diagrams, and a firm quote.", icon: "penTool" },
    { title: "Supply & Stage", description: "All equipment sourced, pre-configured, and tested before on-site installation for minimal disruption.", icon: "wrench" },
    { title: "Install & Integrate", description: "Professional installation by certified AV technicians with structured cabling and control integration.", icon: "zap" },
    { title: "Train & Support", description: "User training for your team, ongoing support, and warranty coverage per your SLA tier.", icon: "headphones" },
  ],
  useCases: [
    { title: "Corporate Headquarters", description: "Multi-room deployments — boardrooms, meeting rooms, huddle spaces, and training facilities.", icon: "building2" },
    { title: "Education", description: "Interactive classrooms, lecture theaters, and collaborative learning spaces.", icon: "monitor" },
    { title: "Government", description: "Secure conference rooms, command centers, and council chambers with professional AV.", icon: "shield" },
    { title: "Hospitality", description: "Ballrooms, event spaces, and executive meeting suites in hotels and resorts.", icon: "users" },
    { title: "Healthcare", description: "Telemedicine suites, training auditoriums, and collaborative diagnostic rooms.", icon: "activity" },
    { title: "Professional Services", description: "Client-facing boardrooms and virtual meeting spaces for legal, finance, and consulting.", icon: "globe" },
  ],
  brands: [
    { name: "Nearity", description: "All-in-one conferencing solutions — authorized UAE distributor." },
    { name: "Samsung", description: "Commercial displays and interactive flat panels." },
    { name: "ViewSonic", description: "Interactive displays for education and corporate environments." },
    { name: "Epson", description: "Professional projectors for large venues and auditoriums." },
    { name: "Crestron", description: "Enterprise-grade control system integration." },
    { name: "UGREEN", description: "Hubs, docking stations, and connectivity accessories." },
  ],
  relatedServices: [
    { name: "AMC Services", description: "Keep your AV investment running with proactive maintenance and support.", href: "/solutions/amc" },
    { name: "Structured Cabling", description: "Certified CAT6/CAT7 and fiber backbone for reliable AV signal transmission.", href: "/solutions/structured-cabling" },
    { name: "IT Infrastructure", description: "Network foundation and server infrastructure to support your AV ecosystem.", href: "/solutions/it-infrastructure" },
    { name: "IP Telephony", description: "Integrate VoIP and unified communications with your meeting room technology.", href: "/solutions/ip-telephony" },
  ],
  ctaSection: {
    heading: "Transform How Your Teams Collaborate",
    description: "From a single huddle room to a 50-room enterprise deployment. Email av@simalme.com — let's design your ideal meeting space.",
    primaryLabel: "Plan My Room",
    primaryLink: "/contact/av-inquiry",
    secondaryLabel: "WhatsApp +971 54 308 8655",
    secondaryLink: "https://wa.me/971543088655",
  },
  overview: enriched("av-meeting-room").overview,
  features: enriched("av-meeting-room").features,
  benefits: enriched("av-meeting-room").benefits,
  meta: {
    title: "AV & Meeting Room Solutions — Nearity Conferencing Dubai | Simal Technologies",
    description:
      "Design, supply and integration of AV and meeting room solutions featuring Nearity all-in-one conferencing systems across the UAE and MEA.",
  },
};

const CLOUD_SECURITY: ServiceDetail = {
  id: "fallback-cloud-security",
  title: "Cloud Security",
  slug: "cloud-security",
  family: "it-services",
  tagline:
    "Advanced cloud security — threat detection, identity & access management, data encryption, compliance management and 24/7 security operations against ransomware, phishing and DDoS.",
  icon: "Shield",
  iconColor: "emerald",
  heroBackgroundImage: {
    url: "/assets/images/services/cloud-security-hero.jpg",
    alt: "Cloud security and cybersecurity protection",
  },
  hero: {
    headline: "Cloud Security Solutions",
    subHeadline:
      "Protect your cloud and hybrid environments with layered defences and a 24/7 Security Operations Centre. From identity to encryption to compliance, we secure what matters most.",
    primaryCtaLabel: "Assess My Security",
    primaryCtaLink: "/contact",
  },
  heroStats: [
    { value: "12 min", label: "Mean Time to Detect", description: "Threats detected within minutes with 24/7 SIEM monitoring and threat intelligence." },
    { value: "47 min", label: "Mean Time to Respond", description: "Incidents contained and remediated in under an hour with automated SOAR playbooks." },
    { value: "99.9%", label: "Spam Detection Accuracy", description: "AI-powered email filtering blocks phishing and BEC attempts before they reach users." },
    { value: "6 Layers", label: "Defense-in-Depth Stack", description: "Endpoint, IAM, email, network, cloud workload, and SIEM/SOC protection." },
  ],
  processSteps: [
    { title: "Risk Assessment", description: "Identify vulnerabilities, assess threat exposure, and evaluate compliance gaps across your environment.", icon: "search" },
    { title: "Architect & Design", description: "Design defense-in-depth security architecture tailored to your threat profile and compliance needs.", icon: "penTool" },
    { title: "Deploy & Configure", description: "Implement security controls, configure policies, and integrate with existing systems.", icon: "wrench" },
    { title: "Monitor & Detect", description: "24/7 monitoring, threat detection, and vulnerability scanning from our Security Operations Centre.", icon: "shield" },
    { title: "Manage & Improve", description: "Regular security reviews, penetration testing, policy updates, and incident response drills.", icon: "activity" },
  ],
  useCases: [
    { title: "Banking & Finance", description: "DIFC/DFSA-regulated environments requiring SIEM, endpoint protection, and compliance documentation.", icon: "building2" },
    { title: "Government", description: "NESA-compliant security architectures with defense-in-depth for critical national infrastructure.", icon: "shield" },
    { title: "Healthcare", description: "HIPAA-aligned protection for PHI with access controls, encryption, and audit logging.", icon: "activity" },
    { title: "Enterprise", description: "Hybrid cloud security spanning on-premises, Azure, and AWS with unified threat management.", icon: "cloud" },
    { title: "E-Commerce", description: "PCI-DSS compliant network segmentation, WAF, and encryption for payment processing.", icon: "globe" },
    { title: "Education", description: "Protect student data and research IP with endpoint protection and email security.", icon: "monitor" },
  ],
  brands: [
    { name: "Sophos", description: "Intercept X Advanced with EDR, XG Series firewalls, and Sophos Central management." },
    { name: "Kaspersky", description: "Internet Security with behavior-based ransomware protection and centralized management." },
    { name: "Microsoft", description: "Azure security services, Defender, and identity management solutions." },
    { name: "SolarWinds", description: "Network monitoring, SIEM, and security event management." },
  ],
  relatedServices: [
    { name: "Firewall Solutions", description: "Sophos XG next-gen firewalls with IPS, application control, and VPN.", href: "/solutions/firewall" },
    { name: "Data Recovery & Storage", description: "Secure, encrypted storage with immutable backups for ransomware resilience.", href: "/solutions/data-recovery-storage" },
    { name: "AMC Services", description: "Ongoing maintenance with security patching and compliance documentation.", href: "/solutions/amc" },
    { name: "Network Security", description: "Defense-in-depth with segmentation, NAC, and vulnerability management.", href: "/solutions/network-security" },
  ],
  ctaSection: {
    heading: "Is Your Business Protected?",
    description: "Get a free security assessment from our certified team. Email security@simalme.com — identify your vulnerabilities before attackers do.",
    primaryLabel: "Free Security Assessment",
    primaryLink: "/contact/security-inquiry",
    secondaryLabel: "WhatsApp +971 54 308 8655",
    secondaryLink: "https://wa.me/971543088655",
  },
  overview: enriched("cloud-security").overview,
  features: enriched("cloud-security").features,
  benefits: enriched("cloud-security").benefits,
  meta: {
    title: "Cloud Security Solutions — SOC, IAM & Encryption | Simal Technologies",
    description:
      "Cloud security including threat detection, IAM, encryption and 24/7 SOC to defend against ransomware, phishing and DDoS across the UAE and MEA.",
  },
};

const DATA_RECOVERY: ServiceDetail = {
  id: "fallback-data-recovery",
  title: "Data Recovery & Storage",
  slug: "data-recovery-storage",
  family: "it-services",
  tagline:
    "Enterprise data recovery and storage architecture — NAS, SAN, cloud storage and backup strategy, plus recovery from failed drives and corrupted systems.",
  icon: "Database",
  iconColor: "teal",
  heroBackgroundImage: {
    url: "/assets/images/services/data-recovery-hero.jpg",
    alt: "Data center server storage and recovery infrastructure",
  },
  hero: {
    headline: "Data Recovery & Storage Solutions",
    subHeadline:
      "Protect and recover what matters most. We architect resilient storage (NAS, SAN, cloud) and recover data from failed drives, corrupted systems and accidental deletion.",
    primaryCtaLabel: "Recover My Data",
    primaryCtaLink: "/contact",
  },
  heroStats: [
    { value: "95%", label: "Recovery Success Rate", description: "Up to 95% success recovering data from failed HDDs, servers, and virtual machines." },
    { value: "Class 100", label: "Clean Room Lab", description: "Professional data recovery in a certified contamination-free environment." },
    { value: "3-2-1", label: "Backup Rule Enforced", description: "Every architecture follows the gold standard — 3 copies, 2 media types, 1 off-site." },
    { value: "< 1 hr", label: "Recovery Time Objective", description: "Snapshot-based restore delivers sub-one-hour RTO for accidental deletion." },
  ],
  processSteps: [
    { title: "Free Evaluation", description: "Submit your failed media; our engineers assess recoverability at no charge.", icon: "search" },
    { title: "Diagnose & Quote", description: "Detailed diagnosis with recovery probability and fixed-price quote — no recovery, no fee.", icon: "fileCheck" },
    { title: "Recover & Image", description: "In our Class 100 clean room, we recover data and create a sector-by-sector image.", icon: "wrench" },
    { title: "Verify & Deliver", description: "You verify recovered data integrity; we deliver on new encrypted media.", icon: "shield" },
    { title: "Return Media", description: "Original media returned or securely destroyed per your preference.", icon: "check" },
  ],
  useCases: [
    { title: "Enterprise IT", description: "Failed server RAID arrays, corrupted VM snapshots, and storage array disasters.", icon: "server" },
    { title: "Engineering & Construction", description: "Large project files (CAD, BIM) requiring high-speed NAS with 10GbE connectivity.", icon: "building2" },
    { title: "Healthcare", description: "PACS medical imaging storage with HIPAA-compliant backup and disaster recovery.", icon: "activity" },
    { title: "Finance", description: "Regulated data retention with immutable cloud backup and compliance documentation.", icon: "lock" },
    { title: "Media & Creative", description: "High-capacity, high-speed storage for 4K/8K video workflows with automated backup.", icon: "monitor" },
    { title: "Education", description: "Research data protection with automated backup and ransomware-resilient storage.", icon: "globe" },
  ],
  brands: [
    { name: "Synology", description: "NAS devices from DS224+ to DS1823xs+ — authorized partner." },
    { name: "Crucial (Micron)", description: "NVMe and SATA SSDs, DDR4/DDR5 RAM — 18 products available." },
    { name: "WD (Western Digital)", description: "HDDs (Blue/Black/Red/Purple/Gold) and NVMe SSDs — complete portfolio." },
    { name: "Samsung", description: "Portable SSDs, NVMe SSDs, and memory cards." },
    { name: "Toshiba", description: "Canvio portable HDDs and enterprise-grade hard drives." },
    { name: "HIKVISION", description: "SATA SSDs, NVMe SSDs, and portable SSDs — 7 products." },
  ],
  relatedServices: [
    { name: "AMC Services", description: "Ongoing storage health monitoring, capacity planning, and backup verification.", href: "/solutions/amc" },
    { name: "Cloud Security", description: "Protect stored data with encryption, access controls, and 24/7 threat monitoring.", href: "/solutions/cloud-security" },
    { name: "Firewall Solutions", description: "Secure your storage networks with next-gen firewall protection.", href: "/solutions/firewall" },
    { name: "IT Infrastructure", description: "Servers, networking, and virtualization to power your storage architecture.", href: "/solutions/it-infrastructure" },
  ],
  ctaSection: {
    heading: "Don't Let Data Loss Shut Down Your Business",
    description: "Free evaluation with no obligation. Email storage@simalme.com — if we can't recover your data, you pay nothing.",
    primaryLabel: "Start Free Evaluation",
    primaryLink: "/contact/storage-inquiry",
    secondaryLabel: "WhatsApp +971 54 308 8655",
    secondaryLink: "https://wa.me/971543088655",
  },
  overview: enriched("data-recovery-storage").overview,
  features: enriched("data-recovery-storage").features,
  benefits: enriched("data-recovery-storage").benefits,
  meta: {
    title: "Data Recovery & Storage Solutions — NAS, SAN, Backup | Simal Technologies",
    description:
      "Enterprise data recovery, NAS/SAN/cloud storage architecture and backup strategy across the UAE and MEA from Simal Technologies.",
  },
};

const FIREWALL: ServiceDetail = {
  id: "fallback-firewall",
  title: "Firewall Solutions",
  slug: "firewall",
  family: "it-services",
  tagline:
    "Next-generation firewall solutions featuring Sophos XG appliances — all-in-one network security with web filtering, application control, IPS, VPN and managed monitoring.",
  icon: "Lock",
  iconColor: "blue",
  heroBackgroundImage: {
    url: "/assets/images/services/firewall-hero.jpg",
    alt: "Network security and firewall protection",
  },
  hero: {
    headline: "Firewall Solutions",
    subHeadline:
      "Enterprise-grade network security built on Sophos XG Series appliances. We design, deploy and manage firewalls that protect against today's threats without slowing your business down.",
    primaryCtaLabel: "Talk to a Security Expert",
    primaryCtaLink: "/contact",
  },
  heroStats: [
    { value: "180 Gbps", label: "Max Firewall Throughput", description: "From XG 85 (3.5 Gbps) to XG 750 (180 Gbps) — sized to your environment." },
    { value: "10,000+", label: "IPS Signatures", description: "Continuously updated threat database with SSL/TLS deep packet inspection." },
    { value: "100%", label: "Branch Coverage", description: "Multi-site deployments with centralized Sophos Central cloud management." },
    { value: "99.99%", label: "VPN Uptime", description: "Site-to-site and remote access VPN with enterprise-grade reliability." },
  ],
  processSteps: [
    { title: "Network Assessment", description: "Evaluate your current perimeter, traffic patterns, security gaps, and capacity requirements.", icon: "search" },
    { title: "Design & Size", description: "Select and size the right Sophos XG appliance with appropriate licensing and features.", icon: "penTool" },
    { title: "Deploy & Configure", description: "Professional installation, policy configuration, IPS tuning, and VPN setup.", icon: "wrench" },
    { title: "Test & Validate", description: "Penetration testing, policy verification, and failover testing before go-live.", icon: "shield" },
    { title: "Monitor & Manage", description: "24/7 monitoring, firmware updates, policy tuning, and monthly reporting via Sophos Central.", icon: "activity" },
  ],
  useCases: [
    { title: "Multi-Site Retail", description: "Standardized firewall across all stores with SD-WAN and centralized cloud management.", icon: "globe" },
    { title: "Banking & Finance", description: "IPS, web filtering, and application control for PCI-DSS and regulatory compliance.", icon: "building2" },
    { title: "Government", description: "NESA-aligned perimeter security with hardware failover and encrypted VPN tunnels.", icon: "shield" },
    { title: "Enterprise HQ", description: "Dual firewalls in HA with deep packet inspection for 500–5,000+ users.", icon: "server" },
    { title: "Data Center", description: "High-throughput XG 330–430 series with 35–50 Gbps firewall capacity.", icon: "cloud" },
    { title: "Education", description: "Content filtering, guest WiFi isolation, and application control across campus networks.", icon: "monitor" },
  ],
  brands: [
    { name: "Sophos", description: "XG Series next-gen firewalls — Platinum Partner with complete ecosystem expertise." },
    { name: "Belkin", description: "Structured cabling and network connectivity infrastructure." },
    { name: "UGREEN", description: "Network cables, hubs, and connectivity accessories." },
    { name: "HPE (Aruba)", description: "Wireless controllers and network infrastructure integration." },
  ],
  relatedServices: [
    { name: "Cloud Security", description: "Extend protection beyond the perimeter with endpoint, IAM, and SIEM security.", href: "/solutions/cloud-security" },
    { name: "AMC Services", description: "Ongoing maintenance, firmware updates, and 24/7 support for your firewall estate.", href: "/solutions/amc" },
    { name: "Network Security", description: "Defense-in-depth with segmentation, NAC, and vulnerability management.", href: "/solutions/network-security" },
    { name: "IT Infrastructure", description: "Servers, switching, and networking foundation for your security architecture.", href: "/solutions/it-infrastructure" },
  ],
  ctaSection: {
    heading: "Ready to Secure Your Network Perimeter?",
    description: "Get a free network assessment and Sophos XG sizing recommendation. Email firewall@simalme.com — protect your business today.",
    primaryLabel: "Get Free Network Assessment",
    primaryLink: "/contact/firewall-inquiry",
    secondaryLabel: "WhatsApp +971 54 308 8655",
    secondaryLink: "https://wa.me/971543088655",
  },
  overview: enriched("firewall").overview,
  features: enriched("firewall").features,
  benefits: enriched("firewall").benefits,
  meta: {
    title: "Firewall Solutions — Sophos XG Managed Firewall Dubai | Simal Technologies",
    description:
      "Next-generation Sophos XG firewall solutions with IPS, VPN, web filtering and 24/7 managed monitoring across the UAE and MEA.",
  },
};

const IT_INFRA: ServiceDetail = {
  id: "fallback-it-infrastructure",
  title: "IT Infrastructure Solutions",
  slug: "it-infrastructure",
  family: "it-services",
  tagline:
    "Scalable IT infrastructure — servers, storage, virtualization, networking and power — designed, supplied and deployed as a resilient foundation for your business.",
  icon: "Server",
  iconColor: "indigo",
  hero: {
    headline: "IT Infrastructure Solutions",
    subHeadline:
      "Build a foundation that scales. We design and deploy servers, storage, virtualization and networking engineered for performance, availability and growth — on-prem, hybrid or cloud.",
    primaryCtaLabel: "Design My Infrastructure",
    primaryCtaLink: "/contact",
  },
  overview: enriched("it-infrastructure").overview,
  features: enriched("it-infrastructure").features,
  benefits: enriched("it-infrastructure").benefits,
  meta: {
    title: "IT Infrastructure Solutions — Servers, Storage & Virtualization | Simal Technologies",
    description:
      "Design, supply and deployment of scalable IT infrastructure — servers, storage, virtualization and networking across the UAE and MEA.",
  },
};

const MANAGED_SERVICES: ServiceDetail = {
  id: "fallback-managed-services",
  title: "Managed Services",
  slug: "managed-services",
  family: "it-services",
  tagline:
    "Fully outsourced IT operations — proactive monitoring, maintenance, patching, helpdesk and troubleshooting under one SLA-backed agreement.",
  icon: "ClipboardList",
  iconColor: "gold",
  hero: {
    headline: "Managed IT Services",
    subHeadline:
      "Let us run your IT so you can run your business. We monitor, maintain, patch and support your entire environment 24/7 — proactively preventing issues before they slow you down.",
    primaryCtaLabel: "Get a Managed IT Quote",
    primaryCtaLink: "/contact",
  },
  overview: enriched("managed-services").overview,
  features: enriched("managed-services").features,
  benefits: enriched("managed-services").benefits,
  meta: {
    title: "Managed IT Services — 24/7 Monitoring & Helpdesk | Simal Technologies",
    description:
      "Outsourced IT management — monitoring, patching, helpdesk and troubleshooting with SLA-backed support across the UAE and MEA.",
  },
};

const NETWORK_SECURITY: ServiceDetail = {
  id: "fallback-network-security",
  title: "Network & IT Security Solutions",
  slug: "network-security",
  family: "it-services",
  tagline:
    "Defense-in-depth security — perimeter firewalls, segmentation, endpoint protection, access control and 24/7 threat detection across your entire environment.",
  icon: "Shield",
  iconColor: "rose",
  hero: {
    headline: "Network & IT Security Solutions",
    subHeadline:
      "Protect every layer. We combine perimeter, network, endpoint and access security with round-the-clock threat detection — so attacks are blocked, detected and contained before they reach your data.",
    primaryCtaLabel: "Assess My Security",
    primaryCtaLink: "/contact",
  },
  overview: enriched("network-security").overview,
  features: enriched("network-security").features,
  benefits: enriched("network-security").benefits,
  meta: {
    title: "Network & IT Security Solutions — Defense in Depth | Simal Technologies",
    description:
      "Layered network and IT security — firewalls, segmentation, endpoint protection and 24/7 threat detection across the UAE and MEA.",
  },
};

const SOFTWARE_LICENSING: ServiceDetail = {
  id: "fallback-software-licensing",
  title: "Software & Licensing Support",
  slug: "software-licensing",
  family: "it-services",
  tagline:
    "Software procurement, activation, subscription management and compliance — genuine licensing for Microsoft, Adobe, Autodesk and more, optimized for cost.",
  icon: "FileText",
  iconColor: "pink",
  hero: {
    headline: "Software & Licensing Support",
    subHeadline:
      "Stay compliant and control spend. We procure, activate and manage genuine software and licensing for Microsoft, Adobe, Autodesk and more — always right-sized, always audit-ready.",
    primaryCtaLabel: "Review My Licensing",
    primaryCtaLink: "/contact",
  },
  overview: enriched("software-licensing").overview,
  features: enriched("software-licensing").features,
  benefits: enriched("software-licensing").benefits,
  meta: {
    title: "Software & Licensing Support — Microsoft, Adobe & Autodesk | Simal Technologies",
    description:
      "Software procurement, license management, compliance and activation for Microsoft, Adobe and Autodesk across the UAE and MEA.",
  },
};

const STRUCTURED_CABLING: ServiceDetail = {
  id: "fallback-structured-cabling",
  title: "Structured Cabling",
  slug: "structured-cabling",
  family: "it-services",
  tagline:
    "Certified CAT6/CAT7 copper and fiber structured cabling — site survey, design, installation, testing and documentation to industry standards.",
  icon: "Network",
  iconColor: "teal",
  hero: {
    headline: "Structured Cabling Solutions",
    subHeadline:
      "A reliable network starts with reliable cabling. We design, install and certify CAT6/CAT7 copper and fiber backbones — fully tested, labeled and documented for offices, data centres and campuses.",
    primaryCtaLabel: "Plan My Cabling",
    primaryCtaLink: "/contact",
  },
  overview: enriched("structured-cabling").overview,
  features: enriched("structured-cabling").features,
  benefits: enriched("structured-cabling").benefits,
  meta: {
    title: "Structured Cabling — CAT6/CAT7 & Fiber Installation | Simal Technologies",
    description:
      "Certified structured cabling design, installation and testing — CAT6/CAT7 copper and fiber across the UAE and MEA.",
  },
};

const SUPPORT_MAINTENANCE: ServiceDetail = {
  id: "fallback-support-maintenance",
  title: "Support and Maintenance",
  slug: "support-maintenance",
  family: "it-services",
  tagline:
    "Break-fix troubleshooting, preventive maintenance and updates — fast remote and on-site response to minimize downtime across your IT estate.",
  icon: "Headphones",
  iconColor: "orange",
  hero: {
    headline: "Support and Maintenance",
    subHeadline:
      "Keep every system running. Our certified engineers respond fast — remotely or on-site — to troubleshoot, update and maintain your hardware and software, minimizing downtime.",
    primaryCtaLabel: "Get Support",
    primaryCtaLink: "/contact",
  },
  overview: enriched("support-maintenance").overview,
  features: enriched("support-maintenance").features,
  benefits: enriched("support-maintenance").benefits,
  meta: {
    title: "IT Support and Maintenance — Break-Fix & Preventive Care | Simal Technologies",
    description:
      "Break-fix troubleshooting, preventive maintenance and updates with fast remote and on-site response across the UAE and MEA.",
  },
};

const IP_TELEPHONY: ServiceDetail = {
  id: "fallback-ip-telephony",
  title: "IP Telephony Solutions",
  slug: "ip-telephony",
  family: "it-services",
  tagline:
    "Scalable VoIP telephony — IP PBX, handsets, SIP trunks and unified communications that integrate with your network and cut call costs.",
  icon: "Phone",
  iconColor: "blue",
  hero: {
    headline: "IP Telephony Solutions",
    subHeadline:
      "Modernize your voice. We design and deploy scalable VoIP systems — IP PBX, handsets, SIP trunks and unified communications — that integrate seamlessly with your network and lower your bills.",
    primaryCtaLabel: "Upgrade My Phones",
    primaryCtaLink: "/contact",
  },
  overview: enriched("ip-telephony").overview,
  features: enriched("ip-telephony").features,
  benefits: enriched("ip-telephony").benefits,
  meta: {
    title: "IP Telephony Solutions — VoIP, IP PBX & SIP Trunking | Simal Technologies",
    description:
      "Scalable IP telephony and VoIP — IP PBX, SIP trunking and unified communications across the UAE and MEA.",
  },
};

export const SERVICE_FALLBACKS: Record<string, ServiceDetail> = {
  [AMC.slug]: AMC,
  [AV.slug]: AV,
  [CLOUD_SECURITY.slug]: CLOUD_SECURITY,
  [DATA_RECOVERY.slug]: DATA_RECOVERY,
  [FIREWALL.slug]: FIREWALL,
  [IT_INFRA.slug]: IT_INFRA,
  [MANAGED_SERVICES.slug]: MANAGED_SERVICES,
  [NETWORK_SECURITY.slug]: NETWORK_SECURITY,
  [SOFTWARE_LICENSING.slug]: SOFTWARE_LICENSING,
  [STRUCTURED_CABLING.slug]: STRUCTURED_CABLING,
  [SUPPORT_MAINTENANCE.slug]: SUPPORT_MAINTENANCE,
  [IP_TELEPHONY.slug]: IP_TELEPHONY,
};

const toSummary = (s: ServiceDetail): ServiceSummary => ({
  id: s.id,
  title: s.title,
  slug: s.slug,
  family: s.family,
  tagline: s.tagline,
  icon: s.icon,
  iconColor: s.iconColor,
  customHref: s.customHref,
});

/** Ordered fallback list (hub + sub-nav) when the CMS has no published services. */
export const FALLBACK_SERVICES: ServiceSummary[] = [
  AMC,
  AV,
  CLOUD_SECURITY,
  DATA_RECOVERY,
  FIREWALL,
  IT_INFRA,
  MANAGED_SERVICES,
  NETWORK_SECURITY,
  SOFTWARE_LICENSING,
  STRUCTURED_CABLING,
  SUPPORT_MAINTENANCE,
  IP_TELEPHONY,
].map(toSummary);
