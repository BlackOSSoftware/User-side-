import type { Metadata } from "next";
import AnnouncementDetailPage from "./page.client";
import { buildMetadata } from "@/lib/seo/metadata";
import { JsonLd, breadcrumbsJsonLd } from "@/lib/seo/jsonld";
import { SITE_URL } from "@/lib/seo/metadata";

type AnnouncementPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: AnnouncementPageProps): Promise<Metadata> {
  const { id } = await params;
  return buildMetadata({
    title: "Announcement Details",
    description: "MSPK Trade Solutions announcement details and signal desk notices.",
    path: `/announcements/${id}`,
    keywordsExtra: ["announcement details", "signal notice", "platform update"],
  });
}

export default async function Page({ params }: AnnouncementPageProps) {
  const resolvedParams = await params;
  const idLabel = resolvedParams.id.replace(/[-_]/g, " ");
  const breadcrumbs = breadcrumbsJsonLd([
    { name: "Home", url: SITE_URL },
    { name: "Announcements", url: `${SITE_URL}/announcements` },
    { name: idLabel, url: `${SITE_URL}/announcements/${resolvedParams.id}` },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbs} />
      <AnnouncementDetailPage params={Promise.resolve(resolvedParams)} />
    </>
  );
}
