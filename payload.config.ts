import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { s3Storage } from "@payloadcms/storage-s3";
import path from "path";
import sharp from "sharp";

// Collections
import { Media } from "./src/collections/Media";
import { Pages } from "./src/collections/Pages";
import { BlogPosts } from "./src/collections/BlogPosts";
import { Categories } from "./src/collections/Categories";
import { Products } from "./src/collections/Products";
import { Brands } from "./src/collections/Brands";
import { Careers } from "./src/collections/Careers";
import { OfficeLocations } from "./src/collections/OfficeLocations";
import { FAQEntries } from "./src/collections/FAQEntries";
import { NewsItems } from "./src/collections/NewsItems";
import { MediaFolders } from "./src/collections/MediaFolders";
import { Users } from "./src/collections/Users";
import { Stats } from "./src/collections/Stats";
import { Testimonials } from "./src/collections/Testimonials";
import { Awards } from "./src/collections/Awards";
import { Applications } from "./src/collections/Applications";
import { Messages } from "./src/collections/Messages";
import { Services } from "./src/collections/Services";
import { ERPIndustries } from "./src/collections/ERPIndustries";

// Globals
import { Header } from "./src/globals/Header";
import { Footer } from "./src/globals/Footer";
import { Homepage } from "./src/globals/Homepage";
import { SiteSettings } from "./src/globals/SiteSettings";
import { Theme } from "./src/globals/Theme";
import { AboutPage } from "./src/globals/AboutPage";
import { ContactPage } from "./src/globals/ContactPage";
import { CareersContactPage } from "./src/globals/CareersContactPage";
import { BrandsPage } from "./src/globals/BrandsPage";
import { ProductCatalogPage } from "./src/globals/ProductCatalogPage";
import { ComputerComponentsPage } from "./src/globals/ComputerComponentsPage";
import { ComputerAccessoriesPage } from "./src/globals/ComputerAccessoriesPage";
import { MonitorsPage } from "./src/globals/MonitorsPage";
import { GamingPage } from "./src/globals/GamingPage";
import { LaptopsPage } from "./src/globals/LaptopsPage";
import { ItDistributionPage } from "./src/globals/ItDistributionPage";
import { AuthorizedBrandsPage } from "./src/globals/AuthorizedBrandsPage";

import { ServicesPage } from "./src/globals/ServicesPage";
import { ErpPage } from "./src/globals/ErpPage";
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
    locales: ["en", "ar", "fr", "ru"],
    defaultLocale: "en",
    fallback: true,
  },
  admin: {
    user: "users",
    components: themeAdminComponents,
    meta: {
      titleSuffix: " — Simal CMS",
    },
  },
  collections: [
    Media,
    MediaFolders,
    Pages,
    BlogPosts,
    Categories,
    Products,
    Brands,
    Careers,
    OfficeLocations,
    FAQEntries,
    NewsItems,
    Users,
    Stats,
    Testimonials,
    Awards,
    Applications,
    Messages,
    Services,
    ERPIndustries,
  ],
  globals: [
    Header,
    Footer,
    Homepage,
    SiteSettings,
    Theme,
    AboutPage,
    ContactPage,
    CareersContactPage,
    BrandsPage,
    ProductCatalogPage,
    ComputerComponentsPage,
    ComputerAccessoriesPage,
    MonitorsPage,
    GamingPage,
    LaptopsPage,
    ItDistributionPage,
    AuthorizedBrandsPage,

    ServicesPage,
    ErpPage,
  ],
  typescript: {
    outputFile: path.resolve(process.cwd(), "payload-types.ts"),
  },
  plugins: [
    s3Storage({
      collections: {
        media: true,
      },
      bucket: process.env.S3_BUCKET || "simal-public-dev",
      config: {
        endpoint: process.env.S3_ENDPOINT || "http://localhost:9010",
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || "simalminio",
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || "simalminio123",
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
