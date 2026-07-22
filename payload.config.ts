import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { s3Storage } from "@payloadcms/storage-s3";
import path from "path";
import sharp from "sharp";

// Collections
import { Media } from "./src/collections/Media";
import { MediaFolders } from "./src/collections/MediaFolders";
import { Pages } from "./src/collections/Pages";
import { Users } from "./src/collections/Users";
import { Messages } from "./src/collections/Messages";

// Globals
import { Header } from "./src/globals/Header";
import { Footer } from "./src/globals/Footer";
import { SiteSettings } from "./src/globals/SiteSettings";
import { Theme } from "./src/globals/Theme";
import { themeAdminComponents } from "./src/payload-theme/snippets/admin.components.wiring";

export default buildConfig({
  secret:
    process.env.PAYLOAD_SECRET || "default-dev-secret-do-not-use-in-production",
  sharp,
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || "",
    },
    // Disable dev-mode schema push — it reverts array-item ID defaults
    // and triggers on every HMR event. Use `pnpm payload migrate:create`
    // + `pnpm payload migrate` for schema changes instead.
    push: false,
  }),
  editor: lexicalEditor(),
  localization: {
    locales: ["en"],
    defaultLocale: "en",
    fallback: true,
  },
  admin: {
    user: "users",
    components: themeAdminComponents,
    meta: {
      titleSuffix: " — CMS Admin",
    },
  },
  collections: [
    Media,
    MediaFolders,
    Pages,
    Users,
    Messages,
  ],
  globals: [
    Header,
    Footer,
    SiteSettings,
    Theme,
  ],
  typescript: {
    outputFile: path.resolve(process.cwd(), "payload-types.ts"),
  },
  plugins: [
    s3Storage({
      collections: {
        media: true,
      },
      bucket: process.env.S3_BUCKET || "app-public-dev",
      config: {
        endpoint: process.env.S3_ENDPOINT || "http://localhost:9010",
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || "minioadmin",
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || "minioadmin123",
        },
        region: "us-east-1",
        forcePathStyle: true,
      },
      // NOTE: a custom `generateURL` is NOT supported by @payloadcms/storage-s3
      // (the adapter builds URLs internally from bucket + endpoint). Media `url`
      // values are served through Payload's own `/api/media/file/<filename>`
      // route, which streams the object from S3 — so they work in both the admin
      // panel and the website without exposing the bucket publicly.
    }),
  ],
});
