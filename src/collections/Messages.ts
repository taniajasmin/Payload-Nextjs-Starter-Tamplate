import type { CollectionConfig } from 'payload'

export const Messages: CollectionConfig = {
  slug: 'messages',
  access: {
    // Anyone can submit a message (public contact forms)
    create: () => true,
    // Only admins can view / manage messages
    read: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user && user.role === 'administrator',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['type', 'name', 'email', 'company', 'status', 'submittedAt'],
    group: 'Contact Section',
    description: 'Messages submitted through the Contact Us page (general, sales, support).',
  },
  timestamps: true,
  fields: [
    // ── Submission type ──
    {
      name: 'type',
      type: 'select',
      required: true,
      defaultValue: 'general',
      options: [
        { label: 'General Inquiry', value: 'general' },
        { label: 'Sales Inquiry', value: 'sales' },
        { label: 'Support Request', value: 'support' },
      ],
    },

    // ── Contact details ──
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
    },
    {
      name: 'company',
      type: 'text',
    },
    {
      name: 'subject',
      type: 'text',
    },
    {
      name: 'message',
      type: 'textarea',
    },

    // ── Form-specific extras (structured per type) ──
    {
      name: 'details',
      type: 'json',
      label: 'Extra details',
      admin: {
        description:
          'Form-specific fields (e.g. sales: country, solution, budget; support: category, priority).',
        readOnly: true,
      },
    },

    // ── Admin review ──
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: [
        { label: '🆕 New', value: 'new' },
        { label: '👁 Reading', value: 'reading' },
        { label: '✅ Responded', value: 'responded' },
        { label: '📦 Archived', value: 'archived' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'notes',
      type: 'textarea',
      label: 'Internal Notes',
      admin: {
        position: 'sidebar',
        description: 'Internal notes visible only to admins.',
      },
    },
    {
      name: 'submittedAt',
      type: 'date',
      label: 'Submitted At',
      admin: {
        position: 'sidebar',
        readOnly: true,
      },
      hooks: {
        beforeValidate: [
          ({ value, operation }) => {
            if (operation === 'create' && !value) {
              return new Date().toISOString()
            }
            return value
          },
        ],
      },
    },
  ],
}
