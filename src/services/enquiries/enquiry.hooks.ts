import { useMutation } from "@tanstack/react-query";
import { createEnquiry } from "./enquiry.service";
import type { CreateEnquiryPayload } from "./enquiry.types";

export function useCreateEnquiryMutation() {
  return useMutation({
    mutationFn: (payload: CreateEnquiryPayload) => createEnquiry(payload),
  });
}
