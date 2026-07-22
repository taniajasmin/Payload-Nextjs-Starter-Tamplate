import Link from "next/link";
import { ChevronRight, ArrowRight, Calendar, Users, Building2 } from "lucide-react";

interface HeroData {
  badge: string;
  headline: string;
  description: string;
  secondaryDescription?: string;
}

const TRUST_STATS = [
  { icon: Calendar, value: "20+", label: "Years Experience" },
  { icon: Building2, value: "20+", label: "Global Brands" },
  { icon: Users, value: "300+", label: "Professionals" },
] as const;

export default function AboutHeroRedesign({ data }: { data: HeroData }) {
  const words = data.headline.split(" ");
  const lastWord = words.pop();
  const headlineLead = words.join(" ");

  return (
    <section className="relative overflow-hidden bg-muted">
      <div className="container-primary relative z-10 pt-5 pb-14 lg:pt-6 lg:pb-20">
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center flex-wrap gap-1.5 text-muted-foreground text-[length:var(--font-body)]">
            <li>
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
            </li>
            <li>
              <ChevronRight className="w-3.5 h-3.5" />
            </li>
            <li className="text-foreground font-medium">About</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 lg:gap-16 items-center">
          <div className="max-w-2xl">
            <div
              className="inline-flex items-center gap-2 border-l-2 border-primary pl-3 text-xs font-bold uppercase tracking-widest text-primary mb-4 opacity-0 animate-fade-in-down"
              style={{ animationDelay: "0.1s", animationFillMode: "both" }}
            >
              {data.badge}
            </div>

            <h1
              className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-foreground leading-tight mb-6 opacity-0 animate-fade-in-up text-justify"
              style={{ animationDelay: "0.2s", animationFillMode: "both" }}
            >
              {headlineLead}{" "}
              {lastWord && <span className="text-primary">{lastWord}</span>}
            </h1>

            <p
              className="text-xl text-muted-foreground leading-relaxed max-w-[560px] opacity-0 animate-fade-in-up text-justify"
              style={{ animationDelay: "0.35s", animationFillMode: "both" }}
            >
              {data.description}
            </p>
            {data.secondaryDescription && (
              <p
                className="text-lg text-muted-foreground/70 mt-3 leading-relaxed max-w-[560px] opacity-0 animate-fade-in-up text-justify"
                style={{ animationDelay: "0.45s", animationFillMode: "both" }}
              >
                {data.secondaryDescription}
              </p>
            )}

            <div
              className="mt-8 flex flex-col gap-3 opacity-0 animate-fade-in-up sm:flex-row"
              style={{ animationDelay: "0.5s", animationFillMode: "both" }}
            >
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-4 font-semibold text-lg transition-all duration-300"
              >
                Contact Us
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/brands"
                className="group inline-flex items-center justify-center gap-2 border-2 border-border text-foreground px-6 py-4 font-semibold text-lg transition-all duration-300 hover:bg-foreground hover:text-background hover:border-foreground"
              >
                Explore Brands
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>

          <div
            className="opacity-0 animate-fade-in-up"
            style={{ animationDelay: "0.5s", animationFillMode: "both" }}
          >
            <div className="border border-border bg-card p-6 lg:p-8">
              <div className="grid grid-cols-3 gap-4 lg:gap-6">
                {TRUST_STATS.map((stat) => (
                  <div key={stat.label} className="flex flex-col items-center text-center">
                    <span className="mb-3 flex h-12 w-12 shrink-0 items-center justify-center bg-primary text-primary-foreground">
                      <stat.icon className="h-6 w-6" />
                    </span>
                    <div className="text-3xl font-extrabold leading-tight text-foreground lg:text-4xl">
                      {stat.value}
                    </div>
                    <div className="mt-0.5 text-sm font-medium text-muted-foreground lg:text-base">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
