/**
 * In-process migration runner — bypasses the Payload CLI's bundled loaders,
 * which fail under newer Node (ERR_REQUIRE_ASYNC_MODULE / extensionless
 * import resolution in the CLI's worker).
 *
 * Usage:
 *   pnpm tsx scripts/migrate.mts                # run pending migrations
 *   pnpm tsx scripts/migrate.mts create [name]  # generate a migration
 *   pnpm tsx scripts/migrate.mts status         # show migration status
 */
import "dotenv/config";
import payload from "payload";
import rawConfig from "../payload.config";

// payload.config.ts is CJS under tsx (no "type": "module") — unwrap interop
const config = (rawConfig as unknown as { default?: typeof rawConfig }).default ?? rawConfig;

type Command = "migrate" | "create" | "status";

const command = (process.argv[2] ?? "migrate") as Command;
process.env.PAYLOAD_MIGRATING = "true";

await payload.init({
  config,
  disableDBConnect: command === "create",
  disableOnInit: true,
} as Parameters<typeof payload.init>[0]);

const adapter = payload.db as unknown as {
  migrate: () => Promise<void>;
  migrateStatus: () => Promise<void>;
  createMigration: (opts: {
    migrationName?: string;
    payload: typeof payload;
    skipEmpty?: boolean;
  }) => Promise<void>;
};

if (!adapter) {
  console.error("No database adapter found");
  process.exit(1);
}

switch (command) {
  case "create":
    await adapter.createMigration({
      migrationName: process.argv[3],
      payload,
      skipEmpty: true,
    });
    break;
  case "status":
    await adapter.migrateStatus();
    break;
  default:
    await adapter.migrate();
}

console.log("Done.");
process.exit(0);
