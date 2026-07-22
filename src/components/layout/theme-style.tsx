const TOKEN_TO_CSS_VAR: Record<string, string> = {
  background: "--background",
  foreground: "--foreground",
  card: "--card",
  cardForeground: "--card-foreground",
  popover: "--popover",
  popoverForeground: "--popover-foreground",
  primary: "--primary",
  primaryForeground: "--primary-foreground",
  secondary: "--secondary",
  secondaryForeground: "--secondary-foreground",
  muted: "--muted",
  mutedForeground: "--muted-foreground",
  accent: "--accent",
  accentForeground: "--accent-foreground",
  destructive: "--destructive",
  destructiveForeground: "--destructive-foreground",
  border: "--border",
  input: "--input",
  ring: "--ring",
};

function tokensToCSS(tokens: Record<string, string>): string {
  return Object.entries(tokens)
    .map(([key, value]) => {
      const cssVar = TOKEN_TO_CSS_VAR[key];
      return cssVar ? `    ${cssVar}: ${value};` : "";
    })
    .filter(Boolean)
    .join("\n");
}

function isStringRecord(v: unknown): v is Record<string, string> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

export function ThemeStyle({
  theme,
}: {
  theme: Record<string, unknown> | null;
}) {
  if (!theme) return null;

  const lightMode = theme.lightMode;
  const darkMode = theme.darkMode;

  if (!isStringRecord(lightMode) || !isStringRecord(darkMode)) return null;

  const blocks: string[] = [];

  const lightCSS = tokensToCSS(lightMode);
  if (lightCSS) blocks.push(`  :root {\n${lightCSS}\n  }`);

  const darkCSS = tokensToCSS(darkMode);
  if (darkCSS) blocks.push(`  .dark {\n${darkCSS}\n  }`);

  if (typeof theme.radius === "number") {
    blocks.push(`  :root { --radius: ${theme.radius / 16}rem; }`);
  }

  return (
    <style id="cms-theme-tokens" suppressHydrationWarning>
      {`\n${blocks.join("\n\n")}\n  `}
    </style>
  );
}
