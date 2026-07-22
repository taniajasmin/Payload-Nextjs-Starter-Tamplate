import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  serverExternalPackages: [
    "esbuild",
    "@esbuild/*",
    "drizzle-kit",
    "@libsql/*",
    "sharp",
    "busboy",
    "@payloadcms/db-postgres",
    "@payloadcms/drizzle",
  ],
  experimental: {
    optimizePackageImports: [
      "lucide-react",
    ],
    staleTimes: {
      dynamic: 30,
      static: 180,
    },
  },
  images: {
    dangerouslyAllowLocalIP: true,
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "localhost",
      },
    ],
  },
};

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

export default withNextIntl(nextConfig);
