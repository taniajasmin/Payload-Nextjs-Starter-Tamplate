"use client";

import { Link, NavGroup } from "@payloadcms/ui";

/**
 * "Main" group pinned to the top of the sidebar.
 * The auto-collapse behavior lives in admin-overrides.css (.nav-group.Main).
 */
export const NavMain = () => {
  return (
    <NavGroup label="Main">
      <Link href="/admin" className="nav__link">
        Dashboard
      </Link>
    </NavGroup>
  );
};

export default NavMain;
