import type { GlobalConfig } from "payload";

export const ErpPage: GlobalConfig = {
  slug: "erp-page",
  access: {
    read: () => true,
  },
  admin: {
    livePreview: {
      url: "http://localhost:3000/erp",
    },
    group: "Pages",
    description:
      "Manage the UniERP platform details page: hero, overview, partnership, modules, industries, implementation, pricing, case studies, and CTAs.",
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        /* ─── Tab: Hero ──────────────────────────────────────────── */
        {
          label: "Hero",
          fields: [
            {
              name: "heroBackgroundImage",
              type: "upload",
              relationTo: "media",
              admin: { description: "Full-width background image for the hero section." },
            },
            {
              name: "hero",
              type: "group",
              fields: [
                {
                  name: "headline",
                  type: "text",
                  localized: true,
                  admin: { description: "Main hero heading." },
                },
                {
                  name: "subHeadline",
                  type: "textarea",
                  localized: true,
                  admin: { description: "Supporting text below the headline." },
                },
                {
                  name: "ctaLabel",
                  type: "text",
                  localized: true,
                  admin: { description: "Primary CTA button label (e.g. 'Request a Demo')." },
                },
                {
                  name: "ctaLink",
                  type: "text",
                  admin: { description: "CTA link target (e.g. /erp/demo-request)." },
                },
                {
                  name: "secondaryCtaLabel",
                  type: "text",
                  localized: true,
                  admin: { description: "Secondary CTA label (e.g. 'Calculate ROI')." },
                },
                {
                  name: "secondaryCtaLink",
                  type: "text",
                  admin: { description: "Secondary CTA link target (e.g. /erp/roi-calculator)." },
                },
              ],
            },
          ],
        },

        /* ─── Tab: Overview ──────────────────────────────────────── */
        {
          label: "Overview",
          fields: [
            {
              name: "overviewEyebrow",
              type: "text",
              localized: true,
              admin: { description: "Small eyebrow label above the overview heading." },
            },
            {
              name: "overviewHeading",
              type: "text",
              localized: true,
              admin: { description: "Overview section heading." },
            },
            {
              name: "overviewDescription",
              type: "richText",
              localized: true,
              admin: { description: "Main overview / value-proposition content." },
            },
            {
              name: "keyStats",
              type: "array",
              admin: { description: "Key statistics shown in the overview (e.g. 150+ projects)." },
              fields: [
                {
                  name: "value",
                  type: "text",
                  required: true,
                  localized: true,
                },
                {
                  name: "label",
                  type: "text",
                  required: true,
                  localized: true,
                },
              ],
            },
          ],
        },

        /* ─── Tab: Comparison ────────────────────────────────────── */
        {
          label: "Comparison",
          fields: [
            {
              name: "comparisonEyebrow",
              type: "text",
              localized: true,
            },
            {
              name: "comparisonHeading",
              type: "text",
              localized: true,
            },
            {
              name: "comparisonDescription",
              type: "textarea",
              localized: true,
            },
            {
              name: "comparisonColumns",
              type: "array",
              admin: { description: "Three column headers in order: Traditional ERP, Microsoft Dynamics, UniERP." },
              defaultValue: [
                { name: "Traditional ERP (SAP/Oracle)" },
                { name: "Microsoft Dynamics" },
                { name: "UniERP (Odoo 19 CE)" },
              ],
              fields: [
                {
                  name: "name",
                  type: "text",
                  required: true,
                  localized: true,
                },
              ],
            },
            {
              name: "comparisonRows",
              type: "array",
              admin: { description: "Feature rows comparing the three columns. The third value is highlighted as UniERP." },
              fields: [
                {
                  name: "feature",
                  type: "text",
                  required: true,
                  localized: true,
                },
                {
                  name: "valueA",
                  type: "text",
                  localized: true,
                  admin: { description: "Value for the first column (Traditional ERP)." },
                },
                {
                  name: "valueB",
                  type: "text",
                  localized: true,
                  admin: { description: "Value for the second column (Microsoft Dynamics)." },
                },
                {
                  name: "valueC",
                  type: "text",
                  localized: true,
                  admin: { description: "Value for the third column (UniERP) — highlighted." },
                },
              ],
            },
          ],
        },

        /* ─── Tab: Partnership ───────────────────────────────────── */
        {
          label: "Partnership",
          fields: [
            {
              name: "partnershipEyebrow",
              type: "text",
              localized: true,
            },
            {
              name: "partnershipHeading",
              type: "text",
              localized: true,
            },
            {
              name: "partnershipDescription",
              type: "richText",
              localized: true,
              admin: { description: "Simal–UniSoft partnership model explanation." },
            },
            {
              name: "partnershipHighlights",
              type: "array",
              admin: { description: "Key highlights of the partnership." },
              fields: [
                {
                  name: "icon",
                  type: "select",
                  options: [
                    { label: "Building", value: "Building" },
                    { label: "Users", value: "Users" },
                    { label: "Shield", value: "Shield" },
                    { label: "Target", value: "Target" },
                    { label: "Award", value: "Award" },
                    { label: "Zap", value: "Zap" },
                    { label: "TrendingUp", value: "TrendingUp" },
                    { label: "Clock", value: "Clock" },
                  ],
                },
                {
                  name: "title",
                  type: "text",
                  required: true,
                  localized: true,
                },
                {
                  name: "description",
                  type: "textarea",
                  localized: true,
                },
              ],
            },
          ],
        },

        /* ─── Tab: Technology ─────────────────────────────────────── */
        {
          label: "Technology",
          fields: [
            {
              name: "technologyEyebrow",
              type: "text",
              localized: true,
            },
            {
              name: "technologyHeading",
              type: "text",
              localized: true,
            },
            {
              name: "technologyDescription",
              type: "richText",
              localized: true,
              admin: { description: "Technology foundation description (Odoo 19 CE, etc.)." },
            },
            {
              name: "techStack",
              type: "array",
              admin: { description: "Technology stack items." },
              fields: [
                {
                  name: "name",
                  type: "text",
                  required: true,
                },
                {
                  name: "description",
                  type: "textarea",
                  localized: true,
                },
                {
                  name: "icon",
                  type: "select",
                  options: [
                    { label: "Server", value: "Server" },
                    { label: "Database", value: "Database" },
                    { label: "Cloud", value: "Cloud" },
                    { label: "Lock", value: "Lock" },
                    { label: "Smartphone", value: "Smartphone" },
                    { label: "Code", value: "Code" },
                    { label: "Cpu", value: "Cpu" },
                    { label: "Globe", value: "Globe" },
                  ],
                },
              ],
            },
          ],
        },

        /* ─── Tab: Target Audience ───────────────────────────────── */
        {
          label: "Target Audience",
          fields: [
            {
              name: "audienceEyebrow",
              type: "text",
              localized: true,
            },
            {
              name: "audienceHeading",
              type: "text",
              localized: true,
            },
            {
              name: "audienceDescription",
              type: "textarea",
              localized: true,
            },
            {
              name: "audience",
              type: "array",
              admin: { description: "Persona / target-audience cards ('Who Is UniERP For?')." },
              fields: [
                {
                  name: "icon",
                  type: "select",
                  options: [
                    { label: "Building", value: "Building" },
                    { label: "Briefcase", value: "Briefcase" },
                    { label: "Globe", value: "Globe" },
                    { label: "Landmark", value: "Landmark" },
                    { label: "HeartHandshake", value: "HeartHandshake" },
                    { label: "Shield", value: "Shield" },
                    { label: "Users", value: "Users" },
                    { label: "Target", value: "Target" },
                  ],
                },
                {
                  name: "title",
                  type: "text",
                  required: true,
                  localized: true,
                },
                {
                  name: "description",
                  type: "textarea",
                  localized: true,
                },
              ],
            },
          ],
        },

        /* ─── Tab: Differentiators ────────────────────────────────── */
        {
          label: "Differentiators",
          fields: [
            {
              name: "differentiatorsEyebrow",
              type: "text",
              localized: true,
            },
            {
              name: "differentiatorsHeading",
              type: "text",
              localized: true,
            },
            {
              name: "differentiators",
              type: "array",
              admin: { description: "Key differentiators vs. competitors." },
              fields: [
                {
                  name: "icon",
                  type: "select",
                  options: [
                    { label: "CheckCircle", value: "CheckCircle" },
                    { label: "Star", value: "Star" },
                    { label: "DollarSign", value: "DollarSign" },
                    { label: "MapPin", value: "MapPin" },
                    { label: "Headphones", value: "Headphones" },
                    { label: "Rocket", value: "Rocket" },
                    { label: "HeartHandshake", value: "HeartHandshake" },
                    { label: "BadgeCheck", value: "BadgeCheck" },
                  ],
                },
                {
                  name: "title",
                  type: "text",
                  required: true,
                  localized: true,
                },
                {
                  name: "description",
                  type: "textarea",
                  localized: true,
                },
              ],
            },
          ],
        },

        /* ─── Tab: Core Modules ───────────────────────────────────── */
        {
          label: "Core Modules",
          fields: [
            {
              name: "modulesEyebrow",
              type: "text",
              localized: true,
            },
            {
              name: "modulesHeading",
              type: "text",
              localized: true,
            },
            {
              name: "modulesDescription",
              type: "textarea",
              localized: true,
            },
            {
              name: "coreModules",
              type: "array",
              admin: { description: "ERP core module cards." },
              fields: [
                {
                  name: "name",
                  type: "text",
                  required: true,
                  localized: true,
                },
                {
                  name: "description",
                  type: "textarea",
                  localized: true,
                },
                {
                  name: "icon",
                  type: "select",
                  options: [
                    { label: "Calculator", value: "Calculator" },
                    { label: "Users", value: "Users" },
                    { label: "BarChart3", value: "BarChart3" },
                    { label: "Package", value: "Package" },
                    { label: "Factory", value: "Factory" },
                    { label: "Clipboard", value: "Clipboard" },
                  ],
                },
                {
                  name: "features",
                  type: "array",
                  admin: { description: "Key features in this module." },
                  fields: [
                    {
                      name: "name",
                      type: "text",
                      required: true,
                      localized: true,
                    },
                    {
                      name: "description",
                      type: "textarea",
                      localized: true,
                    },
                  ],
                },
                {
                  name: "screenshot",
                  type: "upload",
                  relationTo: "media",
                  admin: { description: "Module screenshot or mockup." },
                },
                {
                  name: "link",
                  type: "text",
                  admin: { description: "Link to the detailed module sub-page (e.g. /erp/finance-accounting)." },
                },
              ],
            },
          ],
        },

        /* ─── Tab: Industry Solutions ─────────────────────────────── */
        {
          label: "Industry Solutions",
          fields: [
            {
              name: "industriesEyebrow",
              type: "text",
              localized: true,
            },
            {
              name: "industriesHeading",
              type: "text",
              localized: true,
            },
            {
              name: "industriesDescription",
              type: "textarea",
              localized: true,
              admin: { description: "Short intro for the industry solutions grid." },
            },
          ],
        },

        /* ─── Tab: Implementation ─────────────────────────────────── */
        {
          label: "Implementation",
          fields: [
            {
              name: "implementationEyebrow",
              type: "text",
              localized: true,
            },
            {
              name: "implementationHeading",
              type: "text",
              localized: true,
            },
            {
              name: "implementationDescription",
              type: "textarea",
              localized: true,
            },
            {
              name: "implementationSteps",
              type: "array",
              admin: { description: "Step-by-step implementation process." },
              fields: [
                {
                  name: "stepNumber",
                  type: "number",
                  required: true,
                },
                {
                  name: "title",
                  type: "text",
                  required: true,
                  localized: true,
                },
                {
                  name: "description",
                  type: "textarea",
                  localized: true,
                },
                {
                  name: "icon",
                  type: "select",
                  options: [
                    { label: "Search", value: "Search" },
                    { label: "Clipboard", value: "Clipboard" },
                    { label: "Settings", value: "Settings" },
                    { label: "Flask", value: "Flask" },
                    { label: "GraduationCap", value: "GraduationCap" },
                    { label: "Rocket", value: "Rocket" },
                    { label: "Headphones", value: "Headphones" },
                  ],
                },
                {
                  name: "duration",
                  type: "text",
                  localized: true,
                  admin: { description: "Typical duration (e.g. '2-4 weeks')." },
                },
              ],
            },
          ],
        },

        /* ─── Tab: Pricing ────────────────────────────────────────── */
        {
          label: "Pricing",
          fields: [
            {
              name: "pricingEyebrow",
              type: "text",
              localized: true,
            },
            {
              name: "pricingHeading",
              type: "text",
              localized: true,
            },
            {
              name: "pricingDescription",
              type: "textarea",
              localized: true,
            },
            {
              name: "pricingTiers",
              type: "array",
              admin: { description: "Pricing tier cards." },
              fields: [
                {
                  name: "tierName",
                  type: "text",
                  required: true,
                  localized: true,
                },
                {
                  name: "price",
                  type: "text",
                  localized: true,
                  admin: { description: "Display price (e.g. 'Starting at $X/mo')." },
                },
                {
                  name: "description",
                  type: "textarea",
                  localized: true,
                },
                {
                  name: "features",
                  type: "array",
                  admin: { description: "Features included in this tier." },
                  fields: [
                    {
                      name: "feature",
                      type: "text",
                      required: true,
                      localized: true,
                    },
                  ],
                },
                {
                  name: "ctaLabel",
                  type: "text",
                  localized: true,
                },
                {
                  name: "ctaLink",
                  type: "text",
                },
                {
                  name: "highlighted",
                  type: "checkbox",
                  defaultValue: false,
                  admin: { description: "Highlight this tier as recommended." },
                },
              ],
            },
            {
              name: "pricingDisclaimer",
              type: "textarea",
              localized: true,
              admin: { description: "Disclaimer below pricing (e.g. indicative pricing)." },
            },
          ],
        },

        /* ─── Tab: Case Studies ───────────────────────────────────── */
        {
          label: "Case Studies",
          fields: [
            {
              name: "caseStudiesEyebrow",
              type: "text",
              localized: true,
            },
            {
              name: "caseStudiesHeading",
              type: "text",
              localized: true,
            },
            {
              name: "featuredCaseStudies",
              type: "array",
              admin: { description: "Featured client success stories." },
              fields: [
                {
                  name: "clientName",
                  type: "text",
                  required: true,
                },
                {
                  name: "industry",
                  type: "text",
                  localized: true,
                },
                {
                  name: "background",
                  type: "textarea",
                  localized: true,
                },
                {
                  name: "challenge",
                  type: "textarea",
                  localized: true,
                },
                {
                  name: "solution",
                  type: "textarea",
                  localized: true,
                },
                {
                  name: "results",
                  type: "array",
                  fields: [
                    {
                      name: "value",
                      type: "text",
                      required: true,
                      localized: true,
                    },
                    {
                      name: "label",
                      type: "text",
                      required: true,
                      localized: true,
                    },
                  ],
                },
                {
                  name: "testimonialQuote",
                  type: "textarea",
                  localized: true,
                },
                {
                  name: "testimonialAuthor",
                  type: "text",
                },
                {
                  name: "testimonialRole",
                  type: "text",
                  localized: true,
                },
              ],
            },
          ],
        },

        /* ─── Tab: Testimonials ───────────────────────────────────── */
        {
          label: "Testimonials",
          fields: [
            {
              name: "testimonialsEyebrow",
              type: "text",
              localized: true,
            },
            {
              name: "testimonialsHeading",
              type: "text",
              localized: true,
            },
            {
              name: "customerLogos",
              type: "array",
              admin: { description: "Customer/partner logo grid." },
              fields: [
                {
                  name: "logo",
                  type: "upload",
                  relationTo: "media",
                },
                {
                  name: "companyName",
                  type: "text",
                  localized: true,
                },
              ],
            },
          ],
        },

        /* ─── Tab: CTA ────────────────────────────────────────────── */
        {
          label: "CTA",
          fields: [
            {
              name: "ctaEyebrow",
              type: "text",
              localized: true,
            },
            {
              name: "ctaHeading",
              type: "text",
              localized: true,
            },
            {
              name: "ctaDescription",
              type: "textarea",
              localized: true,
            },
            {
              name: "cta",
              type: "group",
              fields: [
                {
                  name: "phoneLabel",
                  type: "text",
                  localized: true,
                },
                {
                  name: "phoneNumber",
                  type: "text",
                },
                {
                  name: "whatsappLabel",
                  type: "text",
                  localized: true,
                },
                {
                  name: "whatsappNumber",
                  type: "text",
                  admin: { description: "WhatsApp number in international format, e.g. +971 54 308 8655." },
                },
                {
                  name: "emailLabel",
                  type: "text",
                  localized: true,
                },
                {
                  name: "emailAddress",
                  type: "text",
                },
                {
                  name: "demoLinkLabel",
                  type: "text",
                  localized: true,
                },
                {
                  name: "demoLinkUrl",
                  type: "text",
                },
              ],
            },
          ],
        },

        /* ─── Tab: SEO ────────────────────────────────────────────── */
        {
          label: "SEO",
          fields: [
            {
              name: "meta",
              type: "group",
              fields: [
                {
                  name: "title",
                  type: "text",
                  localized: true,
                  admin: { description: "Browser title / OG title. Falls back to hero headline." },
                },
                {
                  name: "description",
                  type: "textarea",
                  localized: true,
                  admin: { description: "Meta / OG description." },
                },
                {
                  name: "image",
                  type: "upload",
                  relationTo: "media",
                  admin: { description: "OG image." },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
