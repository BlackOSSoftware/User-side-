import type { Metadata } from "next";
import BlogDetailPage from "./page.client";
import { buildMetadata } from "@/lib/seo/metadata";
import { JsonLd, breadcrumbsJsonLd } from "@/lib/seo/jsonld";
import { SITE_URL } from "@/lib/seo/metadata";

type BlogPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { slug = "" } = await params;
  return buildMetadata({
    title: "Blog Article",
    description:
      "Read MSPK Trade Solutions trading insights, signal breakdowns, and execution guidance.",
    path: `/blog/${slug}`,
    keywordsExtra: ["trading article", "signal breakdown", "market commentary"],
  });
}

export default async function Page({ params }: BlogPageProps) {
  const { slug = "" } = await params;
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
