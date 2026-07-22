import type { GlobalConfig } from 'payload'

/**
 * Hub content for /services. The list of service cards itself is derived
 * automatically from the `services` collection (published docs grouped by
 * `family`); this global only owns the hub hero, intro and CTA so editors
 * can reword the landing without touching code.
 *
 * Pattern mirrors MonitorsPage / ItDistributionPage globals.
 */
export const ServicesPage: GlobalConfig = {
  slug: 'services-page',
  access: { read: () => true },
  admin: {
    group: 'Pages',
    description: 'Manage the /services hub page hero, intro and CTA.',
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
          label: 'Intro',
          fields: [
            {
              name: 'intro',
              type: 'textarea',
              localized: true,
              admin: {
                description: 'Short paragraph under the hero. HTML allowed.',
              },
            },
          ],
        },
        {
          label: 'SEO',
          fields: [
            {
              name: 'meta',
              type: 'group',
              fields: [
                { name: 'title', type: 'text', localized: true },
                { name: 'description', type: 'textarea', localized: true },
                { name: 'image', type: 'upload', relationTo: 'media' },
              ],
            },
          ],
        },
      ],
    },
  ],
}
