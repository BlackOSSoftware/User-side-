"use client";

import { ArrowLeft, Eye, EyeOff, Lock, ShieldAlert } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useChangePasswordMutation } from "@/hooks/use-auth";

export default function ChangePasswordPage() {
  const router = useRouter();
  const changePasswordMutation = useChangePasswordMutation();

  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [show, setShow] = useState({ old: false, next: false, confirm: false });

  const updatePassword = async () => {
    if (!form.oldPassword || !form.newPassword || !form.confirmNewPassword) {
      toast.error("Please fill all password fields");
      return;
    }

    if (form.newPassword !== form.confirmNewPassword) {
      toast.error("New password and confirm password do not match");
      return;
    }

    try {
      await changePasswordMutation.mutateAsync(form);
      toast.success("Password changed");
      router.replace("/dashboard/profile");
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Failed to change password";
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
          <h1 className="text-lg sm:text-xl font-semibold text-foreground text-center">Change Password</h1>
          <p className="text-xs sm:text-sm text-muted-foreground text-center mt-1">Keep your account secure with a strong password.</p>
        </div>

        <div className="p-3 sm:p-5 grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4">
          <aside className="lg:col-span-4 rounded-2xl bg-background/35 ring-1 ring-border/40 p-4 space-y-3">
            <div className="inline-flex h-10 w-10 rounded-xl bg-primary/15 text-primary items-center justify-center">
              <ShieldAlert size={18} />
            </div>
            <h2 className="text-base font-semibold text-foreground">Security Tips</h2>
            <ul className="text-xs text-muted-foreground space-y-1.5">
              <li>Use at least 8 characters.</li>
              <li>Add uppercase, lowercase and numbers.</li>
              <li>Do not reuse old passwords.</li>
            </ul>
          </aside>

          <section className="lg:col-span-8 rounded-2xl bg-background/35 ring-1 ring-border/40 p-4 space-y-3">
            {[
              { key: "oldPassword", ui: "old", placeholder: "Current Password" },
              { key: "newPassword", ui: "next", placeholder: "New Password" },
              { key: "confirmNewPassword", ui: "confirm", placeholder: "Confirm New Password" },
            ].map((field) => (
              <div className="relative" key={field.key}>
                <input
                  type={show[field.ui as "old" | "next" | "confirm"] ? "text" : "password"}
                  placeholder={field.placeholder}
                  value={form[field.key as "oldPassword" | "newPassword" | "confirmNewPassword"]}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      [field.key]: e.target.value,
                    }))
                  }
                  className="w-full h-10 rounded-xl border border-border/60 bg-secondary/20 px-3 pr-10 text-sm focus:outline-none focus:border-primary/60"
                />
                <button
                  type="button"
                  onClick={() => setShow((prev) => ({ ...prev, [field.ui]: !prev[field.ui as "old" | "next" | "confirm"] }))}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                >
                  {show[field.ui as "old" | "next" | "confirm"] ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            ))}

            <div className="pt-2 border-t border-border/40 flex justify-end">
              <button
                onClick={updatePassword}
                disabled={changePasswordMutation.isPending}
                className="h-10 px-4 rounded-xl bg-primary text-primary-foreground text-sm font-semibold inline-flex items-center gap-2 disabled:opacity-60"
              >
                <Lock size={14} /> {changePasswordMutation.isPending ? "Changing..." : "Update Password"}
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
