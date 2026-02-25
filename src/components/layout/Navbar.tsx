"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { Home, TrendingUp, BadgeDollarSign, Info, Menu, X, Mail } from "lucide-react"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { BrandLogo } from "@/components/layout/brand-logo"

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [mobileOpen, setMobileOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const pathname = usePathname()

    return (
        <div className={cn(
            "fixed inset-x-0 top-0 z-50 flex justify-center w-full transition-all duration-500"
        )}>
            <header className={cn(
                "w-full border-b border-border/80 bg-background/78 backdrop-blur-2xl transition-all duration-500"
            )}>
                <div className="flex h-16 items-center justify-between px-4 sm:px-6">

                    {/* Logo */}
                    <div className="flex items-center gap-2">
                        <Link href="/" className="flex items-center gap-3 group">
                            <BrandLogo
                                imageClassName="transition-transform duration-300 group-hover:scale-105"
                                titleClassName="text-base sm:text-lg"
                            />
                        </Link>
                    </div>

                    {/* Desktop Nav (clean inline) */}
                    <nav className="hidden md:flex items-center justify-center gap-1">
                        {[
                            { label: 'Home', href: '/', icon: Home },
                            { label: 'Market', href: '/market', icon: TrendingUp },
                            { label: 'Plans', href: '/plans', icon: BadgeDollarSign },
                            { label: 'About', href: '/about', icon: Info },
                            { label: 'Contact', href: '/contact', icon: Mail },
                        ].map((item) => {
                            const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
                            const Icon = item.icon;

                            return (
                                <Link
                                    key={item.label}
                                    href={item.href}
                                    className={cn(
                                        "px-3 py-2 text-sm transition-all duration-300 rounded-lg inline-flex items-center gap-2",
                                        isActive
                                            ? "bg-primary/10 text-foreground font-semibold"
                                            : "font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50"
                                    )}
                                >
                                    <Icon className="h-4 w-4" />
                                    {item.label}
                                </Link>
                            )
                        })}
                    </nav>

                    {/* Right actions */}
                    <div className="flex items-center gap-2">
                        <ModeToggle />

                        <Link href="/login" className="hidden sm:block">
                            <Button variant="ghost" size="sm" className="rounded-full font-semibold hover:bg-muted text-foreground/80">
                                Log In
                            </Button>
                        </Link>

                        <Link href="/trial" className="hidden sm:block">
                            <Button size="sm" className="relative overflow-hidden rounded-full bg-primary text-primary-foreground font-bold hover:bg-primary/90 px-6 shadow-lg shadow-primary/25 group/btn">
                                <span className="relative z-10">Get Started</span>
                                <div className="absolute inset-0 -translate-x-[100%] group-hover/btn:animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                            </Button>
                        </Link>

                        <Button
                            variant="outline"
                            size="icon"
                            className="md:hidden rounded-full"
                            onClick={() => setMobileOpen((v) => !v)}
                            aria-label="Toggle navigation"
                        >
                            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                        </Button>
                    </div>
                </div>

                {/* Mobile drawer */}
                <div
                    className={cn(
                        "md:hidden origin-top transition-all duration-300 overflow-hidden border-t border-border/40 bg-background/90 backdrop-blur-xl px-4",
                        mobileOpen ? "max-h-64 py-4" : "max-h-0 py-0"
                    )}
                >
                    <div className="flex flex-col gap-2">
                        {[
                            { label: 'Home', href: '/', icon: Home },
                            { label: 'Market', href: '/market', icon: TrendingUp },
                            { label: 'Plans', href: '/plans', icon: BadgeDollarSign },
                            { label: 'About', href: '/about', icon: Info },
                            { label: 'Contact', href: '/contact', icon: Mail },
                        ].map((item) => {
                            const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.label}
                                    href={item.href}
                                    className={cn(
                                        "flex items-center gap-3 px-3 py-2 rounded-xl text-sm",
                                        isActive
                                            ? "bg-primary/10 text-foreground font-semibold border border-primary/20"
                                            : "text-muted-foreground hover:text-foreground hover:bg-border/30"
                                    )}
                                    onClick={() => setMobileOpen(false)}
                                >
                                    <Icon className="h-4 w-4" />
                                    {item.label}
                                </Link>
                            )
                        })}

                        <div className="flex gap-2 pt-1">
                            <Link href="/login" className="w-1/2" onClick={() => setMobileOpen(false)}>
                                <Button variant="ghost" className="w-full rounded-xl">Log In</Button>
                            </Link>

                            <Link href="/trial" className="w-1/2" onClick={() => setMobileOpen(false)}>
                                <Button className="w-full rounded-xl bg-primary text-primary-foreground hover:bg-primary/90">Get Started</Button>
                            </Link>
                        </div>
                    </div>
                </div>

            </header>
        </div>
    )
}
