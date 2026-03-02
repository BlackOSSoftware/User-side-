"use client";

import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { useState } from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { AuthSessionGuard } from "@/components/auth/auth-session-guard";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [collapsed, setCollapsed] = useState(false);

    return (
        <div className="flex h-screen bg-white dark:bg-background overflow-hidden font-sans">
            <AuthSessionGuard />
            {/* Desktop Sidebar - Fixed/Collapsible */}
            <div className="hidden md:block h-full z-40 transition-all duration-300">
                <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
            </div>

            <div className="flex-1 flex flex-col overflow-hidden relative w-full z-10">
                <Header onMenuClick={() => setIsMobileMenuOpen(true)} />

                <main className="flex-1 overflow-x-hidden overflow-y-auto p-2.5 sm:p-4 md:p-5 relative z-10 scroll-smooth">
                    {children}
                </main>
            </div>

            {/* Mobile Sidebar */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetContent side="left" className="w-[min(90vw,17rem)] p-0 border-r border-slate-900/[0.12] bg-white text-foreground dark:border-white/5 dark:bg-card">
                    <Sidebar collapsed={false} setCollapsed={() => { }} />
                </SheetContent>
            </Sheet>
        </div>
    );
}
