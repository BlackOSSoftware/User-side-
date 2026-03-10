"use client";

import { usePathname } from "next/navigation";
import RevealObserver from "./reveal-observer";

export default function PublicMotionShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <>
      <RevealObserver />
      <div key={pathname} className="page-transition">
        {children}
      </div>
    </>
  );
}
