"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

/**
 * `defaultTheme` comes from the Payload `theme` global's `mode` field
 * (light/dark/system) — the initial mode for first-time visitors.
 * Returning visitors keep their locally saved choice (next-themes).
 */
export function ThemeProvider({
  children,
  defaultTheme = "light",
}: {
  children: React.ReactNode;
  defaultTheme?: "light" | "dark" | "system";
}) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme={defaultTheme}
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
