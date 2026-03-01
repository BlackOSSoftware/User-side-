"use client";

import { type FormEvent, useMemo, useState } from "react";
import { Loader2, Mail, Phone, Send, Ticket } from "lucide-react";
import { useMeQuery } from "@/hooks/use-auth";
import { useCreateTicketMutation, useTicketsQuery } from "@/hooks/use-tickets";
import type { TicketItem } from "@/services/tickets/ticket.types";
import { useCreateDashboardTicketMutation, useDashboardTicketsQuery } from "@/services/dashboard-tickets/dashboard-ticket.hooks";

type TicketFormState = {
  subject: string;
  ticketType: string;
  description: string;
  contactEmail: string;
  contactNumber: string;
};

const DEFAULT_TICKET_TYPE = "Billing";

const initialForm: TicketFormState = {
  subject: "",
  ticketType: DEFAULT_TICKET_TYPE,
  description: "",
  contactEmail: "",
  contactNumber: "",
};

function getStatusClass(status: string) {
  const normalized = status.toLowerCase();
  if (normalized === "resolved") return "ticket-status ticket-status--resolved";
  if (normalized === "rejected") return "ticket-status ticket-status--rejected";
  return "ticket-status ticket-status--pending";
}

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function normalizeTickets(data: TicketItem[] | undefined): TicketItem[] {
  if (!Array.isArray(data)) return [];
  return [...data].sort((a, b) => {
    const left = new Date(b.createdAt).getTime();
    const right = new Date(a.createdAt).getTime();
    return left - right;
  });
}

