import type { CollectionConfig } from 'payload'

export const Awards: CollectionConfig = {
  slug: 'awards',
  labels: {
    singular: 'Award',
    plural: 'Awards',
  },
  access: {
    read: () => true,
  },
  admin: {
    group: 'Content',
    defaultColumns: ['title', 'year', 'issuer', 'order', 'active'],
    description: 'Awards and recognitions displayed on the homepage and awards page.',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'year',
      type: 'text',
      admin: {
        description: 'Award year — e.g. "2025", "Multi-Year"',
      },
    },
    {
      name: 'issuer',
      type: 'text',
      localized: true,
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
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
