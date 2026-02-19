"use client";

import React, { useState, useEffect } from 'react';
import {
    Settings as SettingsIcon, Shield, Headphones, CreditCard, Bell,
    Save, Palette, Type, LayoutTemplate, User, Lock, Smartphone,
    Mail, Globe, CheckCircle, AlertCircle, Trash2, Camera, Key
} from 'lucide-react';
import { clsx } from 'clsx';
import { useTheme } from 'next-themes';

// --- Mock Data ---
const INITIAL_SETTINGS = {
    name: 'Aqib Khan',
    email: 'aqib@example.com',
    phone: '+91 9876543210',
    language: 'English',
    timezone: '(GMT+05:30) Mumbai, Kolkata',
    enable_email_alerts: true,
    enable_whatsapp_alerts: false,
    enable_browser_notifications: true,
    two_factor_auth: false,
};

// Available Fonts (Matching Admin)
const FONTS = [
    { name: 'Outfit', label: 'Default (Outfit)', class: 'font-outfit' },
    { name: 'Inter', label: 'Inter', class: 'font-inter' },
    { name: 'Roboto', label: 'Roboto', class: 'font-roboto' },
    { name: 'Poppins', label: 'Poppins', class: 'font-poppins' },
    { name: 'Montserrat', label: 'Montserrat', class: 'font-montserrat' },
    { name: 'Lato', label: 'Lato', class: 'font-lato' },
    { name: 'Playfair Display', label: 'Playfair (Serif)', class: 'font-playfair' },
    { name: 'Space Grotesk', label: 'Space (Tech)', class: 'font-space' },
    { name: 'Fira Code', label: 'Fira Code (Mono)', class: 'font-fira' },
    { name: 'Oswald', label: 'Oswald (Bold)', class: 'font-oswald' },
    { name: 'Ubuntu', label: 'Ubuntu (Humanist)', class: 'font-ubuntu' },
];

