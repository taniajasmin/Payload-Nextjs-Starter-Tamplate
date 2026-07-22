import type { GlobalConfig } from "payload";

export const Header: GlobalConfig = {
  slug: "header",
  access: {
    read: () => true,
  },
  admin: {
    group: "Globals",
    description:
      "Manage the site header: logo, utility bar, and primary navigation with mega menu support.",
  },
  fields: [
    {
      name: "logo",
      type: "upload",
      relationTo: "media",
      admin: {
        description: "Upload the site logo (SVG or PNG recommended).",
      },
    },
    {
      type: "tabs",
      tabs: [
        {
          label: "Utility Bar",
          description: "Top bar with contact info and language switcher.",
          fields: [
            {
              name: "utilityBar",
              type: "group",
              fields: [
                {
                  name: "phone",
                  type: "text",
                  defaultValue: "+971 4 393 0507",
                },
                {
                  name: "email",
                  type: "text",
                  defaultValue: "hello@example.com",
                },
                {
                  name: "whatsapp",
                  type: "text",
                  label: "WhatsApp Number",
                  defaultValue: "+971 54 308 8655",
                  admin: {
                    description:
                      "WhatsApp number for the top bar link (e.g. +971 54 308 8655).",
                  },
                },
                {
                  name: "showLanguageSwitcher",
                  type: "checkbox",
                  label: "Show Language Switcher",
                  defaultValue: true,
                },
                {
                  name: "showWhatsapp",
                  type: "checkbox",
                  label: "Show WhatsApp Link",
                  defaultValue: true,
                },
                {
                  name: "showSocialLinks",
                  type: "checkbox",
                  label: "Show Social Links",
                  defaultValue: true,
                },
                {
                  name: "socialLinks",
                  type: "array",
                  label: "Social Media Links",
                  admin: {
                    initCollapsed: true,
                  },
                  fields: [
                    {
                      name: "platform",
                      type: "select",
                      required: true,
                      options: [
                        { label: "LinkedIn", value: "linkedin" },
                        { label: "Instagram", value: "instagram" },
                        { label: "Facebook", value: "facebook" },
                        { label: "X (Twitter)", value: "x" },
                        { label: "YouTube", value: "youtube" },
                      ],
                    },
                    {
                      name: "url",
                      type: "text",
                      required: true,
                      admin: {
                        description: "Full URL to the social profile.",
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: "CTA Button",
          description:
            "Call-to-action button shown in the utility bar and on tablets.",
          fields: [
            {
              name: "ctaButton",
              type: "group",
              fields: [
                {
                  name: "label",
                  type: "text",
                  localized: true,
                  defaultValue: "Contact Sales",
                },
                {
                  name: "href",
                  type: "text",
                  defaultValue: "/contact",
                },
                {
                  name: "show",
                  type: "checkbox",
                  label: "Show CTA Button",
                  defaultValue: true,
                },
              ],
            },
          ],
        },
        {
          label: "Primary Navigation",
          description:
            "Main nav items. Set status to Published to show in header. Enable dropdown to create mega menus.",
          fields: [
            {
              name: "navItems",
              type: "array",
              label: "Navigation Items",
              admin: {
                initCollapsed: false,
              },
              fields: [
                {
                  name: "label",
                  type: "text",
                  required: true,
                  localized: true,
                  admin: {
                    width: "50%",
                  },
                },
                {
                  name: "link",
                  type: "text",
                  required: true,
                  admin: {
                    width: "50%",
                    description:
                      "URL path — e.g., /about, /it-distribution, /brands. Use / for home.",
                  },
                },
                {
                  name: "status",
                  type: "select",
                  label: "Visibility",
                  defaultValue: "published",
                  options: [
                    { label: "Published", value: "published" },
                    { label: "Draft", value: "draft" },
                  ],
                  admin: {
                    description:
                      "Published = visible on site. Draft = hidden on site.",
                    width: "50%",
                  },
                },
                {
                  name: "hasDropdown",
                  type: "checkbox",
                  label: "Show as Dropdown / Mega Menu",
                  defaultValue: false,
                  admin: {
                    width: "33%",
                  },
                },
                {
                  name: "dropdownVariant",
                  type: "select",
                  label: "Dropdown Style",
                  defaultValue: "mega",
                  options: [
                    { label: "Mega Menu", value: "mega" },
                    { label: "Simple Dropdown", value: "simple" },
                  ],
                  admin: {
                    width: "33%",
                    condition: (data, siblingData) =>
                      siblingData?.hasDropdown === true,
                  },
                },
                {
                  name: "viewAllLabel",
                  type: "text",
                  label: "View All Label",
                  localized: true,
                  admin: {
                    width: "50%",
                    condition: (data, siblingData) =>
                      siblingData?.hasDropdown === true,
                    description:
                      'Footer CTA text — e.g., "Explore Full Catalog", "All Solutions & Services"',
                  },
                },
                {
                  name: "viewAllLink",
                  type: "text",
                  label: "View All Link",
                  admin: {
                    width: "50%",
                    condition: (data, siblingData) =>
                      siblingData?.hasDropdown === true,
                    description:
                      "URL for the footer CTA — e.g., /hardware/product-catalog",
                  },
                },
                {
                  name: "children",
                  type: "array",
                  label: "Dropdown Items",
                  admin: {
                    condition: (data, siblingData) =>
                      siblingData?.hasDropdown === true,
                    initCollapsed: false,
                  },
                  fields: [
                    {
                      name: "label",
                      type: "text",
                      required: true,
                      localized: true,
                    },
                    {
                      name: "link",
                      type: "text",
                      required: true,
                      admin: {
                        description: "URL path for this dropdown item.",
                      },
                    },
                    {
                      name: "section",
                      type: "text",
                      admin: {
                        description:
                          "Optional section heading to group items under. Leave blank to keep items ungrouped.",
                        width: "50%",
                      },
                    },
                    {
                      name: "description",
                      type: "textarea",
                      localized: true,
                      admin: {
                        description:
                          "Optional short description shown in mega menu.",
                      },
                    },
                    {
                      name: "icon",
                      type: "select",
                      label: "Icon",
                      options: [
                        { label: "Package", value: "Package" },
                        { label: "CPU", value: "Cpu" },
                        { label: "Mouse", value: "Mouse" },
                        { label: "Monitor", value: "Monitor" },
                        { label: "Gamepad", value: "Gamepad" },
                        { label: "Laptop", value: "Laptop" },
                        { label: "Box", value: "Box" },
                        { label: "Hard Drive", value: "HardDrive" },
                        { label: "WiFi", value: "Wifi" },
                        { label: "Shield", value: "Shield" },
                        { label: "Smartphone", value: "Smartphone" },
                        { label: "Headphones", value: "Headphones" },
                        { label: "Cart", value: "ShoppingCart" },
                        { label: "Briefcase", value: "Briefcase" },
                        { label: "Users", value: "Users" },
                        { label: "File Text", value: "FileText" },
                        { label: "Book Open", value: "BookOpen" },
                        { label: "Phone", value: "Phone" },
                        { label: "Map Pin", value: "MapPin" },
                        { label: "Globe", value: "Globe" },
                        { label: "Bar Chart", value: "BarChart3" },
                        { label: "Settings", value: "Settings" },
                        { label: "Wallet", value: "Wallet" },
                        { label: "Truck", value: "Truck" },
                        { label: "Factory", value: "Factory" },
                        { label: "Graduation Cap", value: "GraduationCap" },
                        { label: "Heart Pulse", value: "HeartPulse" },
                        { label: "Utensils", value: "Utensils" },
                        { label: "Landmark", value: "Landmark" },
                        { label: "Store", value: "Store" },
                        { label: "Clapperboard", value: "Clapperboard" },
                        { label: "Clipboard List", value: "ClipboardList" },
                        { label: "Trending Up", value: "TrendingUp" },
                        { label: "Calculator", value: "Calculator" },
                        { label: "Credit Card", value: "CreditCard" },
                        { label: "Database", value: "Database" },
                        { label: "Server", value: "Server" },
                        { label: "Network", value: "Network" },
                        { label: "Lock", value: "Lock" },
                        { label: "Video", value: "Video" },
                        { label: "Wrench", value: "Wrench" },
                        { label: "Award", value: "Award" },
                        { label: "Sparkles", value: "Sparkles" },
                        { label: "Lightbulb", value: "Lightbulb" },
                        { label: "Newspaper", value: "Newspaper" },
                        { label: "Help Circle", value: "HelpCircle" },
                        { label: "Building", value: "Building2" },
                        { label: "Grid", value: "LayoutGrid" },
                        { label: "Zap", value: "Zap" },
                        { label: "Mail", value: "Mail" },
                        { label: "Arrow Right", value: "ArrowRight" },
                      ],
                      admin: {
                        description:
                          "Optional icon shown in the mega menu card.",
                        width: "50%",
                      },
                    },
                    {
                      name: "iconColor",
                      type: "select",
                      label: "Icon Color",
                      options: [
                        { label: "Blue", value: "blue" },
                        { label: "Teal", value: "teal" },
                        { label: "Pink", value: "pink" },
                        { label: "Orange", value: "orange" },
                        { label: "Gold", value: "gold" },
                        { label: "Purple", value: "purple" },
                        { label: "Emerald", value: "emerald" },
                        { label: "Indigo", value: "indigo" },
                        { label: "Rose", value: "rose" },
                      ],
                      admin: {
                        description: "Color theme for the icon background.",
                        width: "50%",
                      },
                    },
                    {
                      name: "kind",
                      type: "select",
                      label: "Display Style",
                      defaultValue: "link",
                      options: [
                        { label: "Standard Link", value: "link" },
                        { label: "Brand Logo", value: "brand" },
                        { label: "Case Study Card", value: "case" },
                        { label: "View All CTA", value: "viewAll" },
                      ],
                      admin: {
                        description:
                          "How this item renders in the mega menu.",
                        width: "50%",
                      },
                    },
                    {
                      name: "brandLogo",
                      type: "text",
                      label: "Brand Logo URL",
                      admin: {
                        description:
                          "Logo image URL (only used when Display Style = Brand Logo).",
                        width: "50%",
                        condition: (data, siblingData) =>
                          siblingData?.kind === "brand",
                      },
                    },
                    {
                      name: "badge",
                      type: "text",
                      label: "Badge Label",
                      admin: {
                        description:
                          "Badge text shown on the card (only used when Display Style = Case Study Card).",
                        width: "50%",
                        condition: (data, siblingData) =>
                          siblingData?.kind === "case",
                      },
                    },
                    {
                      name: "status",
                      type: "select",
                      label: "Visibility",
                      defaultValue: "published",
                      options: [
                        { label: "Published", value: "published" },
                        { label: "Draft", value: "draft" },
                      ],
                      admin: {
                        description:
                          "Published = visible on site. Draft = hidden on site.",
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
