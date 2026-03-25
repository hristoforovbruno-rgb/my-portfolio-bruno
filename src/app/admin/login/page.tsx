"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { apiRequest } from "@/lib/admin-api";
import { setAdminSession } from "@/lib/admin-session";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--page-bg)] px-6">
      <form
        className="theme-surface w-full max-w-md rounded-[2rem] p-8"
        onSubmit={async (event) => {
          event.preventDefault();
          setError("");
          setIsSubmitting(true);

          try {
            const result = await apiRequest<{ token: string; admin: { email: string } }>("/api/auth/login", {
              method: "POST",
              body: { email, password },
            });

            setAdminSession(result.token, result.admin.email);
            router.replace("/admin");
          } catch (requestError) {
            setError(requestError instanceof Error ? requestError.message : "Login failed");
          } finally {
            setIsSubmitting(false);
          }
        }}
      >
        <p className="text-xs font-semibold uppercase tracking-[0.34em] text-[var(--color-gold)]">Admin Login</p>
        <h1 className="theme-text-main mt-4 text-3xl font-semibold">Sign in</h1>
        <p className="theme-text-muted mt-3 text-sm leading-7">Use your admin email and password to access messages and settings.</p>

        <div className="mt-6 grid gap-4">
          <input
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="hristoforovbruno@gmail.com"
            className="theme-field rounded-2xl px-4 py-3 outline-none"
          />
          <input
            type="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Password"
            className="theme-field rounded-2xl px-4 py-3 outline-none"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="interactive-button rounded-full bg-[var(--color-gold)] px-5 py-3 text-sm font-semibold text-black disabled:opacity-70"
          >
            {isSubmitting ? "Signing in..." : "Login"}
          </button>
          {error ? <p className="text-sm text-red-300">{error}</p> : null}
        </div>
      </form>
    </div>
  );
}
