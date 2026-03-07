import type { Metadata } from "next";
import BlogDetailPage from "./page.client";
import { buildMetadata } from "@/lib/seo/metadata";
import { JsonLd, breadcrumbsJsonLd } from "@/lib/seo/jsonld";
import { SITE_URL } from "@/lib/seo/metadata";

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  return buildMetadata({
    title: "Blog Article",
    description:
      "Read MSPK Trade Solutions trading insights, signal breakdowns, and execution guidance.",
    path: `/blog/${params.slug}`,
    keywordsExtra: ["trading article", "signal breakdown", "market commentary"],
  });
}

export default function Page({ params }: { params: { slug: string } }) {
  const slugLabel = params.slug.replace(/[-_]/g, " ");
  const breadcrumbs = breadcrumbsJsonLd([
    { name: "Home", url: SITE_URL },
    { name: "Blog", url: `${SITE_URL}/blog` },
    { name: slugLabel, url: `${SITE_URL}/blog/${params.slug}` },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbs} />
      <BlogDetailPage />
    </>
  );
}
