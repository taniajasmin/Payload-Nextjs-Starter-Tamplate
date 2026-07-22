import type { CollectionConfig } from 'payload'
import { cmsContentAccess } from '../access/cmsAccess'

export const NewsItems: CollectionConfig = {
  slug: 'news-items',
  access: cmsContentAccess,
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'publishedAt', 'active', 'updatedAt'],
    group: 'Content Section',
  },
  fields: [
    { name: 'title', type: 'text', required: true, localized: true },
    { name: 'slug', type: 'text', required: true, unique: true, localized: true },
    { name: 'excerpt', type: 'textarea', localized: true },
    { name: 'content', type: 'richText', localized: true },
    { name: 'coverImage', type: 'upload', relationTo: 'media' },
    { name: 'publishedAt', type: 'date' },
    {
      name: 'active',
      type: 'checkbox',
      defaultValue: true,
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
