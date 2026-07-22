import type { CollectionConfig } from 'payload'
import { cmsContentAccess } from '../access/cmsAccess'

const INDUSTRY_ICON_OPTIONS = [
  { label: 'Store', value: 'Store' },
  { label: 'Factory', value: 'Factory' },
  { label: 'Heart Pulse', value: 'HeartPulse' },
  { label: 'Graduation Cap', value: 'GraduationCap' },
  { label: 'Landmark', value: 'Landmark' },
  { label: 'Building', value: 'Building2' },
  { label: 'Truck', value: 'Truck' },
  { label: 'Leaf', value: 'Leaf' },
  { label: 'Shield', value: 'Shield' },
  { label: 'CPU', value: 'Cpu' },
  { label: 'Database', value: 'Database' },
  { label: 'Bar Chart', value: 'BarChart3' },
  { label: 'Users', value: 'Users' },
  { label: 'Clipboard List', value: 'ClipboardList' },
  { label: 'Wallet', value: 'Wallet' },
  { label: 'Settings', value: 'Settings' },
  { label: 'Globe', value: 'Globe' },
  { label: 'Trending Up', value: 'TrendingUp' },
  { label: 'Lightbulb', value: 'Lightbulb' },
  { label: 'Package', value: 'Package' },
  { label: 'Wrench', value: 'Wrench' },
  { label: 'Sparkles', value: 'Sparkles' },
  { label: 'Check Circle', value: 'CheckCircle' },
  { label: 'Star', value: 'Star' },
  { label: 'Zap', value: 'Zap' },
  { label: 'Layout Grid', value: 'LayoutGrid' },
  { label: 'Lock', value: 'Lock' },
  { label: 'Network', value: 'Network' },
  { label: 'File Text', value: 'FileText' },
  { label: 'Book Open', value: 'BookOpen' },
  { label: 'Mail', value: 'Mail' },
  { label: 'Calculator', value: 'Calculator' },
]

