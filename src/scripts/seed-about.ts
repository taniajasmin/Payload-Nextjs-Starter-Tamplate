/** @deprecated Use seed/index.ts instead — the canonical seeder. */
/**
 * About Page Seed Script — Simal Corporate Website
 *
 * Seeds the about-page Payload CMS global with the exact content
 * from the live website https://www.simalme.com/ plus all documented
 * company information.
 *
 * Idempotent: safe to run multiple times (POST to globals is upsert).
 * Uses the Payload REST API — requires the Next.js dev server to be running.
 *
 * Usage:  npx tsx src/scripts/seed-about.ts
 */

import 'dotenv/config'

const BASE = process.env.SEED_API_URL || 'http://localhost:3000'
const API = `${BASE}/api`

let token: string | null = null

// ─── HTTP Helpers ────────────────────────────────────────────────────

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms))

async function api(method: string, path: string, body?: any, retries = 3): Promise<any> {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' }
  if (token) headers['Authorization'] = `JWT ${token}`

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const res = await fetch(`${API}${path}`, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
      })
      if (!res.ok) {
        const text = await res.text()
        throw new Error(`API ${method} ${path} → ${res.status}: ${text}`)
      }
      return await res.json()
    } catch (e) {
      if (attempt < retries) {
        log('retry', `${method} ${path} attempt ${attempt} failed, retrying in 1s...`)
        await delay(1000)
      } else {
        throw e
      }
    }
  }
}

async function login() {
  const res = await fetch(`${API}/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@simal.com', password: 'SimalAdmin123!' }),
  })
  if (res.ok) {
    const data = await res.json()
    token = data.token
    return true
  }
  return false
}

async function ensureAdmin() {
  try {
    await fetch(`${API}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'admin@simal.com', password: 'SimalAdmin123!',
        firstName: 'Admin', lastName: 'User', role: 'administrator', active: true,
      }),
    })
  } catch { /* already exists */ }
}

function log(phase: string, msg: string) {
  console.log(`  [${phase}] ${msg}`)
}

// ─── About Page Data ────────────────────────────────────────────────

