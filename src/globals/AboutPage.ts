import type { GlobalConfig } from 'payload'

export const AboutPage: GlobalConfig = {
  slug: 'about-page',
  access: {
    read: () => true,
  },
  admin: {
    group: 'Pages',
    description: 'Manage the About Us page content — company overview, mission, leadership, awards, CSR, and more.',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        /* ──────────────────────────────────────────────────────────────
           Hero
           ────────────────────────────────────────────────────────────── */
        {
          label: 'Hero',
          fields: [
            {
              name: 'hero',
              type: 'group',
              fields: [
                { name: 'headline', type: 'text', localized: true },
                { name: 'subHeadline', type: 'textarea', localized: true },
                {
                  name: 'description',
                  type: 'textarea',
                  localized: true,
                  admin: { description: 'Main hero paragraph (e.g. "Established in 2002...").' },
                },
                {
                  name: 'secondaryDescription',
                  type: 'textarea',
                  localized: true,
                  admin: { description: 'Secondary hero paragraph.' },
                },
              ],
            },
          ],
        },

        /* ──────────────────────────────────────────────────────────────
           Company Details
           ────────────────────────────────────────────────────────────── */
        {
          label: 'Company Details',
          fields: [
            {
              name: 'companySection',
              type: 'group',
              label: 'Section Header',
              fields: [
                { name: 'badge', type: 'text', localized: true, defaultValue: 'Who We Are' },
                { name: 'heading', type: 'text', localized: true, defaultValue: 'Company at a' },
                { name: 'description', type: 'textarea', localized: true },
              ],
            },
            {
              name: 'companyDetails',
              type: 'array',
              label: 'Company at a Glance',
              fields: [
                { name: 'label', type: 'text', required: true },
                { name: 'value', type: 'text', required: true },
              ],
            },
            {
              name: 'associatedCompanies',
              type: 'array',
              label: 'Associated Companies',
              fields: [
                { name: 'company', type: 'text', required: true },
                { name: 'location', type: 'text' },
                { name: 'role', type: 'text' },
              ],
            },
            {
              name: 'parentCompanyFocus',
              type: 'array',
              label: 'Parent Company Focus Areas',
              fields: [
                { name: 'item', type: 'text', required: true },
              ],
            },
          ],
        },

        /* ──────────────────────────────────────────────────────────────
           Mission & Vision
           ────────────────────────────────────────────────────────────── */
        {
          label: 'Mission & Vision',
          fields: [
            {
              name: 'missionVisionSection',
              type: 'group',
              label: 'Section Header',
              fields: [
                { name: 'badge', type: 'text', localized: true, defaultValue: 'Our Purpose' },
                { name: 'heading', type: 'text', localized: true, defaultValue: 'Mission & Vision' },
              ],
            },
            {
              name: 'mission',
              type: 'group',
              fields: [
                { name: 'headline', type: 'textarea', label: 'Mission Headline' },
                { name: 'description', type: 'textarea', label: 'Mission Description' },
              ],
            },
            {
              name: 'vision',
              type: 'group',
              fields: [
                { name: 'headline', type: 'textarea', label: 'Vision Headline' },
                { name: 'description', type: 'textarea', label: 'Vision Description' },
              ],
            },
            {
              name: 'visionStandards',
              type: 'array',
              label: 'Vision Standards',
              fields: [
                { name: 'title', type: 'text', required: true },
                { name: 'desc', type: 'textarea' },
              ],
            },
            {
              name: 'coreValuesSection',
              type: 'group',
              label: 'Core Values Section Header',
              fields: [
                { name: 'badge', type: 'text', localized: true, defaultValue: 'What We Believe' },
                { name: 'heading', type: 'text', localized: true, defaultValue: 'Our Core Values' },
              ],
            },
            {
              name: 'coreValues',
              type: 'array',
              label: 'Core Values',
              admin: { initCollapsed: true },
              fields: [
                { name: 'number', type: 'text', required: true },
                { name: 'title', type: 'text', required: true, localized: true },
                { name: 'desc', type: 'textarea', localized: true },
              ],
            },
          ],
        },

        /* ──────────────────────────────────────────────────────────────
           Why Choose Us
           ────────────────────────────────────────────────────────────── */
        {
          label: 'Why Choose Us',
          fields: [
            {
              name: 'whyChooseSection',
              type: 'group',
              label: 'Section Header',
              fields: [
                { name: 'badge', type: 'text', localized: true, defaultValue: 'Why Choose Us' },
                { name: 'heading', type: 'text', localized: true, defaultValue: 'Your Trusted Partner in Quality & Performance' },
                { name: 'description', type: 'textarea', localized: true },
              ],
            },
            {
              name: 'servicePillars',
              type: 'array',
              label: 'Service Pillars',
              admin: { initCollapsed: false },
              fields: [
                { name: 'number', type: 'text', required: true },
                { name: 'title', type: 'text', required: true, localized: true },
                { name: 'intro', type: 'textarea', localized: true },
                {
                  name: 'benefits',
                  type: 'array',
                  label: 'Benefits',
                  fields: [
                    { name: 'item', type: 'text', required: true },
                  ],
                },
              ],
            },
          ],
        },

        /* ──────────────────────────────────────────────────────────────
           Leadership
           ────────────────────────────────────────────────────────────── */
        {
          label: 'Leadership',
          fields: [
            {
              name: 'leadershipSection',
              type: 'group',
              label: 'Section Header',
              fields: [
                { name: 'badge', type: 'text', localized: true, defaultValue: 'Leadership' },
                { name: 'heading', type: 'text', localized: true, defaultValue: 'Our Leadership' },
              ],
            },
            {
              name: 'boardOfDirectors',
              type: 'array',
              label: 'Board of Directors',
              admin: { initCollapsed: false },
              fields: [
                { name: 'name', type: 'text', required: true },
                { name: 'code', type: 'text' },
                { name: 'role', type: 'text' },
                { name: 'profile', type: 'textarea' },
              ],
            },
            {
              name: 'executiveTeam',
              type: 'array',
              label: 'Executive Management Team',
              fields: [
                { name: 'position', type: 'text', required: true },
                { name: 'name', type: 'text', required: true },
                { name: 'code', type: 'text' },
              ],
            },
            {
              name: 'divisions',
              type: 'array',
              label: 'Business Divisions',
              fields: [
                { name: 'name', type: 'text', required: true },
                { name: 'size', type: 'text' },
                { name: 'focus', type: 'text' },
              ],
            },
          ],
        },

        /* ──────────────────────────────────────────────────────────────
           Awards & Certifications
           ────────────────────────────────────────────────────────────── */
        {
          label: 'Awards & Certifications',
          fields: [
            {
              name: 'awardsSection',
              type: 'group',
              label: 'Section Header',
              fields: [
                { name: 'badge', type: 'text', localized: true, defaultValue: 'Recognition' },
                { name: 'heading', type: 'text', localized: true, defaultValue: 'Awards & Certifications' },
              ],
            },
            {
              name: 'awards',
              type: 'array',
              label: 'Awards',
              admin: { initCollapsed: false },
              fields: [
                { name: 'year', type: 'text', required: true },
                { name: 'title', type: 'text', required: true },
                { name: 'issuer', type: 'text' },
                { name: 'description', type: 'textarea' },
              ],
            },
            {
              name: 'certifications',
              type: 'array',
              label: 'Certifications & Authorizations',
              fields: [
                { name: 'cert', type: 'text', required: true },
                { name: 'authority', type: 'text' },
                { name: 'status', type: 'text', defaultValue: 'Active' },
              ],
            },
          ],
        },

        /* ──────────────────────────────────────────────────────────────
           Image Sections
           ────────────────────────────────────────────────────────────── */
        {
          label: 'Image Sections',
          fields: [
            {
              name: 'imageSection1',
              type: 'group',
              label: 'Image Section 1 — Showcase Gallery',
              fields: [
                {
                  name: 'headline',
                  type: 'text',
                  label: 'Section Headline',
                  localized: true,
                },
                {
                  name: 'subHeadline',
                  type: 'textarea',
                  label: 'Section Sub-headline',
                  localized: true,
                },
                {
                  name: 'images',
                  type: 'array',
                  label: 'Gallery Images',
                  minRows: 1,
                  maxRows: 6,
                  fields: [
                    {
                      name: 'image',
                      type: 'upload',
                      relationTo: 'media',
                      required: true,
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
              name: 'imageSection2',
              type: 'group',
              label: 'Image Section 2 — Feature Highlights',
              fields: [
                {
                  name: 'headline',
                  type: 'text',
                  label: 'Section Headline',
                  localized: true,
                },
                {
                  name: 'subHeadline',
                  type: 'textarea',
                  label: 'Section Sub-headline',
                  localized: true,
                },
                {
                  name: 'images',
                  type: 'array',
                  label: 'Feature Images',
                  minRows: 1,
                  maxRows: 4,
                  fields: [
                    {
                      name: 'image',
                      type: 'upload',
                      relationTo: 'media',
                      required: true,
                    },
                    {
                      name: 'caption',
                      type: 'text',
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
          ],
        },

        /* ──────────────────────────────────────────────────────────────
           CSR
           ────────────────────────────────────────────────────────────── */
        {
          label: 'CSR',
          fields: [
            {
              name: 'ethicalPractices',
              type: 'array',
              label: 'Ethical Business Practices',
              fields: [
                { name: 'item', type: 'text', required: true },
              ],
            },
            {
              name: 'uaeAlignment',
              type: 'array',
              label: 'UAE National Vision Alignment',
              fields: [
                { name: 'priority', type: 'text', required: true },
                { name: 'contribution', type: 'text' },
              ],
            },
          ],
        },

        /* ──────────────────────────────────────────────────────────────
           Market & Distribution
           ────────────────────────────────────────────────────────────── */
        {
          label: 'Market & Distribution',
          fields: [
            {
              name: 'marketCoverage',
              type: 'array',
              label: 'Market Coverage',
              fields: [
                { name: 'region', type: 'text', required: true },
                { name: 'coverage', type: 'text' },
                { name: 'markets', type: 'text' },
              ],
            },
            {
              name: 'distributionChannels',
              type: 'array',
              label: 'Distribution Channels',
              fields: [
                { name: 'title', type: 'text', required: true },
                { name: 'desc', type: 'text' },
              ],
            },
            {
              name: 'philosophy',
              type: 'array',
              label: 'Our Philosophy',
              fields: [
                { name: 'title', type: 'text', required: true },
                { name: 'desc', type: 'text' },
              ],
            },
          ],
        },

        /* ──────────────────────────────────────────────────────────────
           Milestones
           ────────────────────────────────────────────────────────────── */
        {
          label: 'Milestones',
          fields: [
            {
              name: 'milestonesSection',
              type: 'group',
              label: 'Section Header',
              fields: [
                { name: 'badge', type: 'text', localized: true, defaultValue: 'Our Journey' },
                { name: 'heading', type: 'text', localized: true, defaultValue: 'Key Milestones' },
              ],
            },
            {
              name: 'milestones',
              type: 'array',
              label: 'Key Company Milestones',
              admin: { initCollapsed: false },
              fields: [
                { name: 'year', type: 'text', required: true },
                { name: 'milestone', type: 'text', required: true },
              ],
            },
          ],
        },

        /* ──────────────────────────────────────────────────────────────
           CTA
           ────────────────────────────────────────────────────────────── */
        {
          label: 'CTA',
          fields: [
            {
              name: 'cta',
              type: 'group',
              label: 'Bottom CTA Section',
              fields: [
                { name: 'heading', type: 'text', localized: true, defaultValue: 'Optimizing Your Business' },
                { name: 'description', type: 'textarea', localized: true },
                {
                  name: 'primaryButton',
                  type: 'group',
                  label: 'Primary Button',
                  fields: [
                    { name: 'label', type: 'text', localized: true, defaultValue: 'Contact Us' },
                    { name: 'href', type: 'text', defaultValue: '/contact' },
                  ],
                },
                {
                  name: 'secondaryButton',
                  type: 'group',
                  label: 'Secondary Button',
                  fields: [
                    { name: 'label', type: 'text', localized: true, defaultValue: 'Browse Products' },
                    { name: 'href', type: 'text', defaultValue: '/brands' },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
