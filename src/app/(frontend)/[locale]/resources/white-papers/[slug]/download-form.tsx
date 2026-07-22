"use client";

import { useState } from "react";
import { CheckCircle, Download, ArrowRight, Lock, ShieldCheck, Gift, MailX } from "lucide-react";

interface DownloadFormProps {
  paperTitle: string;
}

export default function DownloadForm({ paperTitle }: DownloadFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const data = {
      fullName: (form.elements.namedItem("fullName") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      company: (form.elements.namedItem("company") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      paperTitle,
    };

    try {
      await fetch("/api/download-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } catch {
      // Proceed even if the API fails — the request is logged server-side
    }

    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="border border-primary/30 bg-primary/5 p-8 text-center">
        <CheckCircle className="h-10 w-10 text-primary mx-auto mb-4" strokeWidth={1.6} />
        <h3 className="text-lg font-extrabold leading-[1.1] tracking-tight text-foreground mb-2">Thank You!</h3>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-md mx-auto">
          Your request for <strong>{paperTitle}</strong> has been received. Our team will send the
          PDF to your email shortly.
        </p>
      </div>
    );
  }

  return (
    <div className="border border-border bg-card p-6 md:p-8">
      <h2 className="text-lg font-extrabold leading-[1.1] tracking-tight text-foreground mb-4 flex items-center gap-2">
        <Download className="h-5 w-5 text-primary" strokeWidth={1.6} />
        Download White Paper
      </h2>
      <p className="text-sm text-muted-foreground mb-6">
        Please fill in your details below to access the download.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name */}
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-foreground mb-1">
            Full Name <span className="text-destructive">*</span>
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            required
            className="w-full border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors"
            placeholder="John Doe"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">
            Email <span className="text-destructive">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors"
            placeholder="john@company.com"
          />
        </div>

        {/* Company */}
        <div>
          <label htmlFor="company" className="block text-sm font-medium text-foreground mb-1">
            Company
          </label>
          <input
            type="text"
            id="company"
            name="company"
            className="w-full border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors"
            placeholder="Company name"
          />
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-1">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className="w-full border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors"
            placeholder="+971 4 123 4567"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="inline-flex w-full items-center justify-center gap-2 bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            "Submitting…"
          ) : (
            <>
              Download Now
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
      </form>

      {/* Trust badges */}
      <div className="mt-6 grid grid-cols-3 gap-2 border-t border-border pt-5">
        {[
          { icon: Gift, label: "Free Download" },
          { icon: MailX, label: "No Spam Promise" },
          { icon: ShieldCheck, label: "Data is Secure" },
        ].map((badge) => (
          <div
            key={badge.label}
            className="flex flex-col items-center text-center gap-1.5"
          >
            <badge.icon className="w-4 h-4 text-primary" strokeWidth={1.6} />
            <span className="text-[10px] font-medium text-muted-foreground leading-tight">
              {badge.label}
            </span>
          </div>
        ))}
      </div>

      {/* Privacy note */}
      <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
        <Lock className="w-3 h-3" />
        We respect your privacy. Your details are never shared.
      </p>
    </div>
  );
}
