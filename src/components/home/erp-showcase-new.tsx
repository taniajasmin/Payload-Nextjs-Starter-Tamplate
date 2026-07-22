"use client";

import Link from "next/link";
import {
  Coins,
  Users,
  ChartLine,
  Boxes,
  Factory,
  ListCheck,
  PlusCircle,
  ArrowRight,
} from "lucide-react";
import { SectionShell } from "@/components/ui/section-shell";
import { SectionHeading } from "@/components/ui/section-heading";

const ERP_MODULES_ROW1 = [
  {
    icon: Coins,
    title: "Finance & Accounting",
    desc: "Complete financial management",
  },
  { icon: Users, title: "HR & Payroll", desc: "Workforce management" },
  {
    icon: ChartLine,
    title: "Sales & CRM",
    desc: "Pipeline & customer tracking",
  },
  {
    icon: Boxes,
    title: "Inventory & Supply",
    desc: "Stock & warehouse control",
  },
];

const ERP_MODULES_ROW2 = [
  { icon: Factory, title: "Mfg & Quality", desc: "Production management" },
  { icon: ListCheck, title: "Project Mgmt", desc: "Task & resource planning" },
];

const ERP_EXTRAS = [
  "Custom Development",
  "Cloud Services",
  "AI & Machine Learning",
];

function ModuleCard({ mod }: { mod: (typeof ERP_MODULES_ROW1)[number] }) {
  const Icon = mod.icon;
  return (
    <div className="group border border-border bg-card p-5 text-center">
      <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center bg-primary text-primary-foreground">
        <Icon size={20} strokeWidth={1.6} />
      </div>
      <h3 className="text-base font-semibold text-foreground">{mod.title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{mod.desc}</p>
    </div>
  );
}

interface ErpShowcaseProps {
  badge?: string;
  heading?: string;
  subtext?: string;
}

export default function ErpShowcaseNew({
  badge = "UniERP — Enterprise Software",
  heading = "Transform Your Business with UniERP",
  subtext = "Powered by Odoo 19 Community Edition — A complete ERP solution tailored for your industry.",
}: ErpShowcaseProps) {
  return (
    <SectionShell id="erp-showcase" variant="default">
      <SectionHeading
        eyebrow={badge}
        title={heading}
        subtitle={subtext}
        align="center"
      />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {ERP_MODULES_ROW1.map((mod) => (
          <ModuleCard key={mod.title} mod={mod} />
        ))}
      </div>

      <div className="mx-auto mt-4 grid max-w-2xl grid-cols-2 gap-4">
        {ERP_MODULES_ROW2.map((mod) => (
          <ModuleCard key={mod.title} mod={mod} />
        ))}
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        {ERP_EXTRAS.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-2 border border-border bg-card px-4 py-2 text-sm font-medium text-foreground"
          >
            <PlusCircle size={14} className="text-primary" />
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/erp/demo-request"
          className="inline-flex items-center gap-2 bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Schedule a Free Demo
        </Link>
        <Link
          href="/erp/roi-calculator"
          className="inline-flex items-center gap-2 border border-primary px-5 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary/10"
        >
          Calculate Your ROI <ArrowRight size={16} />
        </Link>
      </div>
    </SectionShell>
  );
}
