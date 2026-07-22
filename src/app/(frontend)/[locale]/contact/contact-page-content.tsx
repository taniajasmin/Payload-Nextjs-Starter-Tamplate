"use client";

import { useLivePreview } from "@/hooks/use-live-preview";
import { mediaUrl } from "@/lib/media-url";
import { ContactForm } from "@/components/contact/contact-form";
import { GoogleMapEmbed } from "@/components/contact/google-map-embed";
import {
  MapPin, Clock, Phone, Mail, HeadphonesIcon, ArrowRight, AlertTriangle,
} from "lucide-react";
import Link from "next/link";

/* ------------------------------------------------------------------
   Types
   ------------------------------------------------------------------ */

interface HeroData {
  headline?: string;
  description?: string;
}

interface OfficeData {
  title?: string;
  country?: string;
  addressLabel?: string;
  address?: string;
  hoursLabel?: string;
  hours?: string;
  contactLabel?: string;
  phone?: string;
  email?: string;
}

interface FormSectionData {
  title?: string;
  subtitle?: string;
}

/* ------------------------------------------------------------------
   Fallback data
   ------------------------------------------------------------------ */

const fallbackHero: HeroData = {
  headline: "Get in Touch",
  description:
    "Whether you're a reseller looking for IT hardware, a business exploring ERP solutions, or a customer with a support inquiry — our team is ready to assist.",
};

const fallbackOffice: OfficeData = {
  title: "Simal Technologies Middle East LLC",
  country: "United Arab Emirates",
  addressLabel: "Head Office",
  address: "Office No: 201, Dar Al Riffa Building\nKhalid Bin Al Waleed Road, Bur Dubai\nPO Box: 49740, Dubai, UAE",
  hoursLabel: "Business Hours",
  hours: "Mon – Sat: 9:00 AM – 8:00 PM (GST)\nSun: Closed",
  contactLabel: "Contact",
  phone: "+971 4 393 0507",
  email: "info@simalme.com",
};

/* ------------------------------------------------------------------
   JSON-LD
   ------------------------------------------------------------------ */

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact Simal Technologies",
  url: "https://www.simalme.com/contact",
  mainEntity: {
    "@type": "Organization",
    name: "Simal Technologies Middle East LLC",
    telephone: "+971-4-393-0507",
    email: "info@simalme.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Office No: 201, Dar Al Riffa Building, Khalid Bin Al Waleed Road",
      addressLocality: "Bur Dubai",
      addressRegion: "Dubai",
      addressCountry: "AE",
    },
  },
};

/* ------------------------------------------------------------------
   Page Component
   ------------------------------------------------------------------ */

