/** @deprecated Use seed/index.ts instead — the canonical seeder. */
/// <reference types="node" />
/**
 * seed-product-images.ts
 *
 * Uploads product images from disk into the `media` collection and links them
 * to products (sets `mainImage` + `images[]`), using a precomputed map:
 *   src/scripts/product-image-map.json
 * which was built from public/assets/simalme_products.json (the authoritative
 * p<N> → product mapping) — see the verification step that produced it.
 *
 * Image layout on disk:
 *   public/assets/images/products/<brand>/p<N>_<...>          → main image
 *   public/assets/images/products/<brand>/gallery/p<N>_g<M>_…  → gallery shots
 *
 * Idempotent: media is deduped by stored filename, so re-running never
 * duplicates uploads; each product's mainImage/images are rebuilt from the map.
 *
 * Prereqs: Next.js dev server running (pnpm dev).
 * Usage:
 *   npx tsx src/scripts/seed-product-images.ts             # upload + link
 *   DRY_RUN=true npx tsx src/scripts/seed-product-images.ts # plan only
 */
import 'dotenv/config'
import { readFileSync, existsSync } from 'node:fs'
import { resolve, extname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const WEB_ROOT = resolve(__dirname, '../..') // apps/web
const PRODUCTS_IMG_DIR = resolve(WEB_ROOT, 'public/assets/images/products')
const MAP_PATH = resolve(__dirname, 'product-image-map.json')

const BASE = process.env.SEED_API_URL || 'http://localhost:3000'
const API = `${BASE}/api`
const DRY_RUN = process.env.DRY_RUN === 'true'

const MIME: Record<string, string> = {
  png: 'image/png',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  gif: 'image/gif',
  webp: 'image/webp',
  avif: 'image/avif',
  svg: 'image/svg+xml',
}

let token: string | null = null
const delay = (ms: number) => new Promise((r) => setTimeout(r, ms))

// ─── HTTP helpers ────────────────────────────────────────────────────
async function api(method: string, path: string, body?: unknown, retries = 3): Promise<any> {
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
        throw new Error(`${method} ${path} → ${res.status}: ${text.slice(0, 200)}`)
      }
      return await res.json()
    } catch (e) {
      if (attempt < retries) {
        await delay(1000)
      } else {
        throw e
      }
    }
  }
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
    /* already exists */
  }
}

