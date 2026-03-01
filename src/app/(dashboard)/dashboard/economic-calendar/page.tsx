"use client";

import { useState } from "react";
import { useEconomicCalendarQuery } from "@/services/economic-calendar/economic-calendar.hooks";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function EconomicCalendarPage() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const { data = [], isLoading, refetch } = useEconomicCalendarQuery(
    from || to ? { from, to } : undefined
  );

  const events = Array.isArray(data) ? data : [];

  const formatDate = (value?: string) => {
    if (!value) return "-";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    return new Intl.DateTimeFormat("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const impactClass = (impact?: string) => {
    const normalized = (impact || "").toLowerCase();
    if (normalized === "high") return "bg-rose-500/10 text-rose-500";
    if (normalized === "medium") return "bg-amber-500/10 text-amber-500";
    return "bg-emerald-500/10 text-emerald-500";
  };

  return (
    <div className="flex-1 space-y-8 py-2">
      <div className="relative overflow-hidden rounded-[2rem] bg-[linear-gradient(135deg,hsl(var(--background))_0%,hsl(var(--background))_55%,hsl(var(--primary)/0.12)_100%)] p-6 sm:p-8">
        <div className="absolute inset-0 opacity-60 bg-[radial-gradient(circle_at_top,_hsl(var(--primary)/0.18),transparent_55%)]" />
        <div className="absolute -right-32 -top-24 h-64 w-64 rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute -left-32 -bottom-24 h-64 w-64 rounded-full bg-accent/15 blur-3xl" />
        <div className="relative space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
            Event Radar
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">Economic Calendar</h2>
          <p className="text-sm text-muted-foreground max-w-2xl">
            Curated macro releases with real-time impact tagging and comparative values.
          </p>
        </div>
      </div>

      <Card className="bg-white/60 dark:bg-white/5 rounded-[1.5rem] border border-border/30">
        <CardContent className="p-4 sm:p-6 space-y-4">
          <div className="grid gap-3 sm:grid-cols-[1fr_1fr_auto_auto]">
            <input
              type="date"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="h-11 rounded-xl bg-background/70 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <input
              type="date"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="h-11 rounded-xl bg-background/70 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <Button className="h-11 rounded-xl" onClick={() => refetch()}>
              Load Events
            </Button>
            <Button
              variant="outline"
              className="h-11 rounded-xl"
              onClick={() => {
                setFrom("");
                setTo("");
                refetch();
              }}
            >
              Reset Dates
            </Button>
          </div>
        </CardContent>
      </Card>

      {isLoading ? (
        <Card className="bg-white/60 dark:bg-white/5 rounded-[1.5rem] border border-border/30">
          <CardContent className="p-6 text-sm text-muted-foreground">Loading events...</CardContent>
        </Card>
      ) : events.length === 0 ? (
        <Card className="bg-white/60 dark:bg-white/5 rounded-[1.5rem] border border-border/30">
          <CardContent className="p-6 text-center text-sm text-muted-foreground">No events found.</CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {events.map((event, index) => (
            <div
              key={event._id || event.eventId || `${event.event}-${index}`}
              className="group relative overflow-hidden rounded-[1.75rem] bg-[linear-gradient(160deg,rgba(255,255,255,0.5)_0%,rgba(255,255,255,0.2)_55%,hsl(var(--primary)/0.08)_100%)] dark:bg-[linear-gradient(160deg,rgba(255,255,255,0.06)_0%,rgba(255,255,255,0.02)_55%,hsl(var(--primary)/0.12)_100%)] p-4 sm:p-5 transition"
            >
              <div className="absolute inset-0 opacity-0 transition group-hover:opacity-100 bg-[radial-gradient(circle_at_top,_hsl(var(--primary)/0.18),transparent_60%)]" />
              <div className="relative space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-[11px] uppercase tracking-wider text-muted-foreground">
                      {event.country || "Global"} · {event.currency || "—"}
                    </div>
                    <div className="text-base font-semibold text-foreground">{event.event || "Event"}</div>
                    <div className="text-xs text-muted-foreground">{formatDate(event.date)}</div>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-[10px] font-semibold ${impactClass(event.impact)}`}>
                    {event.impact || "Low"} Impact
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-[11px] text-muted-foreground">
                  <div className="rounded-xl bg-background/60 px-3 py-2">
                    <div className="uppercase tracking-wider">Actual</div>
                    <div className="text-sm font-semibold text-foreground">{event.actual ?? "-"}</div>
                  </div>
                  <div className="rounded-xl bg-background/60 px-3 py-2">
                    <div className="uppercase tracking-wider">Forecast</div>
                    <div className="text-sm font-semibold text-foreground">{event.forecast ?? "-"}</div>
                  </div>
                  <div className="rounded-xl bg-background/60 px-3 py-2">
                    <div className="uppercase tracking-wider">Previous</div>
                    <div className="text-sm font-semibold text-foreground">{event.previous ?? "-"}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
