"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Star, Zap, ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { usePlansQuery } from "@/services/plans/plan.hooks";
import type { Plan } from "@/services/plans/plan.types";
import { useSwipeCards } from "@/hooks/use-swipe-cards";

export default function PlansPage() {
  const words = ["Scale With Confidence.", "Execute With Precision.", "Grow With Structure."];
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const { data: plans = [] } = usePlansQuery();

  useEffect(() => {
    if (subIndex === words[index].length + 1 && !reverse) {
      setTimeout(() => setReverse(true), 1000);
      return;
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? 40 : 70);

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse]);

  const fallbackPlans = useMemo(
    () => [
      {
        id: "demo",
        name: "Explorer Access",
        description: "Built for evaluating workflow, signal quality, and speed",
        price: "Free",
        duration: "1 Day",
        features: ["Core strategy feed", "Fast signal delivery", "Performance snapshots", "Guided onboarding support"],
        buttonText: "Start 1-Day Access",
        href: "/trial",
        isPopular: false,
      },
      {
        id: "pro",
        name: "Professional Access",
        description: "Designed for serious active traders and operators",
        price: "INR 25,000",
        duration: "Month",
        features: ["Full multi-strategy coverage", "Sub-100ms signal routing", "Deep analytics and exports", "Priority response support"],
        buttonText: "Activate Professional",
        href: "/trial",
        isPopular: true,
      },
      {
        id: "enterprise",
        name: "Institutional Suite",
        description: "Tailored for desks, teams, and managed capital mandates",
        price: "Custom",
        duration: "Pricing",
        features: ["Dedicated infrastructure", "White-label deployment", "FIX/API integrations", "Dedicated relationship manager"],
        buttonText: "Schedule Consultation",
        href: "/contact",
        isPopular: false,
      },
    ],
    []
  );

  const formattedPlans = useMemo(() => {
    if (!plans.length) return fallbackPlans;

    const popularId = plans
      .filter((plan) => !plan.isDemo)
      .sort((a, b) => (b.price ?? 0) - (a.price ?? 0))[0]?._id;

    const formatPrice = (price?: number, isDemo?: boolean) => {
      if (!price || price <= 0 || isDemo) return "Free";
      const value = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(price);
      return `INR ${value}`;
    };

    const formatDuration = (durationDays?: number) => {
      if (!durationDays) return "Flexible";
      return `${durationDays} Day${durationDays > 1 ? "s" : ""}`;
    };

    return plans.map((plan: Plan) => {
      const isPopular = plan._id === popularId;
      const isDemo = Boolean(plan.isDemo);

      return {
        id: plan._id,
        name: plan.name,
        description: plan.description || "Premium access with execution-ready workflows.",
        price: formatPrice(plan.price, isDemo),
        duration: formatDuration(plan.durationDays),
        features: plan.features?.length
          ? plan.features
          : ["Execution-grade routing", "Priority strategy support", "Performance reporting", "Managed onboarding"],
        buttonText: isDemo ? "Start Demo Access" : "Activate Plan",
        href: `/trial?planId=${plan._id}`,
        isPopular,
      };
    });
  }, [fallbackPlans, plans]);

  const { containerRef, activeIndex, isDragging, bind } = useSwipeCards(formattedPlans.length);

  const scrollToIndex = useCallback((targetIndex: number, behavior: ScrollBehavior = "smooth") => {
    const container = containerRef.current;
    if (!container) return;
    const children = Array.from(container.children) as HTMLElement[];
    if (!children.length) return;
    const wrappedIndex = ((targetIndex % children.length) + children.length) % children.length;
    const target = children[wrappedIndex];
    if (!target) return;
    const left = target.offsetLeft - (container.clientWidth - target.offsetWidth) / 2;
    container.scrollTo({ left, behavior });
  }, [containerRef]);

  const showArrows = formattedPlans.length > 1;
  const getCircularDistance = (idx: number, current: number, total: number) => {
    if (total <= 1) return 0;
    const delta = Math.abs(idx - current);
    return Math.min(delta, total - delta);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground selection:bg-primary/30 transition-colors duration-300">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:24px_24px] opacity-[0.15]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 blur-[120px] rounded-full" />
      </div>

      <div className="w-full max-w-7xl mx-auto mt-10 px-6 py-16 md:py-24 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-28">
          <div className="space-y-8 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider">
              <Zap className="w-3 h-3 animate-pulse" />
              Premium Membership Architecture
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold leading-[1] tracking-tight text-foreground">
              Choose the Plan
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">
                Aligned to Your Ambition.
              </span>
            </h1>

            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-primary h-[32px] sm:h-[40px]">
              {words[index].substring(0, subIndex)}
              <span className="animate-pulse">|</span>
            </div>

            <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
              Premium signal intelligence with transparent pricing and execution-grade reliability.
              Built for traders who value consistency, control, and accountability.
            </p>

            <div className="flex flex-wrap gap-10 pt-4">
              <div>
                <div className="text-3xl font-bold">10,000+</div>
                <div className="text-sm text-muted-foreground">Active Members</div>
              </div>
              <div>
                <div className="text-3xl font-bold">99.9%</div>
                <div className="text-sm text-muted-foreground">Service Uptime</div>
              </div>
              <div>
                <div className="text-3xl font-bold">85%</div>
                <div className="text-sm text-muted-foreground">Signal Confidence Band</div>
              </div>
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="bg-white/70 dark:bg-white/5 backdrop-blur-xl p-10 rounded-[2rem] border border-black/5 dark:border-white/10 shadow-2xl">
              <div className="space-y-6">
                <div className="text-xl font-bold">Why Professionals Choose This Tier</div>

                <div className="space-y-4 text-sm text-muted-foreground">
                  <div className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-primary mt-1" />
                    Multi-strategy execution architecture
                  </div>

                  <div className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-primary mt-1" />
                    Real-time institutional-grade data flow
                  </div>

                  <div className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-primary mt-1" />
                    Direct webhook and API connectivity
                  </div>

                  <div className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-primary mt-1" />
                    Priority advisory and support desk
                  </div>
                </div>

                <Button className="w-full mt-6 rounded-xl">
                  Move to Professional <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[1180px]">
          <div
            ref={containerRef}
            {...bind}
            className={`no-scrollbar flex gap-3 sm:gap-6 overflow-x-auto pb-5 px-1.5 sm:px-8 md:px-14 snap-x snap-mandatory scroll-smooth touch-pan-y md:gap-8 lg:gap-10 items-stretch select-none ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
          >
            {formattedPlans.map((plan, index) => {
              const isActive = index === activeIndex;
              const distance = getCircularDistance(index, activeIndex, formattedPlans.length);
              const depthClass = isActive
                ? "scale-100 opacity-100 z-20"
                : distance === 1
                  ? "scale-100 opacity-100 z-10 md:scale-[0.94] md:opacity-90"
                  : "scale-100 opacity-100 z-0 md:scale-[0.9] md:opacity-70";
              return (
                <Card
                  key={plan.id}
                  className={`plan-swipe-card relative overflow-hidden rounded-[2rem] transition-all duration-500 group flex h-[500px] sm:h-[560px] lg:h-[600px] flex-col snap-center shrink-0 w-[94%] sm:w-[78%] md:w-[430px] lg:w-[460px]
                    ${isActive ? "plan-swipe-active" : ""}
                    ${depthClass}
                    ${plan.isPopular
                      ? "bg-white dark:bg-zinc-900 border-primary shadow-[0_20px_60px_-15px_rgba(245,158,11,0.15)] ring-1 ring-primary/20"
                      : "bg-white dark:bg-black/50 border-slate-100 dark:border-white/5 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_60px_-12px_rgba(0,0,0,0.15)] dark:shadow-none hover:border-primary/30 sm:hover:-translate-y-1"
                    }`}
                >
                {plan.isPopular && (
                  <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
                )}

                <CardHeader className="p-6 pb-0">
                  {plan.isPopular && (
                    <div className="mb-3">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary text-black text-[10px] font-bold uppercase tracking-wider shadow-lg shadow-primary/25">
                        <Star className="w-3 h-3 fill-black" /> Most Popular
                      </span>
                    </div>
                  )}
                  <CardTitle className="text-2xl font-bold mb-2">{plan.name}</CardTitle>
                  <CardDescription className="line-clamp-2">{plan.description}</CardDescription>
                </CardHeader>

                <CardContent className="p-6 pt-6 flex-1">
                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-4xl font-bold tracking-tighter">{plan.price}</span>
                    <span className="text-muted-foreground text-sm ml-1">/ {plan.duration}</span>
                  </div>

                  <div className="space-y-4 mb-8">
                    {plan.features.slice(0, 4).map((feature, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div
                          className={`mt-0.5 w-4 h-4 rounded-full flex items-center justify-center shrink-0
                            ${plan.isPopular ? "bg-primary text-black" : "bg-muted text-muted-foreground"}`}
                        >
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </div>
                        <span className="text-sm leading-relaxed line-clamp-2">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>

                <CardFooter className="p-6 pt-0 mt-auto">
                  <Link href={plan.href} className="w-full">
                    <Button
                      size="lg"
                      className={`w-full h-12 rounded-xl text-sm font-bold transition-all duration-300
                        ${plan.isPopular
                          ? "bg-primary text-black hover:bg-primary/90 shadow-xl shadow-primary/20 hover:scale-[1.02]"
                          : "bg-foreground text-background hover:opacity-90"}`}
                    >
                      {plan.buttonText} <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </CardFooter>
                </Card>
              );
            })}
          </div>

          {showArrows ? (
            <div className="pointer-events-none absolute inset-y-0 left-0 right-0 z-30 flex items-center justify-between">
              <button
                type="button"
                onClick={() => scrollToIndex(activeIndex - 1)}
                aria-label="Previous plan"
                className="pointer-events-auto relative z-40 ml-2 h-9 w-9 sm:h-11 sm:w-11 rounded-full border border-border/60 bg-white/80 text-foreground shadow-lg backdrop-blur transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 dark:bg-black/60"
              >
                <ArrowLeft className="mx-auto h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => scrollToIndex(activeIndex + 1)}
                aria-label="Next plan"
                className="pointer-events-auto relative z-40 mr-2 h-9 w-9 sm:h-11 sm:w-11 rounded-full border border-border/60 bg-white/80 text-foreground shadow-lg backdrop-blur transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 dark:bg-black/60"
              >
                <ArrowRight className="mx-auto h-5 w-5" />
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
