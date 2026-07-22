import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: {
    tokenExpiration: 7200,
    cookies: {
      sameSite: 'Lax',
      secure: false,
    },
    verify: false,
    maxLoginAttempts: 5,
    lockTime: 900000,
  },
  admin: {
    useAsTitle: 'email',
    group: 'Settings',
  },
  access: {
    read: ({ req: { user } }) => {
      if (!user) return false
      if (user.role === 'administrator') return true
      return {
        id: {
          equals: user.id,
        },
      }
    },
    // DEV ONLY: allow public registration so teammates can create admin accounts
    // TODO: lock this back down before production — see original rule below
    create: () => true,
    // create: ({ req: { user } }) => {
    //   if (!user) return false
    //   return user.role === 'administrator'
    // },
    update: ({ req: { user } }) => {
      if (!user) return false
      if (user.role === 'administrator') return true
      return {
        id: {
          equals: user.id,
        },
      }
    },
    delete: ({ req: { user } }) => {
      if (!user) return false
      return user.role === 'administrator'
    },
    admin: ({ req: { user } }) => {
      if (!user) return false
      return user.role === 'administrator'
    },
  },
  fields: [
    {
      name: 'email',
      type: 'email',
      required: true,
      unique: true,
    },
    {
      name: 'firstName',
      type: 'text',
    },
    {
      name: 'lastName',
      type: 'text',
    },
    {
      name: 'role',
      type: 'select',
      defaultValue: 'contributor',
      options: [
        { label: 'Administrator', value: 'administrator' },
        { label: 'Editor', value: 'editor' },
        { label: 'Author', value: 'author' },
        { label: 'Contributor', value: 'contributor' },
      ],
      required: true,
      access: {
        update: ({ req: { user } }) => user?.role === 'administrator',
      },
    },
    {
      name: 'active',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'lastLoginAt',
      type: 'date',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'twoFactorEnabled',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'locale',
      type: 'select',
      options: [
        { label: 'English', value: 'en' },
        { label: 'Arabic', value: 'ar' },
        { label: 'French', value: 'fr' },
        { label: 'Russian', value: 'ru' },
      ],
      defaultValue: 'en',
    },
  ],
}
