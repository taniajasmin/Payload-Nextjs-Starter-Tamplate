"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

const localeLabels: Record<string, string> = {
  en: "English",
  ar: "العربية",
  fr: "Français",
  ru: "Русский",
};

export function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("localeSwitcher");

  const handleChange = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className="relative inline-block">
      <label htmlFor="locale-switcher" className="sr-only">
        {t("label")}
      </label>
      <select
        id="locale-switcher"
        value={locale}
        onChange={(e) => handleChange(e.target.value)}
        className="appearance-none bg-transparent border border-neutral-200 rounded-md px-3 py-1.5 pr-8 text-[length:var(--font-body)] focus:outline-none focus:ring-2 focus:ring-foreground/20 cursor-pointer"
      >
        {routing.locales.map((loc) => (
          <option key={loc} value={loc}>
            {localeLabels[loc] || loc}
          </option>
        ))}
      </select>
      <svg
        className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  );
}
