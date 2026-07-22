import type { CollectionConfig } from 'payload'
import { cmsContentAccess } from '../access/cmsAccess'

/* Icon select options — kept in sync with the Header global and the
   iconNameToComponent map in components/layout/navigation-data.ts. */
const SERVICE_ICON_OPTIONS = [
  { label: 'Package', value: 'Package' },
  { label: 'CPU', value: 'Cpu' },
  { label: 'Mouse', value: 'Mouse' },
  { label: 'Monitor', value: 'Monitor' },
  { label: 'Gamepad', value: 'Gamepad' },
  { label: 'Laptop', value: 'Laptop' },
  { label: 'Box', value: 'Box' },
  { label: 'Hard Drive', value: 'HardDrive' },
  { label: 'WiFi', value: 'Wifi' },
  { label: 'Shield', value: 'Shield' },
  { label: 'Smartphone', value: 'Smartphone' },
  { label: 'Headphones', value: 'Headphones' },
  { label: 'Cart', value: 'ShoppingCart' },
  { label: 'Briefcase', value: 'Briefcase' },
  { label: 'Users', value: 'Users' },
  { label: 'File Text', value: 'FileText' },
  { label: 'Book Open', value: 'BookOpen' },
  { label: 'Phone', value: 'Phone' },
  { label: 'Map Pin', value: 'MapPin' },
  { label: 'Globe', value: 'Globe' },
  { label: 'Bar Chart', value: 'BarChart3' },
  { label: 'Settings', value: 'Settings' },
  { label: 'Wallet', value: 'Wallet' },
  { label: 'Truck', value: 'Truck' },
  { label: 'Factory', value: 'Factory' },
  { label: 'Graduation Cap', value: 'GraduationCap' },
  { label: 'Heart Pulse', value: 'HeartPulse' },
  { label: 'Utensils', value: 'Utensils' },
  { label: 'Landmark', value: 'Landmark' },
  { label: 'Store', value: 'Store' },
  { label: 'Clapperboard', value: 'Clapperboard' },
  { label: 'Clipboard List', value: 'ClipboardList' },
  { label: 'Trending Up', value: 'TrendingUp' },
  { label: 'Calculator', value: 'Calculator' },
  { label: 'Credit Card', value: 'CreditCard' },
  { label: 'Database', value: 'Database' },
  { label: 'Server', value: 'Server' },
  { label: 'Network', value: 'Network' },
  { label: 'Lock', value: 'Lock' },
  { label: 'Video', value: 'Video' },
  { label: 'Wrench', value: 'Wrench' },
  { label: 'Award', value: 'Award' },
  { label: 'Sparkles', value: 'Sparkles' },
  { label: 'Lightbulb', value: 'Lightbulb' },
  { label: 'Newspaper', value: 'Newspaper' },
  { label: 'Help Circle', value: 'HelpCircle' },
  { label: 'Building', value: 'Building2' },
  { label: 'Grid', value: 'LayoutGrid' },
  { label: 'Zap', value: 'Zap' },
  { label: 'Mail', value: 'Mail' },
]

/**
 * `services` collection — powers the /solutions hub and /solutions/[slug] pages.
 *
 * Each document is one service offering (AMC, Firewall, Cloud Security, …),
 * grouped by `family` so the hub can render the two pillars of the business
 * (Professional IT Services / Software & ERP).
 *
 * `customHref` lets a service card/button point somewhere other than
 * /solutions/{slug} — used for UniERP, whose page is the existing
 * hardcoded /erp/overview.
 *
 * Conventions mirrored from Pages.ts / Products.ts:
 *   - cmsContentAccess (public read, role-gated writes)
 *   - versions + drafts, status field (draft/published)
 *   - slug is unique + GLOBAL (not localized) — a localized unique index
 *     silently breaks doc creation (per-locale index). See Products.
 *   - livePreview URL builder mirrors Pages.
 */
export const Services: CollectionConfig = {
  slug: 'services',
  access: cmsContentAccess,
  versions: {
    drafts: true,
    maxPerDoc: 50,
  },
  admin: {
    defaultColumns: ['title', 'slug', 'family', 'status', 'updatedAt'],
    useAsTitle: 'title',
    group: 'Content Section',
    livePreview: {
      url: async ({ data, locale }) => {
        const slug = (data as Record<string, unknown>)?.slug as string | undefined
        const base = 'http://localhost:3000'
        const localeCode = (locale as unknown as { code?: string })?.code ?? 'en'
        if (!slug) return base
        return `${base}/${localeCode}/solutions/${slug}?preview=true`
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
      // NOT localized — keep global like Products to avoid the per-locale
      // unique-index creation failure.
      admin: {
        position: 'sidebar',
        description: 'URL path segment, e.g. `amc`. Must be unique.',
      },
    },
    {
      name: 'family',
      type: 'select',
      required: true,
      defaultValue: 'it-services',
      options: [
        { label: 'Professional IT Services', value: 'it-services' },
        { label: 'Software & ERP', value: 'software-erp' },
      ],
      admin: {
        position: 'sidebar',
        description: 'Groups the service on the /services hub.',
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
      name: 'customHref',
      type: 'text',
      admin: {
        position: 'sidebar',
        description:
          'Optional override link (e.g. `/erp/overview`). When set, the hub card and nav link here instead of /services/{slug}.',
      },
    },
    {
      name: 'tagline',
      type: 'textarea',
      localized: true,
      admin: {
        description: 'Short one-line description shown on hub/menu cards.',
      },
    },
    {
      name: 'icon',
      type: 'select',
      options: SERVICE_ICON_OPTIONS,
      admin: {
        description: 'Icon shown on the hub/menu card. Must match navigation-data.ts.',
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
                { name: 'primaryCtaLabel', type: 'text', localized: true },
                { name: 'primaryCtaLink', type: 'text' },
                { name: 'secondaryCtaLabel', type: 'text', localized: true },
                { name: 'secondaryCtaLink', type: 'text' },
              ],
            },
          ],
        },
        {
          label: 'Overview',
          fields: [
            {
              name: 'overview',
              type: 'textarea',
              localized: true,
              admin: {
                description:
                  'Main body copy. HTML is allowed and rendered as-is (matches the it-distribution page pattern).',
              },
            },
          ],
        },
        {
          label: 'Features',
          fields: [
            {
              name: 'features',
              type: 'array',
              labels: { singular: 'Feature', plural: 'Features' },
              fields: [
                { name: 'title', type: 'text', localized: true, required: true },
                { name: 'description', type: 'textarea', localized: true },
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
