/** @deprecated Use seed/index.ts instead — the canonical seeder. */
/**
 * Brands Full Seed — Seeds all brand data from brand-data.ts into Payload CMS
 *
 * Populates: name, slug, tagline, heroSlogan, heroDescription, brandStory,
 *            category, status, statusNote, orderingInfo, seoTitle, seoDescription,
 *            seoKeywords, meta, keyTechnologies, productTables, specTables,
 *            selectionGuides, idealDeployments, relatedLinks
 *
 * Idempotent: finds by slug, updates if exists, creates if not.
 *
 * Prerequisites: Next.js dev server must be running (pnpm dev)
 *
 * Usage:  npx tsx src/scripts/seed-brands-full.ts
 */

import 'dotenv/config'
import {
  allBrands,
  type BrandPageData,
} from '../lib/brand-data'

const BASE = process.env.SEED_API_URL || 'http://localhost:3000'
const API = `${BASE}/api`

let token: string | null = null

// ─── HTTP Helpers ────────────────────────────────────────────────────

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms))

async function api(
  method: string,
  path: string,
  body?: any,
  retries = 3,
): Promise<any> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  }
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
        console.log(`  ↻ ${method} ${path} attempt ${attempt} failed, retrying in 1s...`)
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
    body: JSON.stringify({
      email: 'admin@simal.com',
      password: 'SimalAdmin123!',
    }),
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
        email: 'admin@simal.com',
        password: 'SimalAdmin123!',
        firstName: 'Admin',
        lastName: 'User',
        role: 'administrator',
        active: true,
      }),
    })
  } catch {
    // User might already exist — that's fine
  }
}

async function findDoc(collection: string, field: string, value: string) {
  const data = await api('GET', `/${collection}?where[${field}][equals]=${encodeURIComponent(value)}&limit=1`)
  return data.docs?.[0] || null
}

async function findOrCreate(collection: string, field: string, value: string, data: any) {
  const existing = await findDoc(collection, field, value)
  if (existing) {
    const updated = await api('PATCH', `/${collection}/${existing.id}`, data)
    return updated.id
  }
  const created = await api('POST', `/${collection}`, data)
  return created.doc?.id || created.id
}

// ─── Map brand category values ────────────────────────────────────

function mapCategory(cat: string): string {
  const map: Record<string, string> = {
    'Computer Components': 'computer-components',
    'Computer Accessories': 'computer-accessories',
    'Monitors': 'monitors',
    'Gaming': 'gaming',
    'Laptops': 'laptops',
    'Storage': 'storage',
    'Storage & Memory Cards': 'storage',
    'Audio Visual': 'audio-visual',
    'Audio-Visual & Collaboration': 'audio-visual',
    'Networking': 'networking',
  }
  return map[cat] || cat
}

// ─── Build CMS payload from BrandPageData ─────────────────────────

function buildBrandPayload(brand: BrandPageData) {
  const payload: Record<string, any> = {
    name: brand.name,
    slug: brand.slug,
    tagline: brand.tagline || '',
    heroSlogan: brand.heroSlogan || '',
    heroDescription: brand.heroDescription || '',
    category: mapCategory(brand.category),
    status: brand.status === 'future' ? 'future' : 'available',
    statusNote: brand.statusNote || '',
    seoTitle: brand.seoTitle || '',
    seoDescription: brand.seoDescription || '',
    seoKeywords: brand.seoKeywords || '',
    meta: {
      title: brand.seoTitle || brand.name,
      description: brand.seoDescription || '',
    },
    orderingInfo: {
      whatsapp: brand.orderingInfo?.whatsapp || '+971543088655',
      email: brand.orderingInfo?.email || 'info@simalme.com',
      extra: brand.orderingInfo?.extra || '',
    },
  }

  // Brand story as Lexical JSON
  if (brand.brandStory) {
    payload.story = {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: brand.brandStory.replace(/<[^>]*>/g, '').trim(),
                version: 1,
              },
            ],
            version: 1,
          },
        ],
        version: 1,
      },
    }
  }

  // Key Technologies
  if (brand.keyTechnologies?.length) {
    payload.keyTechnologies = brand.keyTechnologies.map((kt) => ({
      title: kt.title,
      description: kt.description,
    }))
  }

  // JSON fields
  if (brand.productTables?.length) {
    payload.productTables = brand.productTables
  }
  if (brand.specTables?.length) {
    payload.specTables = brand.specTables
  }
  if (brand.selectionGuides?.length) {
    payload.selectionGuides = brand.selectionGuides
  }
  if (brand.idealDeployments) {
    payload.idealDeployments = brand.idealDeployments
  }
  // Related Links — stored as JSON, not HTML string
  if (brand.relatedLinks) {
    // Convert HTML links to structured JSON array
    const linkRegex = /href="([^"]+)"[^>]*>([^<]+)</g
    const links: Array<{ href: string; label: string }> = []
    let match
    while ((match = linkRegex.exec(brand.relatedLinks)) !== null) {
      links.push({ href: match[1], label: match[2] })
    }
    if (links.length > 0) {
      payload.relatedLinks = links
    }
  }

  return payload
}

// ─── Main ────────────────────────────────────────────────────────────

async function seedBrands() {
  console.log('\n🏷️  Simal Technologies — Full Brands Seed\n')
  console.log('='.repeat(60))
  console.log(`\n  API: ${API}`)
  console.log(`  Brands to seed: ${allBrands.length}\n`)

  // Ensure admin user exists, then login
  console.log('📋 Step 1: Ensure Admin User & Login')
  await ensureAdmin()
  const loggedIn = await login()
  if (!loggedIn) {
    console.error('  ✗ Could not login. Is the dev server running? (pnpm dev)')
    process.exit(1)
  }
  console.log('  ✓ Logged in as admin@simal.com')

  // Seed each brand
  console.log('\n📋 Step 2: Seed Brands\n')
  let created = 0
  let updated = 0
  let failed = 0

  for (const brand of allBrands) {
    try {
      const data = buildBrandPayload(brand)
      const existing = await findDoc('brands', 'slug', brand.slug)

      if (existing) {
        await api('PATCH', `/brands/${existing.id}`, data)
        console.log(`  ✓ Updated: ${brand.name} (${brand.slug})`)
        updated++
      } else {
        await api('POST', '/brands', data)
        console.log(`  ✓ Created: ${brand.name} (${brand.slug})`)
        created++
      }

      // Small delay to avoid rate limiting
      await delay(200)
    } catch (e: any) {
      console.error(`  ✗ ${brand.name}: ${e.message?.slice(0, 200)}`)
      failed++
    }
  }

  console.log('\n' + '='.repeat(60))
  console.log(`\n  Done! Created: ${created} | Updated: ${updated} | Failed: ${failed}\n`)
}

seedBrands().catch((err) => {
  console.error('Fatal error:', err)
  process.exit(1)
})
