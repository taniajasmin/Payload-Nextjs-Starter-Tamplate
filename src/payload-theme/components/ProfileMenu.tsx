"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import * as LucideIcons from "lucide-react";
import { themeConfig } from "../theme.config";

interface UserData {
  email: string;
  name?: string;
}

/** Resolve a lucide-react icon by name, falling back to a square dot. Not a hook. */
function renderIcon(name: string) {
  const Comp = (
    LucideIcons as unknown as Record<
      string,
      React.ComponentType<{ size?: number }>
    >
  )[name];
  return Comp ? (
    <Comp size={18} />
  ) : (
    <span style={{ width: 18, height: 18, display: "inline-block" }} />
  );
}

/**
 * Account dropdown wired into the admin header via payload.config.ts →
 * admin.components.actions. Fetches the logged-in user from /api/users/me,
 * hides Payload's default account link, and renders a branded dropdown.
 */
const ProfileMenu: React.FC = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Fetch user via the Payload API
  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch("/api/users/me", {
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        });
        if (res.ok) {
          const data = await res.json();
          if (data?.user) setUser(data.user as UserData);
        }
      } catch {
        // Not logged in or error
      }
      setLoaded(true);
    }
    fetchUser();
  }, []);

  // Click outside to close
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    if (open) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  // Hide the default Payload account link while this menu is mounted
  useEffect(() => {
    const style = document.createElement("style");
    style.id = "account-popup-override";
    style.textContent = `.app-header__account { display: none !important; }`;
    if (!document.getElementById("account-popup-override")) {
      document.head.appendChild(style);
    }
    return () => {
      document.getElementById("account-popup-override")?.remove();
    };
  }, []);

  if (!loaded || !user) return null;

  const name = user.name || user.email;
  const initial = name.charAt(0).toUpperCase();
  const websiteUrl =
    typeof window !== "undefined"
      ? process.env.NEXT_PUBLIC_SERVER_URL || window.location.origin
      : themeConfig.websiteUrl;

  const menuItems = [
    ...themeConfig.accountMenu,
    {
      icon: "Globe",
      label: "Visit Website",
      href: websiteUrl,
      external: true,
    },
  ];

  return (
    <div
      ref={ref}
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        marginLeft: "auto",
      }}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="true"
        aria-expanded={open}
        className="account-popup-trigger"
        style={{
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "6px",
          background: "none",
          border: "none",
          padding: "4px 8px",
          borderRadius: "20px",
          color: "#333",
          fontSize: "13px",
          fontWeight: 500,
          transition: "background 0.15s ease",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.background =
            "rgba(0,0,0,0.05)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.background = "none";
        }}
      >
        <span
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "30px",
            height: "30px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #3b82f6, #2563eb)",
            color: "#fff",
            fontWeight: 700,
            fontSize: "13px",
            flexShrink: 0,
          }}
        >
          {initial}
        </span>
        <span
          style={{
            maxWidth: 120,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {name}
        </span>
      </button>

      {open && (
        <div
          className="account-popup-menu"
          style={{ position: "absolute", top: "calc(100% + 8px)", right: 0 }}
        >
          {/* User info header */}
          <div className="account-popup__user-info">
            <span className="account-popup-avatar account-popup-avatar--lg">
              {initial}
            </span>
            <div className="account-popup__user-details">
              <div className="account-popup__user-name">{name}</div>
              <div className="account-popup__user-email">{user.email}</div>
            </div>
          </div>

          <div className="account-popup__divider" />

          {/* Menu items */}
          <div className="account-popup__menu-items">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                {...(item.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                onClick={() => setOpen(false)}
                className="account-popup__menu-item"
              >
                <span className="account-popup__menu-icon">
                  {renderIcon(item.icon)}
                </span>
                {item.label}
              </Link>
            ))}
          </div>

          <div className="account-popup__divider" />

          {/* Sign out */}
          <Link
            href="/admin/logout"
            onClick={() => setOpen(false)}
            className="account-popup__menu-item account-popup__menu-item--danger"
          >
            <span className="account-popup__menu-icon">
              {renderIcon("LogOut")}
            </span>
            Sign Out
          </Link>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
