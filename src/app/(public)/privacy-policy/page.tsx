import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { JsonLd, breadcrumbsJsonLd, faqJsonLd } from "@/lib/seo/jsonld";
import { SITE_URL } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description:
    "Read MSPK Trade Solutions privacy policy covering data collection, usage, security, and user rights for our educational market insights platform.",
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
    {
      question: "Are MSPK signals financial advice?",
      answer:
        "No. Signals and market insights are educational only and are not recommendations to trade.",
    },
  ]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <JsonLd data={[breadcrumbs, faq]} />
      <div className="mx-auto w-full max-w-5xl px-6 py-16 space-y-8">
        <header className="space-y-3">
          <h1 className="text-3xl md:text-4xl font-bold">Privacy Policy</h1>
          <p className="text-sm text-muted-foreground">Last updated: March 8, 2026</p>
          <p className="text-base text-muted-foreground leading-relaxed">
            MSPK Trade Solutions respects your privacy. This policy explains how we collect, use, and protect
            information when you use our website, app, signal services, and related tools.
          </p>
          <p className="text-base text-muted-foreground leading-relaxed">
            This policy applies to visitors, trial users, and subscribed users across all MSPK properties,
            including web pages, dashboards, and communication channels. By accessing or using the service,
            you agree to the terms described below.
          </p>
        </header>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Educational Use & Risk Disclaimer</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            MSPK Trade Solutions provides market information, charts, and educational content for general
            awareness only. We are not a registered investment advisor, broker, or portfolio manager, and we do
            not provide personalized financial, legal, tax, or investment advice. We do not place trades, handle
            funds, or provide brokerage services. Any trading signals, market views, examples, or commentary are
            shared strictly for educational purposes and should never be interpreted as a recommendation to buy,
            sell, or hold any security, derivative, or instrument.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            All trading decisions are made solely by you. Markets are inherently risky, and losses can exceed
            expectations. Past performance, hypothetical results, or example outcomes do not guarantee future
            performance. We do not promise profits, guaranteed accuracy, or specific returns under any
            circumstances. You should seek advice from a qualified professional before making any financial
            decisions.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            By using this website or app, you acknowledge and accept that you are responsible for your own
            decisions, risk management, and compliance with applicable laws in your jurisdiction.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Information We Collect</h2>
          <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
            <li>Contact details (such as name, email, phone) when you inquire or register.</li>
            <li>Account details and preferences you provide for service delivery.</li>
            <li>Usage data such as pages visited, interactions, device type, IP address, and browser details.</li>
            <li>Payment and billing information if you purchase a plan (processed by trusted providers).</li>
            <li>Support communications and feedback you send to us.</li>
          </ul>
          <p className="text-sm text-muted-foreground leading-relaxed">
            We collect only the information reasonably necessary to operate, improve, and secure the service.
            Where possible, we minimize data collection and limit retention to what is required for legitimate
            business and legal purposes.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            If you connect external tools or request optional integrations, additional data may be processed
            to fulfill those requests. Such data is handled according to this policy and applicable provider
            terms.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">How We Use Information</h2>
          <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
            <li>To provide and improve live trading signal services and platform access.</li>
            <li>To send onboarding details, alerts, and account-related updates.</li>
            <li>To personalize your experience and optimize content performance.</li>
            <li>To maintain security, prevent abuse, and comply with legal obligations.</li>
          </ul>
          <p className="text-sm text-muted-foreground leading-relaxed">
            We do not use your personal information for unrelated marketing without consent. Operational
            communications may be sent to deliver the service or inform you of important changes, outages, or
            updates.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            We may analyze aggregated usage patterns to improve accuracy, platform responsiveness, and the
            quality of educational materials. Such analyses do not identify individual users.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Legal Basis for Processing (Where Applicable)</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Depending on your location, we process personal data based on one or more of the following legal
            bases: your consent, the performance of a contract (providing the service), our legitimate interests
            (security, improvement, and analytics), or compliance with legal obligations.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Cookies and Tracking</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            We use cookies and similar technologies to analyze traffic, remember preferences, and improve
            performance. You can control cookies in your browser settings; disabling cookies may affect site
            functionality.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            We may also use session identifiers and analytics tags to understand feature usage and improve the
            overall user experience.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Your Choices</h2>
          <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
            <li>You can opt out of non-essential emails using unsubscribe links in those messages.</li>
            <li>You can manage cookies and tracking settings in your browser.</li>
            <li>You can update your account profile details through your dashboard (if available).</li>
          </ul>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Certain operational communications are required to deliver the service and cannot be opted out of
            while an account remains active.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Account Credentials and Security</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            You are responsible for maintaining the confidentiality of your account credentials. Please notify
            us immediately if you suspect unauthorized access. We may suspend access for security reasons or if
            we detect abnormal activity.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Third-Party Services</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            We may use third-party services for analytics, payments, hosting, communications, and app delivery.
            These providers process data under their own privacy policies and contractual safeguards.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            We are not responsible for the privacy practices of third parties. We recommend reviewing the
            relevant policies of any service you use in connection with MSPK.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Data Sharing</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            We do not sell personal data. We may share information with service providers who help operate the
            platform (hosting, analytics, payments, communications) under strict confidentiality obligations,
            or when required by law.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            We may also share aggregated or anonymized data that cannot reasonably identify you, for research,
            analytics, or service improvement purposes.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Data Retention</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            We retain personal data only for as long as necessary to provide services, meet legal obligations,
            resolve disputes, and enforce agreements. When data is no longer needed, it is securely deleted or
            anonymized.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">International Transfers</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Your information may be processed in locations where service providers operate. We take reasonable
            steps to ensure appropriate safeguards are in place for cross-border data transfers in accordance
            with applicable laws.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">App Store Compliance</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            This policy applies to our website and mobile app. We do not promote guaranteed profits or
            ask users to trade. Any use of signals or market insights is at the user's sole discretion and risk.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            If any allegation or complaint arises regarding content, signals, or outcomes, you acknowledge that
            MSPK only provides educational information and does not control or execute user trades. Your use of
            the platform constitutes acceptance of this policy and its disclaimers.
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
          <h2 className="text-xl font-semibold">Children's Privacy</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Our services are intended for adults. We do not knowingly collect personal information from anyone
            under the age of 18. If you believe a minor has provided personal data, please contact us and we will
            take appropriate action.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Your Rights</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            You may request access, correction, or deletion of your data subject to legal requirements. To
            exercise these rights, contact us through the support channels listed on the Contact page.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            We may need to retain certain records to meet legal, regulatory, or security obligations.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Limitation of Liability</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            To the maximum extent permitted by law, MSPK Trade Solutions is not liable for any direct, indirect,
            incidental, special, or consequential damages arising from the use of information, signals, or tools
            provided through the service. You assume full responsibility for any trading activity you choose to
            undertake.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Contact Us</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            For privacy questions or requests, please contact us through the support channels listed on the
            Contact page. We respond to reasonable requests in accordance with applicable law.
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
