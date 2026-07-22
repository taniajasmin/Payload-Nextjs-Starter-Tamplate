"use client";

import { useRef, useEffect, useState, useCallback } from "react";

interface UseSplitTextOptions {
  splitBy?: "char" | "word";
  className?: string;
}

export function useSplitText<T extends HTMLElement>(
  options: UseSplitTextOptions = {},
) {
  const { splitBy = "char", className = "" } = options;
  const ref = useRef<T>(null);
  const [isSplit, setIsSplit] = useState(false);

  const split = useCallback(() => {
    const el = ref.current;
    if (!el) return;

    const text = el.textContent || "";
    if (!text.trim()) return;

    // Store original text for screen readers
    const originalText = text;

    if (splitBy === "char") {
      const chars = text.split("").map(
        (char) =>
          `<span class="split-char ${className}" style="display:inline-block;overflow:hidden;vertical-align:bottom;">` +
          `<span class="split-char-inner" style="display:inline-block;transform:translateY(100%);">${char === " " ? "&nbsp;" : char}</span>` +
          `</span>`,
      );
      el.innerHTML =
        `<span class="sr-only">${originalText}</span>` +
        `<span aria-hidden="true">${chars.join("")}</span>`;
    } else {
      const words = text.split(/(\s+)/).map(
        (word) =>
          `<span class="split-word ${className}" style="display:inline-block;overflow:hidden;vertical-align:bottom;">` +
          `<span class="split-word-inner" style="display:inline-block;transform:translateY(100%);">${word}</span>` +
          `</span>`,
      );
      el.innerHTML =
        `<span class="sr-only">${originalText}</span>` +
        `<span aria-hidden="true">${words.join(" ")}</span>`;
    }

    setIsSplit(true);
  }, [splitBy, className]);

  useEffect(() => {
    split();
  }, [split]);

  return { ref, isSplit, reSplit: split };
}
