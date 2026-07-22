"use client";

import { useEffect } from "react";

/**
 * Strip the `bis_skin_checked` attribute that certain browser extensions
 * inject into the DOM. If left in place it causes a React hydration mismatch.
 *
 * This is kept in a dedicated client component so the root layout does not
 * ship the script inline on every navigation.
 */
export function ExtensionCleanup() {
  useEffect(() => {
    if (typeof document === "undefined") return;

    const clean = () => {
      document.querySelectorAll("[bis_skin_checked]").forEach((el) => {
        (el as Element).removeAttribute("bis_skin_checked");
      });
    };

    clean();

    if (typeof MutationObserver !== "undefined") {
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((m) => {
          if (m.attributeName === "bis_skin_checked") {
            (m.target as Element).removeAttribute("bis_skin_checked");
          }
        });
      });

      observer.observe(document.documentElement, {
        attributes: true,
        subtree: true,
        attributeFilter: ["bis_skin_checked"],
      });

      return () => observer.disconnect();
    }
  }, []);

  return null;
}
