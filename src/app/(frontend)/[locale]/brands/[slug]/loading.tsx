export default function BrandDetailLoading() {
  return (
    <div className="flex flex-col">
      {/* Hero skeleton */}
      <section className="relative overflow-hidden bg-slate-950 py-12 md:py-16 lg:py-20">
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="mb-8 flex items-center gap-2">
            <div className="h-4 w-14 rounded bg-slate-800 animate-pulse" />
            <div className="h-3.5 w-3.5 rounded bg-slate-800 animate-pulse" />
            <div className="h-4 w-20 rounded bg-slate-800 animate-pulse" />
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
            <div className="max-w-3xl space-y-4">
              <div className="h-12 md:h-14 lg:h-16 max-w-2xl rounded-xl bg-slate-800 animate-pulse" />
              <div className="h-5 max-w-xl rounded-lg bg-slate-800 animate-pulse" />
              <div className="h-5 max-w-md rounded-lg bg-slate-800 animate-pulse" />
              <div className="flex gap-4 pt-4">
                <div className="h-11 w-28 rounded bg-slate-800 animate-pulse" />
                <div className="h-11 w-40 rounded bg-slate-800 animate-pulse" />
              </div>
            </div>
            <div className="shrink-0 h-28 w-40 lg:h-32 lg:w-48 rounded bg-slate-800 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Section skeletons — alternating bg-background / bg-muted */}
      {Array.from({ length: 4 }).map((_, i) => (
        <section
          key={i}
          className={`relative overflow-hidden ${i % 2 === 1 ? "bg-muted" : "bg-background"}`}
        >
          <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
            {/* Section identifier bar */}
            <div className="mb-8 flex items-center gap-4 border-b pb-4">
              <div className="h-3 w-20 rounded bg-slate-200 animate-pulse" />
              <div className="h-3 w-16 rounded bg-slate-200 animate-pulse" />
            </div>

            {/* Eyebrow + heading */}
            <div className="mb-4 h-3 w-24 rounded bg-slate-200 animate-pulse" />
            <div className="h-8 max-w-sm rounded-xl bg-slate-200 animate-pulse" />
            <div className="mt-4 h-4 max-w-xl rounded-lg bg-slate-200 animate-pulse" />

            {/* Content cards */}
            <div className="mt-10 grid md:grid-cols-2 gap-6">
              {Array.from({ length: 4 }).map((_, j) => (
                <div
                  key={j}
                  className="h-24 border border-border bg-card animate-pulse"
                />
              ))}
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
