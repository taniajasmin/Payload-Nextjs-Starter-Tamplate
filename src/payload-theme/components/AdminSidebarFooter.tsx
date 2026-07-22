import React from "react";
import { themeConfig } from "../theme.config";

/**
 * Footer pinned to the bottom of the admin sidebar.
 * Wired via payload.config.ts → admin.components.afterNav.
 */
export default function AdminSidebarFooter() {
  const { brandName, footerLinks, colors } = themeConfig;
  const year = new Date().getFullYear();

  return (
    <div
      style={{
        padding: "0.75rem 1rem",
        borderTop: "1px solid rgba(0,0,0,0.08)",
        fontSize: "0.65rem",
        color: "rgba(0,0,0,0.4)",
        textAlign: "center",
        lineHeight: 1.5,
      }}
    >
      <div
        style={{
          fontWeight: 600,
          color: colors.primary,
          fontSize: "0.7rem",
          marginBottom: "0.25rem",
        }}
      >
        {brandName} Technologies
      </div>
      <div>&copy; {year} All rights reserved.</div>
      <div
        style={{
          marginTop: "0.25rem",
          display: "flex",
          justifyContent: "center",
          gap: "0.5rem",
        }}
      >
        {footerLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            style={{ color: "rgba(0,0,0,0.35)", textDecoration: "none" }}
          >
            {link.label}
          </a>
        ))}
      </div>
    </div>
  );
}
