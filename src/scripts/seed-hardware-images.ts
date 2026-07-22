/** @deprecated Use seed/index.ts instead — the canonical seeder. */
/**
 * Hardware Images Seeder — Simal Corporate Website
 *
 * Uploads a set of hardware images to the `media` collection, each with a
 * description. Each image's description is written to the localized `caption`
 * field (and `alt` for accessibility, defaulting to the same text).
 *
 * Idempotent: media is deduped by filename, so re-running never duplicates.
 * Uses the Payload REST API — the Next.js dev server must be running
 * (`pnpm dev` from the repo root, or `pnpm dev` in apps/web).
 *
 * ── Where to put your images ─────────────────────────────────────────
 * Drop the image files into:
 *     apps/web/public/assets/images/hardware/
 * (override with the HARDWARE_IMAGES_DIR env var — absolute or repo-relative).
 *
 * ── How to attach descriptions ───────────────────────────────────────
 * Edit the HARDWARE_IMAGES array below. Each entry pairs a `file` (just the
 * filename, relative to the hardware dir) with a `description`. If you leave
 * the array empty, the script auto-discovers every image in the folder and
 * uses a prettified filename as the description (handy for the first run;
 * come back and fill in real captions afterwards).
 *
 * ── Usage ────────────────────────────────────────────────────────────
 *   npx tsx seed-hardware-images.ts
 *   # or against a non-default server:
 *   SEED_API_URL=http://localhost:3000 npx tsx seed-hardware-images.ts
 */

import 'dotenv/config'
import { readFileSync, readdirSync, existsSync, statSync } from 'fs'
import { resolve, basename, extname } from 'path'

// ─── Config ──────────────────────────────────────────────────────────

const BASE = process.env.SEED_API_URL || 'http://localhost:3000'
const API = `${BASE}/api`

// Default source folder; override with HARDWARE_IMAGES_DIR (absolute or
// resolved relative to the repo root).
const DEFAULT_DIR = resolve(__dirname, 'apps/web/public/assets/images/hardware')
const HARDWARE_DIR = process.env.HARDWARE_IMAGES_DIR
  ? resolve(process.env.HARDWARE_IMAGES_DIR)
  : DEFAULT_DIR

const IMAGE_EXTS = new Set(['png', 'jpg', 'jpeg', 'gif', 'webp', 'avif', 'svg'])

const MIME_MAP: Record<string, string> = {
  png: 'image/png',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  gif: 'image/gif',
  svg: 'image/svg+xml',
  webp: 'image/webp',
  avif: 'image/avif',
}

let token: string | null = null

// ─── Seed data: hardware images with descriptions ────────────────────
// `file`        → filename, relative to HARDWARE_DIR (subfolders OK)
// `description` → written to media.caption (the long description)
// `alt`         → optional short alt text; falls back to `description`
//
// Add one entry per image. Example:
//   { file: 'laptop-thinkpad-t14.jpg', description: 'Lenovo ThinkPad T14 Gen 4 — 14" business ultrabook with Intel vPro.' },

type HardwareImage = {
  file: string
  description: string
  alt?: string
}

const HARDWARE_IMAGES: HardwareImage[] = [
  // ← add your { file, description } entries here
]

// ─── HTTP helpers ────────────────────────────────────────────────────

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

function log(phase: string, msg: string) {
  console.log(`  [${phase}] ${msg}`)
}

// ─── Media helpers (idempotent by filename) ──────────────────────────

async function findMediaByFilename(filename: string): Promise<number | null> {
  const data = await api(
    'GET',
    `/media?where[filename][equals]=${encodeURIComponent(filename)}&limit=1`,
  )
  return data.docs?.[0]?.id ?? null
}

async function uploadHardwareImage(entry: HardwareImage): Promise<{
  id: number | null
  filename: string
  status: 'created' | 'exists' | 'missing' | 'error'
  error?: string
}> {
  const absolutePath = resolve(HARDWARE_DIR, entry.file)
  const filename = basename(absolutePath)

  if (!existsSync(absolutePath) || !statSync(absolutePath).isFile()) {
    return { id: null, filename, status: 'missing' }
  }

  // Dedupe by stored filename — never upload the same image twice.
  const existing = await findMediaByFilename(filename)
  if (existing) {
    return { id: existing, filename, status: 'exists' }
  }

  const fileBuffer = readFileSync(absolutePath)
  const ext = extname(filename).slice(1).toLowerCase()
  const mimeType = MIME_MAP[ext] || 'application/octet-stream'

  const blob = new Blob([fileBuffer], { type: mimeType })
  const formData = new FormData()
  formData.append('file', blob, filename)
  formData.append(
    '_payload',
    JSON.stringify({
      alt: { en: entry.alt ?? entry.description },
      caption: { en: entry.description },
    }),
  )

  const res = await fetch(`${API}/media`, {
    method: 'POST',
    headers: { Authorization: `JWT ${token}` },
    body: formData,
  })

  if (!res.ok) {
    const text = await res.text()
    return { id: null, filename, status: 'error', error: `${res.status}: ${text}` }
  }

  const data = await res.json()
  return { id: data.doc?.id || data.id, filename, status: 'created' }
}

