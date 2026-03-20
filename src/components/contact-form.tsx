"use client";

import { useState } from "react";
import { ArrowRightIcon } from "@/components/icons";
import { contact } from "@/lib/site-content";

const initialState = {
  name: "",
  business: "",
  email: "",
  message: "",
};

export function ContactForm() {
  const [form, setForm] = useState(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <form
      className="surface-card grid gap-5 rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(17,17,17,0.95),rgba(9,9,9,0.92))] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.42)] sm:p-7"
      onSubmit={(event) => {
        event.preventDefault();
        setIsSubmitting(true);

        const subject = encodeURIComponent(`Website audit request from ${form.name || "New lead"}`);
        const body = encodeURIComponent(
          `Name: ${form.name}\nBusiness: ${form.business}\nEmail: ${form.email}\n\nProject details:\n${form.message}`,
        );

        window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`;
        window.setTimeout(() => setIsSubmitting(false), 400);
      }}
    >
      <div className="grid gap-5 md:grid-cols-2">
        <label className="grid gap-2 text-sm text-white/72">
          Name
          <input
            required
            value={form.name}
            autoComplete="name"
            onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
            className="field-shell rounded-2xl border border-white/12 bg-black/55 px-4 py-3 text-white outline-none transition duration-300 focus:border-[var(--color-gold)] focus:shadow-[0_0_0_4px_rgba(212,175,55,0.12)]"
            placeholder="Your name"
          />
        </label>
        <label className="grid gap-2 text-sm text-white/72">
          Business
          <input
            required
            value={form.business}
            autoComplete="organization"
            onChange={(event) => setForm((current) => ({ ...current, business: event.target.value }))}
            className="field-shell rounded-2xl border border-white/12 bg-black/55 px-4 py-3 text-white outline-none transition duration-300 focus:border-[var(--color-gold)] focus:shadow-[0_0_0_4px_rgba(212,175,55,0.12)]"
            placeholder="Business name"
          />
        </label>
      </div>
      <label className="grid gap-2 text-sm text-white/72">
        Email
        <input
          required
          type="email"
          value={form.email}
          autoComplete="email"
          onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
          className="field-shell rounded-2xl border border-white/12 bg-black/55 px-4 py-3 text-white outline-none transition duration-300 focus:border-[var(--color-gold)] focus:shadow-[0_0_0_4px_rgba(212,175,55,0.12)]"
          placeholder="you@business.com"
        />
      </label>
      <label className="grid gap-2 text-sm text-white/72">
        What is hurting your website right now?
        <textarea
          required
          rows={6}
          value={form.message}
          onChange={(event) => setForm((current) => ({ ...current, message: event.target.value }))}
          className="field-shell rounded-[1.5rem] border border-white/12 bg-black/55 px-4 py-3 text-white outline-none transition duration-300 focus:border-[var(--color-gold)] focus:shadow-[0_0_0_4px_rgba(212,175,55,0.12)]"
          placeholder="Slow pages, low traffic, outdated design, poor enquiries..."
        />
      </label>
      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--color-gold)] px-6 py-3 text-sm font-semibold text-black transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_40px_rgba(212,175,55,0.2)] disabled:cursor-wait disabled:opacity-80"
      >
        {isSubmitting ? "Preparing Email..." : "Stop Losing Customers. Contact Me Today."}
        <ArrowRightIcon className="h-4 w-4" />
      </button>
      <p className="text-sm leading-7 text-white/52">
        Submitting opens your email app with the details filled in so you can send the request instantly.
      </p>
    </form>
  );
}
