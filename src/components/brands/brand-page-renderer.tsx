"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ChevronRight, BadgeCheck } from "lucide-react";
import { RichText } from "@payloadcms/richtext-lexical/react";
import {
  ScrollReveal,
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/scroll-reveal";
import { BRAND_ACCENTS } from "@/lib/product-config";
import type {
  BrandPageData,
  ProductTable,
  BulletPoint,
  SpecRow,
} from "@/lib/brand-data";

/* ═══════════════════════════════════════════════════════════════════
   SUB-COMPONENTS
   ═══════════════════════════════════════════════════════════════════ */

function ProductTableRenderer({ table }: { table: ProductTable }) {
  const headers = table.headers;
  return (
    <ScrollReveal className="mb-10">
      {table.title && (
        <h3 className="text-lg font-extrabold leading-[1.1] tracking-tight text-foreground mb-3">
          {table.title}
        </h3>
      )}
      {table.description && (
        <p className="text-sm text-muted-foreground mb-4">
          {table.description}
        </p>
      )}
      <div className="overflow-hidden border border-border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted">
              <tr>
                {headers.map((h) => (
                  <th
                    key={h}
                    className="px-4 py-3 text-left font-semibold text-foreground whitespace-nowrap"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {table.rows.map((row, idx) => (
                <tr key={idx}>
                  {headers.map((h) => (
                    <td
                      key={h}
                      className="px-4 py-3 text-muted-foreground whitespace-nowrap"
                      dangerouslySetInnerHTML={{ __html: row[h] ?? "" }}
                    />
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </ScrollReveal>
  );
}

function BulletSection({
  title,
  items,
}: {
  title: string;
  items: BulletPoint[];
}) {
  return (
    <div className="mb-10">
      {title && (
        <h3 className="text-lg font-extrabold leading-[1.1] tracking-tight text-foreground mb-4">
          {title}
        </h3>
      )}
      <StaggerContainer
        className="grid md:grid-cols-2 gap-6"
        staggerDelay={0.08}
      >
        {items.map((item, idx) => (
          <StaggerItem key={idx}>
            <div className="border border-border bg-card p-5 h-full">
              <h4 className="font-semibold text-foreground mb-2">
                {item.title}
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </div>
  );
}

function SpecTableRenderer({
  title,
  rows,
}: {
  title: string;
  rows: SpecRow[];
}) {
  return (
    <ScrollReveal className="mb-10">
      {title && (
        <h3 className="text-lg font-extrabold leading-[1.1] tracking-tight text-foreground mb-3">
          {title}
        </h3>
      )}
      <div className="overflow-hidden border border-border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <tbody className="divide-y divide-border">
              {rows.map((row, idx) => (
                <tr key={idx}>
                  <td className="px-4 py-3 font-semibold text-foreground w-1/3">
                    {row.label}
                  </td>
                  <td
                    className="px-4 py-3 text-muted-foreground"
                    dangerouslySetInnerHTML={{ __html: row.value }}
                  />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </ScrollReveal>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   MAIN RENDERER
   ═══════════════════════════════════════════════════════════════════ */

export function BrandPageRenderer({
  brand,
  logoSrc,
}: {
  brand: BrandPageData;
  logoSrc: string | null;
}) {
  const isFuture = brand.status === "future";
  const accent = BRAND_ACCENTS[brand.name] ?? "from-[#DF4C73] to-[#B0DDE4]";

  return (
    <div className="flex flex-col">
      {/* ── Hero ────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-slate-950 py-12 md:py-16 lg:py-20">
        {/* Accent gradient overlay */}
        <div
          className={`absolute inset-0 bg-gradient-to-b ${accent} opacity-10`}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-950/80 to-slate-950/95" />

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="mb-8 flex items-center gap-2 text-sm text-slate-400"
          >
            <Link href="/brands" className="transition hover:text-white">
              Brands
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-white font-medium">{brand.name}</span>
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
            <div className="max-w-3xl">
              {isFuture && (
                <span className="mb-4 inline-block border-l-2 border-primary pl-3 text-xs font-bold uppercase tracking-widest text-primary">
                  Coming Soon
                </span>
              )}
              <h1 className="text-3xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-4xl lg:text-5xl">
                {brand.heroSlogan}
              </h1>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base lg:text-lg">
                {brand.heroDescription}
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/brands"
                  className="inline-flex items-center gap-2 border-2 border-white/30 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10 hover:border-white/50"
                >
                  All Brands
                </Link>
                <Link
                  href="/hardware/product-catalog"
                  className="inline-flex items-center gap-2 bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
                >
                  Browse Products
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Brand logo */}
            {logoSrc && (
              <div className="shrink-0">
                <div className="flex h-28 w-40 items-center justify-center border border-white/10 bg-white/5 p-4 backdrop-blur-sm lg:h-32 lg:w-48">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={logoSrc}
                    alt={`${brand.name} logo`}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Brand Story ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-background">
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          {/* Section identifier bar */}
          <div className="mb-8 flex items-center gap-4 border-b pb-4">
            <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Our Story
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
              {brand.name}
            </span>
          </div>

          <ScrollReveal>
            <span className="mb-4 inline-block border-l-2 border-primary pl-3 text-xs font-bold uppercase tracking-widest text-primary">
              Our Story
            </span>
            <h2 className="max-w-2xl text-3xl font-extrabold leading-[1.1] tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              The {brand.name} Story
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
              Discover the heritage and innovation behind {brand.name}.
            </p>
            <div className="mt-10 max-w-4xl">
              {typeof brand.brandStory === "string" ? (
                <div
                  className="prose prose-neutral max-w-none text-muted-foreground leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: brand.brandStory }}
                />
              ) : (
                <div className="prose prose-neutral max-w-none text-muted-foreground leading-relaxed">
                  <RichText data={brand.brandStory as never} />
                </div>
              )}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Product Lines ───────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-muted">
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          {/* Section identifier bar */}
          <div className="mb-8 flex items-center gap-4 border-b pb-4">
            <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Product Portfolio
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
              Available Products
            </span>
          </div>

          <span className="mb-4 inline-block border-l-2 border-primary pl-3 text-xs font-bold uppercase tracking-widest text-primary">
            Product Portfolio
          </span>
          <h2 className="max-w-2xl text-3xl font-extrabold leading-[1.1] tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Product Lines Available Through Simal Technologies
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Authorized distribution with full manufacturer warranty and
            dedicated account support.
          </p>

          <div className="mt-10 max-w-5xl">
            {brand.productTables.map((table, idx) => (
              <ProductTableRenderer key={idx} table={table} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Comparison Tables ───────────────────────────────────────── */}
      {brand.comparisonTables && brand.comparisonTables.length > 0 && (
        <section className="relative overflow-hidden bg-background">
          <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
            <div className="mb-8 flex items-center gap-4 border-b pb-4">
              <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                Comparison
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                Model Comparison
              </span>
            </div>

            <span className="mb-4 inline-block border-l-2 border-primary pl-3 text-xs font-bold uppercase tracking-widest text-primary">
              Comparison
            </span>
            <h2 className="max-w-2xl text-3xl font-extrabold leading-[1.1] tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Model Comparison
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
              Compare specifications across {brand.name} product lines.
            </p>

            <div className="mt-10 max-w-5xl">
              {brand.comparisonTables.map((table, idx) => (
                <ProductTableRenderer key={idx} table={table} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Performance Tiers ───────────────────────────────────────── */}
      {brand.performanceTiers && (
        <section className="relative overflow-hidden bg-muted">
          <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
            <div className="mb-8 flex items-center gap-4 border-b pb-4">
              <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                Performance
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                Tiers
              </span>
            </div>

            <span className="mb-4 inline-block border-l-2 border-primary pl-3 text-xs font-bold uppercase tracking-widest text-primary">
              Performance
            </span>
            <h2 className="max-w-2xl text-3xl font-extrabold leading-[1.1] tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Performance Tiers
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
              Choose the right tier for your workload requirements.
            </p>

            <div className="mt-10 max-w-5xl">
              <ProductTableRenderer table={brand.performanceTiers} />
            </div>
          </div>
        </section>
      )}

      {/* ── Spec Tables ─────────────────────────────────────────────── */}
      {brand.specTables && brand.specTables.length > 0 && (
        <section className="relative overflow-hidden bg-background">
          <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
            <div className="mb-8 flex items-center gap-4 border-b pb-4">
              <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                Specifications
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                Technical Excellence
              </span>
            </div>

            <ScrollReveal>
              <span className="mb-4 inline-block border-l-2 border-primary pl-3 text-xs font-bold uppercase tracking-widest text-primary">
                Specifications
              </span>
              <h2 className="max-w-2xl text-3xl font-extrabold leading-[1.1] tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                Technical Excellence
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
                Deep-dive into {brand.name} engineering and quality standards.
              </p>

              <div className="mt-10 max-w-4xl">
                {brand.specTables.map((spec, idx) => (
                  <SpecTableRenderer
                    key={idx}
                    title={spec.title}
                    rows={spec.rows}
                  />
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* ── Why Choose / Key Technologies ───────────────────────────── */}
      <section className="relative overflow-hidden bg-muted">
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="mb-8 flex items-center gap-4 border-b pb-4">
            <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Advantages
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
              Why {brand.name}
            </span>
          </div>

          <span className="mb-4 inline-block border-l-2 border-primary pl-3 text-xs font-bold uppercase tracking-widest text-primary">
            Advantages
          </span>
          <h2 className="max-w-2xl text-3xl font-extrabold leading-[1.1] tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Why Choose {brand.name}?
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Key differentiators that set {brand.name} apart.
          </p>

          <div className="mt-10 max-w-5xl">
            {brand.bulletSections ? (
              brand.bulletSections.map((section, idx) => (
                <BulletSection
                  key={idx}
                  title={section.title}
                  items={section.items}
                />
              ))
            ) : brand.keyTechnologies ? (
              <StaggerContainer
                className="grid md:grid-cols-2 gap-6"
                staggerDelay={0.08}
              >
                {brand.keyTechnologies.map((item, idx) => (
                  <StaggerItem key={idx}>
                    <div className="border border-border bg-card p-5 h-full">
                      <h4 className="font-semibold text-foreground mb-2">
                        {item.title}
                      </h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            ) : null}
          </div>
        </div>
      </section>

      {/* ── Ideal Deployments ───────────────────────────────────────── */}
      {brand.idealDeployments && (
        <section className="relative overflow-hidden bg-background">
          <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
            <div className="mb-8 flex items-center gap-4 border-b pb-4">
              <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                Use Cases
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                Ideal Deployments
              </span>
            </div>

            <span className="mb-4 inline-block border-l-2 border-primary pl-3 text-xs font-bold uppercase tracking-widest text-primary">
              Use Cases
            </span>
            <h2 className="max-w-2xl text-3xl font-extrabold leading-[1.1] tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Ideal Deployments
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
              Recommended sectors and models for {brand.name} deployments.
            </p>

            <div className="mt-10 max-w-5xl">
              <ProductTableRenderer table={brand.idealDeployments} />
            </div>
          </div>
        </section>
      )}

      {/* ── Selection Guides ────────────────────────────────────────── */}
      {brand.selectionGuides && brand.selectionGuides.length > 0 && (
        <section className="relative overflow-hidden bg-muted">
          <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
            <div className="mb-8 flex items-center gap-4 border-b pb-4">
              <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                Guide
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                Selection Guide
              </span>
            </div>

            <span className="mb-4 inline-block border-l-2 border-primary pl-3 text-xs font-bold uppercase tracking-widest text-primary">
              Guide
            </span>
            <h2 className="max-w-2xl text-3xl font-extrabold leading-[1.1] tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Selection Guide
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
              Find the right {brand.name} product for your needs.
            </p>

            <div className="mt-10 max-w-5xl">
              {brand.selectionGuides.map((table, idx) => (
                <ProductTableRenderer key={idx} table={table} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Authorized Distributor ──────────────────────────────────── */}
      <section className="relative overflow-hidden bg-background">
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="mb-8 flex items-center gap-4 border-b pb-4">
            <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Partnership
            </span>
            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-primary">
              <BadgeCheck className="h-3.5 w-3.5" />
              Authorized Distributor
            </span>
          </div>

          <ScrollReveal>
            <span className="mb-4 inline-block border-l-2 border-primary pl-3 text-xs font-bold uppercase tracking-widest text-primary">
              Partnership
            </span>
            <h2 className="max-w-2xl text-3xl font-extrabold leading-[1.1] tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              {brand.authorizedDistributorTitle ||
                "Authorized Distributor — Simal Technologies"}
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
              100% genuine products with full manufacturer warranty and
              dedicated support.
            </p>

            <div className="mt-10 max-w-4xl">
              {isFuture && brand.statusNote && (
                <div className="mb-6 border border-border bg-card p-5">
                  <p className="text-sm text-foreground font-medium">
                    {brand.statusNote}
                  </p>
                </div>
              )}
              <ul className="space-y-3">
                {brand.authorizedDistributorPoints.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="mt-0.5 flex shrink-0 items-center justify-center bg-primary p-1">
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        className="text-primary-foreground"
                      >
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    </div>
                    <span
                      className="text-sm text-muted-foreground leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: point }}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Ordering Information ─────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-muted">
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="mb-8 flex items-center gap-4 border-b pb-4">
            <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Contact
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
              Ordering Information
            </span>
          </div>

          <ScrollReveal>
            <span className="mb-4 inline-block border-l-2 border-primary pl-3 text-xs font-bold uppercase tracking-widest text-primary">
              Contact
            </span>
            <h2 className="max-w-2xl text-3xl font-extrabold leading-[1.1] tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Ordering Information
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
              Get in touch for pricing, bulk orders, and B2B inquiries.
            </p>

            <div className="mt-10 grid sm:grid-cols-2 gap-4 max-w-4xl">
              <div className="border border-border bg-card p-5">
                <h3 className="font-semibold text-foreground mb-1">
                  Order via WhatsApp
                </h3>
                <a
                  href={`https://wa.me/${brand.orderingInfo.whatsapp.replace(/\D/g, "")}`}
                  className="text-sm text-primary hover:underline"
                >
                  {brand.orderingInfo.whatsapp}
                </a>
              </div>
              <div className="border border-border bg-card p-5">
                <h3 className="font-semibold text-foreground mb-1">
                  B2B Inquiries
                </h3>
                <a
                  href={`mailto:${brand.orderingInfo.email}`}
                  className="text-sm text-primary hover:underline"
                >
                  {brand.orderingInfo.email}
                </a>
              </div>
              {brand.orderingInfo.extra && (
                <div className="border border-border bg-card p-5 sm:col-span-2">
                  <p className="text-sm text-muted-foreground">
                    {brand.orderingInfo.extra}
                  </p>
                </div>
              )}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── CTA / Related Links ─────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-slate-950">
        <div
          className={`absolute inset-0 bg-gradient-to-b ${accent} opacity-10`}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-950/80 to-slate-950/95" />

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <ScrollReveal>
            <span className="mb-4 inline-block border-l-2 border-primary pl-3 text-xs font-bold uppercase tracking-widest text-primary">
              Explore
            </span>
            <h2 className="max-w-2xl text-3xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-4xl lg:text-5xl">
              Explore More
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-300">
              Discover more from Simal Technologies.
            </p>

            <div className="mt-10">
              <div
                className="text-white/60 prose prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: brand.relatedLinks }}
              />
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/brands"
                  className="inline-flex items-center gap-2 border-2 border-white/30 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10 hover:border-white/50"
                >
                  All Brands
                </Link>
                <Link
                  href="/hardware/product-catalog"
                  className="inline-flex items-center gap-2 bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
                >
                  Product Catalog
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
