import type { Metadata } from "next";
import LeadPage from "./page.client";
import { buildMetadata } from "@/lib/seo/metadata";
import { JsonLd, breadcrumbsJsonLd } from "@/lib/seo/jsonld";
import { SITE_URL } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Get Started",
  description:
    "Get started with MSPK Trade Solutions and access institutional-grade live trading signals.",
  path: "/lead",
  keywordsExtra: ["get started trading signals", "signal onboarding", "signal access"],
});

export default function Page() {
  const breadcrumbs = breadcrumbsJsonLd([
    { name: "Home", url: SITE_URL },
    { name: "Get Started", url: `${SITE_URL}/lead` },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbs} />
      <LeadPage />
    </>
  );
}
