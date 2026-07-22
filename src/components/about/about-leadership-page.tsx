"use client";

import dynamic from "next/dynamic";
import { useAboutData } from "./about-data-provider";

const LeadershipSection = dynamic(() =>
  import("./about-section-leadership").then((m) => ({ default: m.LeadershipSection }))
);
const DivisionsSection = dynamic(() =>
  import("./about-section-leadership").then((m) => ({ default: m.DivisionsSection }))
);

export function AboutLeadershipPage() {
  const { leadership } = useAboutData();

  return (
    <>
      <section className="relative overflow-hidden bg-background">
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="mb-8 flex items-center gap-4 border-b pb-4">
            <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              About
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
              {leadership.badge}
            </span>
          </div>
          <span className="mb-4 inline-block border-l-2 border-primary pl-3 text-xs font-bold uppercase tracking-widest text-primary">
            {leadership.badge}
          </span>
          <h2 className="max-w-2xl text-3xl font-extrabold leading-[1.1] tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            {leadership.heading}{" "}
            <span className="text-primary">{leadership.headingGradient}</span>
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
            The strategic and operational leadership behind Simal Technologies
            &mdash; two decades of distribution excellence, guided by an
            executive team with deep regional and technical expertise.
          </p>
        </div>
      </section>

      <section className="relative overflow-hidden bg-background">
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 pb-12 lg:pb-16">
          <LeadershipSection boardOfDirectors={leadership.board} />
        </div>
      </section>

      <section className="relative overflow-hidden bg-muted">
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="mb-8 flex items-center gap-4 border-b pb-4">
            <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Organization
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
              Divisions
            </span>
          </div>
          <span className="mb-4 inline-block border-l-2 border-primary pl-3 text-xs font-bold uppercase tracking-widest text-primary">
            Business Divisions
          </span>
          <h2 className="max-w-2xl text-3xl font-extrabold leading-[1.1] tracking-tight text-foreground sm:text-4xl">
            Seven specialized{" "}
            <span className="text-primary">business units</span>
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Each division is staffed by certified specialists who understand
            their category, customers, and vendor ecosystem inside-out.
          </p>
          <div className="mt-10">
            <DivisionsSection divisions={leadership.divisions} />
          </div>
        </div>
      </section>
    </>
  );
}
