"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Star, Zap, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default function PlansPage() {
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
        <div className="flex flex-col min-h-screen bg-white dark:bg-black text-slate-900 dark:text-white selection:bg-primary/30 transition-colors duration-300">
            {/* Background Grid & Spotlights */}
            <div className="absolute inset-0 z-0 w-full h-full pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-[0.2]"></div>
                <div className="absolute top-0 left-0 right-0 h-[500px] w-full bg-gradient-to-b from-primary/5 via-transparent to-transparent blur-3xl opacity-40"></div>
            </div>

            <div className="w-full max-w-7xl mx-auto mt-10 px-6 py-16 md:py-24 relative z-10">
                {/* Modern Hero Header */}
                <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-20">
                    <div className="space-y-6 max-w-3xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <Zap className="w-3 h-3 fill-current animate-pulse" /> Flexible Pricing
                        </div>
                        <h1 className="text-5xl md:text-8xl font-heading font-bold tracking-tighter leading-[0.9] text-slate-900 dark:text-white">
                            Choose your <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-br from-primary via-primary/80 to-primary/50 filter drop-shadow-sm">Edge</span>
                            <span className="text-primary">.</span>
                        </h1>
                        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed border-l-2 border-slate-200 dark:border-white/10 pl-6">
                            Professional grade signal access. Transparent pricing, no hidden fees. <br /> Start winning with institutional setups today.
                        </p>
                    </div>

                    <div className="hidden md:flex gap-8 p-6 rounded-2xl bg-card/40 backdrop-blur-xl border border-primary/20 shadow-2xl shadow-primary/5">
                        <div>
                            <div className="text-sm text-muted-foreground mb-1">Active Traders</div>
                            <div className="text-3xl font-mono font-bold text-foreground flex items-center gap-2">
                                10k+ <span className="text-sm text-green-600 dark:text-green-500 px-2 py-0.5 rounded-full bg-green-100 dark:bg-green-500/10">Growing</span>
                            </div>
                        </div>
                        <div className="w-px h-12 bg-border/50"></div>
                        <div>
                            <div className="text-sm text-muted-foreground mb-1">System Uptime</div>
                            <div className="text-3xl font-mono font-bold text-foreground">99.9%</div>
                        </div>
                    </div>
                </div>

                {/* Plans Grid */}
                <div className="grid gap-8 lg:gap-10 md:grid-cols-2 lg:grid-cols-3 items-start">
                    {PLANS.map((plan) => (
                        <Card
                            key={plan.id}
                            className={`relative overflow-hidden rounded-[2rem] transition-all duration-500 group
                                ${plan.isPopular
                                    ? 'bg-white dark:bg-zinc-900 border-primary shadow-[0_20px_60px_-15px_rgba(245,158,11,0.15)] ring-1 ring-primary/20 scale-105 z-10'
                                    : 'bg-white dark:bg-black/50 border-slate-100 dark:border-white/5 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_60px_-12px_rgba(0,0,0,0.15)] dark:shadow-none hover:border-primary/30 hover:-translate-y-1'
                                }
                            `}
                        >
                            {/* Popular Banner */}
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
                                <CardTitle className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{plan.name}</CardTitle>
                                <CardDescription className="text-sm text-slate-500 dark:text-slate-400 font-medium">{plan.description}</CardDescription>
                            </CardHeader>

                            <CardContent className="p-6 pt-6">
                                <div className="flex items-baseline gap-1 mb-6">
                                    <span className="text-4xl font-bold text-slate-900 dark:text-white tracking-tighter">{plan.price}</span>
                                    <span className="text-slate-400 text-sm font-medium ml-1">/ {plan.duration}</span>
                                </div>

                                <div className="space-y-4 mb-8">
                                    {plan.features.map((feature: string, i: number) => (
                                        <div key={i} className="flex items-start gap-3 group/item">
                                            <div className={`mt-0.5 w-4 h-4 rounded-full flex items-center justify-center shrink-0 
                                                ${plan.isPopular
                                                    ? 'bg-primary text-black shadow-md shadow-primary/20'
                                                    : 'bg-slate-100 dark:bg-white/10 text-slate-500 dark:text-slate-300 group-hover/item:bg-primary/20 group-hover/item:text-primary transition-colors'
                                                }`}>
                                                <Check className="w-2.5 h-2.5 stroke-[3]" />
                                            </div>
                                            <span className="text-slate-600 dark:text-slate-300 text-sm font-medium leading-relaxed">{feature}</span>
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
                                                : 'bg-slate-900 dark:bg-white text-white dark:text-black hover:bg-slate-800 dark:hover:bg-slate-200 shadow-lg hover:shadow-xl'
                                            }`}
                                    >
                                        {plan.buttonText} <ArrowRight className="w-4 h-4 ml-2" />
                                    </Button>
                                </Link>
                            </CardFooter>
                        </Card>
                    ))}
                </div>

                {/* Trust Footer */}
                <div className="mt-24 text-center border-t border-slate-200 dark:border-white/5 pt-16">
                    <p className="text-slate-500 font-medium mb-6">Trusted by 10,000+ Traders</p>
                    <div className="flex justify-center items-center gap-8 md:gap-16 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
                        {/* Simple placeholders for logos or text */}
                        <span className="text-xl font-bold font-heading">BINANCE</span>
                        <span className="text-xl font-bold font-heading">ZERODHA</span>
                        <span className="text-xl font-bold font-heading">AngelOne</span>
                        <span className="text-xl font-bold font-heading">BYBIT</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
