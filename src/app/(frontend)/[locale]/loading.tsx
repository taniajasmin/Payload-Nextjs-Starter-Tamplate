/**
 * Route-level loading boundary for every page under /[locale].
 *
 * Without this, client-side navigation (clicking a <Link>) blocks: the App
 * Router waits for the destination page's full RSC payload before swapping the
 * view, so the UI freezes with no feedback. A loading.tsx streams instantly and
 * the page pours in behind it. This single file covers ALL locale routes
 * because the [locale] layout wraps every one of them.
 */
export default function Loading() {
  return (
    <div
      className="flex min-h-[60vh] w-full items-center justify-center bg-background"
      role="status"
      aria-live="polite"
      aria-label="Loading page"
    >
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 animate-spin border-[3px] border-muted border-t-primary" />
        <p className="text-[length:var(--font-body)] font-medium text-muted-foreground">
          Loading…
        </p>
      </div>
    </div>
  );
}