const ABOUT_PAGE_DATA = {
  // ─── Hero ─────────────────────────────────────────────────────────
  hero: {
    headline: 'About Simal Technologies',
    subHeadline: 'Premier IT Distributor in Dubai, UAE',
    description: 'Established in 2002, Simal Technologies has grown into one of the most trusted and recognized IT distribution companies in the UAE, serving as a key supply chain partner for IT solutions across the Middle East, Africa, CIS, and GCC countries.',
    secondaryDescription: 'As an authorized distributor of globally recognized brands including Crucial, UGREEN, and other leading IT hardware manufacturers, we deliver cutting-edge technology products, timely services, and unparalleled customer support.',
  },

  // ─── Company Section Header ───────────────────────────────────────
  companySection: {
    badge: 'Who We Are',
    heading: 'Company at a',
    description: 'As an authorized distributor of globally recognized brands, including Crucial, UGREEN, and other leading IT hardware manufacturers, Simal Technologies offers a robust portfolio that includes enterprise SSDs, RAM, NAS storage, docking stations, networking devices, and more.',
  },

  companyDetails: [
    { label: 'Legal Name', value: 'Simal Technologies Middle East LLC' },
    { label: 'Founded', value: '2002' },
    { label: 'Headquarters', value: 'Office No: 201, Dar Al Riffa Building, Khalid Bin Al Waleed Rd, Bur Dubai, PO Box: 49740, Dubai, UAE' },
    { label: 'Phone', value: '+971 4 393 0507' },
    { label: 'Email', value: 'info@simalme.com' },
    { label: 'Website', value: 'www.simalme.com' },
    { label: 'Employees', value: '300+ across all divisions' },
    { label: 'Annual Revenue', value: '~$1.97 Million USD' },
    { label: 'VAT/TAX ID', value: '100207478700003' },
    { label: 'Parent Company', value: 'TwinMOS Group' },
    { label: 'Business Model', value: 'Local Wholesaler, Global Wholesaler (Importer/Exporter), Distributor' },
    { label: 'Tagline', value: 'Best IT Distributor in Dubai, UAE' },
  ],

  associatedCompanies: [
    { company: 'StarSeed Technologies ME FZE', location: 'Jebel Ali Free Zone, UAE', role: 'Warehouse Operations' },
    { company: 'Stellent Technologies ME LLC', location: 'Bur Dubai, UAE', role: 'Retail Store Operations' },
  ],

  parentCompanyFocus: [
    { item: 'Data Storage & Backup' },
    { item: 'Security Surveillance' },
    { item: 'Networking' },
    { item: 'IT Security Solutions' },
  ],

  // ─── Mission & Vision Section Header ──────────────────────────────
  missionVisionSection: {
    badge: 'Our Purpose',
    heading: 'Mission & Vision',
  },

  mission: {
    headline: 'Empowering businesses with essential tools for a digital-first landscape',
    description: "Simal Technologies is committed to bridging the technology gap for businesses across the Middle East, Africa, CIS, and GCC regions. With a clear mission to empower digital transformation, Simal focuses on proactive customer service, rapid response times, and a continuous improvement mindset. Our experienced team works relentlessly to ensure precision in delivery, high availability of stock, and strategic support that fuels our clients' success.",
  },

  vision: {
    headline: 'To be the premier IT solutions distributor',
    description: 'Going beyond mere product delivery to empower businesses with innovative technology solutions.',
  },

  visionStandards: [
    { title: 'Service Excellence', desc: 'Unmatched customer support and technical expertise' },
    { title: 'Innovation Leadership', desc: 'Bringing cutting-edge technology to our markets first' },
    { title: 'Regional Dominance', desc: 'Being the first-choice IT distributor across all served markets' },
    { title: 'Trusted Partnership', desc: 'Building long-term relationships that drive mutual growth' },
  ],

  // ─── Core Values Section Header ───────────────────────────────────
  coreValuesSection: {
    badge: 'What We Believe',
    heading: 'Our Core Values',
  },

  coreValues: [
    { number: '01', title: 'Customer-Centric Excellence', desc: 'Every decision we make starts with the customer. We listen, understand, and deliver solutions that address real business challenges.' },
    { number: '02', title: 'Integrity & Transparency', desc: 'We conduct business with honesty, openness, and ethical responsibility. From pricing to partnerships, we believe in doing the right thing.' },
    { number: '03', title: 'Innovation & Agility', desc: 'The technology landscape evolves rapidly. We stay ahead by continuously learning, adapting, and bringing innovative solutions to our customers.' },
    { number: '04', title: 'Quality & Reliability', desc: "We are authorized distributors for the world's leading IT brands. Every product meets stringent quality standards, backed by full manufacturer warranty." },
    { number: '05', title: 'Partnership & Collaboration', desc: 'We succeed together — with our brand partners, our resellers, our system integrators, and our end customers.' },
    { number: '06', title: 'Continuous Improvement', desc: 'We never stand still. We constantly review our processes, seek feedback, and invest in improvement.' },
  ],

  // ─── Why Choose Us Section Header ─────────────────────────────────
  whyChooseSection: {
    badge: 'Why Choose Us',
    heading: 'Your Trusted Partner in Quality & Performance',
    description: 'We deliver high-quality memory, storage, and SSD solutions, combining performance, reliability, and innovation to meet your technology needs.',
  },

  servicePillars: [
    {
      number: '01',
      title: 'Authorized Partnerships',
      intro: 'Official authorized distributor for 20+ global IT brands including Crucial, UGREEN, HIKVISION, ARKTEK, Dell, HP, Lenovo, Samsung, Kingston, and more.',
      benefits: [
        { item: '100% genuine products with full manufacturer warranty' },
        { item: 'Direct access to manufacturer support and RMA processes' },
        { item: 'Early access to new product launches and promotional pricing' },
        { item: 'Official authorization letters available for tender submissions' },
      ],
    },
    {
      number: '02',
      title: 'Regional Coverage',
      intro: 'Serving businesses across UAE, GCC, Africa, and CIS with seamless logistics and reliable delivery networks.',
      benefits: [
        { item: 'UAE-wide delivery (Dubai, Abu Dhabi, Sharjah, all emirates)' },
        { item: 'GCC distribution (Saudi Arabia, Qatar, Kuwait, Bahrain, Oman)' },
        { item: 'Africa coverage (Egypt, Nigeria, Kenya, South Africa)' },
        { item: 'CIS markets (Kazakhstan, Uzbekistan, Azerbaijan)' },
      ],
    },
    {
      number: '03',
      title: 'Seamless Process',
      intro: 'From consultation to delivery, we ensure a smooth, efficient workflow to meet your technology requirements.',
      benefits: [
        { item: 'Consultation — Understand your requirements' },
        { item: 'Quotation — Competitive, personalized pricing' },
        { item: 'Fulfillment — Pick, pack, and dispatch from our Jebel Ali warehouse' },
        { item: 'After-Sales — Ongoing support and warranty assistance' },
      ],
    },
    {
      number: '04',
      title: 'Dedicated Team',
      intro: 'Our experienced team is committed to providing personalized support and innovative solutions for your business.',
      benefits: [
        { item: 'Certified technical professionals across multiple vendor platforms' },
        { item: 'Industry-trained sales teams organized by business division' },
        { item: 'Multi-lingual support (English, Arabic, Hindi, Urdu, Bengali)' },
      ],
    },
    {
      number: '05',
      title: 'Custom Solutions',
      intro: 'We offer tailored storage and memory solutions that align with your unique business goals and technical needs.',
      benefits: [
        { item: 'Bulk order configurations for enterprise deployments' },
        { item: 'Kitting and bundling services' },
        { item: 'Pre-configured solutions for specific industries' },
      ],
    },
  ],

  // ─── Milestones Section Header ────────────────────────────────────
  milestonesSection: {
    badge: 'Our Journey',
    heading: 'Key Milestones',
  },

  milestones: [
    { year: '2002', milestone: 'Simal Technologies founded in Dubai, UAE' },
    { year: '2005', milestone: 'Established first major brand partnerships' },
    { year: '2010', milestone: 'Expanded to 50+ employees across multiple divisions' },
    { year: '2015', milestone: 'Joined TwinMOS Group; launched Corporate division' },
    { year: '2018', milestone: 'Expanded market reach to Africa and CIS regions' },
    { year: '2020', milestone: 'Launched e-commerce catalog (76 products)' },
    { year: '2022', milestone: '20th Anniversary; crossed $1.5M annual revenue' },
    { year: '2025', milestone: 'Awarded HIKSEMi Best Distribution Partner at MEA Summit' },
    { year: '2026', milestone: 'Launching new enterprise website' },
  ],

  // ─── Leadership Section Header ────────────────────────────────────
  leadershipSection: {
    badge: 'Leadership',
    heading: 'Our Leadership',
  },

  boardOfDirectors: [
    { name: 'Mohammad Mazharul Islam', code: 'STBL-0001', role: 'Chairman — Strategic Vision & Corporate Governance', profile: 'Provides the overarching strategic direction for Simal Technologies and TwinMOS Group. His leadership has been instrumental in establishing Simal Technologies as a premier IT distributor in the UAE over two decades.' },
    { name: 'Mohammad Zahirul Islam', code: 'STBL-0002', role: 'Managing Director — Operational Leadership & Business Strategy', profile: 'Oversees day-to-day operations and drives strategic initiatives. Under his guidance, Simal Technologies has expanded its market reach across the Middle East, Africa, CIS, and GCC regions.' },
    { name: 'S. M. Mohibul Hasan', code: 'STBL-1900', role: 'Deputy Managing Director', profile: 'Supports the MD in operational oversight and leads key strategic projects. His focus on operational excellence has contributed to consistent growth.' },
  ],

  executiveTeam: [
    { position: 'General Manager (GM)', name: 'A K M Shafiq Ul Haque', code: 'STBL-0132' },
    { position: 'Director', name: 'Abu Mostofa Chowdhury', code: 'STBL-3656' },
    { position: 'GM & Chief Financial Officer', name: 'Forhad Hossain', code: 'STBL-0707' },
    { position: 'Director', name: 'Md. Muzahid Al Beruni', code: 'STBL-0012' },
    { position: 'Director', name: 'Md. Tanvir Hossain', code: 'STBL-3551' },
    { position: 'General Manager (GM)', name: 'Md. Zakir Hossain', code: 'STBL-0008' },
    { position: 'Director', name: 'Zafor Ahmed', code: 'STBL-0003' },
  ],

  divisions: [
    { name: 'SBU 1', size: '48 professionals', focus: 'Connectivity & Presentation (Monitors, Peripherals, Power Systems)' },
    { name: 'SBU 2', size: '18 professionals', focus: 'Digital Workspaces (Notebooks, PCs, Printers, Servers)' },
    { name: 'SBU 3', size: '24 professionals', focus: 'Networking & Surveillance' },
    { name: 'SBU 4', size: '34 professionals', focus: 'Mobility & Accessories (Smartphones, Gimbals, Microphones)' },
    { name: 'B2B Corporate', size: '66 professionals', focus: 'Enterprise Systems Group (ESG) & Personal Systems Group (PSG)' },
    { name: 'B2B Solution', size: '92 professionals', focus: 'Technology Architecture (HPE, Dell, EMC, Cisco)' },
    { name: 'B2G', size: '18 professionals', focus: 'Government & Corporate Tenders' },
  ],

  // ─── Awards Section Header ────────────────────────────────────────
  awardsSection: {
    badge: 'Recognition',
    heading: 'Awards & Certifications',
  },

  awards: [
    { year: '2025', title: 'HIKSEMi Best Distribution Partner 2025', issuer: 'HIKSEMi MEA National Distributor Summit', description: 'Recognizes the top-performing distributor in the Middle East and Africa region for outstanding sales performance, market coverage, and brand representation.' },
    { year: 'Multi-Year', title: 'HikVision Best Distributor Partner', issuer: 'HikVision Digital Technology', description: "Ongoing recognition for exceptional performance in representing and distributing HikVision's comprehensive portfolio of security and surveillance products." },
  ],

  certifications: [
    { cert: 'UAE Trade License', authority: 'Department of Economic Development, Dubai', status: 'Active' },
    { cert: 'VAT Registration (100207478700003)', authority: 'UAE Federal Tax Authority', status: 'Active' },
    { cert: 'Authorized Distributor — Crucial', authority: 'Micron Technology', status: 'Active' },
    { cert: 'Authorized Distributor — HIKVISION', authority: 'HikVision Digital Technology', status: 'Active' },
    { cert: 'Authorized Distributor — UGREEN', authority: 'UGREEN Group Limited', status: 'Active' },
    { cert: 'Authorized Distributor — Dell', authority: 'Dell Technologies', status: 'Active' },
    { cert: 'Authorized Distributor — HP', authority: 'HP Inc.', status: 'Active' },
    { cert: 'Authorized Distributor — Lenovo', authority: 'Lenovo Group', status: 'Active' },
    { cert: 'Authorized Distributor — Samsung', authority: 'Samsung Electronics', status: 'Active' },
  ],

  // ─── CTA Section ──────────────────────────────────────────────────
  cta: {
    heading: 'Optimizing Your Business',
    description: 'Let us help optimize your business with reliable, high-performance storage and memory solutions. Driven by innovation, reliability, and strategic partnerships.',
    primaryButton: {
      label: 'Contact Us',
      href: '/contact',
    },
    secondaryButton: {
      label: 'Browse Products',
      href: '/brands',
    },
  },
}

