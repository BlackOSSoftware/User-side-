import type { Metadata } from "next";
import { buildMetadata, SITE_URL } from "@/lib/seo/metadata";
import { JsonLd, breadcrumbsJsonLd, faqJsonLd } from "@/lib/seo/jsonld";

export const metadata: Metadata = buildMetadata({
  title: "Delete Account",
  description:
    "Request deletion of your MSPK Trade Solutions account and associated data in a simple, secure process.",
  path: "/delete-account",
  keywordsExtra: ["delete account", "data deletion", "account removal request"],
});

export default function DeleteAccountPage() {
  const breadcrumbs = breadcrumbsJsonLd([
    { name: "Home", url: SITE_URL },
    { name: "Delete Account", url: `${SITE_URL}/delete-account` },
  ]);

  const faq = faqJsonLd([
    {
      question: "How do I request account deletion?",
      answer:
        "Enter the email you used to register and submit the deletion request. We will verify ownership and process the request.",
    },
    {
      question: "What data is deleted?",
      answer:
        "We remove your account profile, alert preferences, and notification tokens. Some records may be retained if required by law or security policies.",
    },
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 text-foreground">
      <JsonLd data={[breadcrumbs, faq]} />
      <div className="mx-auto w-full max-w-5xl px-6 py-16">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-950/60 shadow-[0_30px_70px_-45px_rgba(15,23,42,0.85)]">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-emerald-500/20 blur-3xl" />
            <div className="absolute right-0 top-10 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />
            <div className="absolute bottom-0 left-1/3 h-60 w-60 rounded-full bg-blue-500/10 blur-3xl" />
          </div>

          <div className="relative grid gap-8 px-8 py-12 md:grid-cols-[1.1fr_0.9fr] md:px-12">
            <section className="space-y-6">
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-emerald-300">
                  MSPK Trade Solutions
                </p>
                <h1 className="text-3xl font-bold text-white md:text-4xl">
                  Delete Account Request
                </h1>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Use this page to request deletion of your MSPK account and associated data. For your
                  security, we verify ownership before completing deletion.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 space-y-4">
                <h2 className="text-base font-semibold text-white">What will be removed</h2>
                <div className="grid gap-3 text-sm text-slate-300">
                  <p>Account profile details and contact information.</p>
                  <p>Alert preferences, notification tokens, and device registrations.</p>
                  <p>Saved watchlists and personalized settings (if any).</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-slate-950/80 px-4 py-3 text-xs text-slate-400">
                  We may retain minimal records when required for legal, security, or compliance purposes.
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 space-y-3">
                <h2 className="text-base font-semibold text-white">Processing timeline</h2>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Once verified, deletion requests are typically completed within 7 business days.
                  You will receive a confirmation email after processing.
                </p>
              </div>
            </section>

            <section className="space-y-6">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_20px_45px_-30px_rgba(14,116,144,0.85)]">
                <h2 className="text-lg font-semibold text-white">Submit your request</h2>
                <p className="mt-2 text-sm text-slate-300">
                  Enter the email address that you used to register on MSPK.
                </p>
                <form className="mt-6 space-y-4">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                    Registered Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-400/70"
                  />
                  <button
                    type="button"
                    className="w-full rounded-xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
                  >
                    Submit Delete Request
                  </button>
                  <p className="text-xs text-slate-400">
                    By submitting, you confirm you own this account and consent to deletion after verification.
                  </p>
                </form>
              </div>

              <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 text-sm text-slate-300">
                Need help? Contact our support team with your registered email, and we will guide you through the
                process.
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
