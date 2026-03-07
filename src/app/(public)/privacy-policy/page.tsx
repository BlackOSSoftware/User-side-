import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { JsonLd, breadcrumbsJsonLd, faqJsonLd } from "@/lib/seo/jsonld";
import { SITE_URL } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description:
    "Read MSPK Trade Solutions privacy policy covering data collection, usage, security, and user rights for our live trading signals platform.",
  path: "/privacy-policy",
  keywordsExtra: [
    "privacy policy",
    "data privacy",
    "trading signals privacy",
    "user data protection",
    "information security",
  ],
});

export default function PrivacyPolicyPage() {
  const breadcrumbs = breadcrumbsJsonLd([
    { name: "Home", url: SITE_URL },
    { name: "Privacy Policy", url: `${SITE_URL}/privacy-policy` },
  ]);

  const faq = faqJsonLd([
    {
      question: "What data does MSPK collect?",
      answer:
        "We collect contact information, usage data, and account details necessary to deliver our services.",
    },
    {
      question: "Does MSPK sell my data?",
      answer:
        "No. MSPK does not sell personal data. We only share with trusted service providers or when required by law.",
    },
  ]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <JsonLd data={[breadcrumbs, faq]} />
      <div className="mx-auto w-full max-w-5xl px-6 py-16 space-y-8">
        <header className="space-y-3">
          <h1 className="text-3xl md:text-4xl font-bold">Privacy Policy</h1>
          <p className="text-sm text-muted-foreground">Last updated: March 7, 2026</p>
          <p className="text-base text-muted-foreground leading-relaxed">
            MSPK Trade Solutions respects your privacy. This policy explains how we collect, use, and protect
            information when you use our website, signal services, and related tools.
          </p>
        </header>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Information We Collect</h2>
          <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
            <li>Contact details (such as name, email, phone) when you inquire or register.</li>
            <li>Usage data such as pages visited, interactions, device type, and browser details.</li>
            <li>Payment and billing information if you purchase a plan (processed by trusted providers).</li>
            <li>Support communications and feedback you send to us.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">How We Use Information</h2>
          <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
            <li>To provide and improve live trading signal services and platform access.</li>
            <li>To send onboarding details, alerts, and account-related updates.</li>
            <li>To personalize your experience and optimize content performance.</li>
            <li>To maintain security, prevent abuse, and comply with legal obligations.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Cookies and Tracking</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            We use cookies and similar technologies to analyze traffic, remember preferences, and improve
            performance. You can control cookies in your browser settings; disabling cookies may affect site
            functionality.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Data Sharing</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            We do not sell personal data. We may share information with service providers who help operate the
            platform (hosting, analytics, payments, communications) under strict confidentiality obligations,
            or when required by law.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Data Security</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            We implement reasonable technical and organizational safeguards to protect data. No online system is
            100% secure, but we continuously improve our protections.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Your Rights</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            You may request access, correction, or deletion of your data subject to legal requirements. To
            exercise these rights, contact us through the support channels listed on the Contact page.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Updates to This Policy</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            We may update this policy from time to time. Changes will be posted on this page with a revised
            date. Continued use of the site indicates acceptance of the updated policy.
          </p>
        </section>
      </div>
    </div>
  );
}