export const ERPIndustries: CollectionConfig = {
  slug: 'erp-industries',
  access: cmsContentAccess,
  versions: {
    drafts: true,
    maxPerDoc: 50,
  },
  admin: {
    defaultColumns: ['title', 'slug', 'status', 'updatedAt'],
    useAsTitle: 'title',
    group: 'Content Section',
    livePreview: {
      url: async ({ data, locale }) => {
        const slug = (data as Record<string, unknown>)?.slug as string | undefined
        const base = 'http://localhost:3000'
        const localeCode = (locale as unknown as { code?: string })?.code ?? 'en'
        if (!slug) return base
        return `${base}/${localeCode}/erp/industries/${slug}?preview=true`
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
      admin: {
        position: 'sidebar',
        description: 'URL path segment, e.g. `healthcare`. Must be unique.',
      },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'tagline',
      type: 'textarea',
      localized: true,
      admin: {
        description: 'Short description shown on the listing/overview page.',
      },
    },
    {
      name: 'icon',
      type: 'select',
      options: INDUSTRY_ICON_OPTIONS,
      admin: {
        description: 'Icon shown on the listing card. Must match navigation-data.ts iconNameToComponent.',
      },
    },
    {
      name: 'iconColor',
      type: 'select',
      options: [
        { label: 'Blue', value: 'blue' },
        { label: 'Teal', value: 'teal' },
        { label: 'Pink', value: 'pink' },
        { label: 'Orange', value: 'orange' },
        { label: 'Gold', value: 'gold' },
        { label: 'Purple', value: 'purple' },
        { label: 'Emerald', value: 'emerald' },
        { label: 'Indigo', value: 'indigo' },
        { label: 'Rose', value: 'rose' },
      ],
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Hero',
          fields: [
            {
              name: 'heroBackgroundImage',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Background image behind the hero (optional).',
              },
            },
            {
              name: 'hero',
              type: 'group',
              fields: [
                { name: 'headline', type: 'text', localized: true },
                { name: 'subHeadline', type: 'textarea', localized: true },
                { name: 'ctaLabel', type: 'text', localized: true },
                { name: 'ctaLink', type: 'text' },
              ],
            },
          ],
        },
        {
          label: 'Overview & Challenges',
          fields: [
            {
              name: 'overviewDescription',
              type: 'richText',
              localized: true,
              admin: {
                description: 'Rich text overview of the industry solution.',
              },
            },
            {
              name: 'industryChallenges',
              type: 'array',
              labels: { singular: 'Challenge', plural: 'Challenges' },
              fields: [
                { name: 'challenge', type: 'text', localized: true, required: true },
                { name: 'solution', type: 'textarea', localized: true },
              ],
            },
          ],
        },
        {
          label: 'Sub-sectors',
          fields: [
            {
              name: 'subSectors',
              type: 'array',
              labels: { singular: 'Sub-sector', plural: 'Sub-sectors' },
              fields: [
                { name: 'name', type: 'text', localized: true, required: true },
                { name: 'institutionTypes', type: 'textarea', localized: true },
                {
                  name: 'painPoints',
                  type: 'array',
                  labels: { singular: 'Pain Point', plural: 'Pain Points' },
                  fields: [
                    { name: 'point', type: 'text', localized: true },
                  ],
                },
                {
                  name: 'erpSolutions',
                  type: 'array',
                  labels: { singular: 'ERP Solution', plural: 'ERP Solutions' },
                  fields: [
                    { name: 'solution', type: 'text', localized: true },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Core Modules',
          fields: [
            {
              name: 'moduleGroups',
              type: 'array',
              labels: { singular: 'Module Group', plural: 'Module Groups' },
              fields: [
                { name: 'groupName', type: 'text', localized: true, required: true },
                { name: 'icon', type: 'select', options: INDUSTRY_ICON_OPTIONS },
                {
                  name: 'features',
                  type: 'array',
                  labels: { singular: 'Feature', plural: 'Features' },
                  fields: [
                    { name: 'featureName', type: 'text', localized: true, required: true },
                    { name: 'description', type: 'textarea', localized: true },
                    { name: 'businessImpact', type: 'textarea', localized: true },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Benefits',
          fields: [
            {
              name: 'benefits',
              type: 'array',
              labels: { singular: 'Benefit', plural: 'Benefits' },
              fields: [
                { name: 'title', type: 'text', localized: true, required: true },
                { name: 'description', type: 'textarea', localized: true },
                { name: 'icon', type: 'select', options: INDUSTRY_ICON_OPTIONS },
              ],
            },
          ],
        },
        {
          label: 'Case Study',
          fields: [
            {
              name: 'caseStudy',
              type: 'group',
              fields: [
                { name: 'clientName', type: 'text', localized: true },
                { name: 'background', type: 'textarea', localized: true },
                { name: 'challenge', type: 'textarea', localized: true },
                { name: 'solution', type: 'textarea', localized: true },
                {
                  name: 'results',
                  type: 'array',
                  labels: { singular: 'Result', plural: 'Results' },
                  fields: [
                    { name: 'value', type: 'text' },
                    { name: 'label', type: 'text', localized: true },
                  ],
                },
                { name: 'testimonialQuote', type: 'textarea', localized: true },
                { name: 'testimonialAuthor', type: 'text', localized: true },
                { name: 'testimonialRole', type: 'text', localized: true },
              ],
            },
          ],
        },
        {
          label: 'CTA',
          fields: [
            {
              name: 'cta',
              type: 'group',
              fields: [
                { name: 'phoneLabel', type: 'text', localized: true },
                { name: 'phoneNumber', type: 'text' },
                { name: 'emailLabel', type: 'text', localized: true },
                { name: 'emailAddress', type: 'text' },
                { name: 'demoLinkLabel', type: 'text', localized: true },
                { name: 'demoLinkUrl', type: 'text' },
              ],
            },
          ],
        },
        {
          label: 'SEO',
          fields: [
            {
              name: 'meta',
              type: 'group',
              fields: [
                { name: 'title', type: 'text', localized: true },
                { name: 'description', type: 'textarea', localized: true },
                { name: 'image', type: 'upload', relationTo: 'media' },
              ],
            },
          ],
        },
      ],
    },
  ],
}
