import type { GlobalConfig } from 'payload'

export const LaptopsPage: GlobalConfig = {
  slug: 'laptops-page',
  access: { read: () => true },
  admin: {
    group: 'Pages',
    description: 'Manage the Laptops page content.',
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
                description: 'Background image behind the hero (optional — falls back to the default image when empty).',
              },
            },
            {
              name: 'hero',
              type: 'group',
              fields: [
                { name: 'headline', type: 'text', localized: true },
                { name: 'description', type: 'textarea', localized: true },
              ],
            },
          ],
        },
        {
          label: 'Related Links',
          fields: [
            {
              name: 'relatedLinks',
              type: 'textarea',
              localized: true,
              admin: {
                description: 'HTML for the related categories links at the bottom of the page.',
              },
            },
          ],
        },
      ],
    },
  ],
}
