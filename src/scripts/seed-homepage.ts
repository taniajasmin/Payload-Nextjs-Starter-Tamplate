/** @deprecated Use seed/index.ts instead — the canonical seeder. */
/**
 * Homepage & Footer Seed Script — Simal Corporate Website
 *
 * Seeds the Homepage global, Footer global, and supporting collections
 * (Stats, Testimonials, Awards) with the exact content currently shown
 * on the frontend.
 *
 * Idempotent: safe to run multiple times.
 * Uses the Payload REST API — requires the Next.js dev server to be running.
 *
 * Usage:  npx tsx src/scripts/seed-homepage.ts
 */

import 'dotenv/config'
import { readFileSync, existsSync } from 'fs'
import { resolve, basename, dirname, extname } from 'path'

const BASE = process.env.SEED_API_URL || 'http://localhost:3000'
const API = `${BASE}/api`
const PUBLIC_DIR = resolve(__dirname, '../../public')

let token: string | null = null

const MIME_MAP: Record<string, string> = {
  png: 'image/png',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  gif: 'image/gif',
  svg: 'image/svg+xml',
  webp: 'image/webp',
  avif: 'image/avif',
}

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

async function findDoc(collection: string, field: string, value: string) {
  const data = await api('GET', `/${collection}?where[${field}][equals]=${encodeURIComponent(value)}&limit=1`)
  return data.docs?.[0] || null
}

async function findOrCreate(collection: string, field: string, value: string, data: any) {
  const existing = await findDoc(collection, field, value)
  if (existing) {
    const updated = await api('PATCH', `/${collection}/${existing.id}`, data)
    return updated.doc?.id || updated.id
  }
  const created = await api('POST', `/${collection}`, data)
  return created.doc?.id || created.id
}

function log(phase: string, msg: string) {
  console.log(`  [${phase}] ${msg}`)
}

// ─── Media helpers (self-contained, idempotent by filename) ─────────

async function findMediaByFilename(filename: string): Promise<number | null> {
  const data = await api(
    'GET',
    `/media?where[filename][equals]=${encodeURIComponent(filename)}&limit=1`,
  )
  return data.docs?.[0]?.id ?? null
}

