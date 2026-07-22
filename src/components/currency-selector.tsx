"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

type Currency = "AED" | "USD" | "EUR" | "SAR";

interface CurrencySelectorProps {
  defaultCurrency?: Currency;
}

export function CurrencySelector({ defaultCurrency = "AED" }: CurrencySelectorProps) {
  const [currency, setCurrency] = useState<Currency>(defaultCurrency);
  const t = useTranslations("currency");

  const handleChange = (newCurrency: Currency) => {
    setCurrency(newCurrency);
    // Store preference for server-side and client-side consistency
    document.cookie = `currency=${newCurrency}; path=/; max-age=${60 * 60 * 24 * 365}`;
    window.dispatchEvent(new CustomEvent("currencychange", { detail: newCurrency }));
  };

  const currencies: Currency[] = ["AED", "USD", "EUR", "SAR"];

  return (
    <div className="relative inline-block">
      <label htmlFor="currency-selector" className="sr-only">
        {t("label")}
      </label>
      <select
        id="currency-selector"
        value={currency}
        onChange={(e) => handleChange(e.target.value as Currency)}
        className="appearance-none bg-transparent border border-neutral-200 rounded-md px-3 py-1.5 pr-8 text-[length:var(--font-body)] focus:outline-none focus:ring-2 focus:ring-foreground/20 cursor-pointer"
      >
        {currencies.map((curr) => (
          <option key={curr} value={curr}>
            {curr}
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