export default function SupportPage() {
  const [form, setForm] = useState<TicketFormState>(initialForm);
  const [formError, setFormError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);

  const meQuery = useMeQuery(true);
  const ticketsQuery = useTicketsQuery(true);
  const createTicketMutation = useCreateTicketMutation();
  const createDashboardTicketMutation = useCreateDashboardTicketMutation();

  const tickets = useMemo(() => normalizeTickets(ticketsQuery.data), [ticketsQuery.data]);

  const pendingCount = tickets.filter((ticket) => ticket.status?.toLowerCase() === "pending").length;
  const resolvedCount = tickets.filter((ticket) => ticket.status?.toLowerCase() === "resolved").length;
  const rejectedCount = tickets.filter((ticket) => ticket.status?.toLowerCase() === "rejected").length;

  const updateField = (key: keyof TicketFormState, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError(null);
    setSubmitSuccess(null);

    const resolvedEmail = (form.contactEmail || meQuery.data?.email || "").trim();
    const resolvedNumber = (form.contactNumber || meQuery.data?.phone || "").trim();

    if (!form.subject.trim() || !form.description.trim() || !resolvedEmail || !resolvedNumber) {
      setFormError("Please fill subject, description, email and contact number.");
      return;
    }

    try {
      await createTicketMutation.mutateAsync({
        subject: form.subject.trim(),
        ticketType: form.ticketType.trim() || DEFAULT_TICKET_TYPE,
        description: form.description.trim(),
        contactEmail: resolvedEmail,
        contactNumber: resolvedNumber,
      });

      setSubmitSuccess("Ticket submitted successfully.");
      setForm((prev) => ({
        ...initialForm,
        contactEmail: prev.contactEmail,
        contactNumber: prev.contactNumber,
      }));
    } catch {
      setFormError("Unable to submit ticket. Please check data and try again.");
    }
  };

  const onSubmitDashboardTicket = async () => {
    setFormError(null);
    setSubmitSuccess(null);

    const resolvedEmail = (form.contactEmail || meQuery.data?.email || "").trim();
    const resolvedNumber = (form.contactNumber || meQuery.data?.phone || "").trim();

    if (!form.subject.trim() || !form.description.trim() || !resolvedEmail || !resolvedNumber) {
      setFormError("Please fill subject, description, email and contact number.");
      return;
    }

    try {
      await createDashboardTicketMutation.mutateAsync({
        subject: form.subject.trim(),
        ticketType: form.ticketType.trim() || DEFAULT_TICKET_TYPE,
        description: form.description.trim(),
        contactEmail: resolvedEmail,
        contactNumber: resolvedNumber,
      });
      setSubmitSuccess("Dashboard ticket submitted successfully.");
    } catch {
      setFormError("Unable to submit dashboard ticket. Please try again.");
    }
  };

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-2 py-2 sm:px-4 sm:py-4">
      <div className="glass-surface rounded-2xl p-4 sm:p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="flex items-center gap-2 text-base font-semibold text-foreground sm:text-xl">
              <Ticket className="text-primary" size={18} />
              Support Tickets
            </h1>
            <p className="mt-1 text-xs text-muted-foreground sm:text-sm">Raise a new ticket and track your support history.</p>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="rounded-xl bg-secondary/40 px-2 py-2">
              <p className="text-[10px] uppercase text-muted-foreground">Pending</p>
              <p className="text-sm font-semibold text-foreground">{pendingCount}</p>
            </div>
            <div className="rounded-xl bg-secondary/40 px-2 py-2">
              <p className="text-[10px] uppercase text-muted-foreground">Resolved</p>
              <p className="text-sm font-semibold text-foreground">{resolvedCount}</p>
            </div>
            <div className="rounded-xl bg-secondary/40 px-2 py-2">
              <p className="text-[10px] uppercase text-muted-foreground">Rejected</p>
              <p className="text-sm font-semibold text-foreground">{rejectedCount}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1.05fr_1.45fr]">
        <section className="glass-surface rounded-2xl p-4 sm:p-5">
          <h2 className="mb-4 text-sm font-semibold text-foreground sm:text-base">Create Ticket</h2>
          <form className="space-y-3" onSubmit={onSubmit}>
            <label className="block text-xs text-muted-foreground">
              Subject
              <input
                className="mt-1 w-full rounded-xl border border-border bg-background/50 px-3 py-2 text-sm text-foreground outline-none transition focus:border-primary/60"
                value={form.subject}
                onChange={(event) => updateField("subject", event.target.value)}
                placeholder="Payment issue"
                maxLength={120}
              />
            </label>

            <label className="block text-xs text-muted-foreground">
              Ticket Type
              <select
                className="mt-1 w-full rounded-xl border border-border bg-background/50 px-3 py-2 text-sm text-foreground outline-none transition focus:border-primary/60"
                value={form.ticketType}
                onChange={(event) => updateField("ticketType", event.target.value)}
              >
                <option value="Billing">Billing</option>
                <option value="Technical">Technical</option>
                <option value="Account">Account</option>
                <option value="General">General</option>
              </select>
            </label>

            <label className="block text-xs text-muted-foreground">
              Description
              <textarea
                className="mt-1 min-h-28 w-full resize-y rounded-xl border border-border bg-background/50 px-3 py-2 text-sm text-foreground outline-none transition focus:border-primary/60"
                value={form.description}
                onChange={(event) => updateField("description", event.target.value)}
                placeholder="Payment deducted but plan not active."
                maxLength={1000}
              />
            </label>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <label className="block text-xs text-muted-foreground">
                Contact Email
                <div className="relative mt-1">
                  <Mail size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    className="w-full rounded-xl border border-border bg-background/50 py-2 pl-9 pr-3 text-sm text-foreground outline-none transition focus:border-primary/60"
                    value={form.contactEmail || meQuery.data?.email || ""}
                    onChange={(event) => updateField("contactEmail", event.target.value)}
                    placeholder="user@test.com"
                    type="email"
                  />
                </div>
              </label>

              <label className="block text-xs text-muted-foreground">
                Contact Number
                <div className="relative mt-1">
                  <Phone size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    className="w-full rounded-xl border border-border bg-background/50 py-2 pl-9 pr-3 text-sm text-foreground outline-none transition focus:border-primary/60"
                    value={form.contactNumber || meQuery.data?.phone || ""}
                    onChange={(event) => updateField("contactNumber", event.target.value)}
                    placeholder="9876543210"
                    inputMode="tel"
                  />
                </div>
              </label>
            </div>

            {formError ? <p className="text-xs text-destructive">{formError}</p> : null}
            {submitSuccess ? <p className="text-xs text-emerald-500">{submitSuccess}</p> : null}

            <button
              type="submit"
              disabled={createTicketMutation.isPending}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {createTicketMutation.isPending ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
              Submit Ticket
            </button>

            <button
              type="button"
              onClick={onSubmitDashboardTicket}
              disabled={createDashboardTicketMutation.isPending}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-background/50 px-4 py-2.5 text-sm font-semibold text-foreground transition hover:border-primary/40 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {createDashboardTicketMutation.isPending ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
              Submit Dashboard Ticket
            </button>
          </form>
        </section>

        <section className="glass-surface rounded-2xl p-4 sm:p-5">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-foreground sm:text-base">Ticket History</h2>
            {ticketsQuery.isFetching ? <Loader2 size={16} className="animate-spin text-primary" /> : null}
          </div>

          {ticketsQuery.isLoading ? (
            <div className="py-10 text-center text-sm text-muted-foreground">Loading tickets...</div>
          ) : tickets.length === 0 ? (
            <div className="py-10 text-center text-sm text-muted-foreground">No tickets found.</div>
          ) : (
            <div className="max-h-[56vh] overflow-y-auto pr-1 custom-scrollbar">
              <div className="space-y-3">
              {tickets.map((ticket) => (
                <article key={ticket._id} className="rounded-2xl border border-border/70 bg-background/40 p-3 sm:p-4">
                  <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <p className="text-xs text-muted-foreground">{ticket.ticketId}</p>
                      <h3 className="text-sm font-semibold text-foreground sm:text-base">{ticket.subject}</h3>
                    </div>
                    <span className={getStatusClass(ticket.status)}>{ticket.status}</span>
                  </div>

                  <p className="text-xs text-muted-foreground sm:text-sm">{ticket.description}</p>

                  <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-muted-foreground sm:text-xs">
                    <span>Type: {ticket.ticketType}</span>
                    <span>Email: {ticket.contactEmail}</span>
                    <span>Phone: {ticket.contactNumber}</span>
                    <span>Created: {formatDate(ticket.createdAt)}</span>
                  </div>
                </article>
              ))}
              </div>
            </div>
          )}
        </section>

      </div>
    </div>
  );
}
