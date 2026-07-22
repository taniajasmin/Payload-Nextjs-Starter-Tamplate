// seed/data/services.ts — fixture data from seed-services route

export interface ServiceSeed {
  slug: string;
  title: string;
  family: "it-services" | "software-erp";
  status: "draft" | "published";
  icon: string;
  iconColor: string;
  tagline: string;
  customHref?: string;
  hero?: Record<string, unknown>;
  overview?: string;
  features?: Array<{ title: string; description: string }>;
  meta?: { title: string; description: string };
}

export const SERVICES: ServiceSeed[] = [
  {
    slug: "amc",
    title: "Annual Maintenance Contract (AMC)",
    family: "it-services",
    status: "published",
    icon: "Wrench",
    iconColor: "orange",
    tagline:
      "Comprehensive maintenance for hardware, software and network infrastructure — with defined SLA tiers, proactive monitoring and 24/7 support options.",
    hero: {
      headline: "Annual Maintenance Contract (AMC)",
      subHeadline:
        "Keep your infrastructure running without an in-house IT team. Our certified engineers monitor, maintain and resolve issues before they disrupt your business.",
      primaryCtaLabel: "Request a Quote",
      primaryCtaLink: "/contact",
      secondaryCtaLabel: "Explore IT Solutions",
      secondaryCtaLink: "/services",
    },
    overview:
      "<p>Our Annual Maintenance Contract covers the complete technology lifecycle — from routine preventive maintenance to rapid incident response. Whether you need to augment an internal IT team or fully outsource operations, we tailor coverage to your environment.</p><h2>What you get</h2><ul><li>Defined SLA tiers (Standard, Business, Mission-Critical) with guaranteed response times</li><li>Proactive monitoring of servers, networks and endpoints</li><li>On-site and remote support across the UAE and wider MEA region</li><li>Detailed reporting and a dedicated account manager</li></ul>",
    features: [
      {
        title: "Proactive Monitoring",
        description:
          "24/7 monitoring of critical infrastructure with alerting and trend analysis.",
      },
      {
        title: "SLA-Backed Response",
        description:
          "Tiered response times from next-business-day to 4-hour on-site.",
      },
      {
        title: "Certified Engineers",
        description:
          "Vendor-trained engineers across the brands we distribute and beyond.",
      },
      {
        title: "Preventive Maintenance",
        description:
          "Scheduled health checks, firmware updates and patch management.",
      },
    ],
    meta: {
      title:
        "Annual Maintenance Contract (AMC) — IT Support Dubai | Simal Technologies",
      description:
        "SLA-backed AMC covering hardware, software and network infrastructure with proactive monitoring and 24/7 support across the UAE and MEA.",
    },
  },
  {
    slug: "firewall",
    title: "Firewall Solutions",
    family: "it-services",
    status: "published",
    icon: "Lock",
    iconColor: "blue",
    tagline:
      "Next-generation firewall solutions featuring Sophos XG appliances — all-in-one network security with web filtering, application control, IPS, VPN and managed monitoring.",
    hero: {
      headline: "Firewall Solutions",
      subHeadline:
        "Enterprise-grade network security built on Sophos XG Series appliances. We design, deploy and manage firewalls that protect against today's threats without slowing your business down.",
      primaryCtaLabel: "Talk to a Security Expert",
      primaryCtaLink: "/contact",
    },
    overview:
      "<p>Our managed firewall service combines best-of-breed Sophos XG hardware with round-the-clock monitoring and response. You get comprehensive protection — web filtering, application control, intrusion prevention (IPS), site-to-site VPN and user-based policies — from a single partner.</p><h2>Capabilities</h2><ul><li>Next-generation firewalling with Sophos XG Series</li><li>Intrusion prevention (IPS) and application visibility</li><li>Secure site-to-site and remote-access VPN</li><li>User-based policies and web filtering</li><li>Managed monitoring, tuning and incident response</li></ul>",
    features: [
      {
        title: "Sophos XG Expertise",
        description:
          "Design, deployment and licensing of Sophos XG Series appliances.",
      },
      {
        title: "Intrusion Prevention",
        description:
          "IPS tuned to your environment to block known and emerging threats.",
      },
      {
        title: "Secure VPN",
        description:
          "Site-to-site and remote-access VPN with modern encryption.",
      },
      {
        title: "Managed Monitoring",
        description:
          "24/7 monitoring, rule tuning and rapid incident response.",
      },
    ],
    meta: {
      title:
        "Firewall Solutions — Sophos XG Managed Firewall Dubai | Simal Technologies",
      description:
        "Next-generation Sophos XG firewall solutions with IPS, VPN, web filtering and 24/7 managed monitoring across the UAE and MEA.",
    },
  },
  {
    slug: "cloud-security",
    title: "Cloud Security",
    family: "it-services",
    status: "published",
    icon: "Shield",
    iconColor: "emerald",
    tagline:
      "Advanced cloud security — threat detection, identity & access management, data encryption, compliance management and 24/7 security operations against ransomware, phishing and DDoS.",
    hero: {
      headline: "Cloud Security Solutions",
      subHeadline:
        "Protect your cloud and hybrid environments with layered defences and a 24/7 Security Operations Centre. From identity to encryption to compliance, we secure what matters most.",
      primaryCtaLabel: "Assess My Security",
      primaryCtaLink: "/contact",
    },
    overview:
      "<p>Our cloud security practice defends against ransomware, phishing, DDoS and advanced persistent threats. We combine tooling, process and people to give you continuous protection and demonstrable compliance.</p><h2>What we secure</h2><ul><li>Identity & access management (IAM) and zero-trust controls</li><li>Data encryption in transit and at rest</li><li>Threat detection and response (SIEM/SOC)</li><li>Compliance management for regional regulations</li></ul>",
    features: [
      {
        title: "Identity & Access",
        description: "IAM, MFA and zero-trust access controls.",
      },
      {
        title: "Threat Detection",
        description:
          "SIEM-backed detection with a 24/7 Security Operations Centre.",
      },
      {
        title: "Data Encryption",
        description: "Encryption in transit and at rest, with key management.",
      },
      {
        title: "Compliance",
        description:
          "Mapping and evidence for regional regulatory requirements.",
      },
    ],
    meta: {
      title:
        "Cloud Security Solutions — SOC, IAM & Encryption | Simal Technologies",
      description:
        "Cloud security including threat detection, IAM, encryption and 24/7 SOC to defend against ransomware, phishing and DDoS across the UAE and MEA.",
    },
  },
  {
    slug: "av-meeting-room",
    title: "AV & Meeting Room Solutions",
    family: "it-services",
    status: "published",
    icon: "Video",
    iconColor: "purple",
    tagline:
      "Audio-visual and meeting room solutions featuring Nearity all-in-one conferencing systems — design, installation and integration for any space.",
    hero: {
      headline: "AV & Meeting Room Solutions",
      subHeadline:
        "From huddle rooms to conference halls, we design, supply and integrate audio-visual and conferencing systems built around Nearity all-in-one devices — crystal-clear meetings, every time.",
      primaryCtaLabel: "Plan My Room",
      primaryCtaLink: "/contact",
    },
    overview:
      "<p>We deliver end-to-end meeting room solutions featuring <strong>Nearity</strong> all-in-one conferencing systems, professional displays, audio equipment and control systems. Our team handles design, supply, installation and integration — tuned to the acoustics, layout and use of each space.</p><h2>Spaces we equip</h2><ul><li>Huddle rooms and small meeting rooms</li><li>Boardrooms and executive suites</li><li>Training facilities and classrooms</li><li>Conference halls and auditoriums</li></ul>",
    features: [
      {
        title: "Nearity Conferencing",
        description:
          "All-in-one devices (e.g. C30R) with AI audio, camera and speaker — purpose-built for business.",
      },
      {
        title: "Professional Displays",
        description:
          "Right-sized screens and interactive panels for every room.",
      },
      {
        title: "Room Design",
        description:
          "Layout, sightline and acoustic design tailored to each space.",
      },
      {
        title: "Install & Integration",
        description:
          "Clean installation, cabling, configuration and user handover.",
      },
    ],
    meta: {
      title:
        "AV & Meeting Room Solutions — Nearity Conferencing Dubai | Simal Technologies",
      description:
        "Design, supply and integration of AV and meeting room solutions featuring Nearity all-in-one conferencing systems across the UAE and MEA.",
    },
  },
  {
    slug: "data-recovery-storage",
    title: "Data Recovery & Storage",
    family: "it-services",
    status: "published",
    icon: "Database",
    iconColor: "teal",
    tagline:
      "Enterprise data recovery and storage architecture — NAS, SAN, cloud storage and backup strategy, plus recovery from failed drives and corrupted systems.",
    hero: {
      headline: "Data Recovery & Storage Solutions",
      subHeadline:
        "Protect and recover what matters most. We architect resilient storage (NAS, SAN, cloud) and recover data from failed drives, corrupted systems and accidental deletion.",
      primaryCtaLabel: "Recover My Data",
      primaryCtaLink: "/contact",
    },
    overview:
      "<p>Our storage practice combines architecture, backup strategy and emergency recovery. We design resilient storage platforms and stand ready to recover your data when the worst happens.</p><h2>What we do</h2><ul><li>Storage architecture — NAS, SAN and cloud storage design</li><li>Backup & disaster-recovery strategy (3-2-1)</li><li>Data recovery from failed drives and corrupted systems</li><li>Recovery from accidental deletion and logical damage</li></ul>",
    features: [
      {
        title: "Storage Architecture",
        description:
          "NAS, SAN and cloud storage sized to your workload and growth.",
      },
      {
        title: "Backup Strategy",
        description:
          "3-2-1 backup and disaster-recovery planning that survives real failures.",
      },
      {
        title: "Data Recovery",
        description:
          "Recovery from failed drives, corruption and accidental deletion.",
      },
      {
        title: "Resilience Review",
        description:
          "Health checks and hardening for existing storage and backups.",
      },
    ],
    meta: {
      title:
        "Data Recovery & Storage Solutions — NAS, SAN, Backup | Simal Technologies",
      description:
        "Enterprise data recovery, NAS/SAN/cloud storage architecture and backup strategy across the UAE and MEA from Simal Technologies.",
    },
  },
];

export default SERVICES;
