"use client";

import { themeConfig } from "../theme.config";

/**
 * Sidebar logo. Wired via payload.config.ts → admin.components.graphics.Logo.
 */
export default function Logo() {
  return (
    <img
      src={themeConfig.logoUrl}
      alt={themeConfig.brandName}
      height={themeConfig.logoHeight ?? 32}
    />
  );
}
