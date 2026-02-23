import Link from "next/link";
import { ArrowRight, Instagram, Linkedin, Twitter } from "lucide-react";
import { BrandLogo } from "@/components/layout/brand-logo";

const Footer = () => {
  return (
    <div className="mt-20 w-full">
      <footer className="relative overflow-hidden border-t border-border/70 bg-card/60 backdrop-blur-xl">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_12%,hsl(var(--primary)/0.12),transparent_38%),radial-gradient(circle_at_88%_10%,hsl(var(--accent)/0.12),transparent_34%)]" />

        <div className="relative mx-auto grid w-full max-w-7xl gap-12 px-4 py-14 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div className="space-y-5">
            <BrandLogo />
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              Premium signal intelligence built for disciplined traders. MSPK combines structured execution, defined risk, and clear market communication.
            </p>
            <Link
              href="/trial"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition hover:bg-primary/90"
            >
              Start Free Access
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-[0.12em] text-foreground/85">Platform</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link className="transition hover:text-primary" href="/">Home</Link></li>
              <li><Link className="transition hover:text-primary" href="/market">Market</Link></li>
              <li><Link className="transition hover:text-primary" href="/plans">Plans</Link></li>
              <li><Link className="transition hover:text-primary" href="/trial">Free Trial</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-[0.12em] text-foreground/85">Company</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link className="transition hover:text-primary" href="/about">About</Link></li>
              <li><Link className="transition hover:text-primary" href="/login">Client Login</Link></li>
              <li><Link className="transition hover:text-primary" href="/dashboard">Dashboard</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-[0.12em] text-foreground/85">Status</h4>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/35 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-500">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
              All Systems Operational
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Fast delivery, monitored uptime, and transparent updates for every active strategy stream.
            </p>
            <div className="flex items-center gap-2">
              <Link href="#" className="rounded-full border border-border bg-background/60 p-2 text-muted-foreground transition hover:border-primary/50 hover:text-primary">
                <Twitter className="h-4 w-4" />
              </Link>
              <Link href="#" className="rounded-full border border-border bg-background/60 p-2 text-muted-foreground transition hover:border-primary/50 hover:text-primary">
                <Linkedin className="h-4 w-4" />
              </Link>
              <Link href="#" className="rounded-full border border-border bg-background/60 p-2 text-muted-foreground transition hover:border-primary/50 hover:text-primary">
                <Instagram className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-border/70">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-2 px-4 py-4 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
            <p>© 2026 MSPK Trade Solutions. All rights reserved.</p>
            <p>Market data is informational and not financial advice.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
