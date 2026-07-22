import type { CollectionConfig } from 'payload'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  labels: {
    singular: 'Testimonial',
    plural: 'Testimonials',
  },
  access: {
    read: () => true,
  },
  admin: {
    group: 'Content',
    defaultColumns: ['authorName', 'authorTitle', 'authorCompany', 'rating', 'active'],
    description: 'Customer testimonials displayed on the homepage carousel.',
  },
  fields: [
    {
      name: 'authorName',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'authorTitle',
      type: 'text',
      localized: true,
    },
    {
      name: 'authorCompany',
      type: 'text',
      localized: true,
    },
    {
      name: 'quote',
      type: 'textarea',
      required: true,
      localized: true,
      admin: {
        description: 'The testimonial quote text.',
      },
    },
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'rating',
      type: 'number',
      min: 0,
      max: 5,
      defaultValue: 5,
      admin: {
        description: 'Star rating from 0 to 5 (decimals allowed for half-stars).',
        step: 0.5,
      },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: {
        step: 1,
      },
    },
    {
      name: 'active',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
}
