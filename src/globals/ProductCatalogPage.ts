import type { GlobalConfig } from 'payload'

export const ProductCatalogPage: GlobalConfig = {
  slug: 'product-catalog-page',
  access: { read: () => true },
  admin: {
    group: 'Pages',
    description: 'Manage the Product Catalog page hero, gallery, and CTA content.',
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
                {
                  name: 'backgroundImage',
                  type: 'upload',
                  relationTo: 'media',
                },
              ],
            },
          ],
        },
        {
          label: 'Gallery',
          fields: [
            {
              name: 'gallerySection',
              type: 'group',
              fields: [
                { name: 'headline', type: 'text', localized: true },
                { name: 'description', type: 'textarea', localized: true },
                {
                  name: 'images',
                  type: 'array',
                  minRows: 1,
                  maxRows: 12,
                  fields: [
                    { name: 'image', type: 'upload', relationTo: 'media', required: true },
                    { name: 'caption', type: 'text', localized: true },
                  ],
                },
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
