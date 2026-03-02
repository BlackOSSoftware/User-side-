"use client";

import { useMemo, useState } from "react";
import { useSignalsQuery, useSignalAnalysisQuery } from "@/services/signals/signal.hooks";
import type { SignalItem } from "@/services/signals/signal.types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

const numberFormatter = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 2 });

function getSignalId(signal: SignalItem) {
    return signal.id || signal._id || "";
}

function getSignalKey(signal: SignalItem) {
    return (
        getSignalId(signal) ||
        [signal.symbol, signal.type, signal.signalTime || signal.timestamp || signal.createdAt].filter(Boolean).join("|")
    );
}

function getEntry(signal: SignalItem) {
    if (typeof signal.entry === "number") return signal.entry;
    if (typeof signal.entryPrice === "number") return signal.entryPrice;
    return undefined;
}

function getStopLoss(signal: SignalItem) {
    if (typeof signal.stoploss === "number") return signal.stoploss;
    if (typeof signal.stopLoss === "number") return signal.stopLoss;
    return undefined;
}

function getTargets(signal: SignalItem) {
    if (!signal.targets) return [];
    if (Array.isArray(signal.targets)) return signal.targets.filter((val) => typeof val === "number");
    const { target1, target2, target3, t1, t2, t3 } = signal.targets;
    return [target1 ?? t1, target2 ?? t2, target3 ?? t3].filter((val): val is number => typeof val === "number");
}

function formatPrice(value?: number) {
    if (typeof value !== "number") return "-";
    return numberFormatter.format(value);
}

function formatDate(value?: string) {
    if (!value) return "-";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    return date.toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}

