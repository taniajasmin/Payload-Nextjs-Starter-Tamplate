import type { GlobalConfig } from 'payload'

export const ContactPage: GlobalConfig = {
  slug: 'contact-page',
  access: {
    read: () => true,
  },
  admin: {
    group: 'Pages',
    description: 'Manage the Contact Us page content — hero, office info, and contact form.',
    livePreview: {
      url: 'http://localhost:3000',
    },
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
                description: 'Background image behind the hero (optional — falls back to default when empty).',
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
          label: 'Office Info',
          fields: [
            {
              name: 'office',
              type: 'group',
              fields: [
                { name: 'title', type: 'text', localized: true },
                { name: 'country', type: 'text', localized: true },
                { name: 'addressLabel', type: 'text', localized: true },
                { name: 'address', type: 'textarea', localized: true },
                { name: 'hoursLabel', type: 'text', localized: true },
                { name: 'hours', type: 'textarea', localized: true },
                { name: 'contactLabel', type: 'text', localized: true },
                { name: 'phone', type: 'text' },
                { name: 'email', type: 'email' },
              ],
            },
            {
              name: 'mapEmbedUrl',
              type: 'text',
              admin: {
                description: 'Google Maps embed iframe src URL for the office location.',
              },
            },
          ],
        },
        {
          label: 'Contact Form',
          fields: [
            {
              name: 'formSection',
              type: 'group',
              fields: [
                { name: 'title', type: 'text', localized: true },
                { name: 'subtitle', type: 'textarea', localized: true },
              ],
            },
          ],
        },
      ],
    },
  ],
}
