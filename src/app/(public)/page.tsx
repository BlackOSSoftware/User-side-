import type { Metadata } from "next";
import HomePage from "./page.client";
import { buildMetadata } from "@/lib/seo/metadata";
import { JsonLd, breadcrumbsJsonLd, faqJsonLd } from "@/lib/seo/jsonld";
import { SITE_URL } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Live Trading Signals",
  description:
    "MSPK Trade Solutions provides live trading signals with entry, stop-loss, and target levels across forex, commodities, indices, and Indian markets.",
  path: "/",
  keywordsExtra: [
    "forex signals",
    "comex signals",
    "mcx signals",
    "indian market signals",
    "nifty signals",
    "bank nifty signals",
    "live tradingview signals",
    "signal service india",
  ],
});

export default function Page() {
  const breadcrumbs = breadcrumbsJsonLd([
    { name: "Home", url: SITE_URL },
  ]);

  const faq = faqJsonLd([
    {
      question: "What does MSPK Trade Solutions provide?",
      answer:
        "We provide live trading signals with entry, stop-loss, and target levels across forex, commodities, indices, and Indian markets.",
    },
    {
      question: "Are the signals real time?",
      answer:
        "Yes. Signals are delivered in real time with clear execution context and disciplined risk guidance.",
    },
    {
      question: "How do I start a trial or login?",
      answer:
        "Use the Get Started and Login links to access the trial and client portal on the official MSPK user site.",
    },
  ]);

  return (
    <>
      <JsonLd data={[breadcrumbs, faq]} />
      <HomePage />
    </>
  );
}
