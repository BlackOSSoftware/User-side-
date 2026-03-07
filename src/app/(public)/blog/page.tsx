import type { Metadata } from "next";
import BlogPage from "./page.client";
import { buildMetadata } from "@/lib/seo/metadata";
import { JsonLd, breadcrumbsJsonLd, faqJsonLd } from "@/lib/seo/jsonld";
import { SITE_URL } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Blog",
  description:
    "MSPK Trade Solutions blog covering live market signals, execution frameworks, and trading insights across global markets.",
  path: "/blog",
  keywordsExtra: [
    "trading signals blog",
    "forex analysis",
    "commodity analysis",
    "market insights",
  ],
});

export default function Page() {
  const breadcrumbs = breadcrumbsJsonLd([
    { name: "Home", url: SITE_URL },
    { name: "Blog", url: `${SITE_URL}/blog` },
  ]);

  const faq = faqJsonLd([
    {
      question: "What topics are covered in the MSPK blog?",
      answer:
        "We publish insights on live trading signals, market structure, execution discipline, and multi-asset analysis.",
    },
    {
      question: "How often is the blog updated?",
      answer:
        "Blog updates are posted regularly as new research and market notes become available.",
    },
  ]);

  return (
    <>
      <JsonLd data={[breadcrumbs, faq]} />
      <BlogPage />
    </>
  );
}
