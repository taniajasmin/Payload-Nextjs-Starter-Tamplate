"use client";

import { themeConfig } from "../theme.config";

/**
 * Collapsed-sidebar icon. Shown when the sidebar is collapsed.
 */
export default function Icon() {
  return (
    <img
      src={themeConfig.logoUrl}
      alt={themeConfig.brandName}
      height={themeConfig.iconHeight ?? 24}
    />
  );
}
