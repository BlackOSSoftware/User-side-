import type { Metadata } from "next";
import AnnouncementsPage from "./page.client";
import { buildMetadata } from "@/lib/seo/metadata";
import { JsonLd, breadcrumbsJsonLd } from "@/lib/seo/jsonld";
import { SITE_URL } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Announcements",
  description:
    "Latest MSPK Trade Solutions announcements, platform updates, and signal desk notices.",
  path: "/announcements",
  keywordsExtra: [
    "trading signal updates",
    "signal platform announcements",
    "market updates",
  ],
});

export default function Page() {
  const breadcrumbs = breadcrumbsJsonLd([
    { name: "Home", url: SITE_URL },
    { name: "Announcements", url: `${SITE_URL}/announcements` },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbs} />
      <AnnouncementsPage />
    </>
  );
}
