/** @deprecated Use seed/index.ts instead — the canonical seeder. */
/**
 * Master Seed Script — Simal Corporate Website (Payload REST API)
 *
 * Seeds all collections and globals via Payload's REST API.
 *
 * Prerequisites:
 *   - Next.js dev server running (pnpm dev)
 *   - Admin user exists or public registration is enabled (dev default)
 *
 * Idempotent: safe to run multiple times. Existing documents are updated
 * by their unique key, new documents are created.
 *
 * Usage:
 *   pnpm seed:local
 *   npx tsx src/scripts/seed.ts
 *
 * Environment:
 *   SEED_API_URL          Base URL of the running app (default: http://localhost:3000)
 */

import 'dotenv/config'

const BASE = process.env.SEED_API_URL || 'http://localhost:3000'
const API = `${BASE}/api`

const ADMIN_EMAIL = 'admin@simal.com'
const ADMIN_PASSWORD = 'SimalAdmin123!'

let token: string | null = null

// ─── Types ───────────────────────────────────────────────────────────

type ApiResponse = { doc?: { id: number }; id?: number; docs?: Array<{ id: number }> }

// ─── HTTP Helpers ────────────────────────────────────────────────────

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms))

async function api(method: string, path: string, body?: Record<string, any>, retries = 3): Promise<ApiResponse> {
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

      return (await res.json()) as ApiResponse
    } catch (e) {
      if (attempt < retries) {
        log('retry', `${method} ${path} attempt ${attempt} failed, retrying in 1s...`)
        await delay(1000)
      } else {
        throw e
      }
    }
  }
  return {}
}

