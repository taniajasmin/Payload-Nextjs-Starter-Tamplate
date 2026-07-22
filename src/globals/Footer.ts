import type { GlobalConfig } from "payload";

export const Footer: GlobalConfig = {
  slug: "footer",
  access: {
    read: () => true,
  },
  admin: {
    group: "Globals",
    description:
      "Manage the site footer: columns, social links, contact info, and legal text.",
  },
  fields: [
    /* ─── Brand Info ──────────────────────────────────────────────────── */
    {
      name: "brandName",
      type: "text",
      defaultValue: "Simal Technologies",
    },
    {
      name: "brandSubtitle",
      type: "text",
      defaultValue: "Middle East LLC",
    },
    {
      name: "brandDescription",
      type: "textarea",
      localized: true,
      defaultValue:
        "Premier IT distributor in Dubai, UAE with 20+ years experience. Authorized distributor for 20+ global brands. Delivering authentic IT products across the Middle East, Africa, and CIS.",
    },
    {
      name: "logo",
      type: "upload",
      relationTo: "media",
      admin: {
        description: "Footer logo (SVG or PNG recommended).",
      },
    },

    /* ─── Social Links ────────────────────────────────────────────────── */
    {
      name: "socialLinks",
      type: "array",
      label: "Social Media Links",
      fields: [
        {
          name: "platform",
          type: "select",
          required: true,
          options: [
            { label: "LinkedIn", value: "linkedin" },
            { label: "Instagram", value: "instagram" },
            { label: "Facebook", value: "facebook" },
            { label: "YouTube", value: "youtube" },
            { label: "WhatsApp", value: "whatsapp" },
            { label: "Twitter / X", value: "twitter" },
          ],
        },
        {
          name: "url",
          type: "text",
          required: true,
        },
      ],
    },

    /* ─── Footer Columns ──────────────────────────────────────────────── */
    {
      name: "footerColumns",
      type: "array",
      label: "Footer Link Columns",
      admin: {
        description:
          "Each column appears in the footer with a title and list of links.",
      },
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
          localized: true,
        },
        {
          name: "links",
          type: "array",
          fields: [
            { name: "label", type: "text", required: true, localized: true },
            { name: "href", type: "text", required: true },
          ],
        },
      ],
    },

    /* ─── Contact Bar ─────────────────────────────────────────────────── */
    {
      name: "contactPhone",
      type: "text",
      defaultValue: "+971 4 393 0507",
    },
    {
      name: "contactEmail",
      type: "text",
      defaultValue: "info@simalme.com",
    },
    {
      name: "contactAddress",
      type: "text",
      defaultValue: "Office 201, Dar Al Riffa Building, Bur Dubai, UAE",
    },

    /* ─── Legal Info ──────────────────────────────────────────────────── */
    {
      name: "vatNumber",
      type: "text",
      defaultValue: "100207478700003",
    },
    {
      name: "tradeLicense",
      type: "text",
      defaultValue: "49740",
    },
    {
      name: "chamberMember",
      type: "text",
      defaultValue: "Dubai Chamber Member",
    },

    /* ─── Copyright ───────────────────────────────────────────────────── */
    {
      name: "copyright",
      type: "text",
      localized: true,
      defaultValue:
        "© {year} Simal Technologies Middle East LLC. A TwinMOS Group Company. All rights reserved.",
      admin: {
        description:
          "Use {year} as a placeholder for the current year. Use {twinmosLink} for the TwinMOS link.",
      },
    },
    {
      name: "parentCompany",
      type: "group",
      fields: [
        { name: "name", type: "text", defaultValue: "TwinMOS Group" },
        { name: "url", type: "text", defaultValue: "https://twinmos.com" },
      ],
    },
  ],
};
