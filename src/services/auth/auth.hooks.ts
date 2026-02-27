import { useMutation } from "@tanstack/react-query";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { clearAuthSession, resolveTokenAndExpiry, setAuthSession } from "@/lib/auth/session";
import { changePassword, getMe, login, logout, updateMe } from "./auth.service";
import type { ChangePasswordPayload, LoginPayload, UpdateMePayload } from "./auth.types";

const ME_QUERY_KEY = ["auth", "me"] as const;

export function useLoginMutation() {
  return useMutation({
    mutationFn: (payload: LoginPayload) => login(payload),
    onSuccess: (data) => {
      const { token, expiresAt } = resolveTokenAndExpiry(data);
      setAuthSession(token, expiresAt);
    },
  });
}

export function useMeQuery(enabled = true) {
  return useQuery({
    queryKey: ME_QUERY_KEY,
    queryFn: getMe,
    enabled,
  });
}

export function useUpdateMeMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateMePayload) => updateMe(payload),
    onSuccess: (data) => {
      queryClient.setQueryData(ME_QUERY_KEY, data);
    },
  });
}

export function useLogoutMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSettled: () => {
      clearAuthSession();
      queryClient.removeQueries({ queryKey: ME_QUERY_KEY });
    },
  });
}

export function useChangePasswordMutation() {
  return useMutation({
    mutationFn: (payload: ChangePasswordPayload) => changePassword(payload),
  });
}
