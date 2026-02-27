"use client";

import { ArrowLeft, Mail, MapPin, Phone, Save, UserRound } from "lucide-react";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import type { UpdateMePayload } from "@/services/auth/auth.types";
import { useMeQuery, useUpdateMeMutation } from "@/hooks/use-auth";

export default function EditProfilePage() {
  const router = useRouter();
  const meQuery = useMeQuery();
  const updateMeMutation = useUpdateMeMutation();
  const [draft, setDraft] = useState<UpdateMePayload | null>(null);

  const profile = useMemo(() => {
    const me = meQuery.data;
    const name = draft?.name ?? me?.name ?? "";
    const email = me?.email ?? "";

    return {
      name,
      username: `@${email.split("@")[0] || "user"}`,
      email,
      phone: draft?.phone ?? me?.phone ?? "",
      address: draft?.profile?.address ?? me?.profile?.address ?? "",
      city: draft?.profile?.city ?? me?.profile?.city ?? "",
      state: draft?.profile?.state ?? me?.profile?.state ?? "",
    };
  }, [draft, meQuery.data]);

  const initials =
    profile.name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() ?? "")
      .join("") || "T";

  const setField = (key: keyof UpdateMePayload, value: string | boolean) => {
    setDraft((prev) => ({ ...(prev ?? {}), [key]: value }));
  };

  const setProfileField = (key: "address" | "city" | "state", value: string) => {
    setDraft((prev) => ({
      ...(prev ?? {}),
      profile: {
        address: prev?.profile?.address ?? profile.address,
        city: prev?.profile?.city ?? profile.city,
        state: prev?.profile?.state ?? profile.state,
        [key]: value,
      },
    }));
  };

  const saveProfile = async () => {
    const payload: UpdateMePayload = {};

    if (draft?.name !== undefined) payload.name = draft.name;
    if (draft?.phone !== undefined) payload.phone = draft.phone;
    if (draft?.profile) payload.profile = draft.profile;

    if (Object.keys(payload).length === 0) {
      toast.info("No changes to update");
      return;
    }

    try {
      await updateMeMutation.mutateAsync(payload);
      toast.success("Profile updated");
      router.replace("/dashboard/profile");
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Failed to update profile";
      toast.error(message);
    }
  };

  return (
    <div className="mx-auto w-full max-w-5xl px-1 pb-4">
      <div className="rounded-3xl bg-card/80 ring-1 ring-border/40 backdrop-blur-xl overflow-hidden">
        <div className="px-4 sm:px-5 py-4 border-b border-border/40 relative">
          <button
            onClick={() => router.back()}
            className="absolute left-3 top-3 h-8 w-8 rounded-full bg-background/60 inline-flex items-center justify-center text-foreground"
          >
            <ArrowLeft size={16} />
          </button>
          <h1 className="text-lg sm:text-xl font-semibold text-foreground text-center">Edit Profile</h1>
          <p className="text-xs sm:text-sm text-muted-foreground text-center mt-1">Update your account details.</p>
        </div>

        <div className="p-3 sm:p-5 grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4">
          <aside className="lg:col-span-4 rounded-2xl bg-background/35 ring-1 ring-border/40 p-4">
            <div className="h-16 w-16 rounded-xl bg-gradient-to-tr from-primary/25 to-accent/20 ring-1 ring-border/50 flex items-center justify-center text-xl font-bold text-foreground">
              {initials}
            </div>
            <p className="mt-3 text-base sm:text-lg font-semibold text-foreground">{profile.name || "User"}</p>
            <p className="text-xs text-muted-foreground">{profile.username}</p>

            <div className="mt-4 text-[11px] text-muted-foreground space-y-1.5">
              <p className="inline-flex items-center gap-1.5"><Mail size={12} /> {profile.email}</p>
              <p className="inline-flex items-center gap-1.5"><Phone size={12} /> {profile.phone || "N/A"}</p>
              <p className="inline-flex items-center gap-1.5"><MapPin size={12} /> {profile.city || "N/A"}, {profile.state || "N/A"}</p>
            </div>
          </aside>

          <section className="lg:col-span-8 rounded-2xl bg-background/35 ring-1 ring-border/40 p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="sm:col-span-2">
                <label className="text-[11px] text-muted-foreground inline-flex items-center gap-1"><UserRound size={12} /> Full Name</label>
                <input
                  value={profile.name}
                  onChange={(e) => setField("name", e.target.value)}
                  className="mt-1.5 w-full h-10 rounded-xl border border-border/60 bg-secondary/20 px-3 text-sm focus:outline-none focus:border-primary/60"
                />
              </div>
              <div>
                <label className="text-[11px] text-muted-foreground">City</label>
                <input
                  value={profile.city}
                  onChange={(e) => setProfileField("city", e.target.value)}
                  className="mt-1.5 w-full h-10 rounded-xl border border-border/60 bg-secondary/20 px-3 text-sm focus:outline-none focus:border-primary/60"
                />
              </div>
              <div>
                <label className="text-[11px] text-muted-foreground">State</label>
                <input
                  value={profile.state}
                  onChange={(e) => setProfileField("state", e.target.value)}
                  className="mt-1.5 w-full h-10 rounded-xl border border-border/60 bg-secondary/20 px-3 text-sm focus:outline-none focus:border-primary/60"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="text-[11px] text-muted-foreground">Address</label>
                <input
                  value={profile.address}
                  onChange={(e) => setProfileField("address", e.target.value)}
                  className="mt-1.5 w-full h-10 rounded-xl border border-border/60 bg-secondary/20 px-3 text-sm focus:outline-none focus:border-primary/60"
                />
              </div>
              <div>
                <label className="text-[11px] text-muted-foreground">Phone</label>
                <input
                  value={profile.phone}
                  onChange={(e) => setField("phone", e.target.value)}
                  className="mt-1.5 w-full h-10 rounded-xl border border-border/60 bg-secondary/20 px-3 text-sm focus:outline-none focus:border-primary/60"
                />
              </div>
              <div>
                <label className="text-[11px] text-muted-foreground">Email</label>
                <input
                  value={profile.email}
                  disabled
                  className="mt-1.5 w-full h-10 rounded-xl border border-border/50 bg-secondary/10 px-3 text-sm text-muted-foreground"
                />
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-border/40 flex justify-end">
              <button
                onClick={saveProfile}
                disabled={updateMeMutation.isPending}
                className="h-10 px-4 rounded-xl bg-primary text-primary-foreground text-sm font-semibold inline-flex items-center gap-2 disabled:opacity-60"
              >
                <Save size={14} /> {updateMeMutation.isPending ? "Saving..." : "Save"}
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
