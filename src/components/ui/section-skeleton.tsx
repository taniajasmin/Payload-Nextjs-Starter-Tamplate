export function SectionSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={`w-full animate-pulse bg-neutral-100 ${className || "min-h-[300px]"}`}
      aria-hidden="true"
    />
  );
}
