"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Zap, Target, Shield, Users, Trophy, BarChart, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
    const FEATURES = [
        {
            title: "Precision First",
            description: "Our algorithms process millions of data points to identify high-probability setups with surgical accuracy.",
            icon: Target
        },
        {
            title: "Total Transparency",
            description: "No black boxes. Every signal comes with clear entry, stop-loss, and target levels backed by verifiable logic.",
            icon: Shield
        },
        {
            title: "Institutional Speed",
            description: "Built on low-latency infrastructure to ensure you receive intel the moment opportunity strikes.",
            icon: Zap
        }
    ];

    const STATS = [
        { label: "Data Points Analyzed", value: "100M+" },
        { label: "Active Traders", value: "10k+" },
        { label: "Algorithmic Accuracy", value: "94%" },
        { label: "Years of R&D", value: "5+" },
    ];

    return (
        <div className="flex flex-col min-h-screen bg-white dark:bg-black text-slate-900 dark:text-white selection:bg-primary/30 transition-colors duration-300">
            {/* Background Grid & Spotlights */}
            <div className="absolute inset-0 z-0 w-full h-full pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-[0.2]"></div>
                <div className="absolute top-0 left-0 right-0 h-[500px] w-full bg-gradient-to-b from-primary/5 via-transparent to-transparent blur-3xl opacity-40"></div>
            </div>

            <div className="w-full max-w-7xl mx-auto mt-10 px-6 py-24 relative z-10">

                {/* Modern Hero Header - Split Layout */}
                <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-24">
                    <div className="space-y-6 max-w-3xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <Users className="w-3 h-3 fill-current animate-pulse" /> Who We Are
                        </div>
                        <h1 className="text-5xl md:text-8xl font-heading font-bold tracking-tighter leading-[0.9] text-slate-900 dark:text-white">
                            Redefining <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-br from-primary via-primary/80 to-primary/50 filter drop-shadow-sm">Alpha</span>
                            <span className="text-primary">.</span>
                        </h1>
                        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed border-l-2 border-slate-200 dark:border-white/10 pl-6">
                            We bridge the gap between <span className="text-slate-900 dark:text-white font-medium">institutional precision</span> and <span className="text-slate-900 dark:text-white font-medium">retail agility</span>.
                            MSPK is built for traders who demand more than just guessing.
                        </p>
                    </div>

                    <div className="hidden md:flex gap-8 p-6 rounded-2xl bg-card/40 backdrop-blur-xl border border-primary/20 shadow-2xl shadow-primary/5">
                        <div>
                            <div className="text-sm text-muted-foreground mb-1">Data Points</div>
                            <div className="text-3xl font-mono font-bold text-foreground flex items-center gap-2">
                                100M+ <span className="text-sm text-primary px-2 py-0.5 rounded-full bg-primary/10">Daily</span>
                            </div>
                        </div>
                        <div className="w-px h-12 bg-border/50"></div>
                        <div>
                            <div className="text-sm text-muted-foreground mb-1">Live Accuracy</div>
                            <div className="text-3xl font-mono font-bold text-foreground">94.2%</div>
                        </div>
                    </div>
                </div>

                {/* Core Values Grid */}
                <div className="grid md:grid-cols-3 gap-8 mb-24">
                    {FEATURES.map((feature, i) => (
                        <Card
                            key={i}
                            className="bg-white dark:bg-black/50 border-slate-200 dark:border-white/10 rounded-[2rem] p-8 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.1)] hover:shadow-xl hover:border-primary/30 transition-all duration-500 group"
                        >
                            <CardContent className="p-0">
                                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <feature.icon className="w-7 h-7" />
                                </div>
                                <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">{feature.title}</h3>
                                <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed">
                                    {feature.description}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* CTA Section */}
                <div className="relative rounded-[3rem] overflow-hidden bg-slate-900 dark:bg-zinc-900 text-center px-6 py-20 md:py-32">
                    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary via-transparent to-transparent"></div>

                    <div className="relative z-10 max-w-2xl mx-auto">
                        <Trophy className="w-16 h-16 text-primary mx-auto mb-8 animate-bounce" />
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                            Ready to Elevate Your Game?
                        </h2>
                        <p className="text-lg text-slate-300 mb-10 leading-relaxed">
                            Join thousands of traders who have already switched to the MSPK standard.
                            Stop trading blind. Start trading strict.
                        </p>
                        <Link href="/plans">
                            <Button size="lg" className="h-14 px-10 rounded-full text-base font-bold bg-primary text-black hover:bg-primary/90 shadow-[0_0_30px_-5px_rgba(245,158,11,0.4)] hover:shadow-[0_0_50px_-5px_rgba(245,158,11,0.6)] transition-all duration-300 hover:scale-105">
                                View Plans <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    );
}
