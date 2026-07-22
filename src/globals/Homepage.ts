import type { GlobalConfig } from "payload";

export const Homepage: GlobalConfig = {
  slug: "homepage",
  access: {
    read: () => true,
  },
  admin: {
    livePreview: {
      url: "http://localhost:3000",
    },
    group: "Pages",
    description:
      "Manage all homepage sections: hero, company intro, product categories, featured products, brands, services, reviews, news, and newsletter.",
  },
  fields: [
    /* ─── Section Visibility & Ordering ──────────────────────────────── */
    {
      name: "sectionConfig",
      type: "array",
      label: "Section Visibility & Order",
      admin: {
        description:
          "Control which sections appear on the homepage and in what order. Drag to reorder.",
        initCollapsed: false,
      },
      fields: [
        {
          name: "sectionId",
          type: "select",
          required: true,
          options: [
            { label: "Hero", value: "hero" },
            { label: "Trust Band", value: "trust-band" },
            { label: "Company Introduction", value: "company-intro" },
            { label: "Why Choose Us", value: "why-choose-us" },
            { label: "Services", value: "services" },
            { label: "Product Categories", value: "product-categories" },
            { label: "Top Products", value: "top-products" },
            { label: "Solutions Highlight", value: "solutions-highlight" },
            { label: "Awards Showcase", value: "awards-showcase" },
            { label: "Pre-Sales Compiler", value: "pre-sales-compiler" },
            { label: "Trusted Partners", value: "trusted-partners" },
            { label: "Our Clients", value: "our-clients" },
            { label: "Authorized Brands", value: "authorized-brands" },
            { label: "Customer Reviews", value: "customer-reviews" },
            { label: "News & Blogs", value: "news-and-blogs" },
            { label: "Newsletter", value: "newsletter" },
            { label: "Quick Contact", value: "quick-contact" },
            { label: "Regional Selector", value: "regional-selector" },
          ],
        },
        {
          name: "visible",
          type: "checkbox",
          defaultValue: true,
          label: "Visible",
        },
      ],
    },

    /* ─── Tab: Hero Slider ───────────────────────────────────────────── */
    {
      type: "tabs",
      tabs: [
        {
          label: "Hero",
          description:
            "Hero section with company info, headline, CTAs, stats, and product showcase cards.",
          fields: [
            {
              name: "heroBackgroundImage",
              type: "upload",
              relationTo: "media",
              admin: {
                description: "Background image behind the hero.",
              },
            },
            {
              name: "heroContent",
              type: "group",
              label: "Hero Text & Content",
              admin: {
                description:
                  "All text and content displayed on the left side of the hero section.",
              },
              fields: [
                {
                  name: "companyName",
                  type: "text",
                  localized: true,
                  defaultValue: "Simal Technologies Middle East LLC",
                  admin: {
                    description:
                      "Company name displayed as a gradient heading.",
                  },
                },
                {
                  name: "badge",
                  type: "text",
                  localized: true,
                  defaultValue: "Leading Middle East IT Distribution Hub",
                  admin: {
                    description: "Badge text shown below the company name.",
                  },
                },
                {
                  name: "headline1",
                  type: "text",
                  localized: true,
                  defaultValue: "Powering Next-Gen",
                  admin: { description: "First line of the main headline." },
                },
                {
                  name: "headline2",
                  type: "text",
                  localized: true,
                  defaultValue: "Enterprise Tech Across",
                  admin: {
                    description: "Second line of the main headline (gradient).",
                  },
                },
                {
                  name: "headline3",
                  type: "text",
                  localized: true,
                  defaultValue: "The Gulf.",
                  admin: { description: "Third line of the main headline." },
                },
                {
                  name: "subheadline",
                  type: "textarea",
                  localized: true,
                  defaultValue:
                    "Simal Technologies Middle East LLC is the premier value-added distributor supplying certified high-performance IT hardware and solutions to enterprises.",
                  admin: { description: "Paragraph text below the headline." },
                },
                {
                  name: "featurePills",
                  type: "array",
                  label: "Feature Pills",
                  admin: {
                    description:
                      "Small pill-shaped badges showing key value propositions.",
                    initCollapsed: true,
                  },
                  fields: [
                    {
                      name: "label",
                      type: "text",
                      localized: true,
                      required: true,
                    },
                    {
                      name: "icon",
                      type: "select",
                      options: [
                        { label: "Globe", value: "Globe" },
                        { label: "Shield Check", value: "ShieldCheck" },
                        { label: "Truck", value: "Truck" },
                        { label: "Badge Check", value: "BadgeCheck" },
                      ],
                      defaultValue: "Globe",
                    },
                  ],
                },
                {
                  name: "cta1",
                  type: "group",
                  label: "Primary CTA",
                  fields: [
                    {
                      name: "label",
                      type: "text",
                      localized: true,
                      defaultValue: "Explore Products",
                    },
                    {
                      name: "link",
                      type: "text",
                      defaultValue: "/hardware/product-catalog",
                    },
                  ],
                },
                {
                  name: "cta2",
                  type: "group",
                  label: "Secondary CTA",
                  fields: [
                    {
                      name: "label",
                      type: "text",
                      localized: true,
                      defaultValue: "Our Vision",
                    },
                    {
                      name: "link",
                      type: "text",
                      defaultValue: "#intro-section",
                    },
                  ],
                },
                {
                  name: "stats",
                  type: "array",
                  label: "Hero Stats",
                  admin: {
                    description: "Statistic cards displayed below the CTAs.",
                    initCollapsed: true,
                  },
                  fields: [
                    { name: "value", type: "text", required: true },
                    {
                      name: "label",
                      type: "text",
                      localized: true,
                      required: true,
                    },
                    { name: "sub", type: "text", localized: true },
                    {
                      name: "icon",
                      type: "select",
                      options: [
                        { label: "Award", value: "Award" },
                        { label: "Headphones", value: "Headphones" },
                        { label: "Users", value: "Users" },
                      ],
                      defaultValue: "Award",
                    },
                  ],
                },
                {
                  name: "heroProducts",
                  type: "relationship",
                  relationTo: "products",
                  hasMany: true,
                  admin: {
                    description:
                      "Products displayed as sliding showcase cards on the right side of the hero. Select 5 for best visual.",
                  },
                },
              ],
            },
          ],
        },

        /* ─── Tab: Product Categories ──────────────────────────────── */
        {
          label: "Product Categories",
          description: "Product category showcase section with category cards.",
          fields: [
            {
              name: "productCategoriesSection",
              type: "group",
              fields: [
                {
                  name: "badge",
                  type: "text",
                  localized: true,
                  defaultValue: "Simal Portfolio Index",
                },
                {
                  name: "heading",
                  type: "text",
                  localized: true,
                  defaultValue: "Product Categories",
                },
                {
                  name: "subtext",
                  type: "textarea",
                  localized: true,
                  defaultValue:
                    "Explore Simal's certified portfolio across every IT hardware vertical.",
                },
              ],
            },
            {
              name: "productCategories",
              type: "relationship",
              relationTo: "categories",
              hasMany: true,
              admin: {
                description: "Select categories to display. Drag to reorder.",
              },
            },
          ],
        },

        /* ─── Tab: Pre-Sales Compiler ──────────────────────────────── */
        {
          label: "Pre-Sales Compiler",
          description:
            "Interactive pre-sales technical specification compiler.",
          fields: [
            {
              name: "preSalesCompilerSection",
              type: "group",
              fields: [
                {
                  name: "badge",
                  type: "text",
                  localized: true,
                  defaultValue: "Interactive Pre-Sales Assistant",
                },
                {
                  name: "heading",
                  type: "text",
                  localized: true,
                  defaultValue:
                    "Compile Your Pre-Sales Technical Specification",
                },
                {
                  name: "subtext",
                  type: "textarea",
                  localized: true,
                  defaultValue:
                    "Select specific models from the portfolio options below or click any category to initiate standard pre-sales diagnostics. Simal Technologies LLC delivers certified pre-sale hardware blueprints to regional Middle East integrators seamlessly.",
                },
              ],
            },
          ],
        },

        /* ─── Tab: Featured Products ────────────────────────────────── */
        {
          label: "Featured Products",
          description: "Product showcase section.",
          fields: [
            {
              name: "featuredProductsSection",
              type: "group",
              fields: [
                {
                  name: "badge",
                  type: "text",
                  localized: true,
                  defaultValue: "Product Catalog",
                },
                {
                  name: "heading",
                  type: "text",
                  localized: true,
                  defaultValue: "Top Products from Our Catalog",
                },
                {
                  name: "subtext",
                  type: "text",
                  localized: true,
                  defaultValue:
                    "Discover our top-tier, certified hardware — ready to ship from Dubai with full Middle East warranty coverage.",
                },
                {
                  name: "cardCtaLabel",
                  type: "text",
                  localized: true,
                  defaultValue: "Request Quote",
                },
                {
                  name: "cardCtaLink",
                  type: "text",
                  defaultValue: "/hardware/product-catalog",
                },
                {
                  name: "bottomCtaLabel",
                  type: "text",
                  localized: true,
                  defaultValue: "View All Products",
                },
                {
                  name: "bottomCtaLink",
                  type: "text",
                  defaultValue: "/hardware/product-catalog",
                },
              ],
            },
            {
              name: "featuredProducts",
              type: "relationship",
              relationTo: "products",
              hasMany: true,
              admin: {
                description: "Select products to feature. Drag to reorder.",
              },
            },
          ],
        },

        /* ─── Tab: Brand Showcase ───────────────────────────────────── */
        {
          label: "Brand Showcase",
          description: "Brand logos and distribution partner display.",
          fields: [
            {
              name: "brandShowcaseSection",
              type: "group",
              fields: [
                {
                  name: "badge",
                  type: "text",
                  localized: true,
                  defaultValue: "Authorized Distributor",
                },
                {
                  name: "heading",
                  type: "text",
                  localized: true,
                  defaultValue:
                    "Authorized Distributor for 20+ Global IT Brands",
                },
                {
                  name: "subtext",
                  type: "textarea",
                  localized: true,
                  defaultValue:
                    "Simal Technologies Middle East LLC maintains legal partner and VAD agreements with world-leading technology manufacturers. We handle GCC regulatory clearings, local customs protocols, storage configuration, and deliver certified localized warranty schemes.",
                },
                {
                  name: "ctaLabel",
                  type: "text",
                  localized: true,
                  defaultValue: "View All Brands",
                },
                { name: "ctaLink", type: "text", defaultValue: "/brands" },
              ],
            },
            {
              name: "featuredBrands",
              type: "relationship",
              relationTo: "brands",
              hasMany: true,
              admin: {
                description: "Select brands to display. Drag to reorder.",
              },
            },
          ],
        },

        /* ─── Tab: Why Choose Us ─────────────────────────────────────── */
        {
          label: "Why Choose Us",
          description:
            "Trust & differentiators section: a hero banner (with a rotating seal) paired with a grid of feature cards.",
          fields: [
            {
              name: "whyChooseUsSection",
              type: "group",
              fields: [
                {
                  name: "badge",
                  type: "text",
                  localized: true,
                  defaultValue: "Why Simal",
                  admin: { description: "Eyebrow label on the banner." },
                },
                {
                  name: "headline",
                  type: "text",
                  localized: true,
                  defaultValue: "Enterprise IT, Delivered with Certainty",
                },
                {
                  name: "accent",
                  type: "text",
                  localized: true,
                  defaultValue: "That Sets Us Apart",
                  admin: {
                    description: "Gradient accent line below the headline.",
                  },
                },
                {
                  name: "body",
                  type: "textarea",
                  localized: true,
                  defaultValue:
                    "For 20+ years, Simal Technologies Middle East has bridged premium global IT vendors and Gulf enterprise networks — combining authorized distribution, Dubai-lab validation, and GCC regulatory expertise under one roof.",
                },
                {
                  name: "bannerImage",
                  type: "upload",
                  relationTo: "media",
                  admin: {
                    description:
                      "Optional. If omitted, a brand gradient is used as the banner background.",
                  },
                },
                {
                  name: "bannerBadge",
                  type: "group",
                  label: "Rotating Seal",
                  admin: {
                    description:
                      'The circular badge overlaid on the banner (e.g. "20+ Years").',
                  },
                  fields: [
                    {
                      name: "title",
                      type: "text",
                      localized: true,
                      defaultValue: "20+",
                    },
                    {
                      name: "subtitle",
                      type: "text",
                      localized: true,
                      defaultValue: "Years Trusted",
                    },
                  ],
                },
                {
                  name: "bannerStats",
                  type: "array",
                  label: "Banner Mini-Stats",
                  admin: {
                    description:
                      "Small stat figures shown along the foot of the banner.",
                    initCollapsed: true,
                  },
                  fields: [
                    { name: "value", type: "text", required: true },
                    {
                      name: "label",
                      type: "text",
                      localized: true,
                      required: true,
                    },
                  ],
                },
                {
                  name: "features",
                  type: "array",
                  label: "Feature Cards",
                  admin: {
                    description:
                      "Cards shown in the grid beside the banner. Add 4–6 for the best layout.",
                  },
                  fields: [
                    {
                      name: "icon",
                      type: "select",
                      options: [
                        { label: "Award", value: "Award" },
                        { label: "Shield Check", value: "ShieldCheck" },
                        { label: "Globe", value: "Globe" },
                        { label: "Truck", value: "Truck" },
                        { label: "Activity", value: "Activity" },
                        { label: "Badge Check", value: "BadgeCheck" },
                      ],
                      defaultValue: "Award",
                    },
                    {
                      name: "theme",
                      type: "select",
                      options: [
                        { label: "Blue", value: "blue" },
                        { label: "Teal", value: "teal" },
                        { label: "Rose", value: "rose" },
                        { label: "Amber", value: "amber" },
                        { label: "Indigo", value: "indigo" },
                        { label: "Emerald", value: "emerald" },
                      ],
                      defaultValue: "blue",
                      admin: { description: "Icon-square and chip color." },
                    },
                    {
                      name: "title",
                      type: "text",
                      localized: true,
                      required: true,
                    },
                    { name: "description", type: "textarea", localized: true },
                    {
                      name: "chips",
                      type: "array",
                      label: "Stat Chips",
                      admin: {
                        description:
                          'Short highlighted tags (e.g. "20+ Brands").',
                        initCollapsed: true,
                      },
                      fields: [
                        {
                          name: "label",
                          type: "text",
                          localized: true,
                          required: true,
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },

        /* ─── Tab: Trusted Partners ──────────────────────────────── */
        {
          label: "Trusted Partners",
          description:
            "Trusted partners section with helping-a-partner illustration.",
          fields: [
            {
              name: "trustedPartnersSection",
              type: "group",
              fields: [
                {
                  name: "badge",
                  type: "text",
                  localized: true,
                  defaultValue: "Trusted Partners",
                },
                {
                  name: "heading",
                  type: "text",
                  localized: true,
                  defaultValue: "Built on Trust, Delivered with Care",
                },
                {
                  name: "subtext",
                  type: "textarea",
                  localized: true,
                  defaultValue:
                    "We partner with 20+ world-class IT brands as their authorized distributor across the Middle East, Africa, and CIS regions. Every partnership is built on reliability, expertise, and a shared commitment to quality.",
                },
              ],
            },
          ],
        },

        /* ─── Tab: Our Clients ──────────────────────────────────── */
        {
          label: "Our Clients",
          description: "USLBD-style minimal client logo showcase with CTA.",
          fields: [
            {
              name: "ourClientsSection",
              type: "group",
              fields: [
                {
                  name: "badge",
                  type: "text",
                  localized: true,
                  defaultValue: "Our Clients",
                  admin: {
                    description:
                      "Section heading (shown as uppercase label above the subtext).",
                  },
                },
                {
                  name: "heading",
                  type: "text",
                  localized: true,
                  defaultValue:
                    "Partnering with industry leaders across diverse sectors",
                  admin: { description: "Subtext line below the heading." },
                },
                {
                  name: "subtext",
                  type: "textarea",
                  localized: true,
                  admin: { description: "Optional subtext below the heading." },
                },
                {
                  name: "ctaLabel",
                  type: "text",
                  localized: true,
                  defaultValue: "View Our Work",
                  admin: { description: "CTA button label." },
                },
                {
                  name: "ctaLink",
                  type: "text",
                  defaultValue: "/brands",
                  admin: { description: "CTA button link." },
                },
              ],
            },
            {
              name: "ourClientsBrands",
              type: "relationship",
              relationTo: "brands",
              hasMany: true,
              admin: {
                description:
                  "Select brands to display as client logos. Drag to reorder.",
              },
            },
          ],
        },

        /* ─── Tab: Services ──────────────────────────────────────── */
        {
          label: "Services",
          description: "IT Services cards section.",
          fields: [
            {
              name: "servicesSection",
              type: "group",
              fields: [
                {
                  name: "badge",
                  type: "text",
                  localized: true,
                  defaultValue: "Our Services",
                },
                {
                  name: "heading",
                  type: "text",
                  localized: true,
                  defaultValue: "End-to-End IT Services",
                },
                {
                  name: "subtext",
                  type: "textarea",
                  localized: true,
                  defaultValue:
                    "Beyond hardware distribution, we deliver professional IT services — from maintenance and security to AV solutions and data recovery.",
                },
              ],
            },
          ],
        },

        /* ─── Tab: Testimonials ─────────────────────────────────────── */
        {
          label: "Testimonials",
          description: "Customer testimonials carousel.",
          fields: [
            {
              name: "testimonialsSection",
              type: "group",
              fields: [
                {
                  name: "badge",
                  type: "text",
                  localized: true,
                  defaultValue: "Success Stories",
                },
                {
                  name: "heading",
                  type: "text",
                  localized: true,
                  defaultValue: "Trusted by Top GCC ICT Experts",
                },
                {
                  name: "ctaLabel",
                  type: "text",
                  localized: true,
                  defaultValue: "Read All Reviews",
                },
                { name: "ctaLink", type: "text", defaultValue: "/about" },
              ],
            },
            {
              name: "featuredTestimonials",
              type: "relationship",
              relationTo: "testimonials",
              hasMany: true,
              admin: {
                description: "Select testimonials to display. Drag to reorder.",
              },
            },
          ],
        },

        /* ─── Tab: Latest News ──────────────────────────────────────── */
        {
          label: "Latest News",
          description: "Blog and news section.",
          fields: [
            {
              name: "latestNewsSection",
              type: "group",
              fields: [
                {
                  name: "badge",
                  type: "text",
                  localized: true,
                  defaultValue: "Technical Insights & Press",
                },
                {
                  name: "heading",
                  type: "text",
                  localized: true,
                  defaultValue: "The Simal Engineering Blog",
                },
                {
                  name: "subtext",
                  type: "text",
                  localized: true,
                  defaultValue:
                    "Stay up-to-date with technical reviews from our systems engineers detailing architectural setups, local GCC spectrum clearances, and hardware integrations keys.",
                },
                {
                  name: "cardCtaLabel",
                  type: "text",
                  localized: true,
                  defaultValue: "Read more",
                },
                {
                  name: "bottomCtaLabel",
                  type: "text",
                  localized: true,
                  defaultValue: "Read Our Blog",
                },
                { name: "bottomCtaLink", type: "text", defaultValue: "/blog" },
                {
                  name: "categories",
                  type: "array",
                  label: "Blog Categories",
                  admin: {
                    description:
                      "Categories used to style blog cards. Each post gets the next category in order.",
                  },
                  fields: [
                    { name: "label", type: "text", required: true },
                    {
                      name: "color",
                      type: "text",
                      required: true,
                      admin: { description: 'Hex color — e.g. "#3A85C8"' },
                    },
                  ],
                },
              ],
            },
          ],
        },

        /* ─── Tab: Newsletter ───────────────────────────────────────── */
        {
          label: "Newsletter",
          description: "Newsletter subscription CTA section.",
          fields: [
            {
              name: "newsletterSection",
              type: "group",
              fields: [
                {
                  name: "badge",
                  type: "text",
                  localized: true,
                  defaultValue: "Newsletter",
                },
                {
                  name: "heading",
                  type: "text",
                  localized: true,
                  defaultValue:
                    "Get the Latest in IT Distribution & Tech Insights",
                },
                { name: "subtext", type: "textarea", localized: true },
                {
                  name: "emailPlaceholder",
                  type: "text",
                  localized: true,
                  defaultValue: "Email address *",
                },
                {
                  name: "namePlaceholder",
                  type: "text",
                  localized: true,
                  defaultValue: "Name (optional)",
                },
                {
                  name: "consentText",
                  type: "textarea",
                  localized: true,
                  admin: { description: "Checkbox consent label." },
                },
                {
                  name: "privacyLabel",
                  type: "text",
                  localized: true,
                  defaultValue: "Read our Privacy Policy",
                },
                {
                  name: "submitLabel",
                  type: "text",
                  localized: true,
                  defaultValue: "Subscribe",
                },
                {
                  name: "submittingLabel",
                  type: "text",
                  localized: true,
                  defaultValue: "Subscribing...",
                },
                {
                  name: "successTitle",
                  type: "text",
                  localized: true,
                  defaultValue: "Thank you for subscribing!",
                },
                {
                  name: "successMessage",
                  type: "text",
                  localized: true,
                  defaultValue:
                    "Please check your email to confirm your subscription.",
                },
                {
                  name: "errorText",
                  type: "text",
                  localized: true,
                  defaultValue: "Something went wrong. Please try again later.",
                },
                {
                  name: "footerText",
                  type: "text",
                  localized: true,
                  defaultValue: "No spam, unsubscribe anytime.",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
