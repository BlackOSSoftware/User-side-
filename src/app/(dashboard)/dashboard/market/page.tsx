"use client";

import React, { useState, useEffect, useRef } from 'react';
import { createChart, ColorType, CrosshairMode } from 'lightweight-charts';
import {
    TrendingUp, Activity, Layers, Settings, ChevronDown, BarChart2, Search, Grid, Monitor, BarChart, Settings as SettingsIcon
} from 'lucide-react';
import { clsx } from 'clsx';
import {
    useMarketAnalysisQuery,
    useMarketHistoryQuery,
    useMarketLoginKiteMutation,
    useMarketLoginKiteQuery,
    useMarketLoginKiteUrlQuery,
    useMarketNewsQuery,
    useMarketSearchQuery,
    useMarketSentimentQuery,
    useMarketStatsQuery,
    useMarketSymbolsQuery,
    useMarketTickersQuery,
} from '@/services/market/market.hooks';

// --- Theme ---
const getThemeColors = () => {
    if (typeof window === 'undefined') return { bg: '#0d1017', text: '#94a3b8', grid: '#1e293b', up: '#089981', down: '#f23645', primary: '#2962ff' };

    const style = getComputedStyle(document.documentElement);
    const temp = document.createElement('div');
    temp.style.display = 'none';
    document.body.appendChild(temp);

    const resolve = (varName: string, fallback: string) => {
        const val = style.getPropertyValue(varName).trim();
        if (!val) return fallback;

        // Handle tailwind/nextjs hsl variables which might be space-separated
        const colorStr = val.startsWith('#') || val.startsWith('rgb') || val.startsWith('hsl') ? val : `hsl(${val})`;
        temp.style.color = colorStr;
        const computed = getComputedStyle(temp).color;
        return computed && computed !== 'rgba(0, 0, 0, 0)' && computed !== 'transparent' ? computed : fallback;
    };

    const theme = {
        up: '#089981', down: '#f23645',
        bg: resolve('--background', '#0d1017'),
        grid: resolve('--border', '#1e293b'),
        text: resolve('--muted-foreground', '#94a3b8'),
        primary: resolve('--primary', '#2962ff'),
    };

    document.body.removeChild(temp);
    return theme;
};

// --- Mock Data ---
const MARKET_DATA: any = {
    crypto: [
        { symbol: 'BTCUSD', description: 'Bitcoin / US Dollar', market: 'CRYPTO', price: '45,000.00', change: '+850.00', changePercent: '+2.05%', isUp: true, perf: { '1W': '+5.2%', '1M': '+15.4%', '3M': '+35.8%' }, tech: 85 },
        { symbol: 'ETHUSD', description: 'Ethereum / US Dollar', market: 'CRYPTO', price: '2,450.00', change: '+45.00', changePercent: '+1.85%', isUp: true, perf: { '1W': '+8.2%', '1M': '+12.4%', '3M': '+45.8%' }, tech: 90 },
    ],
    indices: [
        { symbol: 'SPX', description: 'S&P 500 Index', market: 'CBOE', price: '4,750.00', change: '+15.20', changePercent: '+0.32%', isUp: true, perf: { '1W': '+1.5%', '1M': '+3.2%', '3M': '+7.8%' }, tech: 72 },
    ]
};

const TIMEFRAMES = [{ label: '5m', val: '5m' }, { label: '15m', val: '15m' }, { label: '1H', val: '1h' }, { label: '4H', val: '4h' }, { label: 'D', val: 'D' }];
const CHART_TYPES = [{ id: 'Candle', label: 'Regular', icon: BarChart2 }, { id: 'Line', label: 'Line', icon: TrendingUp }, { id: 'Area', label: 'Area', icon: Activity }];

// --- Components ---
const PerformanceCard = ({ label, value }: { label: string, value: string }) => (
    <div className={clsx("flex flex-col items-center justify-center p-2 rounded-md", value.includes('+') ? "bg-emerald-500/10 text-emerald-500" : "bg-red-500/10 text-red-500")}>
        <span className="text-xs font-bold">{value}</span>
        <span className="text-[10px] opacity-60 uppercase">{label}</span>
    </div>
);