async function login() {
  const res = await fetch(`${API}/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD }),
  })
  if (res.ok) {
    const data = (await res.json()) as { token: string }
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
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD,
        firstName: 'Admin',
        lastName: 'User',
        role: 'administrator',
        active: true,
      }),
    })
  } catch {
    // User might already exist
  }
}

async function findDoc(collection: string, field: string, value: string): Promise<{ id: number } | null> {
  const data = await api('GET', `/${collection}?where[${field}][equals]=${encodeURIComponent(value)}&limit=1`)
  return data.docs?.[0] || null
}

async function findOrCreate(
  collection: string,
  field: string,
  value: string,
  data: Record<string, any>,
): Promise<{ id: number; created: boolean }> {
  const existing = await findDoc(collection, field, value)
  if (existing) {
    const updated = await api('PATCH', `/${collection}/${existing.id}`, data)
    return { id: updated.doc?.id || updated.id || existing.id, created: false }
  }
  const created = await api('POST', `/${collection}`, data)
  return { id: created.doc?.id || created.id || 0, created: true }
}

async function upsertGlobal(slug: string, data: Record<string, any>): Promise<void> {
  await api('POST', `/globals/${slug}`, data)
}

function log(phase: string, msg: string) {
  console.log(`  [${phase}] ${msg}`)
}

function richText(text: string) {
  return {
    root: {
      type: 'root',
      children: [
        {
          type: 'paragraph',
          children: [{ type: 'text', text, version: 1 }],
          version: 1,
        },
      ],
      version: 1,
    },
  }
}

// ─── Seed Data ───────────────────────────────────────────────────────

const CATEGORIES = [
  {
    title: 'Computer Components',
    slug: 'computer-components',
    description: 'SSDs, RAM, graphics cards, motherboards, and processors from leading brands.',
    iconName: 'Cpu',
  },
  {
    title: 'Computer Accessories',
    slug: 'computer-accessories',
    description: 'Cables, hubs, docking stations, chargers, and surge protectors.',
    iconName: 'Cable',
  },
  {
    title: 'Monitors',
    slug: 'monitors',
    description: 'Professional and gaming monitors for every workspace and budget.',
    iconName: 'Monitor',
  },
  {
    title: 'Gaming',
    slug: 'gaming',
    description: 'High-performance gaming GPUs, monitors, and fast storage solutions.',
    iconName: 'Gamepad2',
  },
  {
    title: 'Laptops',
    slug: 'laptops',
    description: 'Enterprise and professional laptops from Dell, HP, and Lenovo.',
    iconName: 'Laptop',
  },
]

const BRAND_SLUGS = [
  'aiwa', 'arktek', 'crucial', 'dell', 'hikvision', 'honeywell', 'hp',
  'kingston', 'koorui', 'lenovo', 'msi', 'nearity', 'pny', 'samsung',
  'sandisk', 'teamgroup', 'toshiba', 'ugreen', 'wd', 'zotac',
]

const BRAND_NAMES: Record<string, string> = {
  aiwa: 'Aiwa', arktek: 'ARKTEK', crucial: 'Crucial', dell: 'Dell',
  hikvision: 'HIKVISION', honeywell: 'Honeywell', hp: 'HP', kingston: 'Kingston',
  koorui: 'KOORUI', lenovo: 'Lenovo', msi: 'MSI', nearity: 'Nearity',
  pny: 'PNY', samsung: 'Samsung', sandisk: 'SanDisk', teamgroup: 'TEAMGROUP',
  toshiba: 'Toshiba', ugreen: 'UGREEN', wd: 'WD', zotac: 'ZOTAC',
}

const PRODUCTS = [
  {
    sku: 'AIWA-MF2208V',
    name: 'Aiwa 22" Flat Slim Monitor, 75Hz, FHD, HDMI/VGA',
    category: 'monitors',
    brand: 'aiwa',
    specs: { size: '22"', resolution: '1920x1080', refreshRate: '75Hz', panelType: 'VA', responseTime: '5ms', ports: 'HDMI, VGA' },
  },
  {
    sku: 'ARK-RTX3060-12GB',
    name: 'ARKTEK RTX3060 LED 12GB GDDR6',
    category: 'gaming',
    brand: 'arktek',
    specs: { gpu: 'RTX 3060', vram: '12GB GDDR6', bus: '192-bit', fans: 'Dual' },
  },
  {
    sku: 'CT1000P3SSD8',
    name: 'Crucial P3 1TB NVMe SSD',
    category: 'computer-components',
    brand: 'crucial',
    specs: { capacities: '1TB, 2TB, 4TB', interface: 'PCIe Gen3 NVMe', formFactor: 'M.2 2280' },
  },
  {
    sku: 'DELL-15-I3',
    name: 'Dell 15 Laptop — 14th Gen Intel Core 3',
    category: 'laptops',
    brand: 'dell',
    specs: { cpu: '14th Gen Intel Core 3', ram: '8GB', storage: '512GB SSD', display: '15.6" FHD 120Hz' },
  },
  {
    sku: 'HON-6OUT-MS',
    name: 'Honeywell 6 Out Surge Protector with Master Switch',
    category: 'computer-accessories',
    brand: 'honeywell',
    specs: { outlets: '6', ports: '2xPD20W, 2xUSB', protection: '1050 Joules', cordLength: '1.8m' },
  },
  {
    sku: 'KNG-XS1000-1TB',
    name: 'Kingston XS1000 1TB Portable SSD',
    category: 'computer-components',
    brand: 'kingston',
    specs: { capacity: '1TB', readSpeed: '1050 MB/s', type: 'Portable SSD' },
  },
  {
    sku: 'KOOR-27-FHD',
    name: 'KOORUI 27" 1920x1080 Gaming Monitor',
    category: 'monitors',
    brand: 'koorui',
    specs: { size: '27"', resolution: '1920x1080', refreshRate: '240Hz', responseTime: '1ms', panelType: 'VA' },
  },
  {
    sku: 'LEN-IDEAPAD3-I5',
    name: 'Lenovo IdeaPad Slim 3 — 13th Gen Intel Core i5',
    category: 'laptops',
    brand: 'lenovo',
    specs: { cpu: 'Intel Core i5-13420H', ram: '24GB', storage: '1TB SSD', display: '15.3"' },
  },
  {
    sku: 'SAM-T7SHIELD-1TB',
    name: 'Samsung T7 Shield Portable SSD 1TB',
    category: 'computer-components',
    brand: 'samsung',
    specs: { capacity: '1TB', readSpeed: '1,050 MB/s', interface: 'USB 3.2 Gen 2', rating: 'IP65 Water & Dust Resistance' },
  },
  {
    sku: 'UGR-15596',
    name: 'UGREEN 5-in-1 USB-C Hub',
    category: 'computer-accessories',
    brand: 'ugreen',
    specs: { ports: 'HDMI 4K@30Hz, 3x USB-A 5Gbps', powerDelivery: '100W', design: 'Ultra Slim' },
  },
]

const PAGES = [
  {
    title: 'About Us',
    slug: 'about',
    excerpt: 'Simal Technologies Middle East LLC is a premier IT distributor headquartered in Dubai, UAE.',
    status: 'published',
    meta: { title: 'About Us — Simal Technologies', description: 'Learn about Simal Technologies.' },
  },
  {
    title: 'IT Distribution',
    slug: 'it-distribution',
    excerpt: 'Authorized IT distribution across the Middle East, Africa, CIS, and GCC regions.',
    status: 'published',
    meta: { title: 'IT Distribution — Simal Technologies', description: 'Authorized IT distributor in Dubai, UAE.' },
  },
  {
    title: 'Product Catalog',
    slug: 'product-catalog',
    excerpt: 'Browse 76+ authentic IT products across five major categories.',
    status: 'published',
    meta: { title: 'Product Catalog — Simal Technologies', description: 'Browse the complete IT product catalog.' },
  },
  {
    title: 'Computer Components',
    slug: 'computer-components',
    excerpt: 'SSDs, RAM, graphics cards, and motherboards from leading brands.',
    status: 'published',
    meta: { title: 'Computer Components — Simal Technologies', description: 'Enterprise SSDs, RAM, graphics cards, and motherboards.' },
  },
  {
    title: 'Computer Accessories',
    slug: 'computer-accessories',
    excerpt: 'Cables, hubs, docking stations, and surge protectors.',
    status: 'published',
    meta: { title: 'Computer Accessories — Simal Technologies', description: 'HDMI cables, USB hubs, docking stations, and surge protectors.' },
  },
  {
    title: 'Monitors',
    slug: 'monitors',
    excerpt: 'Professional and gaming monitors for every workspace.',
    status: 'published',
    meta: { title: 'Monitors — Simal Technologies', description: 'Professional and gaming monitors.' },
  },
  {
    title: 'Gaming',
    slug: 'gaming',
    excerpt: 'High-performance gaming GPUs, monitors, and fast storage.',
    status: 'published',
    meta: { title: 'Gaming — Simal Technologies', description: 'Gaming graphics cards, monitors, and fast SSDs.' },
  },
  {
    title: 'Laptops',
    slug: 'laptops',
    excerpt: 'Enterprise and professional laptops from Dell, HP, and Lenovo.',
    status: 'published',
    meta: { title: 'Laptops — Simal Technologies', description: 'Business laptops from Dell, HP, and Lenovo.' },
  },
  {
    title: 'Brands',
    slug: 'brands',
    excerpt: 'Authorized distributor for 20+ world-class IT brands.',
    status: 'published',
    meta: { title: 'Our Brands — Simal Technologies', description: 'Authorized distributor for 20+ world-class IT brands.' },
  },
  {
    title: 'Careers',
    slug: 'careers',
    excerpt: 'Join Simal Technologies and build your career with a leading IT distributor.',
    status: 'published',
    meta: { title: 'Careers — Simal Technologies', description: 'Explore career opportunities at Simal Technologies.' },
  },
  {
    title: 'Contact',
    slug: 'contact',
    excerpt: 'Get in touch with Simal Technologies for sales inquiries and support.',
    status: 'published',
    meta: { title: 'Contact Us — Simal Technologies', description: 'Contact Simal Technologies Middle East LLC.' },
  },
]

const PAGE_PARENTS: Record<string, string[]> = {
  'it-distribution': ['product-catalog', 'computer-components', 'computer-accessories', 'monitors', 'gaming', 'laptops'],
}

const STATS = [
  { label: 'Years of Excellence', value: '20', suffix: '+', order: 1, active: true },
  { label: 'Global Brands', value: '20', suffix: '+', order: 2, active: true },
  { label: 'Products Distributed', value: '76', suffix: '+', order: 3, active: true },
  { label: 'Countries Served', value: '15', suffix: '+', order: 4, active: true },
  { label: 'Enterprise Clients', value: '5,000', suffix: '+', order: 5, active: true },
]

const TESTIMONIALS = [
  { authorName: 'Ahmed Al-Rashid', authorTitle: 'IT Director', authorCompany: 'GulfTech Solutions', quote: 'Simal Technologies has been our trusted IT distribution partner for over 5 years.', rating: 5, order: 1, active: true },
  { authorName: 'Sarah Williams', authorTitle: 'Procurement Manager', authorCompany: 'Digital Dynamics FZE', quote: 'Real-time stock visibility and competitive pricing help us make informed purchasing decisions.', rating: 5, order: 2, active: true },
  { authorName: 'Elena Petrov', authorTitle: 'Operations Director', authorCompany: 'CIS Technology Partners', quote: "Simal's distribution network across CIS countries is unmatched.", rating: 4, order: 3, active: true },
]

const AWARDS = [
  { title: 'Best IT Distributor — MEA 2024', year: '2024', issuer: 'MEA Business Awards', description: 'Recognized as the leading IT distribution company in the Middle East and Africa region.', order: 1, active: true },
  { title: 'Dell Partner of the Year — Middle East 2023', year: '2023', issuer: 'Dell Technologies', description: 'Awarded for exceptional sales performance and customer satisfaction.', order: 2, active: true },
  { title: 'HP Excellence in Distribution Award 2023', year: '2023', issuer: 'HP Inc.', description: 'Recognized for outstanding growth and commitment to HP product distribution in the GCC region.', order: 3, active: true },
]

const NEWS_ITEMS = [
  { title: 'Simal Technologies Expands Distribution Network to East Africa', slug: 'expands-east-africa', excerpt: 'Simal Technologies announces strategic expansion into Kenya, Tanzania, and Uganda.', publishedAt: '2024-11-15T10:00:00.000Z', active: true },
  { title: 'New Partnership with KOORUI Monitors for the Middle East', slug: 'koorui-partnership', excerpt: 'Simal Technologies signs exclusive distribution agreement with KOORUI.', publishedAt: '2024-10-20T09:00:00.000Z', active: true },
]

const BLOG_POSTS = [
  { title: 'How to Choose the Right SSD for Your Enterprise', slug: 'choose-right-ssd-enterprise', excerpt: 'A comprehensive guide to selecting the best SSD for enterprise workloads.', status: 'published', publishedAt: '2024-11-01T10:00:00.000Z' },
  { title: '5 Reasons to Upgrade to DDR5 RAM in 2024', slug: 'upgrade-ddr5-ram-2024', excerpt: 'DDR5 is here and it is a game-changer.', status: 'published', publishedAt: '2024-10-15T09:00:00.000Z' },
]

const OFFICE_LOCATIONS = [
  { city: 'Dubai', country: 'United Arab Emirates', address: 'Dubai Internet City, Building 14, Office 301\nDubai, UAE', phone: '+971 4 393 0507', email: 'info@simalme.com', mapUrl: 'https://maps.google.com/?q=Dubai+Internet+City', isHeadquarters: true, active: true },
  { city: 'Riyadh', country: 'Saudi Arabia', address: 'King Fahd Road, Al Olaya District\nRiyadh, Saudi Arabia', phone: '+966 11 234 5678', email: 'riyadh@simalme.com', mapUrl: 'https://maps.google.com/?q=Riyadh+Saudi+Arabia', isHeadquarters: false, active: true },
]

const FAQ_ENTRIES = [
  { category: 'general', question: 'What is Simal Technologies?', answer: 'Simal Technologies Middle East LLC is a premier IT distributor headquartered in Dubai, UAE.', order: 1, active: true },
  { category: 'general', question: 'Which regions does Simal Technologies serve?', answer: 'We serve customers across the Middle East, Africa, CIS countries, and the broader GCC region.', order: 2, active: true },
  { category: 'products', question: 'Are all products genuine and covered by warranty?', answer: 'Yes. Every product is 100% genuine and comes with the full manufacturer warranty.', order: 3, active: true },
]

const CAREERS = [
  {
    title: 'Senior Account Manager — IT Distribution',
    slug: 'senior-account-manager-it-distribution',
    department: 'Sales',
    location: 'Dubai, UAE',
    type: 'full-time',
    description: 'We are looking for an experienced Account Manager to drive B2B sales across the Gulf region.',
    requirements: '5+ years in IT distribution or enterprise sales.',
    status: 'open',
  },
  {
    title: 'Digital Marketing Specialist',
    slug: 'digital-marketing-specialist',
    department: 'Marketing',
    location: 'Dubai, UAE',
    type: 'full-time',
    description: 'We are seeking a creative Digital Marketing Specialist to manage our online presence.',
    requirements: '2+ years in B2B digital marketing.',
    status: 'open',
  },
]

// ─── Main ────────────────────────────────────────────────────────────

async function seed() {
  console.log('\n🚀 Simal Technologies — Payload REST API Seeder\n')
  console.log('='.repeat(60))
  console.log(`\n  API: ${API}`)
  console.log(`  App: ${BASE}\n`)

  // ── Phase 0: Auth ──
  console.log('\n📋 Phase 0: Admin User & Login')
  await ensureAdmin()
  const loggedIn = await login()
  if (!loggedIn) {
    console.error('  ✗ Could not login. Is the dev server running? (pnpm dev)')
    process.exit(1)
  }
  log('auth', `✓ Logged in as ${ADMIN_EMAIL}`)

  // ── Phase 1: Categories ──
  console.log('\n📋 Phase 1: Categories')
  const categoryIds: Record<string, number> = {}
  for (const cat of CATEGORIES) {
    const result = await findOrCreate('categories', 'slug', cat.slug, cat)
    categoryIds[cat.slug] = result.id
    log('categories', `${result.created ? '✓ Created' : '↻ Updated'} ${cat.title}`)
  }

  // ── Phase 2: Brands ──
  console.log('\n📋 Phase 2: Brands')
  const brandIds: Record<string, number> = {}
  for (const slug of BRAND_SLUGS) {
    const name = BRAND_NAMES[slug]
    const data = {
      name,
      slug,
      meta: { title: name, description: `${name} products distributed by Simal Technologies` },
    }
    const result = await findOrCreate('brands', 'slug', slug, data)
    brandIds[slug] = result.id
    log('brands', `${result.created ? '✓ Created' : '↻ Updated'} ${name}`)
  }

  // ── Phase 3: Products ──
  console.log('\n📋 Phase 3: Products')
  const productIds: number[] = []
  for (const prod of PRODUCTS) {
    const data: Record<string, any> = {
      sku: prod.sku,
      slug: prod.sku.toLowerCase(),
      name: prod.name,
      specs: prod.specs,
    }
    if (categoryIds[prod.category]) data.category = categoryIds[prod.category]
    if (brandIds[prod.brand]) data.brand = brandIds[prod.brand]
    const result = await findOrCreate('products', 'sku', prod.sku, data)
    productIds.push(result.id)
    log('products', `${result.created ? '✓ Created' : '↻ Updated'} ${prod.name}`)
  }

  // ── Phase 4: Stats ──
  console.log('\n📋 Phase 4: Stats')
  const statIds: number[] = []
  for (const stat of STATS) {
    const result = await findOrCreate('stats', 'label', stat.label, stat)
    statIds.push(result.id)
    log('stats', `${result.created ? '✓ Created' : '↻ Updated'} ${stat.label}`)
  }

  // ── Phase 5: Testimonials ──
  console.log('\n📋 Phase 5: Testimonials')
  const testimonialIds: number[] = []
  for (const t of TESTIMONIALS) {
    const result = await findOrCreate('testimonials', 'authorName', t.authorName, t)
    testimonialIds.push(result.id)
    log('testimonials', `${result.created ? '✓ Created' : '↻ Updated'} ${t.authorName}`)
  }

  // ── Phase 6: Awards ──
  console.log('\n📋 Phase 6: Awards')
  const awardIds: number[] = []
  for (const award of AWARDS) {
    const result = await findOrCreate('awards', 'title', award.title, award)
    awardIds.push(result.id)
    log('awards', `${result.created ? '✓ Created' : '↻ Updated'} ${award.title}`)
  }

  // ── Phase 7: News Items ──
  console.log('\n📋 Phase 7: News Items')
  for (const news of NEWS_ITEMS) {
    const result = await findOrCreate('news-items', 'slug', news.slug, news)
    log('news-items', `${result.created ? '✓ Created' : '↻ Updated'} ${news.title}`)
  }

  // ── Phase 8: Blog Posts ──
  console.log('\n📋 Phase 8: Blog Posts')
  for (const post of BLOG_POSTS) {
    const result = await findOrCreate('blog-posts', 'slug', post.slug, post)
    log('blog-posts', `${result.created ? '✓ Created' : '↻ Updated'} ${post.title}`)
  }

  // ── Phase 9: Office Locations ──
  console.log('\n📋 Phase 9: Office Locations')
  for (const office of OFFICE_LOCATIONS) {
    const result = await findOrCreate('office-locations', 'city', office.city, office)
    log('office-locations', `${result.created ? '✓ Created' : '↻ Updated'} ${office.city}`)
  }

  // ── Phase 10: FAQ Entries ──
  console.log('\n📋 Phase 10: FAQ Entries')
  for (const faq of FAQ_ENTRIES) {
    const result = await findOrCreate('faq-entries', 'question', faq.question, {
      category: faq.category,
      question: faq.question,
      answer: richText(faq.answer),
      order: faq.order,
      active: faq.active,
    })
    log('faq-entries', `${result.created ? '✓ Created' : '↻ Updated'} ${faq.question.substring(0, 50)}...`)
  }

  // ── Phase 11: Careers ──
  console.log('\n📋 Phase 11: Careers')
  for (const career of CAREERS) {
    const result = await findOrCreate('careers', 'slug', career.slug, {
      ...career,
      description: richText(career.description),
      requirements: richText(career.requirements),
    })
    log('careers', `${result.created ? '✓ Created' : '↻ Updated'} ${career.title}`)
  }

  // ── Phase 12: Pages ──
  console.log('\n📋 Phase 12: Pages')
  const PROTECTED_PAGE_SLUGS = ['about']
  const pageIdsBySlug = new Map<string, number>()
  for (const page of PAGES) {
    const existing = await findDoc('pages', 'slug', page.slug)
    if (existing) {
      if (PROTECTED_PAGE_SLUGS.includes(page.slug)) {
        pageIdsBySlug.set(page.slug, existing.id)
        log('pages', `⊘ Skipped (protected): ${page.title}`)
        continue
      }
      await api('PATCH', `/pages/${existing.id}`, page)
      pageIdsBySlug.set(page.slug, existing.id)
      log('pages', `↻ Updated ${page.title}`)
    } else {
      const created = await api('POST', '/pages', page)
      const id = created.doc?.id || created.id || 0
      pageIdsBySlug.set(page.slug, id)
      log('pages', `✓ Created ${page.title}`)
    }
  }

  for (const [parentSlug, childSlugs] of Object.entries(PAGE_PARENTS)) {
    const parentId = pageIdsBySlug.get(parentSlug)
    if (!parentId) continue
    for (const childSlug of childSlugs) {
      const childId = pageIdsBySlug.get(childSlug)
      if (!childId) continue
      await api('PATCH', `/pages/${childId}`, { parent: parentId })
      log('pages', `  → Linked "${childSlug}" under "${parentSlug}"`)
    }
  }

  // ── Phase 13: Header Global ──
  console.log('\n📋 Phase 13: Header Global')
  await upsertGlobal('header', {
    utilityBar: {
      phone: '+971 4 393 0507',
      email: 'info@simalme.com',
      whatsapp: '+971 54 308 8655',
      showLanguageSwitcher: true,
      showWhatsapp: true,
      showSocialLinks: true,
      socialLinks: [
        { platform: 'linkedin', url: 'https://www.linkedin.com/company/simal-technologies-middle-east-llc/' },
        { platform: 'instagram', url: 'https://www.instagram.com/simaltechnologiesuae/' },
        { platform: 'facebook', url: 'https://www.facebook.com/SimalTechnologiesMiddleEast' },
        { platform: 'youtube', url: 'https://www.youtube.com/@simaltechnologies' },
      ],
    },
    ctaButton: { label: 'Contact Sales', href: '/contact', show: true },
    navItems: [
      { label: 'Home', link: '/', status: 'published', hasDropdown: false, children: [] },
      {
        label: 'Hardware',
        link: '/hardware/product-catalog',
        status: 'published',
        hasDropdown: true,
        children: [
          { label: 'Product Catalog', link: '/hardware/product-catalog', description: '', status: 'published' },
          { label: 'Computer Components', link: '/hardware/computer-components', description: '', status: 'published' },
          { label: 'Computer Accessories', link: '/hardware/computer-accessories', description: '', status: 'published' },
          { label: 'Monitors', link: '/hardware/monitors', description: '', status: 'published' },
          { label: 'Gaming', link: '/hardware/gaming', description: '', status: 'published' },
          { label: 'Laptops', link: '/hardware/laptops', description: '', status: 'published' },
        ],
      },
      { label: 'Brands', link: '/brands', status: 'published', hasDropdown: false, children: [] },
      {
        label: 'Solutions',
        link: '/solutions',
        status: 'published',
        hasDropdown: true,
        children: [
          { label: 'Annual Maintenance (AMC)', link: '/solutions/amc', description: 'Hardware, software & network maintenance with SLA-backed 24/7 support', status: 'published' },
          { label: 'AV & Meeting Room', link: '/solutions/av-meeting-room', description: 'Nearity conferencing — design, install & integration', status: 'published' },
          { label: 'Cloud Security', link: '/solutions/cloud-security', description: 'Threat detection, IAM, encryption & 24/7 SOC', status: 'published' },
          { label: 'Data Recovery & Storage', link: '/solutions/data-recovery-storage', description: 'NAS/SAN architecture, backup strategy & recovery', status: 'published' },
          { label: 'Firewall Solutions', link: '/solutions/firewall', description: 'Sophos XG next-gen firewalls with managed monitoring', status: 'published' },
        ],
      },
      {
        label: 'Resources',
        link: '/resources',
        status: 'published',
        hasDropdown: true,
        children: [
          { label: 'Blog & News', link: '/blog', description: '', status: 'published' },
          { label: 'FAQs', link: '/faqs', description: '', status: 'published' },
        ],
      },
      { label: 'About us', link: '/about', status: 'published', hasDropdown: false, children: [] },
      { label: 'careers', link: '/careers', status: 'published', hasDropdown: false, children: [] },
      { label: 'contact', link: '/contact', status: 'published', hasDropdown: false, children: [] },
    ],
  })
  log('header', '✓ Seeded')

  // ── Phase 14: Footer Global ──
  console.log('\n📋 Phase 14: Footer Global')
  await upsertGlobal('footer', {
    brandName: 'Simal Technologies',
    brandSubtitle: 'Middle East LLC',
    brandDescription: 'Premier IT distributor in Dubai, UAE with 20+ years experience. Authorized distributor for 20+ global brands.',
    socialLinks: [
      { platform: 'linkedin', url: 'https://www.linkedin.com/company/simal-technologies-middle-east-llc/' },
      { platform: 'instagram', url: 'https://www.instagram.com/simaltechnologiesuae/' },
      { platform: 'facebook', url: 'https://www.facebook.com/SimalTechnologiesMiddleEast' },
      { platform: 'youtube', url: 'https://www.youtube.com/@simaltechnologies' },
      { platform: 'whatsapp', url: 'https://wa.me/971543088655' },
    ],
    footerColumns: [
      {
        title: 'Company',
        links: [
          { label: 'About us', href: '/about' },
          { label: 'careers', href: '/careers' },
          { label: 'contact', href: '/contact' },
          { label: 'Blog & Events', href: '/blog' },
        ],
      },
      {
        title: 'Products',
        links: [
          { label: 'Product Catalog', href: '/hardware/product-catalog' },
          { label: 'Brands', href: '/brands' },
          { label: 'Product Category', href: '/brands?tab=categories' },
          { label: 'RFQ / Inquiry', href: '/contact' },
        ],
      },
      {
        title: 'Support',
        links: [
          { label: 'Contact Support', href: '/contact' },
          { label: 'Sales Inquiry', href: '/contact' },
          { label: 'Our Offices', href: '/contact' },
          { label: 'General Inquiry', href: '/contact' },
        ],
      },
    ],
    contactPhone: '+971 4 393 0507',
    contactEmail: 'info@simalme.com',
    contactAddress: 'Office 201, Dar Al Riffa Building, Bur Dubai, UAE',
    vatNumber: '100207478700003',
    tradeLicense: '49740',
    chamberMember: 'Dubai Chamber Member',
    copyright: '© {year} Simal Technologies Middle East LLC. A TwinMOS Group Company. All rights reserved.',
    parentCompany: { name: 'TwinMOS Group', url: 'https://twinmos.com' },
  })
  log('footer', '✓ Seeded')

  // ── Phase 15: Site Settings Global ──
  console.log('\n📋 Phase 15: Site Settings Global')
  await upsertGlobal('site-settings', {
    siteName: 'Simal Technologies',
    defaultEmail: 'info@simalme.com',
    defaultPhone: '+971 4 393 0507',
    address: 'Dubai Internet City, Building 14, Office 301\nDubai, United Arab Emirates',
    socialLinks: [
      { platform: 'LinkedIn', url: 'https://www.linkedin.com/company/simal-technologies' },
      { platform: 'Twitter', url: 'https://twitter.com/simaltech' },
      { platform: 'Facebook', url: 'https://www.facebook.com/simaltechnologies' },
      { platform: 'Instagram', url: 'https://www.instagram.com/simaltechnologies' },
    ],
    defaultSeo: {
      title: 'Simal Technologies — Premier IT Distributor | Dubai, UAE',
      description: 'Simal Technologies Middle East LLC — authorized IT distributor for 20+ global brands. 76+ products across MEA, CIS & GCC.',
    },
  })
  log('site-settings', '✓ Seeded')

  // ── Phase 16: Homepage Global ──
  console.log('\n📋 Phase 16: Homepage Global')
  await upsertGlobal('homepage', {
    sectionConfig: [
      { sectionId: 'hero', visible: true },
      { sectionId: 'trust-band', visible: true },
      { sectionId: 'why-choose-us', visible: true },
      { sectionId: 'services', visible: true },
      { sectionId: 'product-categories', visible: true },
      { sectionId: 'solutions-highlight', visible: true },
      { sectionId: 'awards-showcase', visible: true },
      { sectionId: 'company-intro', visible: true },
      { sectionId: 'pre-sales-compiler', visible: true },
      { sectionId: 'trusted-partners', visible: true },
      { sectionId: 'authorized-brands', visible: true },
      { sectionId: 'customer-reviews', visible: true },
      { sectionId: 'news-and-blogs', visible: true },
      { sectionId: 'newsletter', visible: true },
      { sectionId: 'quick-contact', visible: true },
      { sectionId: 'regional-selector', visible: true },
    ],
    heroContent: {
      companyName: 'Simal Technologies Middle East LLC',
      badge: 'Leading Middle East IT Distribution Hub',
      headline1: 'Powering Next-Gen',
      headline2: 'Enterprise Tech Across',
      headline3: 'The Gulf.',
      subheadline: 'Simal Technologies Middle East LLC is the premier value-added distributor supplying certified high-performance IT hardware and solutions to enterprises.',
      featurePills: [
        { label: 'GCC Wide Delivery', icon: 'Globe' },
        { label: 'Certified Hardware', icon: 'ShieldCheck' },
        { label: 'JAFZA Stocked', icon: 'Truck' },
        { label: 'CITC Compliant', icon: 'BadgeCheck' },
      ],
      cta1: { label: 'Explore Products', link: '/hardware/product-catalog' },
      cta2: { label: 'Our Vision', link: '#intro-section' },
      stats: [
        { value: '20+', label: 'Premium Vendors', sub: 'Global brands', icon: 'Award' },
        { value: '24/7', label: 'GCC SLA Helpdesk', sub: 'Always online', icon: 'Headphones' },
        { value: '140+', label: 'Active Resellers', sub: 'Across Middle East', icon: 'Users' },
      ],
    },
    productCategories: Object.values(categoryIds),
    featuredProducts: productIds.slice(0, 6),
    featuredBrands: Object.values(brandIds).slice(0, 12),
    topProducts: productIds.slice(0, 5),
    featuredTestimonials: testimonialIds,
  })
  log('homepage', '✓ Seeded')

  console.log('\n' + '='.repeat(60))
  console.log('✅ Seed complete!')
  console.log(`   Admin login: ${ADMIN_EMAIL} / ${ADMIN_PASSWORD}`)
  console.log(`   Payload admin: ${BASE}/admin`)
  console.log('='.repeat(60) + '\n')
}

seed().catch((err) => {
  console.error('Fatal seed error:', err)
  process.exit(1)
})
