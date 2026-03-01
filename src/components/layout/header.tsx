"use client";
import React from "react";
import { Bell, Menu, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useMeQuery } from "@/hooks/use-auth";
import Link from "next/link";
import { useNotificationsQuery } from "@/services/notifications/notification.hooks";

interface HeaderProps {
    onMenuClick?: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
    const { resolvedTheme, setTheme } = useTheme();
    const { data } = useNotificationsQuery();
    const notifications = Array.isArray(data) ? data : [];
    const unreadCount = notifications.filter((item) => !item.isRead).length;
    const isDark = resolvedTheme === "dark";
    const meQuery = useMeQuery();
    const name = meQuery.data?.name?.trim() || "Test User";
    const avatarPath = meQuery.data?.profile?.avatar;
    const avatarUrl = avatarPath
        ? avatarPath.startsWith("http://") || avatarPath.startsWith("https://")
            ? avatarPath
            : `http://localhost:4000/${avatarPath.replace(/^\/+/, "")}`
        : null;
    const initials = name
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase() ?? "")
        .join("") || "T";

    return (
        <header className="h-14 sm:h-16 bg-card/85 backdrop-blur-xl px-2.5 sm:px-4 md:px-6 sticky top-0 z-50 relative overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_left,hsl(var(--primary)/0.16),transparent_55%),radial-gradient(circle_at_right,hsl(var(--accent)/0.14),transparent_45%)]" />

            <div className="relative h-full flex items-center justify-between gap-2 sm:gap-4">
                <div className="flex items-center gap-3 shrink-0">
                    <button
                        onClick={onMenuClick}
                        className="md:hidden text-muted-foreground hover:text-foreground p-1.5 rounded-lg hover:bg-background/30 transition-colors"
                    >
                        <Menu size={18} />
                    </button>
                </div>

                <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                <button
                    onClick={() => setTheme(isDark ? "light" : "dark")}
                    className="p-1.5 sm:p-2 text-muted-foreground hover:text-primary hover:bg-background/40 rounded-lg transition-all"
                    title="Toggle Theme"
                >
                    <Sun size={16} className="hidden dark:block" />
                    <Moon size={16} className="block dark:hidden" />
                </button>

                <div className="relative">
                    <Link
                        href="/dashboard/notifications"
                        className="relative inline-flex p-1.5 sm:p-2 text-muted-foreground hover:text-primary hover:bg-background/40 rounded-lg transition-all"
                        aria-label="Open notifications"
                    >
                        <Bell size={16} />
                        {unreadCount > 0 && (
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full animate-pulse" />
                        )}
                    </Link>
                </div>

                    <div className="flex items-center gap-2 pl-1.5 sm:pl-2 pr-2 sm:pr-3 py-1 bg-background/35 rounded-full">
                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-primary-foreground font-semibold text-xs sm:text-sm overflow-hidden">
                            {avatarUrl ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img src={avatarUrl} alt={name} className="h-full w-full object-cover" />
                            ) : (
                                initials
                            )}
                        </div>
                        <div className="hidden sm:block leading-tight max-w-[112px]">
                            <p className="text-xs sm:text-sm font-semibold text-foreground truncate">{name}</p>
                            <p className="text-[10px] sm:text-xs text-muted-foreground">Welcome back</p>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
