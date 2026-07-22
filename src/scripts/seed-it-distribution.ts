/** @deprecated Use seed/index.ts instead — the canonical seeder. */
/**
 * seed-it-distribution.ts
 *
 * Seeds the 6 IT-Distribution page globals:
 *   it-dp, authorized-brands-page, warehouse-logistics-page,
 *   retail-presence-page, distribution-channels-page, quality-assurance-page
 *
 * These globals were previously referenced by the frontend but never
 * registered in payload.config.ts, so the (existing) seed content in
 * seed-globals.ts 404'd and never landed. They are now registered, so this
 * script populates them.
 *
 * Prerequisites:
 *   1. Dev server running:  pnpm dev   (this uses the REST API)
 *   2. Run:                  pnpm seed:it-distribution   (or: npx tsx src/scripts/seed-it-distribution.ts)
 *
 * Idempotent: POST /globals/<slug> is an upsert, so re-running is safe.
 * Localized fields are written to the default locale (en); the frontend reads
 * via fetchGlobal(slug, locale) with fallback, so default-locale seeding is
 * sufficient for rendering.
 */
import { readFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'

const BASE = process.env.SEED_API_URL || 'http://localhost:3000'
const API = `${BASE}/api`

const ADMIN_EMAIL = 'admin@simal.com'
const ADMIN_PASSWORD = 'SimalAdmin123!'

let token: string | null = null
const delay = (ms: number) => new Promise((r) => setTimeout(r, ms))

async function api(
  method: string,
  urlPath: string,
  body?: unknown,
  retries = 3,
): Promise<any> {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const res = await fetch(`${API}${urlPath}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `JWT ${token}` } : {}),
        },
        body: body ? JSON.stringify(body) : undefined,
      })
      const text = await res.text()
      const data = text ? JSON.parse(text) : {}
      if (!res.ok) throw new Error(`${res.status} ${JSON.stringify(data).slice(0, 200)}`)
      return data
    } catch (err) {
      if (attempt === retries) throw err
      await delay(1000)
    }
  }
}

async function ensureAdmin() {
  try {
    await api('POST', '/users', {
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
      firstName: 'Admin',
      lastName: 'User',
      role: 'administrator',
      active: true,
    })
  } catch {
    // User likely already exists — ignore.
  }
}

async function login() {
  try {
    const data = await api('POST', '/users/login', {
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
    })
    token = data.token
    return Boolean(token)
  } catch {
    return false
  }
}

const MIME_TYPES: Record<string, string> = {
  '.avif': 'image/avif',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.pdf': 'application/pdf',
}

/** Best-effort: reuse an existing media doc by filename, else upload from public/. */
async function ensureMedia(filename: string, relPath: string, alt: string): Promise<string | null> {
  try {
    const found = await api(
      'GET',
      `/media?where[filename][equals]=${encodeURIComponent(filename)}&limit=1`,
    )
    const existing = found?.docs?.[0]
    if (existing) return existing.id

    const abs = path.join(process.cwd(), 'public', relPath)
    if (!existsSync(abs)) return null

    const ext = path.extname(filename).toLowerCase()
    const mimeType = MIME_TYPES[ext] || 'application/octet-stream'

    const buf = await readFile(abs)
    const form = new FormData()
    form.append('file', new Blob([buf], { type: mimeType }), filename)
    form.append('_payload', JSON.stringify({ alt: { en: alt } }))
    const res = await fetch(`${API}/media`, {
      method: 'POST',
      headers: token ? { Authorization: `JWT ${token}` } : {},
      body: form,
    })
    const data = await res.json()
    return data?.doc?.id || data?.id || null
  } catch {
    return null
  }
}

// ---------------------------------------------------------------------------
// Shared content (reused across several globals, matching the original seeds)
// ---------------------------------------------------------------------------
const AUTHORIZED_BRANDS = [
  { category: 'SSD & Memory', brands: 'Crucial, HIKVISION, Kingston, Samsung, SanDisk, TEAMGROUP, Toshiba, WD' },
  { category: 'Graphics Cards', brands: 'ARKTEK, Inno3D, Zotac, PNY' },
  { category: 'Monitors', brands: 'Aiwa, KOORUI' },
  { category: 'Laptops', brands: 'Dell, HP, Lenovo' },
  { category: 'Accessories & Cables', brands: 'UGREEN' },
  { category: 'Surge Protection', brands: 'Honeywell' },
  { category: 'Motherboards', brands: 'MSI' },
  { category: 'AV & Conferencing', brands: 'Nearity' },
  { category: 'Networking', brands: 'Wavlink' },
]

const GEOGRAPHIC_COVERAGE = [
  { region: 'UAE', coverage: 'Nationwide next-day delivery' },
  { region: 'GCC', coverage: 'Saudi Arabia, Qatar, Kuwait, Bahrain, Oman' },
  { region: 'Middle East', coverage: 'Jordan, Lebanon, Iraq, Yemen' },
  { region: 'Africa', coverage: 'Egypt, Kenya, Nigeria, South Africa, Morocco' },
  { region: 'CIS', coverage: 'Kazakhstan, Azerbaijan, Uzbekistan, Georgia' },
]

// ---------------------------------------------------------------------------
// Per-global payloads
// ---------------------------------------------------------------------------
const itDp = {
  hero: {
    headline: 'Powering the Digital Infrastructure of the Middle East',
    subHeadline:
      'For over 20 years, Simal Technologies Middle East LLC has stood as one of the premier IT distribution hubs in the United Arab Emirates. Founded in 2002 with a clear mission—to establish a robust technology distribution business serving the Middle East, Africa, CIS, and GCC countries—Simal Technologies has grown into a trusted partner for enterprises, resellers, system integrators, and government entities seeking reliable, genuine IT hardware and components.',
    primaryCtaLabel: 'Browse Product Catalog',
    primaryCtaLink: '/hardware/product-catalog',
    secondaryCtaLabel: 'Contact Sales',
    secondaryCtaLink: '/contact',
  },
  authorizedBrandsTitle: 'Authorized Distribution — Guaranteed Authenticity',
  authorizedBrandsDescription:
    'Unlike gray-market resellers, Simal Technologies is the officially authorized distributor for every brand in our portfolio. Every product that ships from our warehouse carries full manufacturer warranty, dedicated support, and the assurance of authenticity.',
  authorizedBrands: AUTHORIZED_BRANDS,
  productCategoriesTitle: '76+ Products Across 5 Core Categories',
  productCategoriesDescription:
    'Our distribution catalog spans the full spectrum of IT hardware needs.',
  productCategories: [
    { category: 'Computer Components', count: 35, subCategories: 'SSDs (14), Portable SSDs (12), RAM (4), Graphics Cards (5)' },
    { category: 'Computer Accessories', count: 30, subCategories: 'HDMI Cables, Hubs & Docking Stations, Surge Protectors (11)' },
    { category: 'Monitors', count: 6, subCategories: 'Gaming, Professional, Ultrawide' },
    { category: 'Gaming', count: 9, subCategories: 'Gaming GPUs, Gaming Monitors, High-Speed SSDs' },
    { category: 'Laptops', count: 3, subCategories: 'Enterprise, Professional, Slim' },
  ],
  geographicCoverage: GEOGRAPHIC_COVERAGE,
  channelAdvantages: {
    siVarTitle: 'For System Integrators & VARs',
    siVarAdvantages: [
      { item: 'Competitive trade pricing with volume-based discounts' },
      { item: 'Dedicated account manager for each partner' },
      { item: 'Priority allocation for high-demand components' },
      { item: 'Technical pre-sales support and solution design assistance' },
      { item: 'Flexible payment terms for established partners' },
    ],
    corporateGovTitle: 'For Corporate & Government Buyers',
    corporateGovAdvantages: [
      { item: 'Compliance with UAE procurement regulations' },
      { item: 'VAT-compliant invoicing (TRN: 100207478700003)' },
      { item: 'Project-based pricing for large-scale deployments' },
      { item: 'Detailed product documentation and compliance certificates' },
      { item: 'Extended warranty and service-level agreements available' },
    ],
    ecommerceRetailTitle: 'For E-Commerce & Retail Partners',
    ecommerceRetailAdvantages: [
      { item: 'Drop-shipping support with white-label packaging' },
      { item: 'Real-time stock API integration' },
      { item: 'Marketing collateral and product imagery' },
      { item: 'Competitive retail pricing with healthy margins' },
      { item: 'Fast fulfillment from Jebel Ali warehouse' },
    ],
  },
  industriesTitle: 'Industries We Serve',
  industries: [
    { industry: 'IT Services & MSPs', requirements: 'SSDs, RAM, networking equipment' },
    { industry: 'Construction & Real Estate', requirements: 'Surveillance, networking, cabling' },
    { industry: 'Education', requirements: 'Laptops, monitors, classroom technology' },
    { industry: 'Healthcare', requirements: 'Reliable storage, secure networking' },
    { industry: 'Government', requirements: 'High-volume procurement, compliance-grade hardware' },
    { industry: 'Retail & E-Commerce', requirements: 'POS systems, displays, accessories' },
    { industry: 'Gaming & Entertainment', requirements: 'High-performance GPUs, gaming monitors, fast storage' },
    { industry: 'Financial Services', requirements: 'Enterprise-grade SSDs, secure networking' },
  ],
  infrastructure: {
    warehouseTitle: 'Warehouse & Logistics',
    warehouseDescription:
      'Through our associated company StarSeed Technologies ME FZE (Jebel Ali Free Zone, UAE), we maintain:',
    warehouseFeatures: [
      { item: 'Climate-controlled warehousing for sensitive components' },
      { item: 'Real-time inventory management with stock visibility' },
      { item: 'Same-day dispatch for orders placed before 2:00 PM GST' },
      { item: 'Insured shipping with tracking across all served regions' },
      { item: 'Dedicated logistics team handling customs clearance and documentation' },
    ],
    retailTitle: 'Retail Presence',
    retailDescription:
      'Stellent Technologies ME LLC (Bur Dubai) operates as our retail storefront, providing:',
    retailFeatures: [
      { item: 'Walk-in customer service and product demonstrations' },
      { item: 'Pickup point for online orders' },
      { item: 'Technical consultation and product recommendations' },
    ],
  },
  getStartedTitle: 'Get Started',
  getStartedItems: [
    { title: 'Registered Business?', description: 'Contact our sales team for trade pricing and priority support', ctaLabel: 'Contact Sales', ctaLink: '/contact' },
    { title: 'New Partner Inquiry?', description: 'Contact our distribution team at distribution@simalme.com', ctaLabel: 'Email Distribution Team', ctaLink: 'mailto:distribution@simalme.com' },
    { title: 'Product Availability?', description: 'Browse our live product catalog or speak with a product specialist', ctaLabel: 'Browse Catalog', ctaLink: '/hardware/product-catalog' },
    { title: 'Bulk RFQ?', description: 'Submit your requirements for a customized quotation within 24 hours', ctaLabel: 'Submit RFQ', ctaLink: '/contact' },
  ],
  cta: {
    headline: 'Explore the Full Product Catalog',
    description:
      '76+ authentic IT products across five major categories. Every product is sourced directly from the manufacturer with full warranty.',
    primaryCtaLabel: 'View Product Catalog',
    primaryCtaLink: '/hardware/product-catalog',
    secondaryCtaLabel: 'Brand Partnerships',
    secondaryCtaLink: '/brands',
  },
}

const authorizedBrandsPage = {
  hero: {
    headline: 'Authorized Distribution — Guaranteed Authenticity',
    subHeadline:
      'Unlike gray-market resellers, Simal Technologies is the officially authorized distributor for every brand in our portfolio. Every product that ships from our warehouse carries full manufacturer warranty, dedicated support, and the assurance of authenticity.',
  },
  authorizedBrands: AUTHORIZED_BRANDS,
  cta: {
    headline: 'Interested in Becoming a Partner?',
    description:
      'We are always looking for new reseller and distribution partners across the Middle East, Africa, CIS, and GCC.',
  },
}

const warehouseLogisticsPage = {
  hero: {
    headline: 'Warehouse & Logistics',
    subHeadline:
      'Through our associated company StarSeed Technologies ME FZE (Jebel Ali Free Zone, UAE), we maintain state-of-the-art warehousing and logistics capabilities.',
  },
  warehouse: {
    title: 'Warehouse & Logistics',
    description:
      'Through our associated company <strong>StarSeed Technologies ME FZE</strong> (Jebel Ali Free Zone, UAE), we maintain:',
    features: [
      { feature: 'Climate-controlled warehousing for sensitive components' },
      { feature: 'Real-time inventory management with stock visibility' },
      { feature: 'Same-day dispatch for orders placed before 2:00 PM GST' },
      { feature: 'Insured shipping with tracking across all served regions' },
      { feature: 'Dedicated logistics team handling customs clearance and documentation' },
    ],
  },
  cta: {
    headline: 'Need Logistics Support?',
    description:
      'Contact our logistics team for shipping inquiries, customs clearance, and bulk order fulfillment.',
  },
}

const retailPresencePage = {
  hero: {
    headline: 'Retail Presence',
    subHeadline:
      'Stellent Technologies ME LLC (Bur Dubai) operates as our retail storefront, providing direct customer access to our full product range.',
  },
  retail: {
    title: 'Retail Presence',
    description:
      '<strong>Stellent Technologies ME LLC</strong> (Bur Dubai) operates as our retail storefront, providing:',
    features: [
      { feature: 'Walk-in customer service and product demonstrations' },
      { feature: 'Pickup point for online orders' },
      { feature: 'Technical consultation and product recommendations' },
    ],
  },
  cta: {
    headline: 'Visit Our Store',
    description:
      'Come see our products in person. Our team is ready to help with product demonstrations and technical consultations.',
  },
}

const distributionChannelsPage = {
  hero: {
    headline: 'Distribution Channels',
    subHeadline:
      'Simal Technologies operates across multiple distribution channels, serving enterprises, resellers, system integrators, and government entities across the Middle East, Africa, CIS, and GCC.',
  },
  b2bChannels: [
    { label: 'System Integrators (SIs)', description: 'End-to-end IT infrastructure projects' },
    { label: 'Value-Added Resellers (VARs)', description: 'Specialized solutions with pre/post-sales support' },
    { label: 'Corporate Enterprises', description: 'Bulk procurement for internal IT operations' },
    { label: 'Government & Public Sector (B2G)', description: 'Tender-based procurement and large-scale deployments' },
    { label: 'Consultants & Contractors', description: 'Project-specific component sourcing' },
  ],
  ecommerceChannels: [
    { label: 'Online Marketplaces', description: 'Amazon UAE, Sharaf DG, Microless' },
    { label: 'Retail Partners', description: 'Electronics stores and IT retail chains' },
    { label: 'Direct Sales', description: 'Registered business customers with trade pricing' },
  ],
  geographicCoverage: GEOGRAPHIC_COVERAGE,
  cta: {
    headline: 'Ready to Partner With Us?',
    description:
      'Whether you are a system integrator, reseller, or enterprise buyer, we have the right channel for you.',
  },
}

const qualityAssurancePage = {
  hero: {
    headline: 'Quality Assurance & Warranty',
    subHeadline:
      'Every product distributed by Simal Technologies undergoes rigorous quality assurance processes to guarantee authenticity and reliability.',
  },
  qualityAssurance: [
    { item: 'Authenticity Verification — Direct sourcing from manufacturers; no parallel imports' },
    { item: 'Quality Inspection — Physical inspection before dispatch for all orders' },
    { item: 'Manufacturer Warranty — Full manufacturer warranty honored across all served regions' },
    { item: 'Dead-on-Arrival (DOA) Policy — Immediate replacement for DOA units' },
    { item: 'Technical Support — Pre-sales consultation and post-sales technical assistance' },
  ],
  cta: {
    headline: 'Need Product Verification?',
    description:
      'Contact our quality assurance team for product authenticity verification or warranty claims.',
  },
}

const GLOBALS: { slug: string; label: string; data: Record<string, unknown> }[] = [
  { slug: 'it-dp', label: 'IT Distribution (hub)', data: itDp },
  { slug: 'authorized-brands-page', label: 'Authorized Brands', data: authorizedBrandsPage },
  { slug: 'warehouse-logistics-page', label: 'Warehouse & Logistics', data: warehouseLogisticsPage },
  { slug: 'retail-presence-page', label: 'Retail Presence', data: retailPresencePage },
  { slug: 'distribution-channels-page', label: 'Distribution Channels', data: distributionChannelsPage },
  { slug: 'quality-assurance-page', label: 'Quality Assurance', data: qualityAssurancePage },
]

async function main() {
  console.log(`▶ Seeding ${GLOBALS.length} IT-Distribution globals → ${API}`)
  await ensureAdmin()
  if (!(await login())) {
    console.error('✗ Login failed. Is the dev server running (pnpm dev)?')
    process.exit(1)
  }

  for (const g of GLOBALS) {
    try {
      await api('POST', `/globals/${g.slug}`, g.data)
      console.log(`  ✓ ${g.slug.padEnd(28)} ${g.label}`)
    } catch (err) {
      console.error(`  ✗ ${g.slug} — ${(err as Error).message}`)
    }
  }

  // Best-effort hero background image for the hub page.
  const heroId = await ensureMedia(
    'hello.avif',
    'assets/images/homepage/hello.avif',
    'IT distribution warehouse and logistics',
  )
  if (heroId) {
    try {
      await api('POST', '/globals/it-dp', { heroBackgroundImage: heroId })
      console.log('  ✓ it-dp hero background image set')
    } catch (err) {
      console.warn(`  ! could not set it-dp hero image — ${(err as Error).message}`)
    }
  } else {
    console.log('  · it-dp hero background image skipped (no source file / media unavailable)')
  }

  console.log('✓ Done.')
}

main().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
