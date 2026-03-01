import { apiClient } from "@/services/http/client";
import type {
  ChangePasswordPayload,
  LoginApiResponse,
  LoginPayload,
  MeResponse,
  RegisterApiResponse,
  RegisterPayload,
  SendOtpPayload,
  UpdateMePayload,
  VerifyOtpPayload,
  VerifyOtpResponse,
} from "./auth.types";

export async function login(payload: LoginPayload): Promise<LoginApiResponse> {
  const response = await apiClient.post<LoginApiResponse>("/auth/login", payload);
  return response.data;
}

export async function register(payload: RegisterPayload): Promise<RegisterApiResponse> {
  const response = await apiClient.post<RegisterApiResponse>("/auth/register", payload);
  return response.data;
}

export async function sendOtp(payload: SendOtpPayload): Promise<void> {
  await apiClient.post("/auth/send-otp", payload);
}

export async function verifyOtp(payload: VerifyOtpPayload): Promise<VerifyOtpResponse> {
  const response = await apiClient.post<VerifyOtpResponse>("/auth/verify-otp", payload);
  return response.data;
}

export async function getMe(): Promise<MeResponse> {
  const response = await apiClient.get<MeResponse>("/auth/me");
  return response.data;
}

export async function updateMe(payload: UpdateMePayload): Promise<MeResponse> {
  if (payload.avatarFile instanceof File) {
    const formData = new FormData();

    if (typeof payload.name === "string") formData.append("name", payload.name.trim());
    if (typeof payload.phone === "string") formData.append("phone", payload.phone.trim());
    if (typeof payload.isWhatsAppEnabled === "boolean") formData.append("isWhatsAppEnabled", String(payload.isWhatsAppEnabled));
    if (typeof payload.isNotificationEnabled === "boolean") formData.append("isNotificationEnabled", String(payload.isNotificationEnabled));
    if (typeof payload.profile?.address === "string") formData.append("profile[address]", payload.profile.address.trim());
    if (typeof payload.profile?.city === "string") formData.append("profile[city]", payload.profile.city.trim());
    if (typeof payload.profile?.state === "string") formData.append("profile[state]", payload.profile.state.trim());
    formData.append("avatar", payload.avatarFile);

    const response = await apiClient.patch<MeResponse>("/auth/me", formData);
    return response.data;
  }

  const jsonPayload: Record<string, unknown> = {};
  if (typeof payload.name === "string") jsonPayload.name = payload.name.trim();
  if (typeof payload.phone === "string") jsonPayload.phone = payload.phone.trim();
  if (typeof payload.isWhatsAppEnabled === "boolean") jsonPayload.isWhatsAppEnabled = payload.isWhatsAppEnabled;
  if (typeof payload.isNotificationEnabled === "boolean") jsonPayload.isNotificationEnabled = payload.isNotificationEnabled;

  if (
    typeof payload.profile?.address === "string" ||
    typeof payload.profile?.city === "string" ||
    typeof payload.profile?.state === "string"
  ) {
    jsonPayload.profile = {
      ...(typeof payload.profile?.address === "string" ? { address: payload.profile.address.trim() } : {}),
      ...(typeof payload.profile?.city === "string" ? { city: payload.profile.city.trim() } : {}),
      ...(typeof payload.profile?.state === "string" ? { state: payload.profile.state.trim() } : {}),
    };
  }

  const response = await apiClient.patch<MeResponse>("/auth/me", jsonPayload);
  return response.data;
}

export async function logout(): Promise<void> {
  await apiClient.post("/auth/logout");
}

export async function changePassword(payload: ChangePasswordPayload): Promise<void> {
  await apiClient.post("/auth/change-password", payload);
}
