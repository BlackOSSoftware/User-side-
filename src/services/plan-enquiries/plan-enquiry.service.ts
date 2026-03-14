import { apiClient } from "@/services/http/client";
import axios from "axios";

export type CreatePlanEnquiryPayload = {
  planId?: string;
  planName: string;
  planPriceLabel?: string;
  planDurationLabel?: string;
  planSegment?: string;
  source: "dashboard" | "public_website";
  sourcePage?: string;
  pageUrl?: string;
  referrerUrl?: string;
  visitorId?: string;
  userName?: string;
  userEmail?: string;
  userPhone?: string;
  clientId?: string;
  googleAccountEmail?: string;
  browserName?: string;
  browserVersion?: string;
  osName?: string;
  deviceType?: string;
  platform?: string;
  language?: string;
  userAgent?: string;
};

export async function createPlanEnquiry(payload: CreatePlanEnquiryPayload) {
  try {
    const response = await apiClient.post("/enquiries/plans", payload);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      const fallbackResponse = await apiClient.post("/plan-enquiries", payload);
      return fallbackResponse.data;
    }

    throw error;
  }
}
