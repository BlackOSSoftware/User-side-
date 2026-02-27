"use client";

import { ChevronRight, CircleHelp, LogOut, Mail, MapPin, Phone, ShieldCheck, UserRound } from "lucide-react";
import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { useLogoutMutation, useMeQuery } from "@/hooks/use-auth";

export default function ProfilePage() {
  const router = useRouter();
  const meQuery = useMeQuery();
  const logoutMutation = useLogoutMutation();

  const profile = useMemo(() => {
    const me = meQuery.data;
    const name = me?.name ?? "Test User";
    const email = me?.email ?? "test@example.com";

    return {
      name,
      username: `@${email.split("@")[0] || "user"}`,
      email,
      phone: me?.phone ?? "N/A",
      city: me?.profile?.city ?? "N/A",
      state: me?.profile?.state ?? "N/A",
      status: me?.status ?? "Active",
      referral: me?.referral?.code ?? "N/A",
    };
  }, [meQuery.data]);

  const initials =
    profile.name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() ?? "")
      .join("") || "T";

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync();
    } finally {
      router.replace("/login");
    }
  };

  const actionRows = [
    {
      label: "Edit Profile",
      onClick: () => router.push("/dashboard/profile/edit"),
      danger: false,
      icon: UserRound,
    },
    {
      label: "Change Password",
      onClick: () => router.push("/dashboard/profile/change-password"),
      danger: false,
      icon: ShieldCheck,
    },
    {
      label: "Help & Support",
      onClick: () => router.push("/dashboard/support"),
      danger: false,
      icon: CircleHelp,
    },
    {
      label: "Log Out",
      onClick: handleLogout,
      danger: true,
      icon: LogOut,
    },
  ];

  return (
    <div className="mx-auto w-full max-w-5xl px-1 pb-4">
      <div className="rounded-3xl bg-card/80 ring-1 ring-border/40 backdrop-blur-xl overflow-hidden">
        <div className="px-4 sm:px-5 py-4 border-b border-border/40">
          <h1 className="text-lg sm:text-xl font-semibold text-foreground">Profile</h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">View your account details and manage profile actions.</p>
        </div>

        <div className="p-3 sm:p-5 grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4">
          <section className="lg:col-span-4 rounded-2xl bg-background/35 ring-1 ring-border/40 p-4">
            <div className="flex items-center gap-3">
              <div className="h-14 w-14 rounded-xl bg-gradient-to-tr from-primary/25 to-accent/20 ring-1 ring-border/50 flex items-center justify-center text-xl font-bold text-foreground">
                {initials}
              </div>
              <div className="min-w-0">
                <p className="text-base sm:text-lg font-semibold text-foreground truncate">{profile.name}</p>
                <p className="text-xs text-muted-foreground truncate">{profile.username}</p>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2">
              <div className="rounded-xl bg-secondary/25 px-3 py-2">
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Status</p>
                <p className="text-sm font-semibold text-foreground mt-1">{profile.status}</p>
              </div>
              <div className="rounded-xl bg-secondary/25 px-3 py-2">
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Referral</p>
                <p className="text-sm font-semibold text-foreground mt-1 truncate">{profile.referral}</p>
              </div>
            </div>

            <div className="mt-3 text-[11px] text-muted-foreground space-y-1.5">
              <p className="inline-flex items-center gap-1.5"><Mail size={12} /> {profile.email}</p>
              <p className="inline-flex items-center gap-1.5"><Phone size={12} /> {profile.phone}</p>
              <p className="inline-flex items-center gap-1.5"><MapPin size={12} /> {profile.city}, {profile.state}</p>
            </div>
          </section>

          <section className="lg:col-span-8 rounded-2xl bg-background/35 ring-1 ring-border/40 p-2 sm:p-3">
            <div className="px-2 py-2">
              <h2 className="text-sm sm:text-base font-semibold text-foreground">Account Actions</h2>
              <p className="text-[11px] sm:text-xs text-muted-foreground mt-1">Open a section to continue.</p>
            </div>

            <div className="space-y-1.5">
              {actionRows.map((row) => (
                <button
                  key={row.label}
                  onClick={row.onClick}
                  disabled={row.label === "Log Out" ? logoutMutation.isPending : false}
                  className={`w-full h-11 sm:h-12 px-3 rounded-xl flex items-center justify-between transition-colors ${
                    row.danger
                      ? "text-destructive hover:bg-destructive/10"
                      : "text-foreground hover:bg-background/45"
                  }`}
                >
                  <span className="inline-flex items-center gap-2 text-sm font-medium">
                    <row.icon size={15} className={row.danger ? "" : "text-muted-foreground"} />
                    {row.label}
                  </span>
                  <ChevronRight size={16} className={row.danger ? "" : "text-muted-foreground"} />
                </button>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
