import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Lock,
  Mail,
  Phone,
  BadgeCheck,
  Quote,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  partnerBenefits,
  partnerTiers,
  marginStructure,
  partnerTestimonials,
  partnerFaqs,
  type PartnerTier,
} from "./partners-data";

export function PartnersPageContent() {
  return (
    <main className="flex flex-col">
      <HeroSection />
      <GatewaySection />
      <BenefitsSection />
      <TiersSection />
      <MarginSection />
      <TestimonialsSection />
      <FaqSection />
      <CtaSection />
    </main>
  );
}

/* ------------------------------------------------------------------ */
/* Shared helpers                                                      */
/* ------------------------------------------------------------------ */

function SectionIdentifierBar({
  label,
  badge,
}: {
  label: string;
  badge?: string;
}) {
  return (
    <div className="mb-8 flex items-center gap-4 border-b border-border pb-4">
      <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
        {label}
      </span>
      {badge && (
        <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-primary">
          <BadgeCheck className="h-3.5 w-3.5" />
          {badge}
        </span>
      )}
    </div>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="mb-4 inline-block border-l-2 border-primary pl-3 text-xs font-bold uppercase tracking-widest text-primary">
      {children}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Hero — dark island                                                  */
/* ------------------------------------------------------------------ */

function HeroSection() {
  const heroStats = [
    { stat: "22+", statLabel: "Global IT Brands" },
    { stat: "200+", statLabel: "Active Partners" },
    { stat: "20+", statLabel: "Years in GCC" },
    { stat: "2", statLabel: "Logistics Hubs (DXB & DAC)" },
  ];

  return (
    <section
      id="partner-hero"
      className="relative overflow-hidden bg-slate-950"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-slate-950/85 via-slate-950/70 to-primary/25" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(60% 60% at 20% 20%, rgba(56,189,248,0.18), transparent 60%), radial-gradient(50% 50% at 85% 30%, rgba(223,76,115,0.16), transparent 60%)",
        }}
      />

      <div className="container relative z-10 mx-auto px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <span className="mb-4 inline-block border-l-2 border-primary pl-3 text-xs font-bold uppercase tracking-widest text-primary">
            Partner Program
          </span>
          <h1 className="text-balance text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
            Partner with Simal Technologies — Grow Your Business with the
            GCC&apos;s Trusted IT <span className="text-primary">Distributor</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-slate-300 md:text-base">
            For over two decades, Simal Technologies Middle East LLC has been
            the backbone of IT distribution in the UAE and GCC. Our partner
            program opens this ecosystem to resellers, system integrators, and
            solution providers — giving you access to 22+ global brands,
            competitive pricing, and the support you need to win.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/en/partners/apply"
              className="inline-flex items-center gap-2 bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Apply to Become a Reseller
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/en/contact"
              className="inline-flex items-center gap-2 border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              Talk to Partner Relations
            </Link>
            <Link
              href="/en/partners/portal"
              className="inline-flex items-center gap-2 border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              <Lock className="h-4 w-4" strokeWidth={1.6} />
              Partner Portal Login
            </Link>
          </div>
        </div>

        {/* Hero stat bar */}
        <div className="mx-auto mt-12 grid max-w-4xl grid-cols-2 border-t border-white/20 pt-6 sm:grid-cols-4">
          {heroStats.map((s, i) => (
            <div
              key={s.statLabel}
              className={cn(
                "flex flex-col px-4",
                i > 0 && "border-l border-white/20",
                i === 0 && "pl-0",
                i === heroStats.length - 1 && "pr-0",
              )}
            >
              <span className="text-2xl font-extrabold tabular-nums leading-none text-white">
                {s.stat}
              </span>
              <span className="mt-1 text-xs font-medium text-slate-300">
                {s.statLabel}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Gateway — "Your Gateway to 22+ Brands"                              */
/* ------------------------------------------------------------------ */

function GatewaySection() {
  const gatewayStats = [
    { stat: "22+", statLabel: "World-Class IT Brands" },
    { stat: "1", statLabel: "Complete ERP Portfolio (UniERP)" },
    { stat: "20+", statLabel: "Years of GCC Distribution" },
    { stat: "2", statLabel: "Regional Warehouses" },
  ];

  return (
    <section
      id="gateway"
      className="relative overflow-hidden bg-background"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background via-transparent to-muted/30" />
      <div className="container relative z-10 mx-auto px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <SectionIdentifierBar label="Overview" badge="Gateway" />
        <Badge>Your Gateway</Badge>
        <h2 className="max-w-2xl text-3xl font-extrabold leading-[1.1] tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          Your gateway to 22+ world-class IT brands and a complete{" "}
          <span className="text-primary">ERP portfolio</span>
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Simal Technologies Middle East LLC has been the backbone of IT
          distribution in the UAE and GCC for over two decades. Our partner
          program opens this ecosystem to resellers, system integrators, and
          solution providers — giving you access to global brands, competitive
          pricing, and the support you need to win.
        </p>

        <div className="mt-10 grid grid-cols-2 border-t border-border sm:grid-cols-4">
          {gatewayStats.map((s, i) => (
            <div
              key={s.statLabel}
              className={cn(
                "flex flex-col px-4 py-6",
                i > 0 && "border-l border-border",
                i === 0 && "pl-0",
                i === gatewayStats.length - 1 && "pr-0",
              )}
            >
              <span className="text-2xl font-extrabold tabular-nums leading-none text-foreground">
                {s.stat}
              </span>
              <span className="mt-1 text-xs font-medium text-muted-foreground">
                {s.statLabel}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Why Partner — benefits grid                                         */
/* ------------------------------------------------------------------ */

function BenefitsSection() {
  return (
    <section
      id="why-partner"
      className="relative overflow-hidden bg-background"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background via-transparent to-muted/30" />
      <div className="container relative z-10 mx-auto px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <SectionIdentifierBar label="Why Partner" badge="Benefits" />
        <Badge>Why Partner with Simal?</Badge>
        <h2 className="max-w-2xl text-3xl font-extrabold leading-[1.1] tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          Everything you need to win deals across the{" "}
          <span className="text-primary">region</span>
        </h2>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
          One partnership opens the door to global brands, exclusive software
          rights, marketing muscle, and dedicated support — backed by logistics
          hubs in Dubai and Dhaka.
        </p>

        <div className="mt-10 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {partnerBenefits.map((benefit) => (
            <BenefitCard
              key={benefit.title}
              icon={benefit.icon}
              title={benefit.title}
              description={benefit.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function BenefitCard({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
}) {
  return (
    <article className="flex h-full flex-col bg-card p-6 transition-colors hover:bg-muted">
      <div className="mb-4 inline-flex h-10 w-10 items-center justify-center border border-border text-primary">
        <Icon className="h-5 w-5" strokeWidth={1.6} />
      </div>
      <h3 className="text-base font-bold leading-snug text-foreground">
        {title}
      </h3>
      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
        {description}
      </p>
    </article>
  );
}

/* ------------------------------------------------------------------ */
/* Partner Tiers                                                       */
/* ------------------------------------------------------------------ */

function TiersSection() {
  return (
    <section
      id="tiers"
      className="relative overflow-hidden bg-muted"
    >
      <div className="container relative z-10 mx-auto px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <SectionIdentifierBar label="Partner Tiers" badge="3 Levels" />
        <Badge>Partner Tiers</Badge>
        <h2 className="max-w-2xl text-3xl font-extrabold leading-[1.1] tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          Three tiers built for every stage of{" "}
          <span className="text-primary">growth</span>
        </h2>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
          From new resellers to strategic alliances — choose the tier that
          matches your ambition and unlock the margins, support, and territory
          rights that come with it.
        </p>

        <div className="mt-10 grid gap-px border border-border bg-border lg:grid-cols-3">
          {partnerTiers.map((tier, idx) => (
            <TierCard key={tier.name} tier={tier} index={idx} />
          ))}
        </div>

        <div className="mt-10 border-t border-border pt-8">
          <Link
            href="/en/partners/apply"
            className="inline-flex items-center gap-2 bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Start Your Application
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function TierCard({ tier, index }: { tier: PartnerTier; index: number }) {
  const tierIndex = String(index + 1).padStart(2, "0");
  return (
    <article className="flex h-full flex-col bg-card p-8 md:p-10">
      <div className="mb-6 flex items-start justify-between gap-4 border-b border-border pb-6">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
            {tier.tagline}
          </span>
          <h3 className="mt-2 text-2xl font-extrabold leading-[1.1] tracking-tight text-foreground">
            {tier.name}
          </h3>
        </div>
        <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
          Tier {tierIndex}
        </span>
      </div>

      <dl className="flex-1">
        <TierDetail label="Requirements" value={tier.requirements} />
        <TierDetail label="Margin" value={tier.margin} />
        <TierDetail label="Credit Terms" value={tier.creditTerms} />
        <TierDetail
          label="Marketing Support"
          value={tier.marketingSupport}
        />
        <TierDetail label="Training" value={tier.training} />
        <TierDetail
          label="Account Management"
          value={tier.accountManagement}
        />
        {tier.additionalBenefits && (
          <TierDetail
            label="Additional Benefits"
            value={tier.additionalBenefits}
          />
        )}
        <TierDetail label="Best For" value={tier.bestFor} />
      </dl>
    </article>
  );
}

function TierDetail({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start gap-2.5 border-b border-border/60 py-2.5 last:border-0">
      <span className="mt-1.5 h-1 w-1 shrink-0 bg-primary" />
      <div>
        <dt className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
          {label}
        </dt>
        <dd className="mt-0.5 text-xs font-medium leading-relaxed text-foreground">
          {value}
        </dd>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Margin Structure table                                              */
/* ------------------------------------------------------------------ */

function MarginSection() {
  return (
    <section
      id="margins"
      className="relative overflow-hidden bg-background"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background via-transparent to-muted/30" />
      <div className="container relative z-10 mx-auto px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <SectionIdentifierBar label="Commercial Terms" badge="Indicative" />
        <Badge>Margin Structure</Badge>
        <h2 className="max-w-2xl text-3xl font-extrabold leading-[1.1] tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          Transparent margins that scale with your{" "}
          <span className="text-primary">tier</span>
        </h2>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
          Indicative margins by product category. Exact rates vary by brand,
          category, and volume — detailed commercial terms are provided upon
          partnership approval.
        </p>

        <div className="mt-10 overflow-x-auto border border-border bg-card">
          <table className="min-w-full divide-y divide-border text-left">
            <thead>
              <tr className="border-b border-border bg-muted">
                <th
                  scope="col"
                  className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-foreground"
                >
                  Product Category
                </th>
                <th
                  scope="col"
                  className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-foreground"
                >
                  Authorized
                </th>
                <th
                  scope="col"
                  className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-foreground"
                >
                  Premier
                </th>
                <th
                  scope="col"
                  className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-primary"
                >
                  Elite
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {marginStructure.map((row) => (
                <tr key={row.category} className="transition-colors hover:bg-muted/50">
                  <th
                    scope="row"
                    className="px-5 py-4 text-xs font-bold leading-snug text-foreground"
                  >
                    {row.category}
                  </th>
                  <td className="px-5 py-4 text-xs font-medium text-muted-foreground">
                    {row.authorized}
                  </td>
                  <td className="px-5 py-4 text-xs font-medium text-foreground">
                    {row.premier}
                  </td>
                  <td className="px-5 py-4 text-xs font-bold text-primary">
                    {row.elite}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Testimonials                                                        */
/* ------------------------------------------------------------------ */

function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="relative overflow-hidden bg-muted"
    >
      <div className="container relative z-10 mx-auto px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <SectionIdentifierBar label="Social Proof" badge="Partners" />
        <Badge>What Our Partners Say</Badge>
        <h2 className="max-w-2xl text-3xl font-extrabold leading-[1.1] tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          Trusted by resellers and integrators across the{" "}
          <span className="text-primary">region</span>
        </h2>

        <div className="mt-10 grid gap-px border border-border bg-border lg:grid-cols-2">
          {partnerTestimonials.map((t) => (
            <figure
              key={t.author}
              className="flex h-full flex-col gap-4 bg-card p-8 md:p-10"
            >
              <Quote className="h-8 w-8 text-primary" strokeWidth={1.6} />
              <blockquote className="flex-1 text-sm leading-relaxed text-foreground">
                {t.quote}
              </blockquote>
              <figcaption className="border-t border-border pt-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                {t.author}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* FAQ                                                                 */
/* ------------------------------------------------------------------ */

function FaqSection() {
  return (
    <section
      id="faq"
      className="relative overflow-hidden bg-background"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background via-transparent to-muted/30" />
      <div className="container relative z-10 mx-auto px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <SectionIdentifierBar label="FAQ" badge="Common Questions" />
        <Badge>Frequently Asked Questions</Badge>
        <h2 className="max-w-2xl text-3xl font-extrabold leading-[1.1] tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          Answers to common questions about{" "}
          <span className="text-primary">partnering</span>
        </h2>

        <div className="mt-10 max-w-3xl border border-border bg-card">
          {partnerFaqs.map((faq, i) => (
            <div
              key={faq.question}
              className={cn(
                "p-6 md:p-8",
                i > 0 && "border-t border-border",
                i === 0 && "pt-6",
                i === partnerFaqs.length - 1 && "pb-6",
              )}
            >
              <h3 className="text-base font-bold leading-snug text-foreground">
                {faq.question}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* CTA — dark island                                                   */
/* ------------------------------------------------------------------ */

function CtaSection() {
  const bullets = [
    "No partnership fee",
    "22+ global IT brands",
    "UniERP reseller rights",
    "Dubai & Dhaka logistics hubs",
  ];

  return (
    <section
      id="ready-to-partner"
      className="relative overflow-hidden bg-black"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-slate-950/85 via-slate-950/70 to-primary/25" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(60% 60% at 50% 0%, rgba(56,189,248,0.22), transparent 60%)",
        }}
      />

      <div className="container relative z-10 mx-auto px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <span className="mb-4 inline-block border-l-2 border-primary pl-3 text-xs font-bold uppercase tracking-widest text-primary">
            Ready to Partner?
          </span>
          <h2 className="text-balance text-3xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-4xl lg:text-5xl">
            Join 200+ partners growing with{" "}
            <span className="text-primary">Simal Technologies</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-slate-300">
            Reach out to our Partner Relations team today. Applications are
            reviewed within 5 business days — most partners place their first
            order within two weeks.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-8">
            <a
              href="tel:+97143930507"
              className="inline-flex items-center gap-2 text-sm font-semibold text-white transition-colors hover:text-primary"
            >
              <Phone className="h-4 w-4 text-primary" strokeWidth={1.6} />
              +971 4 393 0507
            </a>
            <a
              href="mailto:partners@simalme.com"
              className="inline-flex items-center gap-2 text-sm font-semibold text-white transition-colors hover:text-primary"
            >
              <Mail className="h-4 w-4 text-primary" strokeWidth={1.6} />
              partners@simalme.com
            </a>
            <Link
              href="/en/partners/portal"
              className="inline-flex items-center gap-2 text-sm font-semibold text-white transition-colors hover:text-primary"
            >
              <Lock className="h-4 w-4 text-primary" strokeWidth={1.6} />
              Partner Portal Login
            </Link>
          </div>

          <div className="mt-10">
            <Link
              href="/en/partners/apply"
              className="inline-flex items-center gap-2 bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Apply to Become a Reseller
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <ul className="mx-auto mt-10 grid max-w-xl gap-y-2 border-t border-white/20 pt-6 sm:grid-cols-2 sm:gap-x-8">
            {bullets.map((item) => (
              <li
                key={item}
                className="flex items-center justify-center gap-2 text-xs font-medium text-slate-300 sm:justify-start"
              >
                <span className="h-1 w-1 shrink-0 bg-primary" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
