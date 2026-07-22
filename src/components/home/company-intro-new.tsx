"use client";

import { useRef, useState, useEffect } from "react";
import { SectionShell } from "@/components/ui/section-shell";
import { SectionHeading } from "@/components/ui/section-heading";
import { Smile, Globe, ChartBar, Layers, Heart, Users } from "lucide-react";

function useCountUp(end: number, dur: number, go: boolean): number {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!go) return;
    let st: number | null = null;
    let raf: number;
    const tick = (ts: number) => {
      if (!st) st = ts;
      const p = Math.min((ts - st) / dur, 1);
      setN(Math.floor((1 - Math.pow(1 - p, 3)) * end));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setN(end);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [end, dur, go]);
  return n;
}

const STAT_ITEMS = [
  { value: 20, suffix: "+", label: "Years of Excellence", icon: Globe },
  { value: 300, suffix: "+", label: "Employees Worldwide", icon: Users },
  { value: 76, suffix: "+", label: "Products in Catalog", icon: Layers },
  { value: 20, suffix: "+", label: "Brand Partners", icon: Smile },
  { value: 4, suffix: "", label: "Regional Markets", icon: Globe },
  { value: 1.9, suffix: "M+", label: "Annual Revenue", icon: ChartBar },
  { value: 5, suffix: "", label: "IT Solution Verticals", icon: Layers },
  { value: 98, suffix: "%", label: "Customer Satisfaction", icon: Heart },
];

interface CompanyIntroProps {
  badge?: string;
  heading?: string;
  body?: string;
  stats?: Array<{ id: string; label: string; value: string; suffix?: string }>;
  values?: Array<{ icon: string; title: string; description: string }>;
}

export default function CompanyIntroNew({
  badge = "By the Numbers",
  heading = "Simal Technologies at a Glance",
}: CompanyIntroProps) {
  const cr = useRef<HTMLDivElement>(null);
  const [go, setGo] = useState(false);

  useEffect(() => {
    const el = cr.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setGo(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <SectionShell id="company-intro-section" variant="default">
      <SectionHeading eyebrow={badge} title={heading} align="center" />

      <div
        ref={cr}
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        {STAT_ITEMS.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="flex items-center gap-4 border border-border bg-card p-6"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center bg-primary text-primary-foreground">
                <Icon size={22} strokeWidth={1.6} />
              </div>
              <div>
                <span className="block text-2xl font-extrabold leading-none text-foreground">
                  {go ? stat.value : 0}
                  {stat.suffix}
                </span>
                <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          );
        })}
      </div>
    </SectionShell>
  );
}
