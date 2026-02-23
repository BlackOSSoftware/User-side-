"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    BarChart2,
    MessageSquare,
    Settings,
    ChevronRight,
    ChevronLeft,
    Activity,
    Cpu,
    Megaphone,
    PieChart
} from "lucide-react";
import React, { useState } from "react";
import { BrandLogo } from "./brand-logo";

const SidebarItem = ({ icon: Icon, label, href, collapsed }: { icon: any, label: string, href: string, collapsed: boolean }) => {
    const pathname = usePathname();
    const isActive = pathname === href || pathname.startsWith(`${href}/`);

    return (
        <Link
            href={href}
            className={cn(
                "flex items-center gap-3 px-4 py-2.5 w-full border-b border-white/5 transition-all duration-300 group relative",
                isActive
                    ? "bg-primary/10 text-primary border-r-2 border-r-primary"
                    : "text-muted-foreground hover:text-white hover:bg-white/5"
            )}
        >
            <Icon
                size={16}
                className={cn(
                    "shrink-0 transition-all duration-300 z-10",
                    isActive ? "text-primary drop-shadow-[0_0_5px_rgba(245,158,11,0.5)]" : "group-hover:text-white"
                )}
            />

            <span className={cn(
                "text-[11px] font-semibold tracking-tight transition-all duration-300 z-10 whitespace-nowrap",
                collapsed ? "w-0 opacity-0 hidden" : "w-auto opacity-100 block"
            )}>
                {label}
            </span>

            {/* Subtle Glow on Hover */}
            {!isActive && (
                <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            )}
        </Link>
    );
};


export function Sidebar({ className, collapsed, setCollapsed }: { className?: string, collapsed: boolean, setCollapsed: (val: boolean) => void }) {
    const pathname = usePathname();

    const navigation = [
        { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
        { name: 'Strategies', path: '/dashboard/strategies', icon: Cpu },
        { name: 'Alerts', path: '/dashboard/alerts', icon: Megaphone },
        { name: 'Reports', path: '/dashboard/reports', icon: PieChart },
        { name: 'Market', path: '/dashboard/market', icon: BarChart2 },
        { name: 'Support', path: '/dashboard/support', icon: MessageSquare },
        { name: 'Settings', path: '/dashboard/settings', icon: Settings },
    ];

    return (
        <div
            className={cn(
                "flex flex-col bg-card border-r border-border transition-all duration-300 ease-custom-bezier shadow-2xl md:shadow-none h-full relative",
                collapsed ? "w-14" : "w-60",
                className
            )}
        >
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-primary/2 via-transparent to-transparent pointer-events-none opacity-20" />

            {/* Header / Brand */}
            <div className={cn("h-8 flex items-center border-b border-border px-4 shrink-0 relative z-10", collapsed ? "justify-center px-0" : "justify-between")}>
                <div className="flex items-center gap-2 overflow-hidden">
                    <BrandLogo
                        className={cn("gap-2", collapsed ? "justify-center" : "")}
                        imageClassName={cn("h-5 w-5 rounded-md", collapsed ? "h-6 w-6" : "h-5 w-5")}
                        showText={!collapsed}
                        titleClassName="text-[10px]"
                        subtitleClassName="text-[8px]"
                    />
                </div>
                <div className={cn("transition-all duration-300", collapsed ? "hidden" : "block")}>
                    <span className="text-[8px] font-bold text-muted-foreground tracking-wider border border-white/10 bg-white/5 px-1 rounded-sm">USER_v1.0</span>
                </div>
            </div>

            {/* Section Divider */}
            {!collapsed && <div className="px-4 py-2 text-[8px] font-bold text-muted-foreground uppercase tracking-widest relative z-10 border-b border-white/5 opacity-50">Main Menu</div>}

            {/* Navigation Items */}
            <div className="flex-1 overflow-y-auto w-full relative z-10">
                {navigation.map((item) => (
                    <SidebarItem
                        key={item.name}
                        icon={item.icon}
                        label={item.name}
                        href={item.path}
                        collapsed={collapsed}
                    />
                ))}
            </div>

            {/* Collapse Toggle */}
            <button
                onClick={() => setCollapsed(!collapsed)}
                className="absolute -right-2 top-10 w-4 h-4 bg-card border border-primary/50 rounded-full flex items-center justify-center text-primary shadow-lg hover:scale-110 transition-transform z-50 md:flex hidden"
            >
                {collapsed ? <ChevronRight size={10} /> : <ChevronLeft size={10} />}
            </button>

            {/* Footer / System Status */}
            <div className="border-t border-white/5 bg-black/20 backdrop-blur-sm">
                {(!collapsed) ? (
                    <div className="px-4 py-3 space-y-3">
                        <div className="space-y-2">
                            {/* CPU Load Mock */}
                            <div className="space-y-1">
                                <div className="flex items-center justify-between text-[9px] text-muted-foreground">
                                    <div className="flex items-center gap-2">
                                        <Cpu size={10} />
                                        <span>System Status</span>
                                    </div>
                                    <span className="text-xs font-mono text-emerald-500">OPTIMAL</span>
                                </div>
                                <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-primary to-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.3)] w-[98%]"
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center gap-2 py-3">
                        <Activity size={14} className="text-primary hover:animate-spin cursor-pointer" />
                        <div className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse"></div>
                    </div>
                )}
            </div>
        </div>
    );
}
