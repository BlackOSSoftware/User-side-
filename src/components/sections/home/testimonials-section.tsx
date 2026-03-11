"use client";

import Link from "next/link";
import { Users } from "lucide-react";
import { useEffect, useRef } from "react";

export default function TestimonialsSection() {
    const sliderTrackRef = useRef<HTMLDivElement | null>(null);
    const testimonials = [
        {
            quote: "Clear signals and disciplined entries. The risk notes have actually improved my strike selection.",
            name: "Rahul S.",
            role: "Pro Trader - Mumbai",
            initials: "RS",
            gradient: "from-blue-400 to-blue-500",
            rating: 4.8,
        },
        {
            quote: "Latency is near-zero. Executing through their flow feels like a direct market line.",
            name: "Priya M.",
            role: "Algo Developer - Bangalore",
            initials: "PM",
            gradient: "from-blue-400 to-indigo-500",
            rating: 4.3,
        },
        {
            quote: "सिग्नल वेळेवर मिळतात आणि रिस्क नोट्स खूप स्पष्ट आहेत. माझा डिसिप्लिन खूप सुधारला.",
            name: "रोहन पाटील",
            role: "इंट्राडे ट्रेडर - पुणे",
            initials: "RP",
            gradient: "from-emerald-400 to-teal-500",
            rating: 3.5,
        },
        {
            quote: "ट्रेड रिपोर्टिंग एकदम स्वच्छ आहे. लाईव्हमध्ये जे दिसतं तेच प्रत्यक्षात होतं.",
            name: "स्नेहा देशमुख",
            role: "स्विंग ट्रेडर - नागपूर",
            initials: "SD",
            gradient: "from-amber-400 to-orange-500",
            rating: 5,
        },
    ];

    useEffect(() => {
        const track = sliderTrackRef.current;
        if (!track) return;

        let timeoutId: number;
        let transitionId: number;
        let index = 0;
        const total = testimonials.length;

        const getStep = () => {
            const first = track.children.item(0) as HTMLElement | null;
            const second = track.children.item(1) as HTMLElement | null;
            if (!first || !second) return 0;
            return second.offsetLeft - first.offsetLeft;
        };

        const resetInstant = () => {
            track.style.transition = "none";
            track.style.transform = "translateX(0px)";
            index = 0;
        };

        const run = () => {
            const step = getStep();
            if (!step) {
                timeoutId = window.setTimeout(run, 1000);
                return;
            }

            // Hold 2s
            timeoutId = window.setTimeout(() => {
                index += 1;
                track.style.transition = "transform 1s ease-out";
                track.style.transform = `translateX(-${step * index}px)`;

                // After move, loop back seamlessly
                transitionId = window.setTimeout(() => {
                    if (index >= total) {
                        resetInstant();
                    }
                    run();
                }, 1000);
            }, 2000);
        };

        resetInstant();
        run();

        return () => {
            window.clearTimeout(timeoutId);
            window.clearTimeout(transitionId);
        };
    }, []);

    return (
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
                    <p className="text-sm md:text-base text-muted-foreground text-left md:text-right">
                        Want to share your experience? Visit our{" "}
                        <Link href="/contact" className="font-semibold text-primary hover:underline underline-offset-4">
                            Contact page
                        </Link>{" "}
                        to submit a review.
                    </p>
                </div>
            </div>

            {/* Desktop/Tablet: responsive grid */}
            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8 text-left">
                {testimonials.map((t) => (
                    <div
                        key={t.name}
                        className="p-7 lg:p-8 rounded-3xl bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 hover:-translate-y-2 transition-transform duration-300 hover:border-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/5 group"
                    >
                        <div className="flex items-center gap-2 mb-6">
                            <div className="flex gap-1">
                                {[1, 2, 3, 4, 5].map((s) => (
                                    <div key={s} className={`w-5 h-5 ${t.rating >= s ? "text-blue-500" : "text-blue-500/30"} fill-current`}>
                                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                                    </div>
                                ))}
                            </div>
                            <span className="text-sm font-semibold text-slate-500">{t.rating.toFixed(1)}</span>
                        </div>
                        <p className="text-lg text-slate-600 dark:text-gray-300 italic mb-8 leading-relaxed">"{t.quote}"</p>
                        <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${t.gradient} flex items-center justify-center text-white font-bold text-lg`}>
                                {t.initials}
                            </div>
                            <div>
                                <div className="font-bold text-foreground">{t.name}</div>
                                <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">{t.role}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Mobile: infinite single-direction slider with hold */}
            <div className="md:hidden mt-6 overflow-hidden">
                <div className="w-full overflow-hidden">
                    <div ref={sliderTrackRef} className="flex gap-6 w-max will-change-transform">
                        {[...testimonials, ...testimonials].map((t, idx) => (
                            <div
                                key={`${t.name}-${idx}`}
                                className="w-[280px] shrink-0 p-6 rounded-3xl bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 shadow-lg"
                            >
                                <div className="flex items-center gap-2 mb-5">
                                    <div className="flex gap-1">
                                        {[1, 2, 3, 4, 5].map((s) => (
                                            <div key={s} className={`w-4.5 h-4.5 ${t.rating >= s ? "text-blue-500" : "text-blue-500/30"} fill-current`}>
                                                <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                                            </div>
                                        ))}
                                    </div>
                                    <span className="text-xs font-semibold text-slate-500">{t.rating.toFixed(1)}</span>
                                </div>
                                <p className="text-base text-slate-600 dark:text-gray-300 italic mb-6 leading-relaxed">"{t.quote}"</p>
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.gradient} flex items-center justify-center text-white font-bold text-sm`}>
                                        {t.initials}
                                    </div>
                                    <div>
                                        <div className="font-bold text-foreground text-sm">{t.name}</div>
                                        <div className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">{t.role}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
