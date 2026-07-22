/* Shared types for the redesigned FAQ page.
   Defined here so the server page.tsx, the faq-client orchestrator,
   and the co-located section components all agree on shape. */

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQCategory {
  category: string;
  items: FAQItem[];
}

/** A curated, clickable popular question that links back into a section. */
export interface PopularQuestion {
  question: string;
  answer: string;
  /** Display category name, e.g. "Ordering & Pricing" */
  category: string;
  /** Anchor id of the owning section (matches getSectionId(category)) */
  sectionId: string;
  /** Index of the item within its category — used to auto-open it */
  itemIndex: number;
}
