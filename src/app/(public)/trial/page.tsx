'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Check, Loader2, Sparkles, Zap, Shield, ArrowRight } from 'lucide-react';
import api from '@/lib/api';
import Link from 'next/link';

export default function TrialPage() {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            city: formData.get('city'),
            phone: formData.get('phone')
        };

        try {
            await api.post('/leads', data); // Assuming the API endpoint exists and works
            // Simulate delay only if API is fast, for UX effect (optional, removed for production speed)
            await new Promise(resolve => setTimeout(resolve, 1000));
            setSuccess(true);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex flex-col min-h-screen bg-white dark:bg-black text-slate-900 dark:text-white selection:bg-primary/30 transition-colors duration-300 relative overflow-hidden">
            {/* Background Grid & Spotlights */}
            <div className="absolute inset-0 z-0 w-full h-full pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-[0.2]"></div>
                <div className="absolute top-0 left-0 right-0 h-[500px] w-full bg-gradient-to-b from-primary/5 via-transparent to-transparent blur-3xl opacity-40"></div>
                <div className="absolute right-0 bottom-0 h-[400px] w-[400px] bg-primary/5 opacity-30 blur-[100px]"></div>
            </div>

            <div className="w-full max-w-7xl mx-auto mt-10 px-6 py-12 md:py-24 relative z-10">
                <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-16 lg:gap-8">

                    {/* Left Content: Value Props */}
                    <div className="w-full lg:max-w-xl space-y-8 text-center lg:text-left animate-in fade-in slide-in-from-bottom-8 duration-700">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider">
                            <Sparkles className="w-3 h-3 fill-current animate-pulse" /> Free Access
                        </div>
                        <h1 className="text-5xl md:text-7xl font-heading font-bold tracking-tighter leading-[0.9] text-slate-900 dark:text-white">
                            Start your <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-br from-primary via-primary/80 to-primary/50 filter drop-shadow-sm">Trial</span>
                            <span className="text-primary">.</span>
                        </h1>
                        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
                            Experience the power of institutional-grade signals.
                            <span className="block mt-2 font-medium text-slate-900 dark:text-white">No credit card required. Instant activation.</span>
                        </p>

                        <div className="grid gap-6 pt-4">
                            {[
                                { icon: Zap, title: "Real-time Signals", desc: "Receive alerts instantly via Telegram & Web." },
                                { icon: Shield, title: "Verified Performance", desc: "Access our full history of calls and PnL." },
                                { icon: Loader2, title: "24/7 Support", desc: "Priority onboarding assistance." }
                            ].map((item, i) => (
                                <div key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-white/50 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-primary/30 transition-colors">
                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                        <item.icon className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-900 dark:text-white">{item.title}</h3>
                                        <p className="text-sm text-slate-500 dark:text-slate-400">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Content: Form Card */}
                    <div className="w-full lg:max-w-md animate-in fade-in slide-in-from-right-8 duration-700 delay-150">
                        <Card className="border-0 shadow-2xl shadow-primary/5 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl ring-1 ring-slate-200 dark:ring-white/10 rounded-[2rem] overflow-hidden">
                            {success ? (
                                <div className="p-12 text-center space-y-6">
                                    <div className="w-20 h-20 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <Check className="w-10 h-10 stroke-[3]" />
                                    </div>
                                    <h2 className="text-3xl font-bold font-heading">You're In!</h2>
                                    <p className="text-muted-foreground leading-relaxed">
                                        Your request has been received. Our team will contact you shortly to activate your pro access.
                                    </p>
                                    <Button onClick={() => setSuccess(false)} variant="outline" className="w-full h-12 rounded-xl mt-4">
                                        Request Another
                                    </Button>
                                    <Link href="/market" className="block w-full">
                                        <Button variant="ghost" className="w-full h-12 rounded-xl text-primary hover:text-primary hover:bg-primary/5">
                                            Return to Market <ArrowRight className="w-4 h-4 ml-2" />
                                        </Button>
                                    </Link>
                                </div>
                            ) : (
                                <CardContent className="p-8">
                                    <div className="mb-8">
                                        <h2 className="text-2xl font-bold mb-2">Create Account</h2>
                                        <p className="text-sm text-muted-foreground">Enter your details to get started.</p>
                                    </div>

                                    <form onSubmit={onSubmit} className="space-y-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Full Name</Label>
                                            <Input
                                                id="name"
                                                name="name"
                                                required
                                                placeholder="John Doe"
                                                className="h-12 rounded-xl bg-slate-50 dark:bg-black/40 border-slate-200 dark:border-white/10 focus:ring-primary/20 focus:border-primary px-4"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Email Address</Label>
                                            <Input
                                                id="email"
                                                name="email"
                                                type="email"
                                                required
                                                placeholder="john@example.com"
                                                className="h-12 rounded-xl bg-slate-50 dark:bg-black/40 border-slate-200 dark:border-white/10 focus:ring-primary/20 focus:border-primary px-4"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="city" className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">City</Label>
                                            <Input
                                                id="city"
                                                name="city"
                                                required
                                                placeholder="Mumbai"
                                                className="h-12 rounded-xl bg-slate-50 dark:bg-black/40 border-slate-200 dark:border-white/10 focus:ring-primary/20 focus:border-primary px-4"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="phone" className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Phone Number</Label>
                                            <Input
                                                id="phone"
                                                name="phone"
                                                type="tel"
                                                required
                                                placeholder="+91 98765 43210"
                                                className="h-12 rounded-xl bg-slate-50 dark:bg-black/40 border-slate-200 dark:border-white/10 focus:ring-primary/20 focus:border-primary px-4"
                                            />
                                        </div>

                                        <Button
                                            type="submit"
                                            className="w-full h-14 rounded-xl text-base font-bold bg-primary text-black hover:bg-primary/90 shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all duration-200 mt-2"
                                            disabled={loading}
                                        >
                                            {loading ? (
                                                <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Processing...</>
                                            ) : (
                                                'Get Instant Access'
                                            )}
                                        </Button>

                                        <p className="text-xs text-center text-muted-foreground mt-6">
                                            By continuing, you agree to our Terms of Service and Privacy Policy.
                                        </p>
                                    </form>
                                </CardContent>
                            )}
                        </Card>
                    </div>

                </div>
            </div>
        </div>
    );
}