const Gauge = ({ value }: { value: number }) => (
    <div className="flex flex-col items-center">
        <div className="relative w-32 h-16 overflow-hidden">
            <div className="absolute top-0 left-0 w-32 h-32 rounded-full border-[6px] border-muted/20" style={{ borderBottomColor: 'transparent', borderLeftColor: 'transparent', borderRightColor: 'transparent', transform: 'rotate(-45deg)' }}></div>
            <div className="absolute bottom-0 left-1/2 w-0.5 h-14 bg-foreground origin-bottom transition-all duration-500 ease-out z-10" style={{ transform: `translateX(-50%) rotate(${(value / 100) * 180 - 90}deg)` }}></div>
            <div className="absolute bottom-[-4px] left-1/2 w-2 h-2 bg-foreground rounded-full -translate-x-1/2 z-20" />
        </div>
        <div className="flex justify-between w-full px-2 text-[9px] text-muted-foreground mt-1"><span>Sell</span><span className="font-bold text-foreground">Neutral</span><span>Buy</span></div>
    </div>
);

export default function MarketPage() {
    const [selectedSymbol, setSelectedSymbol] = useState<any>(MARKET_DATA.crypto[0]);
    const [chartType, setChartType] = useState('Candle');
    const [timeFrame, setTimeFrame] = useState('5m');
    const [chartSettings, setChartSettings] = useState({ showGrid: true, showWatermark: true, showLegend: true });
    const [providerCode, setProviderCode] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    const [sidebarWidth, setSidebarWidth] = useState(380);
    const [detailsHeight, setDetailsHeight] = useState(400);

    const chartContainerRef = useRef<HTMLDivElement>(null);
    const chartRef = useRef<any>(null);
    const seriesRef = useRef<any>({});
    const containerRef = useRef<HTMLDivElement>(null);

    const statsQuery = useMarketStatsQuery();
    const tickersQuery = useMarketTickersQuery();
    const sentimentQuery = useMarketSentimentQuery();
    const analysisQuery = useMarketAnalysisQuery(selectedSymbol?.symbol ?? "", Boolean(selectedSymbol?.symbol));
    const newsQuery = useMarketNewsQuery(selectedSymbol?.symbol ?? "", Boolean(selectedSymbol?.symbol));
    const symbolsQuery = useMarketSymbolsQuery(selectedSymbol?.market ? { segment: selectedSymbol.market } : undefined, Boolean(selectedSymbol?.market));
    const searchResultQuery = useMarketSearchQuery({ q: searchQuery }, Boolean(searchQuery));
    const historyQuery = useMarketHistoryQuery(
        selectedSymbol?.symbol
            ? {
                symbol: selectedSymbol.symbol,
                resolution: 5,
                from: Math.floor(Date.now() / 1000) - 3600,
                to: Math.floor(Date.now() / 1000),
            }
            : { symbol: "" },
        Boolean(selectedSymbol?.symbol)
    );
    const kiteUrlQuery = useMarketLoginKiteUrlQuery();
    const kiteStatusQuery = useMarketLoginKiteQuery();
    const kiteMutation = useMarketLoginKiteMutation();

    // --- Resizing ---
    const startResizing = (dim: 'w' | 'h') => (e: React.MouseEvent) => {
        e.preventDefault();
        const startPos = dim === 'w' ? e.clientX : e.clientY;
        const startVal = dim === 'w' ? sidebarWidth : detailsHeight;
        const onMove = (m: MouseEvent) => {
            const delta = (dim === 'w' ? m.clientX : m.clientY) - startPos;
            const newVal = startVal - delta;
            if (dim === 'w' && newVal > 250 && newVal < 800) setSidebarWidth(newVal);
            if (dim === 'h' && newVal > 150 && newVal < 800) setDetailsHeight(newVal);
        };
        const onUp = () => { document.removeEventListener('mousemove', onMove); document.removeEventListener('mouseup', onUp); };
        document.addEventListener('mousemove', onMove);
        document.addEventListener('mouseup', onUp);
    };

    // --- Chart ---
    useEffect(() => {
        if (!chartContainerRef.current) return;
        const theme = getThemeColors();
        const chart = createChart(chartContainerRef.current, {
            layout: { background: { type: ColorType.Solid, color: theme.bg }, textColor: theme.text },
            grid: { vertLines: { color: theme.grid, visible: chartSettings.showGrid }, horzLines: { color: theme.grid, visible: chartSettings.showGrid } },
            crosshair: { mode: CrosshairMode.Normal }, timeScale: { borderColor: theme.grid }, rightPriceScale: { borderColor: theme.grid }
        });

        const series = chartType === 'Area' ? chart.addAreaSeries({ lineColor: '#2962ff', topColor: 'rgba(41, 98, 255, 0.4)', bottomColor: 'rgba(41, 98, 255, 0)' }) :
            chartType === 'Line' ? chart.addLineSeries({ color: '#2962ff' }) :
                chart.addCandlestickSeries({ upColor: theme.up, downColor: theme.down, borderVisible: false, wickUpColor: theme.up, wickDownColor: theme.down });

        seriesRef.current = { main: series };
        chartRef.current = chart;

        const observer = new ResizeObserver(() => { if (chartContainerRef.current) chart.applyOptions({ width: chartContainerRef.current.clientWidth, height: chartContainerRef.current.clientHeight }); });
        observer.observe(chartContainerRef.current);
        return () => { observer.disconnect(); chart.remove(); };
    }, [chartType, chartSettings]);

    useEffect(() => {
        if (!selectedSymbol || !chartRef.current) return;
        const data = [];
        let price = parseFloat(selectedSymbol.price.replace(/,/g, ''));
        let time = Math.floor(Date.now() / 1000) - 300 * 100;
        for (let i = 0; i < 100; i++) {
            const move = (Math.random() - 0.5) * (price * 0.005); price += move;
            data.push({ time, open: price, high: price + Math.abs(move), low: price - Math.abs(move), close: price + move / 2, value: price });
            time += 300;
        }
        seriesRef.current.main.setData(chartType === 'Candle' ? data : data.map(d => ({ time: d.time, value: d.value })));
        chartRef.current.timeScale().fitContent();
    }, [selectedSymbol, chartType, timeFrame]);

    return (
        <div ref={containerRef} className="flex flex-col gap-6 relative overflow-hidden text-foreground">
            <div className="rounded-[2.5rem] bg-[linear-gradient(135deg,rgba(255,255,255,0.85)_0%,rgba(255,255,255,0.65)_40%,rgba(240,245,255,0.8)_100%)] dark:bg-[linear-gradient(135deg,rgba(9,12,18,0.85)_0%,rgba(15,23,42,0.7)_45%,rgba(30,41,59,0.8)_100%)] p-6 sm:p-8 relative overflow-hidden">
                <div className="absolute -right-32 -top-28 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
                <div className="absolute -left-32 -bottom-28 h-72 w-72 rounded-full bg-accent/15 blur-3xl" />
                <div className="relative space-y-3">
                    <div className="inline-flex items-center gap-2 rounded-full bg-primary/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
                        Market Intelligence
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">Market Command Deck</h2>
                    <p className="text-sm text-muted-foreground max-w-2xl">
                        Live infrastructure signals, watchlist symbols, and execution provider status in one place.
                    </p>
                </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
                <div className="rounded-[2rem] bg-card/70 backdrop-blur-xl p-4 space-y-4 ring-1 ring-border/30 shadow-[0_22px_60px_-40px_rgba(15,23,42,0.45)]">
                    <h3 className="text-sm font-semibold text-foreground">Market Insights</h3>

                    <div className="grid gap-3 sm:grid-cols-3">
                        {[
                            { label: "Stats", data: statsQuery.data },
                            { label: "Tickers", data: tickersQuery.data },
                            { label: "Sentiment", data: sentimentQuery.data },
                        ].map((block) => (
                            <div key={block.label} className="rounded-2xl bg-gradient-to-br from-background/90 via-background/60 to-primary/10 p-4 ring-1 ring-border/20">
                                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{block.label}</div>
                                <div className="mt-2 grid gap-1 text-xs text-foreground">
                                    {block.data && Object.keys(block.data).length > 0 ? (
                                        Object.entries(block.data).slice(0, 6).map(([key, value]) => (
                                            <div key={key} className="flex items-center justify-between gap-2">
                                                <span className="text-muted-foreground truncate">{key}</span>
                                                <span className="truncate text-right">
                                                    {typeof value === "object" ? "—" : String(value)}
                                                </span>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-xs text-muted-foreground">No data</div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                        <div className="rounded-2xl bg-gradient-to-br from-background/90 via-background/60 to-accent/10 p-4 ring-1 ring-border/20">
                            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Symbols</div>
                            <div className="mt-2 space-y-2 text-xs text-foreground">
                                {Array.isArray(symbolsQuery.data) && symbolsQuery.data.length > 0 ? (
                                    symbolsQuery.data.slice(0, 6).map((symbol, index) => (
                                        <div key={symbol.symbol || index} className="flex items-center justify-between">
                                            <span className="font-semibold">{symbol.symbol}</span>
                                            <span className="text-muted-foreground">{symbol.exchange || symbol.segment}</span>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-xs text-muted-foreground">No symbols</div>
                                )}
                            </div>
                        </div>
                        <div className="rounded-2xl bg-gradient-to-br from-background/90 via-background/60 to-primary/10 p-4 ring-1 ring-border/20">
                            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">History</div>
                            <div className="mt-2 text-xs text-muted-foreground">
                                {historyQuery.isLoading ? "Loading..." : "History loaded"}
                            </div>
                        </div>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                        <div className="rounded-2xl bg-gradient-to-br from-background/90 via-background/60 to-primary/10 p-4 ring-1 ring-border/20">
                            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Analysis</div>
                            <div className="mt-2 text-xs text-muted-foreground">
                                {analysisQuery.isLoading ? "Loading..." : "Analysis ready"}
                            </div>
                        </div>
                        <div className="rounded-2xl bg-gradient-to-br from-background/90 via-background/60 to-accent/10 p-4 ring-1 ring-border/20">
                            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">News</div>
                            <div className="mt-2 space-y-2 text-xs">
                                {Array.isArray(newsQuery.data) && newsQuery.data.length > 0 ? (
                                    newsQuery.data.slice(0, 3).map((item) => (
                                        <div key={item.url} className="space-y-1">
                                            <div className="text-foreground font-semibold line-clamp-2">{item.title}</div>
                                            <div className="text-[10px] text-muted-foreground">
                                                {item.publisher || item.site} • {item.publishedDate}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-xs text-muted-foreground">No news yet</div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="rounded-2xl bg-gradient-to-br from-background/90 via-background/60 to-primary/10 p-4 ring-1 ring-border/20 space-y-2">
                        <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Search Market</div>
                        <input
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="h-9 w-full rounded-lg bg-background/70 px-3 text-xs focus:outline-none focus:ring-2 focus:ring-primary/20"
                            placeholder="Search symbol"
                        />
                        <div className="text-[10px] text-muted-foreground truncate">
                            {searchResultQuery.isLoading ? "Searching..." : "Results updated"}
                        </div>
                    </div>
                </div>

                <div className="rounded-[2rem] bg-card/70 backdrop-blur-xl p-4 space-y-4 ring-1 ring-border/30 shadow-[0_22px_60px_-40px_rgba(15,23,42,0.45)]">
                    <h3 className="text-sm font-semibold text-foreground">Market Provider Login</h3>
                    <div className="text-xs text-muted-foreground space-y-2">
                        <div className="break-all">Login URL: {kiteUrlQuery.data?.url || "Not available"}</div>
                        <div>Status: {kiteStatusQuery.data ? "Connected" : "Not connected"}</div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs uppercase tracking-wider text-muted-foreground">Provider Code</label>
                        <input
                            value={providerCode}
                            onChange={(e) => setProviderCode(e.target.value)}
                            className="h-10 w-full rounded-xl bg-background/70 px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                            placeholder="Enter provider code"
                        />
                    </div>
                    <button
                        type="button"
                        onClick={() => kiteMutation.mutate({ code: providerCode })}
                        className="h-10 w-full rounded-xl bg-primary text-primary-foreground text-sm font-semibold"
                        disabled={kiteMutation.isPending}
                    >
                        {kiteMutation.isPending ? "Connecting..." : "Connect Provider"}
                    </button>
                </div>
            </div>
        </div>
    );
}
