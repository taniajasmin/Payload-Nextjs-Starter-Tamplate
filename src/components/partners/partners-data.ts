import {
  Award,
  Building2,
  GraduationCap,
  HeadphonesIcon,
  Layers,
  MapPin,
  ShieldCheck,
  ShoppingCart,
  type LucideIcon,
} from "lucide-react";

export interface PartnerBenefit {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const partnerBenefits: PartnerBenefit[] = [
  {
    icon: Layers,
    title: "22+ Global Brands",
    description:
      "One relationship = access to Dell, HP, Lenovo, Samsung, WD, Kingston, Crucial, MSI, Zotac, Hikvision, Honeywell, Nearity, TEAMGROUP, UGREEN, Toshiba, PNY, Koorui, SanDisk, Aiwa, ARKTEK, Inno3D, and more.",
  },
  {
    icon: ShieldCheck,
    title: "Authorized Distributor Status",
    description:
      "Sell with confidence — genuine products, full manufacturer warranty, authorized distributor certificate for your tenders.",
  },
  {
    icon: ShoppingCart,
    title: "Competitive Margins",
    description:
      "Tiered pricing structure that rewards volume and loyalty across hardware and software categories.",
  },
  {
    icon: Award,
    title: "UniERP Portfolio",
    description:
      "Exclusive reseller rights for UniERP (Odoo 19 CE) in your territory — ERP implementation and recurring revenue.",
  },
  {
    icon: Building2,
    title: "Marketing Support",
    description:
      "Co-branded collateral, product images, datasheets, and tender support documentation.",
  },
  {
    icon: GraduationCap,
    title: "Training & Certification",
    description:
      "Product training, sales certification, and technical workshops across all major brand categories.",
  },
  {
    icon: HeadphonesIcon,
    title: "Dedicated Account Manager",
    description:
      "Single point of contact for quotes, orders, delivery, and after-sales support.",
  },
  {
    icon: MapPin,
    title: "Regional Logistics",
    description:
      "Warehouses in Dubai (UAE) and Dhaka (Bangladesh) — fast delivery across GCC and South Asia.",
  },
];

export interface PartnerTier {
  name: string;
  tagline: string;
  accent: string;
  requirements: string;
  margin: string;
  creditTerms: string;
  marketingSupport: string;
  training: string;
  accountManagement: string;
  additionalBenefits?: string;
  bestFor: string;
}

export const partnerTiers: PartnerTier[] = [
  {
    name: "Authorized Reseller",
    tagline: "Get Started",
    accent: "from-sky-500 to-cyan-500",
    requirements:
      "Valid trade license, office in territory, minimum annual commitment: $25,000.",
    margin: "Standard trade margin on all brands.",
    creditTerms: "30 days (subject to credit approval).",
    marketingSupport:
      "Product catalog, price list (updated weekly), basic brand assets.",
    training: "Online product orientation (self-paced).",
    accountManagement: "Shared account manager (1:8 ratio).",
    bestFor: "New resellers, small IT retailers, startups entering IT distribution.",
  },
  {
    name: "Premier Partner",
    tagline: "Scale Your Business",
    accent: "from-violet-500 to-fuchsia-500",
    requirements:
      "Min. 12 months as Authorized Reseller (or equivalent experience), minimum annual commitment: $100,000, dedicated sales person for Simal brands.",
    margin:
      "Premier margin (+2–5% over standard) on all brands; quarterly rebate on achieving targets.",
    creditTerms: "45 days (subject to credit approval).",
    marketingSupport:
      "Co-branded marketing materials, joint event sponsorship, lead sharing from Simal website (territory-exclusive leads).",
    training:
      "In-person product training (quarterly), sales certification program, technical workshop access.",
    accountManagement: "Dedicated account manager (1:4 ratio).",
    additionalBenefits:
      "Priority stock allocation on high-demand SKUs, early access to new product launches, UniERP reseller rights.",
    bestFor:
      "Established IT resellers, system integrators, regional retailers with multiple outlets.",
  },
  {
    name: "Elite Partner",
    tagline: "Strategic Alliance",
    accent: "from-amber-500 to-orange-500",
    requirements:
      "Min. 24 months as Premier Partner (or exceptional credentials), minimum annual commitment: $500,000, dedicated team for Simal brands, joint business plan.",
    margin:
      "Elite margin (+5–8% over standard); annual volume rebate; special pricing on large tenders.",
    creditTerms:
      "60 days (subject to credit approval); letter of credit options for large projects.",
    marketingSupport:
      "Exclusive territory rights (by agreement), joint brand campaigns, Simal-funded marketing activities, priority lead referral, co-branded showroom support.",
    training:
      "Dedicated training program, train-the-trainer certification, joint customer demo capabilities.",
    accountManagement:
      "Dedicated account team (account manager + technical specialist), quarterly business review with Simal management.",
    additionalBenefits:
      "First right of refusal on new brand distribution in territory, input into Simal's brand portfolio strategy, UniERP implementation partner status with revenue sharing, invitation to annual partner summit.",
    bestFor:
      "Large system integrators, national retail chains, enterprise solution providers, government IT suppliers.",
  },
];

export interface MarginRow {
  category: string;
  authorized: string;
  premier: string;
  elite: string;
}

export const marginStructure: MarginRow[] = [
  {
    category: "Storage (SSD, HDD, Memory)",
    authorized: "Standard",
    premier: "+2–3%",
    elite: "+5–6%",
  },
  {
    category: "Laptops & PCs",
    authorized: "Standard",
    premier: "+2%",
    elite: "+5%",
  },
  {
    category: "Monitors & Displays",
    authorized: "Standard",
    premier: "+3%",
    elite: "+6%",
  },
  {
    category: "Graphics Cards & Components",
    authorized: "Standard",
    premier: "+2–3%",
    elite: "+5–7%",
  },
  {
    category: "Accessories & Peripherals",
    authorized: "Standard",
    premier: "+4–5%",
    elite: "+7–8%",
  },
  {
    category: "Networking & Security",
    authorized: "Standard",
    premier: "+3%",
    elite: "+6%",
  },
  {
    category: "AV & Meeting Room Solutions",
    authorized: "Standard",
    premier: "+3–5%",
    elite: "+6–8%",
  },
  {
    category: "UniERP (Software)",
    authorized: "Not available",
    premier: "15% commission",
    elite: "25% commission + implementation revenue share",
  },
];

export interface PartnerTestimonial {
  quote: string;
  author: string;
}

export const partnerTestimonials: PartnerTestimonial[] = [
  {
    quote:
      "Simal's Premier Partner program transformed our IT hardware business. Access to 22+ brands through one distributor, competitive pricing, and a dedicated account manager who actually picks up the phone — it's a partnership, not just a supplier relationship.",
    author: "CEO, Leading UAE System Integrator (Premier Partner, 4 Years)",
  },
  {
    quote:
      "Becoming a UniERP implementation partner through Simal added a high-margin recurring revenue stream to our business. Their technical team supports us through every deployment. We've implemented UniERP for 12 clients in 2 years.",
    author:
      "Director, IT Solutions Company, Bangladesh (Elite Partner, 3 Years)",
  },
];

export interface PartnerFaq {
  question: string;
  answer: string;
}

export const partnerFaqs: PartnerFaq[] = [
  {
    question: "Can I partner with Simal if I'm outside the UAE?",
    answer:
      "Yes. We serve partners across the GCC (Saudi Arabia, Qatar, Kuwait, Oman, Bahrain), Bangladesh, and select markets in Africa and South Asia. Contact us with your territory for eligibility.",
  },
  {
    question: "Is there a fee to join the partner program?",
    answer:
      "No. There is no partnership fee. The minimum annual commitment ensures mutual investment in the relationship.",
  },
  {
    question: "Can I sell UniERP without the hardware brands, or vice versa?",
    answer:
      "Yes. You can partner for IT hardware distribution only, UniERP only, or both. Premier and Elite tiers provide the best economics for dual partnerships.",
  },
  {
    question: "How long does the partner application process take?",
    answer:
      "Typical timeline: Application review (3–5 business days), credit assessment (5–7 business days), agreement signing (2–3 business days). Total: ~2 weeks from application to first order.",
  },
  {
    question: "Do you support partners with tender responses?",
    answer:
      "Yes. Premier and Elite partners receive tender support including: authorized distributor certificate, compliance documentation, competitive pricing for large bids, and technical specification assistance.",
  },
];
