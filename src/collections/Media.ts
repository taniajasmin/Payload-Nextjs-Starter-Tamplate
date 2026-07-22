import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => {
      if (!user) return false
      return user.role === 'administrator' || user.role === 'editor'
    },
  },
  admin: {
    group: 'Media Section',
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'caption',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'folder',
      type: 'relationship',
      relationTo: 'media-folders',
    },
  ],
  upload: {
    staticDir: 'public/media',
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
        // Generate a thumbnail even when the source is smaller than 400x300
        // (e.g. brand logos). Payload omits sizes that would require upscaling
        // unless this is set to false, leaving the admin list preview blank.
        withoutEnlargement: false,
      },
      {
        name: 'card',
        width: 768,
        height: 1024,
        position: 'centre',
      },
      {
        name: 'tablet',
        width: 1024,
        height: undefined,
        position: 'centre',
      },
    ],
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/*', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
  },
}
