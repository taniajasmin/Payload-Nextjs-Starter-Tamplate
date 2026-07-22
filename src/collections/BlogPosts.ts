import type { CollectionConfig } from 'payload'
import { cmsContentAccess } from '../access/cmsAccess'

export const BlogPosts: CollectionConfig = {
  slug: 'blog-posts',
  access: cmsContentAccess,
  versions: {
    drafts: true,
    maxPerDoc: 50,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'status', 'publishedAt', 'updatedAt'],
    group: 'Content Section',
  },
  fields: [
    { name: 'title', type: 'text', required: true, localized: true },
    { name: 'slug', type: 'text', required: true, unique: true, localized: true },
    { name: 'excerpt', type: 'textarea', localized: true },
    { name: 'content', type: 'richText', localized: true },
    { name: 'coverImage', type: 'upload', relationTo: 'media' },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
    },
    { name: 'publishedAt', type: 'date' },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
        { label: 'Archived', value: 'archived' },
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
