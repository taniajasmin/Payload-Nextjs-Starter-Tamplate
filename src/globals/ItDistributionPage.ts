import type { GlobalConfig } from 'payload'

/**
 * IT Distribution hub page global (slug: `it-dp`).
 * Powers /it-distribution. Referenced by src/app/(frontend)/[locale]/hardware/page.tsx.
 */
export const ItDistributionPage: GlobalConfig = {
  slug: 'it-dp',
  access: { read: () => true },
  admin: {
    group: 'Pages',
    description: 'Manage the IT Distribution hub page content.',
    livePreview: { url: 'http://localhost:3000' },
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Hero',
          fields: [
            {
              name: 'heroBackgroundImage',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Background image behind the hero (optional).',
              },
            },
            {
              name: 'hero',
              type: 'group',
              fields: [
                { name: 'headline', type: 'text', localized: true },
                { name: 'subHeadline', type: 'textarea', localized: true },
                { name: 'primaryCtaLabel', type: 'text', localized: true },
                { name: 'primaryCtaLink', type: 'text' },
                { name: 'secondaryCtaLabel', type: 'text', localized: true },
                { name: 'secondaryCtaLink', type: 'text' },
              ],
            },
          ],
        },
        {
          label: 'Authorized Brands',
          fields: [
            { name: 'authorizedBrandsTitle', type: 'text', localized: true },
            { name: 'authorizedBrandsDescription', type: 'textarea', localized: true },
            {
              name: 'authorizedBrands',
              type: 'array',
              fields: [
                { name: 'category', type: 'text', localized: true },
                { name: 'brands', type: 'text', localized: true },
              ],
            },
          ],
        },
        {
          label: 'Product Categories',
          fields: [
            { name: 'productCategoriesTitle', type: 'text', localized: true },
            { name: 'productCategoriesDescription', type: 'textarea', localized: true },
            {
              name: 'productCategories',
              type: 'array',
              fields: [
                { name: 'category', type: 'text', localized: true },
                { name: 'count', type: 'number' },
                { name: 'subCategories', type: 'text', localized: true },
              ],
            },
          ],
        },
        {
          label: 'Coverage & Advantages',
          fields: [
            {
              name: 'geographicCoverage',
              type: 'array',
              fields: [
                { name: 'region', type: 'text' },
                { name: 'coverage', type: 'text', localized: true },
              ],
            },
            {
              name: 'channelAdvantages',
              type: 'group',
              fields: [
                { name: 'siVarTitle', type: 'text', localized: true },
                {
                  name: 'siVarAdvantages',
                  type: 'array',
                  fields: [{ name: 'item', type: 'text', localized: true }],
                },
                { name: 'corporateGovTitle', type: 'text', localized: true },
                {
                  name: 'corporateGovAdvantages',
                  type: 'array',
                  fields: [{ name: 'item', type: 'text', localized: true }],
                },
                { name: 'ecommerceRetailTitle', type: 'text', localized: true },
                {
                  name: 'ecommerceRetailAdvantages',
                  type: 'array',
                  fields: [{ name: 'item', type: 'text', localized: true }],
                },
              ],
            },
          ],
        },
        {
          label: 'Industries',
          fields: [
            { name: 'industriesTitle', type: 'text', localized: true },
            {
              name: 'industries',
              type: 'array',
              fields: [
                { name: 'industry', type: 'text', localized: true },
                { name: 'requirements', type: 'text', localized: true },
              ],
            },
          ],
        },
        {
          label: 'Infrastructure',
          fields: [
            {
              name: 'infrastructure',
              type: 'group',
              fields: [
                { name: 'warehouseTitle', type: 'text', localized: true },
                { name: 'warehouseDescription', type: 'textarea', localized: true },
                {
                  name: 'warehouseFeatures',
                  type: 'array',
                  fields: [{ name: 'item', type: 'text', localized: true }],
                },
                { name: 'retailTitle', type: 'text', localized: true },
                { name: 'retailDescription', type: 'textarea', localized: true },
                {
                  name: 'retailFeatures',
                  type: 'array',
                  fields: [{ name: 'item', type: 'text', localized: true }],
                },
              ],
            },
          ],
        },
        {
          label: 'Get Started',
          fields: [
            { name: 'getStartedTitle', type: 'text', localized: true },
            {
              name: 'getStartedItems',
              type: 'array',
              fields: [
                { name: 'title', type: 'text', localized: true },
                { name: 'description', type: 'text', localized: true },
                { name: 'ctaLabel', type: 'text', localized: true },
                { name: 'ctaLink', type: 'text' },
              ],
            },
          ],
        },
        {
          label: 'CTA',
          fields: [
            {
              name: 'cta',
              type: 'group',
              fields: [
                { name: 'headline', type: 'text', localized: true },
                { name: 'description', type: 'textarea', localized: true },
                { name: 'primaryCtaLabel', type: 'text', localized: true },
                { name: 'primaryCtaLink', type: 'text' },
                { name: 'secondaryCtaLabel', type: 'text', localized: true },
                { name: 'secondaryCtaLink', type: 'text' },
              ],
            },
          ],
        },
      ],
    },
  ],
}
