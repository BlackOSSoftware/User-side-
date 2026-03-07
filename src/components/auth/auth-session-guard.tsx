"use client";

import { clearAuthSession, getAuthExpiresAt, getAuthToken } from "@/lib/auth/session";
import { useEffect } from "react";
import { LOGIN_URL } from "@/lib/external-links";

export function AuthSessionGuard() {
  useEffect(() => {
    const token = getAuthToken();
    const expiresAt = getAuthExpiresAt();

    if (!token || !expiresAt || expiresAt <= Date.now()) {
      clearAuthSession();
      window.location.href = LOGIN_URL;
      return;
    }

    const timeoutMs = Math.max(expiresAt - Date.now(), 0);
    const timeoutId = window.setTimeout(() => {
      clearAuthSession();
      window.location.href = LOGIN_URL;
    }, timeoutMs);

    return () => window.clearTimeout(timeoutId);
  }, []);

  return null;
}
