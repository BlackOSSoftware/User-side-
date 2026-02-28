"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Headphones, Sparkles, ShieldCheck, Zap } from "lucide-react";
import { useCreateTicketMutation } from "@/services/tickets/ticket.hooks";

type StatusState = "idle" | "loading" | "success" | "error";

export default function ContactPage() {
  const createTicketMutation = useCreateTicketMutation();
  const [status, setStatus] = useState<StatusState>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "General Inquiry",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      await createTicketMutation.mutateAsync({
        subject: formData.subject.trim(),
        ticketType: formData.subject.trim(),
        description: `${formData.message.trim()}\n\nName: ${formData.name.trim()}`.trim(),
        contactEmail: formData.email.trim(),
        contactNumber: formData.phone.trim(),
      });

      setStatus("success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "General Inquiry",
        message: "",
      });
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Unable to submit your request.");
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-48 left-1/2 h-[520px] w-[920px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.25),transparent_65%)] blur-[120px] dark:bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.35),transparent_65%)]" />
        <div className="absolute -bottom-40 right-0 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle_at_center,rgba(79,70,229,0.22),transparent_65%)] blur-[110px] dark:bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.4),transparent_65%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.16)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.16)_1px,transparent_1px)] bg-[size:28px_28px] opacity-40 dark:bg-[linear-gradient(to_right,rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.08)_1px,transparent_1px)] dark:opacity-50" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-6 pb-24 pt-28">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/40 bg-sky-400/15 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-sky-700 dark:border-sky-400/30 dark:bg-sky-400/10 dark:text-sky-200">
              <Sparkles className="h-4 w-4" />
              Priority Support
            </div>

            <div className="space-y-5">
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                Connect with the desk that solves it, not a queue that delays it.
              </h1>
              <p className="max-w-2xl text-base text-muted-foreground sm:text-lg">
                Every request is routed through a specialized signal desk and tracked in real time. Send the details and
                our team responds with exact next steps.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { icon: Mail, title: "Email", val: "support@mspktrading.com" },
                { icon: Phone, title: "Phone", val: "+91 93018 93055" },
                { icon: MapPin, title: "Office", val: "Indore, India" },
                { icon: Headphones, title: "Support Hours", val: "24/7 Active Desk" },
              ].map((item) => (
                <div
                  key={item.title}
                  className="group relative overflow-hidden rounded-2xl bg-card/80 p-5 shadow-[0_0_0_1px_rgba(148,163,184,0.08)] transition duration-500 hover:shadow-[0_0_45px_rgba(56,189,248,0.12)] dark:bg-slate-900/40"
                >
                  <div className="absolute inset-0 translate-y-full bg-gradient-to-r from-transparent via-sky-400/10 to-transparent opacity-0 transition duration-700 group-hover:translate-y-0 group-hover:opacity-100" />
                  <div className="relative flex items-start gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-400/10 text-sky-700 dark:text-sky-200">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{item.title}</p>
                      <p className="text-sm text-muted-foreground">{item.val}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid gap-5 rounded-3xl bg-gradient-to-br from-slate-100/80 via-white/60 to-slate-50/70 p-6 shadow-[0_0_0_1px_rgba(148,163,184,0.08)] dark:from-slate-900/70 dark:via-slate-900/30 dark:to-slate-950/60">
              {[
                {
                  icon: ShieldCheck,
                  title: "Verified Routing",
                  desc: "Tickets are tagged by product, risk tier, and strategy desk in minutes.",
                },
                {
                  icon: Zap,
                  title: "Faster Escalation",
                  desc: "Execution-impacting requests are escalated automatically to senior support.",
                },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-4">
                  <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-200">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-base font-semibold text-foreground">{item.title}</p>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="rounded-[28px] bg-card/80 p-6 shadow-[0_16px_40px_rgba(15,23,42,0.18)] backdrop-blur dark:bg-slate-900/70 dark:shadow-[0_16px_40px_rgba(15,23,42,0.35)]">
              <div className="mb-6 space-y-2">
                <p className="text-sm font-semibold uppercase tracking-[0.35em] text-muted-foreground">Support Ticket</p>
                <h2 className="text-2xl font-semibold text-foreground">Send your request</h2>
                <p className="text-sm text-muted-foreground">
                  Share the full context so we can route the request to the right desk instantly.
                </p>
              </div>

              {status === "success" ? (
                <div className="rounded-2xl bg-emerald-400/10 p-5 text-emerald-700 dark:text-emerald-100">
                  <p className="text-base font-semibold">Request received.</p>
                  <p className="text-sm text-emerald-700/80 dark:text-emerald-100/80">
                    Your ticket is active. A specialist will respond with next steps shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="grid gap-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Full Name"
                      className="h-12 rounded-xl bg-background/70 px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-sky-400/30 dark:bg-slate-950/60"
                    />
                    <input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="Email Address"
                      className="h-12 rounded-xl bg-background/70 px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-sky-400/30 dark:bg-slate-950/60"
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <input
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="Phone Number"
                      className="h-12 rounded-xl bg-background/70 px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-sky-400/30 dark:bg-slate-950/60"
                    />
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="h-12 rounded-xl bg-background/70 px-4 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-sky-400/30 dark:bg-slate-950/60"
                    >
                      <option>General Inquiry</option>
                      <option>Plans</option>
                      <option>Technical</option>
                      <option>Account</option>
                      <option>Signals</option>
                    </select>
                  </div>

                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    required
                    placeholder="Describe the issue or request in detail."
                    className="rounded-2xl bg-background/70 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-sky-400/30 dark:bg-slate-950/60"
                  />

                  {status === "error" ? (
                    <div className="rounded-xl bg-rose-500/10 px-4 py-3 text-sm text-rose-700 dark:text-rose-100">
                      {errorMessage}
                    </div>
                  ) : null}

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="group relative mt-2 overflow-hidden rounded-2xl bg-gradient-to-r from-sky-400 via-indigo-400 to-fuchsia-400 px-6 py-4 text-sm font-semibold text-slate-950 shadow-[0_18px_40px_rgba(56,189,248,0.35)] transition duration-300 hover:scale-[1.01] hover:shadow-[0_22px_50px_rgba(129,140,248,0.4)] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition duration-700 group-hover:translate-x-full" />
                    <span className="relative">
                      {status === "loading" ? "Submitting request..." : "Submit Ticket"}
                    </span>
                  </button>
                </form>
              )}
            </div>

            <div className="mt-6 rounded-[22px] bg-card/70 p-5 text-sm text-muted-foreground dark:bg-slate-900/60">
              <p className="text-sm font-semibold text-foreground">Response Window</p>
              <p className="mt-2 text-muted-foreground">
                Standard issues are answered within the same business day. Trading-critical requests are prioritized
                automatically.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
