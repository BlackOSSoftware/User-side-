import type { Metadata } from "next";
import BlogDetailPage from "./page.client";
import { buildMetadata } from "@/lib/seo/metadata";
import { JsonLd, breadcrumbsJsonLd } from "@/lib/seo/jsonld";
import { SITE_URL } from "@/lib/seo/metadata";

export function generateMetadata({ params }: { params?: { slug?: string } }): Metadata {
  const slug = params?.slug ?? "";
  return buildMetadata({
    title: "Blog Article",
    description:
      "Read MSPK Trade Solutions trading insights, signal breakdowns, and execution guidance.",
    path: `/blog/${slug}`,
    keywordsExtra: ["trading article", "signal breakdown", "market commentary"],
  });
}

export default function Page({ params }: { params?: { slug?: string } }) {
  const slug = params?.slug ?? "";
  const slugLabel = slug ? slug.replace(/[-_]/g, " ") : "Blog";
  const breadcrumbs = breadcrumbsJsonLd([
    { name: "Home", url: SITE_URL },
    { name: "Blog", url: `${SITE_URL}/blog` },
    { name: slugLabel, url: `${SITE_URL}/blog/${slug}` },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbs} />
      <BlogDetailPage />
    </>
  );
}
