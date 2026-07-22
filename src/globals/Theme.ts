import type { GlobalConfig } from "payload";
import { revalidatePath, revalidateTag } from "next/cache";

const HEX_REGEX = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

const hexField = (
  name: string,
  label: string,
  defaultValue: string,
  description: string,
) => ({
  name,
  type: "text" as const,
  label,
  defaultValue,
  required: true,
  admin: { description },
  validate: (value: unknown) =>
    typeof value === "string" && HEX_REGEX.test(value)
      ? true
      : "Enter a hex color like #DF4C73 or #FFF",
});

const TOKEN_FIELDS = [
  hexField("background", "Background", "#FFFFFF", "Page background."),
  hexField(
    "foreground",
    "Foreground",
    "#0F172A",
    "Primary text. Aim for ≥ 4.5:1 contrast against Background.",
  ),
  hexField("card", "Card", "#FFFFFF", "Cards and raised panels."),
  hexField(
    "cardForeground",
    "Card Foreground",
    "#0F172A",
    "Text on Card surfaces.",
  ),
  hexField("popover", "Popover", "#FFFFFF", "Dropdowns, modals, tooltips."),
  hexField(
    "popoverForeground",
    "Popover Foreground",
    "#0F172A",
    "Text on Popover surfaces.",
  ),
  hexField(
    "primary",
    "Primary",
    "#DF4C73",
    "Main brand color — CTAs, links, key accents.",
  ),
  hexField(
    "primaryForeground",
    "Primary Foreground",
    "#FFFFFF",
    "Text/icon color on Primary surfaces.",
  ),
  hexField(
    "secondary",
    "Secondary",
    "#F1F5F9",
    "Secondary button and surface color.",
  ),
  hexField(
    "secondaryForeground",
    "Secondary Foreground",
    "#0F172A",
    "Text on Secondary surfaces.",
  ),
  hexField("muted", "Muted", "#F1F5F9", "Muted surface (subtle backgrounds)."),
  hexField(
    "mutedForeground",
    "Muted Foreground",
    "#6B7280",
    "Secondary text and captions.",
  ),
  hexField(
    "accent",
    "Accent",
    "#F1F5F9",
    "Hover/active surface for ghost and outline components.",
  ),
  hexField(
    "accentForeground",
    "Accent Foreground",
    "#0F172A",
    "Text on Accent surfaces.",
  ),
  hexField(
    "destructive",
    "Destructive",
    "#DC2626",
    "Errors and destructive actions.",
  ),
  hexField(
    "destructiveForeground",
    "Destructive Foreground",
    "#FFFFFF",
    "Text on Destructive surfaces.",
  ),
  hexField("border", "Border", "#E5E7EB", "Hairline borders and dividers."),
  hexField("input", "Input", "#E5E7EB", "Border color for form inputs."),
  hexField(
    "ring",
    "Focus Ring",
    "#DF4C73",
    "Outline color for keyboard focus.",
  ),
];

const DARK_TOKEN_FIELDS = [
  hexField("background", "Background", "#0B1120", "Page background."),
  hexField("foreground", "Foreground", "#F8FAFC", "Primary text."),
  hexField("card", "Card", "#111827", "Cards and raised panels."),
  hexField("cardForeground", "Card Foreground", "#F8FAFC", "Text on Card."),
  hexField("popover", "Popover", "#111827", "Dropdowns, modals, tooltips."),
  hexField(
    "popoverForeground",
    "Popover Foreground",
    "#F8FAFC",
    "Text on Popover.",
  ),
  hexField(
    "primary",
    "Primary",
    "#DF4C73",
    "Main brand color — CTAs, links, accents.",
  ),
  hexField(
    "primaryForeground",
    "Primary Foreground",
    "#FFFFFF",
    "Text/icon on Primary.",
  ),
  hexField(
    "secondary",
    "Secondary",
    "#1F2937",
    "Secondary button and surface color.",
  ),
  hexField(
    "secondaryForeground",
    "Secondary Foreground",
    "#F8FAFC",
    "Text on Secondary.",
  ),
  hexField("muted", "Muted", "#1F2937", "Muted surface."),
  hexField(
    "mutedForeground",
    "Muted Foreground",
    "#94A3B8",
    "Secondary text and captions.",
  ),
  hexField("accent", "Accent", "#1F2937", "Hover/active surface."),
  hexField(
    "accentForeground",
    "Accent Foreground",
    "#F8FAFC",
    "Text on Accent.",
  ),
  hexField("destructive", "Destructive", "#DC2626", "Errors."),
  hexField(
    "destructiveForeground",
    "Destructive Foreground",
    "#FFFFFF",
    "Text on Destructive.",
  ),
  hexField("border", "Border", "#1F2937", "Hairline borders and dividers."),
  hexField("input", "Input", "#1F2937", "Border color for inputs."),
  hexField("ring", "Focus Ring", "#DF4C73", "Keyboard focus ring."),
];

export const Theme: GlobalConfig = {
  slug: "theme",
  label: "Theme",
  access: {
    read: () => true,
  },
  admin: {
    description:
      "Brand and surface tokens for the public website (shadcn/ui convention). Light and Dark Mode are configured separately. Brand colors are usually the same in both; only surfaces need retuning. Saves revalidate the layout cache within a few seconds.",
  },
  hooks: {
    afterChange: [
      async () => {
        revalidateTag("layout-globals", "default");
        revalidatePath("/", "layout");
      },
    ],
  },
  fields: [
    {
      name: "preset",
      type: "text",
      label: "Theme Preset",
      defaultValue: "indigo",
      admin: {
        description:
          "Pick a preset to populate the color fields below. The card selector is the canonical entry point — manual hex edits below are for fine-tuning and survive until a different preset is chosen.",
        components: {
          Field: "./src/payload-theme/components/ThemePresetSelector",
        },
      },
    },
    {
      name: "lightMode",
      type: "group",
      label: "Light Mode",
      admin: {
        description:
          "Semantic tokens for the default (light) mode. Used as `:root` CSS variables.",
      },
      fields: TOKEN_FIELDS,
    },
    {
      name: "darkMode",
      type: "group",
      label: "Dark Mode",
      admin: {
        description:
          "Semantic tokens for dark mode. Used under the `.dark` selector. Brand colors can stay the same; only surfaces need retuning.",
      },
      fields: DARK_TOKEN_FIELDS,
    },
    {
      name: "mode",
      type: "select",
      label: "Default Color Mode",
      defaultValue: "system",
      options: [
        { label: "System preference", value: "system" },
        { label: "Light", value: "light" },
        { label: "Dark", value: "dark" },
      ],
      admin: {
        description:
          "Initial mode for first-time visitors. Returning visitors keep their saved choice.",
      },
    },
    {
      name: "radius",
      type: "number",
      label: "Base Border Radius (px)",
      defaultValue: 8,
      min: 0,
      max: 32,
      admin: {
        description:
          "Base corner radius for cards, buttons, and inputs. Components scale relative to this via Tailwind's --radius token.",
      },
    },
  ],
};
