import { createPlanEnquiry } from "@/services/plan-enquiries/plan-enquiry.service";

type PublicPlanTrackerInput = {
  planId?: string;
  planName: string;
  planPriceLabel?: string;
  planDurationLabel?: string;
  planSegment?: string;
  sourcePage: string;
  userName?: string;
  userEmail?: string;
  googleAccountEmail?: string;
};

const getBrowserContext = () => {
  if (typeof window === "undefined") {
    return {
      browserName: "",
      browserVersion: "",
      osName: "",
      deviceType: "",
      platform: "",
      language: "",
      pageUrl: "",
      referrerUrl: "",
      userAgent: "",
      visitorId: "",
    };
  }

  const userAgent = window.navigator.userAgent || "";
  const platform = window.navigator.platform || "";
  const language = window.navigator.language || "";
  const isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(userAgent);
  const browserName =
    /Edg/i.test(userAgent) ? "Edge" :
    /Chrome/i.test(userAgent) ? "Chrome" :
    /Safari/i.test(userAgent) && !/Chrome/i.test(userAgent) ? "Safari" :
    /Firefox/i.test(userAgent) ? "Firefox" :
    "Unknown";
  const browserVersion = userAgent.match(/(Edg|Chrome|Firefox|Version)\/([\d.]+)/i)?.[2] || "";
  const osName =
    /Windows/i.test(userAgent) ? "Windows" :
    /Mac OS/i.test(userAgent) ? "macOS" :
    /Android/i.test(userAgent) ? "Android" :
    /iPhone|iPad|iPod/i.test(userAgent) ? "iOS" :
    /Linux/i.test(userAgent) ? "Linux" :
    "Unknown";

  const storageKey = "mspk_public_plan_visitor_id";
  let visitorId = window.localStorage.getItem(storageKey) || "";
  if (!visitorId) {
    visitorId = `pub_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
    window.localStorage.setItem(storageKey, visitorId);
  }

  return {
    browserName,
    browserVersion,
    osName,
    deviceType: isMobile ? "mobile" : "desktop",
    platform,
    language,
    pageUrl: window.location.href,
    referrerUrl: document.referrer || "",
    userAgent,
    visitorId,
  };
};

export async function trackPublicPlanEnquiry(input: PublicPlanTrackerInput) {
  const browserContext = getBrowserContext();

  await createPlanEnquiry({
    planId: input.planId,
    planName: input.planName,
    planPriceLabel: input.planPriceLabel,
    planDurationLabel: input.planDurationLabel,
    planSegment: input.planSegment,
    source: "public_website",
    sourcePage: input.sourcePage,
    pageUrl: browserContext.pageUrl,
    referrerUrl: browserContext.referrerUrl,
    visitorId: browserContext.visitorId,
    userName: input.userName,
    userEmail: input.userEmail,
    googleAccountEmail: input.googleAccountEmail,
    browserName: browserContext.browserName,
    browserVersion: browserContext.browserVersion,
    osName: browserContext.osName,
    deviceType: browserContext.deviceType,
    platform: browserContext.platform,
    language: browserContext.language,
    userAgent: browserContext.userAgent,
  });
}
