import type { CollectionConfig } from 'payload'
import { cmsContentAccess } from '../access/cmsAccess'

export const Products: CollectionConfig = {
  slug: 'products',
  access: cmsContentAccess,
  versions: {
    drafts: true,
    maxPerDoc: 50,
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['mainImage', 'sku', 'name', 'updatedAt'],
    group: 'Products Section',
  },
  fields: [
    { name: 'sku', type: 'text', required: true, unique: true },
    { name: 'slug', type: 'text', required: true, unique: true },
    { name: 'name', type: 'text', required: true, localized: true },
    { name: 'description', type: 'textarea', localized: true },
    {
      name: 'brand',
      type: 'relationship',
      relationTo: 'brands',
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
    },
    { name: 'specs', type: 'json' },
    {
      // Primary/representative image — shown as a thumbnail in the admin list.
      // The full gallery lives in `images` below.
      name: 'mainImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Primary image shown in the product list. Mirrors the first gallery image.',
      },
    },
    {
      name: 'images',
      type: 'array',
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media' },
        { name: 'alt', type: 'text', localized: true },
      ],
    },
    {
      name: 'datasheet',
      type: 'upload',
      relationTo: 'media',
    },
    { name: 'moq', type: 'number', label: 'Minimum Order Quantity' },
    { name: 'comparisonEligible', type: 'checkbox', defaultValue: true },
    {
      name: 'detailedDescription',
      type: 'richText',
      localized: true,
    },
    {
      name: 'relatedProducts',
      type: 'relationship',
      relationTo: 'products',
      hasMany: true,
    },
    {
      name: 'features',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', localized: true },
        { name: 'description', type: 'textarea', localized: true },
      ],
    },
    { name: 'seoKeywords', type: 'textarea', localized: true },
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
