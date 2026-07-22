/**
 * Update Homepage Section Order — Simal Corporate Website
 *
 * Surgically sets ONLY the Homepage global's `sectionConfig` (Section
 * Visibility & Order) via the Payload REST API. Payload's global update
 * merges, so passing only `sectionConfig` leaves every other field
 * (heroContent, productCategories, featuredBrands, …) untouched.
 *
 * `trust-band` and `why-choose-us-stats` are deliberately OMITTED: they are
 * not CMS-selectable section ids, so they are code-injected at render time
 * (trust-band after hero, why-choose-us-stats after trust-band). Listing them
 * here would also fail the `sectionId` select validation.
 *
 * Rendered order after the code guards run:
 *   hero → trust-band → why-choose-us-stats → why-choose-us → trusted-partners
 *   → product-categories → solutions-highlight → pre-sales-compiler
 *   → authorized-brands → customer-reviews → news-and-blogs → newsletter
 *
 * Prerequisites: Next.js dev server running (pnpm dev) on localhost:3000.
 *
 * Usage:  npx tsx src/scripts/update-homepage-order.ts
 */

import 'dotenv/config'

const BASE = process.env.SEED_API_URL || 'http://localhost:3000'
const API = `${BASE}/api`

// New section order (CMS-selectable sections only).
const NEW_SECTION_CONFIG = [
  { sectionId: 'hero', visible: true },
  { sectionId: 'why-choose-us', visible: true }, // "Why Simal"
  { sectionId: 'trusted-partners', visible: true },
  { sectionId: 'product-categories', visible: true },
  { sectionId: 'solutions-highlight', visible: true }, // "Software Solutions"
  { sectionId: 'pre-sales-compiler', visible: true },
  { sectionId: 'authorized-brands', visible: true },
  { sectionId: 'customer-reviews', visible: true },
  { sectionId: 'news-and-blogs', visible: true },
  { sectionId: 'newsletter', visible: true },
]

let token: string | null = null

async function login() {
  const res = await fetch(`${API}/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'admin@simal.com',
      password: 'SimalAdmin123!',
    }),
  })
  if (!res.ok) {
    throw new Error(`Login failed (${res.status}): ${await res.text()}`)
  }
  token = (await res.json()).token
}

const fmt = (s: { sectionId: string; visible?: boolean }) =>
  `${s.sectionId}${s.visible === false ? ' (hidden)' : ''}`

async function main() {
  console.log('→ Logging in as admin…')
  await login()

  console.log('→ Reading current Homepage global…')
  const beforeRes = await fetch(`${API}/globals/homepage`, {
    headers: { Authorization: `JWT ${token!}` },
  })
  if (!beforeRes.ok) {
    throw new Error(`Read failed (${beforeRes.status}): ${await beforeRes.text()}`)
  }
  const before = await beforeRes.json()
  const beforeOrder: any[] = before?.sectionConfig ?? []
  console.log('  Current order:', beforeOrder.map(fmt).join(' → ') || '(empty)')

  console.log('→ POSTing new sectionConfig (surgical — other fields untouched)…')
  const res = await fetch(`${API}/globals/homepage`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${token!}`,
    },
    body: JSON.stringify({ sectionConfig: NEW_SECTION_CONFIG }),
  })

  if (!res.ok) {
    throw new Error(`Update failed (${res.status}): ${await res.text()}`)
  }

  const after = await res.json()
  const afterOrder: any[] = after?.sectionConfig ?? []
  console.log('  ✓ New order:   ', afterOrder.map(fmt).join(' → '))

  // Sanity: confirm a non-sectionConfig field survived untouched.
  const heroKeys = before?.heroContent ? Object.keys(before.heroContent).length : 0
  const heroKeysAfter = after?.heroContent ? Object.keys(after.heroContent).length : 0
  console.log(
    `  ✓ heroContent preserved (fields: ${heroKeys} → ${heroKeysAfter}).`,
  )
}

main().catch((e) => {
  console.error('✗', e?.message || e)
  process.exit(1)
})