export function ContactPageContent({
  initialData,
}: {
  initialData: Record<string, unknown>;
}) {
  const data = useLivePreview(initialData);

  const hero = data.hero as HeroData | undefined;
  const heroHeadline = hero?.headline || fallbackHero.headline;
  const heroDescription = hero?.description || fallbackHero.description;
  const heroBg = data.heroBackgroundImage as { url?: string } | undefined;

  const office = data.office as OfficeData | undefined;
  const address = office?.address || fallbackOffice.address;
  const phone = office?.phone || fallbackOffice.phone;
  const email = office?.email || fallbackOffice.email;
  const mapEmbedUrl = data.mapEmbedUrl as string | undefined;

  const formSection = data.formSection as FormSectionData | undefined;

  const phoneHref = phone ? `tel:${phone.replace(/\s/g, "")}` : "#";
  const whatsappHref = "https://bit.ly/4fQcG76";

  return (
    <div className="flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ────────────────────────────────────────────────────────────────
          Hero — dark island pattern
          ──────────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-slate-950">
        <img
          src={mediaUrl(heroBg?.url || "/assets/images/contact/hero-bg.jpg")}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-slate-950/85 via-slate-950/70 to-primary/25" />

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="max-w-2xl">
            {/* Enterprise badge */}
            <span className="mb-4 inline-block border-l-2 border-primary pl-3 text-xs font-bold uppercase tracking-widest text-primary">
              Contact Us
            </span>

            <h1 className="text-3xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-4xl lg:text-5xl">
              {heroHeadline}
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-300">
              {heroDescription}
            </p>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────────
          Contact Cards
          ──────────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-background">
        <div className="pointer-events-none absolute inset-0 " />

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* Phone */}
            <a
              href={phoneHref}
              className="flex h-full flex-col border border-border bg-card p-6 md:p-7"
            >
              <Phone className="mb-4 h-5 w-5 text-primary" strokeWidth={1.6} />
              <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Call Us
              </div>
              <div className="mt-1 text-base font-bold text-foreground">
                {phone}
              </div>
              <div className="mt-1 text-xs text-muted-foreground">
                Sat – Thu, 9 AM – 8 PM GST
              </div>
            </a>

            {/* WhatsApp */}
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-full flex-col border border-border bg-card p-6 md:p-7"
            >
              <svg className="mb-4 h-5 w-5 text-primary" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
              </svg>
              <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                WhatsApp
              </div>
              <div className="mt-1 text-base font-bold text-foreground">
                +971 54 308 8655
              </div>
              <div className="mt-1 text-xs text-muted-foreground">
                Quick chat for inquiries
              </div>
            </a>

            {/* Email */}
            <a
              href={`mailto:${email}`}
              className="flex h-full flex-col border border-border bg-card p-6 md:p-7"
            >
              <Mail className="mb-4 h-5 w-5 text-primary" strokeWidth={1.6} />
              <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Email Us
              </div>
              <div className="mt-1 text-base font-bold text-foreground truncate">
                {email}
              </div>
              <div className="mt-1 text-xs text-muted-foreground">
                We reply within 24 hours
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────────
          Main: Form + Office Sidebar
          ──────────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-background">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background via-transparent to-muted/30" />

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 pb-12 lg:pb-16">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Left: Contact Form */}
            <div className="lg:col-span-2">
              <div className="flex h-full flex-col border border-border bg-card">
                <div className="border-b border-border bg-muted px-6 md:px-8 py-5">
                  <h2 className="text-xl font-extrabold leading-[1.1] tracking-tight text-foreground">
                    {formSection?.title || "Send Us a Message"}
                  </h2>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {formSection?.subtitle || "Fill out the form and we'll get back to you within 24 hours."}
                  </p>
                </div>
                <div className="p-6 md:p-8">
                  <ContactForm />
                </div>
              </div>
            </div>

            {/* Right: Office Info Sidebar */}
            <div className="flex flex-col gap-6">
              {/* Office card */}
              <div className="flex flex-col border border-border bg-card">
                <div className="p-5 md:p-6 space-y-5">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 shrink-0 text-primary" strokeWidth={1.6} />
                    <div>
                      <h3 className="text-base font-extrabold leading-[1.1] tracking-tight text-foreground">
                        {office?.title || fallbackOffice.title}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {office?.country || fallbackOffice.country}
                      </p>
                    </div>
                  </div>

                  <div className="text-sm leading-relaxed text-muted-foreground whitespace-pre-line">
                    {address}
                  </div>

                  <div className="space-y-2 text-sm">
                    <a href={phoneHref} className="flex items-center gap-2 text-foreground transition-colors hover:text-primary">
                      <Phone className="h-4 w-4 text-muted-foreground" strokeWidth={1.6} /> {phone}
                    </a>
                    <a href={`mailto:${email}`} className="flex items-center gap-2 text-foreground transition-colors hover:text-primary">
                      <Mail className="h-4 w-4 text-muted-foreground" strokeWidth={1.6} /> {email}
                    </a>
                  </div>

                  <div className="border-t border-border pt-4">
                    <div className="flex items-start gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" strokeWidth={1.6} />
                      <div className="text-sm leading-relaxed text-muted-foreground whitespace-pre-line">
                        {office?.hours || fallbackOffice.hours}
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Sales CTA */}
              <Link
                href="/contact/sales-inquiry"
                className="flex items-center justify-between border border-border bg-card p-5 transition-colors hover:bg-muted group"
              >
                <div>
                  <p className="text-sm font-bold text-foreground">Sales Inquiry</p>
                  <p className="text-xs text-muted-foreground mt-0.5">B2B pricing & bulk orders</p>
                </div>
                <ArrowRight className="h-4 w-4 text-primary group-hover:translate-x-0.5 transition-transform" />
              </Link>

              {/* Support CTA */}
              <Link
                href="/contact/support"
                className="flex items-center justify-between border border-border bg-card p-5 transition-colors hover:bg-muted group"
              >
                <div>
                  <p className="text-sm font-bold text-foreground">Technical Support</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Warranty, RMA & repairs</p>
                </div>
                <ArrowRight className="h-4 w-4 text-primary group-hover:translate-x-0.5 transition-transform" />
              </Link>

              {/* Emergency callout */}
              <div className="border border-border bg-card p-5">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-4 w-4 text-primary" strokeWidth={1.6} />
                  <p className="text-xs font-bold uppercase tracking-wider text-foreground">Urgent Matters</p>
                </div>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  For time-sensitive issues, call{" "}
                  <a href={phoneHref} className="font-semibold text-primary underline">+971 4 393 0507</a>
                  {" "}or WhatsApp{" "}
                  <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary underline">+971 54 308 8655</a>
                  {" "}with &ldquo;URGENT&rdquo; as the first word.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────────
          Full-Width Map
          ──────────────────────────────────────────────────────────────── */}
      <section className="w-full bg-muted">
        <GoogleMapEmbed
          src={mapEmbedUrl}
          title="Simal Technologies — Dubai Head Office"
          height="450px"
        />
      </section>
    </div>
  );
}
