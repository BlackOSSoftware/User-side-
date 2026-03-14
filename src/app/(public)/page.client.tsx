"use client";

import { useCallback, useMemo } from "react";
import { usePlansQuery } from "@/services/plans/plan.hooks";
import type { Plan } from "@/services/plans/plan.types";
import HeroSection from "@/components/sections/home/hero-section";
import PlatformEcosystemSection from "@/components/sections/home/platform-ecosystem-section";
import PricingSection, { type PricingPlan } from "@/components/sections/home/pricing-section";
import TestimonialsSection from "@/components/sections/home/testimonials-section";
import SocialMediaSection from "@/components/sections/home/social-media-section";
import { buildPublicPlanCta, formatPlanDuration, formatPlanPrice, TRIAL_URL } from "@/lib/external-links";
import { trackPublicPlanEnquiry } from "@/lib/plan-enquiry-tracker";

export default function Home() {
    const { data: plans = [] } = usePlansQuery();

    const openPlanDestination = useCallback(async (planHref: string, trackingData?: {
        planId?: string;
        planName: string;
        planPriceLabel?: string;
        planDurationLabel?: string;
        planSegment?: string;
        sourcePage: string;
    }) => {
        if (trackingData) {
            try {
                await trackPublicPlanEnquiry(trackingData);
            } catch (error) {
                console.error("Failed to create plan enquiry", error);
            }
        }
        window.open(planHref, "_blank", "noopener,noreferrer");
    }, []);

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
                onClick: () => window.open(TRIAL_URL, "_blank", "noopener,noreferrer"),
            },
            {
                id: "pro",
                name: "Pro Access",
                description: "For serious algorithmic traders",
                price: "INR 25,000",
                duration: "Month",
                features: ["Unlimited Strategies", "< 100ms Latency", "Deep Analytics & Export", "Priority 24/7 Support"],
                buttonText: "Continue with Professional Access",
                href: buildPublicPlanCta({
                    id: "pro",
                    name: "Pro Access",
                    price: 25000,
                    durationDays: 30,
                    segment: "N/A",
                }).href,
                isPopular: true,
                onClick: () =>
                    openPlanDestination(
                        buildPublicPlanCta({
                            id: "pro",
                            name: "Pro Access",
                            price: 25000,
                            durationDays: 30,
                            segment: "N/A",
                        }).href,
                        {
                            planId: "pro",
                            planName: "Pro Access",
                            planPriceLabel: "INR 25,000",
                            planDurationLabel: "30 Days",
                            planSegment: "N/A",
                            sourcePage: "public_home_pricing",
                        }
                    ),
            },
            {
                id: "enterprise",
                name: "Enterprise",
                description: "For Prop Desks & Funds",
                price: "Custom",
                duration: "30 Days",
                features: ["Dedicated Infrastructure", "White Label Solution", "FIX API Access", "Dedicated Account Manager"],
                buttonText: "Talk to Sales",
                href: buildPublicPlanCta({
                    id: "enterprise",
                    name: "Enterprise",
                    durationDays: 30,
                    isCustom: true,
                    segment: "N/A",
                }).href,
                isPopular: false,
                onClick: () =>
                    openPlanDestination(
                        buildPublicPlanCta({
                            id: "enterprise",
                            name: "Enterprise",
                            durationDays: 30,
                            isCustom: true,
                            segment: "N/A",
                        }).href,
                        {
                            planId: "enterprise",
                            planName: "Enterprise",
                            planPriceLabel: "Custom",
                            planDurationLabel: "30 Days",
                            planSegment: "N/A",
                            sourcePage: "public_home_pricing",
                        }
                    ),
            },
        ],
        [openPlanDestination]
    );

    const formattedPlans: PricingPlan[] = useMemo(() => {
        if (!plans.length) return fallbackPlans;

        const popularId = plans
            .filter((plan) => !plan.isDemo)
            .sort((a, b) => (b.price ?? 0) - (a.price ?? 0))[0]?._id;

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
                price: formatPlanPrice(plan.price, isDemo, isCustom),
                duration: formatPlanDuration(plan.durationDays, isDemo, isCustom),
                features: plan.features?.length
                    ? plan.features
                    : ["Execution-grade routing", "Priority strategy support", "Performance reporting", "Managed onboarding"],
                isPopular,
                onClick: () =>
                    openPlanDestination(
                        buildPublicPlanCta({
                            id: plan._id,
                            name: plan.name,
                            price: plan.price,
                            durationDays: plan.durationDays,
                            segment: plan.segment,
                            isDemo,
                            isCustom,
                        }).href,
                        isDemo
                            ? undefined
                            : {
                                planId: plan._id,
                                planName: plan.name,
                                planPriceLabel: formatPlanPrice(plan.price, isDemo, isCustom),
                                planDurationLabel: formatPlanDuration(plan.durationDays, isDemo, isCustom),
                                planSegment: plan.segment || "N/A",
                                sourcePage: "public_home_pricing",
                            }
                    ),
            };
        });
    }, [fallbackPlans, openPlanDestination, plans]);

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
