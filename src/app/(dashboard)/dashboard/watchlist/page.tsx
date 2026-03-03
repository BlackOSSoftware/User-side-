"use client";

import { useMemo, useState } from "react";
import axios from "axios";
import { ArrowDownRight, ArrowUpRight, LineChart, RefreshCw, Search, Sparkles, TrendingDown, TrendingUp } from "lucide-react";
import { useMarketUserWatchlistAddMutation, useMarketUserWatchlistQuery, useMarketUserWatchlistRemoveMutation } from "@/services/market/market.hooks";
import type { MarketTicker } from "@/services/market/market.types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const numberFormatter = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 2 });

function formatPrice(value?: number) {
  if (typeof value !== "number") return "-";
  return numberFormatter.format(value);
}

function formatChange(value?: number) {
  if (typeof value !== "number") return "-";
  const prefix = value >= 0 ? "+" : "";
  return `${prefix}${numberFormatter.format(value)}%`;
}

function formatPoints(value?: number) {
  if (typeof value !== "number") return "-";
  const prefix = value >= 0 ? "+" : "";
  return `${prefix}${numberFormatter.format(value)}`;
}

function getSegmentTone(segment?: string) {
  const normalized = String(segment || "").toUpperCase();
  if (normalized.includes("FNO") || normalized.includes("NFO")) {
    return "border border-amber-600/30 bg-amber-500/12 text-amber-700 dark:border-amber-300/30 dark:bg-amber-300/12 dark:text-amber-100";
  }
  if (normalized.includes("MCX")) {
    return "border border-cyan-600/30 bg-cyan-500/12 text-cyan-700 dark:border-cyan-300/30 dark:bg-cyan-300/12 dark:text-cyan-100";
  }
  if (normalized.includes("INDICES") || normalized.includes("INDEX")) {
    return "border border-violet-600/30 bg-violet-500/12 text-violet-700 dark:border-violet-300/30 dark:bg-violet-300/12 dark:text-violet-100";
  }
  if (normalized.includes("EQUITY") || normalized.includes("NSE")) {
    return "border border-emerald-600/30 bg-emerald-500/12 text-emerald-700 dark:border-emerald-300/30 dark:bg-emerald-300/12 dark:text-emerald-100";
  }
  return "border border-slate-400/55 bg-slate-200/70 text-slate-700 dark:border-slate-300/35 dark:bg-slate-700/35 dark:text-slate-100";
}

