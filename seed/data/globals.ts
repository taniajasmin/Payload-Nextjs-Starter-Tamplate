// seed/data/globals.ts — fixture data

const HEADER_DATA = {
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
    label: "Request a Quote",
    href: "/contact?topic=rfq",
    show: true,
  },
  navItems: [
    // ── 1. IT Distribution (mega menu) ──
    {
      label: "IT Distribution",
      link: "/hardware/product-catalog",
      status: "published",
      hasDropdown: true,
      dropdownVariant: "mega",
      children: [
        {
          label: "Storage & Memory",
          link: "/hardware/product-catalog?category=storage-memory",
          description: "SSDs, RAM, HDDs & flash storage",
          icon: "HardDrive",
          section: "Product Catalog",
          status: "published",
        },
        {
          label: "Networking",
          link: "/hardware/product-catalog?category=networking",
          description: "Routers, switches, APs & connectivity",
          icon: "Wifi",
          section: "Product Catalog",
          status: "published",
        },
        {
          label: "Accessories",
          link: "/hardware/product-catalog?category=accessories",
          description: "Hubs, cables, docks & peripherals",
          icon: "Headphones",
          section: "Product Catalog",
          status: "published",
        },
        {
          label: "Computing",
          link: "/hardware/product-catalog?category=computing",
          description: "Laptops, desktops & workstations",
          icon: "Laptop",
          section: "Product Catalog",
          status: "published",
        },
        {
          label: "Surveillance",
          link: "/hardware/product-catalog?category=surveillance",
          description: "IP cameras, NVRs & security systems",
          icon: "Video",
          section: "Product Catalog",
          status: "published",
        },
        {
          label: "Mobility",
          link: "/hardware/product-catalog?category=mobility",
          description: "Tablets, smartphones & mobile accessories",
          icon: "Smartphone",
          section: "Product Catalog",
          status: "published",
        },
        {
          label: "Monitors & Displays",
          link: "/hardware/product-catalog?category=monitors-displays",
          description: "Professional, gaming & ultrawide displays",
          icon: "Monitor",
          section: "Product Catalog",
          status: "published",
        },
        {
          label: "Power & Cooling",
          link: "/hardware/product-catalog?category=power-cooling",
          description: "UPS, surge protectors & cooling",
          icon: "Zap",
          section: "Product Catalog",
          status: "published",
        },
        {
          label: "View All",
          link: "/hardware/product-catalog",
          kind: "viewAll",
          section: "Product Catalog",
          status: "published",
        },
      ],
    },
    // ── 2. Solutions & Services (mega menu) ──
    {
      label: "Solutions & Services",
      link: "/erp",
      status: "published",
      hasDropdown: true,
      dropdownVariant: "mega",
      children: [
        // By Industry
        {
          label: "Agriculture",
          link: "/erp/industries/agriculture",
          section: "By Industry",
          description: "Farm management, traceability & cold chain",
          icon: "Globe",
          status: "published",
        },
        {
          label: "Education",
          link: "/erp/industries/education",
          section: "By Industry",
          description: "Student management, academics & fees",
          icon: "GraduationCap",
          status: "published",
        },
        {
          label: "Government",
          link: "/erp/industries/government",
          section: "By Industry",
          description: "Tender management & compliance",
          icon: "Landmark",
          status: "published",
        },
        {
          label: "Healthcare",
          link: "/erp/industries/healthcare",
          section: "By Industry",
          description: "Patient records, billing & lab management",
          icon: "HeartPulse",
          status: "published",
        },
        {
          label: "Hospitality",
          link: "/erp/industries/hospitality",
          section: "By Industry",
          description: "Property management, F&B & guest experience",
          icon: "Building2",
          status: "published",
        },
        {
          label: "Logistics & Supply Chain",
          link: "/erp/industries/logistics-supply-chain",
          section: "By Industry",
          description: "Fleet management, warehousing & order tracking",
          icon: "Truck",
          status: "published",
        },
        {
          label: "Manufacturing",
          link: "/erp/industries/manufacturing",
          section: "By Industry",
          description: "Production planning, quality control & shop floor",
          icon: "Factory",
          status: "published",
        },
        {
          label: "Professional Services",
          link: "/erp/industries/services",
          section: "By Industry",
          description: "Professional services & project billing",
          icon: "Briefcase",
          status: "published",
        },
        {
          label: "Retail & Distribution",
          link: "/erp/industries/retail-distribution",
          section: "By Industry",
          description: "POS, eCommerce & loyalty",
          icon: "Store",
          status: "published",
        },
        {
          label: "Banking & Finance",
          link: "/erp/industries/banking-finance",
          section: "By Industry",
          description: "Compliance, risk management & financial reporting",
          icon: "CreditCard",
          status: "published",
        },
        {
          label: "View All Industries",
          link: "/erp/industries",
          kind: "viewAll",
          section: "By Industry",
          status: "published",
        },
        // ERP Platform
        {
          label: "UniERP Overview",
          link: "/erp",
          section: "ERP Platform",
          description: "Full-range ERP built on Odoo 19 Community",
          icon: "LayoutGrid",
          status: "published",
        },
        {
          label: "Finance & Accounting",
          link: "/erp/finance-accounting",
          section: "ERP Platform",
          description: "GL, AR/AP, UniVAT — NBR approved",
          icon: "Calculator",
          status: "published",
        },
        {
          label: "HR & Payroll",
          link: "/erp/hr-payroll",
          section: "ERP Platform",
          description: "Employee lifecycle, attendance & payroll",
          icon: "Users",
          status: "published",
        },
        {
          label: "Inventory & Supply Chain",
          link: "/erp/inventory-supply-chain",
          section: "ERP Platform",
          description: "Warehouse, procurement & barcode scanning",
          icon: "Package",
          status: "published",
        },
        {
          label: "Manufacturing",
          link: "/erp/manufacturing",
          section: "ERP Platform",
          description: "Production planning, BOM & MRP",
          icon: "Settings",
          status: "published",
        },
        {
          label: "Project Management",
          link: "/erp/project-management",
          section: "ERP Platform",
          description: "Planning, Gantt charts & profitability",
          icon: "ClipboardList",
          status: "published",
        },
        {
          label: "Sales & CRM",
          link: "/erp/sales-crm",
          section: "ERP Platform",
          description: "Pipeline, quotations & customer 360",
          icon: "TrendingUp",
          status: "published",
        },
        {
          label: "View All",
          link: "/erp",
          kind: "viewAll",
          section: "ERP Platform",
          status: "published",
        },
        // IT Solutions & Services
        {
          label: "AMC",
          link: "/solutions/amc",
          section: "IT Solutions & Services",
          description: "Annual maintenance contracts for IT infrastructure",
          icon: "Wrench",
          status: "published",
        },
        {
          label: "AV & Meeting Room",
          link: "/solutions/av-meeting-room",
          section: "IT Solutions & Services",
          description: "Conference & collaboration solutions",
          icon: "Video",
          status: "published",
        },
        {
          label: "Cloud Security",
          link: "/solutions/cloud-security",
          section: "IT Solutions & Services",
          description: "Threat detection, IAM & compliance management",
          icon: "Shield",
          status: "published",
        },
        {
          label: "Data Recovery & Storage",
          link: "/solutions/data-recovery-storage",
          section: "IT Solutions & Services",
          description: "NAS, SAN, backup & recovery services",
          icon: "Database",
          status: "published",
        },
        {
          label: "Firewall Solutions",
          link: "/solutions/firewall",
          section: "IT Solutions & Services",
          description: "Next-gen firewall with 24/7 monitoring",
          icon: "Lock",
          status: "published",
        },
        {
          label: "View All",
          link: "/solutions",
          kind: "viewAll",
          section: "IT Solutions & Services",
          status: "published",
        },
      ],
    },
    // ── 3. Partners ──
    {
      label: "Partners",
      link: "/partners",
      status: "published",
      hasDropdown: false,
      children: [],
    },
    // ── 4. Resources (simple dropdown) ──
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
          icon: "Newspaper",
          status: "published",
        },
        {
          label: "Case Studies",
          link: "/resources/case-studies",
          description: "Customer success stories & deployments",
          icon: "FileText",
          status: "published",
        },
        {
          label: "White Papers",
          link: "/resources/white-papers",
          description: "In-depth technical & strategy papers",
          icon: "BookOpen",
          status: "published",
        },
        {
          label: "FAQ",
          link: "/resources/faq",
          description: "Answers to common questions",
          icon: "HelpCircle",
          status: "published",
        },
        {
          label: "Downloads & Datasheets",
          link: "/resources/datasheets",
          description: "PDF specifications & documentation",
          icon: "Box",
          status: "published",
        },
      ],
    },
    // ── 5. About (simple dropdown) ──
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
          icon: "Building2",
          status: "published",
        },
        {
          label: "Leadership Team",
          link: "/about/leadership",
          description: "Meet the people behind Simal",
          icon: "Users",
          status: "published",
        },
        {
          label: "Mission, Vision & Values",
          link: "/about/mission-vision",
          description: "What drives us every day",
          icon: "Lightbulb",
          status: "published",
        },
        {
          label: "Awards & Achievements",
          link: "/about/awards",
          description: "Industry recognition & milestones",
          icon: "Award",
          status: "published",
        },
        {
          label: "Why Choose Us",
          link: "/about/why-us",
          description: "7 key service pillars & competitive advantages",
          icon: "TrendingUp",
          status: "published",
        },
        {
          label: "Certifications & Partnerships",
          link: "/about/certifications",
          description: "Authorized distributor badges & industry certs",
          icon: "Shield",
          status: "published",
        },
        {
          label: "CSR & Sustainability",
          link: "/about/csr",
          description: "Our commitment to community & environment",
          icon: "Sparkles",
          status: "published",
        },
      ],
    },
    // ── 6. Careers ──
    {
      label: "Careers",
      link: "/careers",
      status: "published",
      hasDropdown: false,
      children: [],
    },
    // ── 7. Contact ──
    {
      label: "Contact",
      link: "/contact",
      status: "published",
      hasDropdown: false,
      children: [],
    },
  ],
};

