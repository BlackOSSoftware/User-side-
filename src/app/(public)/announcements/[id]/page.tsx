import type { Metadata } from "next";
import AnnouncementDetailPage from "./page.client";
import { buildMetadata } from "@/lib/seo/metadata";
import { JsonLd, breadcrumbsJsonLd } from "@/lib/seo/jsonld";
import { SITE_URL } from "@/lib/seo/metadata";

export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  return buildMetadata({
    title: "Announcement Details",
    description: "MSPK Trade Solutions announcement details and signal desk notices.",
    path: `/announcements/${params.id}`,
    keywordsExtra: ["announcement details", "signal notice", "platform update"],
  });
}

export default function Page({ params }: { params: { id: string } }) {
  const idLabel = params.id.replace(/[-_]/g, " ");
  const breadcrumbs = breadcrumbsJsonLd([
    { name: "Home", url: SITE_URL },
    { name: "Announcements", url: `${SITE_URL}/announcements` },
    { name: idLabel, url: `${SITE_URL}/announcements/${params.id}` },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbs} />
      <AnnouncementDetailPage params={Promise.resolve(params)} />
    </>
  );
}
