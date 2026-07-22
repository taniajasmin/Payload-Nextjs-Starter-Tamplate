import type { GlobalConfig } from 'payload'

/**
 * Authorized Brands page global (slug: `authorized-brands-page`).
 * Powers /hardware/authorized-brands.
 */
export const AuthorizedBrandsPage: GlobalConfig = {
  slug: 'authorized-brands-page',
  access: { read: () => true },
  admin: {
    group: 'Pages',
    description: 'Manage the Authorized Brands page content.',
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
              name: 'hero',
              type: 'group',
              fields: [
                { name: 'headline', type: 'text', localized: true },
                { name: 'subHeadline', type: 'textarea', localized: true },
              ],
            },
          ],
        },
        {
          label: 'Brands',
          fields: [
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
          label: 'CTA',
          fields: [
            {
              name: 'cta',
              type: 'group',
              fields: [
                { name: 'headline', type: 'text', localized: true },
                { name: 'description', type: 'textarea', localized: true },
              ],
            },
          ],
        },
      ],
    },
  ],
}
