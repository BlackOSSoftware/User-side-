export type LoginPayload = {
  email: string;
  password: string;
};

export type LoginApiResponse = Record<string, unknown>;

export type RegisterPayload = {
  name: string;
  email: string;
  password: string;
  phone?: string;
};

export type RegisterApiResponse = Record<string, unknown>;

export type UserProfile = {
  avatar?: string;
  address?: string;
  city?: string;
  state?: string;
};

export type MeResponse = {
  _id: string;
  name: string;
  email: string;
  role?: string;
  phone?: string;
  profile?: UserProfile;
  referral?: {
    code?: string;
  };
  subscription?: {
    plan?: string;
  };
  status?: string;
  walletBalance?: number;
  equity?: number;
  marginUsed?: number;
  pnl?: number;
  isPhoneVerified?: boolean;
  isEmailVerified?: boolean;
  isWhatsAppEnabled?: boolean;
  isNotificationEnabled?: boolean;
  isBlocked?: boolean;
  tokenVersion?: number;
  lastLoginIp?: string;
  createdAt?: string;
  updatedAt?: string;
  planId?: string | null;
  planName?: string | null;
  permissions?: string[];
  planExpiry?: string | null;
};

export type UpdateMePayload = {
  name?: string;
  phone?: string;
  isWhatsAppEnabled?: boolean;
  isNotificationEnabled?: boolean;
  profile?: {
    address?: string;
    city?: string;
    state?: string;
  };
  avatarFile?: File | null;
};

export type ChangePasswordPayload = {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};
