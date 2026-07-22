/**
 * Custom migration runner for Payload v3.
 *
 * Works around the tsx 4.21.0 (bundled with Payload) module-resolution issue
 * by using the project's own tsx 4.22.4 to load the config and invoke the
 * database adapter directly.
 *
 * Usage:
 *   npx tsx src/scripts/run-migration.ts <command>
 *
 * Commands:
 *   status   – show pending / applied migrations
 *   create   – generate a new migration from the current schema
 *   migrate  – apply all pending migrations
 *
 * Example:
 *   npx tsx src/scripts/run-migration.ts create
 *   npx tsx src/scripts/run-migration.ts migrate
 */

import { readFileSync, existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

// ---------------------------------------------------------------------------
// 1. Load .env manually (Payload's loadEnv has a CJS/ESM interop issue with
//    tsx 4.22.4 — see the patch in node_modules/payload/dist/bin/loadEnv.js)
// ---------------------------------------------------------------------------
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.resolve(__dirname, '../..')

function loadDotEnv(dir: string): void {
  const envPath = path.join(dir, '.env')
  if (!existsSync(envPath)) return
  const content = readFileSync(envPath, 'utf-8')
  const seen = new Set<string>()
  for (const line of content.split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eqIdx = trimmed.indexOf('=')
    if (eqIdx === -1) continue
    const key = trimmed.slice(0, eqIdx).trim()
    const val = trimmed.slice(eqIdx + 1).trim()
    if (seen.has(key)) continue
    seen.add(key)
    if (!process.env[key]) {
      process.env[key] = val
    }
  }
}
loadDotEnv(projectRoot)

// Tell Payload where the config lives (absolute path, bypassing findConfig).
const configPath = path.resolve(projectRoot, 'payload.config.ts')
process.env.PAYLOAD_CONFIG_PATH = configPath
process.env.DISABLE_PAYLOAD_HMR = 'true'
process.env.PAYLOAD_MIGRATING = 'true'

// ---------------------------------------------------------------------------
// 2. Parse CLI args
// ---------------------------------------------------------------------------
const args = process.argv.slice(2)
const command = args[0] || 'status'
const validCommands = ['status', 'create', 'migrate', 'down', 'refresh', 'reset', 'fresh']
const forceYes = args.includes('--yes') || args.includes('-y')

if (!validCommands.includes(command)) {
  console.error(`Unknown command: "${command}"`)
  console.error(`Valid commands: ${validCommands.join(', ')}`)
  process.exit(1)
}

// ---------------------------------------------------------------------------
// 3. Load config and run
// ---------------------------------------------------------------------------
async function main() {
  // Dynamic import with tsx transpilation – the project's tsx 4.22.4 handles
  // moduleResolution: "bundler" correctly.
  const configModule = await import(configPath)
  const config = configModule.default || configModule

  // Import payload and init a barebones instance
  const payload = (await import('payload')).default

  await payload.init({
    config,
    disableDBConnect: command === 'create',
    disableOnInit: true,
    // Use sync logger so output isn't buffered
    loggerDestination: undefined,
  })

  const adapter: any = payload.db
  if (!adapter) {
    throw new Error('No database adapter found after init.')
  }

  console.log(`\nMigration dir: ${adapter.migrationDir || 'src/migrations'}`)
  console.log(`Command:       ${command}\n`)

  switch (command) {
    case 'status':
      await adapter.migrateStatus()
      break
    case 'create':
      await adapter.createMigration({
        file: undefined,
        forceAcceptWarning: false,
        migrationName: process.argv[3],
        payload,
        skipEmpty: false,
      })
      break
    case 'migrate':
      await adapter.migrate()
      break
    case 'down':
      await adapter.migrateDown()
      break
    case 'refresh':
      await adapter.migrateRefresh()
      break
    case 'reset':
      await adapter.migrateReset()
      break
    case 'fresh':
      await adapter.migrateFresh({ forceAcceptWarning: false })
      break
  }

  console.log('\nDone.')
}

main().catch((err) => {
  console.error('Migration error:', err)
  process.exit(1)
})
