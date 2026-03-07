import type { Metadata } from "next";
import ContactPage from "./page.client";
import { buildMetadata, SITE_URL } from "@/lib/seo/metadata";
import { JsonLd, breadcrumbsJsonLd, faqJsonLd } from "@/lib/seo/jsonld";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description:
    "Contact MSPK Trade Solutions for live trading signals, onboarding help, and platform support.",
  path: "/contact",
  keywordsExtra: ["contact trading signals", "signal support", "onboarding help"],
});

export default function Page() {
  const breadcrumbs = breadcrumbsJsonLd([
    { name: "Home", url: SITE_URL },
    { name: "Contact", url: `${SITE_URL}/contact` },
  ]);

  const faq = faqJsonLd([
    {
      question: "How do I contact MSPK Trade Solutions?",
      answer:
        "Use the contact form or official support channels listed on this page for onboarding or support requests.",
    },
    {
      question: "How long does onboarding take?",
      answer:
        "Onboarding typically starts quickly after you reach out with your preferred market segment.",
    },
  ]);

  return (
    <>
      <JsonLd data={[breadcrumbs, faq]} />
      <ContactPage />
    </>
  );
}
