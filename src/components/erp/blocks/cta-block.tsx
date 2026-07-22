"use client";

import Link from "next/link";
import { ArrowRight, Phone, Mail } from "lucide-react";
import { SectionHeading } from "./utils";

interface CtaBlockData {
  heading?: string;
  description?: string;
  phoneLabel?: string;
  phoneNumber?: string;
  emailLabel?: string;
  emailAddress?: string;
  demoLinkLabel?: string;
  demoLinkUrl?: string;
}

export function CtaBlock({ data }: { data: CtaBlockData }) {
  return (
    <section className="relative overflow-hidden bg-slate-950">
      <div className="pointer-events-none absolute inset-0 bg-slate-950/80" />
      <div className="container relative z-10 mx-auto px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-2xl text-center">
          <SectionHeading
            heading={data.heading}
            description={data.description}
            tone="light"
          />
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
            {data.phoneNumber && (
              <a
                href={`tel:${data.phoneNumber}`}
                className="inline-flex items-center gap-2 text-white transition-colors hover:text-primary"
              >
                <Phone className="h-4 w-4" />
                <span className="text-sm">
                  {data.phoneLabel || "Call"}: {data.phoneNumber}
                </span>
              </a>
            )}
            {data.emailAddress && (
              <a
                href={`mailto:${data.emailAddress}`}
                className="inline-flex items-center gap-2 text-white transition-colors hover:text-primary"
              >
                <Mail className="h-4 w-4" />
                <span className="text-sm">
                  {data.emailLabel || "Email"}: {data.emailAddress}
                </span>
              </a>
            )}
            {data.demoLinkLabel && data.demoLinkUrl && (
              <Link
                href={data.demoLinkUrl}
                className="inline-flex items-center gap-2 bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                {data.demoLinkLabel}
                <ArrowRight className="h-4 w-4" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
