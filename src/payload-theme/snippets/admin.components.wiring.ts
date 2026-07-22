/**
 * Snippet: how to wire this theme into your payload.config.ts `admin.components`.
 *
 * 1. Copy ./components and ./admin-overrides.css and ./theme.config.ts into
 *    your Payload project (paths below assume ./src/payload-theme/...).
 * 2. Paste the `components` block below into buildConfig({ admin: { ... } }).
 * 3. See ./snippets/layout.tsx for the (payload)/layout.tsx that loads the CSS.
 *
 * Slot reference (Payload v3):
 *   graphics.Logo  ............ sidebar logo            → Logo
 *   graphics.Icon  ............ collapsed icon          → Icon
 *   beforeNavLinks ............ top-of-nav group         → NavMain
 *   afterNav .................. bottom-of-nav footer     → AdminSidebarFooter
 *   actions ................... header right-hand slot   → ProfileMenu
 *   beforeDashboard ........... above dashboard content  → AdminHeader, DashboardStats
 *   (optional) beforeNavLinks . ThemeToggle if you want a toggle in the nav
 */

// Adjust these paths to where you placed the theme in your project.
const base = "./src/payload-theme/components";

/**
 * Drop-in `admin.components` block. Typed loosely so it doesn't depend on a
 * specific Payload internal export — Payload validates the shape at build time.
 */
export const themeAdminComponents = {
  graphics: {
    Logo: `${base}/Logo`,
    Icon: `${base}/Icon`,
  },
  beforeNavLinks: [`${base}/NavMain`],
  afterNav: [`${base}/AdminSidebarFooter`],
  actions: [`${base}/ProfileMenu`],
  beforeDashboard: [`${base}/AdminHeader`, `${base}/DashboardStats`],
};

/* ---- usage in payload.config.ts ----
import { themeAdminComponents } from "./src/payload-theme/snippets/admin.components.wiring";

export default buildConfig({
  admin: {
    user: "users",
    components: themeAdminComponents,
    // theme: "all",         // keep light+dark support (ThemeToggle works)
    suppressHydrationWarning: true,
  },
  // ...
});
*/
