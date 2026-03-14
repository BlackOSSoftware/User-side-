import type { Metadata } from "next";
import PlansPage from "./page.client";
import { buildMetadata } from "@/lib/seo/metadata";
import { JsonLd, breadcrumbsJsonLd, faqJsonLd } from "@/lib/seo/jsonld";
import { SITE_URL } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Plans & Pricing",
  description:
    "Explore MSPK Trade Solutions plans for live trading signals, referral code sharing, and subscription access across forex, commodities, indices, and Indian markets.",
  path: "/plans",
  keywordsExtra: [
    "trading signal plans",
    "signal pricing",
    "subscription signals",
    "referral code share",
    "share referral code",
    "referral plans page",
  ],
});

export default function Page() {
  const breadcrumbs = breadcrumbsJsonLd([
    { name: "Home", url: SITE_URL },
    { name: "Plans", url: `${SITE_URL}/plans` },
  ]);

  const faq = faqJsonLd([
    {
      question: "What plans are available?",
      answer:
        "Plans include demo access, professional access, and enterprise options with different coverage and support levels.",
    },
    {
      question: "How do I start a trial?",
      answer:
        "Use the Get Started or trial links to access the MSPK user portal for trial activation.",
    },
    {
      question: "Can I share a referral code from MSPK?",
      answer:
        "Yes. MSPK users can share their referral code and referral trial link so new users can register through the correct referral journey.",
    },
  ]);

  return (
    <>
      <JsonLd data={[breadcrumbs, faq]} />
      <PlansPage />
    </>
  );
}
