"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.16),transparent_28%),linear-gradient(180deg,#050505_0%,#090909_45%,#020202_100%)] px-6 py-10">
      <form
        className="w-full max-w-md rounded-[2rem] border border-white/10 bg-black/50 p-8 shadow-[0_30px_80px_rgba(0,0,0,0.45)] backdrop-blur"
        onSubmit={async (event) => {
          event.preventDefault();
          setError("");
          setIsSubmitting(true);

          const result = await signIn("credentials", {
            email,
            password,
            redirect: false,
            callbackUrl: "/admin",
          });

          if (result?.error) {
            setError("Invalid credentials");
            setIsSubmitting(false);
            return;
          }

          router.replace(result?.url || "/admin");
          router.refresh();
        }}
      >
        <p className="text-xs font-semibold uppercase tracking-[0.34em] text-[var(--color-gold-light)]">Protected Access</p>
        <h1 className="mt-4 font-serif text-4xl text-white">Admin Login</h1>
        <p className="mt-3 text-sm leading-7 text-white/65">Sign in to manage contact messages, replies, and read status.</p>

        <div className="mt-8 grid gap-4">
          <label className="grid gap-2 text-sm text-white/70">
            Email
            <input
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-[var(--color-gold)] focus:bg-white/8"
              placeholder="admin@example.com"
            />
          </label>

          <label className="grid gap-2 text-sm text-white/70">
            Password
            <input
              type="password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-[var(--color-gold)] focus:bg-white/8"
              placeholder="********"
            />
          </label>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 rounded-full bg-[var(--color-gold)] px-5 py-3 text-sm font-semibold text-black transition hover:brightness-105 disabled:cursor-wait disabled:opacity-80"
          >
            {isSubmitting ? "Signing in..." : "Sign in"}
          </button>
        </div>

        {error ? <p className="mt-4 rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">{error}</p> : null}
      </form>
    </main>
  );
}
