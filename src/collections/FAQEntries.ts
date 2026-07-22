import type { CollectionConfig } from 'payload'
import { cmsContentAccess } from '../access/cmsAccess'

export const FAQEntries: CollectionConfig = {
  slug: 'faq-entries',
  access: cmsContentAccess,
  admin: {
    useAsTitle: 'question',
    defaultColumns: ['question', 'category', 'active', 'updatedAt'],
    group: 'Content Section',
  },
  fields: [
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Ordering & Pricing', value: 'orders' },
        { label: 'Shipping & Delivery', value: 'shipping' },
        { label: 'Products & Brands', value: 'products' },
        { label: 'Partnership & Reseller', value: 'partnerships' },
        { label: 'Technical Support', value: 'support' },
        { label: 'Company Information', value: 'general' },
        { label: 'Returns & Warranty', value: 'returns' },
      ],
    },
    { name: 'question', type: 'text', required: true, localized: true },
    { name: 'answer', type: 'richText', required: true, localized: true },
    {
      name: 'order',
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
