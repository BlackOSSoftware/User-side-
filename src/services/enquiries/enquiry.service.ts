import { apiClient } from "@/services/http/client";
import type { CreateEnquiryPayload, EnquiryItem } from "./enquiry.types";

export async function createEnquiry(payload: CreateEnquiryPayload): Promise<EnquiryItem> {
  const response = await apiClient.post<EnquiryItem>("/enquiries", payload);
  return response.data;
}
