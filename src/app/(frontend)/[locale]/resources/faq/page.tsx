import type { Metadata } from "next";
import Script from "next/script";
import { getCachedPayload } from "@/lib/get-payload";
import type { FAQCategory } from "@/components/resources/faq/types";
import FAQClient from "@/components/resources/faq-client";

export const metadata: Metadata = {
  title: "FAQ — Simal Technologies | Frequently Asked Questions",
  description:
    "Find answers to frequently asked questions about Simal Technologies IT distribution, ordering, shipping, partnerships, products, and support services.",
  alternates: {
    canonical: "https://www.simalme.com/resources/faq",
  },
  openGraph: {
    type: "website",
    url: "https://www.simalme.com/resources/faq",
    title: "FAQ — Simal Technologies",
    description: "Frequently asked questions about IT distribution, ordering, and support.",
  },
};

/* ------------------------------------------------------------------
   Category display config — brief's 6 Quick-Help topics in order,
   plus Partnership as a trailing section (kept so no Q&A is lost).
   ------------------------------------------------------------------ */
const CATEGORY_KEYS: { key: string; label: string }[] = [
  { key: "orders", label: "Ordering & Pricing" },
  { key: "shipping", label: "Shipping & Delivery" },
  { key: "returns", label: "Returns & Warranty" },
  { key: "products", label: "Products & Brands" },
  { key: "general", label: "Company Information" },
  { key: "support", label: "Technical Support" },
];

const TRAILING_KEYS: { key: string; label: string }[] = [
  { key: "partnerships", label: "Partnership & Reseller" },
];

/* ------------------------------------------------------------------
   Fallback content (used only when the CMS is empty/unreachable)
   ------------------------------------------------------------------ */
const fallbackCategories: FAQCategory[] = [
  {
    category: "Ordering & Pricing",
    items: [
      { question: "What is the minimum order quantity (MOQ)?", answer: "MOQ varies by product category. Most computer accessories and components have low MOQs (5–10 units), while enterprise storage and networking equipment may require larger commitments. Your account manager will provide specific MOQ details for each product line." },
      { question: "How do I place a bulk order?", answer: "You can place bulk orders by contacting your dedicated account manager directly, or by submitting a sales inquiry through our website. We typically respond to sales inquiries within 4 hours during business hours and provide custom pricing for bulk quantities." },
    ],
  },
  {
    category: "Shipping & Delivery",
    items: [
      { question: "What are the delivery timelines?", answer: "UAE deliveries typically arrive within 1–3 business days. GCC deliveries take 3–7 business days. Africa and CIS deliveries take 7–14 business days depending on destination and customs clearance. Expedited shipping is available for urgent orders." },
    ],
  },
  {
    category: "Returns & Warranty",
    items: [
      { question: "What is your warranty policy?", answer: "All products are 100% genuine and covered by the manufacturer warranty — typically 2–5 years for storage products and 1–3 years for electronics. Warranty claims are handled through your account manager with replacement or repair per the manufacturer's terms." },
      { question: "How do returns work?", answer: "Damaged or incorrect items can be returned within 14 days of delivery. Contact your account manager with your order number and we will arrange a replacement or refund." },
    ],
  },
  {
    category: "Products & Brands",
    items: [
      { question: "Are all products genuine and covered by warranty?", answer: "Yes, all products are 100% genuine and sourced directly from manufacturers or authorized channels. Warranty coverage varies by brand and product — typically 2–5 years for storage products and 1–3 years for electronics." },
      { question: "How can I find the right product for my needs?", answer: "Contact your account manager for personalized product recommendations, browse our product catalog on the website, or reach out to our sales team who can help match the right products to your specific requirements." },
    ],
  },
  {
    category: "Company Information",
    items: [
      { question: "What is Simal Technologies?", answer: "Simal Technologies Middle East LLC is a premier IT distributor headquartered in Dubai, UAE, delivering enterprise-grade hardware, accessories, and software solutions across the Middle East, Africa, CIS, and GCC regions. Founded in 2002, we are authorized distributors for 20+ global brands." },
      { question: "Which regions does Simal Technologies serve?", answer: "We serve the Middle East (UAE, Saudi Arabia, Qatar, Kuwait, Bahrain, Oman), Africa (Egypt, Nigeria, Kenya, South Africa), CIS (Kazakhstan, Uzbekistan, Azerbaijan), and broader GCC region from our Dubai warehouse and logistics hub." },
    ],
  },
  {
    category: "Technical Support",
    items: [
      { question: "Do you offer installation and maintenance services?", answer: "Yes. Beyond distribution we offer installation, configuration, and Annual Maintenance Contracts (AMC) for enterprise deployments. Your account manager can tailor a support package to your environment." },
      { question: "How do I get technical support?", answer: "Reach our technical support team via the contact page, email, or phone. Enterprise clients receive priority response through a dedicated support channel." },
    ],
  },
];

/* ------------------------------------------------------------------
   Helpers
   ------------------------------------------------------------------ */
function lexicalToText(node: unknown): string {
  if (!node || typeof node !== "object") return "";
  const n = node as Record<string, unknown>;
  if (n.root && typeof n.root === "object") return lexicalToText(n.root);
  if (n.type === "text" && typeof n.text === "string") return n.text;
  if (Array.isArray(n.children)) {
    return (n.children as unknown[]).map(lexicalToText).join("");
  }
  return "";
}

/* ------------------------------------------------------------------
   FAQ Page
   ------------------------------------------------------------------ */
interface Props {
  params: Promise<{ locale: string }>;
}

export default async function FAQPage({ params }: Props) {
  const { locale } = await params;

  let faqEntries: Array<{
    category: string;
    question: string;
    answer: unknown;
  }> = [];

  try {
    const payload = await getCachedPayload();
    const result = await payload.find({
      collection: "faq-entries",
      locale: locale as "all" | "en" | "ar" | "fr" | "ru" | undefined,
      draft: false,
      overrideAccess: true,
      where: { active: { equals: true } },
      sort: "order",
      limit: 200,
    });
    faqEntries = result.docs as unknown as Array<{
      category: string;
      question: string;
      answer: unknown;
    }>;
  } catch {
    // CMS unavailable — use fallback below
  }

  const useCMS = faqEntries.length > 0;

  const groupedCMS: FAQCategory[] = [...CATEGORY_KEYS, ...TRAILING_KEYS]
    .map(({ key, label }) => ({
      category: label,
      items: faqEntries
        .filter((e) => e.category === key)
        .map((e) => ({
          question: e.question,
          answer: lexicalToText(e.answer),
        })),
    }))
    .filter((cat) => cat.items.length > 0);

  const categories: FAQCategory[] = useCMS ? groupedCMS : fallbackCategories;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: categories.flatMap((cat) =>
      cat.items.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      }))
    ),
  };

  return (
    <>
      <Script
        id="faq-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <FAQClient categories={categories} />
    </>
  );
}
