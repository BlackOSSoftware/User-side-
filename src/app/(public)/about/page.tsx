"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Zap, Target, Shield, Users, Trophy, ArrowRight, TrendingUp } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {

    /* ---------------- Typing Animation ---------------- */

    const words = ["Institutional Precision.", "Retail Simplicity.", "Algorithmic Alpha."];
    const [index, setIndex] = useState(0);
    const [subIndex, setSubIndex] = useState(0);
    const [reverse, setReverse] = useState(false);

    useEffect(() => {
        if (subIndex === words[index].length + 1 && !reverse) {
            setTimeout(() => setReverse(true), 1200);
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

    /* ---------------- Features ---------------- */

    const FEATURES = [
        {
            title: "Precision First",
            description:
                "Our algorithms process millions of data points to identify high-probability setups with surgical accuracy.",
            icon: Target,
        },
        {
            title: "Total Transparency",
            description:
                "Every signal includes defined entry, stop-loss, and target logic. No repainting. No manipulation.",
            icon: Shield,
        },
        {
            title: "Institutional Speed",
            description:
                "Low-latency infrastructure ensures you receive market intelligence instantly.",
            icon: Zap,
        },
    ];

    const STATS = [
        { label: "Data Points Analyzed", value: "100M+" },
        { label: "Active Traders", value: "10k+" },
        { label: "Algorithm Accuracy", value: "94%" },
        { label: "Years of R&D", value: "5+" },
    ];

    return (
        <div className="flex flex-col min-h-screen bg-background text-foreground selection:bg-primary/30 transition-colors duration-300">

            {/* Background Effects */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:24px_24px] opacity-[0.15]"></div>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-primary/10 blur-[120px] rounded-full"></div>
            </div>

            <div className="w-full max-w-7xl mx-auto mt-10 px-6 py-24 relative z-10">

                {/* ---------------- HERO ---------------- */}

                <div className="grid lg:grid-cols-2 gap-16 items-center mb-28">

                    <div className="space-y-8 max-w-3xl">

                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider">
                            <Users className="w-3 h-3 animate-pulse" />
                            Who We Are
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold leading-[1] tracking-tight">
                            Redefining
                            <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">
                                Modern Alpha.
                            </span>
                        </h1>

                        {/* Typing Line */}
                        <div className="text-2xl md:text-3xl font-semibold text-primary h-[40px]">
                            {words[index].substring(0, subIndex)}
                            <span className="animate-pulse">|</span>
                        </div>

                        <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
                            MSPK bridges the gap between institutional-grade infrastructure
                            and retail execution power. We build systems — not guesses.
                        </p>

                        <Link href="/plans">
                            <Button size="lg" className="rounded-full px-8">
                                Explore Plans <ArrowRight className="ml-2 w-4 h-4" />
                            </Button>
                        </Link>
                    </div>

                    {/* Right Visual Card */}
                    <div className="hidden lg:block">
                        <div className="bg-white/70 dark:bg-white/5 backdrop-blur-xl p-10 rounded-[2rem] border border-black/5 dark:border-white/10 shadow-2xl space-y-6">
                            <TrendingUp className="w-10 h-10 text-primary" />
                            <div className="text-xl font-bold">
                                Our Mission
                            </div>
                            <p className="text-muted-foreground leading-relaxed text-sm">
                                To eliminate randomness from trading and empower serious
                                market participants with structured, data-driven decision systems.
                            </p>
                        </div>
                    </div>

                </div>

                {/* ---------------- STATS STRIP ---------------- */}

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-28 text-center">
                    {STATS.map((stat, i) => (
                        <div key={i} className="space-y-2">
                            <div className="text-4xl font-bold text-primary">{stat.value}</div>
                            <div className="text-sm text-muted-foreground">{stat.label}</div>
                        </div>
                    ))}
                </div>

                {/* ---------------- CORE VALUES ---------------- */}

                <div className="grid md:grid-cols-3 gap-8 mb-32">
                    {FEATURES.map((feature, i) => (
                        <Card
                            key={i}
                            className="bg-white dark:bg-black/50 border border-border rounded-[2rem] p-8 hover:shadow-xl hover:border-primary/30 transition-all duration-500 group"
                        >
                            <CardContent className="p-0">
                                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                                    <feature.icon className="w-7 h-7" />
                                </div>
                                <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">
                                    {feature.title}
                                </h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    {feature.description}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* ---------------- FINAL CTA ---------------- */}

                <div className="relative rounded-[3rem] overflow-hidden bg-slate-900 text-center px-6 py-24">
                    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary via-transparent to-transparent"></div>

                    <div className="relative z-10 max-w-2xl mx-auto">
                        <Trophy className="w-16 h-16 text-primary mx-auto mb-8 animate-bounce" />

                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Ready to Trade With Structure?
                        </h2>

                        <p className="text-lg text-slate-300 mb-10 leading-relaxed">
                            Stop reacting to markets. Start executing with precision.
                        </p>

                        <Link href="/plans">
                            <Button
                                size="lg"
                                className="h-14 px-10 rounded-full text-base font-bold bg-primary text-black hover:bg-primary/90 hover:scale-105 transition-all duration-300"
                            >
                                View Plans <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    );
}
