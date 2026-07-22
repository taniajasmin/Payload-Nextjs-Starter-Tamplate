/**
 * Update Header global — add White Papers & Case Studies to the Company dropdown.
 *
 * Surgical REST update: fetches the live Header global, inserts the two
 * resource links into the Company nav item's children (between "Blog & News"
 * and "FAQs"), and POSTs navItems back. Preserves all other fields and labels
 * (e.g. the title-cased "Careers"/"Contact"). Idempotent — skips items that
 * are already present, so it is safe to re-run.
 *
 * Why REST (not standalone getPayload): repo convention — see seed-brands-full.ts.
 * Standalone getPayload + tsx crashes on @next/env.
 *
 * Prereq: Next server running on :3000 (Payload API reachable).
 * Usage:  cd apps/web && npx tsx src/scripts/update-header-resources.ts
 */
import 'dotenv/config'

const BASE = process.env.SEED_API_URL || 'http://localhost:3000'
const API = `${BASE}/api`

let token: string | null = null

async function login() {
  const res = await fetch(`${API}/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@simal.com', password: 'SimalAdmin123!' }),
  })
  if (!res.ok) throw new Error(`admin login failed: ${res.status}`)
  token = (await res.json()).token
}

async function api(method: string, path: string, body?: unknown): Promise<any> {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' }
  if (token) headers['Authorization'] = `JWT ${token}`
  const res = await fetch(`${API}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  })
  if (!res.ok) throw new Error(`${method} ${path} → ${res.status}: ${await res.text()}`)
  return res.json()
}

// icon/iconColor names must match navigation-data.ts maps
// (iconNameToComponent / colorNameToTheme). They're also matched from the
// primaryNav fallback by label/href in mergeNavWithIcons, so these are belt-and-braces.
const NEW_CHILDREN = [
  { label: 'White Papers', link: '/company/white-papers', description: 'In-depth guides & technical briefs', status: 'published', icon: 'FileText', iconColor: 'blue' },
  { label: 'Case Studies', link: '/company/case-studies', description: 'Real-world deployments & results', status: 'published', icon: 'BarChart3', iconColor: 'pink' },
]

async function main() {
  await login()
  console.log('✓ logged in as admin@simal.com')

  const header = await api('GET', '/globals/header')
  const navItems: any[] = header.navItems || []

  const company = navItems.find((n: any) => (n.label || '').toLowerCase() === 'company')
  if (!company) throw new Error('No "Company" nav item found in Header global')
  company.children = Array.isArray(company.children) ? company.children : []

  const has = (link: string) =>
    company.children.some((c: any) => (c.link || '').toLowerCase() === link.toLowerCase())

  let added = 0
  for (const child of NEW_CHILDREN) {
    if (has(child.link)) {
      console.log(`  • already present, skipping: ${child.label}`)
      continue
    }
    // Insert ahead of "FAQs" to sit between Blog & News and FAQs (matches primaryNav order).
    const faqIdx = company.children.findIndex(
      (c: any) => (c.label || '').toLowerCase() === 'faqs',
    )
    if (faqIdx >= 0) company.children.splice(faqIdx, 0, child)
    else company.children.push(child)
    added++
    console.log(`  + added: ${child.label} → ${child.link}`)
  }

  if (added === 0) {
    console.log('Nothing to add — Header global already up to date.')
    return
  }

  // Partial update: only navItems is sent, so utilityBar / ctaButton / logo are preserved.
  await api('POST', '/globals/header', { navItems })

  console.log(`\n✅ Header global updated (${added} added). Company children now:`)
  company.children.forEach((c: any) => console.log(`   • ${c.label} → ${c.link}`))
}

main().catch((e) => {
  console.error('❌ update-header-resources failed:', e)
  process.exit(1)
})
