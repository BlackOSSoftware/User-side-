"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Star, Zap, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function PlansPage() {

    /* ---------------- Typing Animation ---------------- */

    const words = ["Scale Faster.", "Trade Smarter.", "Unlock Alpha."];
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

    /* ---------------- Plans ---------------- */

    const PLANS = [
        {
            id: 'demo',
            name: "Demo Access",
            description: "Perfect for testing the waters",
            price: "Free",
            duration: "1 Day",
            features: ["Unlimited Strategies", "< 100ms Latency", "Deep Analytics & Export", "Priority 24/7 Support"],
            buttonText: "Start 1-Day Trial",
            href: "/trial",
            isPopular: false
        },
        {
            id: 'pro',
            name: "Pro Access",
            description: "For serious algorithmic traders",
            price: "₹25,000",
            duration: "Month",
            features: ["Unlimited Strategies", "< 100ms Latency", "Deep Analytics & Export", "Priority 24/7 Support"],
            buttonText: "Get Started",
            href: "/trial",
            isPopular: true
        },
        {
            id: 'enterprise',
            name: "Enterprise",
            description: "For Prop Desks & Funds",
            price: "Custom",
            duration: "Pricing",
            features: ["Dedicated Infrastructure", "White Label Solution", "FIX API Access", "Dedicated Account Manager"],
            buttonText: "Contact Sales",
            href: "/contact",
            isPopular: false
        }
    ];

    return (
        <div className="flex flex-col min-h-screen bg-background text-foreground selection:bg-primary/30 transition-colors duration-300">

            {/* Background Effects */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:24px_24px] opacity-[0.15]"></div>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 blur-[120px] rounded-full"></div>
            </div>

            <div className="w-full max-w-7xl mx-auto mt-10 px-6 py-16 md:py-24 relative z-10">

                {/* ---------------- HERO ---------------- */}

                <div className="grid lg:grid-cols-2 gap-16 items-center mb-28">

                    {/* LEFT SIDE */}
                    <div className="space-y-8 max-w-3xl">

                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider">
                            <Zap className="w-3 h-3 animate-pulse" />
                            Flexible Pricing
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold leading-[1] tracking-tight text-foreground">
                            Choose Your
                            <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">
                                Trading Edge.
                            </span>
                        </h1>

                        {/* Typing Animation */}
                        <div className="text-2xl md:text-3xl font-bold text-primary h-[40px]">
                            {words[index].substring(0, subIndex)}
                            <span className="animate-pulse">|</span>
                        </div>

                        <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
                            Institutional-grade signals with zero hidden fees.
                            Built for serious traders who demand precision execution.
                        </p>

                        <div className="flex flex-wrap gap-10 pt-4">
                            <div>
                                <div className="text-3xl font-bold">10,000+</div>
                                <div className="text-sm text-muted-foreground">Active Traders</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold">99.9%</div>
                                <div className="text-sm text-muted-foreground">Uptime</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold">85%</div>
                                <div className="text-sm text-muted-foreground">Win Rate</div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT SIDE BOX */}
                    <div className="hidden lg:block">
                        <div className="bg-white/70 dark:bg-white/5 backdrop-blur-xl p-10 rounded-[2rem] border border-black/5 dark:border-white/10 shadow-2xl">

                            <div className="space-y-6">

                                <div className="text-xl font-bold">
                                    Why Go Pro?
                                </div>

                                <div className="space-y-4 text-sm text-muted-foreground">

                                    <div className="flex items-start gap-3">
                                        <Check className="w-4 h-4 text-primary mt-1" />
                                        Advanced multi-strategy automation
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <Check className="w-4 h-4 text-primary mt-1" />
                                        Real-time institutional data feeds
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <Check className="w-4 h-4 text-primary mt-1" />
                                        Direct webhook & API access
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <Check className="w-4 h-4 text-primary mt-1" />
                                        Dedicated support desk
                                    </div>

                                </div>

                                <Button className="w-full mt-6 rounded-xl">
                                    Upgrade Now <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>

                            </div>

                        </div>
                    </div>

                </div>

                {/* ---------------- PRICING CARDS (UNCHANGED) ---------------- */}

                <div className="grid gap-8 lg:gap-10 md:grid-cols-2 lg:grid-cols-3 items-start">
                    {PLANS.map((plan) => (
                        <Card
                            key={plan.id}
                            className={`relative overflow-hidden rounded-[2rem] transition-all duration-500 group
                                ${plan.isPopular
                                    ? 'bg-white dark:bg-zinc-900 border-primary shadow-[0_20px_60px_-15px_rgba(245,158,11,0.15)] ring-1 ring-primary/20 scale-105 z-10'
                                    : 'bg-white dark:bg-black/50 border-slate-100 dark:border-white/5 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_60px_-12px_rgba(0,0,0,0.15)] dark:shadow-none hover:border-primary/30 hover:-translate-y-1'
                                }`}
                        >
                            {plan.isPopular && (
                                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
                            )}

                            <CardHeader className="p-6 pb-0">
                                {plan.isPopular && (
                                    <div className="mb-3">
                                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary text-black text-[10px] font-bold uppercase tracking-wider shadow-lg shadow-primary/25">
                                            <Star className="w-3 h-3 fill-black" /> Most Popular
                                        </span>
                                    </div>
                                )}
                                <CardTitle className="text-2xl font-bold mb-2">{plan.name}</CardTitle>
                                <CardDescription>{plan.description}</CardDescription>
                            </CardHeader>

                            <CardContent className="p-6 pt-6">
                                <div className="flex items-baseline gap-1 mb-6">
                                    <span className="text-4xl font-bold tracking-tighter">{plan.price}</span>
                                    <span className="text-muted-foreground text-sm ml-1">/ {plan.duration}</span>
                                </div>

                                <div className="space-y-4 mb-8">
                                    {plan.features.map((feature, i) => (
                                        <div key={i} className="flex items-start gap-3">
                                            <div className={`mt-0.5 w-4 h-4 rounded-full flex items-center justify-center shrink-0 
                                                ${plan.isPopular
                                                    ? 'bg-primary text-black'
                                                    : 'bg-muted text-muted-foreground'
                                                }`}>
                                                <Check className="w-2.5 h-2.5 stroke-[3]" />
                                            </div>
                                            <span className="text-sm leading-relaxed">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>

                            <CardFooter className="p-6 pt-0">
                                <Link href={plan.href} className="w-full">
                                    <Button
                                        size="lg"
                                        className={`w-full h-12 rounded-xl text-sm font-bold transition-all duration-300 
                                            ${plan.isPopular
                                                ? 'bg-primary text-black hover:bg-primary/90 shadow-xl shadow-primary/20 hover:scale-[1.02]'
                                                : 'bg-foreground text-background hover:opacity-90'
                                            }`}
                                    >
                                        {plan.buttonText} <ArrowRight className="w-4 h-4 ml-2" />
                                    </Button>
                                </Link>
                            </CardFooter>
                        </Card>
                    ))}
                </div>

            </div>
        </div>
    );
}
