"use client";

import { SupportRequestForm } from "@/components/contact/support-request-form";
import Link from "next/link";
import { ArrowLeft, AlertCircle } from "lucide-react";

export function SupportRequestPageContent() {
  return (
    <div className="flex flex-col">
      {/* Hero — dark island pattern */}
      <section className="relative overflow-hidden bg-slate-950">
        <img
          src="/assets/images/contact/hero-bg.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-slate-950/85 via-slate-950/70 to-primary/25" />

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-sm text-slate-300 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Contact
          </Link>

          <div className="max-w-3xl">
            <span className="mb-4 inline-block border-l-2 border-primary pl-3 text-xs font-bold uppercase tracking-widest text-primary">
              Support
            </span>
            <h1 className="text-3xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-4xl lg:text-5xl">
              Technical Support & Warranty
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-300">
              Experiencing an issue with a product purchased from Simal Technologies? Complete this form to open a support ticket. Our technical team will respond within 4 business hours.
            </p>
          </div>
        </div>
      </section>

      {/* Pre-submission checklist */}
      <section className="relative overflow-hidden bg-muted">
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="max-w-3xl mx-auto">
            <div className="border border-border bg-card p-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" strokeWidth={1.6} />
                <div>
                  <h3 className="text-sm font-bold text-foreground">Before submitting, please check:</h3>
                  <ul className="mt-2 space-y-1.5 text-xs leading-relaxed text-muted-foreground">
                    <li>&#8226; Is the product within its warranty period? (Check your invoice for purchase date)</li>
                    <li>&#8226; Have you performed basic troubleshooting? (Refer to the product manual or FAQ)</li>
                    <li>&#8226; Do you have your original invoice/receipt ready? (Required for warranty claims)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Form section */}
      <section className="relative overflow-hidden bg-background">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background via-transparent to-muted/30" />

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="max-w-3xl mx-auto">
            <div className="flex flex-col border border-border bg-card">
              <div className="border-b border-border bg-muted px-6 md:px-8 py-5">
                <h2 className="text-xl font-extrabold leading-[1.1] tracking-tight text-foreground">
                  Support Request Form
                </h2>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  All fields marked with * are required. Providing complete information helps us resolve your issue faster.
                </p>
              </div>
              <div className="p-6 md:p-8">
                <SupportRequestForm />
              </div>
            </div>

            <div className="mt-8 border border-border bg-card p-6 text-center">
              <p className="text-sm text-muted-foreground">
                Not a Simal customer?{" "}
                <span className="font-semibold text-foreground">Contact the reseller you purchased from first — they are your first point of contact for warranty claims.</span>
              </p>
              <p className="mt-3 text-xs text-muted-foreground">
                <Link href="/contact" className="font-semibold text-primary hover:underline">
                  Back to Contact Page
                </Link>
                {" "}|{" "}
                <Link href="/contact/sales-inquiry" className="font-semibold text-primary hover:underline">
                  Sales Inquiry
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
