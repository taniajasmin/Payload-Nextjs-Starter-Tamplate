/**
 * TwinMOS Payload Theme — central brand config.
 *
 * Edit this one file to rebrand the admin panel for a different project.
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
  brandName: "Simal",
  brandSuffix: "CMS Admin",
  logoUrl: "/assets/images/logo/simal-logo-home.png",
  logoHeight: 32,
  iconHeight: 24,

  colors: {
    primary: "#e11d48",
    primaryDark: "#be123c",
    secondary: "#7c3aed",
  },

  headerLinks: [
    { label: "Visit Website", href: "/", external: true },
    { label: "simalme.com", href: "https://www.simalme.com", external: true },
  ],

  footerLinks: [
    { label: "Privacy", href: "https://www.simalme.com/legal/privacy-policy" },
    { label: "Terms", href: "https://www.simalme.com/legal/terms-of-use" },
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