// ─── Auto-discovery fallback ─────────────────────────────────────────

/** "dell_latitude_5440.JPG" → "Dell Latitude 5440" */
function prettifyFilename(filename: string): string {
  return basename(filename, extname(filename))
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

/** When HARDWARE_IMAGES is empty, discover every image under HARDWARE_DIR. */
function discoverImages(): HardwareImage[] {
  const discovered: HardwareImage[] = []
  // recursive: true is supported on Node 18.17+ and returns OS-separator paths.
  const entries = readdirSync(HARDWARE_DIR, { recursive: true, withFileTypes: false }) as string[]
  for (const rel of entries) {
    const filename = basename(rel)
    const ext = extname(filename).slice(1).toLowerCase()
    if (!ext || !IMAGE_EXTS.has(ext)) continue
    discovered.push({
      file: rel,
      description: prettifyFilename(filename),
    })
  }
  return discovered.sort((a, b) => a.file.localeCompare(b.file))
}

// ─── Main ────────────────────────────────────────────────────────────

async function seedHardwareImages() {
  console.log('\n🖼️  Simal Technologies — Hardware Images Seed\n')
  console.log('='.repeat(60))
  console.log(`\n  API:      ${API}`)
  console.log(`  Folder:   ${HARDWARE_DIR}\n`)

  // Auth
  console.log('📋 Phase 0: Ensure Admin User & Login')
  await ensureAdmin()
  const loggedIn = await login()
  if (!loggedIn) {
    console.error('  ✗ Could not login. Is the dev server running? (pnpm dev)')
    process.exit(1)
  }
  log('auth', '✓ Logged in as admin@simal.com')

  // Resolve the image list (explicit, or auto-discovered when empty)
  if (!existsSync(HARDWARE_DIR)) {
    console.error(`\n✗ Hardware images folder not found:\n  ${HARDWARE_DIR}\n`)
    console.error('  Create it and drop your images in, or set HARDWARE_IMAGES_DIR.')
    process.exit(1)
  }

  let images = HARDWARE_IMAGES
  if (images.length === 0) {
    images = discoverImages()
    if (images.length === 0) {
      console.error(
        `\n✗ No images to seed. Either add entries to HARDWARE_IMAGES in this file,\n` +
          `  or drop image files into:\n  ${HARDWARE_DIR}`,
      )
      process.exit(1)
    }
    log('discover', `✓ HARDWARE_IMAGES empty — auto-discovered ${images.length} image(s)`)
  } else {
    log('data', `✓ ${images.length} image(s) in HARDWARE_IMAGES`)
  }

  // Upload
  console.log('\n📋 Phase 1: Upload hardware images to media')
  const created: string[] = []
  const existed: string[] = []
  const missing: string[] = []
  const errored: string[] = []

  for (const entry of images) {
    try {
      const result = await uploadHardwareImage(entry)
      switch (result.status) {
        case 'created':
          created.push(result.filename)
          log('media', `✓ ${result.filename} → media #${result.id}`)
          break
        case 'exists':
          existed.push(result.filename)
          log('media', `⊘ ${result.filename} already uploaded (media #${result.id})`)
          break
        case 'missing':
          missing.push(result.filename)
          log('media', `✗ ${result.filename} not found in folder`)
          break
        case 'error':
          errored.push(result.filename)
          console.error(`  ✗ ${result.filename}: ${result.error?.slice(0, 160)}`)
          break
      }
    } catch (e: any) {
      errored.push(entry.file)
      console.error(`  ✗ ${entry.file}:`, e.message?.slice(0, 160))
    }
  }

  // Summary
  console.log('\n' + '='.repeat(60))
  console.log('✅ Hardware images seed complete!')
  console.log(`   Created:  ${created.length}`)
  console.log(`   Existing: ${existed.length}`)
  if (missing.length) console.log(`   Missing:  ${missing.length}  (${missing.join(', ')})`)
  if (errored.length) console.log(`   Errors:   ${errored.length}`)
  console.log(`   Payload admin: ${BASE}/admin/collections/media`)
  console.log('='.repeat(60) + '\n')
}

seedHardwareImages().catch((err) => {
  console.error('Fatal seed error:', err)
  process.exit(1)
})