async function uploadFile(relPath: string, alt: string): Promise<number | null> {
  if (!token) throw new Error('Not logged in')

  let absolutePath = resolve(PUBLIC_DIR, relPath.replace(/^\//, ''))
  if (!existsSync(absolutePath)) {
    const galleryVariant = resolve(
      PUBLIC_DIR,
      dirname(relPath).replace(/^\//, ''),
      'gallery',
      basename(relPath),
    )
    if (existsSync(galleryVariant)) {
      absolutePath = galleryVariant
    } else {
      return null
    }
  }

  const filename = basename(absolutePath)

  const existing = await findMediaByFilename(filename)
  if (existing) return existing

  const fileBuffer = readFileSync(absolutePath)
  const ext = extname(filename).slice(1).toLowerCase()
  const mimeType = MIME_MAP[ext] || 'application/octet-stream'

  const blob = new Blob([fileBuffer], { type: mimeType })
  const formData = new FormData()
  formData.append('file', blob, filename)
  formData.append('_payload', JSON.stringify({ alt: { en: alt } }))

  const res = await fetch(`${API}/media`, {
    method: 'POST',
    headers: { Authorization: `JWT ${token}` },
    body: formData,
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Upload failed for ${filename} (${res.status}): ${text}`)
  }

  const data = await res.json()
  return data.doc?.id || data.id
}

// ─── Seed Data — Exact frontend content ─────────────────────────────

// Hero showcase products pinned by slug — deterministic and survives re-runs
// (otherwise the hero would just track the newest catalog products). Order
// controls the initial carousel order (HeroNew rotates them every 5s).
const HERO_PRODUCT_SLUGS = [
  'koor-34-uwqhd',     // KOORUI 34" Curved Ultrawide Gaming Monitor — the "screen"
  'ark-rtx3060-12gb',  // ARKTEK RTX3060 12GB — the "desktop" GPU
  'ugr-11632',         // Ugreen VGA Male to Male Cable
  'ugr-40410',         // UGREEN HDMI 2.0 4K@60Hz Nylon Braid
  'ugr-10108',         // UGREEN HDMI Cable 4K with Ethernet
  'ugr-80401',         // UGREEN HDMI 2.1 8K Braided Cable
]

const STATS = [
  { label: 'Years of IT distribution experience (founded 2002)', value: '20', suffix: '+', icon: 'globe', order: 1, active: true },
  { label: 'Employees across all business divisions', value: '300', suffix: '+', icon: 'users', order: 2, active: true },
  { label: 'Global Brands as authorized distributor', value: '20', suffix: '+', icon: 'package', order: 3, active: true },
  { label: 'Products across 5 major categories', value: '76', suffix: '+', icon: 'server', order: 4, active: true },
  { label: 'Annual Revenue with consistent growth trajectory', value: '1.97', suffix: 'M', prefix: '$', icon: 'dollar', order: 5, active: true },
]

const TESTIMONIALS = [
  { authorName: 'Jasper Guevarra', authorTitle: 'Technical Support Manager', authorCompany: 'Mercans', quote: "We have been working with Simal Technologies for quite some time now, and our overall experience has been excellent. The quality of the IT products we've received has consistently met our expectations, arriving in great condition and performing reliably.", rating: 5, order: 1, active: true },
  { authorName: 'NADEEM', authorTitle: 'Sales Manager', authorCompany: 'MICROTRANS LLC', quote: "My overall experience with Simal Technologies was great! The team was responsive and provided excellent customer service throughout. I really liked how knowledgeable and helpful they were, addressing all my concerns promptly. The product quality exceeded my expectations; it was reliable and met all the features promised. I'd definitely recommend Simal Technologies for their exceptional service and top-notch products!", rating: 5, order: 2, active: true },
  { authorName: 'Muhammad Jaseem', authorTitle: 'Purchase Executive', authorCompany: 'GRAND PCD Trading LLC', quote: "I have been dealing with your salesman HASSAN MUSHEER, and he was well-behaved and very responsive. Your pricing is also excellent. Your company efficiently manages deliveries, ensuring our orders are sent on time, even when our own delivery team is busy. This reliability makes us prefer purchasing from you. Thank you for the great service!", rating: 5, order: 3, active: true },
]

const AWARDS = [
  { title: 'HIKSEMi Best Distribution Partner 2025', year: '2025', issuer: 'HIKSEMi', description: 'Awarded at the 2025 HIKSEMi MEA National Distributor Summit. Recognition of excellence in IT distribution across the Middle East and Africa region.', order: 1, active: true },
  { title: 'HikVision Best Distributor Partner', year: 'Multi-Year', issuer: 'HikVision', description: "Multiple-year recognition for outstanding partnership with HikVision. Acknowledges strong relationship with one of the world's leading security surveillance brands.", order: 2, active: true },
]

const HOMEPAGE_DATA: Record<string, any> = {
  // Section visibility & ordering
  sectionConfig: [
    { sectionId: 'hero', visible: true },
    { sectionId: 'intro', visible: true },
    { sectionId: 'product-categories', visible: true },
    { sectionId: 'featured-products', visible: true },
    { sectionId: 'authorized-brands', visible: true },
    { sectionId: 'top-products', visible: true },
    { sectionId: 'customer-reviews', visible: true },
    { sectionId: 'news-and-blogs', visible: true },
    { sectionId: 'newsletter', visible: true },
  ],

  // Hero Content
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
    heroProducts: [], // Populated by script after products exist
  },

  // Featured Products
  featuredProductsSection: {
    badge: 'Product Catalog',
    heading: 'Top Products from Our Catalog',
    subtext: 'Featured products from our catalog',
    cardCtaLabel: 'Request Quote',
    cardCtaLink: '/hardware/product-catalog',
    bottomCtaLabel: 'View All Products',
    bottomCtaLink: '/hardware/product-catalog',
  },

  // Brand Showcase
  brandShowcaseSection: {
    badge: 'Authorized Distributor',
    heading: 'Authorized Distributor for 20+ Global IT Brands',
    subtext: 'Simal Technologies Middle East LLC maintains legal partner and VAD agreements with world-leading technology manufacturers. We handle GCC regulatory clearings, local customs protocols, storage configuration, and deliver certified localized warranty schemes.',
    ctaLabel: 'View All Brands',
    ctaLink: '/brands',
  },

  // Product Categories
  productCategoriesSection: {
    badge: 'Simal Portfolio Index',
    heading: 'Product Categories',
    subtext: "Explore Simal's certified portfolio across every IT hardware vertical.",
  },

  // Top Products
  topProductsSection: {
    badge: 'Top Products of the Quarter',
    heading: 'High Density Systems in Center Focus',
    subtext: "Drag, swipe, or click the outer skewed cards below to rotate them through the foreground. Experience Simal's premium hardware line in native 3D coverflow perspective.",
  },

  // Testimonials
  testimonialsSection: {
    badge: 'Success Stories',
    heading: 'Trusted by Top GCC ICT Experts',
    ctaLabel: 'Read All Reviews',
    ctaLink: '/about',
  },

  // Latest News
  latestNewsSection: {
    badge: 'Technical Insights & Press',
    heading: 'The Simal Engineering Blog',
    subtext: 'Stay up-to-date with technical reviews from our systems engineers detailing architectural setups, local GCC spectrum clearances, and hardware integrations keys.',
    cardCtaLabel: 'Read more',
    bottomCtaLabel: 'Read Our Blog',
    bottomCtaLink: '/blog',
    categories: [
      { label: 'Company News', color: '#3A85C8' },
      { label: 'Tech Guides', color: '#DF4C73' },
      { label: 'Industry Insights', color: '#B0DDE4' },
    ],
  },

  // Newsletter
  newsletterSection: {
    badge: 'Newsletter',
    heading: 'Get the Latest in IT Distribution & Tech Insights',
    subtext: 'Subscribe for product updates, industry insights, and exclusive offers delivered to your inbox.',
    emailPlaceholder: 'Email address *',
    namePlaceholder: 'Name (optional)',
    consentText: 'I agree to receive marketing emails and accept the Privacy Policy.',
    privacyLink: '/legal/privacy-policy',
    privacyLabel: 'Read our Privacy Policy',
    submitLabel: 'Subscribe',
    submittingLabel: 'Subscribing...',
    successTitle: 'Thank you for subscribing!',
    successMessage: 'Please check your email to confirm your subscription.',
    errorText: 'Something went wrong. Please try again later.',
    footerText: 'No spam, unsubscribe anytime.',
  },

}

const FOOTER_DATA: Record<string, any> = {
  brandName: 'Simal Technologies',
  brandSubtitle: 'Middle East LLC',
  brandDescription: 'Premier IT distributor in Dubai, UAE with 20+ years experience. Authorized distributor for 20+ global brands. Delivering authentic IT products across the Middle East, Africa, and CIS.',

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
        { label: 'Leadership', href: '/about/leadership' },
        { label: 'Awards', href: '/about/awards-and-achievements' },
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
        { label: 'Product Comparison', href: '/hardware/product-comparison' },
        { label: 'RFQ / Inquiry', href: '/contact/sales-inquiry' },
        { label: 'New Arrivals', href: '/hardware/product-catalog?sort=newest' },
      ],
    },
    {
      title: 'Support',
      links: [
        { label: 'Contact Support', href: '/contact/support' },
        { label: 'Sales Inquiry', href: '/contact/sales-inquiry' },
        { label: 'Our Offices', href: '/contact/offices' },
        { label: 'Regional Contacts', href: '/contact/regional' },
        { label: 'Returns & Shipping', href: '/contact/support' },
        { label: 'General Inquiry', href: '/contact' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About us', href: '/about' },
        { label: 'careers', href: '/careers' },
        { label: 'contact', href: '/contact' },
        { label: 'Sitemap', href: '/sitemap' },
      ],
    },
  ],

  contactPhone: '+971 4 393 0507',
  contactEmail: 'info@simalme.com',
  contactAddress: 'Office 201, Dar Al Riffa Building, Bur Dubai, UAE',

  vatNumber: '100207478700003',
  tradeLicense: '49740',
  chamberMember: 'Dubai Chamber Member',

  copyright: '© {year} Simal Technologies Middle East LLC. A {twinmosLink} Company. All rights reserved.',
  parentCompany: { name: 'TwinMOS Group', url: 'https://twinmos.com' },

  bottomLinks: [
    { label: 'Cookie Settings', href: '#', isCookieSettings: true },
  ],
}

// ─── Main ────────────────────────────────────────────────────────────

async function seedHomepage() {
  console.log('\n🚀 Simal Technologies — Homepage & Footer Seed\n')
  console.log('='.repeat(60))
  console.log(`\n  API: ${API}`)
  console.log(`  App: ${BASE}\n`)

  // Ensure admin user exists, then login
  console.log('📋 Phase 0: Ensure Admin User & Login')
  await ensureAdmin()
  const loggedIn = await login()
  if (!loggedIn) {
    console.error('  ✗ Could not login. Is the dev server running? (pnpm dev)')
    process.exit(1)
  }
  log('auth', '✓ Logged in as admin@simal.com')

  // ── Phase 1: Stats ──
  console.log('\n📋 Phase 1: Stats')
  const statIds: string[] = []
  for (const stat of STATS) {
    try {
      const id = await findOrCreate('stats', 'label', stat.label, stat)
      statIds.push(id)
      log('stats', `✓ ${stat.label}`)
    } catch (e: any) {
      console.error(`  ✗ ${stat.label}:`, e.message?.slice(0, 120))
    }
  }

  // ── Phase 2: Testimonials ──
  console.log('\n📋 Phase 2: Testimonials')
  const testimonialIds: string[] = []
  for (const t of TESTIMONIALS) {
    try {
      const id = await findOrCreate('testimonials', 'authorName', t.authorName, t)
      testimonialIds.push(id)
      log('testimonials', `✓ ${t.authorName}`)
    } catch (e: any) {
      console.error(`  ✗ ${t.authorName}:`, e.message?.slice(0, 120))
    }
  }

  // ── Phase 3: Awards ──
  console.log('\n📋 Phase 3: Awards')
  const awardIds: string[] = []
  for (const award of AWARDS) {
    try {
      const id = await findOrCreate('awards', 'title', award.title, award)
      awardIds.push(id)
      log('awards', `✓ ${award.title}`)
    } catch (e: any) {
      console.error(`  ✗ ${award.title}:`, e.message?.slice(0, 120))
    }
  }

  // ── Phase 4: Fetch existing products, brands & categories ──
  console.log('\n📋 Phase 4: Fetch Products, Brands & Categories for Homepage')
  let productIds: string[] = []
  let brandIds: string[] = []
  let categoryIds: string[] = []
  let heroBackgroundMediaId: number | null = null
  try {
    const [productsRes, brandsRes, categoriesRes] = await Promise.all([
      api('GET', '/products?limit=16&sort=-createdAt'),
      api('GET', '/brands?limit=20'),
      api('GET', '/categories?limit=10'),
    ])
    productIds = productsRes.docs?.map((d: any) => d.id) || []
    brandIds = brandsRes.docs?.map((d: any) => d.id) || []
    categoryIds = categoriesRes.docs?.map((d: any) => d.id) || []
    log('products', `✓ Found ${productIds.length} products`)
    log('brands', `✓ Found ${brandIds.length} brands`)
    log('categories', `✓ Found ${categoryIds.length} categories`)
  } catch (e: any) {
    console.error('  ✗ Fetch products/brands/categories:', e.message?.slice(0, 120))
  }

  // ── Phase 4b: Homepage hero background image ──
  console.log('\n📋 Phase 4b: Hero Background Image')
  try {
    const bgPath = '/assets/images/homepage/home_4_t705_HS___6_-removebg-preview_6f21d30648.png'
    heroBackgroundMediaId = await uploadFile(bgPath, 'Simal homepage hero background')
    if (heroBackgroundMediaId) {
      log('media', `✓ Hero background image → media #${heroBackgroundMediaId}`)
    } else {
      log('media', '⊘ Hero background image file not found, skipping')
    }
  } catch (e: any) {
    console.error('  ✗ Hero background image:', e.message?.slice(0, 160))
  }

  // ── Phase 5: Homepage Global ──
  console.log('\n📋 Phase 5: Homepage Global')
  try {
    const homepagePayload: Record<string, any> = {
      ...HOMEPAGE_DATA,
      stats: statIds,
      featuredTestimonials: testimonialIds,
      featuredProducts: productIds,
      featuredBrands: brandIds,
      productCategories: categoryIds,
      topProducts: productIds.slice(0, 6),
    }
    if (heroBackgroundMediaId) {
      homepagePayload.heroBackgroundImage = heroBackgroundMediaId
    }
    // Resolve hero showcase products by slug (deterministic; survives re-runs).
    // Falls back to the newest catalog products if no pinned slugs resolve.
    const heroProductIds: string[] = []
    if (HERO_PRODUCT_SLUGS.length > 0) {
      const allProducts = await api('GET', '/products?limit=200&depth=0')
      const slugToId = new Map<string, string>(
        (allProducts.docs || []).map((p: any) => [p.slug, p.id]),
      )
      for (const slug of HERO_PRODUCT_SLUGS) {
        const id = slugToId.get(slug)
        if (id) {
          heroProductIds.push(id)
        } else {
          log('hero', `⊘ hero product slug not found: ${slug}`)
        }
      }
    }
    const finalHeroIds =
      heroProductIds.length > 0 ? heroProductIds : productIds.slice(0, 5)
    homepagePayload.heroContent = {
      ...homepagePayload.heroContent,
      heroProducts: finalHeroIds,
    }
    await api('POST', '/globals/homepage', homepagePayload)
    log('homepage', '✓ Homepage global seeded with all section content')
  } catch (e: any) {
    console.error('  ✗ Homepage:', e.message?.slice(0, 200))
  }

  // ── Phase 6: Footer Global ──
  console.log('\n📋 Phase 6: Footer Global')
  try {
    await api('POST', '/globals/footer', FOOTER_DATA)
    log('footer', '✓ Footer global seeded with all content')
  } catch (e: any) {
    console.error('  ✗ Footer:', e.message?.slice(0, 200))
  }

  console.log('\n' + '='.repeat(60))
  console.log('✅ Homepage & Footer seed complete!')
  console.log('   Admin login: admin@simal.com / SimalAdmin123!')
  console.log(`   Payload admin: ${BASE}/admin`)
  console.log('='.repeat(60) + '\n')
}

seedHomepage().catch((err) => {
  console.error('Fatal seed error:', err)
  process.exit(1)
})
