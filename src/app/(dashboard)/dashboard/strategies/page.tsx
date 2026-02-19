"use client";

import React from 'react';
import { Search, Filter, Zap } from 'lucide-react';
import { StrategyCard } from '@/components/dashboard/strategy-card';

export default function StrategiesPage() {
    const strategies: any[] = [
        {
            id: '1',
            name: 'Gold Rush V2',
            description: 'Scalping XAUUSD',
            status: 'Active',
            segment: 'FOREX',
            timeframe: '5m',
            allocation: '₹50,000',
            pnl: '+12.4%',
            winRate: '78%',
            trades: 142,
            isSubscribed: true
        },
        {
            id: '2',
            name: 'Crypto Breakout',
            description: 'Trend BTC/ETH',
            status: 'Paused',
            segment: 'CRYPTO',
            timeframe: '1h',
            allocation: '₹25,000',
            pnl: '-1.2%',
            winRate: '45%',
            trades: 28,
            isSubscribed: true
        },
        {
            id: '3',
            name: 'Forex Major Swing',
            description: 'Swing EURUSD',
            status: 'Active',
            segment: 'FOREX',
            timeframe: '4h',
            allocation: '₹1,00,000',
            pnl: '+8.9%',
            winRate: '62%',
            trades: 12,
            isSubscribed: false
        },
        {
            id: '4',
            name: 'NIFTY Momentum',
            description: 'Intraday Options',
            status: 'Active',
            segment: 'FNO',
            timeframe: '15m',
            allocation: '₹0',
            pnl: '+45.0%',
            winRate: '82%',
            trades: 1250,
            isSubscribed: false
        }
    ];

    return (
        <div className="h-full flex flex-col space-y-4">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
                        Strategy Marketplace
                    </h1>
                    <p className="text-xs text-muted-foreground font-mono mt-1">Subscribe to elite algorithms managed by MSPK Admins.</p>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                    <div className="px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                        <Zap size={14} /> Power: ON
                    </div>
                </div>
            </div>

            {/* Filters & Search */}
            <div className="flex items-center gap-2 pb-2">
                <div className="relative flex-1 max-w-sm group">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-hover:text-primary transition-colors" />
                    <input
                        type="text"
                        placeholder="Search strategies..."
                        className="w-full bg-background/50 border border-white/5 rounded-lg pl-9 pr-4 py-2 text-xs text-white focus:outline-none focus:border-primary/50 transition-all"
                    />
                </div>
                <button className="p-2 border border-white/5 rounded-lg bg-background/50 text-muted-foreground hover:text-white hover:border-white/20 transition-all">
                    <Filter size={14} />
                </button>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-4 overflow-y-auto pr-2 custom-scrollbar">
                {strategies.map((strat: any) => (
                    <StrategyCard key={strat.id} data={strat} />
                ))}
            </div>
        </div>
    );
}
