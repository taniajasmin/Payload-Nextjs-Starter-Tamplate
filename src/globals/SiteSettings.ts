import type { GlobalConfig } from "payload";

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "siteName",
      type: "text",
      defaultValue: "Hi-Tech Farming BD",
    },
    {
      name: "logo",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "favicon",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "defaultEmail",
      type: "email",
    },
    {
      name: "defaultPhone",
      type: "text",
    },
    {
      name: "address",
      type: "textarea",
    },
    {
      name: "socialLinks",
      type: "array",
      fields: [
        { name: "platform", type: "text" },
        { name: "url", type: "text" },
      ],
    },
    {
      name: "defaultSeo",
      type: "group",
      fields: [
        { name: "title", type: "text" },
        { name: "description", type: "textarea" },
        { name: "image", type: "upload", relationTo: "media" },
      ],
    },
    {
      name: "typography",
      type: "group",
      label: "Typography",
      fields: [
        {
          name: "heroHeadingSize",
          type: "number",
          label: "Hero / Project Heading Size (px)",
          defaultValue: 15,
          min: 10,
          max: 30,
        },
        {
          name: "headingSize",
          type: "number",
          label: "Heading / Bold Text Size (px)",
          defaultValue: 15,
          min: 10,
          max: 30,
        },
        {
          name: "bodyTextSize",
          type: "number",
          label: "Normal Text Size (px)",
          defaultValue: 12,
          min: 8,
          max: 24,
        },
        {
          name: "buttonTextSize",
          type: "number",
          label: "Button Text Size (px)",
          defaultValue: 12,
          min: 8,
          max: 24,
        },
        {
          name: "navItemSize",
          type: "number",
          label: "Nav Item Size (px)",
          defaultValue: 15,
          min: 10,
          max: 30,
        },
        {
          name: "badgeSize",
          type: "number",
          label: "Badge Text Size (px)",
          defaultValue: 12,
          min: 8,
          max: 20,
        },
        {
          name: "sectionLabelSize",
          type: "number",
          label: "Section Label Size (px)",
          defaultValue: 12,
          min: 8,
          max: 20,
        },
        {
          name: "captionSize",
          type: "number",
          label: "Caption / Tiny Label Size (px)",
          defaultValue: 10,
          min: 6,
          max: 16,
        },
      ],
    },
    {
      name: "maintenance",
      type: "group",
      label: "Maintenance / Downtime Mode",
      admin: {
        description:
          "When enabled, every public page redirects to the maintenance page. The Payload admin (/admin) and API (/api) stay reachable so you can turn it back off. Staff can bypass with the link printed below.",
      },
      fields: [
        {
          name: "enabled",
          type: "checkbox",
          defaultValue: false,
          label: "Enable maintenance mode",
        },
        {
          name: "headline",
          type: "text",
          localized: true,
          label: "Headline",
          defaultValue: "We'll be back shortly",
        },
        {
          name: "message",
          type: "textarea",
          localized: true,
          label: "Message",
          defaultValue:
            "Our website is currently undergoing scheduled maintenance. We expect to be back online shortly. Thank you for your patience.",
        },
        {
          name: "estimatedReturnTime",
          type: "text",
          localized: true,
          label: "Estimated return time (optional)",
        },
        {
          name: "logoImage",
          type: "upload",
          relationTo: "media",
          label: "Logo override (defaults to site logo)",
        },
        {
          name: "backgroundImage",
          type: "upload",
          relationTo: "media",
          label: "Background image (optional)",
        },
        {
          name: "contactEmail",
          type: "email",
          label: "Contact email (defaults to default email)",
        },
        {
          name: "contactPhone",
          type: "text",
          label: "Contact phone (defaults to default phone)",
        },
      ],
    },
  ],
};
