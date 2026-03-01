"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    House,
    UserRound,
    LifeBuoy,
    CreditCard,
    CandlestickChart,
    Radio,
    ListChecks,
    Bell,
    CalendarDays,
    Bot,
    ChevronLeft,
    ChevronRight,
    LogOut,
    type LucideIcon,
} from "lucide-react";
import React from "react";
import { BrandLogo } from "./brand-logo";
import { useLogoutMutation } from "@/hooks/use-auth";

type SidebarNavItem = {
    name: string;
    path: string;
    icon: LucideIcon;
};

const navigation: SidebarNavItem[] = [
    { name: "Dashboard", path: "/dashboard", icon: House },
    { name: "Profile", path: "/dashboard/profile", icon: UserRound },
    { name: "Watchlist", path: "/dashboard/watchlist", icon: ListChecks },
    { name: "Signal", path: "/dashboard/signals", icon: Radio },
    { name: "Chart", path: "/dashboard/market", icon: CandlestickChart },
    { name: "Plans & Billing", path: "/dashboard/plans", icon: CreditCard },
    { name: "Notifications", path: "/dashboard/notifications", icon: Bell },
    { name: "Calendar", path: "/dashboard/economic-calendar", icon: CalendarDays },
    { name: "Bot Status", path: "/dashboard/bot-status", icon: Bot },
    { name: "Support", path: "/dashboard/support", icon: LifeBuoy },
];

const SidebarItem = ({ item, collapsed }: { item: SidebarNavItem; collapsed: boolean }) => {
    const pathname = usePathname();
    const isActive =
        item.path === "/dashboard"
            ? pathname === "/dashboard"
            : pathname === item.path || pathname.startsWith(`${item.path}/`);
    const Icon = item.icon;

    return (
        <Link
            href={item.path}
            title={collapsed ? item.name : undefined}
            className={cn(
                "group relative flex items-center rounded-xl transition-all duration-300",
                collapsed ? "justify-center px-2 py-2.5" : "px-3 py-2.5",
                isActive
                    ? "bg-primary/15 text-primary shadow-[0_0_0_1px_hsl(var(--primary)/0.35),0_12px_24px_-16px_hsl(var(--primary)/0.9)]"
                    : "text-muted-foreground hover:text-foreground hover:bg-foreground/[0.05]"
            )}
        >
            {!collapsed && (
                <div className="absolute left-0 top-1/2 h-7 w-1 -translate-y-1/2 rounded-r-full bg-primary/80" />
            )}

            <Icon
                size={18}
                className={cn(
                    "shrink-0 transition-transform duration-300",
                    isActive ? "drop-shadow-[0_0_10px_hsl(var(--primary)/0.8)]" : "group-hover:scale-105"
                )}
            />

            {!collapsed && (
                <span className="ml-3 text-xs sm:text-sm font-semibold tracking-tight">
                    {item.name}
                </span>
            )}
        </Link>
    );
};

export function Sidebar({ className, collapsed, setCollapsed }: { className?: string; collapsed: boolean; setCollapsed: (val: boolean) => void }) {
    const router = useRouter();
    const logoutMutation = useLogoutMutation();

    const handleLogout = async () => {
        try {
            await logoutMutation.mutateAsync();
        } finally {
            router.replace("/login");
        }
    };

    return (
        <aside
            className={cn(
                "relative h-full bg-card/95 backdrop-blur-xl transition-all duration-300 ease-custom-bezier",
                "",
                collapsed ? "w-[4.25rem]" : "w-[16.25rem] sm:w-72",
                className
            )}
        >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,hsl(var(--primary)/0.24),transparent_40%),radial-gradient(circle_at_100%_100%,hsl(var(--accent)/0.18),transparent_44%)]" />
            <div className="pointer-events-none absolute inset-0 bg-cyber-grid opacity-25" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/80 to-transparent" />

            <div className="relative z-10 flex h-full flex-col">
                <div className={cn("flex h-14 sm:h-16 items-center", collapsed ? "justify-center px-1.5" : "justify-between px-3 sm:px-4")}>
                    {!collapsed && (
                        <BrandLogo
                            className="gap-2"
                            imageClassName="h-8 w-8 sm:h-9 sm:w-9 rounded-lg"
                            showText
                            titleClassName="text-sm sm:text-base"
                            subtitleClassName="text-[10px] sm:text-xs"
                        />
                    )}

                    <button
                        type="button"
                        onClick={() => setCollapsed(!collapsed)}
                        className={cn(
                            "flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg bg-background/40 text-muted-foreground transition-all duration-300 hover:text-primary hover:shadow-[0_10px_24px_-14px_hsl(var(--primary)/0.9)]",
                            collapsed ? "mx-auto" : ""
                        )}
                        title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                    >
                        {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
                    </button>
                </div>

                {!collapsed && (
                    <div className="px-3 sm:px-4 pt-3 pb-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/80">
                        Navigation
                    </div>
                )}

                <nav className={cn("flex-1 space-y-1.5 overflow-y-auto", collapsed ? "px-1.5 py-3" : "px-2.5 sm:px-3 py-2.5")}>
                    {navigation.map((item) => (
                        <SidebarItem key={item.name} item={item} collapsed={collapsed} />
                    ))}
                </nav>

                <div className={cn(collapsed ? "p-1.5" : "p-2.5 sm:p-3")}>
                    <button
                        onClick={handleLogout}
                        className={cn(
                            "w-full rounded-xl border border-destructive/35 bg-destructive/10 text-destructive transition-all duration-300 hover:bg-destructive/20 hover:shadow-[0_10px_30px_-18px_hsl(var(--destructive)/0.9)]",
                            collapsed ? "flex h-10 items-center justify-center" : "flex h-10 items-center justify-center gap-2 text-xs sm:text-sm font-semibold"
                        )}
                        title="Logout"
                        disabled={logoutMutation.isPending}
                    >
                        <LogOut size={18} />
                        {!collapsed && <span>Logout</span>}
                    </button>
                </div>
            </div>

        </aside>
    );
}
