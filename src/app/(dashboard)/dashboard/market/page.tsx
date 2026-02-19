"use client";

import React, { useState, useEffect, useRef } from 'react';
import { createChart, ColorType, CrosshairMode } from 'lightweight-charts';
import {
    TrendingUp, Activity, Layers, Settings, ChevronDown, BarChart2, Search, Grid, Monitor, BarChart, Settings as SettingsIcon
} from 'lucide-react';
import { clsx } from 'clsx';

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

    const [sidebarWidth, setSidebarWidth] = useState(380);
    const [detailsHeight, setDetailsHeight] = useState(400);

    const chartContainerRef = useRef<HTMLDivElement>(null);
    const chartRef = useRef<any>(null);
    const seriesRef = useRef<any>({});
    const containerRef = useRef<HTMLDivElement>(null);

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
        <div ref={containerRef} className="h-[calc(100vh-3rem)] flex flex-col gap-4 relative overflow-hidden text-foreground">
            <div className="flex-1 min-h-0 bg-background flex flex-row border border-border rounded-lg overflow-hidden shadow-xl">
                <div className="flex-1 flex flex-col min-w-0">
                    <div className="h-10 border-b border-border bg-card flex items-center px-4 gap-2 shrink-0">
                        <span className="font-bold text-sm text-foreground">{selectedSymbol?.symbol}</span>
                        <div className="h-4 w-[1px] bg-border mx-2" />
                        <div className="flex bg-muted/10 rounded p-0.5">
                            {TIMEFRAMES.map(tf => <button key={tf.val} onClick={() => setTimeFrame(tf.val)} className={clsx("px-2 py-0.5 text-[10px] rounded transition-colors", timeFrame === tf.val ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground")}>{tf.label}</button>)}
                        </div>
                    </div>
                    <div className="flex-1 w-full relative bg-background">
                        <div ref={chartContainerRef} className="absolute inset-0 w-full h-full" />
                    </div>
                </div>

                <div onMouseDown={startResizing('w')} className="w-1 hover:w-1.5 bg-border hover:bg-primary cursor-col-resize z-30 shrink-0 transition-all flex items-center justify-center">
                    <div className="h-8 w-0.5 bg-muted-foreground/20 rounded-full" />
                </div>

                <div style={{ width: sidebarWidth }} className="bg-card flex flex-col min-w-[250px] max-w-[50vw] border-l border-border">
                    <div className="p-2 border-b border-border bg-muted/5 flex items-center justify-between shrink-0">
                        <span className="text-sm font-semibold pl-2">Market Watch</span>
                        <Search size={14} className="text-muted-foreground mr-2" />
                    </div>

                    <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar">
                        {Object.entries(MARKET_DATA).map(([cat, syms]: any) => (
                            <div key={cat}>
                                <div className="px-3 py-1 bg-muted/5 border-b border-border text-[10px] font-bold uppercase text-muted-foreground sticky top-0 z-10 backdrop-blur-sm">{cat}</div>
                                {syms.map((m: any) => (
                                    <div key={m.symbol} onClick={() => setSelectedSymbol(m)} className={clsx("grid grid-cols-[1.5fr_1fr_1fr] items-center px-3 py-2 cursor-pointer hover:bg-muted/5 border-b border-border transition-colors", selectedSymbol?.symbol === m.symbol && "bg-primary/5 border-l-2 border-l-primary")}>
                                        <span className="text-xs font-semibold text-muted-foreground">{m.symbol}</span>
                                        <span className="text-xs text-right">{m.price}</span>
                                        <span className={clsx("text-xs text-right", m.isUp ? "text-emerald-500" : "text-red-500")}>{m.changePercent}</span>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>

                    <div onMouseDown={startResizing('h')} className="h-1 hover:h-1.5 bg-border hover:bg-primary cursor-row-resize z-30 shrink-0 transition-all flex items-center justify-center">
                        <div className="w-8 h-0.5 bg-muted-foreground/20 rounded-full" />
                    </div>

                    <div style={{ height: detailsHeight }} className="shrink-0 overflow-y-auto custom-scrollbar bg-card border-t border-border p-4 flex flex-col gap-6 scroll-smooth pb-10">
                        {selectedSymbol && (
                            <>
                                <div>
                                    <div className="text-xl font-bold mb-1">{selectedSymbol.symbol}</div>
                                    <div className="text-xs text-muted-foreground">{selectedSymbol.description}</div>
                                    <div className="flex items-baseline gap-2 mt-2">
                                        <span className="text-3xl font-bold">{selectedSymbol.price}</span>
                                        <span className={clsx("text-sm font-bold ml-auto", selectedSymbol.isUp ? "text-emerald-500" : "text-red-500")}>{selectedSymbol.changePercent}</span>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-xs font-bold mb-3 uppercase tracking-wider text-muted-foreground">Admin Strategy</h3>
                                    <div className="grid grid-cols-2 gap-2">
                                        <div className="bg-muted/5 border border-border rounded p-3 text-center">
                                            <div className="text-[9px] text-muted-foreground uppercase">Supertrend</div>
                                            <div className="text-sm font-bold text-emerald-500 flex items-center justify-center gap-1"><TrendingUp size={14} /> UP</div>
                                        </div>
                                        <div className="bg-muted/5 border border-border rounded p-3 text-center">
                                            <div className="text-[9px] text-muted-foreground uppercase">Structure</div>
                                            <div className="text-sm font-bold text-primary">BULLISH</div>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-xs font-bold mb-3 uppercase tracking-wider text-muted-foreground">Performance</h3>
                                    <div className="grid grid-cols-3 gap-2">
                                        {Object.entries(selectedSymbol.perf).map(([l, v]: any) => <PerformanceCard key={l} label={l} value={v} />)}
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-xs font-bold mb-3 uppercase tracking-wider text-muted-foreground">Technicals</h3>
                                    <div className="bg-muted/5 border border-border rounded-lg p-6 py-8"><Gauge value={selectedSymbol.tech} /></div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
