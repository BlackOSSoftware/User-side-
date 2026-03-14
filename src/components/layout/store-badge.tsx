"use client";

import { cn } from "@/lib/utils";

type StoreBadgeProps = {
  href: string;
  store: "google-play" | "app-store";
  className?: string;
};

const GooglePlayIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 28 28" className={className} aria-hidden="true">
    <path fill="#00D26A" d="M3.64 2.4 15.96 14 3.62 25.6A3.08 3.08 0 0 1 3 23.72V4.28c0-.7.24-1.35.64-1.88Z" />
    <path fill="#00A7FF" d="M20.1 18.06 15.96 14 20.1 9.94l4.86 2.76c1.38.78 1.38 2.76 0 3.54l-4.86 2.82Z" />
    <path fill="#FF3D81" d="m3.64 2.4 16.46 9.4L15.96 14 3.64 2.4Z" />
    <path fill="#FFD400" d="m3.62 25.6 12.34-11.6 4.14 4.06-16.48 9.54Z" />
  </svg>
);

const AppleIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path
      fill="currentColor"
      d="M16.72 12.61c.02 2.1 1.85 2.8 1.87 2.8-.02.05-.29 1-.97 1.97-.58.84-1.19 1.67-2.14 1.69-.94.02-1.24-.56-2.31-.56-1.08 0-1.41.54-2.29.58-.91.03-1.6-.91-2.18-1.74-1.18-1.7-2.08-4.79-.87-6.9.6-1.04 1.67-1.7 2.84-1.72.89-.02 1.72.6 2.31.6.58 0 1.67-.74 2.82-.63.48.02 1.82.19 2.68 1.45-.07.04-1.6.93-1.58 2.46Zm-2.34-5.06c.49-.59.82-1.42.73-2.24-.71.03-1.57.47-2.08 1.06-.46.53-.86 1.37-.75 2.17.79.06 1.6-.4 2.1-.99Z"
    />
  </svg>
);

export function StoreBadge({ href, store, className }: StoreBadgeProps) {
  const isGoogle = store === "google-play";

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={isGoogle ? "Get it on Google Play" : "Download on the App Store"}
      className={cn(
        "group relative inline-flex min-h-[60px] w-full items-center gap-3.5 overflow-hidden rounded-2xl border px-4 py-3 text-left text-white transition-all duration-250 ease-out",
        "border-white/16 bg-[linear-gradient(180deg,#15171a_0%,#09090b_100%)] ring-1 ring-white/8 backdrop-blur-[2px] shadow-[0_18px_40px_-24px_rgba(0,0,0,0.72)] hover:-translate-y-0.5 hover:border-white/28 hover:ring-white/12 hover:shadow-[0_28px_56px_-26px_rgba(0,0,0,0.84)]",
        "active:translate-y-0 active:scale-[0.985] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/55 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "before:pointer-events-none before:absolute before:inset-0 before:bg-[linear-gradient(180deg,rgba(255,255,255,0.1)_0%,transparent_38%,transparent_100%)] before:opacity-100",
        "after:pointer-events-none after:absolute after:inset-y-0 after:left-[-55%] after:w-[46%] after:-skew-x-12 after:bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.06)_18%,rgba(255,255,255,0.32)_50%,rgba(255,255,255,0.08)_82%,transparent_100%)] after:opacity-0 after:transition-all after:duration-500 group-hover:after:left-[120%] group-hover:after:opacity-100",
        className
      )}
    >
      <span className="relative flex size-10 shrink-0 items-center justify-center rounded-xl border border-white/12 bg-white/[0.09] shadow-[inset_0_1px_0_rgba(255,255,255,0.14)]">
        {isGoogle ? <GooglePlayIcon className="size-6.5" /> : <AppleIcon className="size-6.5" />}
      </span>

      <span className="relative flex min-w-0 flex-1 flex-col">
        <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/78 [text-shadow:0_1px_1px_rgba(0,0,0,0.35)] sm:text-[10.5px]">
          {isGoogle ? "Get it on" : "Download on the"}
        </span>
        <span className="truncate text-[16px] font-bold leading-tight tracking-[0.01em] text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.42)] sm:text-[17px]">
          {isGoogle ? "Google Play" : "App Store"}
        </span>
      </span>
    </a>
  );
}
