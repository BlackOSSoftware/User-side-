"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const main = document.querySelector("main");
    if (!main) return;

    const targets = Array.from(
      main.querySelectorAll<HTMLElement>("section, article, .reveal")
    );

    targets.forEach((el, index) => {
      if (!el.hasAttribute("data-reveal")) {
        el.setAttribute("data-reveal", "");
      }
      if (!el.getAttribute("data-reveal-variant")) {
        const variant = index % 3 === 0 ? "rise" : index % 3 === 1 ? "left" : "right";
        el.setAttribute("data-reveal-variant", variant);
      }
      if (!el.style.getPropertyValue("--reveal-delay")) {
        const delay = Math.min(index, 6) * 90;
        el.style.setProperty("--reveal-delay", `${delay}ms`);
      }

      const children = Array.from(el.children) as HTMLElement[];
      children.forEach((child, childIndex) => {
        if (!child.hasAttribute("data-reveal-child")) {
          child.setAttribute("data-reveal-child", "");
        }
        if (!child.style.getPropertyValue("--reveal-child-delay")) {
          const childDelay = Math.min(childIndex, 6) * 70 + 120;
          child.style.setProperty("--reveal-child-delay", `${childDelay}ms`);
        }
      });
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -10% 0px" }
    );

    targets.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
