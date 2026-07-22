import type { CollectionConfig } from 'payload'
import { cmsContentAccess } from '../access/cmsAccess'

const ICON_OPTIONS = [
  { label: 'CheckCircle', value: 'CheckCircle' },
  { label: 'Star', value: 'Star' },
  { label: 'DollarSign', value: 'DollarSign' },
  { label: 'Rocket', value: 'Rocket' },
  { label: 'Headphones', value: 'Headphones' },
  { label: 'Shield', value: 'Shield' },
  { label: 'Zap', value: 'Zap' },
  { label: 'TrendingUp', value: 'TrendingUp' },
  { label: 'Clock', value: 'Clock' },
  { label: 'Target', value: 'Target' },
  { label: 'Award', value: 'Award' },
  { label: 'HeartHandshake', value: 'HeartHandshake' },
  { label: 'BadgeCheck', value: 'BadgeCheck' },
  { label: 'MapPin', value: 'MapPin' },
  { label: 'Lock', value: 'Lock' },
  { label: 'Mail', value: 'Mail' },
  { label: 'BarChart3', value: 'BarChart3' },
  { label: 'Calculator', value: 'Calculator' },
  { label: 'Users', value: 'Users' },
  { label: 'Package', value: 'Package' },
  { label: 'Factory', value: 'Factory' },
  { label: 'Clipboard', value: 'Clipboard' },
  { label: 'Globe', value: 'Globe' },
  { label: 'Server', value: 'Server' },
  { label: 'Database', value: 'Database' },
  { label: 'Cloud', value: 'Cloud' },
  { label: 'Code', value: 'Code' },
  { label: 'Search', value: 'Search' },
  { label: 'Settings', value: 'Settings' },
  { label: 'GraduationCap', value: 'GraduationCap' },
  { label: 'Flask', value: 'Flask' },
  { label: 'Smartphone', value: 'Smartphone' },
  { label: 'Building', value: 'Building' },
  { label: 'Store', value: 'Store' },
  { label: 'Truck', value: 'Truck' },
  { label: 'Leaf', value: 'Leaf' },
  { label: 'HeartPulse', value: 'HeartPulse' },
  { label: 'Building2', value: 'Building2' },
  { label: 'Landmark', value: 'Landmark' },
  { label: 'Cpu', value: 'Cpu' },
]

