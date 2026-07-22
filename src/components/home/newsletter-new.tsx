"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  Mail,
  User,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

/* ─── Types ─────────────────────────────────────────────────────── */

interface NewsletterProps {
  badge?: string;
  heading?: string;
  subtext?: string;
  emailPlaceholder?: string;
  namePlaceholder?: string;
  submitLabel?: string;
  successTitle?: string;
  successMessage?: string;
}

/* ─── Component ─────────────────────────────────────────────────── */

export default function NewsletterNew({
  badge = "Stay Informed",
  heading = "Get the Latest in IT Distribution & ERP",
  subtext = "Subscribe for product updates, industry insights, and exclusive offers delivered to your inbox.",
  emailPlaceholder = "Email address *",
  namePlaceholder = "Name (optional)",
  submitLabel = "Subscribe",
  successTitle = "Thank you for subscribing!",
  successMessage = "Please check your email to confirm your subscription.",
}: NewsletterProps = {}) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [consent, setConsent] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@") || !consent) return;
    setIsSubmitted(true);
  };

  return (
    <section
      id="newsletter"
      className="relative overflow-hidden bg-slate-950"
    >
      {/* Background image */}
      <Image
        src="/assets/images/homepage/newsletter-workspace.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-50"
        priority={false}
      />
      {/* Dark overlay for text contrast */}
      <div className="pointer-events-none absolute inset-0 bg-slate-950/60" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        {/* ── Section identifier bar ──────────────────────────── */}
        <div className="mb-10 flex items-center gap-4 border-b border-white/40 pb-4">
          <span className="text-xs font-medium uppercase tracking-widest text-white">
            Mailing List
          </span>
          <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-primary">
            <Sparkles size={12} />
            {badge}
          </span>
        </div>

        {/* ── Main content ──────────────────────────────────── */}
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-20">
          {/* Left: copy */}
          <div>
            {!isSubmitted ? (
              <div>
                <span className="mb-4 inline-block border-l-2 border-primary pl-3 text-xs font-bold uppercase tracking-widest text-primary">
                  {badge}
                </span>

                <h2 className="max-w-2xl text-3xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-4xl lg:text-5xl">
                  {heading}
                </h2>

                <p className="mt-4 max-w-xl text-sm leading-relaxed text-white">
                  {subtext}
                </p>

                <div className="mt-6 flex items-center gap-2 text-xs text-white">
                  <ShieldCheck size={14} className="text-white" />
                  No spam, unsubscribe anytime.{" "}
                  <Link
                    href="/contact"
                    className="underline underline-offset-2 transition-colors hover:text-white/80"
                  >
                    Read our Privacy Policy
                  </Link>
                  .
                </div>
              </div>
            ) : (
              <div>
                <CheckCircle2 size={32} className="text-white" />
                <h3 className="mt-4 text-2xl font-extrabold leading-[1.1] tracking-tight text-white md:text-3xl">
                  {successTitle}
                </h3>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-white">
                  {successMessage}
                </p>
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setEmail("");
                    setName("");
                    setConsent(false);
                  }}
                  className="mt-5 text-sm font-semibold text-white underline underline-offset-4 transition-colors hover:text-white/80"
                >
                  Subscribe another address
                </button>
              </div>
            )}
          </div>

          {/* Right: form */}
          {!isSubmitted && (
            <div>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="relative">
                  <User
                    size={16}
                    className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 text-white"
                  />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={namePlaceholder}
                    className="h-12 w-full border-b-2 border-white/40 bg-transparent pl-9 pr-4 text-sm text-white outline-none transition-colors placeholder:text-white/70 focus:border-white"
                  />
                </div>

                <div className="relative">
                  <Mail
                    size={16}
                    className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 text-white"
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={emailPlaceholder}
                    required
                    className="h-12 w-full border-b-2 border-white/40 bg-transparent pl-9 pr-4 text-sm text-white outline-none transition-colors placeholder:text-white/70 focus:border-white"
                  />
                </div>

                {/* Consent checkbox */}
                <label className="flex cursor-pointer items-start gap-3 pt-2 text-xs leading-relaxed text-white">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    required
                    className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer border-white/40 bg-white/10 accent-white"
                  />
                  <span>
                    I agree to receive marketing emails and accept the{" "}
                    <Link
                      href="/contact"
                      className="font-medium text-primary underline underline-offset-2 transition-colors hover:text-primary/80"
                    >
                      Privacy Policy
                    </Link>
                    .
                  </span>
                </label>

                <button
                  type="submit"
                  disabled={!consent || !email}
                  className="flex h-12 w-full items-center justify-center gap-2 bg-primary text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  {submitLabel}
                  <ArrowRight size={15} />
                </button>

                <p className="flex items-center justify-center gap-2 pt-1 text-xs text-white md:hidden">
                  <ShieldCheck size={12} />
                  No spam, unsubscribe anytime.
                </p>
              </form>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
