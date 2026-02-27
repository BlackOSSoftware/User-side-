"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowRight, Activity, TrendingUp, Lock, Zap, Shield, BarChart3, Clock, CheckCircle2, Wallet, Users } from "lucide-react";
import { MOCK_SIGNALS, MOCK_STATS } from "@/lib/mock";
import { useEffect, useState } from "react";



export default function Home() {
    const signals = MOCK_SIGNALS.slice(0, 3);

    const heroRightImage =
        "https://images.unsplash.com/photo-1612461313144-fc1676a1bf17?q=80&w=1102&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

    const taglines = [
        "Institutional playbooks. Retail clarity.",
        "Verified structure. Confident execution.",
        "Live signals. Disciplined entries.",
        "Precision in, protected out.",
    ];

    const [taglineIndex, setTaglineIndex] = useState(0);
    const [displayText, setDisplayText] = useState("");
    const [charIndex, setCharIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const current = taglines[taglineIndex];

        let timeout: ReturnType<typeof setTimeout>;

        if (!isDeleting && charIndex < current.length) {
            // typing forward
            timeout = setTimeout(() => {
                setDisplayText(current.slice(0, charIndex + 1));
                setCharIndex((prev) => prev + 1);
            }, 45);
        }
        else if (!isDeleting && charIndex === current.length) {
            // pause at full text
            timeout = setTimeout(() => setIsDeleting(true), 1600);
        }
        else if (isDeleting && charIndex > 0) {
            // deleting backward
            timeout = setTimeout(() => {
                setDisplayText(current.slice(0, charIndex - 1));
                setCharIndex((prev) => prev - 1);
            }, 25);
        }
        else if (isDeleting && charIndex === 0) {
            // move to next sentence
            setIsDeleting(false);
            setTaglineIndex((prev) => (prev + 1) % taglines.length);
        }

        return () => clearTimeout(timeout);
    }, [charIndex, isDeleting, taglineIndex]);



    return (
        <div className="flex flex-col min-h-screen font-sans overflow-x-hidden">
            {/* Hero Section - Fintech Style */}
            <section className="relative pt-14 pb-12 md:pb-20 overflow-hidden">

                {/* BACKGROUND SYSTEM */}
                <div className="absolute inset-0 z-0 bg-background">

                    {/* MOBILE TOP IMAGE */}
                    <div className="hidden lg:block ..."></div>

                    {/* mobile gradient fade */}
                    <div className="lg:hidden absolute top-[35vh] left-0 w-full h-[15vh] bg-gradient-to-b from-transparent to-background" />

                    {/* Existing glow */}
                    <div className="absolute top-0 left-0 right-0 h-[500px] w-full bg-gradient-to-b from-primary/5 via-transparent to-transparent blur-3xl opacity-40"></div>
                </div>


                <div className="relative z-10 w-full max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12 lg:gap-8 items-center lg:[grid-template-columns:minmax(0,1fr)_540px]">

                    {/* Left Column: Text & CTAs */}
                    <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-8 relative z-10 pt-12 sm:pt-16 lg:pt-0">


                        {/* Social Proof Pill */}
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                            Trusted by serious market participants
                        </div>

                        {/* Main Heading */}
                        <div className="relative">
                            <h1 className="font-heading text-2xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground leading-[1.1]">
                                <span className="color-cycle">MSPK Signal Desk.</span>
                                <br />

                                <span className="flex flex-col lg:flex-row items-center lg:items-start gap-2 min-h-[1.5em] text-center lg:text-left lg:whitespace-nowrap">

                                    <Zap className="h-5 w-5 text-primary animate-pulse shrink-0 mt-[2px]" />

                                    {/* JS TYPEWRITER TEXT */}
                                    <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
                                        {displayText}
                                        <span className="text-blue-600 dark:text-blue-400 animate-pulse">|</span>
                                    </span>

                                </span>

                            </h1>

                            <svg className="hidden lg:block absolute w-[120%] h-4 -bottom-2 -left-4 text-primary/20 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                                <path d="M0 5 Q 50 15 100 5" stroke="currentColor" strokeWidth="4" fill="none" />
                            </svg>
                        </div>

                        {/* Subtext */}
                        <p className="max-w-[35rem] text-lg sm:text-xl text-muted-foreground leading-relaxed">
                            Institutional-grade market intelligence delivered with speed, structure, and accountability.
                            <span className="text-foreground font-medium"> Performance-first execution</span> for disciplined traders.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                            <Link href="/trial" className="w-full sm:w-auto">
                                <Button
                                    size="lg"
                                    className="w-full sm:w-auto h-14 px-8 rounded-2xl bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-400 text-white font-bold shadow-[0_12px_40px_-16px_rgba(59,130,246,0.8)] hover:shadow-[0_18px_50px_-16px_rgba(59,130,246,0.9)] hover:scale-[1.02] transition-all"
                                >
                                    Start Premium Trial
                                </Button>
                            </Link>
                            <Link href="/market" className="w-full sm:w-auto">
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="w-full sm:w-auto h-14 px-8 rounded-2xl border border-primary/30 bg-white/5 text-foreground/90 backdrop-blur-md hover:bg-primary/10 hover:border-primary/60 font-semibold group transition-all"
                                >
                                    View Performance <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </Link>
                        </div>

                        {/* Platform Highlights */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 w-full">
                            {/* keep your highlight cards EXACT same */}
                        </div>
                    </div>

                    {/* Right Column Image (DESKTOP ONLY — UNCHANGED) */}
                    <div
                        className="relative hidden lg:block h-[600px] w-[200%] ml-auto -mr-[1rem] -translate-x-[24vw] overflow-hidden bg-cover bg-center brightness-[1.22] contrast-[0.96] saturate-[1.08] after:absolute after:inset-0 after:bg-gradient-to-l after:from-primary/20 after:via-transparent after:to-transparent after:content-[''] pointer-events-none absolute bottom-0 left-0 right-0 h-10 bg-background)]"
                        style={{
                            backgroundImage: `url("${heroRightImage}")`,
                            backgroundPosition: "20% center",
                            WebkitMaskImage:
                                "linear-gradient(90deg, transparent 0%, transparent 12%, rgba(0,0,0,0.55) 38%, black 60%)",
                            maskImage:
                                "linear-gradient(90deg, transparent 0%, transparent 12%, rgba(0,0,0,0.55) 38%, black 60%)",
                        }}
                    ></div>

                </div>


                {/* Dashboard Preivew (Moved Below Split Hero) */}
                <div className="relative z-10 w-full max-w-7xl mx-auto px-4 mt-4 lg:mt-0 flex flex-col items-center gap-6 md:gap-8 text-center">
                    {/* High-Fidelity Dashboard Mockup (Flat & Premium) */}
                    {/* SIGNAL VALUE CANVAS */}
                    <div className="relative w-full max-w-7xl mx-auto px-3 group mt-6 md:mt-8">

                        {/* soft glow */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition duration-500"></div>

                        <div className="relative rounded-xl border border-border bg-card shadow-xl overflow-hidden">

                            {/* background animated gradient */}
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-blue-500/5 animate-[pulse_8s_infinite]" />

                            <div className="relative p-10 lg:p-16 flex flex-col items-center text-center gap-10">

                                {/* MAIN QUOTE */}
                                <div className="max-w-3xl space-y-4">
                                    <h3 className="text-2xl lg:text-3xl font-bold leading-tight">
                                        We deliver <span className="text-primary">high-probability signal frameworks</span>
                                        designed for consistency, clarity, and disciplined execution.
                                    </h3>

                                    <p className="text-muted-foreground text-sm lg:text-base">
                                        Our research-led process blends structure, liquidity, and risk controls
                                        to deliver actionable insights, not noise.
                                    </p>
                                </div>

                                {/* KEY VALUE WORDS */}
                                <div className="w-full max-w-none sm:max-w-5xl space-y-4 overflow-hidden">

                                    {/* ================= ROW 1 ================= */}
                                    <div className="overflow-hidden">
                                        <div className="flex w-max animate-[marquee-left_25s_linear_infinite]">

                                            {/* GROUP 1 */}
                                            <div className="flex gap-3 pr-3">
                                                {[
                                                    { label: "Precision", color: "from-blue-500/20 to-blue-500/5 border-blue-500/30" },
                                                    { label: "Consistency", color: "from-emerald-500/20 to-emerald-500/5 border-emerald-500/30" },
                                                    { label: "Clarity", color: "from-cyan-500/20 to-cyan-500/5 border-cyan-500/30" },
                                                    { label: "Discipline", color: "from-purple-500/20 to-purple-500/5 border-purple-500/30" },
                                                    { label: "Confidence", color: "from-amber-500/20 to-amber-500/5 border-amber-500/30" },
                                                    { label: "Structure", color: "from-indigo-500/20 to-indigo-500/5 border-indigo-500/30" },
                                                    { label: "Performance", color: "from-pink-500/20 to-pink-500/5 border-pink-500/30" },
                                                    { label: "Reliability", color: "from-teal-500/20 to-teal-500/5 border-teal-500/30" },
                                                    { label: "Focus", color: "from-orange-500/20 to-orange-500/5 border-orange-500/30" },
                                                    { label: "Edge", color: "from-primary/20 to-primary/5 border-primary/30" },
                                                ].map((item, i) => (
                                                    <div key={i} className={`px-2 py-1.5 sm:px-5 sm:py-4 rounded-xl bg-gradient-to-br ${item.color} backdrop-blur border text-xs sm:text-base font-semibold whitespace-nowrap`}>
                                                        {item.label}
                                                    </div>
                                                ))}
                                            </div>

                                            {/* GROUP 2 (clone SAME order → seamless) */}
                                            <div className="flex gap-3">
                                                {[
                                                    { label: "Precision", color: "from-blue-500/20 to-blue-500/5 border-blue-500/30" },
                                                    { label: "Consistency", color: "from-emerald-500/20 to-emerald-500/5 border-emerald-500/30" },
                                                    { label: "Clarity", color: "from-cyan-500/20 to-cyan-500/5 border-cyan-500/30" },
                                                    { label: "Discipline", color: "from-purple-500/20 to-purple-500/5 border-purple-500/30" },
                                                    { label: "Confidence", color: "from-amber-500/20 to-amber-500/5 border-amber-500/30" },
                                                    { label: "Structure", color: "from-indigo-500/20 to-indigo-500/5 border-indigo-500/30" },
                                                    { label: "Performance", color: "from-pink-500/20 to-pink-500/5 border-pink-500/30" },
                                                    { label: "Reliability", color: "from-teal-500/20 to-teal-500/5 border-teal-500/30" },
                                                    { label: "Focus", color: "from-orange-500/20 to-orange-500/5 border-orange-500/30" },
                                                    { label: "Edge", color: "from-primary/20 to-primary/5 border-primary/30" },
                                                ].map((item, i) => (
                                                    <div key={i} className={`px-2 py-1.5 sm:px-5 sm:py-4 rounded-xl bg-gradient-to-br ${item.color} backdrop-blur border text-xs sm:text-base font-semibold whitespace-nowrap`}>
                                                        {item.label}
                                                    </div>
                                                ))}
                                            </div>

                                        </div>
                                    </div>


                                    {/* ================= ROW 2 ================= */}
                                    <div className="overflow-hidden">
                                        <div className="flex w-max animate-[marquee-right_28s_linear_infinite]">

                                            {/* GROUP 1 */}
                                            <div className="flex gap-3 pr-3">
                                                {[
                                                    { label: "Edge", color: "from-primary/20 to-primary/5 border-primary/30" },
                                                    { label: "Focus", color: "from-orange-500/20 to-orange-500/5 border-orange-500/30" },
                                                    { label: "Reliability", color: "from-teal-500/20 to-teal-500/5 border-teal-500/30" },
                                                    { label: "Performance", color: "from-pink-500/20 to-pink-500/5 border-pink-500/30" },
                                                    { label: "Structure", color: "from-indigo-500/20 to-indigo-500/5 border-indigo-500/30" },
                                                    { label: "Confidence", color: "from-amber-500/20 to-amber-500/5 border-amber-500/30" },
                                                    { label: "Discipline", color: "from-purple-500/20 to-purple-500/5 border-purple-500/30" },
                                                    { label: "Clarity", color: "from-cyan-500/20 to-cyan-500/5 border-cyan-500/30" },
                                                    { label: "Consistency", color: "from-emerald-500/20 to-emerald-500/5 border-emerald-500/30" },
                                                    { label: "Precision", color: "from-blue-500/20 to-blue-500/5 border-blue-500/30" },
                                                ].map((item, i) => (
                                                    <div key={i} className={`px-4 py-3 sm:px-5 sm:py-4 rounded-xl bg-gradient-to-br ${item.color} backdrop-blur border text-xs sm:text-base font-semibold whitespace-nowrap`}>
                                                        {item.label}
                                                    </div>
                                                ))}
                                            </div>

                                            {/* GROUP 2 */}
                                            <div className="flex gap-3">
                                                {[
                                                    { label: "Edge", color: "from-primary/20 to-primary/5 border-primary/30" },
                                                    { label: "Focus", color: "from-orange-500/20 to-orange-500/5 border-orange-500/30" },
                                                    { label: "Reliability", color: "from-teal-500/20 to-teal-500/5 border-teal-500/30" },
                                                    { label: "Performance", color: "from-pink-500/20 to-pink-500/5 border-pink-500/30" },
                                                    { label: "Structure", color: "from-indigo-500/20 to-indigo-500/5 border-indigo-500/30" },
                                                    { label: "Confidence", color: "from-amber-500/20 to-amber-500/5 border-amber-500/30" },
                                                    { label: "Discipline", color: "from-purple-500/20 to-purple-500/5 border-purple-500/30" },
                                                    { label: "Clarity", color: "from-cyan-500/20 to-cyan-500/5 border-cyan-500/30" },
                                                    { label: "Consistency", color: "from-emerald-500/20 to-emerald-500/5 border-emerald-500/30" },
                                                    { label: "Precision", color: "from-blue-500/20 to-blue-500/5 border-blue-500/30" },
                                                ].map((item, i) => (
                                                    <div key={i} className={`px-2 py-1.5 sm:px-5 sm:py-4 rounded-xl bg-gradient-to-br ${item.color} backdrop-blur border text-xs sm:text-base font-semibold whitespace-nowrap`}>
                                                        {item.label}
                                                    </div>
                                                ))}
                                            </div>

                                        </div>
                                    </div>

                                </div>



                                {/* TRUST STRIP */}
                                <div className="flex flex-wrap justify-center gap-6 text-xs text-muted-foreground pt-4">

                                    <span className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                                        Institutional methodology
                                    </span>

                                    <span className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                                        Multi-timeframe confluence
                                    </span>

                                    <span className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                                        Strict risk framework
                                    </span>

                                </div>

                            </div>
                        </div>
                    </div>




                </div>
            </section>

            {/* Platform Ecosystem - SOW Features V3: Spotlight Zig-Zag (Alerts Prioritized) */}
            <section className="w-full max-w-7xl mx-auto px-4 py-14 md:py-20 relative z-10 overflow-hidden">
                {/* Background ambient lighting */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1000px] bg-gradient-to-b from-primary/5 via-transparent to-transparent -z-10 pointer-events-none"></div>

                <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-12 md:mb-20">
                    <div className="text-center md:text-left max-w-4xl mx-auto md:mx-0">
                        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold tracking-tighter text-foreground leading-[1.1]">
                            The Infrastructure of <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary/70 to-primary animate-gradient-x">Modern Trading</span>
                        </h2>
                    </div>
                    <div className="flex flex-col items-start md:items-end gap-6 w-full md:w-auto">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-primary text-sm font-semibold uppercase tracking-wider backdrop-blur-md shadow-xl">
                            <Zap className="w-4 h-4 fill-current" />
                            Powering Alpha
                        </div>
                        <p className="text-muted-foreground max-w-xl text-xl md:text-2xl leading-relaxed font-light text-left md:text-right">
                            Discard the grid. We built a direct pipeline to the markets.
                        </p>
                    </div>
                </div>

                <div className="space-y-32">

                    {/* Feature 1: Multi-Channel Alerts (HERO FEATURE) */}
                    <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24 group">
                        <div className="lg:w-1/2 space-y-8">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-500/50 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform duration-500">
                                <Shield className="w-8 h-8 text-white fill-white/20" />
                            </div>
                            <h3 className="text-4xl md:text-5xl font-bold text-foreground">
                                Multi-Channel Alerts
                            </h3>
                            <p className="text-lg text-muted-foreground leading-loose">
                                Never miss a setup. Get instant notifications delivered to your preferred device the moment your strategy triggers.
                            </p>
                            <div className="flex flex-col gap-4">
                                <div className="flex items-center gap-4">
                                    <div className="p-2 rounded-lg bg-blue-500/10"><CheckCircle2 className="w-5 h-5 text-blue-500" /></div>
                                    <span className="text-lg">WhatsApp, Telegram, & SMS</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="p-2 rounded-lg bg-blue-500/10"><CheckCircle2 className="w-5 h-5 text-blue-500" /></div>
                                    <span className="text-lg">&lt; 100ms Push Latency</span>
                                </div>
                            </div>
                        </div>
                        {/* Visual Mockup - Golden Notification Center (MATCHING ANALYTICS DIMENSIONS) */}
                        <div className="lg:w-1/2 w-full lg:h-[400px] relative">
                            <div className="absolute -inset-4 bg-gradient-to-tr from-blue-500/20 to-sky-500/5 rounded-[30px] blur-2xl opacity-60"></div>

                            {/* Notification Card (Sized to match Analytics) */}
                            <div className="relative h-full w-full bg-white dark:bg-[#0a0a0a] border border-black/5 dark:border-white/10 rounded-[20px] shadow-2xl overflow-hidden backdrop-blur-xl ring-1 ring-black/5 dark:ring-white/5 flex flex-col">
                                {/* Header */}
                                <div className="flex items-center justify-between px-6 py-4 border-b border-black/5 dark:border-white/5 bg-slate-50/50 dark:bg-white/5">
                                    <div className="flex items-center gap-3">
                                        <div className="flex -space-x-2">
                                            <div className="w-8 h-8 rounded-full bg-[#25D366] flex items-center justify-center ring-2 ring-white dark:ring-black"><span className="text-white text-[10px] font-bold">WA</span></div>
                                            <div className="w-8 h-8 rounded-full bg-[#229ED9] flex items-center justify-center ring-2 ring-white dark:ring-black"><span className="text-white text-[10px] font-bold">TG</span></div>
                                        </div>
                                        <span className="text-sm font-bold text-slate-900 dark:text-white/90">Alerts Webhook</span>
                                    </div>
                                    <div className="flex gap-1.5">
                                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/50"></div>
                                        <div className="w-2.5 h-2.5 rounded-full bg-sky-500/20 border border-sky-500/50"></div>
                                        <div className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/50"></div>
                                    </div>
                                </div>

                                {/* Notifications List */}
                                <div className="flex-1 p-6 space-y-4 overflow-hidden relative">
                                    <div className="absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-white dark:from-[#0a0a0a] to-transparent z-10"></div>

                                    {/* Notification 1: WhatsApp */}
                                    <div className="bg-slate-50 dark:bg-white/5 p-4 rounded-xl border border-slate-200 dark:border-white/10 shadow-sm dark:shadow-lg flex gap-4 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer group/alert">
                                        <div className="w-10 h-10 rounded-full bg-[#25D366]/10 dark:bg-[#25D366]/20 flex items-center justify-center shrink-0">
                                            <div className="w-6 h-6 rounded-full bg-[#25D366] flex items-center justify-center"><span className="text-white text-[10px] font-bold">WA</span></div>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-start mb-1">
                                                <span className="font-bold text-sm text-[#25D366]">WhatsApp</span>
                                                <span className="text-[10px] text-slate-500 dark:text-white/40">Now</span>
                                            </div>
                                            <p className="text-sm text-slate-600 dark:text-white/90 leading-snug">🚀 <b className="text-blue-600 dark:text-blue-400">NIFTY 50</b> crossed 24,500. <br />Signal: <span className="text-green-600 dark:text-green-400 font-bold">BUY CE</span></p>
                                        </div>
                                    </div>

                                    {/* Notification 2: Telegram */}
                                    <div className="bg-slate-50 dark:bg-white/5 p-4 rounded-xl border border-slate-200 dark:border-white/10 shadow-sm dark:shadow-lg flex gap-4 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer group/alert">
                                        <div className="w-10 h-10 rounded-full bg-[#229ED9]/10 dark:bg-[#229ED9]/20 flex items-center justify-center shrink-0">
                                            <div className="w-6 h-6 rounded-full bg-[#229ED9] flex items-center justify-center"><span className="text-white text-[10px] font-bold">TG</span></div>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-start mb-1">
                                                <span className="font-bold text-sm text-[#229ED9]">Telegram Premium</span>
                                                <span className="text-[10px] text-slate-500 dark:text-white/40">2m ago</span>
                                            </div>
                                            <p className="text-sm text-slate-600 dark:text-white/90 leading-snug">Double Top detected on <b className="text-blue-600 dark:text-blue-400">BANKNIFTY</b> 15m chart. 📉</p>
                                        </div>
                                    </div>

                                    {/* Notification 3: System */}
                                    <div className="bg-blue-50 dark:bg-blue-500/10 p-4 rounded-xl border border-blue-200 dark:border-blue-500/20 shadow-[0_0_15px_rgba(245,158,11,0.1)] flex gap-4 relative overflow-hidden">
                                        <div className="absolute left-0 top-0 w-1 h-full bg-blue-500"></div>
                                        <div className="w-10 h-10 rounded-full bg-blue-500/10 dark:bg-blue-500/20 flex items-center justify-center shrink-0">
                                            <Zap className="w-5 h-5 text-blue-600 dark:text-blue-500" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-start mb-2">
                                                <span className="font-bold text-sm text-blue-600 dark:text-blue-500">System Alert</span>
                                                <span className="text-[10px] text-slate-500 dark:text-white/40">5m ago</span>
                                            </div>
                                            <div className="space-y-2">
                                                <div className="flex justify-between text-xs text-slate-600 dark:text-white/70">
                                                    <span>Daily P&L</span>
                                                    <span className="text-green-600 dark:text-green-400 font-mono font-bold">+₹14,250.00</span>
                                                </div>
                                                <div className="h-1.5 w-full bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden">
                                                    <div className="h-full bg-green-500 w-[75%]"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-white dark:from-[#0a0a0a] to-transparent z-10 pointer-events-none"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Feature 2: Analytics (Golden Colors) */}
                    <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-24 group">
                        {/* Visual Mockup */}
                        <div className="lg:w-1/2 w-full lg:h-[400px] relative">
                            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-sky-600/20 rounded-[30px] blur-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-700"></div>
                            <div className="relative h-full bg-white dark:bg-[#0a0a0a] border border-black/5 dark:border-white/10 rounded-[20px] shadow-2xl overflow-hidden p-8 flex items-end justify-center">
                                {/* Bar Chart Visualization - Golden */}
                                <div className="w-full flex items-end justify-between gap-2 h-48">
                                    {[35, 55, 40, 70, 50, 85, 60, 95, 75, 50, 65, 80].map((h, i) => (
                                        <div key={i} className="flex-1 bg-gradient-to-t from-blue-500 dark:from-blue-600 to-sky-400 rounded-t-sm opacity-80 hover:opacity-100 transition-all duration-300 hover:scale-y-105 origin-bottom shadow-[0_0_10px_rgba(245,158,11,0.3)]" style={{ height: `${h}%` }}></div>
                                    ))}
                                </div>
                                <div className="absolute top-8 left-8">
                                    <div className="text-sm text-slate-500 dark:text-white/50 uppercase tracking-wider mb-1">Total P&L</div>
                                    <div className="text-4xl font-mono font-bold text-slate-900 dark:text-white">+₹4.2L</div>
                                </div>
                            </div>
                        </div>

                        <div className="lg:w-1/2 space-y-8">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-500/50 flex items-center justify-center shadow-lg shadow-purple-500/20 group-hover:scale-110 transition-transform duration-500">
                                <TrendingUp className="w-8 h-8 text-white fill-white/20" />
                            </div>
                            <h3 className="text-4xl md:text-5xl font-bold text-foreground">
                                Deep Analytics
                            </h3>
                            <p className="text-lg text-muted-foreground leading-loose">
                                Comprehensive trading journals and performance reports to optimize your edge.
                            </p>
                            <div className="flex flex-col gap-4">
                                <div className="flex items-center gap-4">
                                    <div className="p-2 rounded-lg bg-purple-500/10"><CheckCircle2 className="w-5 h-5 text-purple-500" /></div>
                                    <span className="text-lg">Strategy-wise Performance</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="p-2 rounded-lg bg-purple-500/10"><CheckCircle2 className="w-5 h-5 text-purple-500" /></div>
                                    <span className="text-lg">One-Click CSV/PDF Export</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    

                </div>
            </section>

            {/* Pricing Section */}
            <section className="w-full max-w-7xl mx-auto px-4 py-16 md:py-24 relative z-10 overflow-hidden">
                {/* Background ambient lighting */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1000px] bg-gradient-to-b from-primary/5 via-transparent to-transparent -z-10 pointer-events-none"></div>

                <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-12 md:mb-20">
                    <div className="text-center md:text-left max-w-4xl mx-auto md:mx-0">
                        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold tracking-tighter text-foreground leading-[1.1]">
                            Choose your <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary/70 to-primary animate-gradient-x">Trading Edge</span>
                        </h2>
                    </div>
                    <div className="flex flex-col items-start md:items-end gap-6 w-full md:w-auto">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-primary text-sm font-semibold uppercase tracking-wider backdrop-blur-md shadow-xl">
                            <Wallet className="w-4 h-4 fill-current" />
                            Simple Pricing
                        </div>
                        <p className="text-muted-foreground max-w-xl text-xl md:text-2xl leading-relaxed font-light text-left md:text-right">
                            Transparent pricing. No hidden fees. Just results.
                        </p>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto items-stretch">
                    {/* Demo Plan */}
                    <div className="relative p-8 rounded-3xl border border-white/10 bg-white dark:bg-white/5 shadow-xl flex flex-col items-center text-center hover:translate-y-[-4px] transition-transform duration-300">
                        <div className="mb-6">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Demo Access</h3>
                            <p className="text-sm text-slate-500 dark:text-white/60">Perfect for testing the waters</p>
                        </div>
                        <div className="mb-8">
                            <span className="text-4xl font-bold text-slate-900 dark:text-white">Free</span>
                            <span className="text-sm text-slate-500 dark:text-white/40"> / 1 Day</span>
                        </div>
                        <ul className="space-y-4 mb-8 text-left w-full max-w-[240px] mx-auto">
                            <li className="flex items-center gap-3 text-sm text-slate-600 dark:text-white/80"><CheckCircle2 className="w-4 h-4 text-green-500" /> Unlimited Strategies</li>
                            <li className="flex items-center gap-3 text-sm text-slate-600 dark:text-white/80"><CheckCircle2 className="w-4 h-4 text-green-500" /> &lt; 100ms Latency</li>
                            <li className="flex items-center gap-3 text-sm text-slate-600 dark:text-white/80"><CheckCircle2 className="w-4 h-4 text-green-500" /> Deep Analytics & Export</li>
                            <li className="flex items-center gap-3 text-sm text-slate-600 dark:text-white/80"><CheckCircle2 className="w-4 h-4 text-green-500" /> Priority 24/7 Support</li>
                        </ul>
                        <div className="mt-auto w-full">
                            <Link href="/trial">
                                <Button size="lg" variant="outline" className="w-full border-slate-200 dark:border-white/20 hover:bg-slate-100 dark:hover:bg-white/10 text-slate-900 dark:text-white">Start 1-Day Trial</Button>
                            </Link>
                        </div>
                    </div>

                    {/* Pro Plan (Highlighted - Hero) */}
                    <div className="relative p-8 rounded-3xl border border-blue-500/50 bg-slate-50 dark:bg-[#0a0a0a] shadow-2xl shadow-blue-500/20 flex flex-col items-center text-center ring-1 ring-blue-500/50 z-10 scale-105 transform">
                        <div className="absolute top-0 -translate-y-1/2 bg-gradient-to-r from-blue-500 to-sky-500 text-black font-bold px-4 py-1 rounded-full text-xs uppercase tracking-wider shadow-lg">
                            Most Popular
                        </div>
                        <div className="mb-6">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Pro Access</h3>
                            <p className="text-sm text-slate-500 dark:text-white/60">For serious algorithmic traders</p>
                        </div>
                        <div className="mb-8">
                            <span className="text-4xl font-bold text-slate-900 dark:text-white">₹25,000</span>
                            <span className="text-sm text-slate-500 dark:text-white/40"> / Month</span>
                        </div>
                        <ul className="space-y-4 mb-8 text-left w-full max-w-[240px] mx-auto">
                            <li className="flex items-center gap-3 text-sm text-slate-600 dark:text-white/80"><CheckCircle2 className="w-4 h-4 text-blue-500" /> Unlimited Strategies</li>
                            <li className="flex items-center gap-3 text-sm text-slate-600 dark:text-white/80"><CheckCircle2 className="w-4 h-4 text-blue-500" /> &lt; 100ms Latency</li>
                            <li className="flex items-center gap-3 text-sm text-slate-600 dark:text-white/80"><CheckCircle2 className="w-4 h-4 text-blue-500" /> Deep Analytics & Export</li>
                            <li className="flex items-center gap-3 text-sm text-slate-600 dark:text-white/80"><CheckCircle2 className="w-4 h-4 text-blue-500" /> Priority 24/7 Support</li>
                        </ul>
                        <div className="mt-auto w-full">
                            <Link href="/pricing">
                                <Button size="lg" className="w-full bg-gradient-to-r from-blue-500 to-sky-500 hover:from-blue-600 hover:to-sky-600 text-black font-bold shadow-lg shadow-blue-500/25">Get Started</Button>
                            </Link>
                        </div>
                    </div>

                    {/* Enterprise Plan (New) */}
                    <div className="relative p-8 rounded-3xl border border-white/10 bg-white dark:bg-white/5 shadow-xl flex flex-col items-center text-center hover:translate-y-[-4px] transition-transform duration-300">
                        <div className="mb-6">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Enterprise</h3>
                            <p className="text-sm text-slate-500 dark:text-white/60">For Prop Desks & Funds</p>
                        </div>
                        <div className="mb-8">
                            <span className="text-4xl font-bold text-slate-900 dark:text-white">Custom</span>
                            <span className="text-sm text-slate-500 dark:text-white/40"> / Pricing</span>
                        </div>
                        <ul className="space-y-4 mb-8 text-left w-full max-w-[240px] mx-auto">
                            <li className="flex items-center gap-3 text-sm text-slate-600 dark:text-white/80"><Shield className="w-4 h-4 text-indigo-500" /> Dedicated Infrastructure</li>
                            <li className="flex items-center gap-3 text-sm text-slate-600 dark:text-white/80"><CheckCircle2 className="w-4 h-4 text-indigo-500" /> White Label Solution</li>
                            <li className="flex items-center gap-3 text-sm text-slate-600 dark:text-white/80"><CheckCircle2 className="w-4 h-4 text-indigo-500" /> FIX API Access</li>
                            <li className="flex items-center gap-3 text-sm text-slate-600 dark:text-white/80"><CheckCircle2 className="w-4 h-4 text-indigo-500" /> Dedicated Account Manager</li>
                        </ul>
                        <div className="mt-auto w-full">
                            <Link href="/contact">
                                <Button size="lg" variant="outline" className="w-full border-slate-200 dark:border-white/20 hover:bg-slate-100 dark:hover:bg-white/10 text-slate-900 dark:text-white">Contact Sales</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials - Social Proof */}
            <section className="w-full max-w-7xl mx-auto px-4 py-16 md:py-24 relative z-10 overflow-hidden">
                {/* Background ambient lighting */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1000px] bg-gradient-to-b from-primary/5 via-transparent to-transparent -z-10 pointer-events-none"></div>

                <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-12 md:mb-20">
                    <div className="text-center md:text-left max-w-4xl mx-auto md:mx-0">
                        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold tracking-tighter text-foreground leading-[1.1]">
                            Trusted by <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary/70 to-primary animate-gradient-x">10,000+ Traders</span>
                        </h2>
                    </div>
                    <div className="flex flex-col items-start md:items-end gap-6 w-full md:w-auto">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-primary text-sm font-semibold uppercase tracking-wider backdrop-blur-md shadow-xl">
                            <Users className="w-4 h-4 fill-current" />
                            Social Proof
                        </div>
                        <p className="text-muted-foreground max-w-xl text-xl md:text-2xl leading-relaxed font-light text-left md:text-right">
                            Don't just take our word for it. See what the community says.
                        </p>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-8 text-left">
                    {/* Testimonial 1 */}
                    <div className="p-8 rounded-3xl bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 hover:-translate-y-2 transition-transform duration-300 hover:border-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/5 group">
                        <div className="flex gap-1 mb-6">
                            {[1, 2, 3, 4, 5].map(s => <div key={s} className="w-5 h-5 text-blue-500 fill-current"><svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg></div>)}
                        </div>
                        <p className="text-lg text-slate-600 dark:text-gray-300 italic mb-8 leading-relaxed">"Finally a signal provider that is transparent with their P&L. I've recovered my past losses in just 2 months using the Pro plan."</p>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-500 flex items-center justify-center text-white font-bold text-lg">RS</div>
                            <div>
                                <div className="font-bold text-foreground">Rahul S.</div>
                                <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Pro Trader • Mumbai</div>
                            </div>
                        </div>
                    </div>

                    {/* Testimonial 2 */}
                    <div className="p-8 rounded-3xl bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 hover:-translate-y-2 transition-transform duration-300 hover:border-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/5 group">
                        <div className="flex gap-1 mb-6">
                            {[1, 2, 3, 4, 5].map(s => <div key={s} className="w-5 h-5 text-blue-500 fill-current"><svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg></div>)}
                        </div>
                        <p className="text-lg text-slate-600 dark:text-gray-300 italic mb-8 leading-relaxed">"The latency is practically non-existent. Executing strategies via their API feels like having a direct line to the exchange."</p>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white font-bold text-lg">PM</div>
                            <div>
                                <div className="font-bold text-foreground">Priya M.</div>
                                <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Algo Developer • Bangalore</div>
                            </div>
                        </div>
                    </div>

                    {/* Testimonial 3 */}
                    <div className="p-8 rounded-3xl bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 hover:-translate-y-2 transition-transform duration-300 hover:border-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/5 group">
                        <div className="flex gap-1 mb-6">
                            {[1, 2, 3, 4, 5].map(s => <div key={s} className="w-5 h-5 text-blue-500 fill-current"><svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg></div>)}
                        </div>
                        <p className="text-lg text-slate-600 dark:text-gray-300 italic mb-8 leading-relaxed">"Most services repaint their signals, but these guys are legit. What you see on the dashboard is exactly what happened live."</p>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-white font-bold text-lg">AK</div>
                            <div>
                                <div className="font-bold text-foreground">Arjun K.</div>
                                <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Swing Trader • Delhi</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}








