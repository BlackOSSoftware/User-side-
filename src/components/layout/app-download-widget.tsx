"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { APP_STORE_URL, PLAY_STORE_URL } from "@/lib/external-links";
import { StoreBadge } from "@/components/layout/store-badge";

export default function AppDownloadWidget() {
    const [isAppModalOpen, setIsAppModalOpen] = useState(false);
    const [showAppHint, setShowAppHint] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsAppModalOpen(true), 45000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        let hideTimer: ReturnType<typeof setTimeout> | null = null;

        const showNow = () => {
            setShowAppHint(true);
            hideTimer = setTimeout(() => setShowAppHint(false), 2200);
        };

        showNow();
        const interval = setInterval(showNow, 6000);

        return () => {
            clearInterval(interval);
            if (hideTimer) clearTimeout(hideTimer);
        };
    }, []);

    return (
        <>
            {/* APP DOWNLOAD MODAL */}
            {isAppModalOpen ? (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center px-3 py-6 bg-black/60 backdrop-blur-sm"
                    onClick={() => setIsAppModalOpen(false)}
                >
                    <div
                        className="relative w-full max-w-[20rem] overflow-hidden rounded-2xl border border-border/70 bg-card shadow-2xl animate-in fade-in zoom-in-95 duration-300 sm:max-w-md md:max-w-3xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setIsAppModalOpen(false)}
                            className="absolute top-3 right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-black/70 text-white transition hover:bg-black/90 sm:top-4 sm:right-4 sm:h-9 sm:w-9"
                            aria-label="Close"
                        >
                            <X className="h-4 w-4" />
                        </button>

                        <div className="grid md:grid-cols-2 gap-4 sm:gap-6 p-4 sm:p-6 md:p-8">
                            <div className="space-y-4">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider">
                                    App Launch
                                </div>
                                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold leading-tight">
                                    Download the MSPK App
                                </h3>
                                <p className="text-xs sm:text-sm md:text-base text-muted-foreground">
                                    Get real-time signals, market alerts, and portfolio tracking on the go.
                                </p>

                                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                    <StoreBadge href={PLAY_STORE_URL} store="google-play" />
                                    <StoreBadge href={APP_STORE_URL} store="app-store" />
                                </div>
                            </div>

                            <div className="relative">
                                <div className="absolute -inset-3 bg-gradient-to-br from-primary/20 via-transparent to-blue-500/20 rounded-2xl blur-xl opacity-60" />
                                <Image
                                    src="/img1.webp"
                                    alt="App preview"
                                    width={640}
                                    height={420}
                                    loading="lazy"
                                    className="relative w-full h-36 sm:h-44 md:h-auto object-cover rounded-2xl border border-white/10 shadow-xl"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}

            {/* FLOATING APP BUTTON */}
            <button
                onClick={() => setIsAppModalOpen(true)}
                className="fixed bottom-6 right-6 z-40 group"
                aria-label="Open app download"
            >
                {showAppHint ? (
                    <div className="absolute -top-10 right-0 px-1 py-1.5 rounded-full bg-black/80 text-white text-xs font-semibold shadow-lg animate-[pulse_2.5s_ease-in-out_infinite]">
                        Get App
                    </div>
                ) : null}
                <div className="relative h-14 w-14 rounded-full bg-gradient-to-br from-primary to-blue-500 shadow-[0_12px_35px_-10px_rgba(59,130,246,0.9)] flex items-center justify-center">
                    <span className="absolute inset-0 rounded-full bg-primary/40 animate-ping" />
                    <span className="relative text-white font-bold">App</span>
                </div>
            </button>
        </>
    );
}
