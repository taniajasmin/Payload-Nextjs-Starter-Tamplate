import type { GlobalConfig } from 'payload'

export const CareersContactPage: GlobalConfig = {
  slug: 'careers-contact-page',
  access: {
    read: () => true,
  },
  admin: {
    livePreview: {
      url: 'http://localhost:3000',
    },
  },
  fields: [
    {
      name: 'hero',
      type: 'group',
      fields: [
        { name: 'headline', type: 'text', localized: true },
        { name: 'subHeadline', type: 'textarea', localized: true },
      ],
    },
    {
      name: 'introText',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'benefits',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', localized: true },
        { name: 'description', type: 'textarea', localized: true },
      ],
    },
    {
      name: 'openPositionsLink',
      type: 'text',
    },
    {
      name: 'cta',
      type: 'group',
      fields: [
        { name: 'headline', type: 'text', localized: true },
        { name: 'description', type: 'textarea', localized: true },
        { name: 'primaryCtaLabel', type: 'text', localized: true },
        { name: 'primaryCtaLink', type: 'text' },
        { name: 'secondaryCtaLabel', type: 'text', localized: true },
        { name: 'secondaryCtaLink', type: 'text' },
        { name: 'relatedLinks', type: 'textarea', localized: true },
      ],
    },
  ],
}
