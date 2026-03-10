"use client";

import Image from "next/image";
import { Facebook, Instagram, Youtube, MessageCircle, Send, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";

const whatsappNumber = "917770039037";
const whatsappMessage = "Please contact me from the dashboard.";
const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
const telegramUrl = "https://t.me/Mspktradesolution";
const facebookUrl = "https://www.facebook.com/share/198XcXtc6n/";
const youtubeUrl = "https://youtube.com/@mspktradesolution?si=1_U7FF2PehnzFh_z";
const instagramUrl = "https://www.instagram.com/mspk_tradesolutions/";
const xUrl = "https://x.com/MspkTrade";

export default function SocialMediaSection() {
    const sectionRef = useRef<HTMLElement | null>(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const node = sectionRef.current;
        if (!node) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    observer.disconnect();
                }
            },
            { rootMargin: "-10% 0px -10% 0px", threshold: 0.2 }
        );

        observer.observe(node);
        return () => observer.disconnect();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="w-full max-w-7xl mx-auto px-4 py-10 sm:py-14 md:py-24 relative z-10 overflow-hidden"
        >
            <div className="absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-[#0b0b0b] dark:via-[#0a0a0a] dark:to-[#0b0b0b]" />
                <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[1200px] h-[1200px] bg-[radial-gradient(circle,rgba(59,130,246,0.18),transparent_60%)]" />
                <div className="absolute top-24 right-0 w-[520px] h-[520px] bg-[radial-gradient(circle,rgba(14,165,233,0.18),transparent_60%)]" />
            </div>

            <div
                className={`flex flex-col items-center text-center gap-4 sm:gap-6 transition-all duration-1000 ease-out transform-gpu ${inView ? "opacity-100 translate-y-0 blur-0" : "opacity-0 translate-y-10 blur-sm"}`}
                style={{ transitionDelay: "80ms" }}
            >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                    Social Media
                </div>
                <h2 className="text-3xl sm:text-5xl md:text-6xl font-heading font-bold tracking-tight text-foreground">
                    Get Social With Us
                </h2>
                <p className="max-w-3xl text-sm sm:text-lg text-muted-foreground">
                    Follow MSPK Trade Solutions for updates, education, and community insights across your favorite platforms.
                </p>
            </div>

            {/* Mobile mini social strip */}
            <div
                className={`mt-6 grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3 lg:hidden transition-all duration-1000 ease-out transform-gpu ${inView ? "opacity-100 translate-y-0 blur-0" : "opacity-0 translate-y-10 blur-sm"}`}
                style={{ transitionDelay: "140ms" }}
            >
                {[
                    { label: "Instagram", icon: Instagram, color: "from-pink-500 to-yellow-400", href: instagramUrl },
                    { label: "Facebook", icon: Facebook, color: "from-blue-600 to-sky-500", href: facebookUrl },
                    { label: "WhatsApp", icon: MessageCircle, color: "from-emerald-500 to-lime-400", href: whatsappUrl },
                    { label: "Telegram", icon: Send, color: "from-sky-500 to-cyan-400", href: telegramUrl },
                    { label: "X (Twitter)", icon: Twitter, color: "from-slate-900 to-slate-700", href: xUrl },
                    { label: "YouTube", icon: Youtube, color: "from-red-600 to-rose-500", href: youtubeUrl },
                ].map((item, i) => {
                    const Icon = item.icon;
                    return (
                        <a
                            key={i}
                            href={item.href}
                            aria-label={item.label}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white/80 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-xl p-2 flex items-center justify-center shadow-sm"
                        >
                            <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center`}>
                                <Icon className="w-4 h-4 text-white" />
                            </div>
                        </a>
                    );
                })}
            </div>

            <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_360px_1fr] items-center">
                {/* Left floating cards */}
                <div
                    className={`relative hidden lg:flex lg:flex-col lg:gap-4 lg:items-start xl:block h-auto xl:h-[420px] transition-all duration-1000 ease-out transform-gpu ${inView ? "opacity-100 translate-x-0 blur-0" : "opacity-0 -translate-x-10 blur-sm"}`}
                    style={{ transitionDelay: "160ms" }}
                >
                    <a
                        href={instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="lg:static xl:absolute xl:top-8 xl:right-6 bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 shadow-xl rounded-2xl p-4 w-56 lg:w-full xl:w-56 transition hover:-translate-y-0.5"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-pink-500 to-yellow-400 flex items-center justify-center">
                                <Instagram className="w-5 h-5 text-white" />
                            </div>
                            <div className="text-left">
                                <div className="text-sm font-semibold">Instagram Page</div>
                                <div className="text-xs text-muted-foreground">@mspk_tradesolutions</div>
                            </div>
                        </div>
                    </a>
                   
                    <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="lg:static xl:absolute xl:top-40 xl:left-2 bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 shadow-xl rounded-2xl p-4 w-52 lg:w-full xl:w-52 transition hover:-translate-y-0.5"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-500 to-lime-400 flex items-center justify-center">
                                <MessageCircle className="w-5 h-5 text-white" />
                            </div>
                            <div className="text-left">
                                <div className="text-sm font-semibold">WhatsApp</div>
                                <div className="text-xs text-muted-foreground">+91 77700 39037</div>
                            </div>
                        </div>
                    </a>
                    <a
                        href={telegramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="lg:static xl:absolute xl:bottom-6 xl:right-2 bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 shadow-xl rounded-2xl p-4 w-52 lg:w-full xl:w-52 transition hover:-translate-y-0.5"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-sky-500 to-cyan-400 flex items-center justify-center">
                                <Send className="w-5 h-5 text-white" />
                            </div>
                            <div className="text-left">
                                <div className="text-sm font-semibold">Telegram</div>
                                <div className="text-xs text-muted-foreground">t.me/Mspktradesolution</div>
                            </div>
                        </div>
                    </a>
                </div>

                {/* Center phone mock */}
                <div
                    className={`relative mx-auto w-full max-w-[360px] transition-all duration-1000 ease-out transform-gpu ${inView ? "opacity-100 scale-100 blur-0" : "opacity-0 scale-[0.94] blur-sm"}`}
                    style={{ transitionDelay: "220ms" }}
                >
                    <div className="absolute -inset-6 bg-gradient-to-br from-blue-500/20 to-sky-400/20 blur-2xl rounded-[40px]"></div>
                    <div className="relative rounded-[32px] border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur-xl shadow-2xl p-6">
                        <div className="mx-auto h-5 w-24 rounded-full bg-slate-200 dark:bg-white/10 mb-6"></div>
                        <div className="flex flex-col items-center gap-4 py-8">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-sky-400 flex items-center justify-center text-white font-bold text-xl">
                                MSPK
                            </div>
                            <div className="text-xl font-semibold text-foreground">Our Social Media</div>
                            
                                <div className="relative w-48 h-48 rounded-full bg-white/80 dark:bg-white/10 border border-black/5 dark:border-white/10 overflow-hidden">
                                    <Image src="/logo.jpg" alt="MSPK Trade Solutions logo" fill className="object-cover" />
                                </div>
                            {/* </div> */}
                        </div>
                    </div>
                </div>

                {/* Right floating cards */}
                <div
                    className={`relative hidden lg:block h-[420px] transition-all duration-1000 ease-out transform-gpu ${inView ? "opacity-100 translate-x-0 blur-0" : "opacity-0 translate-x-10 blur-sm"}`}
                    style={{ transitionDelay: "180ms" }}
                >
                    <a
                        href={facebookUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute top-10 left-6 bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 shadow-xl rounded-2xl p-4 w-56 transition hover:-translate-y-0.5"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-500 to-sky-400 flex items-center justify-center">
                                <Facebook className="w-5 h-5 text-white" />
                            </div>
                            <div className="text-left">
                                <div className="text-sm font-semibold">Facebook</div>
                                <div className="text-xs text-muted-foreground">MSPK Trade Solutions</div>
                            </div>
                        </div>
                    </a>
                    <a
                        href={youtubeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute bottom-44 left-0 bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 shadow-xl rounded-2xl p-4 w-56 transition hover:-translate-y-0.5"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-red-600 to-rose-500 flex items-center justify-center">
                                <Youtube className="w-5 h-5 text-white" />
                            </div>
                            <div className="text-left">
                                <div className="text-sm font-semibold">YouTube</div>
                                <div className="text-xs text-muted-foreground">@mspktradesolution</div>
                            </div>
                        </div>
                    </a>
                     <div className="lg:static xl:absolute xl:bottom-10 xl:left-4 bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 shadow-xl rounded-2xl p-4 w-52 lg:w-full xl:w-52">
                        <div className="text-sm font-semibold text-foreground">Community Updates</div>
                        <div className="text-xs text-muted-foreground mt-1">Education, highlights, and weekly recaps.</div>
                    </div>
                </div>
            </div>

            <div
                className={`mt-10 hidden lg:flex flex-wrap justify-center gap-4 transition-all duration-1000 ease-out transform-gpu ${inView ? "opacity-100 translate-y-0 blur-0" : "opacity-0 translate-y-10 blur-sm"}`}
                style={{ transitionDelay: "260ms" }}
            >
                <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                    <Button
                        size="lg"
                        className="w-full sm:w-auto h-11 sm:h-12 px-5 sm:px-6 rounded-2xl bg-gradient-to-r from-pink-500 via-red-500 to-yellow-400 text-white font-semibold shadow-lg hover:shadow-xl transition-all text-sm sm:text-base"
                    >
                        <Instagram className="w-5 h-5 mr-2" /> Instagram
                    </Button>
                </a>
                <a href={facebookUrl} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                    <Button
                        size="lg"
                        className="w-full sm:w-auto h-11 sm:h-12 px-5 sm:px-6 rounded-2xl bg-gradient-to-r from-blue-600 to-sky-500 text-white font-semibold shadow-lg hover:shadow-xl transition-all text-sm sm:text-base"
                    >
                        <Facebook className="w-5 h-5 mr-2" /> Facebook
                    </Button>
                </a>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                    <Button
                        size="lg"
                        className="w-full sm:w-auto h-11 sm:h-12 px-5 sm:px-6 rounded-2xl bg-gradient-to-r from-emerald-500 to-lime-400 text-white font-semibold shadow-lg hover:shadow-xl transition-all text-sm sm:text-base"
                    >
                        <MessageCircle className="w-5 h-5 mr-2" /> WhatsApp
                    </Button>
                </a>
                <a href={telegramUrl} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                    <Button
                        size="lg"
                        className="w-full sm:w-auto h-11 sm:h-12 px-5 sm:px-6 rounded-2xl bg-gradient-to-r from-sky-500 to-cyan-400 text-white font-semibold shadow-lg hover:shadow-xl transition-all text-sm sm:text-base"
                    >
                        <Send className="w-5 h-5 mr-2" /> Telegram
                    </Button>
                </a>
                <a href={xUrl} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                    <Button
                        size="lg"
                        className="w-full sm:w-auto h-11 sm:h-12 px-5 sm:px-6 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all text-sm sm:text-base"
                    >
                        <Twitter className="w-5 h-5 mr-2" /> X (Twitter)
                    </Button>
                </a>
                <a href={youtubeUrl} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                    <Button
                        size="lg"
                        className="w-full sm:w-auto h-11 sm:h-12 px-5 sm:px-6 rounded-2xl bg-gradient-to-r from-red-600 to-rose-500 text-white font-semibold shadow-lg hover:shadow-xl transition-all text-sm sm:text-base"
                    >
                        <Youtube className="w-5 h-5 mr-2" /> YouTube
                    </Button>
                </a>
            </div>
        </section>
    );
}
