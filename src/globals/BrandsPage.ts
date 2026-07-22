import type { GlobalConfig } from 'payload'

export const BrandsPage: GlobalConfig = {
  slug: 'brands-page',
  access: {
    read: () => true,
  },
  admin: {
    group: 'Pages',
    description:
      'Manage the Brands page content — hero, brand directory header, authorized features, categories header, partnerships, and CTA.',
    livePreview: {
      url: 'http://localhost:3000',
    },
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        /* ──────────────────────────────────────────────────────────────
           Hero
           ────────────────────────────────────────────────────────────── */
        {
          label: 'Hero',
          fields: [
            {
              name: 'hero',
              type: 'group',
              fields: [
                { name: 'headline', type: 'text', localized: true },
                {
                  name: 'headingSize',
                  type: 'select',
                  label: 'Heading Size',
                  defaultValue: 'text-2xl',
                  admin: {
                    description: 'Controls the hero heading text size.',
                  },
                  options: [
                    { label: 'Small (text-xl)', value: 'text-xl' },
                    { label: 'Medium (text-2xl)', value: 'text-2xl' },
                    { label: 'Large (text-3xl)', value: 'text-3xl' },
                    { label: 'Extra Large (text-4xl)', value: 'text-4xl' },
                    { label: 'Huge (text-5xl)', value: 'text-5xl' },
                  ],
                },
                { name: 'description', type: 'textarea', localized: true },
                {
                  name: 'descriptionSize',
                  type: 'select',
                  label: 'Description Size',
                  defaultValue: 'text-lg',
                  admin: {
                    description: 'Controls the hero description text size.',
                  },
                  options: [
                    { label: 'Base', value: 'text-base' },
                    { label: 'Large', value: 'text-lg' },
                    { label: 'Extra Large', value: 'text-xl' },
                    { label: '2XL', value: 'text-2xl' },
                  ],
                },
                {
                  name: 'primaryButtonLabel',
                  type: 'text',
                  localized: true,
                  label: 'Primary Button Label',
                },
                { name: 'primaryButtonHref', type: 'text', label: 'Primary Button Link' },
                {
                  name: 'primaryButtonColor',
                  type: 'select',
                  label: 'Primary Button Color',
                  defaultValue: 'default',
                  admin: {
                    description: 'Choose the primary button color preset.',
                  },
                  options: [
                    { label: 'Default (Theme Primary)', value: 'default' },
                    { label: 'Pink Gradient', value: 'pink-gradient' },
                    { label: 'Blue Gradient', value: 'blue-gradient' },
                    { label: 'Teal Gradient', value: 'teal-gradient' },
                    { label: 'Dark Gradient', value: 'dark-gradient' },
                    { label: 'Solid White', value: 'solid-white' },
                  ],
                },
                {
                  name: 'secondaryButtonLabel',
                  type: 'text',
                  localized: true,
                  label: 'Secondary Button Label',
                },
                {
                  name: 'secondaryButtonHref',
                  type: 'text',
                  label: 'Secondary Button Link',
                },
                {
                  name: 'secondaryButtonStyle',
                  type: 'select',
                  label: 'Secondary Button Style',
                  defaultValue: 'outline-light',
                  admin: {
                    description: 'Choose the secondary button style preset.',
                  },
                  options: [
                    { label: 'Outline Light', value: 'outline-light' },
                    { label: 'Outline Dark Glass', value: 'outline-dark' },
                  ],
                },
              ],
            },
          ],
        },

        /* ──────────────────────────────────────────────────────────────
           Brand Directory
           ────────────────────────────────────────────────────────────── */
        {
          label: 'Brand Directory',
          fields: [
            {
              name: 'brandDirectory',
              type: 'group',
              fields: [
                { name: 'badge', type: 'text', localized: true },
                { name: 'heading', type: 'text', localized: true },
                { name: 'description', type: 'textarea', localized: true },
              ],
            },
          ],
        },

        /* ──────────────────────────────────────────────────────────────
           What Authorized Means
           ────────────────────────────────────────────────────────────── */
        {
          label: 'What Authorized Means',
          fields: [
            {
              name: 'authorizedSection',
              type: 'group',
              label: 'Section Header',
              fields: [
                { name: 'badge', type: 'text', localized: true },
                { name: 'heading', type: 'text', localized: true },
                { name: 'description', type: 'textarea', localized: true },
              ],
            },
            {
              name: 'authorizedFeatures',
              type: 'array',
              label: 'Features',
              admin: {
                initCollapsed: true,
              },
              fields: [
                {
                  name: 'iconType',
                  type: 'select',
                  defaultValue: 'shield-check',
                  options: [
                    { label: 'Shield Check (Genuine Products)', value: 'shield-check' },
                    { label: 'Award (Warranty)', value: 'award' },
                    { label: 'Headphones (Technical Support)', value: 'headphones' },
                    { label: 'Zap (Firmware & Updates)', value: 'zap' },
                    { label: 'Shopping Cart (B2B Pricing)', value: 'shopping-cart' },
                    { label: 'Building (After-Sales Service)', value: 'building-2' },
                  ],
                },
                { name: 'title', type: 'text', localized: true, required: true },
                { name: 'desc', type: 'textarea', localized: true },
                {
                  name: 'gradientColor',
                  type: 'select',
                  defaultValue: 'blue-to-cyan',
                  options: [
                    { label: 'Blue → Cyan', value: 'blue-to-cyan' },
                    { label: 'Pink → Light Pink', value: 'pink-to-light' },
                    { label: 'Cyan → Blue', value: 'cyan-to-blue' },
                    { label: 'Light Pink → Pink', value: 'light-to-pink' },
                    { label: 'Tan → Cyan', value: 'tan-to-cyan' },
                    { label: 'Blue → Pink', value: 'blue-to-pink' },
                  ],
                },
              ],
            },
          ],
        },

        /* ──────────────────────────────────────────────────────────────
           Brand Categories
           ────────────────────────────────────────────────────────────── */
        {
          label: 'Brand Categories',
          fields: [
            {
              name: 'categoriesSection',
              type: 'group',
              fields: [
                { name: 'badge', type: 'text', localized: true },
                { name: 'heading', type: 'text', localized: true },
                { name: 'description', type: 'textarea', localized: true },
              ],
            },
          ],
        },

        /* ──────────────────────────────────────────────────────────────
           Strategic Partnerships
           ────────────────────────────────────────────────────────────── */
        {
          label: 'Strategic Partnerships',
          fields: [
            {
              name: 'partnershipsSection',
              type: 'group',
              label: 'Section Header',
              fields: [
                { name: 'badge', type: 'text', localized: true },
                { name: 'heading', type: 'text', localized: true },
                { name: 'description', type: 'textarea', localized: true },
              ],
            },
            {
              name: 'awards',
              type: 'array',
              label: 'Awards',
              admin: {
                initCollapsed: true,
              },
              fields: [
                { name: 'title', type: 'text', localized: true, required: true },
                { name: 'subtitle', type: 'text', localized: true },
                { name: 'desc', type: 'textarea', localized: true },
              ],
            },
          ],
        },

        /* ──────────────────────────────────────────────────────────────
           CTA
           ────────────────────────────────────────────────────────────── */
        {
          label: 'CTA',
          fields: [
            {
              name: 'cta',
              type: 'group',
              fields: [
                { name: 'badge', type: 'text', localized: true },
                { name: 'heading', type: 'text', localized: true },
                {
                  name: 'headingSize',
                  type: 'select',
                  label: 'Heading Size',
                  defaultValue: 'text-3xl',
                  admin: {
                    description: 'Controls the CTA heading text size.',
                  },
                  options: [
                    { label: 'Small (text-xl)', value: 'text-xl' },
                    { label: 'Medium (text-2xl)', value: 'text-2xl' },
                    { label: 'Large (text-3xl)', value: 'text-3xl' },
                    { label: 'Extra Large (text-4xl)', value: 'text-4xl' },
                    { label: 'Huge (text-5xl)', value: 'text-5xl' },
                  ],
                },
                { name: 'description', type: 'textarea', localized: true },
                {
                  name: 'descriptionSize',
                  type: 'select',
                  label: 'Description Size',
                  defaultValue: 'text-lg',
                  admin: {
                    description: 'Controls the CTA description text size.',
                  },
                  options: [
                    { label: 'Base', value: 'text-base' },
                    { label: 'Large', value: 'text-lg' },
                    { label: 'Extra Large', value: 'text-xl' },
                    { label: '2XL', value: 'text-2xl' },
                  ],
                },
                {
                  name: 'primaryButtonLabel',
                  type: 'text',
                  localized: true,
                  label: 'Primary Button Label',
                },
                { name: 'primaryButtonHref', type: 'text', label: 'Primary Button Link' },
                {
                  name: 'primaryButtonColor',
                  type: 'select',
                  label: 'Primary Button Color',
                  defaultValue: 'pink-gradient',
                  admin: {
                    description: 'Choose the primary button color preset.',
                  },
                  options: [
                    { label: 'Default (Theme Primary)', value: 'default' },
                    { label: 'Pink Gradient', value: 'pink-gradient' },
                    { label: 'Blue Gradient', value: 'blue-gradient' },
                    { label: 'Teal Gradient', value: 'teal-gradient' },
                    { label: 'Dark Gradient', value: 'dark-gradient' },
                    { label: 'Solid White', value: 'solid-white' },
                  ],
                },
                {
                  name: 'secondaryButtonLabel',
                  type: 'text',
                  localized: true,
                  label: 'Secondary Button Label',
                },
                {
                  name: 'secondaryButtonHref',
                  type: 'text',
                  label: 'Secondary Button Link',
                },
                {
                  name: 'secondaryButtonStyle',
                  type: 'select',
                  label: 'Secondary Button Style',
                  defaultValue: 'outline-dark',
                  admin: {
                    description: 'Choose the secondary button style preset.',
                  },
                  options: [
                    { label: 'Outline Light', value: 'outline-light' },
                    { label: 'Outline Dark Glass', value: 'outline-dark' },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
