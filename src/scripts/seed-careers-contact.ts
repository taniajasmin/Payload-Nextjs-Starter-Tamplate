/** @deprecated Use seed/index.ts instead — the canonical seeder. */
/// <reference types="node" />

/**
 * Careers Contact Page Seed — Simal Corporate Website
 *
 * Seeds the `careers-contact-page` Payload CMS global (the section shown above/
 * beside the open positions on the Careers page).
 *
 * Idempotent: POST to globals is an upsert — safe to run multiple times.
 * Uses the Payload REST API — requires the Next.js dev server to be running.
 *
 * Usage:  npx tsx src/scripts/seed-careers-contact.ts
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
  if (res.ok) {
    token = (await res.json()).token
    return true
  }
  return false
}

const CAREERS_CONTACT_DATA = {
  hero: {
    headline: 'Build Your Career at Simal Technologies',
    subHeadline:
      'Join a team powering digital transformation across the Middle East, Africa, and CIS. We are always looking for passionate, talented people to grow with us.',
  },
  introText:
    'As an authorized distributor for 20+ world-class technology brands, Simal Technologies offers a fast-paced, collaborative environment where your work directly shapes how businesses across the region access enterprise-grade IT. With offices in Dubai, Riyadh, and Cairo, and a diverse multi-national team, we invest in our people through continuous learning, clear career progression, and exposure to the industry’s leading manufacturers.',
  benefits: [
    {
      title: 'Competitive Compensation',
      description: 'Market-aligned salaries with performance bonuses and annual reviews.',
    },
    {
      title: 'Professional Growth',
      description: 'Training programs, vendor certifications, and clear career progression paths.',
    },
    {
      title: 'Global Brand Exposure',
      description: 'Work directly with 20+ world-class brands including Dell, HP, Crucial, Samsung, and UGREEN.',
    },
    {
      title: 'Inclusive, Multi-National Culture',
      description: 'A diverse workplace with multi-lingual teams across the UAE, Saudi Arabia, and Egypt.',
    },
    {
      title: 'Health & Wellness',
      description: 'Comprehensive health insurance and employee wellness support.',
    },
  ],
  openPositionsLink: '/careers',
  cta: {
    headline: "Don't See the Right Role?",
    description: 'Send us your CV and we will reach out when a matching opportunity arises.',
    primaryCtaLabel: 'View Open Positions',
    primaryCtaLink: '/careers',
    secondaryCtaLabel: 'Email Your CV',
    secondaryCtaLink: 'mailto:hr@simalme.com',
    relatedLinks: 'Open Positions | Email HR | About Us',
  },
}

async function seedCareersContact() {
  console.log('\n🚀 Seeding careers-contact-page global...\n')
  const loggedIn = await login()
  if (!loggedIn) {
    console.error('  ✗ Could not login. Is the dev server running? (pnpm dev)')
    process.exit(1)
  }
  console.log('  [auth] ✓ Logged in as admin@simal.com')

  try {
    await fetch(`${API}/globals/careers-contact-page`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `JWT ${token}` },
      body: JSON.stringify(CAREERS_CONTACT_DATA),
    }).then((r) => {
      if (!r.ok) throw new Error(`HTTP ${r.status}`)
      return r.json()
    })
    console.log('  [careers-contact-page] ✓ Seeded')
    console.log('\n✅ careers-contact-page global seeded!\n')
  } catch (e: unknown) {
    console.error('  ✗ careers-contact-page:', e instanceof Error ? e.message : String(e))
    process.exit(1)
  }
}

seedCareersContact().catch((err) => {
  console.error('Fatal seed error:', err)
  process.exit(1)
})
