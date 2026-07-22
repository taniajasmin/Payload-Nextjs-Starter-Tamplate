import { permanentRedirect } from "next/navigation";

interface Props {
  params: Promise<{ slug: string; locale: string }>;
}

export default async function SoftwareRedirect({ params }: Props) {
  const { slug, locale } = await params;
  permanentRedirect(`/${locale}/solutions/${slug}`);
}
