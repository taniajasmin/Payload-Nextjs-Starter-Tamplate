// Preload shim: @next/env@14.x bundles as CJS with __esModule=true but no
// `default` export. Payload's `dist/bin/loadEnv.js` does
//   import nextEnvImport from '@next/env';
//   const { loadEnvConfig } = nextEnvImport;
// — but tsx's CJS/ESM interop wraps it as `{ default: undefined }`, causing
//   Cannot destructure property 'loadEnvConfig' of 'import_env.default' as it is undefined.
// The fix is to expose the namespace as `.default` before Payload loads.
// Loaded via `node --require <thisfile>` (see package.json seed scripts).
// Remove once Payload or @next/env fixes the underlying interop bug.
console.error('[shim] next-env-shim running')
const nextEnv = require('@next/env')
console.error('[shim] keys before:', Object.keys(nextEnv), 'default:', typeof nextEnv.default)
if (nextEnv && !nextEnv.default) {
  nextEnv.default = nextEnv
}
console.error('[shim] default after:', typeof nextEnv.default)
