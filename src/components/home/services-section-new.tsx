"use client";

import Link from "next/link";
import { Boxes, ArrowRight } from "lucide-react";
import { SectionShell } from "@/components/ui/section-shell";
import { SectionHeading } from "@/components/ui/section-heading";
import { iconNameToComponent } from "@/components/layout/navigation-data";
import { serviceHref, type ServiceSummary } from "@/lib/services-config";

function ServiceCard({ service }: { service: ServiceSummary }) {
  const Icon = iconNameToComponent[service.icon || ""] ?? Boxes;
  const href = serviceHref(service);

  return (
    <Link
      href={href}
      className="group block h-full border border-border bg-card p-6 transition-colors hover:border-primary/50"
    >
      <div className="mb-4 inline-flex h-11 w-11 items-center justify-center bg-primary text-primary-foreground">
        <Icon size={22} strokeWidth={1.8} />
      </div>

      <h3 className="text-base font-semibold text-foreground">
        {service.title}
      </h3>

      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {service.tagline ||
          "Professional IT service — delivered with expertise."}
      </p>

      <span className="mt-4 inline-block bg-primary/10 px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
        {service.family === "software-erp" ? "Software & ERP" : "IT Services"}
      </span>

      <div className="mt-4 flex items-center gap-1.5 border-t border-border pt-3 text-sm font-medium text-foreground transition-colors group-hover:text-primary">
        Learn More
        <ArrowRight
          size={14}
          className="transition-transform duration-200 group-hover:translate-x-1"
        />
      </div>
    </Link>
  );
}

interface ServicesSectionProps {
  badge?: string;
  heading?: string;
  subtext?: string;
  services?: ServiceSummary[];
}

export default function ServicesSectionNew({
  badge = "Services",
  heading = "End-to-End IT Services",
  subtext,
  services = [],
}: ServicesSectionProps) {
  const hasServices = services.length > 0;

  return (
    <SectionShell id="services-section" variant="default">
      <SectionHeading
        eyebrow={badge}
        title={heading}
        subtitle={subtext}
        align="center"
      />

      {hasServices ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.id || service.slug} service={service} />
          ))}
        </div>
      ) : (
        <div className="border border-border bg-card px-6 py-12 text-center">
          <Boxes className="mx-auto mb-3 block text-muted-foreground/50" size={36} />
          <p className="text-sm text-muted-foreground">Service details coming soon.</p>
        </div>
      )}
    </SectionShell>
  );
}
