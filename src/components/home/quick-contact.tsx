"use client";

import {
  Phone,
  Mail,
  MessageCircle,
  ArrowRight,
  Clock,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

/* ─── Types ─────────────────────────────────────────────────────── */

interface CMSContact {
  label?: string;
  value?: string;
  href?: string;
  cta?: string;
  iconType?: "phone" | "whatsapp" | "email";
}

interface QuickContactProps {
  badge?: string;
  heading?: string;
  officeHours?: string;
  contacts?: CMSContact[];
}

interface ContactSpec {
  icon: LucideIcon;
  label: string;
  value: string;
  href: string;
  cta: string;
  ctaClass: string;
}

/* ─── Default contacts ──────────────────────────────────────────── */

const DEFAULT_CONTACTS: ContactSpec[] = [
  {
    icon: Phone,
    label: "Phone",
    value: "+971 4 393 0507",
    href: "tel:+97143930507",
    cta: "Call Now",
    ctaClass: "bg-primary text-primary-foreground hover:bg-primary/90",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "+971 54 308 8655",
    href: "https://wa.me/971543088655",
    cta: "Chat on WhatsApp",
    ctaClass: "bg-primary text-primary-foreground hover:bg-primary/90",
  },
  {
    icon: Mail,
    label: "Email",
    value: "info@simalme.com",
    href: "mailto:info@simalme.com",
    cta: "Send Email",
    ctaClass: "bg-primary text-primary-foreground hover:bg-primary/90",
  },
];

const DEFAULT_OFFICE_HOURS =
  "Mon-Fri: 9:00 AM – 8:00 PM | Sat: 9:00 AM – 3:00 PM | Sun: Holiday (GST/GMT+4)";

function toSpec(cms: CMSContact, i: number): ContactSpec {
  const fb = DEFAULT_CONTACTS[i] ?? DEFAULT_CONTACTS[0];
  const iconType = cms.iconType ?? (i === 0 ? "phone" : i === 1 ? "whatsapp" : "email");
  const iconMap: Record<string, LucideIcon> = {
    phone: Phone,
    whatsapp: MessageCircle,
    email: Mail,
  };
  const ctaMap: Record<string, string> = {
    phone: "bg-primary text-primary-foreground hover:bg-primary/90",
    whatsapp: "bg-primary text-primary-foreground hover:bg-primary/90",
    email: "bg-primary text-primary-foreground hover:bg-primary/90",
  };
  return {
    icon: iconMap[iconType] ?? Phone,
    label: cms.label || fb.label,
    value: cms.value || fb.value,
    href: cms.href || fb.href,
    cta: cms.cta || fb.cta,
    ctaClass: ctaMap[iconType] ?? ctaMap.phone,
  };
}

/* ─── Component ─────────────────────────────────────────────────── */

export function QuickContact({
  badge = "Quick Contact",
  heading = "Get in Touch Today",
  officeHours,
  contacts: cmsContacts,
}: QuickContactProps) {
  const displayContacts =
    cmsContacts && cmsContacts.length > 0
      ? cmsContacts.map((c, i) => toSpec(c, i))
      : DEFAULT_CONTACTS;

  return (
    <section
      id="quick-contact"
      className="relative overflow-hidden bg-background"
    >
      {/* Subtle top-to-bottom fade */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-muted/30 via-transparent to-background" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* ── Section identifier bar ──────────────────────────── */}
        <div className="mb-8 flex items-center gap-4 border-b pb-4">
          <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Contact
          </span>
          <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
            {badge}
          </span>
        </div>

        {/* ── Heading ────────────────────────────────────────── */}
        <span className="mb-4 inline-block border-l-2 border-primary pl-3 text-xs font-bold uppercase tracking-widest text-primary">
          {badge}
        </span>

        <h2 className="max-w-2xl text-3xl font-extrabold leading-[1.1] tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          {heading}
        </h2>

        <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
          Reach the Simal Technologies team directly — for quotes, product
          inquiries, partnerships, or post-sales support.
        </p>

        {/* ── Contact cards ──────────────────────────────────── */}
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {displayContacts.map((contact, i) => (
            <ContactCard key={`${contact.label}-${i}`} spec={contact} />
          ))}
        </div>

        {/* ── Office hours ───────────────────────────────────── */}
        <div className="mt-8 flex items-center gap-3 border border-border bg-card px-5 py-4">
          <Clock className="h-4 w-4 shrink-0 text-muted-foreground" strokeWidth={1.6} />
          <div className="text-xs text-muted-foreground">
            <span className="font-bold text-foreground">Office Hours:</span>{" "}
            {officeHours || DEFAULT_OFFICE_HOURS}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Card ──────────────────────────────────────────────────────── */

function ContactCard({ spec }: { spec: ContactSpec }) {
  const Icon = spec.icon;
  const isExternal =
    spec.href.startsWith("http") || spec.href.startsWith("https://");

  return (
    <div className="flex h-full flex-col border border-border bg-card p-6 md:p-7">
      <Icon className="mb-4 h-5 w-5 text-primary" strokeWidth={1.6} />

      <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
        {spec.label}
      </div>
      <div className="mt-1 text-base font-bold text-foreground">
        {spec.value}
      </div>

      <div className="mt-auto w-full pt-6">
        <a
          href={spec.href}
          {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          className={cn(
            "inline-flex w-full items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold transition-colors",
            spec.ctaClass,
          )}
        >
          {spec.cta}
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}

export default QuickContact;
