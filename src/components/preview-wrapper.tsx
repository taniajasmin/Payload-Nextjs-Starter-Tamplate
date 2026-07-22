"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

interface PreviewWrapperProps {
  children: React.ReactNode;
}

function PreviewChecker({ children }: PreviewWrapperProps) {
  const searchParams = useSearchParams();
  const isPreview = searchParams.get("preview") === "true";

  if (isPreview) return null;

  return <>{children}</>;
}

export function PreviewWrapper({ children }: PreviewWrapperProps) {
  return (
    <Suspense fallback={null}>
      <PreviewChecker>{children}</PreviewChecker>
    </Suspense>
  );
}
