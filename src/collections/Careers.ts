import type { CollectionConfig } from 'payload'
import { cmsContentAccess } from '../access/cmsAccess'

export const Careers: CollectionConfig = {
  slug: 'careers',
  access: cmsContentAccess,
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'department', 'location', 'type', 'status', 'updatedAt'],
    group: 'Careers Section',
  },
  fields: [
    { name: 'title', type: 'text', required: true, localized: true },
    { name: 'slug', type: 'text', required: true, unique: true },
    { name: 'department', type: 'text', localized: true },
    { name: 'location', type: 'text', localized: true },
    {
      name: 'type',
      type: 'select',
      options: [
        { label: 'Full-time', value: 'full-time' },
        { label: 'Part-time', value: 'part-time' },
        { label: 'Contract', value: 'contract' },
      ],
    },
    { name: 'description', type: 'richText', localized: true },
    { name: 'requirements', type: 'richText', localized: true },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'open',
      options: [
        { label: 'Open', value: 'open' },
        { label: 'Closed', value: 'closed' },
      ],
    },
    {
      name: 'meta',
      type: 'group',
      fields: [
        { name: 'title', type: 'text', localized: true },
        { name: 'description', type: 'textarea', localized: true },
      ],
    },
  ],
}
