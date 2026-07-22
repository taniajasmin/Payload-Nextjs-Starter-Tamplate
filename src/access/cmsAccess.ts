import type { Access, AccessArgs, Where } from 'payload'

/**
 * CMS Role hierarchy (lowest → highest):
 *   contributor < author < editor < administrator
 */

type UserLike = { role?: unknown } | null | undefined

export const isAdministrator = (user?: UserLike): boolean =>
  user?.role === 'administrator'

export const isEditor = (user?: UserLike): boolean =>
  isAdministrator(user) || user?.role === 'editor'

export const isAuthor = (user?: UserLike): boolean =>
  isEditor(user) || user?.role === 'author'

export const isContributor = (user?: UserLike): boolean =>
  isAuthor(user) || user?.role === 'contributor'

/* ------------------------------------------------------------------ */
/*  Collection-level access (Payload default pattern)                  */
/* ------------------------------------------------------------------ */

/**
 * Public read — any visitor (authenticated or not) can read.
 * Use for public website content collections.
 */
export const publicRead: Access = () => true

/**
 * Authenticated read — only logged-in CMS users can read.
 */
export const authenticatedRead: Access = ({ req: { user } }) => !!user

/**
 * CMS-standard access matrix:
 *   read    → any authenticated user (contributor+)
 *   create  → contributor+
 *   update  → author can edit own; editor+ can edit any
 *   delete  → administrator only
 */
export const cmsStandardAccess = {
  read: authenticatedRead,
  create: (({ req: { user } }) => isContributor(user)) satisfies Access,
  update: ((args: AccessArgs) => {
    const { req } = args
    const user = req.user as unknown as UserLike
    if (!user) return false
    if (isEditor(user)) return true
    if (isAuthor(user)) {
      return {
        createdBy: {
          equals: req.user?.id,
        },
      } as Where
    }
    return false
  }) satisfies Access,
  delete: (({ req: { user } }) => isAdministrator(user as unknown as UserLike)) satisfies Access,
}

/**
 * CMS-content access — same as cmsStandardAccess but read is public.
 * Use for collections whose documents are rendered on the public site
 * but whose editing is gated by CMS roles.
 */
export const cmsContentAccess = {
  read: publicRead,
  create: (({ req: { user } }) => isContributor(user as unknown as UserLike)) satisfies Access,
  update: ((args: AccessArgs) => {
    const { req } = args
    const user = req.user as unknown as UserLike
    if (!user) return false
    if (isEditor(user)) return true
    if (isAuthor(user)) {
      return {
        createdBy: {
          equals: req.user?.id,
        },
      } as Where
    }
    return false
  }) satisfies Access,
  delete: (({ req: { user } }) => isAdministrator(user)) satisfies Access,
}

/**
 * Administrator-only access.
 * Use for system / security / infrastructure collections.
 */
export const adminOnlyAccess = {
  read: (({ req: { user } }) => isAdministrator(user)) satisfies Access,
  create: (({ req: { user } }) => isAdministrator(user)) satisfies Access,
  update: (({ req: { user } }) => isAdministrator(user)) satisfies Access,
  delete: (({ req: { user } }) => isAdministrator(user)) satisfies Access,
}

/* ------------------------------------------------------------------ */
/*  Field-level access                                                 */
/* ------------------------------------------------------------------ */

/**
 * Field readable/writable only by administrators.
 */
export const adminOnlyFieldAccess = {
  read: (({ req: { user } }) => isAdministrator(user)) satisfies Access,
  update: (({ req: { user } }) => isAdministrator(user)) satisfies Access,
  create: (({ req: { user } }) => isAdministrator(user)) satisfies Access,
}

/**
 * Field readable by anyone, writable only by editors+.
 */
export const editorFieldAccess = {
  read: (() => true) satisfies Access,
  update: (({ req: { user } }) => isEditor(user)) satisfies Access,
  create: (({ req: { user } }) => isEditor(user)) satisfies Access,
}
