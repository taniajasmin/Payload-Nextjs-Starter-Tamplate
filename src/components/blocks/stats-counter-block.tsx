import { SectionShell } from "@/components/ui/section-shell";
import { Reveal } from "@/components/ui/reveal";
import { StatCounter } from "@/components/blocks/stat-counter";

interface StatItem {
  label: string;
  value: string;
  suffix?: string;
  prefix?: string;
}

interface StatsCounterBlockProps {
  heading?: string;
  stats?: StatItem[];
}

export function StatsCounterBlock({ heading, stats }: StatsCounterBlockProps) {
  if (!stats || stats.length === 0) return null;

  return (
    <SectionShell>
      {heading && (
        <Reveal>
          <div className="border-b border-border pb-4 mb-8">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight">
              {heading}
            </h2>
          </div>
        </Reveal>
      )}
      <div className="grid gap-8 border-t border-border pt-8 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <Reveal key={i} delay={i * 0.08}>
            <div className="border-l-2 border-primary/50 pl-4">
              <StatCounter
                value={stat.value}
                prefix={stat.prefix}
                suffix={stat.suffix}
                className="font-mono text-3xl sm:text-4xl font-extrabold tabular-nums text-foreground"
              />
              <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}
