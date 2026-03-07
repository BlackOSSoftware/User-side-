import type { Metadata } from "next";
import AboutPage from "./page.client";
import { buildMetadata } from "@/lib/seo/metadata";
import { JsonLd, breadcrumbsJsonLd, faqJsonLd } from "@/lib/seo/jsonld";
import { SITE_URL } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "About MSPK",
  description:
    "Learn about MSPK Trade Solutions, our signal research process, execution discipline, and the mission behind our live market signals.",
  path: "/about",
  keywordsExtra: [
    "about trading signals",
    "signal research",
    "institutional trading signals",
    "signal methodology",
  ],
});

export default function Page() {
  const breadcrumbs = breadcrumbsJsonLd([
    { name: "Home", url: SITE_URL },
    { name: "About", url: `${SITE_URL}/about` },
  ]);

  const faq = faqJsonLd([
    {
      question: "How are MSPK signals created?",
      answer:
        "Signals are derived from structured market research, liquidity and volatility analysis, and predefined risk rules.",
    },
    {
      question: "What markets are covered?",
      answer:
        "Coverage includes forex, commodities, indices, and Indian market segments such as NIFTY and Bank NIFTY.",
    },
  ]);

  return (
    <>
      <JsonLd data={[breadcrumbs, faq]} />
      <AboutPage />
    </>
  );
}