export default function WatchlistPage() {
  const [search, setSearch] = useState("");
  const [symbolInput, setSymbolInput] = useState("");
  const [actionError, setActionError] = useState<string | null>(null);
  const { data, isLoading, isFetching, refetch, error } = useMarketUserWatchlistQuery(true, {
    refetchInterval: 12000,
  });
  const addMutation = useMarketUserWatchlistAddMutation();
  const removeMutation = useMarketUserWatchlistRemoveMutation();

  const tickers = useMemo(() => (Array.isArray(data) ? data : []), [data]);
  const filtered = useMemo(() => {
    if (!search.trim()) return tickers;
    const q = search.trim().toLowerCase();
    return tickers.filter((item) => {
      return (
        item.symbol?.toLowerCase().includes(q) ||
        item.name?.toLowerCase().includes(q) ||
        item.segment?.toLowerCase().includes(q) ||
        item.exchange?.toLowerCase().includes(q)
      );
    });
  }, [search, tickers]);

  const stats = useMemo(() => {
    if (!tickers.length) {
      return { total: 0, gainers: 0, losers: 0, topGainer: null, topLoser: null, avgChange: 0 };
    }

    let gainers = 0;
    let losers = 0;
    let sum = 0;
    let topGainer: MarketTicker | null = null;
    let topLoser: MarketTicker | null = null;

    tickers.forEach((item) => {
      const change = typeof item.change === "number" ? item.change : 0;
      sum += change;
      if (change >= 0) gainers += 1;
      else losers += 1;

      if (!topGainer || change > (topGainer.change ?? -Infinity)) {
        topGainer = item;
      }
      if (!topLoser || change < (topLoser.change ?? Infinity)) {
        topLoser = item;
      }
    });

    return {
      total: tickers.length,
      gainers,
      losers,
      topGainer,
      topLoser,
      avgChange: sum / tickers.length,
    };
  }, [tickers]);

  const errorMessage = useMemo(() => {
    if (!error) return null;
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      const message =
        (error.response?.data as { message?: string } | undefined)?.message ||
        error.message;
      return status ? `${message} (Status ${status})` : message;
    }
    return error instanceof Error ? error.message : "Failed to load watchlist data.";
  }, [error]);

  const handleAdd = async (symbol: string) => {
    const clean = symbol.trim();
    if (!clean) return;

    setActionError(null);
    try {
      await addMutation.mutateAsync(clean);
      setSymbolInput("");
      await refetch();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unable to update watchlist.";
      setActionError(message);
    }
  };

  const handleRemove = async (symbol: string) => {
    const clean = symbol.trim();
    if (!clean) return;

    setActionError(null);
    try {
      await removeMutation.mutateAsync(clean);
      await refetch();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unable to update watchlist.";
      setActionError(message);
    }
  };

  return (
    <div className="flex-1 space-y-4 sm:space-y-6 py-2">
      <section className="relative overflow-hidden rounded-[1.8rem] border border-slate-300/65 dark:border-primary/20 bg-[radial-gradient(circle_at_100%_0%,rgba(34,197,94,0.14),transparent_40%),radial-gradient(circle_at_0%_100%,rgba(59,130,246,0.16),transparent_45%),linear-gradient(160deg,rgba(248,250,252,0.96),rgba(226,232,240,0.92))] dark:bg-[radial-gradient(circle_at_100%_0%,rgba(59,130,246,0.18),transparent_35%),radial-gradient(circle_at_0%_100%,rgba(34,197,94,0.16),transparent_40%),linear-gradient(160deg,rgba(8,14,28,0.92),rgba(8,14,28,0.72))] p-5 sm:p-7">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,transparent_35%,rgba(255,255,255,0.55)_50%,transparent_65%)] dark:bg-[linear-gradient(120deg,transparent_35%,rgba(255,255,255,0.08)_50%,transparent_65%)] opacity-45 dark:opacity-25" />
        <div className="relative z-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-600/35 bg-emerald-500/12 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-emerald-800 dark:border-emerald-200/30 dark:bg-emerald-200/10 dark:text-emerald-100">
              <Sparkles className="h-3.5 w-3.5" />
              Zerodha Watchlist
            </div>
            <h1 className="text-2xl sm:text-3xl font-semibold text-slate-900 dark:text-foreground tracking-tight">
              Indian Market Watchlist
            </h1>
            <p className="max-w-2xl text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              Your live NSE/BSE watchlist powered by Zerodha market data. Track price, change, and momentum in one place.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => void refetch()}
              disabled={isFetching}
              className="h-9 rounded-full border-slate-400/70 bg-white/75 px-3 text-[10px] uppercase tracking-[0.16em] text-slate-700 hover:border-primary/40 hover:text-primary dark:border-primary/30 dark:bg-primary/10 dark:text-primary/90"
            >
              <RefreshCw className={`mr-1 h-3.5 w-3.5 ${isFetching ? "animate-spin" : ""}`} />
              {isFetching ? "Refreshing" : "Refresh"}
            </Button>
            <div className="relative flex items-center gap-2">
              <Input
                value={symbolInput}
                onChange={(event) => setSymbolInput(event.target.value)}
                placeholder="Add symbol (e.g. NSE:TCS-EQ)"
                className="h-9 w-[220px] rounded-full text-xs"
              />
              <Button
                type="button"
                size="sm"
                onClick={() => handleAdd(symbolInput)}
                disabled={!symbolInput.trim() || addMutation.isPending}
                className="h-9 rounded-full px-4 text-[10px] uppercase tracking-[0.16em]"
              >
                {addMutation.isPending ? "Adding" : "Add"}
              </Button>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search symbol, name, segment"
                className="h-9 w-[220px] rounded-full pl-9 text-xs"
              />
            </div>
          </div>
        </div>
        {actionError ? (
          <div className="mt-3 text-xs text-rose-500">{actionError}</div>
        ) : null}
      </section>

      <section className="grid gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="group relative overflow-hidden rounded-2xl border border-border/60 bg-[linear-gradient(140deg,rgba(248,250,252,0.92),rgba(226,232,240,0.88))] dark:bg-[linear-gradient(150deg,rgba(12,20,36,0.92),rgba(8,14,28,0.78))] p-4 sm:p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_22px_38px_-28px_rgba(59,130,246,0.55)]">
          <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-emerald-300/25 blur-2xl opacity-0 transition duration-300 group-hover:opacity-90" />
          <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Total Symbols</div>
          <div className="mt-2 text-2xl sm:text-3xl font-semibold text-foreground tabular-nums">
            {stats.total.toLocaleString("en-IN")}
          </div>
          <div className="mt-1 text-[11px] text-muted-foreground">Based on your plan permissions</div>
        </div>
        <div className="group relative overflow-hidden rounded-2xl border border-border/60 bg-[linear-gradient(140deg,rgba(236,253,245,0.9),rgba(209,250,229,0.82))] dark:bg-[linear-gradient(150deg,rgba(10,25,19,0.9),rgba(15,35,28,0.78))] p-4 sm:p-5 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400/45 hover:shadow-[0_22px_38px_-28px_rgba(34,197,94,0.5)]">
          <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-emerald-300/25 blur-2xl opacity-0 transition duration-300 group-hover:opacity-90" />
          <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Top Gainer</div>
          <div className="mt-2 text-sm font-semibold text-foreground">
            {stats.topGainer?.symbol ?? "-"}
          </div>
          <div className="mt-1 inline-flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-300">
            <TrendingUp className="h-3.5 w-3.5" />
            {formatChange(stats.topGainer?.change)}
          </div>
        </div>
        <div className="group relative overflow-hidden rounded-2xl border border-border/60 bg-[linear-gradient(140deg,rgba(255,241,242,0.92),rgba(254,226,226,0.86))] dark:bg-[linear-gradient(150deg,rgba(35,12,18,0.92),rgba(24,10,14,0.8))] p-4 sm:p-5 transition-all duration-300 hover:-translate-y-1 hover:border-rose-400/45 hover:shadow-[0_22px_38px_-28px_rgba(244,63,94,0.45)]">
          <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-rose-300/25 blur-2xl opacity-0 transition duration-300 group-hover:opacity-90" />
          <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Top Loser</div>
          <div className="mt-2 text-sm font-semibold text-foreground">
            {stats.topLoser?.symbol ?? "-"}
          </div>
          <div className="mt-1 inline-flex items-center gap-1 text-xs text-rose-600 dark:text-rose-300">
            <TrendingDown className="h-3.5 w-3.5" />
            {formatChange(stats.topLoser?.change)}
          </div>
        </div>
        <div className="group relative overflow-hidden rounded-2xl border border-border/60 bg-[linear-gradient(140deg,rgba(239,246,255,0.92),rgba(219,234,254,0.86))] dark:bg-[linear-gradient(150deg,rgba(10,18,32,0.92),rgba(8,14,28,0.8))] p-4 sm:p-5 transition-all duration-300 hover:-translate-y-1 hover:border-sky-400/45 hover:shadow-[0_22px_38px_-28px_rgba(56,189,248,0.45)]">
          <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-sky-300/25 blur-2xl opacity-0 transition duration-300 group-hover:opacity-90" />
          <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Avg Change</div>
          <div className="mt-2 text-2xl sm:text-3xl font-semibold text-foreground tabular-nums">
            {formatChange(stats.avgChange)}
          </div>
          <div className="mt-1 text-[11px] text-muted-foreground">Market breadth indicator</div>
        </div>
      </section>

      <section className="metallic-surface relative overflow-hidden rounded-3xl border border-border/60">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 px-4 py-3 sm:px-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-foreground/5 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            <LineChart className="h-3.5 w-3.5 text-primary" />
            Live Watchlist
          </div>
          <div className="text-[11px] text-muted-foreground">
            {isLoading ? "Loading data..." : `${filtered.length} symbols`}
          </div>
        </div>

        {error ? (
          <div className="px-4 py-8 text-sm text-rose-400">
            {errorMessage ?? "Failed to load watchlist data. Please try again."}
          </div>
        ) : isLoading ? (
          <div className="px-4 py-8 text-sm text-muted-foreground">Fetching latest prices...</div>
        ) : filtered.length === 0 ? (
          <div className="px-4 py-10 text-center text-sm text-muted-foreground">
            No symbols available for your plan or search.
          </div>
        ) : (
          <>
            <div className="hidden lg:grid grid-cols-[1.2fr_0.7fr_0.7fr_0.7fr_0.7fr_0.8fr_0.6fr] gap-3 px-4 sm:px-6 py-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground border-b border-border/60">
              <div>Symbol</div>
              <div>Segment</div>
              <div>Exchange</div>
              <div className="text-right">LTP</div>
              <div className="text-right">Change</div>
              <div className="text-right">Points</div>
              <div className="text-right">Action</div>
            </div>

            <div className="hidden lg:block">
              {filtered.map((item) => {
                const change = typeof item.change === "number" ? item.change : 0;
                const isUp = change >= 0;
                const price = typeof item.price === "number" ? item.price : undefined;
                const prevClose = typeof item.prevClose === "number" ? item.prevClose : undefined;
                const points =
                  typeof price === "number" && typeof prevClose === "number" ? price - prevClose : undefined;

                return (
                  <div
                    key={item.symbol}
                    className="grid grid-cols-[1.2fr_0.7fr_0.7fr_0.7fr_0.7fr_0.8fr_0.6fr] gap-3 px-4 sm:px-6 py-3 text-xs border-b border-border/50 hover:bg-muted/20"
                  >
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                        {item.name || "-"}
                      </div>
                      <div className="text-sm font-semibold text-foreground truncate">{item.symbol}</div>
                    </div>
                    <div>
                      <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold ${getSegmentTone(item.segment)}`}>
                        {item.segment || "-"}
                      </span>
                    </div>
                    <div className="text-[11px] text-muted-foreground">{item.exchange || "-"}</div>
                    <div className="text-right font-semibold text-foreground tabular-nums">{formatPrice(price)}</div>
                    <div
                      className={`text-right font-semibold tabular-nums ${
                        isUp ? "text-emerald-600 dark:text-emerald-300" : "text-rose-500 dark:text-rose-300"
                      }`}
                    >
                      {formatChange(change)}
                    </div>
                    <div
                      className={`text-right font-semibold tabular-nums ${
                        typeof points !== "number"
                          ? "text-muted-foreground"
                          : points >= 0
                          ? "text-emerald-600 dark:text-emerald-300"
                          : "text-rose-500 dark:text-rose-300"
                      }`}
                    >
                      {formatPoints(points)}
                    </div>
                    <div className="text-right">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => handleRemove(item.symbol)}
                        className="h-7 rounded-full border-rose-500/30 text-[10px] uppercase tracking-[0.14em] text-rose-500 hover:border-rose-400/40 hover:text-rose-400"
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="grid gap-3 p-4 lg:hidden">
              {filtered.map((item) => {
                const change = typeof item.change === "number" ? item.change : 0;
                const isUp = change >= 0;
                const price = typeof item.price === "number" ? item.price : undefined;
                const prevClose = typeof item.prevClose === "number" ? item.prevClose : undefined;
                const points =
                  typeof price === "number" && typeof prevClose === "number" ? price - prevClose : undefined;

                return (
                  <div
                    key={item.symbol}
                    className="rounded-2xl border border-border/70 bg-background/70 p-4 transition hover:border-primary/35"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                          {item.name || "-"}
                        </div>
                        <div className="text-lg font-semibold text-foreground">{item.symbol}</div>
                      </div>
                      <div
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-semibold ${
                          isUp
                            ? "border border-emerald-600/30 bg-emerald-600/10 text-emerald-700 dark:border-emerald-400/30 dark:bg-emerald-400/12 dark:text-emerald-200"
                            : "border border-rose-600/30 bg-rose-600/10 text-rose-700 dark:border-rose-400/30 dark:bg-rose-400/12 dark:text-rose-200"
                        }`}
                      >
                        {isUp ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
                        {formatChange(change)}
                      </div>
                    </div>

                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <span
                        className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold ${getSegmentTone(
                          item.segment,
                        )}`}
                      >
                        {item.segment || "-"}
                      </span>
                      <span className="inline-flex items-center rounded-full border border-foreground/10 bg-foreground/5 px-2 py-0.5 text-[10px] text-muted-foreground">
                        {item.exchange || "-"}
                      </span>
                    </div>

                    <div className="mt-3 grid grid-cols-3 gap-3 text-xs">
                      <div className="rounded-xl border border-border/60 bg-foreground/5 p-2.5">
                        <div className="text-[10px] uppercase tracking-wider text-muted-foreground">LTP</div>
                        <div className="mt-1 font-semibold text-foreground tabular-nums">{formatPrice(price)}</div>
                      </div>
                      <div className="rounded-xl border border-border/60 bg-foreground/5 p-2.5">
                        <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Points</div>
                        <div
                          className={`mt-1 font-semibold tabular-nums ${
                            typeof points !== "number"
                              ? "text-muted-foreground"
                              : points >= 0
                              ? "text-emerald-600 dark:text-emerald-300"
                              : "text-rose-500 dark:text-rose-300"
                          }`}
                        >
                          {formatPoints(points)}
                        </div>
                      </div>
                      <div className="rounded-xl border border-border/60 bg-foreground/5 p-2.5">
                        <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Lot Size</div>
                        <div className="mt-1 font-semibold text-foreground tabular-nums">
                          {item.lotSize ?? "-"}
                        </div>
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => handleRemove(item.symbol)}
                      className="mt-3 h-8 w-full rounded-full border-rose-500/30 text-[10px] uppercase tracking-[0.18em] text-rose-500 hover:border-rose-400/40 hover:text-rose-400"
                    >
                      Remove from Watchlist
                    </Button>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </section>
    </div>
  );
}