// Available Themes (Light/Dark only)
const THEMES = [
    { id: 'dark', name: 'Dark', colors: ['#0f172a', '#eab308'] },
    { id: 'light', name: 'Light', colors: ['#f8fafc', '#0f172a'] },
];

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState('profile');
    const [settings, setSettings] = useState(INITIAL_SETTINGS);
    const [currentFont, setCurrentFont] = useState('Outfit');
    const [isLoading, setIsLoading] = useState(false);
    const { theme, setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        // Load font preference
        const savedFont = localStorage.getItem('theme-font');
        if (savedFont) {
            setCurrentFont(savedFont);
            document.documentElement.style.setProperty('--font-primary', savedFont);
        }
    }, []);

    const handleSettingChange = (key: string, value: any) => {
        setSettings(prev => ({ ...prev, [key]: value }));
    };

    const handleFontChange = (fontName: string) => {
        setCurrentFont(fontName);
        localStorage.setItem('theme-font', fontName);
        window.dispatchEvent(new Event('theme-changed'));
    };

    const handleThemeChange = (themeId: string) => {
        setTheme(themeId);
    };

    const activeTheme = mounted ? (resolvedTheme ?? theme ?? 'dark') : 'dark';

    const saveSettings = (keys: string[]) => {
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            console.log("Settings saved:", keys.reduce((acc, k) => ({ ...acc, [k]: (settings as any)[k] }), {}));
        }, 800);
    };

    return (
        <div className="h-[calc(100vh-3rem)] flex flex-col gap-4">
            {/* Tab Navigation (Matching Admin Panel) */}
            <div className="flex flex-col gap-4 shrink-0">
                <div className="flex items-center gap-1 border-b border-border overflow-x-auto no-scrollbar scroll-smooth">
                    {[
                        { id: 'profile', label: 'Profile', icon: User },
                        { id: 'plans', label: 'Plans & Billing', icon: CreditCard },
                        { id: 'appearance', label: 'Appearance', icon: Palette },
                        { id: 'security', label: 'Security', icon: Shield },
                        { id: 'notifications', label: 'Notifications', icon: Bell },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={clsx(
                                "px-6 py-3 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 transition-all border-b-2 whitespace-nowrap",
                                activeTab === tab.id
                                    ? "border-primary text-primary bg-primary/5"
                                    : "border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/30"
                            )}
                        >
                            <tab.icon size={14} /> {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar">
                <div className="max-w-4xl mx-auto space-y-6 pb-10">

                    {/* --- Profile Section --- */}
                    {activeTab === 'profile' && (
                        <div className="bg-card border border-border rounded-xl overflow-hidden shadow-2xl flex flex-col">
                            <div className="p-4 border-b border-border bg-muted/20 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <User size={16} className="text-primary" />
                                    <h3 className="text-sm font-bold uppercase tracking-widest text-foreground">Personal Information</h3>
                                </div>
                                <span className="text-[9px] font-mono text-muted-foreground uppercase">PRT-772183</span>
                            </div>
                            <div className="p-8 space-y-8">
                                <div className="flex items-center gap-8">
                                    <div className="relative group">
                                        <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 border-2 border-dashed border-white/10 flex items-center justify-center text-3xl font-bold text-foreground overflow-hidden">
                                            {settings.name.split(' ').map(n => n[0]).join('')}
                                        </div>
                                        <button className="absolute -bottom-2 -right-2 bg-primary text-primary-foreground p-2 rounded-lg shadow-lg hover:scale-110 transition-all">
                                            <Camera size={14} />
                                        </button>
                                    </div>
                                    <div className="space-y-1">
                                        <h4 className="text-xl font-bold text-foreground">{settings.name}</h4>
                                        <p className="text-xs text-muted-foreground font-mono uppercase tracking-tight">Active Plan: <span className="text-emerald-500 font-bold">Platinum Pro</span></p>
                                        <div className="flex gap-2 pt-2">
                                            <span className="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-500 text-[9px] font-bold uppercase tracking-widest border border-blue-500/20">Verified Account</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Full Name</label>
                                        <input
                                            type="text"
                                            value={settings.name}
                                            onChange={(e) => handleSettingChange('name', e.target.value)}
                                            className="w-full bg-secondary/20 border border-border rounded-lg px-4 py-3 text-xs font-mono text-foreground focus:border-primary/50 focus:outline-none transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Email Address</label>
                                        <div className="relative">
                                            <Mail className="absolute left-4 top-3 text-muted-foreground" size={14} />
                                            <input
                                                type="email"
                                                disabled
                                                value={settings.email}
                                                className="w-full bg-secondary/10 border border-border rounded-lg px-10 py-3 text-xs font-mono text-muted-foreground cursor-not-allowed opacity-70"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Mobile Number</label>
                                        <div className="relative">
                                            < स्मार्टफोन className="absolute left-4 top-3 text-muted-foreground" size={14} />
                                            <input
                                                type="text"
                                                value={settings.phone}
                                                onChange={(e) => handleSettingChange('phone', e.target.value)}
                                                className="w-full bg-secondary/20 border border-border rounded-lg px-10 py-3 text-xs font-mono text-foreground focus:border-primary/50 focus:outline-none transition-all"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Display Language</label>
                                        <select
                                            value={settings.language}
                                            onChange={(e) => handleSettingChange('language', e.target.value)}
                                            className="w-full bg-secondary/20 border border-border rounded-lg px-4 py-3 text-xs font-mono text-foreground focus:border-primary/50 focus:outline-none appearance-none cursor-pointer"
                                        >
                                            <option value="English">English (US)</option>
                                            <option value="Hindi">Hindi (In)</option>
                                            <option value="Spanish">Spanish (Es)</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-white/5 flex justify-end">
                                    <button
                                        onClick={() => saveSettings(['name', 'phone', 'language'])}
                                        className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2.5 rounded-lg text-[11px] font-bold uppercase tracking-widest hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 disabled:opacity-50"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? "Saving..." : <><Save size={14} /> Update Profile</>}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* --- Plans & Billing Section --- */}
                    {activeTab === 'plans' && (
                        <div className="space-y-6">
                            {/* Current Plan Card */}
                            <div className="bg-card border border-border rounded-xl overflow-hidden shadow-2xl flex flex-col">
                                <div className="p-4 border-b border-border bg-muted/20 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <CreditCard size={16} className="text-primary" />
                                        <h3 className="text-sm font-bold uppercase tracking-widest text-foreground">Active Subscription</h3>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                                        <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Active</span>
                                    </div>
                                </div>
                                <div className="p-8">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                                        <div className="space-y-4">
                                            <div>
                                                <h4 className="text-2xl font-black text-foreground uppercase tracking-tight">Premium Terminal</h4>
                                                <p className="text-[10px] text-muted-foreground font-mono uppercase mt-1">Subscription ID: <span className="text-foreground">SUB-X8829-2024</span></p>
                                            </div>

                                            {/* Feature List for Current Plan */}
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-8 pt-2">
                                                {[
                                                    'Unlimited Trading Signals',
                                                    'High-Priority Execution',
                                                    '24/7 Dedicated Support',
                                                    'Advanced Strategy Analytics',
                                                    'Multi-Exchange Integration',
                                                    'Private Discord Access'
                                                ].map(feature => (
                                                    <div key={feature} className="flex items-center gap-2 text-[10px] font-mono text-muted-foreground uppercase">
                                                        <CheckCircle size={10} className="text-emerald-500" />
                                                        {feature}
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="grid grid-cols-2 gap-8 pt-4">
                                                <div>
                                                    <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-[0.2em]">Renewal Date</p>
                                                    <p className="text-sm font-bold text-foreground mt-1">Feb 11, 2024</p>
                                                </div>
                                                <div>
                                                    <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-[0.2em]">Monthly Cost</p>
                                                    <p className="text-sm font-bold text-primary mt-1">₹25,000.00</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-3 shrink-0">
                                            <button className="bg-primary text-primary-foreground px-8 py-3 rounded-xl text-[11px] font-bold uppercase tracking-[0.2em] shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all">
                                                Renew Subscription
                                            </button>
                                            <button className="bg-secondary/40 text-foreground border border-border px-8 py-3 rounded-xl text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-secondary/60 transition-all">
                                                Download Invoice
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Upgrade Options Header */}
                            <div className="flex items-center gap-4 pt-4">
                                <div className="h-px flex-1 bg-white/5"></div>
                                <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.3em]">Protocol Selection</h4>
                                <div className="h-px flex-1 bg-white/5"></div>
                            </div>

                            {/* Upgrade Options */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                                {[
                                    {
                                        name: 'Free Trial Protocol',
                                        price: '₹0 / 1 Day',
                                        features: ['3 Signals / Day', 'Community Support', 'Basic Market Data', 'Manual Execution Only', 'Single Exchange Access'],
                                        color: 'slate',
                                        isCurrent: false,
                                        label: 'EVALUATION'
                                    },
                                    {
                                        name: 'Premium Terminal',
                                        price: '₹25,000 / 30 Days',
                                        features: ['Unlimited Signals', 'Phone Support 24/7', 'Institutional Analytics', 'Full Auto Execution', 'Unlimited Exchanges'],
                                        color: 'blue',
                                        isCurrent: true,
                                        label: 'RECOMMENDED'
                                    },
                                ].map((plan) => (
                                    <div key={plan.name} className={clsx(
                                        "bg-card border rounded-xl p-6 space-y-6 group transition-all cursor-pointer relative overflow-hidden flex flex-col",
                                        plan.isCurrent ? "border-primary/50 shadow-lg shadow-primary/5" : "border-border hover:border-primary/30"
                                    )}>
                                        <div className="relative z-10 space-y-4 flex-1">
                                            <div className="flex justify-between items-start">
                                                <div className="space-y-1">
                                                    <h5 className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">{plan.name}</h5>
                                                    <p className="text-xl font-black text-foreground tracking-tight">{plan.price}</p>
                                                </div>
                                                <span className={clsx(
                                                    "px-2 py-0.5 rounded text-[8px] font-bold tracking-widest uppercase",
                                                    plan.isCurrent ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
                                                )}>{plan.label}</span>
                                            </div>
                                            <div className="h-px bg-white/5"></div>
                                            <ul className="space-y-3">
                                                {plan.features.map(f => (
                                                    <li key={f} className="flex items-start gap-2 text-[9px] text-muted-foreground font-mono uppercase leading-tight">
                                                        <CheckCircle size={10} className="text-primary shrink-0 mt-0.5" />
                                                        {f}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="relative z-10 pt-6 mt-auto">
                                            <button className={clsx(
                                                "w-full py-2.5 rounded-lg text-[9px] font-bold uppercase tracking-widest transition-all",
                                                plan.isCurrent
                                                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/10"
                                                    : "bg-secondary/30 text-foreground border border-white/5 group-hover:bg-primary group-hover:text-primary-foreground"
                                            )}>
                                                {plan.isCurrent ? 'Extend Protocol' : 'Select Protocol'}
                                            </button>
                                        </div>
                                        <div className={`absolute -bottom-10 -right-10 w-32 h-32 rounded-full z-0 opacity-5 blur-2xl bg-${plan.color}-500 transition-all group-hover:opacity-20`}></div>
                                    </div>
                                ))}
                            </div>

                            {/* Help Alert */}
                            <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 flex gap-4 items-start">
                                <AlertCircle className="text-primary shrink-0" size={20} />
                                <div className="space-y-1">
                                    <h5 className="text-xs font-bold text-foreground uppercase tracking-wider">Enterprise Customization</h5>
                                    <p className="text-[10px] text-muted-foreground leading-relaxed font-mono uppercase">Need a custom signal frequency or multiple terminal seats? Contact our institutional desk for a tailored protocol implementation.</p>
                                    <button className="text-primary text-[10px] font-bold uppercase tracking-widest mt-2 hover:underline font-mono">Open Support Ticket →</button>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'appearance' && (
                        <div className="bg-card border border-border rounded-xl overflow-hidden shadow-2xl flex flex-col">
                            <div className="p-4 border-b border-border bg-muted/20 flex items-center gap-2">
                                <Palette size={16} className="text-primary" />
                                <h3 className="text-sm font-bold uppercase tracking-widest text-foreground">Visual Preferences</h3>
                            </div>
                            <div className="p-8 space-y-10">
                                <div className="space-y-6">
                                    <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-[0.2em] flex items-center gap-2">
                                        <LayoutTemplate size={14} /> Color Architecture
                                    </label>
                                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                                        {THEMES.map((theme) => (
                                            <button
                                                key={theme.id}
                                                onClick={() => handleThemeChange(theme.id)}
                                                className={clsx(
                                                    "p-3 rounded-xl border text-left transition-all hover:scale-[1.05] relative overflow-hidden group h-28 flex flex-col justify-end",
                                                    activeTheme === theme.id
                                                        ? "border-primary ring-2 ring-primary/20 shadow-xl"
                                                        : "border-border hover:border-primary/30"
                                                )}
                                            >
                                                <div className="absolute inset-0 z-0 h-full w-full" style={{ backgroundColor: theme.colors[0] }}></div>
                                                <div className="absolute top-2 right-2 w-4 h-4 rounded-full border border-white/20 shadow-lg z-10" style={{ backgroundColor: theme.colors[1] }}></div>
                                                <div className="relative z-10 bg-black/40 backdrop-blur-sm p-2 -mx-3 -mb-3">
                                                    <span className={clsx(
                                                        "text-[8px] font-bold uppercase tracking-widest leading-none",
                                                        theme.id === 'light' ? "text-slate-900" : "text-white"
                                                    )}>{theme.name}</span>
                                                    {activeTheme === theme.id && <div className="h-0.5 w-4 bg-primary mt-1 rounded-full"></div>}
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="h-px bg-white/5"></div>

                                <div className="space-y-6">
                                    <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-[0.2em] flex items-center gap-2">
                                        <Type size={14} /> Global Typography
                                    </label>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {FONTS.map((font) => (
                                            <button
                                                key={font.name}
                                                onClick={() => handleFontChange(font.name)}
                                                className={clsx(
                                                    "p-6 rounded-xl border text-left transition-all hover:bg-secondary/10",
                                                    font.class,
                                                    currentFont === font.name
                                                        ? "bg-primary/5 border-primary shadow-inner"
                                                        : "border-border hover:border-primary/20"
                                                )}
                                            >
                                                <div className="flex justify-between items-start mb-4">
                                                    <div className="text-2xl font-bold text-foreground">Aa</div>
                                                    {currentFont === font.name && <CheckCircle size={16} className="text-primary" />}
                                                </div>
                                                <div className="text-[11px] font-bold text-foreground uppercase tracking-widest">{font.label}</div>
                                                <p className="text-[10px] text-muted-foreground mt-1 leading-relaxed line-clamp-2">
                                                    The quick brown fox jumps over the lazy dog.
                                                </p>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* --- Security Section --- */}
                    {activeTab === 'security' && (
                        <div className="space-y-6">
                            <div className="bg-card border border-border rounded-xl overflow-hidden shadow-2xl">
                                <div className="p-4 border-b border-border bg-muted/20 flex items-center gap-2">
                                    <Lock size={16} className="text-primary" />
                                    <h3 className="text-sm font-bold uppercase tracking-widest text-foreground">Authentication Gateway</h3>
                                </div>
                                <div className="p-8 space-y-8">
                                    <div className="grid grid-cols-1 gap-6 max-w-lg">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Current Password</label>
                                            <input type="password" placeholder="••••••••••••" className="w-full bg-secondary/20 border border-border rounded-lg px-4 py-3 text-xs font-mono text-foreground focus:border-primary/50 focus:outline-none" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">New Password</label>
                                            <input type="password" placeholder="Minimum 8 characters" className="w-full bg-secondary/20 border border-border rounded-lg px-4 py-3 text-xs font-mono text-foreground focus:border-primary/50 focus:outline-none" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Confirm New Password</label>
                                            <input type="password" placeholder="••••••••••••" className="w-full bg-secondary/20 border border-border rounded-lg px-4 py-3 text-xs font-mono text-foreground focus:border-primary/50 focus:outline-none" />
                                        </div>
                                    </div>
                                    <div className="pt-6 border-t border-white/5 flex gap-4">
                                        <button className="bg-secondary/40 text-foreground px-6 py-2.5 rounded-lg text-[11px] font-bold uppercase tracking-widest hover:bg-secondary/60 transition-all">Reset Form</button>
                                        <button className="bg-primary text-primary-foreground px-6 py-2.5 rounded-lg text-[11px] font-bold uppercase tracking-widest shadow-lg shadow-primary/20">Change Password</button>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-card border border-border rounded-xl overflow-hidden shadow-2xl p-8 flex items-center justify-between group hover:border-primary/30 transition-all cursor-pointer">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 border border-blue-500/20">
                                        <Shield size={24} />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-foreground uppercase tracking-wider">Two-Factor Authentication (2FA)</h4>
                                        <p className="text-[10px] text-muted-foreground font-mono uppercase">Status: <span className="text-red-500 font-bold">Inactive</span> — Secure your terminal with 2FA.</p>
                                    </div>
                                </div>
                                <button className="bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 px-4 py-2 rounded-lg text-[9px] font-bold uppercase tracking-widest hover:bg-emerald-500 hover:text-white transition-all">Enable Now</button>
                            </div>
                        </div>
                    )}

                    {/* --- Notifications Section --- */}
                    {activeTab === 'notifications' && (
                        <div className="bg-card border border-border rounded-xl overflow-hidden shadow-2xl">
                            <div className="p-4 border-b border-border bg-muted/20 flex items-center gap-2">
                                <Bell size={16} className="text-primary" />
                                <h3 className="text-sm font-bold uppercase tracking-widest text-foreground">Control Center</h3>
                            </div>
                            <div className="p-8 space-y-4">
                                {[
                                    { id: 'enable_email_alerts', label: 'Email Broadcasts', desc: 'Protocol: Critical trade alerts & account activity logs.' },
                                    { id: 'enable_whatsapp_alerts', label: 'WhatsApp Direct', desc: 'Secure channel for instant profit/loss signals.' },
                                    { id: 'enable_browser_notifications', label: 'Dashboard Pings', desc: 'Real-time terminal popups for new trade opportunities.' },
                                ].map((pref) => (
                                    <div key={pref.id} className="flex items-center justify-between p-5 border border-border rounded-xl bg-muted/5 group hover:bg-primary/[0.02] transition-all">
                                        <div className="space-y-1">
                                            <h4 className="text-[11px] font-bold text-foreground uppercase tracking-widest">{pref.label}</h4>
                                            <p className="text-[10px] text-muted-foreground font-mono uppercase tracking-tight opacity-70 group-hover:opacity-100 transition-opacity">{pref.desc}</p>
                                        </div>
                                        <div
                                            onClick={() => handleSettingChange(pref.id, !(settings as any)[pref.id])}
                                            className={clsx(
                                                "w-12 h-6 rounded-full relative cursor-pointer border transition-all duration-300",
                                                (settings as any)[pref.id] ? 'bg-primary/20 border-primary shadow-glow-sm' : 'bg-secondary/40 border-border'
                                            )}
                                        >
                                            <div className={clsx(
                                                "absolute top-1 h-3.5 w-3.5 rounded-full shadow-lg transition-all duration-300 transform",
                                                (settings as any)[pref.id] ? 'translate-x-7 bg-primary' : 'translate-x-1 bg-muted-foreground'
                                            )}></div>
                                        </div>
                                    </div>
                                ))}
                                <div className="pt-6 border-t border-white/5 flex justify-end">
                                    <button
                                        onClick={() => saveSettings(['enable_email_alerts', 'enable_whatsapp_alerts', 'enable_browser_notifications'])}
                                        className="bg-primary text-primary-foreground px-8 py-3 rounded-xl text-[11px] font-bold uppercase tracking-[0.2em] shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
                                    >
                                        Initialize Protocol Update
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}

// Fixed missing icon component name in the map
// Fixed Smartphone icon usage
const स्मार्टफोन = Smartphone;
