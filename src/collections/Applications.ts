import type { CollectionConfig } from 'payload'

export const Applications: CollectionConfig = {
  slug: 'applications',
  access: {
    // Anyone can submit an application (public form)
    create: () => true,
    // Only admins can view / manage applications
    read: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user && user.role === 'administrator',
  },
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['firstName', 'lastName', 'position', 'status', 'appliedAt'],
    group: 'Careers Section',
    description: 'Job applications submitted through the careers page.',
  },
  timestamps: true,
  fields: [
    // ── Personal Information ──
    {
      name: 'firstName',
      type: 'text',
      required: true,
    },
    {
      name: 'lastName',
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
      required: true,
    },

    // ── Position Details ──
    {
      name: 'position',
      type: 'select',
      required: true,
      options: [
        { label: 'General Application', value: 'general' },
        { label: 'Senior Account Manager — IT Distribution', value: 'senior-account-manager' },
        { label: 'Product Specialist — Storage & Memory', value: 'product-specialist' },
        { label: 'Technical Support Engineer', value: 'technical-support' },
        { label: 'Warehouse & Logistics Coordinator', value: 'warehouse-coordinator' },
        { label: 'Digital Marketing Specialist', value: 'digital-marketing' },
        { label: 'B2B Sales Executive', value: 'b2b-sales' },
      ],
    },
    {
      name: 'experience',
      type: 'select',
      required: true,
      options: [
        { label: '0–1 years', value: '0-1' },
        { label: '1–3 years', value: '1-3' },
        { label: '3–5 years', value: '3-5' },
        { label: '5–10 years', value: '5-10' },
        { label: '10+ years', value: '10+' },
      ],
    },
    {
      name: 'expectedSalary',
      type: 'text',
      label: 'Expected Salary (AED/month)',
    },

    // ── Documents ──
    {
      name: 'cv',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'CV / Resume',
      admin: {
        description: 'Uploaded CV / Resume (PDF or DOC).',
      },
    },
    {
      name: 'coverLetter',
      type: 'textarea',
      label: 'Cover Letter',
    },

    // ── HR Review ──
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: [
        { label: '🆕 New', value: 'new' },
        { label: '👁 Reviewing', value: 'reviewing' },
        { label: '⭐ Shortlisted', value: 'shortlisted' },
        { label: '📞 Interviewed', value: 'interviewed' },
        { label: '✅ Offered', value: 'offered' },
        { label: '❌ Rejected', value: 'rejected' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'notes',
      type: 'textarea',
      label: 'Internal HR Notes',
      admin: {
        position: 'sidebar',
        description: 'Internal notes visible only to HR / admins.',
      },
    },
    {
      name: 'appliedAt',
      type: 'date',
      label: 'Applied At',
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