export const Pages: CollectionConfig = {
  slug: 'pages',
  access: cmsContentAccess,
  versions: {
    drafts: true,
    maxPerDoc: 50,
  },
  admin: {
    defaultColumns: ['title', 'slug', 'parent', 'status', 'updatedAt'],
    useAsTitle: 'title',
    group: 'Content Section',
    livePreview: {
      url: async ({ data, locale, req }) => {
        const slug = (data as Record<string, unknown>)?.slug as string | undefined
        const base = 'http://localhost:3000'
        const localeCode = (locale as unknown as { code?: string })?.code ?? 'en'

        if (!slug) return base

        // Build nested URL based on parent-child hierarchy
        const parentId = (data as Record<string, unknown>)?.parent as
          | number
          | string
          | undefined
        let parentSlug = ''

        if (parentId) {
          try {
            const parent = await req.payload.findByID({
              collection: 'pages',
              id: parentId,
            })
            parentSlug = parent?.slug || ''
          } catch {
            // Parent not found or no access — fall back to top-level URL
          }
        }

        if (parentSlug) {
          return `${base}/${localeCode}/${parentSlug}/${slug}?preview=true`
        }

        return `${base}/${localeCode}/${slug}?preview=true`
      },
    },
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
      localized: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'hero',
      type: 'group',
      fields: [
        {
          name: 'headline',
          type: 'text',
          localized: true,
        },
        {
          name: 'subHeadline',
          type: 'textarea',
          localized: true,
        },
        {
          name: 'backgroundImage',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'ctaLabel',
          type: 'text',
          localized: true,
        },
        {
          name: 'ctaLink',
          type: 'text',
        },
      ],
    },
    {
      name: 'content',
      type: 'richText',
      localized: true,
    },
    {
      name: 'layout',
      type: 'blocks',
      localized: true,
      admin: {
        description: 'Dynamic content blocks for this page. Use these to build structured sections.',
      },
      blocks: [
        {
          slug: 'heroBlock',
          labels: { singular: 'Hero', plural: 'Hero Sections' },
          fields: [
            {
              name: 'backgroundImage',
              type: 'upload',
              relationTo: 'media',
              admin: { description: 'Full-width background image for the hero.' },
            },
            {
              name: 'headline',
              type: 'text',
              localized: true,
            },
            {
              name: 'subHeadline',
              type: 'textarea',
              localized: true,
            },
            {
              name: 'ctaLabel',
              type: 'text',
              localized: true,
            },
            {
              name: 'ctaLink',
              type: 'text',
            },
          ],
        },
        {
          slug: 'richTextBlock',
          labels: { singular: 'Rich Text', plural: 'Rich Text Sections' },
          fields: [
            {
              name: 'heading',
              type: 'text',
              localized: true,
            },
            {
              name: 'content',
              type: 'richText',
              localized: true,
            },
          ],
        },
        {
          slug: 'featureCardsBlock',
          labels: { singular: 'Feature Cards', plural: 'Feature Cards' },
          fields: [
            {
              name: 'heading',
              type: 'text',
              localized: true,
            },
            {
              name: 'cards',
              type: 'array',
              fields: [
                {
                  name: 'icon',
                  type: 'select',
                  options: ICON_OPTIONS,
                },
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                  localized: true,
                },
                {
                  name: 'description',
                  type: 'textarea',
                  localized: true,
                },
              ],
            },
          ],
        },
        {
          slug: 'highlightBlock',
          labels: { singular: 'Highlight', plural: 'Highlight Sections' },
          fields: [
            {
              name: 'heading',
              type: 'text',
              localized: true,
            },
            {
              name: 'description',
              type: 'richText',
              localized: true,
            },
            {
              name: 'highlights',
              type: 'array',
              fields: [
                {
                  name: 'icon',
                  type: 'select',
                  options: ICON_OPTIONS,
                },
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                  localized: true,
                },
                {
                  name: 'description',
                  type: 'textarea',
                  localized: true,
                },
              ],
            },
          ],
        },
        {
          slug: 'ctaBlock',
          labels: { singular: 'CTA', plural: 'CTA Sections' },
          fields: [
            {
              name: 'heading',
              type: 'text',
              localized: true,
            },
            {
              name: 'description',
              type: 'textarea',
              localized: true,
            },
            {
              name: 'phoneLabel',
              type: 'text',
              localized: true,
            },
            {
              name: 'phoneNumber',
              type: 'text',
            },
            {
              name: 'emailLabel',
              type: 'text',
              localized: true,
            },
            {
              name: 'emailAddress',
              type: 'text',
            },
            {
              name: 'demoLinkLabel',
              type: 'text',
              localized: true,
            },
            {
              name: 'demoLinkUrl',
              type: 'text',
            },
          ],
        },
        {
          slug: 'imageGalleryBlock',
          labels: { singular: 'Image Gallery', plural: 'Image Galleries' },
          fields: [
            {
              name: 'heading',
              type: 'text',
              localized: true,
            },
            {
              name: 'images',
              type: 'array',
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                },
                {
                  name: 'caption',
                  type: 'text',
                  localized: true,
                },
              ],
            },
          ],
        },
        {
          slug: 'statsCounterBlock',
          labels: { singular: 'Stats Counter', plural: 'Stats Counters' },
          fields: [
            {
              name: 'heading',
              type: 'text',
              localized: true,
            },
            {
              name: 'stats',
              type: 'array',
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  required: true,
                  localized: true,
                },
                {
                  name: 'value',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'prefix',
                  type: 'text',
                },
                {
                  name: 'suffix',
                  type: 'text',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'meta',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          localized: true,
        },
        {
          name: 'description',
          type: 'textarea',
          localized: true,
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
        position: 'sidebar',
      },
    },
    {
      name: 'parent',
      type: 'relationship',
      relationTo: 'pages',
      filterOptions: ({ id }) => {
        if (!id) return true
        return {
          id: {
            not_equals: id,
          },
        }
      },
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'draft',
      options: [
        {
          label: 'Draft',
          value: 'draft',
        },
        {
          label: 'Published',
          value: 'published',
        },
        {
          label: 'Archived',
          value: 'archived',
        },
      ],
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
