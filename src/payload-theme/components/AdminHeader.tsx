import React from "react";
import { themeConfig } from "../theme.config";

/**
 * Optional branded header strip shown above the Payload admin chrome.
 * Mount it via payload.config.ts → admin.components.beforeDashboard, or
 * render it in a custom layout. Uses the brand gradient from theme.config.
 */
export default function AdminHeader() {
  const {
    brandName,
    brandSuffix,
    headerLinks: brandLinks,
    colors,
  } = themeConfig;

  return (
    <div
      style={{
        background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`,
        color: "#ffffff",
        padding: "0 1.5rem",
        height: "48px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "sticky",
        top: 0,
        zIndex: 50,
        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
      }}
    >
      {/* Left: Brand */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: 4,
            background: "rgba(255,255,255,0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 800,
            fontSize: "0.8rem",
          }}
        >
          {brandName.charAt(0)}
        </div>
        <span
          style={{
            fontWeight: 700,
            fontSize: "1rem",
            letterSpacing: "-0.01em",
          }}
        >
          {brandName}
        </span>
        {brandSuffix && (
          <span
            style={{
              fontWeight: 400,
              fontSize: "0.7rem",
              opacity: 0.7,
              marginLeft: "0.25rem",
            }}
          >
            {brandSuffix}
          </span>
        )}
      </div>

      {/* Right: Quick links */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1.25rem",
          fontSize: "0.75rem",
        }}
      >
        {brandLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            {...(link.external
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            style={{ color: "rgba(255,255,255,0.85)", textDecoration: "none" }}
          >
            {link.label}
          </a>
        ))}
      </div>
    </div>
  );
}
