"use client";

import { useMemo } from "react";
import { usePlansQuery } from "@/services/plans/plan.hooks";
import type { Plan } from "@/services/plans/plan.types";
import HeroSection from "@/components/sections/home/hero-section";
import PlatformEcosystemSection from "@/components/sections/home/platform-ecosystem-section";
import PricingSection, { type PricingPlan } from "@/components/sections/home/pricing-section";
import TestimonialsSection from "@/components/sections/home/testimonials-section";
import SocialMediaSection from "@/components/sections/home/social-media-section";
import { buildPublicPlanCta, TRIAL_URL } from "@/lib/external-links";

export default function Home() {
    const { data: plans = [] } = usePlansQuery();

    const fallbackPlans: PricingPlan[] = useMemo(
        () => [
            {
                id: "demo",
                name: "Demo Access",
                description: "Perfect for testing the waters",
                price: "Demo",
                duration: "30 Days",
                features: ["Unlimited Strategies", "< 100ms Latency", "Deep Analytics & Export", "Priority 24/7 Support"],
                buttonText: "Start 30-Day Trial",
                href: TRIAL_URL,
                isPopular: false,
            },
            {
                id: "pro",
                name: "Pro Access",
                description: "For serious algorithmic traders",
                price: "INR 25,000",
                duration: "Month",
                features: ["Unlimited Strategies", "< 100ms Latency", "Deep Analytics & Export", "Priority 24/7 Support"],
                buttonText: "Choose Plan",
                href: buildPublicPlanCta({
                    id: "pro",
                    name: "Pro Access",
                    price: 25000,
                    durationDays: 30,
                    segment: "N/A",
                }).href,
                isPopular: true,
            },
            {
                id: "enterprise",
                name: "Enterprise",
                description: "For Prop Desks & Funds",
                price: "Custom",
                duration: "30 Days",
                features: ["Dedicated Infrastructure", "White Label Solution", "FIX API Access", "Dedicated Account Manager"],
                buttonText: "Choose Plan",
                href: buildPublicPlanCta({
                    id: "enterprise",
                    name: "Enterprise",
                    durationDays: 30,
                    isCustom: true,
                    segment: "N/A",
                }).href,
                isPopular: false,
            },
        ],
        []
    );

    const formattedPlans: PricingPlan[] = useMemo(() => {
        if (!plans.length) return fallbackPlans;

        const popularId = plans
            .filter((plan) => !plan.isDemo)
            .sort((a, b) => (b.price ?? 0) - (a.price ?? 0))[0]?._id;

        const formatPrice = (price?: number, isDemo?: boolean, isCustom?: boolean) => {
            if (isDemo) return "Demo";
            if (isCustom) return "Custom";
            if (!price || price <= 0) return "Custom";
            const value = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(price);
            return `INR ${value}`;
        };

        const formatDuration = (durationDays?: number, isDemo?: boolean, isCustom?: boolean) => {
            if ((isDemo || isCustom) && !durationDays) return "30 Days";
            if (!durationDays) return "Flexible";
            return `${durationDays} Day${durationDays > 1 ? "s" : ""}`;
        };

        return plans.map((plan: Plan) => {
            const isPopular = plan._id === popularId;
            const isDemo = Boolean(plan.isDemo);
            const name = plan.name?.toLowerCase() ?? "";
            const segment = plan.segment?.toLowerCase() ?? "";
            const isCustom =
                !isDemo &&
                ((plan.price ?? 0) <= 0 ||
                    name.includes("custom") ||
                    name.includes("enterprise") ||
                    name.includes("institutional") ||
                    segment.includes("enterprise") ||
                    segment.includes("institutional"));

            return {
                ...buildPublicPlanCta({
                    id: plan._id,
                    name: plan.name,
                    price: plan.price,
                    durationDays: plan.durationDays,
                    segment: plan.segment,
                    isDemo,
                    isCustom,
                }),
                id: plan._id,
                name: plan.name,
                description: plan.description || "Premium access built for disciplined execution.",
                price: formatPrice(plan.price, isDemo, isCustom),
                duration: formatDuration(plan.durationDays, isDemo, isCustom),
                features: plan.features?.length
                    ? plan.features
                    : ["Execution-grade routing", "Priority strategy support", "Performance reporting", "Managed onboarding"],
                isPopular,
            };
        });
    }, [fallbackPlans, plans]);

    return (
        <div className="flex flex-col min-h-screen font-sans overflow-x-hidden">
            <HeroSection />
            <PlatformEcosystemSection />
            <PricingSection plans={formattedPlans} />
            <TestimonialsSection />
            <SocialMediaSection />
        </div>
    );
}
