"use client";

import { SalesInquiryForm } from "@/components/contact/sales-inquiry-form";
import Link from "next/link";
import { ArrowLeft, Phone, MessageCircle } from "lucide-react";

export function SalesInquiryPageContent() {
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
              B2B Sales
            </span>
            <h1 className="text-3xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-4xl lg:text-5xl">
              Sales Inquiry
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-300">
              Looking to purchase IT hardware from Simal Technologies? Complete this form and our sales team will respond with pricing, stock availability, and order options within 4 business hours.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="tel:+97143930507"
                className="inline-flex items-center gap-2 bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                <Phone className="h-4 w-4" /> +971 4 393 0507
              </a>
              <a
                href="https://bit.ly/4fQcG76"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Form section */}
      <section className="relative overflow-hidden bg-background">
        <div className="pointer-events-none absolute inset-0 " />

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="max-w-3xl mx-auto">
            <div className="flex flex-col border border-border bg-card">
              <div className="border-b border-border bg-muted px-6 md:px-8 py-5">
                <h2 className="text-xl font-extrabold leading-[1.1] tracking-tight text-foreground">
                  Request Pricing & Availability
                </h2>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  This form is for B2B customers — resellers, system integrators, VARs, corporate IT departments, and government entities.
                </p>
              </div>
              <div className="p-6 md:p-8">
                <SalesInquiryForm />
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="text-xs text-muted-foreground">
                Not a B2B customer?{" "}
                <Link href="/contact" className="font-semibold text-primary hover:underline">
                  Use our general inquiry form
                </Link>
                {" "}or{" "}
                <Link href="/contact/support" className="font-semibold text-primary hover:underline">
                  submit a support request
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
