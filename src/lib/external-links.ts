export const LOGIN_URL = "https://user.mspktradesolutions.com/login";
export const TRIAL_URL = "https://user.mspktradesolutions.com/trial";
export const SUPPORT_WHATSAPP = "917770039037";
export const PLAY_STORE_URL = "#";
export const APP_STORE_URL = "#";

type PlanCtaInput = {
  id?: string;
  name?: string;
  price?: number;
  durationDays?: number;
  segment?: string;
  isDemo?: boolean;
  isCustom?: boolean;
};

const formatPlanPrice = (price?: number, isDemo?: boolean, isCustom?: boolean) => {
  if (isDemo) return "Demo";
  if (isCustom) return "Custom";
  if (!price || price <= 0) return "Custom";
  return `INR ${new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(price)}`;
};

const formatPlanDuration = (durationDays?: number) => {
  if (!durationDays) return "Flexible";
  return `${durationDays} Day${durationDays > 1 ? "s" : ""}`;
};

export const buildPublicPlanCta = (plan: PlanCtaInput) => {
  if (plan.isDemo) {
    return {
      href: plan.id ? `${TRIAL_URL}?planId=${encodeURIComponent(plan.id)}` : TRIAL_URL,
      buttonText: "Start Demo Access",
      isExternal: true,
    };
  }

  const message = [
    "Hello MSPK Team,",
    "",
    "I want to proceed with this plan:",
    `- Plan Name: ${plan.name || "N/A"}`,
    `- Plan ID: ${plan.id || "N/A"}`,
    `- Plan Price: ${formatPlanPrice(plan.price, plan.isDemo, plan.isCustom)}`,
    `- Plan Duration: ${formatPlanDuration(plan.durationDays)}`,
    `- Segment: ${plan.segment || "N/A"}`,
    "",
    "Please share the next steps for activation.",
  ].join("\n");

  return {
    href: `https://wa.me/${SUPPORT_WHATSAPP}?text=${encodeURIComponent(message)}`,
    buttonText: "Choose Plan",
    isExternal: true,
  };
};
