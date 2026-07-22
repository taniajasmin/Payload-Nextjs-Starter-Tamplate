export default function AboutLoading() {
  return (
    <section className="w-full py-28 md:py-36 bg-white">
      <div className="container-primary">
        <div className="text-center mb-10 animate-pulse">
          <div className="mx-auto h-8 w-28 rounded-full bg-slate-200 mb-6" />
          <div className="mx-auto h-12 md:h-16 max-w-2xl rounded-xl bg-slate-200 mb-6" />
          <div className="mx-auto h-5 max-w-xl rounded-lg bg-slate-200" />
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-24 rounded-2xl bg-slate-100 border border-slate-200 animate-pulse" />
          ))}
        </div>
      </div>
    </section>
  );
}
