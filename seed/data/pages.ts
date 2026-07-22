// seed/data/pages.ts — fixture data extracted from seed-all.ts
const PAGES = [
  {
    title: "About Us",
    slug: "about",
    excerpt:
      "Simal Technologies Middle East LLC is a premier IT distributor headquartered in Dubai, UAE, delivering enterprise-grade hardware, accessories, and software solutions across the Middle East, Africa, CIS, and GCC regions.",
    status: "published",
    meta: {
      title: "About Us — Simal Technologies Middle East LLC",
      description:
        "Learn about Simal Technologies — premier IT distributor in Dubai with 20+ years experience and 20+ global brands.",
    },
  },
  {
    title: "IT Distribution",
    slug: "it-distribution",
    excerpt:
      "Authorized IT distribution across the Middle East, Africa, CIS, and GCC regions. 76+ products across 20+ global brands.",
    status: "published",
    meta: {
      title:
        "IT Distribution — Simal Technologies | Authorized IT Distributor Dubai, UAE",
      description:
        "Simal Technologies — premier IT distributor in Dubai, UAE. 76+ products across 20+ brands.",
    },
  },
  {
    title: "Product Catalog",
    slug: "product-catalog",
    excerpt: "Browse 76+ authentic IT products across five major categories.",
    status: "published",
    meta: {
      title: "Product Catalog — IT Distribution | Simal Technologies",
      description:
        "Browse the complete IT product catalog from Simal Technologies.",
    },
  },
  {
    title: "Computer Components",
    slug: "computer-components",
    excerpt: "SSDs, RAM, graphics cards, and motherboards from leading brands.",
    status: "published",
    meta: {
      title: "Computer Components — IT Distribution | Simal Technologies",
      description:
        "Enterprise SSDs, RAM modules, graphics cards, and motherboards from leading brands.",
    },
  },
  {
    title: "Computer Accessories",
    slug: "computer-accessories",
    excerpt: "Cables, hubs, docking stations, and surge protectors.",
    status: "published",
    meta: {
      title: "Computer Accessories — IT Distribution | Simal Technologies",
      description:
        "HDMI cables, USB hubs, docking stations, and surge protectors from UGREEN, Honeywell, and more.",
    },
  },
  {
    title: "Monitors",
    slug: "monitors",
    excerpt: "Professional and gaming monitors for every workspace.",
    status: "published",
    meta: {
      title: "Monitors — IT Distribution | Simal Technologies",
      description:
        "Professional and gaming monitors from Aiwa, KOORUI, and more.",
    },
  },
  {
    title: "Gaming",
    slug: "gaming",
    excerpt: "High-performance gaming GPUs, monitors, and fast storage.",
    status: "published",
    meta: {
      title: "Gaming — IT Distribution | Simal Technologies",
      description:
        "Gaming graphics cards, high-refresh-rate monitors, and fast SSDs.",
    },
  },
  {
    title: "Laptops",
    slug: "laptops",
    excerpt: "Enterprise and professional laptops from Dell, HP, and Lenovo.",
    status: "published",
    meta: {
      title: "Laptops — IT Distribution | Simal Technologies",
      description: "Business laptops from Dell, HP, and Lenovo.",
    },
  },
  {
    title: "Brands",
    slug: "brands",
    excerpt: "Authorized distributor for 20+ world-class IT brands.",
    status: "published",
    meta: {
      title:
        "Our Brands — Authorized IT Distribution Partners | Simal Technologies",
      description:
        "Simal Technologies Middle East — authorized distributor for 20+ world-class IT brands.",
    },
  },
  {
    title: "Careers",
    slug: "careers",
    excerpt:
      "Join Simal Technologies and build your career with a leading IT distributor in the Middle East.",
    status: "published",
    meta: {
      title: "Careers — Join Simal Technologies | IT Distribution Jobs Dubai",
      description:
        "Explore career opportunities at Simal Technologies Middle East.",
    },
  },
  {
    title: "Contact",
    slug: "contact",
    excerpt:
      "Get in touch with Simal Technologies for sales inquiries, partnership opportunities, and customer support.",
    status: "published",
    meta: {
      title: "Contact Us — Simal Technologies | IT Distribution Dubai, UAE",
      description: "Contact Simal Technologies Middle East LLC.",
    },
  },

  // ── ERP & Solutions pages ──

  // ERP overview
  {
    title: "UniERP Overview",
    slug: "erp",
    excerpt:
      "UniERP is a comprehensive, modular ERP system built on Odoo 19 Community Edition — enterprise-grade functionality without license fees.",
    status: "published",
    meta: {
      title: "UniERP — Enterprise Resource Planning | Simal Technologies",
      description:
        "UniERP built on Odoo 19 CE — full-range ERP with finance, HR, sales, inventory, manufacturing & project management modules. No license fees.",
    },
  },

  // ERP modules
  {
    title: "Finance & Accounting",
    slug: "erp/finance-accounting",
    excerpt:
      "General Ledger, AR/AP, financial reporting, budgeting, bank reconciliation, multi-currency, and UniVAT — NBR-approved VAT compliance.",
    status: "published",
    meta: {
      title: "Finance & Accounting — UniERP Module | Simal Technologies",
      description:
        "UniERP Finance & Accounting module — GL, AR/AP, multi-currency, UniVAT NBR-approved. Full financial management for UAE & GCC businesses.",
    },
  },
  {
    title: "HR & Payroll",
    slug: "erp/hr-payroll",
    excerpt:
      "Recruitment, employee database, attendance tracking, leave management, payroll processing, and UAE labor law compliance.",
    status: "published",
    meta: {
      title: "HR & Payroll — UniERP Module | Simal Technologies",
      description:
        "UniERP HR & Payroll module — employee lifecycle, attendance, leave, payroll with UAE labor law compliance.",
    },
  },
  {
    title: "Sales & CRM",
    slug: "erp/sales-crm",
    excerpt:
      "Lead management, opportunity pipeline, quotation management, sales order processing, customer database, and email integration.",
    status: "published",
    meta: {
      title: "Sales & CRM — UniERP Module | Simal Technologies",
      description:
        "UniERP Sales & CRM module — leads, pipeline, quotations, orders, and customer 360. Integrated email and dashboard reporting.",
    },
  },
  {
    title: "Inventory & Supply Chain",
    slug: "erp/inventory-supply-chain",
    excerpt:
      "Stock management, purchase management, warehouse management, barcode integration, multi-location inventory, and supplier management.",
    status: "published",
    meta: {
      title: "Inventory & Supply Chain — UniERP Module | Simal Technologies",
      description:
        "UniERP Inventory & Supply Chain module — stock, purchase, warehouse, barcode, multi-location, reorder automation.",
    },
  },
  {
    title: "Manufacturing",
    slug: "erp/manufacturing",
    excerpt:
      "Production planning, Bill of Materials (BOM), Material Requirements Planning (MRP), work order management, quality control, and costing.",
    status: "published",
    meta: {
      title: "Manufacturing — UniERP Module | Simal Technologies",
      description:
        "UniERP Manufacturing module — production planning, BOM, MRP, work orders, quality control, shop floor tracking, and costing.",
    },
  },
  {
    title: "Project Management",
    slug: "erp/project-management",
    excerpt:
      "Project planning, resource allocation, task management, Gantt charts, time tracking, budget management, and profitability analysis.",
    status: "published",
    meta: {
      title: "Project Management — UniERP Module | Simal Technologies",
      description:
        "UniERP Project Management module — planning, resources, tasks, Gantt charts, time tracking, budget, and profitability.",
    },
  },

  // ERP industry listing
  {
    title: "Industry Solutions",
    slug: "erp/industries",
    excerpt:
      "UniERP is pre-configured for 10+ industry verticals — tailored ERP solutions for your specific business sector.",
    status: "published",
    meta: {
      title: "Industry ERP Solutions — UniERP | Simal Technologies",
      description:
        "Industry-specific UniERP solutions for retail, manufacturing, healthcare, education, banking, government, logistics, agriculture, and more.",
    },
  },

  // ERP industry pages
  {
    title: "Agriculture ERP Solutions",
    slug: "erp/industries/agriculture",
    excerpt:
      "Farm management, crop planning, supply chain traceability, and cold chain monitoring with UniERP for Agriculture.",
    status: "published",
    meta: {
      title: "Agriculture ERP Solutions — UniERP | Simal Technologies",
      description:
        "UniERP for agriculture — farm management, crop planning, supply chain, processing, and compliance.",
    },
  },
  {
    title: "Education ERP Solutions",
    slug: "erp/industries/education",
    excerpt:
      "Student management, academic planning, fee management, examination, and library management with UniERP for Education.",
    status: "published",
    meta: {
      title: "Education ERP Solutions — UniERP | Simal Technologies",
      description:
        "UniERP for education — student management, academic planning, fees, examination, and library management.",
    },
  },
  {
    title: "Government ERP Solutions",
    slug: "erp/industries/government",
    excerpt:
      "Tender management, procurement workflow, compliance documentation, and security requirements with UniERP for Government.",
    status: "published",
    meta: {
      title: "Government ERP Solutions — UniERP | Simal Technologies",
      description:
        "UniERP for government — tender management, procurement, compliance, and security.",
    },
  },
  {
    title: "Healthcare ERP Solutions",
    slug: "erp/industries/healthcare",
    excerpt:
      "Patient records, appointment scheduling, billing, lab management, and compliance with UniERP for Healthcare (HMIS).",
    status: "published",
    meta: {
      title: "Healthcare ERP Solutions — UniERP | Simal Technologies",
      description:
        "UniERP for healthcare — HMIS with patient records, appointments, billing, lab management, and compliance.",
    },
  },
  {
    title: "Hospitality ERP Solutions",
    slug: "erp/industries/hospitality",
    excerpt:
      "Property management, F&B operations, guest experience, and event management with UniERP for Hospitality.",
    status: "published",
    meta: {
      title: "Hospitality ERP Solutions — UniERP | Simal Technologies",
      description:
        "UniERP for hospitality — property management, F&B, guest experience, and event management.",
    },
  },
  {
    title: "Logistics & Supply Chain ERP Solutions",
    slug: "erp/industries/logistics-supply-chain",
    excerpt:
      "Fleet management, shipment tracking, warehouse optimization, and third-party logistics with UniERP for Logistics.",
    status: "published",
    meta: {
      title: "Logistics & Supply Chain ERP Solutions — UniERP | Simal Technologies",
      description:
        "UniERP for logistics & supply chain — fleet, shipment tracking, warehouse, and 3PL management.",
    },
  },
  {
    title: "Manufacturing Industry ERP Solutions",
    slug: "erp/industries/manufacturing",
    excerpt:
      "Production planning, quality control, shop floor tracking, and regulatory compliance for RMG, pharma, and food processing.",
    status: "published",
    meta: {
      title: "Manufacturing Industry ERP Solutions — UniERP | Simal Technologies",
      description:
        "UniERP for manufacturing — RMG, pharma, food processing with production planning, quality control, and compliance.",
    },
  },
  {
    title: "Professional Services ERP Solutions",
    slug: "erp/industries/services",
    excerpt:
      "Project-based billing, resource management, time tracking, and client management with UniERP for Professional Services.",
    status: "published",
    meta: {
      title: "Professional Services ERP Solutions — UniERP | Simal Technologies",
      description:
        "UniERP for professional services — project billing, resource management, time tracking, and client management.",
    },
  },
  {
    title: "Retail & Distribution ERP Solutions",
    slug: "erp/industries/retail-distribution",
    excerpt:
      "POS, eCommerce integration, inventory management, and loyalty programs with UniERP for Retail & Distribution.",
    status: "published",
    meta: {
      title: "Retail & Distribution ERP Solutions — UniERP | Simal Technologies",
      description:
        "UniERP for retail & distribution — POS, eCommerce, inventory, and loyalty programs.",
    },
  },
  {
    title: "Banking & Finance ERP Solutions",
    slug: "erp/industries/banking-finance",
    excerpt:
      "Compliance management, risk management, financial reporting, and integration capabilities with UniERP for Banking & Finance.",
    status: "published",
    meta: {
      title: "Banking & Finance ERP Solutions — UniERP | Simal Technologies",
      description:
        "UniERP for banking & finance — compliance, risk management, reporting, and integration.",
    },
  },

  // Solutions overview
  {
    title: "IT Solutions & Professional Services",
    slug: "solutions",
    excerpt:
      "Comprehensive professional IT solutions — AMC, AV & Meeting Room, Cloud Security, Data Recovery & Storage, and Firewall Solutions.",
    status: "published",
    meta: {
      title: "IT Solutions & Professional Services — Simal Technologies | Dubai, UAE",
      description:
        "Simal Technologies delivers comprehensive IT solutions — AMC, AV meeting rooms, cloud security, data recovery, and firewall solutions. 20+ years serving Middle East, Africa, CIS & GCC.",
    },
  },

  // Solution pages
  {
    title: "Annual Maintenance Contract (AMC)",
    slug: "solutions/amc",
    excerpt:
      "Comprehensive maintenance services covering hardware, software, and network infrastructure with defined SLA tiers and 24/7 support.",
    status: "published",
    meta: {
      title: "AMC — Annual Maintenance Contract | Simal Technologies",
      description:
        "Annual Maintenance Contracts for IT infrastructure — hardware, software, and network maintenance with SLA tiers and 24/7 support in Dubai, UAE.",
    },
  },
  {
    title: "AV & Meeting Room Solutions",
    slug: "solutions/av-meeting-room",
    excerpt:
      "Cutting-edge audio-visual and meeting room solutions featuring Nearity all-in-one conferencing systems, professional displays, and control systems.",
    status: "published",
    meta: {
      title: "AV & Meeting Room Solutions | Simal Technologies",
      description:
        "AV and meeting room solutions — Nearity conferencing, professional displays, audio equipment. Design, installation, and integration in Dubai, UAE.",
    },
  },
  {
    title: "Cloud Security Solutions",
    slug: "solutions/cloud-security",
    excerpt:
      "Advanced cloud security solutions including threat detection, IAM, data encryption, compliance management, and 24/7 security operations.",
    status: "published",
    meta: {
      title: "Cloud Security Solutions | Simal Technologies",
      description:
        "Cloud security solutions — threat detection, IAM, encryption, compliance. Protect against ransomware, phishing, and DDoS in Dubai, UAE.",
    },
  },
  {
    title: "Data Recovery & Storage Solutions",
    slug: "solutions/data-recovery-storage",
    excerpt:
      "Enterprise-grade data recovery services and storage architecture solutions — NAS, SAN, cloud storage, and backup strategy design.",
    status: "published",
    meta: {
      title: "Data Recovery & Storage Solutions | Simal Technologies",
      description:
        "Data recovery and storage solutions — NAS, SAN, cloud storage, backup. Enterprise-grade recovery from failed drives and corrupted systems in Dubai, UAE.",
    },
  },
  {
    title: "Firewall Solutions",
    slug: "solutions/firewall",
    excerpt:
      "Next-generation firewall solutions featuring Sophos XG Series — all-in-one network security with IPS, VPN, web filtering, and 24/7 monitoring.",
    status: "published",
    meta: {
      title: "Firewall Solutions | Simal Technologies",
      description:
        "Next-gen firewall solutions — Sophos XG Series with IPS, VPN, web filtering, application control, and 24/7 managed monitoring in Dubai, UAE.",
    },
  },

  // ── Resources pages ──

  {
    title: "Resources",
    slug: "resources",
    excerpt:
      "Blog, case studies, white papers, datasheets, and FAQ — everything you need to make informed IT decisions.",
    status: "published",
    meta: {
      title: "Resources — Blog, Case Studies & Downloads | Simal Technologies",
      description:
        "Access Simal Technologies resources — blog, case studies, white papers, product datasheets, and FAQs for IT distribution and ERP solutions.",
    },
  },
  {
    title: "Downloads & Datasheets",
    slug: "resources/datasheets",
    excerpt:
      "Download product datasheets, technical specifications, compliance documents, and company brochures in PDF format.",
    status: "published",
    meta: {
      title: "Downloads & Datasheets — Product Documentation | Simal Technologies",
      description:
        "Download product datasheets, technical specifications, and documentation from Simal Technologies. PDF downloads for IT hardware and solutions.",
    },
  },

  // ── About pages (additional) ──

  {
    title: "Why Choose Us",
    slug: "about/why-us",
    excerpt:
      "7 key service pillars — Authorized Partnerships, Regional Coverage, Customer-First, Proven Reliability, Seamless Process, Dedicated Team, Custom Solutions.",
    status: "published",
    meta: {
      title: "Why Choose Us — Simal Technologies | IT Distribution Dubai, UAE",
      description:
        "Discover why businesses choose Simal Technologies — authorized partnerships, 20+ years regional coverage, customer-first approach, and proven reliability.",
    },
  },
  {
    title: "Certifications & Partnerships",
    slug: "about/certifications",
    excerpt:
      "Authorized distributor badges for 20+ brands, industry certifications from HP, Dell, Cisco, VMware, Microsoft, and partnership categories.",
    status: "published",
    meta: {
      title: "Certifications & Partnerships — Simal Technologies",
      description:
        "Simal Technologies certifications and authorized partnerships — HP, Dell, Cisco, VMware, Microsoft and 20+ global IT brands.",
    },
  },
];

export default PAGES;
