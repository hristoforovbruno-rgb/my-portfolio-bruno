"use client";

import { useEffect, useState } from "react";
import { AdminGuard } from "@/components/admin/admin-guard";
import { AdminShell } from "@/components/admin/admin-shell";
import { apiRequest } from "@/lib/admin-api";

export default function AdminAccountPage() {
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    void apiRequest<{ email: string }>("/api/cms/account", { auth: true }).then((result) => setEmail(result.email));
  }, []);

  return (
    <AdminGuard>
      <AdminShell title="Account" description="Update the admin login email and password.">
        <div className="grid gap-6 xl:grid-cols-2">
          <form className="theme-surface rounded-[2rem] p-8" onSubmit={async (event) => {
            event.preventDefault();
            const updated = await apiRequest<{ email: string }>("/api/cms/account/email", { method: "PATCH", body: { email }, auth: true });
            setEmail(updated.email);
            setStatus("Admin email updated.");
          }}>
            <label className="theme-text-muted grid gap-2 text-sm">Admin email<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="theme-field rounded-2xl px-4 py-3 outline-none" /></label>
            <button type="submit" className="interactive-button mt-6 rounded-full bg-[var(--color-gold)] px-5 py-3 text-sm font-semibold text-black">Save email</button>
          </form>

          <form className="theme-surface rounded-[2rem] p-8" onSubmit={async (event) => {
            event.preventDefault();
            await apiRequest("/api/cms/account/password", { method: "PATCH", body: { currentPassword, newPassword }, auth: true });
            setCurrentPassword("");
            setNewPassword("");
            setStatus("Admin password updated.");
          }}>
            <div className="grid gap-4">
              <label className="theme-text-muted grid gap-2 text-sm">Current password<input type="password" value={currentPassword} onChange={(event) => setCurrentPassword(event.target.value)} className="theme-field rounded-2xl px-4 py-3 outline-none" /></label>
              <label className="theme-text-muted grid gap-2 text-sm">New password<input type="password" value={newPassword} onChange={(event) => setNewPassword(event.target.value)} className="theme-field rounded-2xl px-4 py-3 outline-none" /></label>
            </div>
            <button type="submit" className="interactive-button mt-6 rounded-full bg-[var(--color-gold)] px-5 py-3 text-sm font-semibold text-black">Change password</button>
          </form>
        </div>
        {status ? <p className="theme-text-muted mt-4 text-sm">{status}</p> : null}
      </AdminShell>
    </AdminGuard>
  );
}
