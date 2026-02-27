'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, Loader2, Lock, Mail, LayoutDashboard } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useLoginMutation } from '@/hooks/use-auth';

export default function LoginPage() {
    const router = useRouter();
    const loginMutation = useLoginMutation();
    const [showPassword, setShowPassword] = useState(false);
    const loading = loginMutation.isPending;

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const email = String(formData.get('email') || '');
        const password = String(formData.get('password') || '');

        try {
            await loginMutation.mutateAsync({ email, password });
            toast.success('Login successful');
            router.replace('/dashboard');
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : 'Login failed';
            toast.error(message);
        }
    }

    return (
        <div className="flex flex-col min-h-screen bg-background text-foreground selection:bg-primary/30 transition-colors duration-300">
            <div className="absolute inset-0 z-0 w-full h-full pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-[0.2]"></div>
                <div className="absolute top-0 left-0 right-0 h-[500px] w-full bg-gradient-to-b from-primary/5 via-transparent to-transparent blur-3xl opacity-40"></div>
            </div>

            <div className="w-full max-w-7xl mx-auto mt-10 px-6 py-12 md:py-24 relative z-10">
                <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-16 lg:gap-8">
                    <div className="w-full lg:max-w-xl space-y-8 text-center lg:text-left pt-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider">
                            <Lock className="w-3 h-3 fill-current animate-pulse" /> Secure Access
                        </div>
                        <h1 className="text-5xl md:text-7xl font-heading font-bold tracking-tighter leading-[0.9] text-slate-900 dark:text-white">
                            Welcome <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-br from-primary via-primary/80 to-primary/50 filter drop-shadow-sm">Back</span>
                            <span className="text-primary">.</span>
                        </h1>
                        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
                            Access your execution workspace, manage strategies, and track live performance.
                            <span className="block mt-2 font-medium text-slate-900 dark:text-white">Institutional-grade security with premium controls.</span>
                        </p>
                    </div>

                    <div className="w-full lg:max-w-md animate-in fade-in slide-in-from-right-8 duration-700 delay-150">
                        <Card className="border-0 shadow-2xl shadow-primary/5 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl ring-1 ring-slate-200 dark:ring-white/10 rounded-[2rem] overflow-hidden">
                            <CardContent className="p-8">
                                <div className="mb-8">
                                    <h2 className="text-2xl font-bold mb-2">Sign In</h2>
                                    <p className="text-sm text-muted-foreground">Enter your credentials to continue securely.</p>
                                </div>

                                <form onSubmit={onSubmit} className="space-y-5">
                                    <div className="space-y-2">
                                        <Label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Email</Label>
                                        <div className="relative">
                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-5 h-5 text-slate-700 dark:text-slate-200 pointer-events-none" />
                                            <Input
                                                id="email"
                                                name="email"
                                                type="email"
                                                required
                                                placeholder="trader@mspk.com"
                                                className="h-12 rounded-xl pl-11 bg-slate-50 dark:bg-black/40 border-slate-200 dark:border-white/10 focus:ring-primary/20 focus:border-primary"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center">
                                            <Label htmlFor="password" className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Password</Label>
                                            <Link href="#" className="text-xs text-primary hover:text-primary/80 transition-colors">Need password help?</Link>
                                        </div>
                                        <div className="relative">
                                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-5 h-5 text-slate-700 dark:text-slate-200 pointer-events-none" />
                                            <Input
                                                id="password"
                                                name="password"
                                                type={showPassword ? "text" : "password"}
                                                required
                                                placeholder="********"
                                                className="h-12 rounded-xl pl-11 pr-11 bg-slate-50 dark:bg-black/40 border-slate-200 dark:border-white/10 focus:ring-primary/20 focus:border-primary"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword((prev) => !prev)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-500 dark:text-slate-300 hover:text-primary transition-colors"
                                                aria-label={showPassword ? "Hide password" : "Show password"}
                                            >
                                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                            </button>
                                        </div>
                                    </div>

                                    <Button
                                        type="submit"
                                        className="w-full h-12 rounded-xl text-base font-bold bg-primary text-black hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all duration-200 mt-2"
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Authenticating...</>
                                        ) : (
                                            'Secure Sign In'
                                        )}
                                    </Button>

                                    <div className="relative my-4">
                                        <div className="absolute inset-0 flex items-center">
                                            <span className="w-full border-t border-slate-200 dark:border-white/10" />
                                        </div>
                                        <div className="relative flex justify-center text-xs uppercase">
                                            <span className="bg-white dark:bg-black px-2 text-muted-foreground">
                                                Or continue using demo
                                            </span>
                                        </div>
                                    </div>

                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="w-full h-12 rounded-xl text-base font-bold border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5 transition-all duration-200"
                                        onClick={() => router.push('/dashboard')}
                                    >
                                        <LayoutDashboard className="w-4 h-4 mr-2" /> Demo Login
                                    </Button>
                                </form>
                            </CardContent>
                            <div className="p-6 bg-slate-50/50 dark:bg-white/5 border-t border-slate-200 dark:border-white/5 text-center">
                                <p className="text-sm text-muted-foreground">
                                    Don&apos;t have an account?{' '}
                                    <Link href="/trial" className="font-bold text-primary hover:underline underline-offset-4">
                                        Start Premium Trial
                                    </Link>
                                </p>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
