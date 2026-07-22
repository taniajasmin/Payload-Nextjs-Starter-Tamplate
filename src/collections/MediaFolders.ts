import type { CollectionConfig } from 'payload'
import { adminOnlyAccess } from '../access/cmsAccess'

export const MediaFolders: CollectionConfig = {
  slug: 'media-folders',
  access: adminOnlyAccess,
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'parent', 'active'],
    group: 'Media Section',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'parent',
      type: 'relationship',
      relationTo: 'media-folders',
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'sortOrder',
      type: 'number',
      defaultValue: 0,
    },
    {
      name: 'active',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
}
