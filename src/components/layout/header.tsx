"use client";
import React, { useState, useRef, useEffect } from "react";
import { Search, Bell, LogOut, Menu, Sun, Moon, X } from "lucide-react";
import { useTheme } from "next-themes";
import TickerMarquee from "./ticker-marquee";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { BrandLogo } from "./brand-logo";

interface HeaderProps {
    onMenuClick?: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
    const { theme, setTheme } = useTheme();
    const router = useRouter();
    const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [unreadCount, setUnreadCount] = useState(3); // Mock unread count
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleLogout = () => {
        router.push("/login");
    };

    if (!mounted) {
        return <div className="h-8 bg-card border-b border-border"></div>; // Prevents hydration mismatch
    }

    return (
        <div className="h-8 bg-card border-b border-border flex items-center justify-between px-2 sticky top-0 z-50">
            {/* Left: Branding & Search */}
            <div className="flex items-center gap-2 shrink-0">
                <button
                    onClick={onMenuClick}
                    className="md:hidden text-muted-foreground hover:text-foreground p-1"
                >
                    <Menu size={16} />
                </button>
                <div>
                    <BrandLogo
                        className="gap-2"
                        imageClassName="h-5 w-5 rounded-md"
                        showText={false}
                    />
                </div>
            </div>

            {/* Quick Ticker Inline - Floating (Fills remaining space) */}
            <div className="flex-1 min-w-0 mx-2 md:mx-4 overflow-hidden mask-linear-fade relative h-full flex items-center">
                <TickerMarquee />
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-2 shrink-0">
                {/* Unified Search Bar */}
                <div
                    className={`relative group transition-all duration-300 ${isMobileSearchOpen ? "w-full absolute left-0 top-0 h-full bg-card z-50 px-2 flex items-center" : ""}`}
                >
                    <Search
                        onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
                        className={`md:absolute md:left-2.5 md:top-1/2 md:-translate-y-1/2 text-muted-foreground cursor-pointer md:cursor-text ${isMobileSearchOpen ? "mr-2" : ""}`}
                        size={14}
                    />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search..."
                        className={`${isMobileSearchOpen ? "block w-full" : "hidden md:block"} bg-secondary/30 border border-white/5 h-6 pl-2 md:pl-8 pr-3 w-full md:w-32 lg:w-48 text-[11px] font-medium rounded-lg focus:border-primary/50 focus:bg-secondary/50 focus:outline-none focus:ring-0 transition-all placeholder:text-muted-foreground/50`}
                    />
                    {isMobileSearchOpen && (
                        <X
                            size={14}
                            className="ml-2 text-muted-foreground cursor-pointer"
                            onClick={() => { setIsMobileSearchOpen(false); setSearchQuery(""); }}
                        />
                    )}
                </div>

                <div className="h-4 w-[1px] bg-white/10 mx-1 hidden sm:block"></div>

                <button
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    className="p-1.5 text-muted-foreground hover:text-primary hover:bg-white/5 rounded-lg transition-all"
                    title="Toggle Theme"
                >
                    {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
                </button>

                <div className="relative">
                    <button className="relative p-1.5 text-muted-foreground hover:text-primary hover:bg-white/5 rounded-lg transition-all">
                        <Bell size={14} />
                        {unreadCount > 0 && (
                            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-background animate-pulse"></span>
                        )}
                    </button>
                </div>

                <div className="flex items-center gap-2 pl-1 pr-3 py-1 border border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/10 cursor-pointer transition-all rounded-full">
                    <div className="w-4 h-4 rounded-full bg-gradient-to-tr from-primary to-blue-700 flex items-center justify-center text-black font-bold text-[10px] shadow-sm">
                        {'U'}
                    </div>
                    <div className="flex flex-col leading-none hidden md:block">
                        <span className="text-[10px] font-bold text-white/90 truncate max-w-[80px]">User</span>
                        <span className="text-[8px] text-muted-foreground uppercase tracking-wide">
                            Active
                        </span>
                    </div>
                </div>

                <button
                    onClick={handleLogout}
                    className="p-1 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                    title="Logout"
                >
                    <LogOut size={12} />
                </button>
            </div>
        </div>
    );
}
