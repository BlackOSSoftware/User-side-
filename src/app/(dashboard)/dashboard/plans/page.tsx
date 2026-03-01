"use client";

import { useMeQuery } from "@/hooks/use-auth";
import { usePlanQuery, usePlansQuery } from "@/services/plans/plan.hooks";
import { useSegmentsQuery } from "@/services/segments/segment.hooks";
import {
    usePurchaseSubscriptionMutation,
    useSubscriptionStatusQuery,
} from "@/services/subscriptions/subscription.hooks";
import { usePaymentDetailsQuery, useVerifyPaymentMutation } from "@/services/payments/payment.hooks";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Star, ArrowRight, ShieldCheck } from "lucide-react";
import { useMemo, useState } from "react";
import { useQueries } from "@tanstack/react-query";
import { getHasAccess } from "@/services/subscriptions/subscription.service";

export default function PlansPage() {
    const { data: me } = useMeQuery();
    const planId = me?.planId ?? "";
    const { data: currentPlan } = usePlanQuery(planId, Boolean(planId));
    const { data: plans = [] } = usePlansQuery();
    const { data: segments = [] } = useSegmentsQuery();
    const { data: subscriptionStatus } = useSubscriptionStatusQuery();
    const { data: paymentDetails } = usePaymentDetailsQuery();
    const purchaseMutation = usePurchaseSubscriptionMutation();
    const verifyPaymentMutation = useVerifyPaymentMutation();
    const [selectedSegments, setSelectedSegments] = useState<string[]>([]);
    const [planType, setPlanType] = useState("premium");
    const [transactionId, setTransactionId] = useState("");
    const [screenshotFile, setScreenshotFile] = useState<File | null>(null);
    const [formError, setFormError] = useState("");
    const [paymentError, setPaymentError] = useState("");
    const [purchaseNotice, setPurchaseNotice] = useState("");
    const [paymentNotice, setPaymentNotice] = useState("");

    const formatPrice = (price?: number, isDemo?: boolean) => {
        if (!price || price <= 0 || isDemo) return "Free";
        return `INR ${new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(price)}`;
    };

    const formatDuration = (durationDays?: number) => {
        if (!durationDays) return "Flexible";
        return `${durationDays} Day${durationDays > 1 ? "s" : ""}`;
    };

    const popularId = plans
        .filter((plan) => !plan.isDemo)
        .sort((a, b) => (b.price ?? 0) - (a.price ?? 0))[0]?._id;

    const segmentCards = useMemo(() => segments, [segments]);
    const accessQueries = useQueries({
        queries: segmentCards.map((segment) => ({
            queryKey: ["subscription", "access", segment.segment_code],
            queryFn: () => getHasAccess(segment.segment_code),
            enabled: Boolean(segment.segment_code),
        })),
    });

    const getErrorMessage = (error: unknown, fallback: string) => {
        const apiMessage =
            typeof (error as { response?: { data?: { message?: string; error?: string } } })?.response?.data?.message === 'string'
                ? String((error as { response?: { data?: { message?: string } } })?.response?.data?.message)
                : typeof (error as { response?: { data?: { message?: string; error?: string } } })?.response?.data?.error === 'string'
                    ? String((error as { response?: { data?: { error?: string } } })?.response?.data?.error)
                    : undefined;
        return apiMessage || (error instanceof Error ? error.message : fallback);
    };

    async function onPurchase() {
        setFormError("");
        setPurchaseNotice("");
        if (selectedSegments.length === 0) {
            setFormError("Select at least one segment.");
            return;
        }
        try {
            const response = await purchaseMutation.mutateAsync({ segments: selectedSegments, planType });
            setPurchaseNotice(
                response?.status
                    ? `Subscription created. Status: ${response.status}`
                    : "Subscription created successfully."
            );
        } catch (error) {
            setFormError(getErrorMessage(error, "Unable to purchase subscription."));
        }
    }

    async function onVerifyPayment() {
        setPaymentError("");
        setPaymentNotice("");
        if (!transactionId.trim() || !screenshotFile) {
            setPaymentError("Transaction ID and screenshot are required.");
            return;
        }
        try {
            const response = await verifyPaymentMutation.mutateAsync({
                segmentCodes: selectedSegments.length ? selectedSegments : segments.map((seg) => seg.segment_code),
                transactionId: transactionId.trim(),
                screenshot: screenshotFile,
            });
            setPaymentNotice(response?.message || "Payment submitted for verification.");
            setTransactionId("");
            setScreenshotFile(null);
        } catch (error) {
            setPaymentError(getErrorMessage(error, "Payment verification failed."));
        }
    }

    return (
        <div className="flex-1 space-y-6 sm:space-y-8 py-2">
            <div className="space-y-2 sm:space-y-3">
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight">Plan & Billing</h2>
                <p className="text-xs sm:text-sm text-slate-500">Manage your subscription, billing, and active access.</p>
            </div>

            {currentPlan ? (
                <Card className="border-border/60 bg-white/70 dark:bg-white/5 backdrop-blur-xl rounded-[1.5rem] shadow-[0_12px_40px_-18px_rgba(0,0,0,0.35)]">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-base">Current Plan</CardTitle>
                        <CardDescription>Active subscription details</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3 text-sm text-muted-foreground">
                        <div className="text-lg font-semibold text-foreground">{currentPlan.name}</div>
                        <div>{currentPlan.description}</div>
                        <div>Duration: {formatDuration(currentPlan.durationDays)}</div>
                        <div>Price: {formatPrice(currentPlan.price, currentPlan.isDemo)}</div>
                    </CardContent>
                </Card>
            ) : null}

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3 items-stretch">
                {plans.map((plan) => {
                    const isPopular = plan._id === popularId;
                    return (
                        <Card
                            key={plan._id}
                            className={`relative overflow-hidden rounded-[1.75rem] transition-all duration-500 group flex h-full flex-col
                                ${isPopular
                                    ? "bg-white dark:bg-zinc-900 border-primary shadow-[0_20px_60px_-15px_rgba(245,158,11,0.15)] ring-1 ring-primary/20 sm:scale-[1.02] z-10"
                                    : "bg-white dark:bg-black/50 border-slate-100 dark:border-white/5 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_60px_-12px_rgba(0,0,0,0.15)] dark:shadow-none hover:border-primary/30 sm:hover:-translate-y-1"
                                }`}
                        >
                            {isPopular ? (
                                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
                            ) : null}

                            <CardHeader className="p-6 pb-0">
                                {isPopular ? (
                                    <div className="mb-3">
                                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary text-white text-[10px] font-bold uppercase tracking-wider shadow-lg shadow-primary/25">
                                            <Star className="w-3 h-3 fill-white" /> Most Popular
                                        </span>
                                    </div>
                                ) : null}
                                <CardTitle className="text-xl font-bold mb-2">{plan.name}</CardTitle>
                                <CardDescription>{plan.description}</CardDescription>
                            </CardHeader>

                            <CardContent className="p-6 pt-6 flex-1">
                                <div className="flex items-baseline gap-1 mb-6">
                                    <span className="text-3xl font-bold tracking-tighter">{formatPrice(plan.price, plan.isDemo)}</span>
                                    <span className="text-muted-foreground text-sm ml-1">/ {formatDuration(plan.durationDays)}</span>
                                </div>

                                <div className="space-y-4 mb-8">
                                    {(plan.features?.length
                                        ? plan.features
                                        : ["Execution-grade routing", "Priority strategy support", "Performance reporting", "Managed onboarding"]
                                    ).map((feature, index) => (
                                        <div key={index} className="flex items-start gap-3">
                                            <div
                                                className={`mt-0.5 w-4 h-4 rounded-full flex items-center justify-center shrink-0
                                                    ${isPopular ? "bg-primary text-white" : "bg-muted text-muted-foreground"}`}
                                            >
                                                <Check className="w-2.5 h-2.5 stroke-[3]" />
                                            </div>
                                            <span className="text-sm leading-relaxed">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>

                            <CardFooter className="p-6 pt-0 mt-auto">
                                <Button
                                    size="lg"
                                    className={`w-full h-12 rounded-xl text-sm font-bold transition-all duration-300
                                        ${isPopular
                                            ? "bg-primary text-black hover:bg-primary/90 shadow-xl shadow-primary/20 hover:scale-[1.02]"
                                            : "bg-foreground text-background hover:opacity-90"}`}
                                >
                                    Choose Plan <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                            </CardFooter>
                        </Card>
                    );
                })}
            </div>

            <div className="space-y-4">
                <div className="space-y-2">
                    <h3 className="text-lg font-semibold">Segments & Base Pricing</h3>
                    <p className="text-sm text-muted-foreground">Base prices for each active trading segment.</p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {segmentCards.map((segment, index) => {
                        const hasAccess = accessQueries[index]?.data?.hasAccess;
                        return (
                            <Card key={segment._id} className="border-border/60 bg-white/70 dark:bg-white/5 backdrop-blur-xl rounded-[1.25rem]">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-base">{segment.name}</CardTitle>
                                    <CardDescription>{segment.segment_code}</CardDescription>
                                </CardHeader>
                                <CardContent className="text-sm text-muted-foreground space-y-2">
                                    <div>
                                        Base Price: {segment.base_price ? `INR ${new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(segment.base_price)}` : "Contact sales"}
                                    </div>
                                    <div className="inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-xs">
                                        <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                                        {hasAccess === true ? "Access active" : hasAccess === false ? "No access" : "Checking access"}
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] items-start">
                <Card className="border-border/60 bg-white/80 dark:bg-white/5 backdrop-blur-xl rounded-[1.5rem]">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-base">Subscription & Billing</CardTitle>
                        <CardDescription>Purchase access by segment and plan type.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-5 text-sm text-muted-foreground">
                        {subscriptionStatus ? (
                            <div className="rounded-2xl border border-border/50 bg-muted/40 px-4 py-3 text-xs text-muted-foreground">
                                Status: {subscriptionStatus.hasActiveSubscription ? "Active" : "Inactive"}
                                {subscriptionStatus.subscription?.status
                                    ? ` • ${subscriptionStatus.subscription.status}`
                                    : ""}
                            </div>
                        ) : null}

                        <div className="space-y-3">
                            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Select Segments</div>
                            <div className="flex flex-wrap gap-2">
                                {segments.map((segment) => {
                                    const selected = selectedSegments.includes(segment.segment_code);
                                    return (
                                        <button
                                            key={segment._id}
                                            type="button"
                                            onClick={() =>
                                                setSelectedSegments((prev) =>
                                                    selected
                                                        ? prev.filter((code) => code !== segment.segment_code)
                                                        : [...prev, segment.segment_code]
                                                )
                                            }
                                            className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                                                selected ? "bg-primary text-black" : "bg-muted text-muted-foreground hover:bg-muted/70"
                                            }`}
                                        >
                                            {segment.segment_code}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Plan Type</label>
                            <select
                                className="h-11 w-full rounded-xl border border-border/60 bg-background px-3 text-sm text-foreground focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/20"
                                value={planType}
                                onChange={(e) => setPlanType(e.target.value)}
                            >
                                <option value="premium">Premium</option>
                                <option value="standard">Standard</option>
                                <option value="basic">Basic</option>
                            </select>
                        </div>

                        {formError ? (
                            <div className="rounded-xl border border-rose-400/40 bg-rose-500/10 px-4 py-3 text-xs text-rose-700 dark:text-rose-100">
                                {formError}
                            </div>
                        ) : null}
                        {purchaseNotice ? (
                            <div className="rounded-xl border border-emerald-400/40 bg-emerald-500/10 px-4 py-3 text-xs text-emerald-700 dark:text-emerald-100">
                                {purchaseNotice}
                            </div>
                        ) : null}

                        <Button className="h-11 rounded-xl" onClick={onPurchase} disabled={purchaseMutation.isPending}>
                            {purchaseMutation.isPending ? "Processing..." : "Buy Subscription"}
                        </Button>
                    </CardContent>
                </Card>

                <Card className="border-border/60 bg-white/80 dark:bg-white/5 backdrop-blur-xl rounded-[1.5rem]">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-base">Payment Verification</CardTitle>
                        <CardDescription>Upload proof and submit for approval.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 text-sm text-muted-foreground">
                        {paymentDetails ? (
                            <div className="rounded-2xl border border-border/50 bg-muted/40 px-4 py-3 text-xs text-muted-foreground space-y-1">
                                <div>UPI ID: {paymentDetails.upiId || "Not available"}</div>
                                <div>Account Holder: {paymentDetails.accountHolderName || "Not available"}</div>
                                {paymentDetails.qrCodeUrl ? (
                                    <div className="pt-2">
                                        <div className="text-xs uppercase tracking-wider text-muted-foreground">QR Code</div>
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={
                                                paymentDetails.qrCodeUrl.startsWith("http")
                                                    ? paymentDetails.qrCodeUrl
                                                    : `http://localhost:4000/${paymentDetails.qrCodeUrl.replace(/^\\/+/, "")}`
                                            }
                                            alt="Payment QR"
                                            className="mt-2 h-32 w-32 rounded-xl border border-border/60 object-cover"
                                        />
                                    </div>
                                ) : null}
                            </div>
                        ) : null}

                        <div className="space-y-2">
                            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Transaction ID</label>
                            <input
                                value={transactionId}
                                onChange={(e) => setTransactionId(e.target.value)}
                                className="h-11 w-full rounded-xl border border-border/60 bg-background px-3 text-sm text-foreground focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/20"
                                placeholder="Enter transaction reference"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Upload Payment Screenshot</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setScreenshotFile(e.target.files?.[0] ?? null)}
                                className="w-full text-xs text-muted-foreground file:mr-3 file:rounded-xl file:border-0 file:bg-muted file:px-4 file:py-2 file:text-xs file:font-semibold file:text-foreground hover:file:bg-muted/70"
                            />
                        </div>

                        {paymentError ? (
                            <div className="rounded-xl border border-rose-400/40 bg-rose-500/10 px-4 py-3 text-xs text-rose-700 dark:text-rose-100">
                                {paymentError}
                            </div>
                        ) : null}
                        {paymentNotice ? (
                            <div className="rounded-xl border border-emerald-400/40 bg-emerald-500/10 px-4 py-3 text-xs text-emerald-700 dark:text-emerald-100">
                                {paymentNotice}
                            </div>
                        ) : null}

                        <Button className="h-11 rounded-xl" onClick={onVerifyPayment} disabled={verifyPaymentMutation.isPending}>
                            {verifyPaymentMutation.isPending ? "Submitting..." : "Submit Payment Proof"}
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