async function login(): Promise<boolean> {
  const res = await fetch(`${API}/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@simal.com', password: 'SimalAdmin123!' }),
  })
  if (res.ok) {
    token = (await res.json()).token
    return true
  }
  return false
}

// ─── Data ────────────────────────────────────────────────────────────
type Entry = { id: number; brand: string; sku: string; main: string; gallery: string[] }
const MAP: Entry[] = JSON.parse(readFileSync(MAP_PATH, 'utf8'))

/** Absolute path for an image file within a brand folder (gallery/ for g-files). */
function absFor(brand: string, file: string): string {
  if (/^p\d+_g/.test(file)) return resolve(PRODUCTS_IMG_DIR, brand, 'gallery', file)
  return resolve(PRODUCTS_IMG_DIR, brand, file)
}

async function findProductBySku(sku: string): Promise<{ id: number; name?: string } | null> {
  const d = await api('GET', `/products?where[sku][equals]=${encodeURIComponent(sku)}&limit=1`)
  return d.docs?.[0] || null
}

async function findMediaByFilename(filename: string): Promise<number | null> {
  const d = await api(
    'GET',
    `/media?where[filename][equals]=${encodeURIComponent(filename)}&limit=1`,
  )
  return d.docs?.[0]?.id ?? null
}

/** Upload a file to media (deduped by stored filename). Returns media doc id. */
async function uploadMedia(absPath: string, filename: string, alt: string): Promise<number> {
  const existing = await findMediaByFilename(filename)
  if (existing) return existing

  const buf = readFileSync(absPath)
  const ext = extname(filename).slice(1).toLowerCase()
  const mime = MIME[ext] || 'application/octet-stream'

  const form = new FormData()
  form.append('file', new Blob([buf], { type: mime }), filename)
  form.append('_payload', JSON.stringify({ alt: { en: alt } }))

  const res = await fetch(`${API}/media`, {
    method: 'POST',
    headers: token ? { Authorization: `JWT ${token}` } : {},
    body: form,
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`media upload ${filename} → ${res.status}: ${text.slice(0, 200)}`)
  }
  const data = await res.json()
  return data.doc?.id || data.id
}

// ─── Main ────────────────────────────────────────────────────────────
async function main() {
  console.log('\n🖼️  Simal Technologies — Product Images Linker\n')
  console.log('='.repeat(60))
  console.log(`  API:   ${API}`)
  console.log(`  Mode:  ${DRY_RUN ? 'DRY RUN (no uploads/writes)' : 'UPLOAD + LINK'}`)
  console.log(`  Map:   ${MAP.length} entries\n`)

  await ensureAdmin()
  if (!(await login())) {
    console.error('✗ Login failed. Is the dev server running (pnpm dev)?')
    process.exit(1)
  }
  console.log('  ✓ Logged in as admin@simal.com\n')

  // Phase 1: resolve products + verify files exist on disk.
  console.log('📋 Phase 1: Resolve products & verify image files')
  type PlanItem = {
    entry: Entry
    product: { id: number; name?: string }
    files: { abs: string; filename: string }[] // main first
    dropped: string[]
  }
  const plan: PlanItem[] = []
  const missingProducts: string[] = []

  for (const entry of MAP) {
    const product = await findProductBySku(entry.sku)
    if (!product) {
      missingProducts.push(entry.sku)
      console.log(`  ✗ no product for SKU ${entry.sku} (id${entry.id})`)
      continue
    }

    // Full gallery = main + gallery files, deduped by filename, main first.
    const seen = new Set<string>()
    const files: { abs: string; filename: string }[] = []
    const dropped: string[] = []
    for (const f of [entry.main, ...entry.gallery]) {
      if (!f || seen.has(f)) continue
      seen.add(f)
      const abs = absFor(entry.brand, f)
      if (existsSync(abs)) {
        files.push({ abs, filename: f })
      } else {
        dropped.push(f)
      }
    }
    if (files.length === 0) {
      console.log(`  ✗ ${entry.sku}: NO usable image files on disk (main missing?)`)
      missingProducts.push(entry.sku)
      continue
    }
    // If the main file itself was dropped/missing, warn but keep first file as main.
    if (dropped.length) {
      console.log(`  ! ${entry.sku}: dropped ${dropped.length} missing file(s): ${dropped.join(', ')}`)
    }
    plan.push({ entry, product, files, dropped })
  }

  console.log(`  → ${plan.length}/${MAP.length} products ready`)

  if (missingProducts.length) {
    console.error(`\n✗ ${missingProducts.length} product(s) could not be matched. Aborting.`)
    process.exit(1)
  }

  if (DRY_RUN) {
    console.log('\n📋 DRY RUN — plan (product → main [+ gallery]):')
    for (const p of plan) {
      console.log(
        `  ${p.entry.sku.padEnd(20)} main=${p.files[0].filename} (+${p.files.length - 1} gallery)`,
      )
    }
    console.log(`\n  Total files to upload: ${plan.reduce((n, p) => n + p.files.length, 0)}`)
    console.log('='.repeat(60))
    return
  }

  // Phase 2: upload media + link to products.
  console.log('\n📋 Phase 2: Upload media & link to products')
  let uploaded = 0
  let reused = 0
  let linked = 0
  const errors: string[] = []

  for (const p of plan) {
    const alt = p.product.name || p.entry.sku
    try {
      const mediaIds: { id: number; filename: string }[] = []
      for (const f of p.files) {
        const before = await findMediaByFilename(f.filename)
        const id = await uploadMedia(f.abs, f.filename, alt)
        if (before) reused++
        else uploaded++
        mediaIds.push({ id, filename: f.filename })
      }
      // mainImage = the main file's media id (files[0]).
      const mainImage = mediaIds[0].id
      const images = mediaIds.map((m) => ({ image: m.id, alt: { en: alt } }))

      await api('PATCH', `/products/${p.product.id}`, { mainImage, images })
      linked++
      console.log(
        `  ✓ ${p.entry.sku.padEnd(20)} main=${mediaIds[0].filename} | images=${images.length}`,
      )
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e)
      errors.push(`${p.entry.sku}: ${msg}`)
      console.error(`  ✗ ${p.entry.sku}: ${msg.slice(0, 160)}`)
    }
  }

  console.log('\n' + '='.repeat(60))
  console.log('✅ Product images link complete!')
  console.log(`   Products linked: ${linked}/${plan.length}`)
  console.log(`   Media uploaded:  ${uploaded}`)
  console.log(`   Media reused:    ${reused}`)
  if (errors.length) console.log(`   Errors:          ${errors.length}`)
  console.log(`   Payload admin:   ${BASE}/admin/collections/products`)
  console.log('='.repeat(60) + '\n')
}

main().catch((err) => {
  console.error('Fatal error:', err)
  process.exit(1)
})
