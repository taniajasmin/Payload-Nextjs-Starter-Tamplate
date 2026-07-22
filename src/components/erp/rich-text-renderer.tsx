"use client";

import { RichText } from "@payloadcms/richtext-lexical/react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function RichTextRenderer({ data }: { data: any }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <RichText data={data as any} />;
}
