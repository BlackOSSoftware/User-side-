import Link from "next/link";
import { ArrowRight, Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { BrandLogo } from "@/components/layout/brand-logo";
import { APP_STORE_URL, LOGIN_URL, PLAY_STORE_URL, TRIAL_URL } from "@/lib/external-links";
import { StoreBadge } from "@/components/layout/store-badge";

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
    <path
      fill="currentColor"
      d="M16.02 3.2c-7.05 0-12.8 5.75-12.8 12.8 0 2.26.6 4.46 1.74 6.4L3.1 28.8l6.58-1.7a12.73 12.73 0 0 0 6.34 1.68h.01c7.05 0 12.8-5.75 12.8-12.8 0-3.42-1.33-6.63-3.75-9.05a12.7 12.7 0 0 0-9.06-3.73zm0 22.62h-.01c-1.97 0-3.9-.53-5.6-1.53l-.4-.24-3.9 1.01 1.04-3.8-.26-.39a9.63 9.63 0 0 1-1.5-5.12c0-5.32 4.33-9.65 9.65-9.65 2.58 0 5.01 1 6.83 2.82a9.6 9.6 0 0 1 2.82 6.83c0 5.32-4.33 9.65-9.67 9.65zm5.3-7.27c-.29-.14-1.7-.84-1.97-.93-.27-.1-.46-.14-.65.14-.19.29-.75.93-.92 1.12-.17.19-.34.22-.63.07-.29-.14-1.23-.45-2.34-1.44-.87-.77-1.45-1.73-1.62-2.02-.17-.29-.02-.45.13-.6.13-.13.29-.34.43-.51.14-.17.19-.29.29-.48.1-.19.05-.36-.02-.5-.07-.14-.65-1.56-.9-2.14-.23-.55-.47-.48-.65-.49h-.56c-.19 0-.5.07-.76.36-.26.29-1 1-1 2.43s1.03 2.82 1.18 3.01c.14.19 2.03 3.1 4.91 4.34.69.3 1.22.48 1.64.62.69.22 1.32.19 1.82.12.55-.08 1.7-.7 1.94-1.38.24-.68.24-1.26.17-1.38-.07-.12-.26-.19-.55-.34z"
    />
  </svg>
);

const TelegramIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path
      fill="currentColor"
      d="M22.02 4.86c.19-.78-.68-1.36-1.36-1.1L2.34 10.92c-.84.34-.79 1.56.08 1.82l4.72 1.45 1.8 5.51c.24.72 1.17.92 1.68.36l2.63-2.9 4.93 3.62c.62.45 1.5.1 1.67-.68L22.02 4.86zM8.3 13.6l9.7-6.05-7.79 7.36-.28 3.02-1.12-3.48-.51-.15z"
    />
  </svg>
);

const whatsappNumber = "917770039037";
const whatsappMessage = "Please contact me from the dashboard.";
const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
const telegramUrl = "https://t.me/Mspktradesolution";
const facebookUrl = "https://www.facebook.com/share/18BV74A6dD/";
const youtubeUrl = "https://youtube.com/@mspktradesolution?si=1_U7FF2PehnzFh_z";
const instagramUrl = "https://www.instagram.com/mspk_tradesolutions/";
const xUrl = "https://x.com/MspkTrade";

const Footer = () => {
  return (
    <footer className="relative w-full overflow-hidden border-t bg-card/60 backdrop-blur-xl">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_12%,hsl(var(--primary)/0.12),transparent_38%),radial-gradient(circle_at_88%_10%,hsl(var(--accent)/0.12),transparent_34%)]" />

      <div className="relative mx-auto grid w-full max-w-7xl gap-10 px-5 py-14 text-center sm:text-left sm:px-6 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div className="space-y-5 flex flex-col items-center sm:items-start">
          <BrandLogo />
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
            Premium signal intelligence built for disciplined traders. MSPK combines structured execution, defined risk, and clear market communication.
          </p>

          <Link
            href={TRIAL_URL}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition hover:bg-primary/90"
            target="_blank"
            rel="noopener noreferrer"
          >
            Start Free Access
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="space-y-4">
          <h4 className="mb-4 text-sm font-bold uppercase tracking-[0.12em] text-foreground/85">
            Platform
          </h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li><Link className="transition hover:text-primary" href="/">Home</Link></li>
            <li><Link className="transition hover:text-primary" href="/market">Market</Link></li>
            <li><Link className="transition hover:text-primary" href="/plans">Plans</Link></li>
            <li><Link className="transition hover:text-primary" href={TRIAL_URL} target="_blank" rel="noopener noreferrer">Free Trial</Link></li>
          </ul>

          <div className="grid w-full max-w-xs grid-cols-1 gap-2.5 sm:max-w-sm">
            <StoreBadge href={PLAY_STORE_URL} store="google-play" />
            <StoreBadge href={APP_STORE_URL} store="app-store" />
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="mb-4 text-sm font-bold uppercase tracking-[0.12em] text-foreground/85">
            Company
          </h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li><Link className="transition hover:text-primary" href="/about">About</Link></li>
            <li><Link className="transition hover:text-primary" href={LOGIN_URL} target="_blank" rel="noopener noreferrer">Client Login</Link></li>
            <li><Link className="transition hover:text-primary" href="/privacy-policy">Privacy Policy</Link></li>
          </ul>
        </div>

        <div className="space-y-4 flex flex-col items-center sm:items-start">
          <h4 className="text-sm font-bold uppercase tracking-[0.12em] text-foreground/85">
            Connect
          </h4>

          <p className="text-sm leading-relaxed text-muted-foreground max-w-xs">
            Log in to manage your access, track performance, and stay updated across all channels.
          </p>

          <Link
            href={LOGIN_URL}
            className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-5 py-2.5 text-sm font-semibold text-primary transition hover:bg-primary/20"
            target="_blank"
            rel="noopener noreferrer"
          >
            Client Login
            <ArrowRight className="h-4 w-4" />
          </Link>
          <div className="flex items-center justify-center sm:justify-start gap-3">
            {[
              { label: "WhatsApp", Icon: WhatsAppIcon, href: whatsappUrl },
              { label: "Instagram", Icon: Instagram, href: instagramUrl },
              { label: "Facebook", Icon: Facebook, href: facebookUrl },
              { label: "Telegram", Icon: TelegramIcon, href: telegramUrl },
              { label: "X (Twitter)", Icon: Twitter, href: xUrl },
              { label: "YouTube", Icon: Youtube, href: youtubeUrl },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative rounded-full border border-border bg-background/60 p-2 text-muted-foreground transition hover:border-primary/50 hover:text-primary"
                aria-label={item.label}
              >
                <item.Icon className="h-4 w-4" />
                <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-foreground px-2 py-1 text-[10px] font-semibold text-background opacity-0 shadow-sm transition-all group-hover:opacity-100 group-hover:-translate-y-0.5">
                  {item.label}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-2 px-5 py-4 text-center text-xs text-muted-foreground sm:flex-row sm:justify-between sm:text-left">
          <p>© 2026 MSPK Trade Solutions. All rights reserved.</p>
          <p>Market data is provided for informational use only, not as a recommendation or financial advice.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
