"use client";

import { useEffect, useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowUpRight,
  ArrowDownRight,
  Gem,
  Activity,
  BarChart2,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSignalsQuery } from "@/services/signals/signal.hooks";
import { useMarketSegmentsQuery } from "@/services/market/market.hooks";

export default function MarketPage() {
  const { data: marketSegments = [] } = useMarketSegmentsQuery();
  const segments = useMemo(
    () => ["All", ...marketSegments.map((seg) => seg.segment || seg.name || "").filter(Boolean)],
    [marketSegments]
  );
  const [activeSegment, setActiveSegment] = useState("All");
  const signalsQuery = useSignalsQuery(
    activeSegment && activeSegment !== "All" ? { segment: activeSegment.toUpperCase(), limit: 12 } : { limit: 12 }
  );
  const signals = signalsQuery.data?.results ?? [];

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground relative overflow-hidden">

      {/* Soft Background Accent */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 blur-[120px] rounded-full -z-10" />

      <div className="w-full max-w-7xl mx-auto px-6 py-20">

        {/* ================= HERO ================= */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-28">

          {/* LEFT */}
          <div className="space-y-8">

            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
              Institutional Signal Desk
            </div>

            <h1 className="text-5xl md:text-7xl font-bold leading-[1] tracking-tight">
              Real-Time Market
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">
                Intelligence, Curated.
              </span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
              Actionable opportunities across Forex, Crypto, Commodities, and Indices,
              built for traders who execute with precision and risk discipline.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="rounded-full px-8">
                Access Live Signals
              </Button>
              <Button size="lg" variant="outline" className="rounded-full px-8">
                Compare Membership Plans
              </Button>
            </div>

          </div>

          {/* RIGHT SIDE */}
          <div className="space-y-10">

            <TypingBlock />

            <div className="grid grid-cols-2 gap-6 bg-white/70 dark:bg-white/5 backdrop-blur-xl p-8 rounded-[2rem] border border-black/5 dark:border-white/10 shadow-xl">

              {[
                { title: "Forex", icon: <Activity className="w-5 h-5" /> },
                { title: "Indexes", icon: <BarChart2 className="w-5 h-5" /> },
                { title: "Metals", icon: <Gem className="w-5 h-5" /> },
                { title: "Crypto", icon: <Zap className="w-5 h-5" /> },
              ].map((item, i) => (
                <div
                  key={i}
                  className="p-6 rounded-2xl bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                >
                  <div className="flex items-center gap-3 text-primary font-semibold mb-2">
                    {item.icon}
                    {item.title}
                  </div>
                  <p className="text-sm text-muted-foreground">View opportunities</p>
                </div>
              ))}

            </div>

          </div>
        </div>

        {/* ================= SIGNAL TABS ================= */}

        <Tabs defaultValue="All" className="w-full space-y-12" onValueChange={setActiveSegment}>

          <TabsList className="bg-transparent p-0 gap-3 flex-wrap">
            {segments.map((seg) => (
              <TabsTrigger
                key={seg}
                value={seg}
                className="px-6 py-2 rounded-full border border-border bg-card text-muted-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                {seg}
              </TabsTrigger>
            ))}
          </TabsList>

          {segments.map((seg) => (
            <TabsContent key={seg} value={seg} className="space-y-8">

              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

                {signals.filter(
                  (s) => seg === "All" || (s.segment || "").toUpperCase() === seg.toUpperCase()
                ).map((signal) => (

                  <Card
                    key={signal._id}
                    className="rounded-[2rem] bg-white dark:bg-zinc-900/50 border border-border hover:-translate-y-1 transition-all duration-300"
                  >

                    <CardHeader className="p-6 pb-0 flex flex-row justify-between items-start">

                      <div>
                        <Badge variant="secondary" className="mb-3">
                          {signal.segment || "Segment"}
                        </Badge>

                        <CardTitle className="text-2xl font-bold">
                          {signal.symbol || "Symbol"}
                        </CardTitle>
                      </div>

                      <div
                        className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${
                          (signal.type || "BUY") === "BUY"
                            ? "bg-green-500/10 text-green-500"
                            : "bg-red-500/10 text-red-500"
                        }`}
                      >
                        {(signal.type || "BUY") === "BUY" ? (
                          <ArrowUpRight className="w-3 h-3" />
                        ) : (
                          <ArrowDownRight className="w-3 h-3" />
                        )}
                        {signal.type || "BUY"}
                      </div>

                    </CardHeader>

                    <CardContent className="p-6 space-y-6">

                      <div>
                        <div className="text-xs text-muted-foreground uppercase">
                          Entry Price
                        </div>
                        <div className="text-3xl font-bold">
                          {signal.entry?.toLocaleString?.() ?? "-"}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 rounded-xl bg-red-500/5">
                          <div className="text-xs text-red-500 uppercase">
                            Stop Loss
                          </div>
                          <div className="font-bold">
                            {signal.stopLoss?.toLocaleString?.() ?? "-"}
                          </div>
                        </div>

                        <div className="p-4 rounded-xl bg-green-500/5">
                          <div className="text-xs text-green-500 uppercase">
                            Target
                          </div>
                          <div className="font-bold">
                            {signal.targets?.[0]?.toLocaleString?.() ?? "-"}
                          </div>
                        </div>
                      </div>

                    </CardContent>

                  </Card>
                ))}

              </div>

            </TabsContent>
          ))}

        </Tabs>

      </div>
    </div>
  );
}

/* ================= Typing Animation ================= */

function TypingBlock() {
  const words = ["Precision Entries.", "Disciplined Risk.", "Institutional Clarity."];
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);

  useEffect(() => {
    if (subIndex === words[index].length + 1 && !reverse) {
      setTimeout(() => setReverse(true), 1000);
      return;
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? 40 : 70);

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse]);

  return (
    <div className="text-3xl md:text-4xl font-bold text-primary h-[50px]">
      {words[index].substring(0, subIndex)}
      <span className="animate-pulse">|</span>
    </div>
  );
}
