import type { CollectionConfig, Field } from 'payload'
import { cmsContentAccess } from '../access/cmsAccess'

/**
 * Fields describing one "table" block (product tables, comparison tables,
 * selection guides, performance tiers, ideal deployments). Editors define the
 * columns first, then add rows with one cell per column (in column order).
 *
 * Returned by a factory so every consumer gets a fresh field tree (Payload
 * keys nested array tables off the parent path, so the same `name`s are safe
 * to reuse under different parents).
 */
function tableFields(): Field[] {
  return [
    { name: 'title', type: 'text' },
    { name: 'description', type: 'textarea' },
    {
      name: 'headers',
      type: 'array',
      labels: { singular: 'Column', plural: 'Columns' },
      admin: { description: 'Column headings, left to right.' },
      fields: [{ name: 'header', type: 'text', required: true }],
    },
    {
      name: 'rows',
      type: 'array',
      labels: { singular: 'Row', plural: 'Rows' },
      fields: [
        {
          name: 'cells',
          type: 'array',
          labels: { singular: 'Cell', plural: 'Cells' },
          admin: {
            description: 'One cell per column, in column order.',
          },
          fields: [
            {
              name: 'value',
              type: 'text',
              admin: {
                description:
                  'May include HTML (e.g. <a href="/products/...">link</a>).',
              },
            },
          ],
        },
      ],
    },
  ]
}

export const Brands: CollectionConfig = {
  slug: 'brands',
  access: cmsContentAccess,
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['logo', 'name', 'slug', 'category', 'updatedAt'],
    group: 'Products Section',
  },
  fields: [
    { name: 'name', type: 'text', required: true, localized: true },
    { name: 'slug', type: 'text', required: true, unique: true },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'logoSvg',
      type: 'upload',
      relationTo: 'media',
      label: 'Logo SVG',
    },
    {
      name: 'logoPng',
      type: 'upload',
      relationTo: 'media',
      label: 'Logo PNG (2x)',
    },
    { name: 'story', type: 'richText', localized: true },
    {
      name: 'certifications',
      type: 'array',
      fields: [
        { name: 'cert', type: 'text', localized: true },
        { name: 'file', type: 'upload', relationTo: 'media' },
      ],
    },
    {
      name: 'relatedProducts',
      type: 'relationship',
      relationTo: 'products',
      hasMany: true,
    },
    { name: 'tagline', type: 'text', localized: true },
    { name: 'heroSlogan', type: 'text', localized: true },
    { name: 'heroDescription', type: 'textarea', localized: true },

    // ── Why Choose / Key Technologies ──
    {
      name: 'keyTechnologies',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', localized: true },
        { name: 'description', type: 'textarea', localized: true },
      ],
    },

    // ── Tables (structured: columns + cells) ──
    {
      name: 'productTables',
      type: 'array',
      label: 'Product Tables',
      fields: tableFields(),
    },
    {
      name: 'comparisonTables',
      type: 'array',
      fields: tableFields(),
    },
    {
      name: 'selectionGuides',
      type: 'array',
      fields: tableFields(),
    },
    {
      name: 'performanceTiers',
      type: 'array',
      admin: { description: 'Only the first table is displayed.' },
      fields: tableFields(),
    },
    {
      name: 'idealDeployments',
      type: 'array',
      admin: { description: 'Only the first table is displayed.' },
      fields: tableFields(),
    },

    // ── Spec tables (label/value rows) ──
    {
      name: 'specTables',
      type: 'array',
      fields: [
        { name: 'title', type: 'text' },
        {
          name: 'rows',
          type: 'array',
          fields: [
            { name: 'label', type: 'text' },
            {
              name: 'value',
              type: 'text',
              admin: {
                description:
                  'May include HTML (e.g. <a href="/products/...">link</a>).',
              },
            },
          ],
        },
      ],
    },

    // ── Bullet sections (alternative to Key Technologies) ──
    {
      name: 'bulletSections',
      type: 'array',
      fields: [
        { name: 'title', type: 'text' },
        {
          name: 'items',
          type: 'array',
          fields: [
            { name: 'title', type: 'text' },
            { name: 'description', type: 'textarea' },
          ],
        },
      ],
    },

    // ── Timeline (brand history) ──
    {
      name: 'timeline',
      type: 'array',
      fields: [
        { name: 'year', type: 'text' },
        { name: 'event', type: 'textarea' },
      ],
    },

    // ── Authorized distributor block ──
    {
      name: 'authorizedDistributorTitle',
      type: 'text',
      admin: {
        description:
          "Defaults to 'Authorized Distributor — Simal Technologies' when empty.",
      },
    },
    {
      name: 'authorizedDistributorPoints',
      type: 'array',
      labels: { singular: 'Point', plural: 'Points' },
      fields: [
        {
          name: 'point',
          type: 'text',
          admin: {
            description: 'May include basic HTML.',
          },
        },
      ],
    },

    {
      name: 'orderingInfo',
      type: 'group',
      fields: [
        { name: 'whatsapp', type: 'text' },
        { name: 'email', type: 'text' },
        { name: 'extra', type: 'text', localized: true },
      ],
    },

    // ── Related links (structured) ──
    {
      name: 'relatedLinks',
      type: 'array',
      fields: [
        { name: 'label', type: 'text' },
        { name: 'href', type: 'text' },
      ],
    },
    {
      name: 'category',
      type: 'select',
      options: [
        { label: 'Computer Components', value: 'computer-components' },
        { label: 'Computer Accessories', value: 'computer-accessories' },
        { label: 'Monitors', value: 'monitors' },
        { label: 'Gaming', value: 'gaming' },
        { label: 'Laptops', value: 'laptops' },
        { label: 'Storage', value: 'storage' },
        { label: 'Audio Visual', value: 'audio-visual' },
        { label: 'Networking', value: 'networking' },
      ],
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'available',
      options: [
        { label: 'Available', value: 'available' },
        { label: 'Future', value: 'future' },
      ],
    },
    { name: 'statusNote', type: 'text', localized: true },
    { name: 'seoTitle', type: 'text', localized: true },
    { name: 'seoDescription', type: 'textarea', localized: true },
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
