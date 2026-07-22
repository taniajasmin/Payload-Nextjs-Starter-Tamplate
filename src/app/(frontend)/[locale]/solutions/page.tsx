import type { Metadata } from "next";
import { fetchGlobal } from "@/lib/fetch-global";
import { fetchServices, type ServiceSummary } from "@/lib/fetch-services";
import { FALLBACK_SERVICES } from "@/lib/services-fallback";
import { ServicesHubClient } from "@/components/services/services-hub";

interface Props {
  params: Promise<{ locale: string }>;
}

interface ServicesPageGlobal {
  meta?: { title?: string; description?: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const global = await fetchGlobal<ServicesPageGlobal>(
    "services-page",
    locale,
    1,
  );

  return {
    title: global.meta?.title || "IT Solutions & Services — Simal Technologies",
    description:
      global.meta?.description ||
      "Professional IT services and enterprise software & ERP solutions from Simal Technologies — AMC, security, infrastructure and UniERP.",
    alternates: { canonical: "https://www.simalme.com/solutions" },
  };
}

export default async function SolutionsHubPage({ params }: Props) {
  const { locale } = await params;
  const [global, services] = await Promise.all([
    fetchGlobal<Record<string, unknown>>("services-page", locale, 2),
    fetchServices(locale),
  ]);

  const serviceList =
    services.length > 0 ? (services as ServiceSummary[]) : FALLBACK_SERVICES;

  return (
    <ServicesHubClient
      initialGlobal={global}
      initialServices={serviceList}
    />
  );
}