const FOOTER_DATA = {
  brandName: "Simal Technologies",
  brandSubtitle: "Middle East LLC",
  brandDescription:
    "Premier IT distributor in Dubai, UAE with 20+ years experience. Authorized distributor for 20+ global brands. Delivering authentic IT products across the Middle East, Africa, and CIS.",
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
    { platform: "whatsapp", url: "https://wa.me/971543088655" },
  ],
  footerColumns: [
    {
      title: "Company",
      links: [
        { label: "About us", href: "/about" },
        { label: "careers", href: "/careers" },
        { label: "contact", href: "/contact" },
        { label: "Blog & Events", href: "/blog" },
      ],
    },
    {
      title: "Products",
      links: [
        { label: "Product Catalog", href: "/hardware/product-catalog" },
        { label: "Brands", href: "/brands" },
        { label: "Product Category", href: "/brands?tab=categories" },
        { label: "RFQ / Inquiry", href: "/contact" },
        {
          label: "New Arrivals",
          href: "/hardware/product-catalog?sort=newest",
        },
      ],
    },
    {
      title: "Support",
      links: [
        { label: "Contact Support", href: "/contact" },
        { label: "Sales Inquiry", href: "/contact" },
        { label: "Our Offices", href: "/contact" },
        { label: "Regional Contacts", href: "/contact" },
        { label: "General Inquiry", href: "/contact" },
      ],
    },
  ],
  contactPhone: "+971 4 393 0507",
  contactEmail: "info@simalme.com",
  contactAddress: "Office 201, Dar Al Riffa Building, Bur Dubai, UAE",
  vatNumber: "100207478700003",
  tradeLicense: "49740",
  chamberMember: "Dubai Chamber Member",
  copyright:
    "© {year} Simal Technologies Middle East LLC. A TwinMOS Group Company. All rights reserved.",
  parentCompany: { name: "TwinMOS Group", url: "https://twinmos.com" },
};

