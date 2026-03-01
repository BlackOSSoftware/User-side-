"use client";

import { useMemo, useState } from "react";
import { useSignalsQuery, useSignalAnalysisQuery } from "@/services/signals/signal.hooks";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

export default function SignalsPage() {
    const [segment, setSegment] = useState("");
    const [status, setStatus] = useState("");
    const [type, setType] = useState("");
    const [page, setPage] = useState(1);
    const [selectedId, setSelectedId] = useState("");

    const { data } = useSignalsQuery({
        page,
        limit: 10,
        ...(segment ? { segment } : {}),
        ...(status ? { status } : {}),
        ...(type ? { type } : {}),
    });

    const signals = data?.results ?? [];
    const pagination = data?.pagination;
    const analysisQuery = useSignalAnalysisQuery(selectedId, Boolean(selectedId));

    const stats = useMemo(() => {
        const total = pagination?.totalResults ?? signals.length;
        const buy = signals.filter((s) => s.type?.toUpperCase() === "BUY").length;
        const sell = signals.filter((s) => s.type?.toUpperCase() === "SELL").length;
        return { total, buy, sell };
    }, [signals, pagination]);

    return (
        <div className="flex-1 space-y-6 sm:space-y-8 py-2">
            <div className="space-y-2">
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight">Trading Signals</h2>
                <p className="text-xs sm:text-sm text-muted-foreground">Explore active signals and analyze performance.</p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
                <Card className="border-border/60 bg-white/80 dark:bg-white/5 backdrop-blur-xl rounded-[1.25rem]">
                    <CardContent className="p-4 text-sm">
                        <div className="text-xs text-muted-foreground">Total Signals</div>
                        <div className="text-lg font-semibold text-foreground">{stats.total}</div>
                    </CardContent>
                </Card>
                <Card className="border-border/60 bg-white/80 dark:bg-white/5 backdrop-blur-xl rounded-[1.25rem]">
                    <CardContent className="p-4 text-sm">
                        <div className="text-xs text-muted-foreground">Buy Signals</div>
                        <div className="text-lg font-semibold text-emerald-500">{stats.buy}</div>
                    </CardContent>
                </Card>
                <Card className="border-border/60 bg-white/80 dark:bg-white/5 backdrop-blur-xl rounded-[1.25rem]">
                    <CardContent className="p-4 text-sm">
                        <div className="text-xs text-muted-foreground">Sell Signals</div>
                        <div className="text-lg font-semibold text-rose-500">{stats.sell}</div>
                    </CardContent>
                </Card>
            </div>

            <Card className="border-border/60 bg-white/80 dark:bg-white/5 backdrop-blur-xl rounded-[1.5rem]">
                <CardContent className="p-4 sm:p-6 space-y-4">
                    <div className="grid gap-3 sm:grid-cols-3">
                        <select
                            value={segment}
                            onChange={(e) => setSegment(e.target.value)}
                            className="h-11 rounded-xl border border-border/60 bg-background px-3 text-sm text-foreground focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/20"
                        >
                            <option value="">All Segments</option>
                            <option value="EQUITY">Equity</option>
                            <option value="CRYPTO">Crypto</option>
                            <option value="COMMODITY">Commodity</option>
                            <option value="FOREX">Forex</option>
                            <option value="OPTIONS">Options</option>
                        </select>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="h-11 rounded-xl border border-border/60 bg-background px-3 text-sm text-foreground focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/20"
                        >
                            <option value="">All Status</option>
                            <option value="active">Active</option>
                            <option value="closed">Closed</option>
                        </select>
                        <select
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            className="h-11 rounded-xl border border-border/60 bg-background px-3 text-sm text-foreground focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/20"
                        >
                            <option value="">All Types</option>
                            <option value="BUY">Buy</option>
                            <option value="SELL">Sell</option>
                        </select>
                    </div>
                </CardContent>
            </Card>

            <div className="grid gap-4 lg:grid-cols-[1.4fr_0.9fr]">
                <div className="space-y-4">
                    {signals.length === 0 ? (
                        <Card className="border-border/60 bg-white/80 dark:bg-white/5 backdrop-blur-xl rounded-[1.5rem]">
                            <CardContent className="p-6 text-sm text-muted-foreground">No signals found.</CardContent>
                        </Card>
                    ) : (
                        signals.map((signal) => (
                            <Card
                                key={signal._id}
                                className="border-border/60 bg-white/80 dark:bg-white/5 backdrop-blur-xl rounded-[1.5rem] transition hover:border-primary/40"
                            >
                                <CardContent className="p-5 space-y-4">
                                    <div className="flex flex-wrap items-center justify-between gap-3">
                                        <div>
                                            <div className="text-xs uppercase tracking-wider text-muted-foreground">{signal.segment || "Segment"}</div>
                                            <div className="text-lg font-semibold text-foreground">{signal.symbol || "Signal"}</div>
                                        </div>
                                        <div
                                            className={`flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${
                                                signal.type?.toUpperCase() === "SELL"
                                                    ? "bg-rose-500/10 text-rose-500"
                                                    : "bg-emerald-500/10 text-emerald-500"
                                            }`}
                                        >
                                            {signal.type?.toUpperCase() === "SELL" ? (
                                                <ArrowDownRight className="h-3 w-3" />
                                            ) : (
                                                <ArrowUpRight className="h-3 w-3" />
                                            )}
                                            {signal.type || "BUY"}
                                        </div>
                                    </div>

                                    <div className="grid gap-3 sm:grid-cols-3 text-sm">
                                        <div className="rounded-xl border border-border/50 bg-muted/30 px-3 py-2">
                                            <div className="text-xs text-muted-foreground">Entry</div>
                                            <div className="font-semibold text-foreground">{signal.entry ?? "-"}</div>
                                        </div>
                                        <div className="rounded-xl border border-border/50 bg-muted/30 px-3 py-2">
                                            <div className="text-xs text-muted-foreground">Stop Loss</div>
                                            <div className="font-semibold text-foreground">{signal.stopLoss ?? "-"}</div>
                                        </div>
                                        <div className="rounded-xl border border-border/50 bg-muted/30 px-3 py-2">
                                            <div className="text-xs text-muted-foreground">Targets</div>
                                            <div className="font-semibold text-foreground">{signal.targets?.[0] ?? "-"}</div>
                                        </div>
                                    </div>

                                    <Button
                                        variant="outline"
                                        className="h-10 rounded-xl"
                                        onClick={() => setSelectedId(signal._id)}
                                    >
                                        View Analysis
                                    </Button>
                                </CardContent>
                            </Card>
                        ))
                    )}

                    <div className="flex items-center justify-between">
                        <Button variant="outline" className="h-10 rounded-xl" onClick={() => setPage((p) => Math.max(1, p - 1))}>
                            Previous
                        </Button>
                        <div className="text-xs text-muted-foreground">Page {pagination?.page ?? page}</div>
                        <Button variant="outline" className="h-10 rounded-xl" onClick={() => setPage((p) => p + 1)}>
                            Next
                        </Button>
                    </div>
                </div>

                <Card className="border-border/60 bg-white/80 dark:bg-white/5 backdrop-blur-xl rounded-[1.5rem] h-fit">
                    <CardHeader>
                        <CardTitle className="text-base">Signal Analysis</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-muted-foreground space-y-3">
                        {selectedId ? (
                            analysisQuery.isLoading ? (
                                <div>Loading analysis...</div>
                            ) : (
                                <pre className="whitespace-pre-wrap text-xs text-foreground">
                                    {JSON.stringify(analysisQuery.data ?? {}, null, 2)}
                                </pre>
                            )
                        ) : (
                            <div>Select a signal to view analysis.</div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
