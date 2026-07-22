/**
 * Delete products that have no real images (only WooCommerce placeholders, or none),
 * via the Payload REST API. This lets Payload clean up versions, relationships and
 * array children correctly. (Direct SQL is unsafe: the `_products_v` versions table
 * is ON DELETE SET NULL, which would orphan version rows.)
 *
 * Same REST pattern as populate-product-descriptions.ts.
 *
 * Safety: each candidate is re-fetched and must match its expected SKU AND have a
 * placeholder/absent main image before it is deleted. A mismatch aborts that target.
 *
 * Usage:
 *   npx tsx src/scripts/delete-imageless-products.ts            # runs the deletes
 *   DRY_RUN=true npx tsx src/scripts/delete-imageless-products.ts  # list only
 *
 * Prerequisites: simal stack up (make up) AND Next/Payload dev server running (pnpm dev).
 */

import 'dotenv/config'

const BASE = process.env.SEED_API_URL || 'http://localhost:3000'
const API = `${BASE}/api`
const DRY_RUN = process.env.DRY_RUN === 'true'

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@simal.com'
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'SimalAdmin123!'

// Products to delete, each carrying its expected SKU as a guard. Both
// original targets (id 38 HON-4OUT-MS, id 57 TED34G1600C1101) have already
// been removed, so this is currently empty — add new imageless products here.
const TARGETS: Array<{ id: number; sku: string; reason: string }> = []

let token: string | null = null

async function login() {
  const res = await fetch(`${API}/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD }),
  })
  if (!res.ok) return false
  token = (await res.json()).token
  return true
}

async function main() {
  console.log(`Mode: ${DRY_RUN ? 'DRY RUN (no deletes)' : 'DELETE'}\n`)

  if (!(await login())) {
    console.error('Failed to login. Is the dev server running (pnpm dev) and admin user present?')
    process.exit(1)
  }

  const headers = { 'Content-Type': 'application/json', Authorization: `JWT ${token}` } as const
  let deleted = 0
  let skipped = 0

  for (const target of TARGETS) {
    // Re-fetch fresh so we never act on stale IDs. depth=1 to populate mainImage.filename.
    const res = await fetch(`${API}/products/${target.id}?depth=1`, { headers })
    if (res.status === 404) {
      console.log(`• id ${target.id} (${target.sku}): NOT FOUND — already deleted? Skipping.`)
      skipped++
      continue
    }
    if (!res.ok) {
      console.log(`✖ id ${target.id}: fetch failed (HTTP ${res.status}). NOT DELETED.`)
      skipped++
      continue
    }
    const doc = await res.json()

    // Guard 1: SKU must match.
    if (String(doc.sku || '').toUpperCase() !== target.sku.toUpperCase()) {
      console.log(
        `✖ id ${target.id}: SKU mismatch (expected ${target.sku}, got ${doc.sku}). NOT DELETED.`
      )
      skipped++
      continue
    }

    // Guard 2: main image must be a placeholder or absent.
    const mainFilename: string | undefined = doc.mainImage?.filename
    const looksLikePlaceholder = !mainFilename || /placeholder/i.test(mainFilename)
    const name = doc.name || doc.slug

    console.log(`• id ${target.id} | ${doc.sku} | ${name} | mainImage=${mainFilename || '(none)'}`)

    if (!looksLikePlaceholder) {
      console.log(`  ✖ main image is NOT a placeholder — has a real photo. NOT DELETED.`)
      skipped++
      continue
    }

    if (DRY_RUN) {
      console.log(`  → would delete (${target.reason})`)
      continue
    }

    const del = await fetch(`${API}/products/${target.id}`, { method: 'DELETE', headers })
    if (!del.ok) {
      console.log(`  ✖ delete failed (HTTP ${del.status}): ${await del.text()}`)
      skipped++
      continue
    }
    deleted++
    console.log(`  ✓ deleted`)
  }

  console.log(`\nDone. Deleted ${deleted} | skipped ${skipped}.`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
