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
    <section className="py-16 sm:py-20 bg-muted/50">
      <div className="max-w-7xl mx-auto px-6">
        {heading && (
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight text-center mb-12">
            {heading}
          </h2>
        )}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <div key={i} className="text-center p-6">
              <div className="text-4xl sm:text-5xl font-bold text-primary tabular-nums">
                {stat.prefix && (
                  <span className="text-2xl sm:text-3xl">{stat.prefix}</span>
                )}
                {stat.value}
                {stat.suffix && (
                  <span className="text-2xl sm:text-3xl">{stat.suffix}</span>
                )}
              </div>
              <p className="mt-2 text-sm font-medium text-muted-foreground">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
