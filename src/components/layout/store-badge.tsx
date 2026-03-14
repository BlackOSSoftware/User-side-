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

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={imageAlt}
      className={cn(
        "group inline-flex w-full items-center justify-center transition-transform duration-200 hover:-translate-y-0.5 active:scale-[0.985]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/55 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className
      )}
    >
      <Image
        src={imageSrc}
        alt={imageAlt}
        width={260}
        height={78}
        className="h-auto w-full max-w-[168px] object-contain transition-transform duration-200 group-hover:scale-[1.01] min-[360px]:max-w-[184px] sm:max-w-[196px]"
      />
    </a>
  );
}
