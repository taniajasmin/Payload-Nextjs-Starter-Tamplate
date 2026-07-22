"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { mediaUrl } from "@/lib/media-url";
import {
  HelpCircle, Sparkles, Check, Plus, Minus,
  MessageCircle, FileText, Mail, ArrowRight,
} from "lucide-react";

import { getCategoryMeta } from "./faq/faq-meta";
import type { FAQCategory } from "./faq/types";

/* ------------------------------------------------------------------
   Hero promise checklist
   ------------------------------------------------------------------ */
const PROMISES = [
  "Instant answers across every category",
  "Guidance verified by enterprise specialists",
  "Covers orders, shipping, warranty & support",
];

/* ------------------------------------------------------------------
   "Still Need Help?" contact cards
   ------------------------------------------------------------------ */
const HELP_CARDS = [
  {
    icon: MessageCircle,
    title: "Contact Us",
    body: "Get in touch with our team for any inquiries.",
    cta: "Contact Us",
    href: "/contact",
  },
  {
    icon: FileText,
    title: "Request a Quote",
    body: "Request a quote tailored to your project needs.",
    cta: "Get Quote",
    href: "/contact",
  },
  {
    icon: Mail,
    title: "Email Support",
    body: "Email our support specialists directly.",
    cta: "Email Us",
    href: "mailto:support@simalme.com",
  },
];

const ALL_QUESTIONS = "All Questions";

/* ------------------------------------------------------------------
   Main Component
   ------------------------------------------------------------------ */
interface Props {
  categories: FAQCategory[];
}

export default function FAQClient({ categories }: Props) {
  const [activeTab, setActiveTab] = useState<string>(ALL_QUESTIONS);
  const [openKey, setOpenKey] = useState<string | null>(null);

  /* Tabs: "All Questions" + each non-empty category */
  const tabs = useMemo(
    () => [ALL_QUESTIONS, ...categories.map((c) => c.category)],
    [categories]
  );

  /* Flatten all items, tagged with their category + original index */
  const flat = useMemo(
    () =>
      categories.flatMap((c) =>
        c.items.map((it, idx) => ({
          question: it.question,
          answer: it.answer,
          category: c.category,
          idx,
        }))
      ),
    [categories]
  );

  const visible =
    activeTab === ALL_QUESTIONS
      ? flat
      : flat.filter((it) => it.category === activeTab);

  const toggle = (key: string) =>
    setOpenKey((prev) => (prev === key ? null : key));

  const heroBgUrl = mediaUrl("/assets/images/faq/faq.avif");

  return (
    <div className="flex flex-col">
      {/* ================================================================
          1. HERO — dark island, 2-col (copy + promise)
          ================================================================ */}
      <section className="relative w-full py-28 md:py-36 overflow-hidden bg-slate-950">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{ backgroundImage: `url(${heroBgUrl})` }}
        />
        <div className="absolute inset-0 bg-slate-950/80" />

        <div className="container-primary relative z-10">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="max-w-3xl lg:col-span-7">
              <span className="mb-4 inline-block border-l-2 border-primary pl-3 text-xs font-bold uppercase tracking-widest text-primary">
                Help Center
              </span>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight text-white">
                Frequently Asked{" "}
                <span className="text-primary">Questions</span>
              </h1>
              <p className="mt-5 text-lg md:text-xl text-white/80 leading-relaxed max-w-2xl">
                Find answers to common questions about our products, services,
                ordering, partnerships, warranty, and technical support.
              </p>
            </div>

            <div className="lg:col-span-5">
              <div className="lg:border-l lg:border-white/15 lg:pl-10">
                <span className="mb-4 inline-block border-l-2 border-primary pl-3 text-xs font-bold uppercase tracking-widest text-primary">
                  Our Promise
                </span>
                <div className="mt-6 h-px bg-white/20" />
                <ul className="mt-6 space-y-3">
                  {PROMISES.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-white/80">
                      <span className="mt-0.5 shrink-0">
                        <Check className="w-4 h-4 text-primary" strokeWidth={1.6} />
                      </span>
                      <span className="text-sm leading-relaxed">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          2. BODY — category tabs + flat accordion list
          ================================================================ */}
      <section className="relative overflow-hidden bg-background">
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          {/* Section identifier bar */}
          <div className="mb-8 flex items-center gap-4 border-b pb-4">
            <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Resources
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
              FAQ
            </span>
          </div>

          {/* Category filter tabs */}
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {tabs.map((t) => {
              const active = activeTab === t;
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => setActiveTab(t)}
                  className={`px-4 py-2 text-sm font-semibold transition-colors ${
                    active
                      ? "bg-primary text-primary-foreground"
                      : "border border-border text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  {t}
                </button>
              );
            })}
          </div>

          {/* Flat accordion list */}
          <div className="space-y-4 max-w-4xl mx-auto">
            {visible.map((it) => {
              const key = `${it.category}-${it.idx}`;
              const open = openKey === key;
              const { icon: Icon } = getCategoryMeta(it.category);
              return (
                <div
                  key={key}
                  className={`border bg-card transition-colors overflow-hidden ${
                    open ? "border-primary/50" : "border-border"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggle(key)}
                    aria-expanded={open}
                    className="w-full px-6 py-5 flex items-center justify-between text-left gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset"
                  >
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      <span className="flex-shrink-0 w-10 h-10 bg-primary flex items-center justify-center text-primary-foreground">
                        <Icon className="w-5 h-5" strokeWidth={1.6} />
                      </span>
                      <span className="text-sm md:text-base font-semibold text-foreground flex-1 min-w-0">
                        {it.question}
                      </span>
                    </div>
                    <span
                      className={`flex-shrink-0 w-8 h-8 flex items-center justify-center transition-colors ${
                        open
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {open ? (
                        <Minus className="w-4 h-4" />
                      ) : (
                        <Plus className="w-4 h-4" />
                      )}
                    </span>
                  </button>
                  <div
                    className={`grid transition-all duration-300 ${
                      open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-6 pb-5 pl-20 text-sm text-muted-foreground leading-relaxed border-t border-border pt-4">
                        {it.answer}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {visible.length === 0 && (
              <div className="text-center py-16 text-muted-foreground">
                No questions in this category yet.
              </div>
            )}
          </div>
        </div>

        {/* ================================================================
            3. STILL NEED HELP — 3 contact cards
            ================================================================ */}
        <section className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 pb-16 lg:pb-24">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <span className="mb-4 inline-block border-l-2 border-primary pl-3 text-xs font-bold uppercase tracking-widest text-primary">
              Support
            </span>
            <h2 className="text-3xl font-extrabold leading-[1.1] tracking-tight text-foreground sm:text-4xl">
              Still Need Help?
            </h2>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              Can&apos;t find what you&apos;re looking for? Our support team is
              here to help you.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {HELP_CARDS.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.title}
                  className="border border-border bg-card p-6 md:p-8 text-center flex flex-col items-center"
                >
                  <span className="inline-flex items-center justify-center w-14 h-14 bg-primary text-primary-foreground mb-4">
                    <Icon className="w-7 h-7" strokeWidth={1.6} />
                  </span>
                  <h3 className="text-base font-extrabold text-foreground mb-1">
                    {card.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                    {card.body}
                  </p>
                  <Link
                    href={card.href}
                    className="inline-flex items-center gap-2 bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                  >
                    {card.cta}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              );
            })}
          </div>
        </section>
      </section>
    </div>
  );
}
