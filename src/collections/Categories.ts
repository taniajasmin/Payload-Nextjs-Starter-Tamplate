import type { CollectionConfig } from 'payload'
import { cmsContentAccess } from '../access/cmsAccess'

export const Categories: CollectionConfig = {
  slug: 'categories',
  access: cmsContentAccess,
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'parent', 'updatedAt'],
    group: 'Products Section',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
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
      relationTo: 'categories',
      filterOptions: ({ id }) => {
        return {
          id: {
            not_in: [id],
          },
        }
      },
    },
    {
      name: 'icon',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'iconName',
      type: 'select',
      options: [
        { label: 'CPU', value: 'Cpu' },
        { label: 'Cable', value: 'Cable' },
        { label: 'Monitor', value: 'Monitor' },
        { label: 'Gamepad', value: 'Gamepad2' },
        { label: 'Laptop', value: 'Laptop' },
        { label: 'Hard Drive', value: 'HardDrive' },
      ],
      admin: {
        description: 'Icon used in the category card.',
      },
    },
    {
      name: 'highlights',
      type: 'array',
      fields: [
        { name: 'text', type: 'text', localized: true },
      ],
      admin: {
        description: 'Feature highlights shown in the category card (e.g. "DDR4 & DDR5 RAM").',
        initCollapsed: true,
      },
    },
  ],
}