export default function SignalsPage() {
    const [segment, setSegment] = useState("");
    const [status, setStatus] = useState("");
    const [type, setType] = useState("");
    const [timeframe, setTimeframe] = useState("");
    const [dateFilter, setDateFilter] = useState("");
    const [search, setSearch] = useState("");
    const [symbol, setSymbol] = useState("");
    const [page, setPage] = useState(1);
    const [selectedId, setSelectedId] = useState("");

    const { data, isLoading, error } = useSignalsQuery({
        page,
        limit: 10,
        ...(segment ? { segment } : {}),
        ...(status ? { status } : {}),
        ...(type ? { type } : {}),
        ...(timeframe ? { timeframe } : {}),
        ...(dateFilter ? { dateFilter } : {}),
        ...(search ? { search } : {}),
        ...(symbol ? { symbol } : {}),
    });

    const signals = data?.results ?? [];
    const pagination = data?.pagination;
    const analysisQuery = useSignalAnalysisQuery(selectedId, Boolean(selectedId));
    const selectedSignal = useMemo(() => signals.find((item) => getSignalId(item) === selectedId), [signals, selectedId]);

    const stats = useMemo(() => {
        const total = data?.stats?.totalSignals ?? pagination?.totalResults ?? signals.length;
        const active = data?.stats?.activeSignals ?? signals.filter((s) => s.status?.toLowerCase() === "active").length;
        const closed = data?.stats?.closedSignals ?? signals.filter((s) => s.status?.toLowerCase() === "closed").length;
        const successRate = data?.stats?.successRate;
        return { total, active, closed, successRate };
    }, [signals, pagination, data?.stats]);

    const totalPages = pagination?.totalPages ?? 1;
    const currentPage = pagination?.page ?? page;

    return (
        <div className="flex-1 space-y-6 sm:space-y-8 py-2">
            <div className="space-y-2">
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight">Trading Signals</h2>
                <p className="text-xs sm:text-sm text-muted-foreground">Monitor live entries, exits, and analysis across segments.</p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <Card className="border-border/60 bg-white/80 dark:bg-white/5 backdrop-blur-xl rounded-[1.25rem]">
                    <CardContent className="p-4 text-sm">
                        <div className="text-xs text-muted-foreground">Total Signals</div>
                        <div className="text-lg font-semibold text-foreground">{stats.total}</div>
                    </CardContent>
                </Card>
                <Card className="border-border/60 bg-white/80 dark:bg-white/5 backdrop-blur-xl rounded-[1.25rem]">
                    <CardContent className="p-4 text-sm">
                        <div className="text-xs text-muted-foreground">Active</div>
                        <div className="text-lg font-semibold text-emerald-600">{stats.active}</div>
                    </CardContent>
                </Card>
                <Card className="border-border/60 bg-white/80 dark:bg-white/5 backdrop-blur-xl rounded-[1.25rem]">
                    <CardContent className="p-4 text-sm">
                        <div className="text-xs text-muted-foreground">Closed</div>
                        <div className="text-lg font-semibold text-rose-500">{stats.closed}</div>
                    </CardContent>
                </Card>
                <Card className="border-border/60 bg-white/80 dark:bg-white/5 backdrop-blur-xl rounded-[1.25rem]">
                    <CardContent className="p-4 text-sm">
                        <div className="text-xs text-muted-foreground">Success Rate</div>
                        <div className="text-lg font-semibold text-foreground">
                            {typeof stats.successRate === "number" ? `${stats.successRate.toFixed(0)}%` : "-"}
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card className="border-border/60 bg-white/80 dark:bg-white/5 backdrop-blur-xl rounded-[1.5rem]">
                <CardContent className="p-4 sm:p-6 space-y-4">
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                        <input
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                setPage(1);
                            }}
                            placeholder="Search symbol or id"
                            className="h-11 rounded-xl border border-border/60 bg-background px-3 text-sm text-foreground focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                        <input
                            value={symbol}
                            onChange={(e) => {
                                setSymbol(e.target.value);
                                setPage(1);
                            }}
                            placeholder="Symbol (e.g. NIFTY)"
                            className="h-11 rounded-xl border border-border/60 bg-background px-3 text-sm text-foreground focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                        <select
                            value={segment}
                            onChange={(e) => {
                                setSegment(e.target.value);
                                setPage(1);
                            }}
                            className="h-11 rounded-xl border border-border/60 bg-background px-3 text-sm text-foreground focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/20"
                        >
                            <option value="">All Segments</option>
                            <option value="NSE">NSE</option>
                            <option value="NFO">NFO</option>
                            <option value="MCX">MCX</option>
                            <option value="CDS">CDS</option>
                            <option value="BINANCE">BINANCE</option>
                        </select>
                        <select
                            value={status}
                            onChange={(e) => {
                                setStatus(e.target.value);
                                setPage(1);
                            }}
                            className="h-11 rounded-xl border border-border/60 bg-background px-3 text-sm text-foreground focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/20"
                        >
                            <option value="">All Status</option>
                            <option value="Active">Active</option>
                            <option value="History">History</option>
                            <option value="!Closed">Not Closed</option>
                            <option value="Closed">Closed</option>
                        </select>
                        <select
                            value={type}
                            onChange={(e) => {
                                setType(e.target.value);
                                setPage(1);
                            }}
                            className="h-11 rounded-xl border border-border/60 bg-background px-3 text-sm text-foreground focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/20"
                        >
                            <option value="">All Types</option>
                            <option value="BUY">Buy</option>
                            <option value="SELL">Sell</option>
                        </select>
                        <select
                            value={timeframe}
                            onChange={(e) => {
                                setTimeframe(e.target.value);
                                setPage(1);
                            }}
                            className="h-11 rounded-xl border border-border/60 bg-background px-3 text-sm text-foreground focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/20"
                        >
                            <option value="">All Timeframes</option>
                            <option value="1m">1m</option>
                            <option value="5m">5m</option>
                            <option value="15m">15m</option>
                            <option value="1H">1H</option>
                            <option value="4H">4H</option>
                            <option value="1D">1D</option>
                        </select>
                        <select
                            value={dateFilter}
                            onChange={(e) => {
                                setDateFilter(e.target.value);
                                setPage(1);
                            }}
                            className="h-11 rounded-xl border border-border/60 bg-background px-3 text-sm text-foreground focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/20"
                        >
                            <option value="">All Dates</option>
                            <option value="Today">Today</option>
                            <option value="Yesterday">Yesterday</option>
                            <option value="This Week">This Week</option>
                        </select>
                        <Button
                            variant="outline"
                            className="h-11 rounded-xl"
                            onClick={() => {
                                setSearch("");
                                setSymbol("");
                                setSegment("");
                                setStatus("");
                                setType("");
                                setTimeframe("");
                                setDateFilter("");
                                setPage(1);
                            }}
                        >
                            Reset Filters
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <div className="grid gap-4 lg:grid-cols-[1.5fr_0.85fr]">
                <div className="space-y-4">
                    {isLoading ? (
                        <Card className="border-border/60 bg-white/80 dark:bg-white/5 backdrop-blur-xl rounded-[1.5rem]">
                            <CardContent className="p-6 text-sm text-muted-foreground">Loading signals...</CardContent>
                        </Card>
                    ) : error ? (
                        <Card className="border-border/60 bg-white/80 dark:bg-white/5 backdrop-blur-xl rounded-[1.5rem]">
                            <CardContent className="p-6 text-sm text-rose-500">Unable to load signals.</CardContent>
                        </Card>
                    ) : signals.length === 0 ? (
                        <Card className="border-border/60 bg-white/80 dark:bg-white/5 backdrop-blur-xl rounded-[1.5rem]">
                            <CardContent className="p-6 text-sm text-muted-foreground">No signals found.</CardContent>
                        </Card>
                    ) : (
                        <>
                            <Card className="border-border/60 bg-white/80 dark:bg-white/5 backdrop-blur-xl rounded-[1.5rem] overflow-hidden">
                                <div className="hidden md:block">
                                    <div className="grid grid-cols-[1.2fr_0.7fr_0.7fr_0.9fr_0.8fr_0.8fr_1.2fr_1fr_0.8fr] gap-4 px-5 py-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground border-b border-border/40">
                                        <div>Signal</div>
                                        <div>Type</div>
                                        <div>Status</div>
                                        <div>Entry</div>
                                        <div>SL</div>
                                        <div>Targets</div>
                                        <div>Signal Time</div>
                                        <div>Exit</div>
                                        <div>Points</div>
                                    </div>
                                    {signals.map((signal) => {
                                        const id = getSignalId(signal);
                                        const entry = getEntry(signal);
                                        const stop = getStopLoss(signal);
                                        const targets = getTargets(signal);
                                        const points = typeof signal.totalPoints === "number" ? signal.totalPoints : undefined;
                                        const isBuy = signal.type?.toUpperCase() !== "SELL";
                                        return (
                                            <div
                                                key={getSignalKey(signal)}
                                                className="grid grid-cols-[1.2fr_0.7fr_0.7fr_0.9fr_0.8fr_0.8fr_1.2fr_1fr_0.8fr] gap-4 px-5 py-3 text-xs border-b border-border/30 hover:bg-muted/20 transition cursor-pointer"
                                                onClick={() => setSelectedId(id)}
                                            >
                                                <div>
                                                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{signal.segment || "SEG"}</div>
                                                    <div className="font-semibold text-foreground">{signal.symbol || "Signal"}</div>
                                                    <div className="text-[10px] text-muted-foreground">{signal.timeframe || "-"}</div>
                                                </div>
                                                <div className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                                                    isBuy ? "bg-emerald-500/10 text-emerald-600" : "bg-rose-500/10 text-rose-500"
                                                }`}>
                                                    {isBuy ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                                                    {signal.type || "BUY"}
                                                </div>
                                                <div className="text-[10px] font-semibold text-muted-foreground">{signal.status || "-"}</div>
                                                <div className="font-semibold text-foreground">{formatPrice(entry)}</div>
                                                <div className="font-semibold text-foreground">{formatPrice(stop)}</div>
                                                <div className="text-[10px] text-muted-foreground">
                                                    {targets.length ? targets.map((t) => formatPrice(t)).join(" / ") : "-"}
                                                </div>
                                                <div className="text-[10px] text-muted-foreground">
                                                    {formatDate(signal.signalTime || signal.timestamp || signal.createdAt)}
                                                </div>
                                                <div className="text-[10px] text-muted-foreground">
                                                    {signal.exitPrice ? formatPrice(signal.exitPrice) : "-"}
                                                </div>
                                                <div className={`text-[10px] font-semibold ${
                                                    typeof points === "number" ? (points >= 0 ? "text-emerald-600" : "text-rose-500") : "text-muted-foreground"
                                                }`}>
                                                    {typeof points === "number" ? numberFormatter.format(points) : "-"}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                <div className="md:hidden space-y-3 p-4">
                                    {signals.map((signal) => {
                                        const id = getSignalId(signal);
                                        const entry = getEntry(signal);
                                        const stop = getStopLoss(signal);
                                        const targets = getTargets(signal);
                                        const isBuy = signal.type?.toUpperCase() !== "SELL";
                                        return (
                                            <div
                                                key={getSignalKey(signal)}
                                                className="rounded-2xl border border-border/50 bg-white/70 dark:bg-white/5 p-4 space-y-3"
                                                onClick={() => setSelectedId(id)}
                                            >
                                                <div className="flex items-center justify-between gap-3">
                                                    <div>
                                                        <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{signal.segment || "SEG"}</div>
                                                        <div className="text-lg font-semibold text-foreground">{signal.symbol || "Signal"}</div>
                                                    </div>
                                                    <div className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${
                                                        isBuy ? "bg-emerald-500/10 text-emerald-600" : "bg-rose-500/10 text-rose-500"
                                                    }`}>
                                                        {isBuy ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                                                        {signal.type || "BUY"}
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-2 gap-3 text-xs">
                                                    <div>
                                                        <div className="text-[10px] text-muted-foreground">Entry</div>
                                                        <div className="font-semibold text-foreground">{formatPrice(entry)}</div>
                                                    </div>
                                                    <div>
                                                        <div className="text-[10px] text-muted-foreground">Stop</div>
                                                        <div className="font-semibold text-foreground">{formatPrice(stop)}</div>
                                                    </div>
                                                    <div>
                                                        <div className="text-[10px] text-muted-foreground">Targets</div>
                                                        <div className="font-semibold text-foreground">
                                                            {targets.length ? targets.map((t) => formatPrice(t)).join(" / ") : "-"}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="text-[10px] text-muted-foreground">Status</div>
                                                        <div className="font-semibold text-foreground">{signal.status || "-"}</div>
                                                    </div>
                                                </div>
                                                <div className="text-[10px] text-muted-foreground">
                                                    {formatDate(signal.signalTime || signal.timestamp || signal.createdAt)}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </Card>

                            <div className="flex items-center justify-between">
                                <Button
                                    variant="outline"
                                    className="h-10 rounded-xl"
                                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                                    disabled={currentPage <= 1}
                                >
                                    Previous
                                </Button>
                                <div className="text-xs text-muted-foreground">
                                    Page {currentPage} of {totalPages}
                                </div>
                                <Button
                                    variant="outline"
                                    className="h-10 rounded-xl"
                                    onClick={() => setPage((p) => p + 1)}
                                    disabled={currentPage >= totalPages}
                                >
                                    Next
                                </Button>
                            </div>
                        </>
                    )}
                </div>

                <Card className="border-border/60 bg-white/80 dark:bg-white/5 backdrop-blur-xl rounded-[1.5rem] h-fit">
                    <CardHeader>
                        <CardTitle className="text-base">Signal Analysis</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-muted-foreground space-y-4">
                        {selectedId && selectedSignal ? (
                            <div className="rounded-2xl border border-border/50 bg-muted/20 px-4 py-3 text-xs space-y-2">
                                <div className="text-foreground font-semibold">{selectedSignal.symbol}</div>
                                <div className="text-muted-foreground">Segment: {selectedSignal.segment || "-"}</div>
                                <div className="text-muted-foreground">Status: {selectedSignal.status || "-"}</div>
                                <div className="grid grid-cols-2 gap-2 text-muted-foreground">
                                    <div>Entry: {formatPrice(getEntry(selectedSignal))}</div>
                                    <div>Stop: {formatPrice(getStopLoss(selectedSignal))}</div>
                                    <div>
                                        Targets: {getTargets(selectedSignal).length
                                            ? getTargets(selectedSignal).map((t) => formatPrice(t)).join(" / ")
                                            : "-"}
                                    </div>
                                    <div>Time: {formatDate(selectedSignal.signalTime || selectedSignal.timestamp || selectedSignal.createdAt)}</div>
                                </div>
                            </div>
                        ) : null}

                        {selectedId ? (
                            analysisQuery.isLoading ? (
                                <div>Loading analysis...</div>
                            ) : analysisQuery.data ? (
                                <div className="space-y-4">
                                    {analysisQuery.data.volatility ? (
                                        <div className="rounded-2xl border border-border/50 bg-muted/20 px-4 py-3 text-xs space-y-1">
                                            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Volatility</div>
                                            <div className="grid grid-cols-2 gap-2">
                                                <div>ATR: {formatPrice(analysisQuery.data.volatility.atr)}</div>
                                                <div>High: {formatPrice(analysisQuery.data.volatility.expectedHigh)}</div>
                                                <div>Low: {formatPrice(analysisQuery.data.volatility.expectedLow)}</div>
                                                <div>Buy: {formatPrice(analysisQuery.data.volatility.buyPrice)}</div>
                                                <div>Sell: {formatPrice(analysisQuery.data.volatility.sellPrice)}</div>
                                            </div>
                                        </div>
                                    ) : null}

                                    {analysisQuery.data.analysis ? (
                                        <div className="space-y-3">
                                            {Object.entries(analysisQuery.data.analysis).map(([key, item]) => (
                                                <div key={key} className="rounded-2xl border border-border/50 bg-white/70 dark:bg-white/5 px-4 py-3 text-xs space-y-1">
                                                    <div className="flex items-center justify-between">
                                                        <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                                                            {item.timeframe || key}
                                                        </div>
                                                        <div className={`text-[10px] font-semibold ${
                                                            item.trend === "BULLISH" ? "text-emerald-600" : item.trend === "BEARISH" ? "text-rose-500" : "text-muted-foreground"
                                                        }`}>
                                                            {item.trend || "NEUTRAL"}
                                                        </div>
                                                    </div>
                                                    <div className="text-foreground">Signal: {item.signalType || "-"}</div>
                                                    <div className="grid grid-cols-2 gap-2 text-muted-foreground">
                                                        <div>Price: {formatPrice(item.price)}</div>
                                                        <div>Support: {formatPrice(item.support)}</div>
                                                        <div>Resistance: {formatPrice(item.resistance)}</div>
                                                        <div>Strength: {item.isStrong ? "Strong" : "Normal"}</div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-xs text-muted-foreground">No analysis available.</div>
                                    )}

                                    <div className="text-[10px] text-muted-foreground">
                                        Updated: {formatDate(analysisQuery.data.timestamp)}
                                    </div>
                                </div>
                            ) : (
                                <div className="text-xs text-muted-foreground">No analysis available.</div>
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
