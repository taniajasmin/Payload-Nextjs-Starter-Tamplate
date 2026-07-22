/**
 * Payload Admin Theme — central brand config.
 *
 * Edit this one file to rebrand the admin panel for your project.
 * Every component in ./components reads from here, and admin-overrides.css
 * reads the matching CSS custom properties (see :root at the top of that file).
 */

export interface PayloadThemeConfig {
  /** Short brand name shown in the header + sidebar footer. */
  brandName: string;
  /** Small label next to the brand in the header, e.g. "CMS Admin". */
  brandSuffix?: string;
  /** Public logo shown in the sidebar / login. Place under /public. */
  logoUrl: string;
  /** Pixel height of the sidebar logo. */
  logoHeight?: number;
  /** Pixel height of the login/collapsed logo. */
  iconHeight?: number;
  /** Brand colors (hex). `primary` drives the accent bar + buttons; `secondary` is the gradient end. */
  colors: {
    primary: string;
    primaryDark: string;
    secondary: string;
  };
  /** Links shown on the right of the admin header. */
  headerLinks: { label: string; href: string; external?: boolean }[];
  /** Links shown in the sidebar footer. */
  footerLinks: { label: string; href: string }[];
  /** Menu items in the account (profile) dropdown. */
  accountMenu: {
    icon: string; // lucide-react icon name, resolved by ProfileMenu
    label: string;
    href: string;
    external?: boolean;
  }[];
  /** "Visit website" URL used by the account menu + header. */
  websiteUrl: string;
}

export const themeConfig: PayloadThemeConfig = {
  brandName: "Acme",
  brandSuffix: "CMS Admin",
  logoUrl: "/assets/images/logo/logo.png",
  logoHeight: 32,
  iconHeight: 24,

  colors: {
    primary: "#4f46e5",    // indigo-600
    primaryDark: "#3730a3", // indigo-800
    secondary: "#7c3aed",   // violet-600
  },

  headerLinks: [
    { label: "Visit Website", href: "/", external: true },
  ],

  footerLinks: [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
  ],

  accountMenu: [
    { icon: "LayoutDashboard", label: "Dashboard", href: "/admin" },
    {
      icon: "Settings",
      label: "Site Settings",
      href: "/admin/globals/site-settings",
    },
    { icon: "Users", label: "Users & Roles", href: "/admin/collections/users" },
  ],

  websiteUrl: "/",
};