// ─── Main ────────────────────────────────────────────────────────────

async function seedAbout() {
  console.log('\n🚀 Simal Technologies — About Page Seed\n')
  console.log('='.repeat(60))
  console.log(`\n  API: ${API}`)
  console.log(`  App: ${BASE}\n`)

  console.log('📋 Phase 0: Ensure Admin User & Login')
  await ensureAdmin()
  const loggedIn = await login()
  if (!loggedIn) {
    console.error('  ✗ Could not login. Is the dev server running? (pnpm dev)')
    process.exit(1)
  }
  log('auth', '✓ Logged in as admin@simal.com')

  // Seed About Page Global
  console.log('\n📋 Phase 1: About Page Global')
  try {
    await api('POST', '/globals/about-page', ABOUT_PAGE_DATA)
    log('about-page', '✓ About page global seeded with all section text + data')
  } catch (e: any) {
    console.error('  ✗ About page:', e.message?.slice(0, 300))
  }

  console.log('\n' + '='.repeat(60))
  console.log('✅ About page seed complete!')
  console.log('   Admin login: admin@simal.com / SimalAdmin123!')
  console.log(`   Payload admin: ${BASE}/admin`)
  console.log(`   About page: ${BASE}/en/about`)
  console.log('='.repeat(60) + '\n')
}

seedAbout().catch((err) => {
  console.error('Fatal seed error:', err)
  process.exit(1)
})
