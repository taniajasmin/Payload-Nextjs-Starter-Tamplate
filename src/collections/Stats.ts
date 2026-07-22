import type { CollectionConfig } from 'payload'

export const Stats: CollectionConfig = {
  slug: 'stats',
  labels: {
    singular: 'Stat',
    plural: 'Company Stats',
  },
  access: {
    read: () => true,
  },
  admin: {
    group: 'Content',
    defaultColumns: ['label', 'value', 'suffix', 'order', 'active'],
    description: 'Company statistics displayed on the homepage (e.g. "20+ Years", "76+ Products").',
  },
  fields: [
    {
      name: 'label',
      type: 'text',
      required: true,
      localized: true,
      admin: {
        description: 'Stat description — e.g. "Years of IT distribution experience (founded 2002)"',
      },
    },
    {
      name: 'value',
      type: 'text',
      required: true,
      admin: {
        description: 'Numeric value as a string — e.g. "20", "300", "1.97". Decimals are supported.',
      },
    },
    {
      name: 'suffix',
      type: 'text',
      admin: {
        description: 'Suffix after the value — e.g. "+", "M"',
      },
    },
    {
      name: 'prefix',
      type: 'text',
      admin: {
        description: 'Prefix before the value — e.g. "$"',
      },
    },
    {
      name: 'icon',
      type: 'select',
      options: [
        { label: 'Globe', value: 'globe' },
        { label: 'Users', value: 'users' },
        { label: 'Package', value: 'package' },
        { label: 'Server', value: 'server' },
        { label: 'Dollar', value: 'dollar' },
        { label: 'Trending Up', value: 'trending-up' },
        { label: 'Award', value: 'award' },
        { label: 'Map Pin', value: 'map-pin' },
      ],
      defaultValue: 'globe',
      admin: {
        description: 'Icon displayed above the stat counter.',
      },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: {
        description: 'Display order (lower = first).',
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
