import type { CollectionConfig } from 'payload'
import { cmsContentAccess } from '../access/cmsAccess'

export const OfficeLocations: CollectionConfig = {
  slug: 'office-locations',
  access: cmsContentAccess,
  admin: {
    useAsTitle: 'city',
    defaultColumns: ['city', 'country', 'isHeadquarters', 'updatedAt'],
    group: 'Content Section',
  },
  fields: [
    { name: 'city', type: 'text', required: true, localized: true },
    { name: 'country', type: 'text', required: true, localized: true },
    { name: 'address', type: 'textarea', localized: true },
    { name: 'phone', type: 'text' },
    { name: 'email', type: 'email' },
    { name: 'mapUrl', type: 'text' },
    { name: 'isHeadquarters', type: 'checkbox', defaultValue: false },
    { name: 'active', type: 'checkbox', defaultValue: true },
  ],
}