const SITE_SETTINGS_DATA = {
  siteName: "Simal Technologies",
  defaultEmail: "info@simalme.com",
  defaultPhone: "+971 4 393 0507",
  address:
    "Dubai Internet City, Building 14, Office 301\nDubai, United Arab Emirates",
  socialLinks: [
    {
      platform: "LinkedIn",
      url: "https://www.linkedin.com/company/simal-technologies",
    },
    { platform: "Twitter", url: "https://twitter.com/simaltech" },
    {
      platform: "Facebook",
      url: "https://www.facebook.com/simaltechnologies",
    },
    {
      platform: "Instagram",
      url: "https://www.instagram.com/simaltechnologies",
    },
  ],
  defaultSeo: {
    title: "Simal Technologies — Premier IT Distributor | Dubai, UAE",
    description:
      "Simal Technologies Middle East LLC — authorized IT distributor for 20+ global brands. 76+ products across MEA, CIS & GCC.",
  },
};

const HOMEPAGE_DATA = {
  heroSlides: [
    {
      headline: "Your Trusted IT Distribution Partner",
      subHeadline:
        "Authorized distributor for 20+ world-class brands across the Middle East, Africa & CIS regions",
      ctaLabel: "Explore Products",
      ctaLink: "/hardware/product-catalog",
    },
    {
      headline: "76+ Products, One Source",
      subHeadline:
        "Computer components, accessories, monitors, gaming gear, and laptops — all under one roof",
      ctaLabel: "View Catalog",
      ctaLink: "/hardware/product-catalog",
    },
    {
      headline: "Enterprise Storage Solutions",
      subHeadline:
        "NVMe SSDs, portable drives, and data center storage from Crucial, Samsung, HIKVISION and more",
      ctaLabel: "Shop Storage",
      ctaLink: "/hardware/computer-components",
    },
    {
      headline: "Professional Display Solutions",
      subHeadline:
        "Gaming monitors, business displays, and ultrawide screens from Aiwa and KOORUI",
      ctaLabel: "View Monitors",
      ctaLink: "/hardware/monitors",
    },
    {
      headline: "Connectivity & Peripherals",
      subHeadline:
        "USB-C hubs, docking stations, cables, and surge protectors from UGREEN and Honeywell",
      ctaLabel: "Browse Accessories",
      ctaLink: "/hardware/computer-accessories",
    },
    {
      headline: "20+ Global Brands, One Distributor",
      subHeadline:
        "Crucial, HIKVISION, UGREEN, Samsung, Lenovo, Dell, HP and more — all authentic, all warrantied",
      ctaLabel: "View Brands",
      ctaLink: "/brands",
    },
    {
      headline: "Gaming Performance Unleashed",
      subHeadline:
        "High-refresh monitors, gaming GPUs, and fast NVMe storage for competitive and casual gamers",
      ctaLabel: "Shop Gaming",
      ctaLink: "/hardware/gaming",
    },
  ],
  // NOTE: featuredProducts, featuredBrands, featuredTestimonials, and stats
  // are populated dynamically at seed time (IDs from previously seeded records).
  featuredProducts: [] as (string | number)[],
  featuredBrands: [] as (string | number)[],
  featuredTestimonials: [] as (string | number)[],
  stats: [] as (string | number)[],
};

export { HEADER_DATA, FOOTER_DATA, SITE_SETTINGS_DATA, HOMEPAGE_DATA };
