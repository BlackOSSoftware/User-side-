"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

type StoreBadgeProps = {
  href: string;
  store: "google-play" | "app-store";
  className?: string;
};

export function StoreBadge({ href, store, className }: StoreBadgeProps) {
  const isGoogle = store === "google-play";
  const imageSrc = isGoogle ? "/google.png" : "/apple.svg";
  const imageAlt = isGoogle ? "Get it on Google Play" : "Download on the App Store";
  const isApkDownload = isGoogle && href.toLowerCase().endsWith(".apk");
  const target = isApkDownload ? undefined : "_blank";
  const rel = target ? "noopener noreferrer" : undefined;

  return (
    <a
      href={href}
      target={target}
      rel={rel}
      download={isApkDownload ? "MSPK.apk" : undefined}
      aria-label={isApkDownload ? "Download the MSPK app" : imageAlt}
      className={cn(
        "group inline-flex w-full items-center justify-center transition-transform duration-200 hover:-translate-y-0.5 active:scale-[0.985]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/55 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className
      )}
    >
      {isApkDownload ? (
        <span className="inline-flex w-full max-w-[196px] items-center justify-center rounded-xl border border-primary/30 bg-gradient-to-r from-primary/90 to-blue-500/90 px-4 py-3 text-center text-sm font-semibold uppercase tracking-wide text-white shadow-[0_12px_28px_-16px_rgba(59,130,246,0.85)] transition-transform duration-200 group-hover:scale-[1.01]">
          Download App
        </span>
      ) : (
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={260}
          height={78}
          className="h-auto w-full max-w-[168px] object-contain transition-transform duration-200 group-hover:scale-[1.01] min-[360px]:max-w-[184px] sm:max-w-[196px]"
        />
      )}
    </a>
  );
}
