"use client";

import { useEffect } from "react";
import { useLivePreviewData } from "@/hooks/use-live-preview";

export function LivePreviewDOMUpdater() {
  const data = useLivePreviewData();

  useEffect(() => {
    if (!data) return;

    // Title
    if (typeof data.title === "string") {
      const els = document.querySelectorAll("[data-live-preview='title']");
      els.forEach((el) => {
        if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
          (el as HTMLInputElement).value = data.title as string;
        } else {
          el.textContent = data.title as string;
        }
      });
    }

    // Excerpt
    if (typeof data.excerpt === "string") {
      const els = document.querySelectorAll("[data-live-preview='excerpt']");
      els.forEach((el) => {
        el.textContent = data.excerpt as string;
      });
    }

    // Hero headline
    if (data.hero && typeof (data.hero as Record<string, unknown>).headline === "string") {
      const els = document.querySelectorAll("[data-live-preview='hero-headline']");
      els.forEach((el) => {
        el.textContent = (data.hero as Record<string, unknown>).headline as string;
      });
    }

    // Hero subheadline
    if (data.hero && typeof (data.hero as Record<string, unknown>).subHeadline === "string") {
      const els = document.querySelectorAll("[data-live-preview='hero-subheadline']");
      els.forEach((el) => {
        el.textContent = (data.hero as Record<string, unknown>).subHeadline as string;
      });
    }

    // Meta title
    if (data.meta && typeof (data.meta as Record<string, unknown>).title === "string") {
      document.title = (data.meta as Record<string, unknown>).title as string;
    }

    // Meta description
    if (data.meta && typeof (data.meta as Record<string, unknown>).description === "string") {
      const metaDesc = document.querySelector("meta[name='description']");
      if (metaDesc) {
        metaDesc.setAttribute("content", (data.meta as Record<string, unknown>).description as string);
      }
    }
  }, [data]);

  return null;
}
