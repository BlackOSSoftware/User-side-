import Link from 'next/link';
import { Twitter, Github, Linkedin, Instagram, ArrowRight, Zap } from 'lucide-react';

const Footer = () => {
    return (
        <div className="w-full mt-20">
            <footer className="w-full bg-white dark:bg-black border-t border-slate-200 dark:border-white/10 rounded-t-[2.5rem] rounded-b-none shadow-2xl relative overflow-hidden transition-colors duration-300">
                {/* Ambient Background */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-blue-500/5 via-transparent to-transparent -z-10 pointer-events-none"></div>

                <div className="max-w-7xl mx-auto px-4 py-16">
                    {/* Top Section: CTA */}
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-16 pb-16 border-b border-slate-200 dark:border-white/5">
                        <div className="text-center md:text-left">
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Ready to modernize your trading?</h3>
                            <p className="text-slate-600 dark:text-slate-400">Join 10,000+ traders running on our infrastructure.</p>
                        </div>
                        <Link href="/trial">
                            <button className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-sky-500 text-black font-bold hover:from-blue-600 hover:to-sky-600 transition-all shadow-lg shadow-blue-500/20">
                                Start 1-Day Free Trial <ArrowRight className="w-4 h-4" />
                            </button>
                        </Link>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
                        {/* Brand Column */}
                        <div className="col-span-2 md:col-span-1">
                            <Link href="/" className="flex items-center gap-2 mb-6">
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-400 to-sky-600 flex items-center justify-center text-white font-bold">
                                    <Zap className="w-5 h-5 fill-current" />
                                </div>
                                <span className="text-xl font-bold text-slate-900 dark:text-white">MSPK</span>
                            </Link>
                            <p className="text-sm leading-relaxed mb-6 max-w-xs text-slate-600 dark:text-slate-400">
                                The direct pipeline to the markets. Low latency execution, verified signals, and institutional-grade infrastructure for retail traders.
                            </p>
                            <div className="flex gap-4">
                                <Link href="#" className="p-2 rounded-full bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-white transition-colors"><Twitter className="w-4 h-4" /></Link>
                                <Link href="#" className="p-2 rounded-full bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-white transition-colors"><Github className="w-4 h-4" /></Link>
                                <Link href="#" className="p-2 rounded-full bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-white transition-colors"><Linkedin className="w-4 h-4" /></Link>
                                <Link href="#" className="p-2 rounded-full bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-white transition-colors"><Instagram className="w-4 h-4" /></Link>
                            </div>
                        </div>

                        {/* Links Columns */}
                        <div>
                            <h4 className="font-semibold text-slate-900 dark:text-white mb-6">Platform</h4>
                            <ul className="space-y-4 text-sm">
                                <li><Link href="/features" className="hover:text-blue-500 transition-colors">Features</Link></li>
                                <li><Link href="/pricing" className="hover:text-blue-500 transition-colors">Pricing</Link></li>
                                <li><Link href="/api" className="hover:text-blue-500 transition-colors">API Access</Link></li>
                                <li><Link href="/changelog" className="hover:text-blue-500 transition-colors">Changelog</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-semibold text-slate-900 dark:text-white mb-6">Company</h4>
                            <ul className="space-y-4 text-sm">
                                <li><Link href="/about" className="hover:text-blue-500 transition-colors">About Us</Link></li>
                                <li><Link href="/blog" className="hover:text-blue-500 transition-colors">Blog</Link></li>
                                <li><Link href="/careers" className="hover:text-blue-500 transition-colors">Careers</Link></li>
                                <li><Link href="/contact" className="hover:text-blue-500 transition-colors">Contact</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-semibold text-slate-900 dark:text-white mb-6">Legal</h4>
                            <ul className="space-y-4 text-sm">
                                <li><Link href="/privacy" className="hover:text-blue-500 transition-colors">Privacy Policy</Link></li>
                                <li><Link href="/terms" className="hover:text-blue-500 transition-colors">Terms of Service</Link></li>
                                <li><Link href="/risk" className="hover:text-blue-500 transition-colors">Risk Disclosure</Link></li>
                            </ul>
                        </div>
                    </div>

                    {/* Bottom Bar */}
                    <div className="pt-8 border-t border-slate-200 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
                        <p>© 2026 MSPK Trading Technologies. All rights reserved.</p>
                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                All Systems Operational
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Footer;
