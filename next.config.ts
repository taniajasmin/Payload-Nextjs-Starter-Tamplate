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
  transpilePackages: ["three", "@react-three/fiber", "@react-three/drei"],
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "framer-motion",
      "@react-three/drei",
      "@react-three/fiber",
      "three",
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
        protocol: "https",
        hostname: "**.simalme.com",
      },
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
  async redirects() {
    const locales = ["en", "ar", "fr", "ru"];
    type RedirectEntry = {
      source: string;
      destination: string;
      permanent: boolean;
    };
    const rules: RedirectEntry[] = [];

    // Section renames: it-distribution → hardware, services → software.
    // Permanent (301) so bookmarks & search indexes update to the new URLs.
    const sectionRenames: Array<[string, string]> = [
      ["it-distribution", "hardware"],
      ["services", "software"],
    ];
    for (const [from, to] of sectionRenames) {
      for (const locale of locales) {
        rules.push({
          source: `/${locale}/${from}/:path*`,
          destination: `/${locale}/${to}/:path*`,
          permanent: true,
        });
        rules.push({
          source: `/${locale}/${from}`,
          destination: `/${locale}/${to}`,
          permanent: true,
        });
      }
      rules.push({
        source: `/${from}/:path*`,
        destination: `/${to}/:path*`,
        permanent: true,
      });
      rules.push({
        source: `/${from}`,
        destination: `/${to}`,
        permanent: true,
      });
    }

    // Legacy /blog → /resources/blog (non-permanent during the transition).
    for (const locale of locales) {
      rules.push({
        source: `/${locale}/blog/:path*`,
        destination: `/${locale}/resources/blog/:path*`,
        permanent: false,
      });
    }
    rules.push({
      source: "/blog/:path*",
      destination: "/resources/blog/:path*",
      permanent: false,
    });
    return rules;
  },
};

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

export default withNextIntl(nextConfig);
